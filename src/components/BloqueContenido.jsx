import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { MagnifyingGlassPlus, CornersIn, ArrowsClockwise, MagnifyingGlass, BookmarkSimple, Note, Chat, ArrowUpRight, TextB, TextItalic, Quotes, ListBullets, ListNumbers, TextAa } from '@phosphor-icons/react'
import { gravedadConfig } from '../mockData'
import Tooltip from './Tooltip'

// ─── Block type config ─────────────────────────────────────────────────────────

const TIPO_CONFIG = {
  p:     { label: 'p',  title: 'Párrafo',       className: 'text-base leading-8',               style: { color: '#1F2937' } },
  h1:    { label: 'H1', title: 'Título 1',       className: 'text-3xl font-bold leading-tight',  style: { color: '#111827' } },
  h2:    { label: 'H2', title: 'Título 2',       className: 'text-xl font-semibold leading-snug', style: { color: '#111827' } },
  h3:    { label: 'H3', title: 'Título 3',       className: 'text-lg font-semibold leading-snug', style: { color: '#1F2937' } },
  quote: { label: '"',  title: 'Cita',           className: 'text-base leading-8 italic',        style: { color: '#4B5563', borderLeft: '3px solid #367CFF', paddingLeft: '16px', marginLeft: '4px' } },
  ul:    { label: '•',  title: 'Lista',          className: 'text-base leading-7',               style: { color: '#1F2937' } },
  ol:    { label: '1.', title: 'Lista numerada', className: 'text-base leading-7',               style: { color: '#1F2937' } },
}

const TIPO_ORDER = ['p', 'h1', 'h2', 'h3', 'quote', 'ul', 'ol']

// ─── Component ─────────────────────────────────────────────────────────────────

export default function BloqueContenido({
  bloque,
  index,
  editable = true,
  onComentarioClick,
  onContenidoChange,
  onTipoChange,
  onAccionIA,
  textoReemplazando = null,
  citaciones = null,
  onCitaInteraction = null,
}) {
  const [toolbarVisible, setToolbarVisible] = useState(false)
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 })
  const [selectedText, setSelectedText] = useState('')
  const [menuFormato, setMenuFormato] = useState(false)
  const contenedorRef = useRef(null)
  const toolbarRef = useRef(null)
  const editableRef = useRef(null)
  const menuFormatoRef = useRef(null)

  const tipo = bloque.tipo || 'p'

  if (tipo === 'hr') {
    return <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '8px 0' }} />
  }
  const tipoConf = TIPO_CONFIG[tipo] || TIPO_CONFIG.p
  const comentariosActivos = bloque.comentarios?.filter(c => !c.resuelto) || []
  const tieneComentarioCritico = comentariosActivos.some(c => c.gravedad === 'critico')

  // Sync innerHTML only when bloque.contenido changes externally (e.g. after tipo change or IA replace)
  // NOT on every render — avoids fighting contentEditable
  useEffect(() => {
    const el = editableRef.current
    if (!el) return
    // Array contenido (ul/ol) is rendered as static <li> elements — no innerHTML sync needed
    if (Array.isArray(bloque.contenido)) return
    if (el.innerHTML !== bloque.contenido) {
      el.innerHTML = bloque.contenido
    }
  }, [bloque.contenido])

  // Post-render DOM pass: transform [N] text markers into clickable citation spans
  useEffect(() => {
    const el = editableRef.current
    if (!el || !citaciones?.length) return
    if (tipo === 'code' || tipo === 'hr') return

    // Idempotent cleanup: unwrap any existing citation spans back to plain text
    el.querySelectorAll('.cita-marker').forEach(span => {
      span.replaceWith(document.createTextNode(span.textContent))
    })

    // Collect all text nodes that contain citation markers
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null)
    const replacements = []
    let node
    while ((node = walker.nextNode())) {
      const text = node.nodeValue
      if (/\[\d+\]/.test(text)) {
        replacements.push({ node, text })
      }
    }

    // Process replacements (separate loop to avoid tree walker invalidation)
    replacements.forEach(({ node, text }) => {
      const regex = /\[(\d+)\]/g
      const fragment = document.createDocumentFragment()
      let lastIndex = 0
      let match
      while ((match = regex.exec(text)) !== null) {
        const num = parseInt(match[1], 10)
        const cita = citaciones.find(c => c.num === num)

        // Always advance past this match — emit plain text if no cita found
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)))
        }

        if (!cita) {
          fragment.appendChild(document.createTextNode(match[0]))
        } else {
          const span = document.createElement('span')
          span.className = 'cita-marker'
          span.setAttribute('contenteditable', 'false')
          span.setAttribute('data-cita-num', num)
          span.textContent = `[${num}]`
          span.style.cssText = [
            'display:inline-block',
            'padding:0 3px',
            'border-radius:3px',
            'font-size:0.78em',
            'font-weight:600',
            'vertical-align:super',
            'line-height:1',
            'cursor:pointer',
            'user-select:none',
            'background:#E7EFFE',
            'color:#367CFF',
            'border:1px solid #BAD2FF',
            'transition:background 0.12s',
          ].join(';')

          span.addEventListener('mouseenter', () => {
            span.style.background = '#BAD2FF'
            onCitaInteraction?.({ type: 'hover', num, anchorEl: span })
          })
          span.addEventListener('mouseleave', () => {
            span.style.background = '#E7EFFE'
            onCitaInteraction?.({ type: 'leave', num, anchorEl: span })
          })
          span.addEventListener('click', (e) => {
            e.stopPropagation()
            onCitaInteraction?.({ type: 'click', num, anchorEl: span })
          })

          fragment.appendChild(span)
        }

        lastIndex = match.index + match[0].length
      }

      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
      }

      node.parentNode.replaceChild(fragment, node)
    })
  }, [bloque.contenido, citaciones])

  const handleMouseUp = useCallback(() => {
    setTimeout(() => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed || selection.toString().trim().length < 2) {
        setToolbarVisible(false)
        return
      }
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      const containerRect = contenedorRef.current?.getBoundingClientRect()
      if (!containerRect) return

      setToolbarPos({
        top: rect.top - containerRect.top,
        left: rect.left - containerRect.left,
      })
      setSelectedText(selection.toString().trim())
      setToolbarVisible(true)
    }, 10)
  }, [editable])

  const handleClickOutside = useCallback((e) => {
    if (toolbarRef.current && !toolbarRef.current.contains(e.target)) {
      setToolbarVisible(false)
    }
    if (menuFormatoRef.current && !menuFormatoRef.current.contains(e.target)) {
      setMenuFormato(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  // ── Inline mark (bold / italic via execCommand) ───────────────────────────────

  const applyMark = (command) => {
    editableRef.current?.focus()
    document.execCommand(command)
    if (editableRef.current) onContenidoChange?.(bloque.id, editableRef.current.innerHTML)
  }

  // ── Block type change ─────────────────────────────────────────────────────────

  const handleTipoChange = (nuevoTipo) => {
    setToolbarVisible(false)
    window.getSelection()?.removeAllRanges()
    onTipoChange?.(bloque.id, nuevoTipo)
  }

  // ── Toolbar actions ───────────────────────────────────────────────────────────

  const toolbarActionsIA = editable
    ? [
        { label: 'Buscar fuentes bibliográficas', icon: BookmarkSimple },
        { label: 'Expandir', icon: MagnifyingGlassPlus },
        { label: 'Resumir', icon: CornersIn },
        { label: 'Regenerar', icon: ArrowsClockwise },
        { label: 'Realizar investigación profunda', icon: MagnifyingGlass },
      ]
    : []

  const toolbarActionsChat = [{ label: 'Llevar al chat', icon: ArrowUpRight }]

  const toolbarActionsAnotaciones = [
    { label: 'Añadir comentario', icon: Chat },
    { label: 'Añadir nota', icon: Note },
  ]

  // ── Content render ─────────────────────────────────────────────────────────────

  const renderContent = () => {
    const contenido = bloque.contenido

    // For list types with array contenido render static <li> items
    if ((tipo === 'ul' || tipo === 'ol') && Array.isArray(contenido)) {
      const Tag = tipo === 'ul' ? 'ul' : 'ol'
      const className = tipo === 'ul' ? 'list-disc pl-5' : 'list-decimal pl-5'
      return (
        <Tag className={className}>
          {contenido.map((item, idx) => (
            <li key={idx} className={tipoConf.className} style={tipoConf.style}>{item}</li>
          ))}
        </Tag>
      )
    }

    // For list types wrap in ul/ol
    const maybeWrapList = (inner) => {
      if (tipo === 'ul') return <ul className="list-disc pl-5">{inner}</ul>
      if (tipo === 'ol') return <ol className="list-decimal pl-5">{inner}</ol>
      return inner
    }

    // Read-only with optional strikethrough on replaced text
    if (textoReemplazando && typeof contenido === 'string' && contenido.includes(textoReemplazando)) {
      const idx = contenido.indexOf(textoReemplazando)
      return maybeWrapList(
        <p className={tipoConf.className} style={tipoConf.style}>
          {contenido.slice(0, idx)}
          <span style={{ color: '#6B7280', textDecoration: 'line-through' }}>{textoReemplazando}</span>
          {contenido.slice(idx + textoReemplazando.length)}
        </p>
      )
    }

    // contentEditable for all roles — author can edit, others are read-only via onKeyDown block
    return maybeWrapList(
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        onInput={e => {
          if (editable) onContenidoChange?.(bloque.id, e.currentTarget.innerHTML)
          else e.currentTarget.innerHTML = contenido // revert any change
        }}
        onKeyDown={e => { if (!editable) e.preventDefault() }}
        onPaste={e => { if (!editable) e.preventDefault() }}
        className={tipoConf.className}
        style={{ ...tipoConf.style, caretColor: editable ? '#367CFF' : 'transparent', outline: 'none' }}
      />
    )
  }

  return (
    <div
      className="group relative"
      ref={contenedorRef}
      onMouseUp={handleMouseUp}
style={{ fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}
    >
      {/* Left accent for critical comments */}
      {tieneComentarioCritico && (
        <div
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{ width: '3px', background: '#EF4444', left: '-16px' }}
        />
      )}

      {/* Block number in gutter */}
      <div
        className="absolute text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity select-none"
        style={{ color: '#D1D5DB', top: '2px', left: '-32px', fontVariantNumeric: 'tabular-nums' }}
      >
        {index + 1}
      </div>

      {/* ── Block format handle (author only, left gutter) ── */}
      {editable && (
        <div
          ref={menuFormatoRef}
          style={{ position: 'absolute', left: '-76px', top: '0px', zIndex: 40 }}
        >
          <Tooltip text="Editar formato" side="bottom">
            <button
              onMouseDown={e => e.preventDefault()}
              onClick={() => setMenuFormato(prev => !prev)}
              className={menuFormato ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity'}
              style={{
                height: '26px',
                padding: '0 8px',
                display: 'flex', alignItems: 'center', gap: '5px',
                borderRadius: '7px',
                border: '1px solid #0A5CF5',
                background: menuFormato ? '#dbeafe' : '#F0F6FF',
                color: '#0A5CF5', cursor: 'pointer',
                fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#dbeafe' }}
              onMouseLeave={e => { e.currentTarget.style.background = menuFormato ? '#dbeafe' : '#F0F6FF' }}
            >
              <TextAa size={14} weight="bold" />
            </button>
          </Tooltip>

          {menuFormato && (
            <div
              className="animate-fade-in"
              style={{
                position: 'absolute', top: '0', left: '60px', zIndex: 50,
                background: '#FFFFFF', border: '1px solid #E5E7EB',
                borderRadius: '8px', boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                padding: '5px', width: '170px',
              }}
            >
              <p style={{ fontSize: '10px', fontWeight: '600', color: '#6B7280', padding: '2px 6px 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Tipo de bloque
              </p>

              {TIPO_ORDER.map(t => {
                const conf = TIPO_CONFIG[t]
                const active = tipo === t
                return (
                  <button
                    key={t}
                    title={conf.title}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => { handleTipoChange(t); setMenuFormato(false) }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      width: '100%', padding: '5px 8px', borderRadius: '5px',
                      fontSize: '12px', background: active ? '#E7EFFE' : 'transparent',
                      color: active ? '#367CFF' : '#374151',
                      fontWeight: active ? '600' : '400',
                      textAlign: 'left', cursor: 'pointer', border: 'none',
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F3F4F6' }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                  >
                    <span style={{
                      minWidth: '22px', height: '18px',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '10px', fontWeight: '700', borderRadius: '3px',
                      background: active ? '#367CFF' : '#F3F4F6',
                      color: active ? '#FFFFFF' : '#6B7280', flexShrink: 0,
                    }}>
                      {t === 'ul' ? <ListBullets size={10} />
                        : t === 'ol' ? <ListNumbers size={10} />
                        : t === 'quote' ? <Quotes size={9} />
                        : conf.label}
                    </span>
                    {conf.title}
                  </button>
                )
              })}

              <div style={{ height: '1px', background: '#F3F4F6', margin: '4px 0' }} />

              <div style={{ display: 'flex', gap: '4px', padding: '2px 4px' }}>
                <Tooltip text="Negrita">
                  <button
                    onMouseDown={e => { e.preventDefault(); applyMark('bold'); setMenuFormato(false) }}
                    style={{ width: '28px', height: '28px', borderRadius: '5px', background: '#F3F4F6', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                    onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
                  >
                    <TextB size={13} />
                  </button>
                </Tooltip>
                <Tooltip text="Cursiva">
                  <button
                    onMouseDown={e => { e.preventDefault(); applyMark('italic'); setMenuFormato(false) }}
                    style={{ width: '28px', height: '28px', borderRadius: '5px', background: '#F3F4F6', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                    onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
                  >
                    <TextItalic size={13} />
                  </button>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Comment badge in right gutter */}
      {comentariosActivos.length > 0 ? (
        <button
          onClick={() => onComentarioClick?.(bloque)}
          className="absolute flex items-center gap-1 transition-all hover:scale-105"
          style={{
            right: '-44px',
            top: '2px',
            background: gravedadConfig[comentariosActivos[0].gravedad]?.bg,
            color: gravedadConfig[comentariosActivos[0].gravedad]?.color,
            border: `1px solid ${gravedadConfig[comentariosActivos[0].gravedad]?.border}`,
            borderRadius: '6px',
            padding: '2px 6px',
            fontSize: '11px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
          }}
          title={`${comentariosActivos.length} comentario${comentariosActivos.length > 1 ? 's' : ''}`}
        >
          <Chat size={10} />
          {comentariosActivos.length}
        </button>
      ) : onAccionIA ? (
        <button
          onClick={() => onAccionIA('', 'Añadir comentario', bloque)}
          className="absolute flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            right: '-44px',
            top: '2px',
            background: '#F3F4F6',
            color: '#6B7280',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            padding: '2px 6px',
            fontSize: '11px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
          title="Añadir comentario"
          onMouseEnter={e => { e.currentTarget.style.background = '#E7EFFE'; e.currentTarget.style.color = '#367CFF'; e.currentTarget.style.borderColor = '#BFDBFE' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderColor = '#E5E7EB' }}
        >
          <Chat size={10} />
        </button>
      ) : null}

      {/* Content area */}
      <div className="relative py-1">
        {renderContent()}

        {!editable && comentariosActivos.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span
              className="text-xs px-2 py-0.5 rounded font-medium"
              style={{
                background: gravedadConfig[comentariosActivos[0].gravedad]?.bg,
                color: gravedadConfig[comentariosActivos[0].gravedad]?.color,
                border: `1px solid ${gravedadConfig[comentariosActivos[0].gravedad]?.border}`,
              }}
            >
              {gravedadConfig[comentariosActivos[0].gravedad]?.emoji} {comentariosActivos.length} comentario
            </span>
          </div>
        )}
      </div>

      {/* ── Floating toolbar (appears above selection) ────────────────────────── */}
      {toolbarVisible && (
        <div
          ref={toolbarRef}
          className="absolute z-50 animate-fade-in"
          style={{
            top: `${toolbarPos.top}px`,
            left: `${Math.max(0, toolbarPos.left)}px`,
            transform: 'translateY(calc(-100% - 8px))',
            width: 200,
            paddingTop: 10,
            paddingBottom: 4,
            paddingLeft: 8,
            paddingRight: 8,
            background: 'white',
            borderRadius: 10,
            outline: '1px #DCDFEB solid',
            outlineOffset: '-1px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {/* ── IA section ──────────────────────────────────────────── */}
          {toolbarActionsIA.length > 0 && (
            <>
              <div style={{ paddingLeft: 8, paddingRight: 8, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '500', lineHeight: '16px', background: 'linear-gradient(90deg, #A956D5 0%, #066EE0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Herramientas IA
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {toolbarActionsIA.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => {
                      const texto = selectedText
                      setToolbarVisible(false)
                      setSelectedText('')
                      window.getSelection()?.removeAllRanges()
                      if (texto && onAccionIA) onAccionIA(texto, label, bloque)
                    }}
                    style={{
                      paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
                      borderRadius: 6,
                      border: 'none',
                      background: 'transparent',
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <Icon size={16} style={{ color: '#566077', flexShrink: 0 }} />
                    <span style={{ color: '#566077', fontSize: 14, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '500', lineHeight: '20px' }}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── Chat + annotations section ──────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[...toolbarActionsChat, ...toolbarActionsAnotaciones].map(({ label, icon: Icon }, idx) => (
              <>
                <button
                  key={label}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    const texto = selectedText
                    setToolbarVisible(false)
                    setSelectedText('')
                    window.getSelection()?.removeAllRanges()
                    if (onAccionIA && (texto || label === 'Añadir comentario')) onAccionIA(texto || '', label, bloque)
                  }}
                  style={{
                    paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
                    borderRadius: 6,
                    border: 'none',
                    background: 'transparent',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  <Icon size={16} style={{ color: '#566077', flexShrink: 0 }} />
                  <span style={{ color: '#566077', fontSize: 14, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '500', lineHeight: '20px' }}>
                    {label}
                  </span>
                </button>
                {idx === toolbarActionsChat.length - 1 && (
                  <div key="sep" style={{ height: 1, background: '#DCDFEB', marginLeft: 8, marginRight: 8, marginTop: 2, marginBottom: 2 }} />
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

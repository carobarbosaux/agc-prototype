import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { ZoomIn, Minimize2, RefreshCw, Search, BookMarked, MessageSquare, StickyNote, MessageCircle, ArrowUpRight, Bold, Italic, Quote, List, ListOrdered } from 'lucide-react'
import { gravedadConfig } from '../mockData'
import { ProdiMark } from './ProdiLogo'

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
}) {
  const [toolbarVisible, setToolbarVisible] = useState(false)
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 })
  const [selectedText, setSelectedText] = useState('')
  const contenedorRef = useRef(null)
  const toolbarRef = useRef(null)
  const editableRef = useRef(null)

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
    if (el.innerHTML !== bloque.contenido) {
      el.innerHTML = bloque.contenido
    }
  }, [bloque.contenido])

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
        { label: 'Buscar fuentes bibliográficas', icon: BookMarked },
        { label: 'Expandir', icon: ZoomIn },
        { label: 'Resumir', icon: Minimize2 },
        { label: 'Regenerar', icon: RefreshCw },
        { label: 'Realizar investigación profunda', icon: Search },
        { label: 'Llevar al chat', icon: ArrowUpRight },
      ]
    : [
        { label: 'Llevar al chat', icon: ArrowUpRight },
      ]

  const toolbarActionsAnotaciones = [
    { label: 'Añadir comentario', icon: MessageSquare },
    { label: 'Añadir nota', icon: StickyNote },
  ]

  // ── Content render ─────────────────────────────────────────────────────────────

  const renderContent = () => {
    const contenido = bloque.contenido
    const editStyle = { ...tipoConf.style, caretColor: '#367CFF', outline: 'none' }

    // For list types wrap in ul/ol
    const maybeWrapList = (inner) => {
      if (tipo === 'ul') return <ul className="list-disc pl-5">{inner}</ul>
      if (tipo === 'ol') return <ol className="list-decimal pl-5">{inner}</ol>
      return inner
    }

    // Read-only with optional strikethrough on replaced text
    if (textoReemplazando && contenido.includes(textoReemplazando)) {
      const idx = contenido.indexOf(textoReemplazando)
      return maybeWrapList(
        <p className={tipoConf.className} style={tipoConf.style}>
          {contenido.slice(0, idx)}
          <span style={{ color: '#9CA3AF', textDecoration: 'line-through' }}>{textoReemplazando}</span>
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
          else e.currentTarget.innerHTML = bloque.contenido // revert any change
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
      style={{ fontFamily: "'Inter', 'Arial', sans-serif" }}
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

      {/* Comment badge in right gutter */}
      {comentariosActivos.length > 0 && (
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
          <MessageCircle size={10} />
          {comentariosActivos.length}
        </button>
      )}

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
            width: editable ? '220px' : '180px',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          {/* ── Format section (author only) ──────────────────────── */}
          {editable && (
            <>
              <div style={{ padding: '6px 6px 4px' }}>
                {/* Block type pills */}
                <div className="flex items-center gap-1 flex-wrap mb-2">
                  {TIPO_ORDER.map(t => {
                    const conf = TIPO_CONFIG[t]
                    const active = tipo === t
                    return (
                      <button
                        key={t}
                        title={conf.title}
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleTipoChange(t)}
                        className="flex items-center justify-center rounded transition-colors"
                        style={{
                          minWidth: '24px',
                          height: '24px',
                          padding: '0 5px',
                          fontSize: '11px',
                          fontWeight: '700',
                          background: active ? '#367CFF' : '#F3F4F6',
                          color: active ? '#FFFFFF' : '#374151',
                        }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#E5E7EB' }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.background = '#F3F4F6' }}
                      >
                        {t === 'ul'
                          ? <List size={11} />
                          : t === 'ol'
                          ? <ListOrdered size={11} />
                          : t === 'quote'
                          ? <Quote size={10} />
                          : conf.label}
                      </button>
                    )
                  })}
                </div>

                {/* Inline marks row */}
                <div className="flex items-center gap-1">
                  <button
                    title="Negrita"
                    onMouseDown={e => { e.preventDefault(); applyMark('bold') }}
                    className="flex items-center justify-center rounded transition-colors"
                    style={{ width: '24px', height: '24px', background: '#F3F4F6', color: '#374151' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                    onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
                  >
                    <Bold size={11} />
                  </button>
                  <button
                    title="Cursiva"
                    onMouseDown={e => { e.preventDefault(); applyMark('italic') }}
                    className="flex items-center justify-center rounded transition-colors"
                    style={{ width: '24px', height: '24px', background: '#F3F4F6', color: '#374151' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                    onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
                  >
                    <Italic size={11} />
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div style={{ height: '1px', background: '#F3F4F6' }} />
            </>
          )}

          {/* ── IA + Annotation actions ──────────────────────────────── */}
          <div style={{ padding: '3px' }}>
            {editable && (
              <div className="px-2 pt-1.5 pb-0.5 flex items-center gap-1.5">
                <ProdiMark size={14} />
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9CA3AF' }}>
                  Asistente de contenidos
                </p>
              </div>
            )}
            {[...toolbarActionsIA, ...toolbarActionsAnotaciones].map(({ label, icon: Icon }) => (
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
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors text-left"
                style={{ color: '#374151' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Icon size={13} style={{ color: '#6B7280', flexShrink: 0 }} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

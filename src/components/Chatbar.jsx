import { useState, useRef, useEffect } from 'react'
import { PaperPlaneTilt, BookOpen, PencilSimple, ClipboardText, Flask, CheckSquare, Chat, X, Plus, ChartBar, ShieldWarning } from '@phosphor-icons/react'
import { shortcutsComandos, respuestasIAChatbar } from '../mockData'
import Tooltip from './Tooltip'

const SUGERENCIAS = {
  teams:      ['Resumir comentarios del coordinador', 'Identificar cambios solicitados'],
  sharepoint: ['Buscar documentación relevante', 'Extraer conceptos clave', 'Verificar alineación con guías'],
  outlook:    ['Extraer correcciones', 'Detectar puntos críticos'],
  onedrive:   ['Buscar archivos relacionados', 'Reutilizar contenido previo', 'Resumir documentos', 'Detectar inconsistencias'],
  canva:      ['Proponer estructura visual', 'Simplificar contenido'],
  genially:   ['Crear actividad interactiva', 'Proponer experiencia dinámica'],
}

const iconMap = {
  BookOpen,
  PencilSimple,
  ClipboardText,
  Flask,
  CheckSquare,
  ChartBar,
  ShieldWarning,
}

export default function Chatbar({ onNavigate, placeholder = 'Mensaje', chatHistorial, setChatHistorial, shortcuts, onShortcutAction, conectoresHaciaArriba = false }) {
  const shortcutList = shortcuts ?? shortcutsComandos
  const [valor, setValor] = useState('')
  const [dropdownAbierto, setDropdownAbierto] = useState(false)
  const [dropdownFiltrado, setDropdownFiltrado] = useState(shortcutList)
  const [historialVisible, setHistorialVisible] = useState(false)

  const [conectoresAbierto, setConectoresAbierto] = useState(false)
  const [companyKnowledgeOn, setCompanyKnowledgeOn] = useState(false)
  const [selectedConectores, setSelectedConectores] = useState(new Set())
  const [sugerenciasOcultas, setSugerenciasOcultas] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const containerRef = useRef(null)
  const conectoresRef = useRef(null)

  const CK_CHILDREN_IDS = ['teams', 'sharepoint', 'outlook', 'onedrive']

  function toggleCompanyKnowledge() {
    if (companyKnowledgeOn) {
      setSelectedConectores(prev => {
        const next = new Set(prev)
        CK_CHILDREN_IDS.forEach(id => next.delete(id))
        return next
      })
      setCompanyKnowledgeOn(false)
    } else {
      setCompanyKnowledgeOn(true)
    }
  }

  function toggleConector(id) {
    setSelectedConectores(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    setSugerenciasOcultas(false)
    setConectoresAbierto(false)
  }

  const handleChange = (e) => {
    const val = e.target.value
    setValor(val)

    if (val.startsWith('/')) {
      const query = val.slice(1).toLowerCase()
      const filtrados = shortcutList.filter(s =>
        s.comando.toLowerCase().includes(query) || s.descripcion.toLowerCase().includes(query)
      )
      setDropdownFiltrado(filtrados)
      setDropdownAbierto(true)
    } else {
      setDropdownAbierto(false)
    }
  }

  const handleSelectShortcut = (shortcut) => {
    setDropdownAbierto(false)
    setValor('')
    if (shortcut.accion === 'crearAsignatura') {
      onNavigate('crearAsignatura')
    } else if (['filtrarPendientes', 'seguimiento', 'filtrarAlertas', 'filtrarRevision'].includes(shortcut.accion)) {
      onShortcutAction?.(shortcut.accion)
    } else {
      const msg = { id: Date.now(), rol: 'usuario', mensaje: shortcut.comando }
      const resp = {
        id: Date.now() + 1,
        rol: 'ia',
        mensaje: `La herramienta "${shortcut.descripcion}" estará disponible próximamente. Por ahora puedes usar /generar-asignatura.`,
      }
      setChatHistorial(prev => [...prev, msg, resp])
      setHistorialVisible(true)
    }
  }

  const handleSend = () => {
    const texto = valor.trim()
    if (!texto) return

    if (texto.startsWith('/')) {
      const match = shortcutList.find(s => s.comando === texto || texto.startsWith(s.comando))
      if (match) {
        handleSelectShortcut(match)
        return
      }
    }

    const msg = { id: Date.now(), rol: 'usuario', mensaje: texto }
    const respIdx = Math.floor(Math.random() * respuestasIAChatbar.length)
    const resp = { id: Date.now() + 1, rol: 'ia', mensaje: respuestasIAChatbar[respIdx] }

    setChatHistorial(prev => [...prev, msg, resp])
    setValor('')
    setExpanded(false)
    setHistorialVisible(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (dropdownAbierto && dropdownFiltrado.length > 0) {
        handleSelectShortcut(dropdownFiltrado[0])
      } else {
        handleSend()
      }
    }
    if (e.key === 'Escape') {
      setDropdownAbierto(false)
      setHistorialVisible(false)
      setConectoresAbierto(false)
    }
  }

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
        setDropdownAbierto(false)
      }
      if (conectoresRef.current && !conectoresRef.current.contains(e.target)) {
        setConectoresAbierto(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const canSend = !!valor.trim()
  const suggestedChips = [...selectedConectores].flatMap(id => (SUGERENCIAS[id] || []).map(text => ({ text, id })))
  const hasChips = suggestedChips.length > 0 && !sugerenciasOcultas

  return (
    <div className="w-full relative mx-auto" style={{ fontFamily: "'Proeduca Sans', system-ui, sans-serif", zIndex: 40, maxWidth: 960 }}>
      {/* Chat history bubble */}
      {historialVisible && chatHistorial.length > 0 && (
        <div
          className="absolute top-full mt-2 left-0 right-0 rounded-2xl overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            maxHeight: '240px',
            overflowY: 'auto',
          }}
        >
          <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid #F1F5F9' }}>
            <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold" style={{ color: '#367CFF' }}>Asistente AGC</span>
            </div>
            <button
              onClick={() => setHistorialVisible(false)}
              className="p-1 rounded"
              onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <X size={12} style={{ color: '#6B7280' }} />
            </button>
          </div>
          <div className="px-4 py-3 flex flex-col gap-3">
            {chatHistorial.map(msg => (
              <div key={msg.id} className={`flex ${msg.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                {msg.rol === 'ia' && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                    style={{ background: '#E7EFFE' }}>
                                      </div>
                )}
                <div
                  className="max-w-xs rounded-xl px-3 py-2 text-xs leading-relaxed"
                  style={{
                    background: msg.rol === 'usuario' ? '#0A5CF5' : '#F8F9FA',
                    color: msg.rol === 'usuario' ? '#FFFFFF' : '#374151',
                    borderRadius: msg.rol === 'usuario' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                  }}
                >
                  {msg.mensaje}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shortcuts dropdown */}
      {dropdownAbierto && dropdownFiltrado.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-1 left-0 right-0 rounded-xl overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            zIndex: 50,
          }}
        >
          <div className="px-3 py-2" style={{ borderBottom: '1px solid #F1F5F9' }}>
            <span className="text-xs font-semibold" style={{ color: '#6B7280' }}>Comandos disponibles</span>
          </div>
          {dropdownFiltrado.map(s => {
            const Icon = iconMap[s.icon] || BookOpen
            return (
              <button
                key={s.id}
                onClick={() => handleSelectShortcut(s)}
                className="w-full text-left flex items-center gap-3 px-3 py-2.5 transition-colors"
                onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: s.accion === 'crearAsignatura' ? '#E7EFFE' : '#F8F9FA' }}>
                  <Icon size={14} style={{ color: s.accion === 'crearAsignatura' ? '#367CFF' : '#6B7280' }} />
                </div>
                <div>
                  <span className="text-sm font-medium" style={{ color: '#1A1A1A', fontFamily: "'JetBrains Mono', monospace" }}>
                    {s.comando}
                  </span>
                  <p className="text-xs" style={{ color: '#6B7280' }}>{s.descripcion}</p>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Chatbar container — pill shape per Figma spec */}
      <div
        ref={containerRef}
        className="w-full flex flex-col py-2 px-3"
        style={{
          background: '#FFFFFF',
          boxShadow: '0px 9px 20px -2px rgba(0, 0, 0, 0.10)',
          borderTopLeftRadius: selectedConectores.size > 0 ? 18 : (expanded ? 28 : 40),
          borderTopRightRadius: selectedConectores.size > 0 ? 18 : (expanded ? 28 : 40),
          borderBottomLeftRadius: hasChips ? 0 : (selectedConectores.size > 0 ? 18 : (expanded ? 28 : 40)),
          borderBottomRightRadius: hasChips ? 0 : (selectedConectores.size > 0 ? 18 : (expanded ? 28 : 40)),
          outline: '1px solid #DCDFEB',
          outlineOffset: '-1px',
          transition: 'outline-color 150ms ease, border-radius 150ms ease',
          transition: 'outline-color 150ms ease',
          gap: 0,
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Shared: connectors dropdown trigger + dropdown panel */}
        {(() => {
          const plusBtn = (
            <div className="relative flex-shrink-0" ref={conectoresRef}>
              <Tooltip text="Conectores" side="top">
                <button
                  className="flex items-center justify-center transition-colors"
                  style={{
                    width: 30, height: 30, borderRadius: 80,
                    border: `1px solid ${conectoresAbierto ? '#BAD2FF' : 'transparent'}`,
                    background: conectoresAbierto ? '#E7EFFE' : 'transparent',
                    color: conectoresAbierto ? '#367CFF' : '#0A5CF5',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { if (!conectoresAbierto) { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#E2E8F0' } }}
                  onMouseLeave={e => { if (!conectoresAbierto) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' } }}
                  onClick={e => { e.stopPropagation(); setConectoresAbierto(v => !v) }}
                >
                  <Plus size={16} />
                </button>
              </Tooltip>
              {conectoresAbierto && (
                <div
                  className={`absolute ${conectoresHaciaArriba ? 'bottom-full mb-2' : 'top-full mt-2'} left-0`}
                  style={{
                    width: 260,
                    paddingTop: 10,
                    paddingBottom: 4,
                    paddingLeft: 8,
                    paddingRight: 8,
                    background: 'white',
                    borderRadius: 10,
                    outline: '1px #DCDFEB solid',
                    outlineOffset: '-1px',
                    boxShadow: conectoresHaciaArriba ? '0 -8px 24px rgba(0,0,0,0.10)' : '0 8px 24px rgba(0,0,0,0.10)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    zIndex: 50,
                  }}
                >
                  {/* Header label */}
                  <div style={{ paddingLeft: 8, paddingRight: 8, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '500', lineHeight: '16px', color: '#566077' }}>Conectores</span>
                  </div>

                  {/* Company Knowledge section */}
                  <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 4, borderBottom: '1px solid #F3F4F6' }}>
                    {/* CK toggle row */}
                    <div
                      style={{
                        paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
                        borderRadius: 6,
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}
                    >
                      <div style={{ width: 20, height: 20, borderRadius: 4, background: '#0078D4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: '#FFF', fontSize: '7px', fontWeight: 700 }}>CK</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '500', lineHeight: '20px', color: '#566077', margin: 0 }}>Company Knowledge</p>
                        <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0, lineHeight: '14px' }}>Fuentes institucionales</p>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); toggleCompanyKnowledge() }}
                        style={{ width: 36, height: 20, borderRadius: 30, background: companyKnowledgeOn ? '#0A5CF5' : '#DCDFEB', flexShrink: 0, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: companyKnowledgeOn ? 'flex-end' : 'flex-start', padding: companyKnowledgeOn ? '0 3px 0 0' : '0 0 0 3px' }}
                      >
                        <span style={{ width: 14, height: 14, borderRadius: 7, background: '#FFF', display: 'block', flexShrink: 0 }} />
                      </button>
                    </div>

                    {/* CK children */}
                    <div style={{ opacity: companyKnowledgeOn ? 1 : 0.35, pointerEvents: companyKnowledgeOn ? 'auto' : 'none', transition: 'opacity 0.15s', display: 'flex', flexDirection: 'column' }}>
                      {[
                        { id: 'teams', letter: 'T', color: '#6264A7', label: 'Teams', desc: 'Conversaciones y archivos' },
                        { id: 'sharepoint', letter: 'SP', color: '#0078D4', label: 'SharePoint', desc: 'Documentos institucionales' },
                        { id: 'outlook', letter: 'OL', color: '#0078D4', label: 'Outlook', desc: 'Correos y adjuntos' },
                        { id: 'onedrive', letter: 'OD', color: '#0078D4', label: 'OneDrive', desc: 'Archivos personales' },
                      ].map(c => {
                        const active = selectedConectores.has(c.id)
                        return (
                          <button key={c.id} onClick={e => { e.stopPropagation(); toggleConector(c.id) }}
                            style={{
                              paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5,
                              borderRadius: 6,
                              border: 'none',
                              background: active ? c.color + '12' : 'transparent',
                              display: 'flex', alignItems: 'center', gap: 8,
                              cursor: 'pointer',
                              width: '100%',
                              textAlign: 'left',
                            }}
                            onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F3F4F6' }}
                            onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                          >
                            <div style={{ width: 16, height: 16, borderRadius: 3, background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <span style={{ color: '#FFF', fontSize: '6px', fontWeight: 700 }}>{c.letter}</span>
                            </div>
                            <span style={{ fontSize: 14, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '500', lineHeight: '20px', color: active ? c.color : '#566077', flex: 1 }}>{c.label}</span>
                            {active && <div style={{ width: 6, height: 6, borderRadius: 3, background: c.color, flexShrink: 0 }} />}
                          </button>
                        )
                      })}
                    </div>
                    {!companyKnowledgeOn && (
                      <p style={{ fontSize: '10px', color: '#9CA3AF', fontStyle: 'italic', margin: '2px 10px 4px', lineHeight: '14px' }}>Activa para acceder a Teams, SharePoint, Outlook y OneDrive.</p>
                    )}
                  </div>

                  {/* Other connectors */}
                  <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 4 }}>
                    {[
                      { id: 'canva', letter: 'CA', color: '#7C3AED', label: 'Canva', desc: 'Diseños y recursos visuales' },
                      { id: 'genially', letter: 'GE', color: '#F97316', label: 'Genially', desc: 'Contenidos interactivos' },
                    ].map(c => {
                      const active = selectedConectores.has(c.id)
                      return (
                        <button key={c.id} onClick={e => { e.stopPropagation(); toggleConector(c.id) }}
                          style={{
                            paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
                            borderRadius: 6,
                            border: 'none',
                            background: active ? c.color + '12' : 'transparent',
                            display: 'flex', alignItems: 'center', gap: 8,
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'left',
                          }}
                          onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F3F4F6' }}
                          onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                        >
                          <div style={{ width: 20, height: 20, borderRadius: 4, background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ color: '#FFF', fontSize: '7px', fontWeight: 700 }}>{c.letter}</span>
                          </div>
                          <span style={{ fontSize: 14, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '500', lineHeight: '20px', color: active ? c.color : '#566077', flex: 1 }}>{c.label}</span>
                          {active && <div style={{ width: 6, height: 6, borderRadius: 3, background: c.color, flexShrink: 0 }} />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )

          const sendBtn = (
            <div className="flex items-center gap-2 flex-shrink-0">
              {chatHistorial.length > 0 && !historialVisible && (
                <button
                  onClick={(e) => { e.stopPropagation(); setHistorialVisible(true) }}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-colors"
                  style={{ color: '#6B7280', background: '#F8F9FA' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                  onMouseLeave={e => e.currentTarget.style.background = '#F8F9FA'}
                >
                  <Chat size={11} />
                  {chatHistorial.length}
                </button>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); handleSend() }}
                disabled={!canSend}
                className="flex items-center justify-center transition-all"
                style={{
                  width: 30, height: 30, borderRadius: 80,
                  background: canSend ? '#0A5CF5' : '#E6E6E6',
                  border: 'none',
                  cursor: canSend ? 'pointer' : 'default',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { if (canSend) e.currentTarget.style.background = '#0039A3' }}
                onMouseLeave={e => { e.currentTarget.style.background = canSend ? '#0A5CF5' : '#E6E6E6' }}
              >
                <PaperPlaneTilt size={16} style={{ color: canSend ? '#FFFFFF' : '#666666' }} />
              </button>
            </div>
          )

          const connectorTags = selectedConectores.size > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {[...selectedConectores].map(id => {
                const all = [
                  { id: 'teams', letter: 'T', color: '#6264A7', label: 'Teams' },
                  { id: 'sharepoint', letter: 'SP', color: '#0078D4', label: 'SharePoint' },
                  { id: 'outlook', letter: 'OL', color: '#0078D4', label: 'Outlook' },
                  { id: 'onedrive', letter: 'OD', color: '#0078D4', label: 'OneDrive' },
                  { id: 'canva', letter: 'CA', color: '#7C3AED', label: 'Canva' },
                  { id: 'genially', letter: 'GE', color: '#F97316', label: 'Genially' },
                ]
                const c = all.find(x => x.id === id)
                if (!c) return null
                return (
                  <button key={id}
                    onClick={e => { e.stopPropagation(); setSelectedConectores(prev => { const n = new Set(prev); n.delete(id); return n }) }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: c.color + '18', color: c.color, border: `1px solid ${c.color}40` }}
                  >
                    <span style={{ fontSize: '9px', fontWeight: 700 }}>{c.letter}</span>
                    {c.label}
                    <X size={10} />
                  </button>
                )
              })}
            </div>
          )

          const textarea = (
            <textarea
              ref={inputRef}
              value={valor}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              className="w-full bg-transparent outline-none resize-none overflow-y-auto"
              style={{
                color: '#272A3F',
                caretColor: '#0A5CF5',
                maxHeight: '144px',
                fontFamily: "'Proeduca Sans', system-ui, sans-serif",
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.5,
              }}
              onInput={e => {
                e.target.style.height = 'auto'
                const h = Math.min(e.target.scrollHeight, 144)
                e.target.style.height = h + 'px'
                setExpanded(e.target.scrollHeight > 44)
              }}
            />
          )

          if (expanded) {
            // Expanded: textarea on top (full width), buttons row below
            return (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1 px-1">
                  {connectorTags}
                  {textarea}
                </div>
                <div className="flex items-center justify-between">
                  {plusBtn}
                  {sendBtn}
                </div>
              </div>
            )
          }

          // Compact: single row + | [tags] textarea | send
          return (
            <div className="flex items-center gap-2">
              {plusBtn}
              <div className="flex-1 flex flex-col gap-1" style={{ paddingLeft: 4 }}>
                {connectorTags}
                {textarea}
              </div>
              {sendBtn}
            </div>
          )
        })()}
      </div>

      {/* Suggested prompts — attached below chatbar, floats over content */}
      {hasChips && (
          <div
            className="absolute left-0 right-0 overflow-hidden"
            style={{
              top: '100%',
              background: '#FFFFFF',
              border: '1px solid #DCDFEB',
              borderTop: '1px solid #F1F5F9',
              borderRadius: '0 0 24px 24px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.07)',
              zIndex: 30,
            }}
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                            {suggestedChips.map(({ text }, i) => (
                <button
                  key={i}
                  onClick={() => { setValor(text); setSugerenciasOcultas(true); inputRef.current?.focus() }}
                  className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs whitespace-nowrap"
                  style={{ background: '#F1F5F9', color: '#374151', border: '1px solid #E2E8F0' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#E7EFFE'; e.currentTarget.style.borderColor = '#BAD2FF'; e.currentTarget.style.color = '#367CFF' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#374151' }}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
      )}
    </div>
  )
}

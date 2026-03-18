import { useState, useRef, useEffect } from 'react'
import { PaperPlaneTilt, Sparkle, BookOpen, PencilSimple, ClipboardText, Flask, CheckSquare, Chat, X, Plus, ChartBar, ShieldWarning } from '@phosphor-icons/react'
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
  const [focused, setFocused] = useState(false)
  const [conectoresAbierto, setConectoresAbierto] = useState(false)
  const [companyKnowledgeOn, setCompanyKnowledgeOn] = useState(false)
  const [selectedConectores, setSelectedConectores] = useState(new Set())
  const [sugerenciasOcultas, setSugerenciasOcultas] = useState(false)
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
    <div className="w-full relative" style={{ fontFamily: "'Proeduca Sans', system-ui, sans-serif", zIndex: 40 }}>
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
              <Sparkle size={13} style={{ color: '#367CFF' }} />
              <span className="text-xs font-semibold" style={{ color: '#367CFF' }}>Asistente AGC</span>
            </div>
            <button
              onClick={() => setHistorialVisible(false)}
              className="p-1 rounded"
              onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <X size={12} style={{ color: '#9CA3AF' }} />
            </button>
          </div>
          <div className="px-4 py-3 flex flex-col gap-3">
            {chatHistorial.map(msg => (
              <div key={msg.id} className={`flex ${msg.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                {msg.rol === 'ia' && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                    style={{ background: '#E7EFFE' }}>
                    <Sparkle size={10} style={{ color: '#367CFF' }} />
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
            <span className="text-xs font-semibold" style={{ color: '#9CA3AF' }}>Comandos disponibles</span>
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
                  <Icon size={14} style={{ color: s.accion === 'crearAsignatura' ? '#367CFF' : '#94A3B8' }} />
                </div>
                <div>
                  <span className="text-sm font-medium" style={{ color: '#1A1A1A', fontFamily: "'JetBrains Mono', monospace" }}>
                    {s.comando}
                  </span>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>{s.descripcion}</p>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Chatbar container — Figma spec: white bg, #CBD5E1 border, 24px radius, 16px padding */}
      <div
        ref={containerRef}
        className="w-full flex flex-col gap-4 p-4"
        style={{
          background: '#FFFFFF',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: focused ? '#0A5CF5' : '#CBD5E1',
          borderBottomColor: hasChips ? 'transparent' : (focused ? '#0A5CF5' : '#CBD5E1'),
          borderRadius: hasChips ? '24px 24px 0 0' : '24px',
          transition: 'border-color 150ms ease, border-radius 150ms ease',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Text area */}
        <input
          ref={inputRef}
          type="text"
          value={valor}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-base leading-6"
          style={{
            color: '#1E293B',
            caretColor: '#0A5CF5',
          }}
        />

        {/* Bottom row: + button (left) + [history badge] + send button (right) */}
        <div className="flex items-center justify-between">
          {/* Left: + / connectors button */}
          <div className="flex items-center gap-2">
            <div className="relative" ref={conectoresRef}>
              <Tooltip text="Conectores" side="top">
                <button
                  className="flex items-center justify-center rounded-[10px] transition-colors"
                  style={{
                    width: 36,
                    height: 36,
                    border: `1px solid ${conectoresAbierto ? '#BAD2FF' : 'transparent'}`,
                    background: conectoresAbierto ? '#E7EFFE' : 'transparent',
                    color: conectoresAbierto ? '#367CFF' : '#64748B',
                  }}
                  onMouseEnter={e => { if (!conectoresAbierto) { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#E2E8F0' } }}
                  onMouseLeave={e => { if (!conectoresAbierto) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' } }}
                  onClick={e => { e.stopPropagation(); setConectoresAbierto(v => !v) }}
                >
                  <Plus size={20} />
                </button>
              </Tooltip>
              {conectoresAbierto && (
                <div
                  className={`absolute ${conectoresHaciaArriba ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 rounded-xl overflow-hidden`}
                  style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: conectoresHaciaArriba ? '0 -8px 24px rgba(0,0,0,0.12)' : '0 8px 24px rgba(0,0,0,0.12)', minWidth: '280px', zIndex: 50 }}
                >
                  {/* Header */}
                  <div className="px-3 py-2" style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#9CA3AF' }}>Conectores</p>
                  </div>

                  {/* Section: Company Knowledge */}
                  <div className="px-3 pt-1.5 pb-1" style={{ borderBottom: '1px solid #F3F4F6' }}>
                    {/* Parent row — toggle only */}
                    <div className="flex items-center gap-2.5 py-1">
                      <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ background: '#0078D4', fontSize: '7px' }}>CK</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium" style={{ color: '#111827' }}>Company Knowledge</p>
                        <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: 1 }}>Fuentes institucionales de tu organización</p>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); toggleCompanyKnowledge() }}
                        style={{ width: 28, height: 16, borderRadius: 8, background: companyKnowledgeOn ? '#367CFF' : '#D1D5DB', position: 'relative', flexShrink: 0, border: 'none', cursor: 'pointer' }}
                      >
                        <span style={{ position: 'absolute', top: 2, left: companyKnowledgeOn ? 14 : 2, width: 12, height: 12, borderRadius: '50%', background: '#FFF', transition: 'left 0.15s' }} />
                      </button>
                    </div>

                    {/* Child connectors — clickable selectors */}
                    <div style={{ opacity: companyKnowledgeOn ? 1 : 0.35, pointerEvents: companyKnowledgeOn ? 'auto' : 'none', transition: 'opacity 0.15s' }}>
                      {[
                        { id: 'teams', letter: 'T', color: '#6264A7', label: 'Teams', desc: 'Conversaciones y archivos' },
                        { id: 'sharepoint', letter: 'SP', color: '#0078D4', label: 'SharePoint', desc: 'Documentos institucionales' },
                        { id: 'outlook', letter: 'OL', color: '#0078D4', label: 'Outlook', desc: 'Correos y adjuntos' },
                        { id: 'onedrive', letter: 'OD', color: '#0078D4', label: 'OneDrive', desc: 'Archivos personales' },
                      ].map(c => {
                        const active = selectedConectores.has(c.id)
                        return (
                          <button
                            key={c.id}
                            onClick={e => { e.stopPropagation(); toggleConector(c.id) }}
                            className="w-full flex items-center gap-2.5 py-1 pl-3 rounded-lg text-left"
                            style={{ background: active ? c.color + '12' : 'transparent', border: 'none', cursor: 'pointer' }}
                            onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F8F9FA' }}
                            onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                          >
                            <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ background: c.color, fontSize: '6px' }}>{c.letter}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium" style={{ color: active ? c.color : '#374151' }}>{c.label}</p>
                              <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: 1 }}>{c.desc}</p>
                            </div>
                            {active && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />}
                          </button>
                        )
                      })}
                    </div>

                    {!companyKnowledgeOn && (
                      <p className="pb-1 pl-3" style={{ fontSize: '10px', color: '#9CA3AF', fontStyle: 'italic' }}>Activa para acceder a Teams, SharePoint, Outlook y OneDrive.</p>
                    )}
                  </div>

                  {/* Section: Otros conectores — clickable selectors */}
                  <div className="px-3 pt-1.5 pb-2">
                    {[
                      { id: 'canva', letter: 'CA', color: '#7C3AED', label: 'Canva', desc: 'Diseños y recursos visuales' },
                      { id: 'genially', letter: 'GE', color: '#F97316', label: 'Genially', desc: 'Contenidos interactivos' },
                    ].map(c => {
                      const active = selectedConectores.has(c.id)
                      return (
                        <button
                          key={c.id}
                          onClick={e => { e.stopPropagation(); toggleConector(c.id) }}
                          className="w-full flex items-center gap-2.5 py-1 rounded-lg text-left"
                          style={{ background: active ? c.color + '12' : 'transparent', border: 'none', cursor: 'pointer' }}
                          onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F8F9FA' }}
                          onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                        >
                          <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ background: c.color, fontSize: '7px' }}>{c.letter}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium" style={{ color: active ? c.color : '#111827' }}>{c.label}</p>
                            <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: 1 }}>{c.desc}</p>
                          </div>
                          {active && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Connector tags — inline, right of + button */}
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
                <button
                  key={id}
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
          </div>

          {/* Right: send button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleSend() }}
            disabled={!canSend}
            className="flex items-center justify-center rounded-[10px] transition-all"
            style={{
              width: 36,
              height: 36,
              background: canSend ? '#0A5CF5' : '#E6E6E6',
              border: `1px solid ${canSend ? '#0A5CF5' : '#E6E6E6'}`,
              cursor: canSend ? 'pointer' : 'default',
            }}
            onMouseEnter={e => { if (canSend) e.currentTarget.style.background = '#0039A3' }}
            onMouseLeave={e => { if (canSend) e.currentTarget.style.background = '#0A5CF5' }}
          >
            <PaperPlaneTilt size={16} style={{ color: canSend ? '#FFFFFF' : '#9CA3AF' }} />
          </button>
        </div>
      </div>

      {/* Suggested prompts — attached below chatbar, floats over content */}
      {hasChips && (
          <div
            className="absolute left-0 right-0 overflow-hidden"
            style={{
              top: '100%',
              background: '#FFFFFF',
              border: `1px solid ${focused ? '#0A5CF5' : '#CBD5E1'}`,
              borderTop: '1px solid #F1F5F9',
              borderRadius: '0 0 24px 24px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.07)',
              zIndex: 30,
            }}
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              <Sparkle size={11} style={{ color: '#BAD2FF', flexShrink: 0 }} />
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

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, BookOpen, Edit3, ClipboardCheck, FlaskConical, CheckSquare, MessageSquare, X, Plus, ExternalLink, BarChart2, ShieldAlert } from 'lucide-react'
import { shortcutsComandos, respuestasIAChatbar } from '../mockData'

const iconMap = {
  BookOpen,
  Edit3,
  ClipboardCheck,
  FlaskConical,
  CheckSquare,
  BarChart2,
  ShieldAlert,
}

export default function Chatbar({ onNavigate, placeholder = 'Mensaje', chatHistorial, setChatHistorial, shortcuts, onShortcutAction }) {
  const shortcutList = shortcuts ?? shortcutsComandos
  const [valor, setValor] = useState('')
  const [dropdownAbierto, setDropdownAbierto] = useState(false)
  const [dropdownFiltrado, setDropdownFiltrado] = useState(shortcutList)
  const [historialVisible, setHistorialVisible] = useState(false)
  const [focused, setFocused] = useState(false)
  const [conectoresAbierto, setConectoresAbierto] = useState(false)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const containerRef = useRef(null)
  const conectoresRef = useRef(null)

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

  return (
    <div className="w-full relative" style={{ fontFamily: "'Inter', 'Arial', sans-serif", zIndex: 40 }}>
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
              <Sparkles size={13} style={{ color: '#367CFF' }} />
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
                    <Sparkles size={10} style={{ color: '#367CFF' }} />
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
        className="w-full flex flex-col gap-4 p-4 rounded-[24px]"
        style={{
          background: '#FFFFFF',
          border: `1px solid ${focused ? '#0A5CF5' : '#CBD5E1'}`,
          transition: 'border-color 150ms ease',
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
                title="Conectores — adjuntar desde SharePoint o Drive"
                onClick={e => { e.stopPropagation(); setConectoresAbierto(v => !v) }}
              >
                <Plus size={20} />
              </button>
              {conectoresAbierto && (
                <div
                  className="absolute bottom-full left-0 mb-2 rounded-xl overflow-hidden"
                  style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '200px', zIndex: 50 }}
                >
                  <div className="px-3 py-2" style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#9CA3AF' }}>Conectores</p>
                  </div>
                  {[
                    { id: 'sharepoint', label: 'SharePoint', color: '#0078D4', letter: 'SP' },
                    { id: 'drive', label: 'Google Drive', color: '#34A853', letter: 'GD' },
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        setValor(prev => prev + (prev ? ' ' : '') + `[Documento de ${c.label}]`)
                        setConectoresAbierto(false)
                        inputRef.current?.focus()
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                      style={{ background: 'transparent' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ background: c.color, fontSize: '9px' }}>
                        {c.letter}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium" style={{ color: '#111827' }}>{c.label}</p>
                        <p className="text-xs" style={{ color: '#10B981' }}>● Conectado</p>
                      </div>
                      <ExternalLink size={11} style={{ color: '#CBD5E1' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {chatHistorial.length > 0 && !historialVisible && (
              <button
                onClick={(e) => { e.stopPropagation(); setHistorialVisible(true) }}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-colors"
                style={{ color: '#6B7280', background: '#F8F9FA' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                onMouseLeave={e => e.currentTarget.style.background = '#F8F9FA'}
              >
                <MessageSquare size={11} />
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
            <Send size={16} style={{ color: canSend ? '#FFFFFF' : '#9CA3AF' }} />
          </button>
        </div>
      </div>
    </div>
  )
}

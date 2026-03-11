import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, BookOpen, Edit3, ClipboardCheck, FlaskConical, CheckSquare, MessageSquare, X } from 'lucide-react'
import { shortcutsComandos, respuestasIAChatbar } from '../mockData'

const iconMap = {
  BookOpen,
  Edit3,
  ClipboardCheck,
  FlaskConical,
  CheckSquare,
}

export default function Chatbar({ onNavigate, placeholder = 'Pregunta qué necesitas o usa / para comandos…', chatHistorial, setChatHistorial }) {
  const [valor, setValor] = useState('')
  const [dropdownAbierto, setDropdownAbierto] = useState(false)
  const [dropdownFiltrado, setDropdownFiltrado] = useState(shortcutsComandos)
  const [historialVisible, setHistorialVisible] = useState(false)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const handleChange = (e) => {
    const val = e.target.value
    setValor(val)

    if (val.startsWith('/')) {
      const query = val.slice(1).toLowerCase()
      const filtrados = shortcutsComandos.filter(s =>
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
    } else {
      // Placeholder modals — show as chat message for now
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
      const match = shortcutsComandos.find(s => s.comando === texto || texto.startsWith(s.comando))
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
    }
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
        setDropdownAbierto(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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
                    background: msg.rol === 'usuario' ? '#367CFF' : '#F8F9FA',
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

      {/* Input bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl w-full"
        style={{
          background: '#FFFFFF',
          border: '1.5px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'border-color 200ms ease',
        }}
        onFocus={() => {}}
      >
        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: '#E7EFFE' }}>
          <Sparkles size={13} style={{ color: '#367CFF' }} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={valor}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={e => e.currentTarget.closest('div').style.borderColor = '#367CFF'}
          onBlur={e => e.currentTarget.closest('div').style.borderColor = '#E5E7EB'}
          placeholder={placeholder}
          className="flex-1 text-sm bg-transparent outline-none"
          style={{ color: '#1A1A1A' }}
        />

        {chatHistorial.length > 0 && !historialVisible && (
          <button
            onClick={() => setHistorialVisible(true)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-colors"
            style={{ color: '#6B7280', background: '#F8F9FA' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
            onMouseLeave={e => e.currentTarget.style.background = '#F8F9FA'}
          >
            <MessageSquare size={11} />
            {chatHistorial.length}
          </button>
        )}

        <button
          onClick={handleSend}
          disabled={!valor.trim()}
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
          style={{
            background: valor.trim() ? '#367CFF' : '#F1F5F9',
            cursor: valor.trim() ? 'pointer' : 'default',
          }}
        >
          <Send size={13} style={{ color: valor.trim() ? '#FFFFFF' : '#CBD5E1' }} />
        </button>
      </div>
    </div>
  )
}

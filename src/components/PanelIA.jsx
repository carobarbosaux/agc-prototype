import { useState, useRef, useEffect } from 'react'
import { Send, ChevronRight, Sparkles } from 'lucide-react'
import { respuestasIA } from '../mockData'

export default function PanelIA({ historialInicial, onCerrar, temaLabel }) {
  const [mensajes, setMensajes] = useState(historialInicial || [])
  const [input, setInput] = useState('')
  const [esperando, setEsperando] = useState(false)
  const [respIdx, setRespIdx] = useState(0)
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [mensajes, esperando])

  const enviarMensaje = () => {
    if (!input.trim() || esperando) return
    const userMsg = { id: Date.now(), rol: 'usuario', mensaje: input.trim() }
    setMensajes(prev => [...prev, userMsg])
    setInput('')
    setEsperando(true)

    setTimeout(() => {
      const iaMsg = {
        id: Date.now() + 1,
        rol: 'ia',
        mensaje: respuestasIA[respIdx % respuestasIA.length],
      }
      setMensajes(prev => [...prev, iaMsg])
      setRespIdx(prev => prev + 1)
      setEsperando(false)
    }, 1200)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviarMensaje()
    }
  }

  const sugerencias = [
    'Añadir referencia académica',
    'Mejorar este bloque',
    'Generar un ejemplo',
  ]

  return (
    <div
      className="flex flex-col h-full animate-slide-in-right"
      style={{
        width: '320px',
        minWidth: '320px',
        background: '#FAFAFA',
        borderLeft: '1px solid #E5E7EB',
        fontFamily: "'Inter', 'Arial', sans-serif",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: '#E0F4FB' }}
          >
            <Sparkles size={13} style={{ color: '#0098CD' }} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Asistente IA</p>
            <p className="text-xs" style={{ color: '#6B7280' }}>{temaLabel}</p>
          </div>
        </div>
        <button
          onClick={onCerrar}
          className="p-1.5 rounded-lg transition-colors"
          onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <ChevronRight size={16} style={{ color: '#9CA3AF' }} />
        </button>
      </div>

      {/* Chat messages */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {mensajes.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.rol === 'usuario' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            {msg.rol === 'ia' && (
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                style={{ background: '#E0F4FB' }}
              >
                <Sparkles size={11} style={{ color: '#0098CD' }} />
              </div>
            )}
            <div
              className="max-w-[85%] rounded-xl px-3 py-2.5 text-sm leading-relaxed"
              style={{
                background: msg.rol === 'usuario' ? '#0098CD' : '#FFFFFF',
                color: msg.rol === 'usuario' ? '#FFFFFF' : '#374151',
                border: msg.rol === 'ia' ? '1px solid #E5E7EB' : 'none',
                boxShadow: msg.rol === 'ia' ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
              }}
            >
              {msg.mensaje}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {esperando && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#E0F4FB' }}>
              <Sparkles size={11} style={{ color: '#0098CD' }} />
            </div>
            <div className="px-3 py-2.5 rounded-xl flex items-center gap-1" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                  style={{ background: '#0098CD', animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick suggestions */}
      {mensajes.length <= 1 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {sugerencias.map(s => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="text-xs px-2.5 py-1.5 rounded-lg transition-all"
              style={{ background: '#E0F4FB', color: '#0098CD', border: '1px solid #B3E0F2' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-3 py-3 flex-shrink-0" style={{ borderTop: '1px solid #E5E7EB', background: '#FFFFFF' }}>
        <div
          className="flex items-end gap-2 rounded-xl px-3 py-2"
          style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}
        >
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe o pregunta algo..."
            className="flex-1 text-sm outline-none resize-none bg-transparent"
            style={{ color: '#374151', minHeight: '20px', maxHeight: '80px', fontFamily: "'Inter', 'Arial', sans-serif" }}
            rows={1}
          />
          <button
            onClick={enviarMensaje}
            disabled={!input.trim() || esperando}
            className="p-1.5 rounded-lg transition-all flex-shrink-0"
            style={{
              background: input.trim() && !esperando ? '#0098CD' : '#E5E7EB',
              color: input.trim() && !esperando ? '#FFFFFF' : '#9CA3AF',
            }}
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-xs mt-1.5 text-center" style={{ color: '#CBD5E1' }}>Enter para enviar · Shift+Enter para nueva línea</p>
      </div>
    </div>
  )
}

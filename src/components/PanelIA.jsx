import { useState, useRef, useEffect } from 'react'
import { Send, ChevronRight, Sparkles, X } from 'lucide-react'
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
        borderLeft: '1px solid #E2E8F0',
      }}
    >
      {/* Panel header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: '#EEF2FF' }}
          >
            <Sparkles size={13} style={{ color: '#6366F1' }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Asistente IA</p>
            <p className="text-xs text-slate-400">{temaLabel}</p>
          </div>
        </div>
        <button
          onClick={onCerrar}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ChevronRight size={16} className="text-slate-400" />
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
                style={{ background: '#EEF2FF' }}
              >
                <Sparkles size={11} style={{ color: '#6366F1' }} />
              </div>
            )}
            <div
              className="max-w-[85%] rounded-xl px-3 py-2.5 text-sm leading-relaxed"
              style={{
                background: msg.rol === 'usuario' ? '#6366F1' : '#FFFFFF',
                color: msg.rol === 'usuario' ? '#FFFFFF' : '#334155',
                border: msg.rol === 'ia' ? '1px solid #E2E8F0' : 'none',
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
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: '#EEF2FF' }}
            >
              <Sparkles size={11} style={{ color: '#6366F1' }} />
            </div>
            <div
              className="px-3 py-2.5 rounded-xl flex items-center gap-1"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                  style={{
                    background: '#6366F1',
                    animationDelay: `${i * 0.2}s`,
                  }}
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
              className="text-xs px-2.5 py-1.5 rounded-lg transition-all hover:scale-[1.02]"
              style={{
                background: '#EEF2FF',
                color: '#6366F1',
                border: '1px solid #C7D2FE',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div
        className="px-3 py-3 flex-shrink-0"
        style={{ borderTop: '1px solid #E2E8F0', background: '#FFFFFF' }}
      >
        <div
          className="flex items-end gap-2 rounded-xl px-3 py-2"
          style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
        >
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe o pregunta algo..."
            className="flex-1 text-sm outline-none resize-none bg-transparent"
            style={{ color: '#334155', minHeight: '20px', maxHeight: '80px', fontFamily: "'DM Sans', sans-serif" }}
            rows={1}
          />
          <button
            onClick={enviarMensaje}
            disabled={!input.trim() || esperando}
            className="p-1.5 rounded-lg transition-all flex-shrink-0"
            style={{
              background: input.trim() && !esperando ? '#6366F1' : '#E2E8F0',
              color: input.trim() && !esperando ? '#FFFFFF' : '#94A3B8',
            }}
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-xs text-slate-300 mt-1.5 text-center">Enter para enviar · Shift+Enter para nueva línea</p>
      </div>
    </div>
  )
}

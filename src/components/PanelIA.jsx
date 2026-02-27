import { useState, useRef, useEffect } from 'react'
import { Send, ChevronRight, Sparkles, X, SquarePen, History } from 'lucide-react'
import { respuestasIA } from '../mockData'

const historialConversaciones = [
  {
    id: 'h1',
    titulo: 'Referencias académicas para Bloque 2',
    preview: 'He analizado el bloque. Te sugiero añadir la referencia: Bishop...',
    fecha: 'Hace 1 hora',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: 'Necesito referencias para el bloque de regresión lineal' },
      { id: 2, rol: 'ia', mensaje: 'He analizado el bloque. Te sugiero añadir la referencia: Bishop, C.M. (2006). *Pattern Recognition and Machine Learning*. Springer. Es la referencia estándar para este tipo de contenido.' },
      { id: 3, rol: 'usuario', mensaje: '¿Tienes alguna más reciente?' },
      { id: 4, rol: 'ia', mensaje: 'Para la referencia académica que pide el Coordinador, también puedes usar: Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press. Disponible online de forma gratuita.' },
    ],
  },
  {
    id: 'h2',
    titulo: 'Mejorar explicación de KNN',
    preview: 'El contenido está bien estructurado. Considera añadir...',
    fecha: 'Ayer',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: '[Mejorar] "El algoritmo K-Nearest Neighbors (KNN) clasifica un nuevo punto..."' },
      { id: 2, rol: 'ia', mensaje: 'El contenido está bien estructurado. Considera añadir una transición más clara entre los paradigmas supervisado y no supervisado para mejorar la fluidez.' },
    ],
  },
  {
    id: 'h3',
    titulo: 'Generar ejemplo de regresión logística',
    preview: 'Puedo expandir este concepto con un ejemplo más detallado...',
    fecha: 'Hace 3 días',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: 'Genera un ejemplo práctico de regresión logística para estudiantes' },
      { id: 2, rol: 'ia', mensaje: 'Puedo expandir este concepto con un ejemplo más detallado. ¿Quieres que lo genere en el canvas o prefieres verlo aquí primero?' },
    ],
  },
]

export default function PanelIA({ historialInicial, onCerrar, temaLabel, quotePendiente, onQuoteConsumed }) {
  const [mensajes, setMensajes] = useState(historialInicial || [])
  const [input, setInput] = useState('')
  const [quote, setQuote] = useState(null)
  const [esperando, setEsperando] = useState(false)
  const [respIdx, setRespIdx] = useState(0)
  const [vistaHistorial, setVistaHistorial] = useState(false)
  const chatRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (quotePendiente) {
      setQuote(quotePendiente)
      setVistaHistorial(false)
      onQuoteConsumed?.()
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [quotePendiente])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [mensajes, esperando])

  const enviarMensaje = () => {
    if ((!input.trim() && !quote) || esperando) return
    const texto = quote
      ? `[${quote.accion}] "${quote.texto}"${input.trim() ? `\n\n${input.trim()}` : ''}`
      : input.trim()
    const userMsg = { id: Date.now(), rol: 'usuario', mensaje: texto }
    setMensajes(prev => [...prev, userMsg])
    setInput('')
    setQuote(null)
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

  const nuevaConversacion = () => {
    setMensajes(historialInicial || [])
    setInput('')
    setQuote(null)
    setVistaHistorial(false)
  }

  const reanudarConversacion = (conv) => {
    setMensajes(conv.mensajes)
    setVistaHistorial(false)
  }

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
            <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>
              {vistaHistorial ? 'Historial' : 'Asistente IA'}
            </p>
            <p className="text-xs" style={{ color: '#6B7280' }}>{temaLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          {/* Nueva conversación */}
          <button
            onClick={nuevaConversacion}
            title="Nueva conversación"
            className="p-1.5 rounded-lg transition-colors"
            onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <SquarePen size={14} style={{ color: '#9CA3AF' }} />
          </button>

          {/* Historial toggle */}
          <button
            onClick={() => setVistaHistorial(v => !v)}
            title="Historial de conversaciones"
            className="p-1.5 rounded-lg transition-colors"
            style={{ background: vistaHistorial ? '#F8F9FA' : 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
            onMouseLeave={e => e.currentTarget.style.background = vistaHistorial ? '#F8F9FA' : 'transparent'}
          >
            <History size={14} style={{ color: vistaHistorial ? '#374151' : '#9CA3AF' }} />
          </button>

          {/* Collapse */}
          <button
            onClick={onCerrar}
            title="Cerrar"
            className="p-1.5 rounded-lg transition-colors"
            onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <ChevronRight size={16} style={{ color: '#9CA3AF' }} />
          </button>
        </div>
      </div>

      {/* ── Vista historial ─────────────────────────────────────────────── */}
      {vistaHistorial ? (
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5">
          {historialConversaciones.map(conv => (
            <button
              key={conv.id}
              onClick={() => reanudarConversacion(conv)}
              className="w-full text-left p-3 rounded-xl transition-all group"
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold leading-snug" style={{ color: '#1A1A1A' }}>
                  {conv.titulo}
                </p>
                <span className="text-xs flex-shrink-0" style={{ color: '#CBD5E1' }}>
                  {conv.fecha}
                </span>
              </div>
              <p
                className="text-xs mt-1 leading-relaxed"
                style={{
                  color: '#9CA3AF',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {conv.preview}
              </p>
              <p
                className="text-xs mt-1.5 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: '#0098CD' }}
              >
                Reanudar →
              </p>
            </button>
          ))}
        </div>
      ) : (
        <>
          {/* ── Chat messages ──────────────────────────────────────────────── */}
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
                    whiteSpace: 'pre-wrap',
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

          {/* ── Input ─────────────────────────────────────────────────────── */}
          <div className="px-3 py-3 flex-shrink-0" style={{ borderTop: '1px solid #E5E7EB', background: '#FFFFFF' }}>
            {/* Quote block */}
            {quote && (
              <div
                className="flex items-start gap-2 mb-2 p-2 rounded-lg animate-fade-in"
                style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}
              >
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block text-xs font-semibold px-1.5 py-0.5 rounded mb-1"
                    style={{ background: '#0098CD', color: '#FFFFFF', fontFamily: "'Arial', sans-serif" }}
                  >
                    {quote.accion}
                  </span>
                  <p
                    className="text-xs leading-relaxed line-clamp-3"
                    style={{ color: '#374151', fontStyle: 'italic' }}
                  >
                    "{quote.texto}"
                  </p>
                </div>
                <button
                  onClick={() => setQuote(null)}
                  className="flex-shrink-0 p-0.5 rounded transition-colors"
                  onMouseEnter={e => e.currentTarget.style.background = '#E0F2FE'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <X size={12} style={{ color: '#94A3B8' }} />
                </button>
              </div>
            )}
            <div
              className="flex items-end gap-2 rounded-xl px-3 py-2"
              style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={quote ? 'Añade más contexto (opcional)...' : 'Escribe o pregunta algo...'}
                className="flex-1 text-sm outline-none resize-none bg-transparent"
                style={{ color: '#374151', minHeight: '20px', maxHeight: '80px', fontFamily: "'Inter', 'Arial', sans-serif" }}
                rows={1}
              />
              <button
                onClick={enviarMensaje}
                disabled={(!input.trim() && !quote) || esperando}
                className="p-1.5 rounded-lg transition-all flex-shrink-0"
                style={{
                  background: (input.trim() || quote) && !esperando ? '#0098CD' : '#E5E7EB',
                  color: (input.trim() || quote) && !esperando ? '#FFFFFF' : '#9CA3AF',
                }}
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-xs mt-1.5 text-center" style={{ color: '#CBD5E1' }}>Enter para enviar · Shift+Enter para nueva línea</p>
          </div>
        </>
      )}
    </div>
  )
}

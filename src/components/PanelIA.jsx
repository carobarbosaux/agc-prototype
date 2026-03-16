import { useState, useRef, useEffect } from 'react'
import { Send, ChevronRight, Sparkles, X, SquarePen, History, Search, MessageSquare, Plus, ExternalLink } from 'lucide-react'
import { respuestasIA, respuestasCalidadIA } from '../mockData'
import { ProdiMark } from './ProdiLogo'

const historialConversaciones = [
  {
    id: 'h1',
    titulo: 'Referencias académicas para Bloque 2',
    preview: 'He analizado el bloque. Te sugiero añadir la referencia: Bishop...',
    grupo: 'Hoy',
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
    preview: 'El contenido está bien estructurado. Considera añadir una transición más clara...',
    grupo: 'Hoy',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: '[Mejorar] "El algoritmo K-Nearest Neighbors (KNN) clasifica un nuevo punto..."' },
      { id: 2, rol: 'ia', mensaje: 'El contenido está bien estructurado. Considera añadir una transición más clara entre los paradigmas supervisado y no supervisado para mejorar la fluidez.' },
    ],
  },
  {
    id: 'h3',
    titulo: 'Generar ejemplo de regresión logística',
    preview: 'Puedo expandir este concepto con un ejemplo más detallado...',
    grupo: 'Ayer',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: 'Genera un ejemplo práctico de regresión logística para estudiantes' },
      { id: 2, rol: 'ia', mensaje: 'Puedo expandir este concepto con un ejemplo más detallado. ¿Quieres que lo genere en el canvas o prefieres verlo aquí primero?' },
    ],
  },
  {
    id: 'h4',
    titulo: 'Resumen del Tema 3 para coordinador',
    preview: 'Aquí tienes un resumen ejecutivo del Tema 3 listo para revisión...',
    grupo: 'Ayer',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: 'Necesito un resumen ejecutivo del Tema 3 para el coordinador' },
      { id: 2, rol: 'ia', mensaje: 'Aquí tienes un resumen ejecutivo del Tema 3 listo para revisión del coordinador.' },
    ],
  },
  {
    id: 'h5',
    titulo: 'Adaptar nivel de dificultad del test',
    preview: 'He revisado las preguntas. Tres de ellas superan el nivel esperado...',
    grupo: 'Esta semana',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: '¿Puedes revisar si el nivel de dificultad del test es adecuado?' },
      { id: 2, rol: 'ia', mensaje: 'He revisado las preguntas. Tres de ellas superan el nivel esperado para este módulo.' },
    ],
  },
  {
    id: 'h6',
    titulo: 'Coherencia entre temario y recursos',
    preview: 'Los recursos están bien alineados con el temario, aunque detecté...',
    grupo: 'Esta semana',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: 'Comprueba si los recursos a fondo son coherentes con el temario' },
      { id: 2, rol: 'ia', mensaje: 'Los recursos están bien alineados con el temario, aunque detecté una referencia desactualizada en la sección de redes convolucionales.' },
    ],
  },
  {
    id: 'h7',
    titulo: 'Revisar calidad del Bloque 5',
    preview: 'El bloque cumple los criterios de calidad. Sugerencia menor: ampliar...',
    grupo: 'Hace más tiempo',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: 'Revisar calidad — Bloque 5: Introducción a las redes neuronales' },
      { id: 2, rol: 'ia', mensaje: 'El bloque cumple los criterios de calidad. Sugerencia menor: ampliar el ejemplo de backpropagation con una notación más clara.' },
    ],
  },
]

const RECENT_LIMIT = 5

export default function PanelIA({ historialInicial, onCerrar, temaLabel, quotePendiente, onQuoteConsumed }) {
  const [mensajes, setMensajes] = useState(historialInicial || [])
  const [input, setInput] = useState('')
  const [quote, setQuote] = useState(null)
  const [esperando, setEsperando] = useState(false)
  const [respIdx, setRespIdx] = useState(0)
  const [vistaHistorial, setVistaHistorial] = useState(false)
  const [conectoresAbierto, setConectoresAbierto] = useState(false)
  const conectoresRef = useRef(null)
  const [busqueda, setBusqueda] = useState('')
  const [mostrarTodo, setMostrarTodo] = useState(false)
  const chatRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (quotePendiente) {
      setVistaHistorial(false)
      onQuoteConsumed?.()
      if (quotePendiente.accion === 'Revisar calidad') {
        // Auto-send: inject user request + IA analysis without manual send
        const userMsg = { id: Date.now(), rol: 'usuario', mensaje: `Revisar calidad de contenidos — ${quotePendiente.texto.replace('[Revisar calidad] ', '')}` }
        setMensajes(prev => [...prev, userMsg])
        setEsperando(true)
        setTimeout(() => {
          const idx = Math.floor(Math.random() * respuestasCalidadIA.length)
          const iaMsg = { id: Date.now() + 1, rol: 'ia', mensaje: respuestasCalidadIA[idx] }
          setMensajes(prev => [...prev, iaMsg])
          setEsperando(false)
        }, 1400)
      } else {
        setQuote(quotePendiente)
        setTimeout(() => inputRef.current?.focus(), 50)
      }
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
          <ProdiMark size={22} />
          <div>
            <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>
              {vistaHistorial ? 'Historial' : 'Asistente de contenidos'}
            </p>
            {!vistaHistorial && <p className="text-xs" style={{ color: '#6B7280' }}>{temaLabel}</p>}
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
            onClick={() => { setVistaHistorial(v => !v); setBusqueda(''); setMostrarTodo(false) }}
            title="Historial de conversaciones"
            className="p-1.5 rounded-lg transition-colors"
            style={{ background: vistaHistorial ? '#F3F4F6' : 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
            onMouseLeave={e => e.currentTarget.style.background = vistaHistorial ? '#F3F4F6' : 'transparent'}
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
        <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#FAFAFA' }}>

          {/* Search */}
          <div className="px-3 pt-3 pb-2 flex-shrink-0">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
            >
              <Search size={13} style={{ color: '#9CA3AF', flexShrink: 0 }} />
              <input
                value={busqueda}
                onChange={e => { setBusqueda(e.target.value); setMostrarTodo(false) }}
                placeholder="Buscar conversaciones..."
                className="flex-1 text-xs bg-transparent outline-none"
                style={{ color: '#374151', caretColor: '#367CFF' }}
              />
              {busqueda && (
                <button onClick={() => setBusqueda('')}>
                  <X size={12} style={{ color: '#9CA3AF' }} />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-2 pb-2">
            {(() => {
              const filtradas = busqueda.trim()
                ? historialConversaciones.filter(c =>
                    c.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                    c.preview.toLowerCase().includes(busqueda.toLowerCase())
                  )
                : historialConversaciones

              const visibles = (!mostrarTodo && !busqueda.trim())
                ? filtradas.slice(0, RECENT_LIMIT)
                : filtradas

              // Group by grupo
              const grupos = []
              const seen = {}
              visibles.forEach(c => {
                if (!seen[c.grupo]) { seen[c.grupo] = true; grupos.push(c.grupo) }
              })

              return (
                <>
                  {visibles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-2">
                      <Search size={20} style={{ color: '#D1D5DB' }} />
                      <p className="text-xs" style={{ color: '#9CA3AF' }}>Sin resultados</p>
                    </div>
                  ) : (
                    grupos.map(grupo => (
                      <div key={grupo} className="mb-1">
                        <p className="text-xs font-medium px-2 py-1.5 sticky top-0" style={{ color: '#9CA3AF', background: '#FAFAFA', letterSpacing: '0.03em' }}>
                          {grupo}
                        </p>
                        {visibles.filter(c => c.grupo === grupo).map(conv => (
                          <button
                            key={conv.id}
                            onClick={() => reanudarConversacion(conv)}
                            className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors"
                            onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <MessageSquare size={13} style={{ color: '#D1D5DB', flexShrink: 0 }} />
                            <span className="text-xs truncate flex-1" style={{ color: '#374151' }}>
                              {conv.titulo}
                            </span>
                          </button>
                        ))}
                      </div>
                    ))
                  )}

                  {/* Show all button */}
                  {!busqueda.trim() && !mostrarTodo && historialConversaciones.length > RECENT_LIMIT && (
                    <button
                      onClick={() => setMostrarTodo(true)}
                      className="w-full mt-1 py-2 rounded-lg text-xs font-medium transition-colors"
                      style={{ color: '#9CA3AF' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#6B7280' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9CA3AF' }}
                    >
                      Ver todo el historial ({historialConversaciones.length})
                    </button>
                  )}
                </>
              )
            })()}
          </div>
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
                    style={{ background: '#E7EFFE' }}
                  >
                    <Sparkles size={11} style={{ color: '#367CFF' }} />
                  </div>
                )}
                <div
                  className="max-w-[85%] rounded-xl px-3 py-2.5 text-sm leading-relaxed"
                  style={{
                    background: msg.rol === 'usuario' ? '#367CFF' : '#FFFFFF',
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
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#E7EFFE' }}>
                  <Sparkles size={11} style={{ color: '#367CFF' }} />
                </div>
                <div className="px-3 py-2.5 rounded-xl flex items-center gap-1" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                      style={{ background: '#367CFF', animationDelay: `${i * 0.2}s` }}
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
                    style={{ background: '#367CFF', color: '#FFFFFF', fontFamily: "'Arial', sans-serif" }}
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
              {/* Connectors (+) button */}
              <div className="relative flex-shrink-0" ref={conectoresRef}>
                <button
                  onClick={() => setConectoresAbierto(v => !v)}
                  className="p-1.5 rounded-lg transition-all"
                  style={{ color: conectoresAbierto ? '#367CFF' : '#9CA3AF', background: conectoresAbierto ? '#E7EFFE' : 'transparent' }}
                  onMouseEnter={e => { if (!conectoresAbierto) { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#374151' } }}
                  onMouseLeave={e => { if (!conectoresAbierto) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9CA3AF' } }}
                  title="Conectores — adjuntar desde SharePoint o Drive"
                >
                  <Plus size={15} />
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
                        onClick={() => {
                          setInput(prev => prev + (prev ? ' ' : '') + `[Documento de ${c.label}]`)
                          setConectoresAbierto(false)
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                        style={{ background: 'transparent' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-white text-xs font-bold" style={{ background: c.color, fontSize: '9px' }}>
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
                  background: (input.trim() || quote) && !esperando ? '#367CFF' : '#E5E7EB',
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

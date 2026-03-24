import { useState, useRef, useEffect } from 'react'
import { PaperPlaneTilt, CaretRight, X, NotePencil, ClockCounterClockwise, MagnifyingGlass, Chat, Plus } from '@phosphor-icons/react'
import { respuestasIA, respuestasCalidadIA } from '../mockData'
import Tooltip from './Tooltip'

const SUGERENCIAS = {
  teams:      ['Resumir comentarios del coordinador', 'Identificar cambios solicitados'],
  sharepoint: ['Buscar documentación relevante', 'Extraer conceptos clave', 'Verificar alineación con guías'],
  outlook:    ['Extraer correcciones', 'Detectar puntos críticos'],
  onedrive:   ['Buscar archivos relacionados', 'Reutilizar contenido previo', 'Resumir documentos', 'Detectar inconsistencias'],
  canva:      ['Proponer estructura visual', 'Simplificar contenido'],
  genially:   ['Crear actividad interactiva', 'Proponer experiencia dinámica'],
}
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

const CONECTORES = [
  { id: 'teams', letter: 'T', color: '#6264A7', label: 'Teams', desc: 'Conversaciones y archivos' },
  { id: 'sharepoint', letter: 'SP', color: '#0078D4', label: 'SharePoint', desc: 'Documentos institucionales' },
  { id: 'outlook', letter: 'OL', color: '#0078D4', label: 'Outlook', desc: 'Correos y adjuntos' },
  { id: 'onedrive', letter: 'OD', color: '#0078D4', label: 'OneDrive', desc: 'Archivos personales' },
  { id: 'canva', letter: 'CA', color: '#7C3AED', label: 'Canva', desc: 'Diseños y recursos visuales' },
  { id: 'genially', letter: 'GE', color: '#F97316', label: 'Genially', desc: 'Contenidos interactivos' },
]
const MICROSOFT_CONECTORES = CONECTORES.slice(0, 4)
const EXTERNAL_CONECTORES = CONECTORES.slice(4)

export default function PanelIA({ historialInicial, onCerrar, temaLabel, quotePendiente, onQuoteConsumed, contextoSugerencias }) {
  const [mensajes, setMensajes] = useState(historialInicial || [])
  const [input, setInput] = useState('')
  const [quote, setQuote] = useState(null)
  const [esperando, setEsperando] = useState(false)
  const [respIdx, setRespIdx] = useState(0)
  const [vistaHistorial, setVistaHistorial] = useState(false)
  const [sugerenciasContexto, setSugerenciasContexto] = useState(contextoSugerencias || null)
  const [conectoresAbierto, setConectoresAbierto] = useState(false)
  const [companyKnowledgeOn, setCompanyKnowledgeOn] = useState(false)
  const [selectedConectores, setSelectedConectores] = useState(new Set())
  const [inputExpanded, setInputExpanded] = useState(false)
  const [inputHeight, setInputHeight] = useState(21)
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
    setConectoresAbierto(false)
  }
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
      } else if (quotePendiente.accion === 'iaContexto') {
        // Contextual button (e.g. "Sugerir nivel"): inject IA opening message + show suggestion chips
        setSugerenciasContexto({ sugerencias: quotePendiente.sugerencias, respuestas: quotePendiente.respuestas })
        setEsperando(true)
        setTimeout(() => {
          const iaMsg = { id: Date.now() + 1, rol: 'ia', mensaje: quotePendiente.texto }
          setMensajes(prev => [...prev, iaMsg])
          setEsperando(false)
          setTimeout(() => inputRef.current?.focus(), 50)
        }, 800)
      } else {
        setQuote(quotePendiente)
        setTimeout(() => inputRef.current?.focus(), 50)
      }
    }
  }, [quotePendiente, onQuoteConsumed])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [mensajes, esperando])

  const enviarMensaje = (textoDirecto) => {
    const texto = textoDirecto || (quote
      ? `[${quote.accion}] "${quote.texto}"${input.trim() ? `\n\n${input.trim()}` : ''}`
      : input.trim())
    if (!texto || esperando) return
    const userMsg = { id: Date.now(), rol: 'usuario', mensaje: texto }
    setMensajes(prev => [...prev, userMsg])
    setInput('')
    setQuote(null)
    setEsperando(true)
    setInputHeight(21)
    setInputExpanded(false)

    setTimeout(() => {
      const respuestaContextual = sugerenciasContexto?.respuestas?.[texto]
      const iaMsg = {
        id: Date.now() + 1,
        rol: 'ia',
        mensaje: respuestaContextual || respuestasIA[respIdx % respuestasIA.length],
      }
      setMensajes(prev => [...prev, iaMsg])
      if (!respuestaContextual) setRespIdx(prev => prev + 1)
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
    setSugerenciasContexto(null)
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
        fontFamily: "'Proeduca Sans', system-ui, sans-serif",
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
          <Tooltip text="Nueva conversación" side="bottom">
            <button
              onClick={nuevaConversacion}
              className="p-1.5 rounded-lg transition-colors"
              onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <NotePencil size={14} style={{ color: '#6B7280' }} />
            </button>
          </Tooltip>

          {/* Historial toggle */}
          <Tooltip text="Historial de conversaciones" side="bottom">
            <button
              onClick={() => { setVistaHistorial(v => !v); setBusqueda(''); setMostrarTodo(false) }}
              className="p-1.5 rounded-lg transition-colors"
              style={{ background: vistaHistorial ? '#F3F4F6' : 'transparent' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
              onMouseLeave={e => e.currentTarget.style.background = vistaHistorial ? '#F3F4F6' : 'transparent'}
            >
              <ClockCounterClockwise size={14} style={{ color: vistaHistorial ? '#374151' : '#6B7280' }} />
            </button>
          </Tooltip>

          {/* Collapse */}
          <Tooltip text="Cerrar" side="bottom">
            <button
              onClick={onCerrar}
              className="p-1.5 rounded-lg transition-colors"
              onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <CaretRight size={16} style={{ color: '#6B7280' }} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* ── Vista historial ─────────────────────────────────────────────── */}
      {vistaHistorial ? (
        <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#FAFAFA' }}>

          {/* Search */}
          <div className="px-3 pt-3 pb-2 flex-shrink-0">
            <div
              className="flex items-center gap-2"
              style={{ padding: '12px 16px', background: '#FFFFFF', boxShadow: '0px 1px 2px rgba(18,18,23,0.05)', borderRadius: 12, outline: '1px #CBD5E1 solid', outlineOffset: '-1px' }}
            >
              <MagnifyingGlass size={16} style={{ color: '#0A5CF5', flexShrink: 0 }} />
              <input
                value={busqueda}
                onChange={e => { setBusqueda(e.target.value); setMostrarTodo(false) }}
                placeholder="Buscar conversaciones..."
                className="flex-1 bg-transparent outline-none"
                style={{ color: '#1E293B', fontSize: 16, fontFamily: 'Proeduca Sans', lineHeight: '20px' }}
                onFocus={e => { const p = e.currentTarget.parentElement; p.style.outline = '1px #0A5CF5 solid'; p.style.background = '#F1F5F9' }}
                onBlur={e => { const p = e.currentTarget.parentElement; p.style.outline = '1px #CBD5E1 solid'; p.style.background = '#FFFFFF' }}
                onMouseEnter={e => { if (document.activeElement !== e.currentTarget) { const p = e.currentTarget.parentElement; p.style.outline = '1px #0A5CF5 solid'; p.style.background = '#F1F5F9' } }}
                onMouseLeave={e => { if (document.activeElement !== e.currentTarget) { const p = e.currentTarget.parentElement; p.style.outline = '1px #CBD5E1 solid'; p.style.background = '#FFFFFF' } }}
              />
              {busqueda && (
                <button onClick={() => setBusqueda('')}>
                  <X size={12} style={{ color: '#6B7280' }} />
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
                      <MagnifyingGlass size={20} style={{ color: '#D1D5DB' }} />
                      <p className="text-xs" style={{ color: '#6B7280' }}>Sin resultados</p>
                    </div>
                  ) : (
                    grupos.map(grupo => (
                      <div key={grupo} className="mb-1">
                        <p className="text-xs font-medium px-2 py-1.5 sticky top-0" style={{ color: '#6B7280', background: '#FAFAFA', letterSpacing: '0.03em' }}>
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
                            <Chat size={13} style={{ color: '#D1D5DB', flexShrink: 0 }} />
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
                      style={{ color: '#6B7280' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#6B7280' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280' }}
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
          <div className="relative flex-shrink-0">
          {/* Suggested prompts — floats above input, does not push content */}
          {(selectedConectores.size > 0 || sugerenciasContexto?.sugerencias?.length > 0) && (() => {
            const connectorChips = [...selectedConectores].flatMap(id => (SUGERENCIAS[id] || []).map(text => ({ text, autoSend: false })))
            const contextChips = (sugerenciasContexto?.sugerencias || []).map(text => ({ text, autoSend: true }))
            const chips = [...contextChips, ...connectorChips]
            if (!chips.length) return null
            return (
              <div
                className="absolute left-0 right-0 overflow-hidden"
                style={{
                  bottom: '100%',
                  background: '#FFFFFF',
                  borderTop: '1px solid #E5E7EB',
                  borderLeft: '1px solid #E5E7EB',
                  borderRight: '1px solid #E5E7EB',
                  borderRadius: '12px 12px 0 0',
                  boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
                  zIndex: 10,
                }}
              >
                <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                  {chips.map(({ text, autoSend }, i) => (
                    <button
                      key={i}
                      onClick={() => { if (autoSend) { enviarMensaje(text) } else { setInput(text); inputRef.current?.focus() } }}
                      className="flex-shrink-0 px-2 py-0.5 rounded-full whitespace-nowrap transition-colors"
                      style={{ fontSize: '10px', background: '#F1F5F9', color: '#374151', border: '1px solid #E2E8F0' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#E7EFFE'; e.currentTarget.style.borderColor = '#BAD2FF'; e.currentTarget.style.color = '#367CFF' }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#374151' }}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            )
          })()}
          <div className="px-3 py-3" style={{ borderTop: '1px solid #E5E7EB', background: '#FFFFFF' }}>
            {/* Quote block */}
            {quote && (
              <div
                className="flex items-start gap-2 mb-2 p-2 rounded-lg animate-fade-in"
                style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}
              >
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block text-xs font-semibold px-1.5 py-0.5 rounded mb-1"
                    style={{ background: '#367CFF', color: '#FFFFFF', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}
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
                  <X size={12} style={{ color: '#6B7280' }} />
                </button>
              </div>
            )}

            {/* Pill-shaped input — mirrors Chatbar design */}
            {(() => {
              const canSend = (!!input.trim() || !!quote) && !esperando

              const plusBtn = (
                <div className="relative flex-shrink-0" ref={conectoresRef}>
                  <Tooltip text="Conectores" side="top">
                    <button
                      className="flex items-center justify-center transition-colors"
                      style={{
                        width: 28, height: 28, borderRadius: 80,
                        border: `1px solid ${conectoresAbierto ? '#BAD2FF' : 'transparent'}`,
                        background: conectoresAbierto ? '#E7EFFE' : 'transparent',
                        color: conectoresAbierto ? '#367CFF' : '#0A5CF5',
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => { if (!conectoresAbierto) { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#E2E8F0' } }}
                      onMouseLeave={e => { if (!conectoresAbierto) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' } }}
                      onClick={e => { e.stopPropagation(); setConectoresAbierto(v => !v) }}
                    >
                      <Plus size={14} />
                    </button>
                  </Tooltip>
                  {conectoresAbierto && (
                    <div
                      className="absolute bottom-full mb-2 left-0 rounded-xl overflow-hidden"
                      style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 -8px 24px rgba(0,0,0,0.12)', minWidth: '280px', zIndex: 50 }}
                    >
                      <div className="px-3 py-2" style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <p className="text-xs font-semibold tracking-wide" style={{ color: '#6B7280' }}>Conectores</p>
                      </div>
                      <div className="px-3 pt-1.5 pb-1" style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <div className="flex items-center gap-2.5 py-1">
                          <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ background: '#0078D4', fontSize: '7px' }}>CK</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium" style={{ color: '#111827' }}>Company Knowledge</p>
                            <p style={{ fontSize: '10px', color: '#6B7280', marginTop: 1 }}>Fuentes institucionales de tu organización</p>
                          </div>
                          <button
                            onClick={e => { e.stopPropagation(); toggleCompanyKnowledge() }}
                            style={{ width: 40, height: 24, borderRadius: 30, background: companyKnowledgeOn ? '#0A5CF5' : '#DCDFEB', flexShrink: 0, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: companyKnowledgeOn ? 'flex-end' : 'flex-start', padding: companyKnowledgeOn ? '0 4px 0 0' : '0 0 0 4px' }}
                          >
                            <span style={{ width: 16, height: 16, borderRadius: 8, background: '#FFF', display: 'block', flexShrink: 0 }} />
                          </button>
                        </div>
                        <div style={{ opacity: companyKnowledgeOn ? 1 : 0.35, pointerEvents: companyKnowledgeOn ? 'auto' : 'none', transition: 'opacity 0.15s' }}>
                          {MICROSOFT_CONECTORES.map(c => {
                            const active = selectedConectores.has(c.id)
                            return (
                              <button key={c.id} onClick={e => { e.stopPropagation(); toggleConector(c.id) }}
                                className="w-full flex items-center gap-2.5 py-1 pl-3 rounded-lg text-left"
                                style={{ background: active ? c.color + '12' : 'transparent', border: 'none', cursor: 'pointer' }}
                                onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F1F5F9' }}
                                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                              >
                                <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ background: c.color, fontSize: '6px' }}>{c.letter}</div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium" style={{ color: active ? c.color : '#374151' }}>{c.label}</p>
                                  <p style={{ fontSize: '10px', color: '#6B7280', marginTop: 1 }}>{c.desc}</p>
                                </div>
                                {active && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />}
                              </button>
                            )
                          })}
                        </div>
                        {!companyKnowledgeOn && (
                          <p className="pb-1 pl-3" style={{ fontSize: '10px', color: '#6B7280', fontStyle: 'italic' }}>Activa para acceder a Teams, SharePoint, Outlook y OneDrive.</p>
                        )}
                      </div>
                      <div className="px-3 pt-1.5 pb-2">
                        {EXTERNAL_CONECTORES.map(c => {
                          const active = selectedConectores.has(c.id)
                          return (
                            <button key={c.id} onClick={e => { e.stopPropagation(); toggleConector(c.id) }}
                              className="w-full flex items-center gap-2.5 py-1 rounded-lg text-left"
                              style={{ background: active ? c.color + '12' : 'transparent', border: 'none', cursor: 'pointer' }}
                              onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F1F5F9' }}
                              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                            >
                              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ background: c.color, fontSize: '7px' }}>{c.letter}</div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium" style={{ color: active ? c.color : '#111827' }}>{c.label}</p>
                                <p style={{ fontSize: '10px', color: '#6B7280', marginTop: 1 }}>{c.desc}</p>
                              </div>
                              {active && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )

              const sendBtn = (
                <button
                  onClick={enviarMensaje}
                  disabled={!canSend}
                  className="flex items-center justify-center transition-all flex-shrink-0"
                  style={{
                    width: 28, height: 28, borderRadius: 80,
                    background: canSend ? '#0A5CF5' : '#E6E6E6',
                    border: 'none',
                    cursor: canSend ? 'pointer' : 'default',
                  }}
                  onMouseEnter={e => { if (canSend) e.currentTarget.style.background = '#0039A3' }}
                  onMouseLeave={e => { e.currentTarget.style.background = canSend ? '#0A5CF5' : '#E6E6E6' }}
                >
                  <PaperPlaneTilt size={14} style={{ color: canSend ? '#FFFFFF' : '#666666' }} />
                </button>
              )

              const connectorTags = selectedConectores.size > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  {[...selectedConectores].map(id => {
                    const c = CONECTORES.find(x => x.id === id)
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

              const textareaEl = (
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={quote ? 'Añade más contexto (opcional)...' : 'Escribe o pregunta algo...'}
                  rows={1}
                  className="w-full bg-transparent outline-none resize-none"
                  style={{
                    color: '#272A3F',
                    caretColor: '#0A5CF5',
                    height: inputHeight,
                    maxHeight: '63px',
                    overflowY: inputHeight >= 63 ? 'auto' : 'hidden',
                    fontFamily: "'Proeduca Sans', system-ui, sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    lineHeight: '21px',
                  }}
                  onInput={e => {
                    e.target.style.height = '21px'
                    const h = Math.min(e.target.scrollHeight, 63)
                    setInputHeight(h)
                    setInputExpanded(h > 21)
                  }}
                />
              )

              return (
                <div
                  className="w-full flex flex-col py-2 px-3"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '0px 9px 20px -2px rgba(0, 0, 0, 0.10)',
                    borderRadius: inputExpanded ? 28 : 40,
                    outline: '1px solid #DCDFEB',
                    outlineOffset: '-1px',
                    transition: 'outline-color 150ms ease',
                    gap: 0,
                  }}
                  onClick={() => inputRef.current?.focus()}
                >
                  {inputExpanded ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1 px-1">
                        {connectorTags}
                        {textareaEl}
                      </div>
                      <div className="flex items-center justify-between">
                        {plusBtn}
                        {sendBtn}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {plusBtn}
                      <div className="flex-1 flex flex-col gap-1" style={{ paddingLeft: 4 }}>
                        {connectorTags}
                        {textareaEl}
                      </div>
                      {sendBtn}
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
          </div>
        </>
      )}
    </div>
  )
}

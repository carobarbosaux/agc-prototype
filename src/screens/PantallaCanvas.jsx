import { useState } from 'react'
import { ChevronRight, Plus, Save, MessageSquare, Eye, Sparkles, X } from 'lucide-react'
import PipelineSidebar from '../components/PipelineSidebar'
import BloqueContenido from '../components/BloqueContenido'
import PanelIA from '../components/PanelIA'
import ComentarioHilo from '../components/ComentarioHilo'
import EstadoBadge from '../components/EstadoBadge'
import {
  bloquesTema2,
  bloquesTema1,
  bloquesIndice,
  instruccionesTema1,
  instruccionesTema2,
  instruccionesTema3,
  instruccionesTema4,
  instruccionesTema5,
  instruccionesTema6,
  chatHistorialTema2,
  chatHistorialTema1,
} from '../mockData'

const SECCION_CONFIG = {
  t2: {
    label: 'Tema 2: Regresión y clasificación',
    labelCorto: 'Tema 2',
    estado: 'borrador',
    bloques: bloquesTema2,
    chat: chatHistorialTema2,
  },
  t1: {
    label: 'Tema 1: Introducción al aprendizaje automático',
    labelCorto: 'Tema 1',
    estado: 'revision',
    bloques: bloquesTema1,
    chat: chatHistorialTema1,
  },
  indice: {
    label: 'Índice',
    labelCorto: 'Índice',
    estado: 'aprobado',
    bloques: bloquesIndice,
    chat: chatHistorialTema2,
  },
  'instrucciones-t1': {
    label: 'Instrucciones didácticas · Tema 1',
    labelCorto: 'Instrucciones T1',
    estado: 'aprobado',
    bloques: instruccionesTema1,
    chat: chatHistorialTema1,
  },
  'instrucciones-t2': {
    label: 'Instrucciones didácticas · Tema 2',
    labelCorto: 'Instrucciones T2',
    estado: 'aprobado',
    bloques: instruccionesTema2,
    chat: chatHistorialTema2,
  },
  'instrucciones-t3': {
    label: 'Instrucciones didácticas · Tema 3',
    labelCorto: 'Instrucciones T3',
    estado: 'aprobado',
    bloques: instruccionesTema3,
    chat: chatHistorialTema2,
  },
  'instrucciones-t4': {
    label: 'Instrucciones didácticas · Tema 4',
    labelCorto: 'Instrucciones T4',
    estado: 'aprobado',
    bloques: instruccionesTema4,
    chat: chatHistorialTema2,
  },
  'instrucciones-t5': {
    label: 'Instrucciones didácticas · Tema 5',
    labelCorto: 'Instrucciones T5',
    estado: 'aprobado',
    bloques: instruccionesTema5,
    chat: chatHistorialTema2,
  },
  'instrucciones-t6': {
    label: 'Instrucciones didácticas · Tema 6',
    labelCorto: 'Instrucciones T6',
    estado: 'aprobado',
    bloques: instruccionesTema6,
    chat: chatHistorialTema2,
  },
}

// ─── Resumen section component ────────────────────────────────────────────────

function SeccionResumen({ asignatura, editable, onAccionIA }) {
  const [nombre, setNombre] = useState(asignatura?.nombre || '')
  const [descripcion, setDescripcion] = useState(asignatura?.descripcion || '')
  const [objetivos, setObjetivos] = useState(asignatura?.objetivos || [])
  const [tags, setTags] = useState(asignatura?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [unsaved, setUnsaved] = useState(false)

  const markUnsaved = () => setUnsaved(true)

  const removeTag = (tag) => { setTags(prev => prev.filter(t => t !== tag)); markUnsaved() }
  const addTag = (tag) => {
    const t = tag.trim()
    if (t && !tags.includes(t)) { setTags(prev => [...prev, t]); markUnsaved() }
    setTagInput('')
  }
  const updateObjetivo = (idx, val) => {
    setObjetivos(prev => { const o = [...prev]; o[idx] = val; return o })
    markUnsaved()
  }
  const removeObjetivo = (idx) => { setObjetivos(prev => prev.filter((_, i) => i !== idx)); markUnsaved() }
  const addObjetivo = () => { setObjetivos(prev => [...prev, '']); markUnsaved() }

  return (
    <div className="max-w-2xl mx-auto py-12 pl-16 pr-12" style={{ paddingBottom: '64px' }}>
      {/* Document header */}
      <div className="mb-10" style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '24px' }}>
        <p className="text-xs font-medium mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>
          Nueva asignatura · En borrador
        </p>
        {editable ? (
          <input
            value={nombre}
            onChange={e => { setNombre(e.target.value); markUnsaved() }}
            className="w-full text-2xl font-semibold outline-none bg-transparent"
            style={{ color: '#111827', caretColor: '#0098CD' }}
            placeholder="Nombre de la asignatura"
          />
        ) : (
          <h1 className="text-2xl font-semibold leading-snug" style={{ color: '#111827' }}>{nombre}</h1>
        )}
        {unsaved && editable && (
          <p className="text-xs mt-2 animate-fade-in" style={{ color: '#F59E0B' }}>● Sin guardar</p>
        )}
      </div>

      {/* Descripción */}
      <div className="mb-8" style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '28px' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9CA3AF' }}>Descripción</p>
        {editable ? (
          <textarea
            value={descripcion}
            onChange={e => { setDescripcion(e.target.value); markUnsaved() }}
            onMouseUp={() => {
              const sel = window.getSelection()?.toString().trim()
              if (sel && sel.length > 3 && onAccionIA) {
                // expose selection for inline toolbar via onAccionIA hook (same as BloqueContenido)
              }
            }}
            rows={5}
            className="w-full text-base leading-8 outline-none resize-none bg-transparent"
            style={{ color: '#1F2937', caretColor: '#0098CD' }}
            placeholder="Descripción de la asignatura…"
          />
        ) : (
          <p className="text-base leading-8" style={{ color: '#1F2937' }}>{descripcion}</p>
        )}
      </div>

      {/* Objetivos */}
      <div className="mb-8" style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '28px' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9CA3AF' }}>Objetivos de aprendizaje</p>
        <div className="space-y-2">
          {objetivos.map((obj, idx) => (
            <div key={idx} className="flex items-start gap-2 group">
              <span className="text-sm font-medium mt-2.5 flex-shrink-0 w-5 text-right" style={{ color: '#CBD5E1' }}>{idx + 1}.</span>
              {editable ? (
                <>
                  <input
                    value={obj}
                    onChange={e => updateObjetivo(idx, e.target.value)}
                    className="flex-1 text-base leading-8 outline-none bg-transparent"
                    style={{ color: '#1F2937', caretColor: '#0098CD' }}
                    placeholder="Objetivo de aprendizaje…"
                  />
                  <button
                    onClick={() => removeObjetivo(idx)}
                    className="mt-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    style={{ color: '#CBD5E1' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                    onMouseLeave={e => e.currentTarget.style.color = '#CBD5E1'}
                  >
                    <X size={13} />
                  </button>
                </>
              ) : (
                <p className="flex-1 text-base leading-8" style={{ color: '#1F2937' }}>{obj}</p>
              )}
            </div>
          ))}
          {editable && (
            <button
              onClick={addObjetivo}
              className="flex items-center gap-2 text-sm mt-2 transition-all"
              style={{ color: '#D1D5DB', paddingLeft: '28px' }}
              onMouseEnter={e => e.currentTarget.style.color = '#0098CD'}
              onMouseLeave={e => e.currentTarget.style.color = '#D1D5DB'}
            >
              <Plus size={14} />
              Agregar objetivo
            </button>
          )}
        </div>
      </div>

      {/* Tags */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9CA3AF' }}>Etiquetas</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full text-xs font-medium"
              style={{ background: '#E0F4FB', color: '#0098CD', border: '1px solid #B3E0F2', padding: '4px 10px' }}
            >
              {tag}
              {editable && (
                <button
                  onClick={() => removeTag(tag)}
                  style={{ color: '#0098CD', lineHeight: 1 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                  onMouseLeave={e => e.currentTarget.style.color = '#0098CD'}
                >
                  <X size={10} />
                </button>
              )}
            </span>
          ))}
        </div>
        {editable && (
          <input
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput) } }}
            onBlur={() => { if (tagInput.trim()) addTag(tagInput) }}
            placeholder="Añadir etiqueta y pulsar Enter…"
            className="text-sm outline-none bg-transparent"
            style={{ color: '#6B7280', caretColor: '#0098CD' }}
          />
        )}
      </div>
    </div>
  )
}

// ─── Main canvas ──────────────────────────────────────────────────────────────

export default function PantallaCanvas({
  rolActivo,
  seccionActiva,
  setSeccionActiva,
  panelIAabierto,
  setPanelIAabierto,
  onNavigate,
  asignaturaActiva,
  titulaciones,
}) {
  const [comentarioActivoBloque, setComentarioActivoBloque] = useState(null)
  const [quotePendiente, setQuotePendiente] = useState(null)
  const [bloquesState, setBloquesState] = useState({
    t2: bloquesTema2.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
    t1: bloquesTema1.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
    indice: bloquesIndice,
  })
  const [savedToast, setSavedToast] = useState(false)
  const [sentToast, setSentToast] = useState(false)

  // Resolve active asignatura for resumen section
  const asignaturaData = (() => {
    if (!asignaturaActiva || !titulaciones) return null
    const tit = titulaciones.find(t => t.id === asignaturaActiva.titulacionId)
    return tit?.asignaturas?.find(a => a.id === asignaturaActiva.asignaturaId) || null
  })()

  const isResumen = seccionActiva === 'resumen'
  const seccion = SECCION_CONFIG[seccionActiva] || SECCION_CONFIG.t2
  const bloques = bloquesState[seccionActiva] || seccion.bloques
  const editable = rolActivo === 'autor'

  const estadoMostrado = isResumen ? 'borrador' : (seccionActiva === 't1' && rolActivo === 'autor' ? 'comentarios' : seccion.estado)

  const handleComentarioClick = (bloque) => {
    if (bloque.comentarios?.length > 0) {
      setComentarioActivoBloque(bloque)
      setPanelIAabierto(false)
    }
  }

  const handleMarcarResuelto = (bloqueId, comentarioId) => {
    setBloquesState(prev => ({
      ...prev,
      [seccionActiva]: prev[seccionActiva].map(b => {
        if (b.id !== bloqueId) return b
        return {
          ...b,
          comentarios: b.comentarios.map(c =>
            c.id === comentarioId ? { ...c, resuelto: true } : c
          ),
        }
      }),
    }))
    const bloque = bloquesState[seccionActiva]?.find(b => b.id === bloqueId)
    if (bloque) {
      const remaining = bloque.comentarios.filter(c => c.id !== comentarioId && !c.resuelto)
      if (remaining.length === 0) {
        setTimeout(() => setComentarioActivoBloque(null), 800)
      }
    }
  }

  const handleResponder = (bloqueId, comentarioId, texto) => {
    setBloquesState(prev => ({
      ...prev,
      [seccionActiva]: prev[seccionActiva].map(b => {
        if (b.id !== bloqueId) return b
        return {
          ...b,
          comentarios: b.comentarios.map(c =>
            c.id === comentarioId
              ? { ...c, respuestas: [...(c.respuestas || []), { autor: 'Ana Lucía M.', texto }] }
              : c
          ),
        }
      }),
    }))
  }

  const totalComentariosCriticos = bloques.reduce((acc, b) => {
    return acc + (b.comentarios?.filter(c => c.gravedad === 'critico' && !c.resuelto).length || 0)
  }, 0)

  const showSavedToast = () => {
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 2000)
  }

  const showSentToast = () => {
    setSentToast(true)
    setTimeout(() => setSentToast(false), 2500)
  }

  const handleAccionIA = (texto, accion) => {
    setComentarioActivoBloque(null)
    setPanelIAabierto(true)
    setQuotePendiente({ texto, accion })
  }

  const tieneComentariosActivos = bloques.some(b => b.comentarios?.some(c => !c.resuelto))

  const getActionBar = () => {
    if (rolActivo === 'autor') {
      if (seccionActiva === 't1') {
        return (
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ background: '#F8F9FA', color: '#6B7280', border: '1px solid #E5E7EB' }}
          >
            <Eye size={13} />
            Solicitar permiso de edición
          </button>
        )
      }
      return (
        <>
          <button
            onClick={showSavedToast}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ background: '#F8F9FA', color: '#6B7280', border: '1px solid #E5E7EB' }}
          >
            <Save size={13} />
            Guardar borrador
          </button>
          {!isResumen && (
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: '#F8F9FA', color: '#6B7280', border: '1px solid #E5E7EB' }}
            >
              <Eye size={13} />
              Solicitar permiso de edición
            </button>
          )}
          <button
            onClick={showSentToast}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
            style={{ background: '#0098CD' }}
            onMouseEnter={e => e.currentTarget.style.background = '#00729A'}
            onMouseLeave={e => e.currentTarget.style.background = '#0098CD'}
          >
            {isResumen ? 'Enviar a revisión' : 'Enviar a revisión'}
            <ChevronRight size={13} />
          </button>
        </>
      )
    }
    return null
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 56px)', fontFamily: "'Inter', 'Arial', sans-serif" }}>
      {/* Section header bar */}
      <div
        className="flex-shrink-0"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}
      >
        {/* Top row: title + right controls */}
        <div className="flex items-center justify-between px-5 py-3" style={{ minHeight: '52px' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>
              {isResumen ? (asignaturaData?.nombre || 'Resumen') : seccion.label}
            </h2>
            <EstadoBadge estado={estadoMostrado} />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (comentarioActivoBloque) {
                  setComentarioActivoBloque(null)
                  setPanelIAabierto(true)
                } else {
                  const bloqueConComentario = bloques.find(b => b.comentarios?.some(c => !c.resuelto))
                  if (bloqueConComentario) handleComentarioClick(bloqueConComentario)
                }
              }}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: comentarioActivoBloque ? '#FEF2F2' : '#F8F9FA',
                color: comentarioActivoBloque ? '#EF4444' : tieneComentariosActivos ? '#6B7280' : '#CBD5E1',
                border: comentarioActivoBloque ? '1px solid #FECACA' : '1px solid #E5E7EB',
                cursor: tieneComentariosActivos ? 'pointer' : 'default',
              }}
            >
              <MessageSquare size={12} />
              Ver comentarios
              {totalComentariosCriticos > 0 && (
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{ background: '#EF4444', fontSize: '10px' }}
                >
                  {totalComentariosCriticos}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                if (panelIAabierto && !comentarioActivoBloque) {
                  setPanelIAabierto(false)
                } else {
                  setComentarioActivoBloque(null)
                  setPanelIAabierto(true)
                }
              }}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: panelIAabierto && !comentarioActivoBloque ? '#E0F4FB' : '#F8F9FA',
                color: panelIAabierto && !comentarioActivoBloque ? '#0098CD' : '#9CA3AF',
                border: panelIAabierto && !comentarioActivoBloque ? '1px solid #B3E0F2' : '1px solid #E5E7EB',
              }}
            >
              <Sparkles size={12} />
              Asistente IA
            </button>
          </div>
        </div>
        {/* Action row: inline with header */}
        {getActionBar() && (
          <div
            className="flex items-center gap-2 px-5 py-2.5"
            style={{ borderTop: '1px solid #F1F5F9' }}
          >
            {getActionBar()}
          </div>
        )}
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <PipelineSidebar
          seccionActiva={seccionActiva}
          onSeccionChange={(id) => {
            setSeccionActiva(id)
            setComentarioActivoBloque(null)
          }}
        />

        {/* Content area */}
        <main className="flex-1 overflow-y-auto" style={{ background: '#FFFFFF' }}>
          {isResumen ? (
            <SeccionResumen
              asignatura={asignaturaData}
              editable={editable}
              onAccionIA={handleAccionIA}
            />
          ) : (
            <div className="max-w-2xl mx-auto py-12 pl-16 pr-12" style={{ paddingBottom: '64px' }}>

              {/* Document header */}
              <div className="mb-10" style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '24px' }}>
                <p className="text-xs font-medium mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>
                  Fundamentos de Machine Learning · Máster en IA
                </p>
                <h1 className="text-2xl font-semibold leading-snug" style={{ color: '#111827' }}>
                  {seccion.label}
                </h1>
              </div>

              {!editable && (
                <div
                  className="flex items-center gap-2 mb-8 text-sm animate-fade-in"
                  style={{ color: '#9CA3AF' }}
                >
                  <Eye size={13} />
                  <span>Solo lectura — el Autor puede editar este contenido</span>
                </div>
              )}

              {/* Blocks — document style */}
              <div className="space-y-0">
                {bloques.map((bloque, i) => (
                  <div
                    key={bloque.id}
                    style={{
                      paddingTop: i === 0 ? '0' : '20px',
                      paddingBottom: '20px',
                      borderBottom: i < bloques.length - 1 ? '1px solid #F3F4F6' : 'none',
                    }}
                  >
                    <BloqueContenido
                      bloque={bloque}
                      index={i}
                      editable={editable}
                      onComentarioClick={() => handleComentarioClick(bloque)}
                      onAccionIA={handleAccionIA}
                    />
                  </div>
                ))}
              </div>

              {editable && (
                <button
                  className="mt-6 flex items-center gap-2 text-sm transition-all"
                  style={{ color: '#D1D5DB', paddingLeft: '0' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0098CD'}
                  onMouseLeave={e => e.currentTarget.style.color = '#D1D5DB'}
                >
                  <Plus size={14} />
                  Añadir párrafo
                </button>
              )}
            </div>
          )}
        </main>

        {/* Right panel: Comentarios */}
        {comentarioActivoBloque && (
          <div
            className="flex flex-col h-full animate-slide-in-right"
            style={{ width: '320px', minWidth: '320px', background: '#FFFFFF', borderLeft: '1px solid #E5E7EB' }}
          >
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #E5E7EB' }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#FEF2F2' }}>
                  <MessageSquare size={12} style={{ color: '#EF4444' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Comentarios</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    {comentarioActivoBloque.comentarios?.filter(c => !c.resuelto).length} sin resolver
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setComentarioActivoBloque(null); setPanelIAabierto(true) }}
                className="p-1.5 rounded-lg transition-colors text-xs"
                style={{ color: '#9CA3AF' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                ✕
              </button>
            </div>
            <div
              className="mx-3 mt-3 p-3 rounded-lg text-xs leading-relaxed"
              style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', color: '#6B7280' }}
            >
              <p className="font-medium uppercase tracking-wide mb-1"
                style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: "'Arial', sans-serif" }}>
                Bloque referenciado
              </p>
              {comentarioActivoBloque.contenido.substring(0, 120)}...
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {comentarioActivoBloque.comentarios?.map(comentario => (
                <ComentarioHilo
                  key={comentario.id}
                  comentario={comentario}
                  onMarcarResuelto={(cid) => handleMarcarResuelto(comentarioActivoBloque.id, cid)}
                  onResponder={(cid, texto) => handleResponder(comentarioActivoBloque.id, cid, texto)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Right panel: IA */}
        {panelIAabierto && !comentarioActivoBloque && (
          <PanelIA
            historialInicial={seccion.chat}
            temaLabel={seccion.labelCorto}
            quotePendiente={quotePendiente}
            onQuoteConsumed={() => setQuotePendiente(null)}
            onCerrar={() => setPanelIAabierto(false)}
          />
        )}

        {/* Collapsed IA toggle */}
        {!panelIAabierto && !comentarioActivoBloque && (
          <button
            onClick={() => setPanelIAabierto(true)}
            className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 px-2 transition-colors"
            style={{ width: '36px', background: '#F8F9FA', borderLeft: '1px solid #E5E7EB' }}
            onMouseEnter={e => e.currentTarget.style.background = '#E0F4FB'}
            onMouseLeave={e => e.currentTarget.style.background = '#F8F9FA'}
          >
            <Sparkles size={14} style={{ color: '#0098CD' }} />
            <span className="text-xs font-medium" style={{ color: '#0098CD', writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
              IA
            </span>
          </button>
        )}
      </div>

      {savedToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-xl animate-fade-in"
          style={{ background: '#10B981', zIndex: 100 }}>
          ✓ Borrador guardado
        </div>
      )}
      {sentToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-xl animate-fade-in"
          style={{ background: '#0098CD', zIndex: 100 }}>
          ✓ Tema 2 enviado a revisión
        </div>
      )}
    </div>
  )
}

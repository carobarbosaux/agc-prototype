import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronDown, Plus, MessageSquare, Eye, Sparkles, X, Lock, Wand2, ShieldCheck, BookOpenCheck, Check, ToggleLeft, ToggleRight, StickyNote, Pencil, Trash2, RefreshCw, ArrowUpRight, FlaskConical, BrainCircuit, Mic, Save, Layers } from 'lucide-react'
import PipelineSidebar from '../components/PipelineSidebar'
import BloqueContenido from '../components/BloqueContenido'
import PanelIA from '../components/PanelIA'
import ComentarioHilo from '../components/ComentarioHilo'
import EstadoBadge from '../components/EstadoBadge'
import EtiquetaBloque from '../components/EtiquetaBloque'
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
  // ─ Global ─
  indice: {
    label: 'Índice',
    labelCorto: 'Índice',
    estado: 'aprobado',
    bloques: bloquesIndice,
    chat: chatHistorialTema2,
  },
  // ─ Tema 1 ─
  'instrucciones-t1': {
    label: 'Instrucciones didácticas · Tema 1',
    labelCorto: 'Instrucciones T1',
    estado: 'aprobado',
    bloques: instruccionesTema1,
    chat: chatHistorialTema1,
  },
  t1: {
    label: 'Temario · Tema 1',
    labelCorto: 'Temario T1',
    estado: 'revision',
    bloques: bloquesTema1,
    chat: chatHistorialTema1,
  },
  'recursos-t1': {
    label: 'Recursos a fondo · Tema 1',
    labelCorto: 'Recursos T1',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema1,
  },
  'test-t1': {
    label: 'Tests · Tema 1',
    labelCorto: 'Tests T1',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema1,
  },
  // ─ Tema 2 ─
  'instrucciones-t2': {
    label: 'Instrucciones didácticas · Tema 2',
    labelCorto: 'Instrucciones T2',
    estado: 'aprobado',
    bloques: instruccionesTema2,
    chat: chatHistorialTema2,
  },
  t2: {
    label: 'Temario · Tema 2',
    labelCorto: 'Temario T2',
    estado: 'borrador',
    bloques: bloquesTema2,
    chat: chatHistorialTema2,
  },
  'recursos-t2': {
    label: 'Recursos a fondo · Tema 2',
    labelCorto: 'Recursos T2',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'test-t2': {
    label: 'Tests · Tema 2',
    labelCorto: 'Tests T2',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  // ─ Temas 3-6 (instrucciones only — temarios blocked) ─
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
  // ─ Temas 3-6 (temarios and subsections — all blocked) ─
  t3: {
    label: 'Temario · Tema 3',
    labelCorto: 'Temario T3',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'recursos-t3': {
    label: 'Recursos a fondo · Tema 3',
    labelCorto: 'Recursos T3',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'test-t3': {
    label: 'Tests · Tema 3',
    labelCorto: 'Tests T3',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  t4: {
    label: 'Temario · Tema 4',
    labelCorto: 'Temario T4',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'recursos-t4': {
    label: 'Recursos a fondo · Tema 4',
    labelCorto: 'Recursos T4',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'test-t4': {
    label: 'Tests · Tema 4',
    labelCorto: 'Tests T4',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  t5: {
    label: 'Temario · Tema 5',
    labelCorto: 'Temario T5',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'recursos-t5': {
    label: 'Recursos a fondo · Tema 5',
    labelCorto: 'Recursos T5',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'test-t5': {
    label: 'Tests · Tema 5',
    labelCorto: 'Tests T5',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  t6: {
    label: 'Temario · Tema 6',
    labelCorto: 'Temario T6',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'recursos-t6': {
    label: 'Recursos a fondo · Tema 6',
    labelCorto: 'Recursos T6',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'test-t6': {
    label: 'Tests · Tema 6',
    labelCorto: 'Tests T6',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
}

// ─── Índice section component (AI-generation flow) ────────────────────────────

function SeccionIndice({ bloques, creacionData, onCreacionDataConsumed, onGenerarResumen }) {
  const [generando, setGenerando] = useState(!!creacionData?.indice)
  const [indice, setIndice] = useState(creacionData?.indice || null)
  const [generandoResumen, setGenerandoResumen] = useState(false)

  // Play spinner then reveal index
  useEffect(() => {
    if (creacionData?.indice) {
      const t = setTimeout(() => {
        setGenerando(false)
        onCreacionDataConsumed()
      }, 1400)
      return () => clearTimeout(t)
    }
  }, [])

  const handleGenerarResumen = () => {
    setGenerandoResumen(true)
    setTimeout(() => {
      setGenerandoResumen(false)
      onGenerarResumen()
    }, 1200)
  }

  // If no creation data and not generating, show normal blocks
  if (!indice && !generando) {
    return null // caller handles normal block rendering
  }

  if (generando) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse"
          style={{ background: '#EEF2FF' }}
        >
          <Sparkles size={24} style={{ color: '#6366F1' }} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>Generando índice de temas…</p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>La IA está creando la estructura del curso…</p>
        </div>
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full animate-bounce"
              style={{ background: '#6366F1', animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (generandoResumen) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse"
          style={{ background: '#EEF2FF' }}
        >
          <Sparkles size={24} style={{ color: '#6366F1' }} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>Generando resumen preliminar…</p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>La IA está procesando tu solicitud…</p>
        </div>
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full animate-bounce"
              style={{ background: '#6366F1', animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* AI-generated index */}
      <div
        className="rounded-xl p-4 mb-5"
        style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}
      >
        <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: '#EEF2FF' }}>
            <Sparkles size={11} style={{ color: '#6366F1' }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: '#6366F1' }}>Índice generado por IA · Solo lectura</span>
        </div>
        <div className="space-y-2">
          {indice.map((tema, i) => (
            <div key={i} className="flex items-start gap-3 py-1.5">
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#9CA3AF' }}>{i + 1}</span>
              </div>
              <span className="text-sm" style={{ color: '#374151' }}>{tema.replace(/^Tema \d+: /, '')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI hint */}
      <div
        className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg mb-6"
        style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}
      >
        <Sparkles size={12} style={{ color: '#6366F1', flexShrink: 0, marginTop: '2px' }} />
        <p className="text-xs" style={{ color: '#4338CA', lineHeight: '1.5' }}>
          El índice se ha generado en base al área temática y los contenidos indicados. Podrás reorganizar y editar los temas desde el Canvas.
        </p>
      </div>

      {/* Next step CTA */}
      <button
        onClick={handleGenerarResumen}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
        style={{ background: '#6366F1', color: '#FFFFFF' }}
        onMouseEnter={e => e.currentTarget.style.background = '#4F46E5'}
        onMouseLeave={e => e.currentTarget.style.background = '#6366F1'}
      >
        <Sparkles size={14} />
        Generar resumen de la asignatura
        <ChevronRight size={14} />
      </button>
    </div>
  )
}

// ─── Resumen section component ────────────────────────────────────────────────

function SeccionResumen({ asignatura, resumenPrefill, editable, onAccionIA }) {
  const [nombre, setNombre] = useState(resumenPrefill?.nombre || asignatura?.nombre || '')
  const [descripcion, setDescripcion] = useState(resumenPrefill?.descripcion || asignatura?.descripcion || '')
  const [objetivos, setObjetivos] = useState(resumenPrefill?.objetivos || asignatura?.objetivos || [])
  const [tags, setTags] = useState(resumenPrefill?.tags || asignatura?.tags || [])
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
  onNavigate: _onNavigate,
  asignaturaActiva,
  titulaciones,
  creacionData,
  onCreacionDataConsumed,
}) {
  const [resumenPrefill, setResumenPrefill] = useState(null)
  const [comentarioActivoBloque, setComentarioActivoBloque] = useState(null)
  const [nuevoComentarioTexto, setNuevoComentarioTexto] = useState('')
  const [nuevoComentarioAnchor, setNuevoComentarioAnchor] = useState(null)
  const [quotePendiente, setQuotePendiente] = useState(null)
  const [bloquesState, setBloquesState] = useState({
    t2: bloquesTema2.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
    t1: bloquesTema1.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
    indice: bloquesIndice,
  })
  const [savedToast, setSavedToast] = useState(false)
  const [sentToast, setSentToast] = useState(false)
  const [revisandoCalidad, setRevisandoCalidad] = useState(false)
  // Autosave
  const [autosaveOn, setAutosaveOn] = useState(true)
  const [autosaveStatus, setAutosaveStatus] = useState('saved') // 'saved' | 'saving' | 'unsaved'
  // Notes
  const [notasState, setNotasState] = useState([])
  const [panelNotasAbierto, setPanelNotasAbierto] = useState(false)
  const [notaEditandoId, setNotaEditandoId] = useState(null)
  const [notaEditandoTexto, setNotaEditandoTexto] = useState('')
  const [selectionAnchor, setSelectionAnchor] = useState(null)
  const [nuevaNotaTexto, setNuevaNotaTexto] = useState('')
  const [herramientasMenuAbierto, setHerramientasMenuAbierto] = useState(false)
  const herramientasMenuRef = useRef(null)
  const [enrichmentPanelAbierto, setEnrichmentPanelAbierto] = useState(false)
  const [enrichmentGenerando, setEnrichmentGenerando] = useState(null) // null | 'test' | 'mapa' | 'podcast'
  const [enrichmentsGenerados, setEnrichmentsGenerados] = useState([]) // [{ tipo, titulo, descripcion }]
  // Inline IA suggestion state
  const [iaInline, setIaInline] = useState(null) // { bloqueId, accion, textoOriginal, textoGenerado, generando }

  useEffect(() => {
    const handler = (e) => {
      if (herramientasMenuRef.current && !herramientasMenuRef.current.contains(e.target)) {
        setHerramientasMenuAbierto(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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

  const estadoMostrado = isResumen ? 'borrador' : seccion.estado

  const handleComentarioClick = (bloque) => {
    if (bloque.comentarios?.length > 0) {
      setComentarioActivoBloque(bloque)
      setPanelIAabierto(false)
    }
  }

  const handleTipoChange = (bloqueId, nuevoTipo) => {
    const currentBloques = bloquesState[seccionActiva] || (SECCION_CONFIG[seccionActiva] || SECCION_CONFIG.t2).bloques
    setBloquesState(prev => ({
      ...prev,
      [seccionActiva]: currentBloques.map(b =>
        b.id === bloqueId ? { ...b, tipo: nuevoTipo } : b
      ),
    }))
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

  const handleAddComentario = () => {
    if (!nuevoComentarioTexto.trim() || !comentarioActivoBloque) return
    const nuevoC = {
      id: `c-${Date.now()}`,
      autor: 'Ana Lucía M.',
      rol: rolActivo === 'coordinador' ? 'Coordinador' : 'Autor',
      avatar: 'AL',
      gravedad: 'sugerencia',
      texto: nuevoComentarioTexto.trim(),
      anchor: nuevoComentarioAnchor,
      resuelto: false,
      respuestas: [],
    }
    setBloquesState(prev => ({
      ...prev,
      [seccionActiva]: (prev[seccionActiva] || []).map(b =>
        b.id === comentarioActivoBloque.id
          ? { ...b, comentarios: [...(b.comentarios || []), nuevoC] }
          : b
      ),
    }))
    // Update the active bloque reference so panel reflects new comment
    setComentarioActivoBloque(prev => ({
      ...prev,
      comentarios: [...(prev.comentarios || []), nuevoC],
    }))
    setNuevoComentarioTexto('')
    setNuevoComentarioAnchor(null)
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

  const toggleAutosave = () => {
    const next = !autosaveOn
    setAutosaveOn(next)
    if (next) {
      setAutosaveStatus('saving')
      setTimeout(() => setAutosaveStatus('saved'), 900)
    } else {
      setAutosaveStatus('unsaved')
    }
  }

  const handleAddNota = () => {
    if (!nuevaNotaTexto.trim() || !selectionAnchor) return
    setNotasState(prev => [
      ...prev,
      { id: `nota-${Date.now()}`, anchor: selectionAnchor, contenido: nuevaNotaTexto.trim(), bloqueId: seccionActiva },
    ])
    setNuevaNotaTexto('')
    setSelectionAnchor(null)
    setPanelNotasAbierto(true)
  }

  const handleDeleteNota = (id) => setNotasState(prev => prev.filter(n => n.id !== id))

  const handleSaveEditNota = (id) => {
    setNotasState(prev => prev.map(n => n.id === id ? { ...n, contenido: notaEditandoTexto } : n))
    setNotaEditandoId(null)
    setNotaEditandoTexto('')
  }

  // Detect text selection for "Añadir nota" mini-toolbar
  const handleTextSelection = () => {
    const sel = window.getSelection()?.toString().trim()
    if (sel && sel.length > 2) setSelectionAnchor(sel)
    else setSelectionAnchor(null)
  }

  const ACCIONES_INLINE = ['Expandir', 'Resumir', 'Regenerar']

  const mockGenerarInline = (texto, accion) => {
    if (accion === 'Expandir') {
      return `${texto} Este concepto tiene una importancia fundamental en el contexto del aprendizaje automático moderno, ya que establece las bases teóricas sobre las cuales se construyen los modelos más complejos. Su comprensión profunda permite al estudiante desarrollar una intuición sólida para diagnosticar y resolver problemas en situaciones reales de producción.`
    }
    if (accion === 'Resumir') {
      const words = texto.split(' ')
      return words.slice(0, Math.ceil(words.length * 0.45)).join(' ') + '.'
    }
    if (accion === 'Regenerar') {
      const variantes = [
        texto.replace(/\. /g, ', y ').replace(/,([^,]*)$/, '. $1'),
        `En términos prácticos, ${texto.charAt(0).toLowerCase() + texto.slice(1)}`,
        texto.split('. ').reverse().join('. '),
      ]
      return variantes[Math.floor(Math.random() * variantes.length)]
    }
    return texto
  }

  const handleAccionIA = (texto, accion, bloque) => {
    if (accion === 'Añadir comentario') {
      setComentarioActivoBloque(bloque)
      setNuevoComentarioAnchor(texto)
      setNuevoComentarioTexto('')
      setPanelIAabierto(false)
      setPanelNotasAbierto(false)
      return
    }
    if (accion === 'Llevar al chat') {
      setQuotePendiente({ texto, accion: 'Consultar' })
      setPanelIAabierto(true)
      setComentarioActivoBloque(null)
      setPanelNotasAbierto(false)
      return
    }
    if (accion === 'Añadir nota') {
      const snippet = texto.length > 60 ? texto.slice(0, 60) + '…' : texto
      setSelectionAnchor(texto)
      setNuevaNotaTexto(`Nota sobre: "${snippet}"`)
      setPanelNotasAbierto(true)
      setPanelIAabierto(false)
      setComentarioActivoBloque(null)
      return
    }
    if (ACCIONES_INLINE.includes(accion) && bloque) {
      setIaInline({ bloqueId: bloque.id, accion, textoOriginal: texto, textoGenerado: null, generando: true })
      setTimeout(() => {
        setIaInline(prev => prev ? { ...prev, textoGenerado: mockGenerarInline(texto, accion), generando: false } : null)
      }, 1200)
      return
    }
    setComentarioActivoBloque(null)
    setPanelIAabierto(true)
    setQuotePendiente({ texto, accion })
  }

  const handleRevisarCalidad = () => {
    setRevisandoCalidad(true)
    setComentarioActivoBloque(null)
    setPanelIAabierto(true)
    setTimeout(() => {
      setRevisandoCalidad(false)
      setQuotePendiente({
        texto: `[Revisar calidad] ${isResumen ? 'Resumen de asignatura' : seccion.label}`,
        accion: 'Revisar calidad',
      })
    }, 1800)
  }

  const tieneComentariosActivos = bloques.some(b => b.comentarios?.some(c => !c.resuelto))

  const getActionBar = () => {
    const estado = isResumen ? 'borrador' : seccion.estado

    // ─ Autor ─
    if (rolActivo === 'autor') {
      // Editando (borrador) o Corrigiendo (comentarios) → full bar
      if (estado === 'borrador' || estado === 'comentarios') {
        return (
          <>
            {/* Herramientas IA dropdown */}
            <div className="relative" ref={herramientasMenuRef}>
              <button
                onClick={() => setHerramientasMenuAbierto(v => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: herramientasMenuAbierto ? '#EEF2FF' : '#F8F9FA',
                  color: herramientasMenuAbierto ? '#6366F1' : '#6B7280',
                  border: herramientasMenuAbierto ? '1px solid #C7D2FE' : '1px solid #E5E7EB',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#EEF2FF'; e.currentTarget.style.color = '#6366F1'; e.currentTarget.style.borderColor = '#C7D2FE' }}
                onMouseLeave={e => {
                  if (!herramientasMenuAbierto) {
                    e.currentTarget.style.background = '#F8F9FA'; e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderColor = '#E5E7EB'
                  }
                }}
              >
                <Sparkles size={13} />
                Herramientas IA
                <ChevronDown size={11} />
              </button>

              {herramientasMenuAbierto && (
                <div
                  className="absolute left-0 top-full mt-1 rounded-xl overflow-hidden"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                    width: '210px',
                    zIndex: 50,
                  }}
                >
                  <div className="px-3 py-2" style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <span className="text-xs font-semibold" style={{ color: '#9CA3AF' }}>Asistente de contenido</span>
                  </div>
                  {/* Revisar calidad — active */}
                  <button
                    onClick={() => { setHerramientasMenuAbierto(false); handleRevisarCalidad() }}
                    disabled={revisandoCalidad}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors"
                    style={{ color: revisandoCalidad ? '#9CA3AF' : '#374151', cursor: revisandoCalidad ? 'default' : 'pointer' }}
                    onMouseEnter={e => { if (!revisandoCalidad) e.currentTarget.style.background = '#F8F9FA' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <Wand2 size={14} style={{ color: revisandoCalidad ? '#CBD5E1' : '#6366F1' }} />
                    <div className="text-left">
                      <p className="text-xs font-medium" style={{ color: revisandoCalidad ? '#9CA3AF' : '#374151' }}>
                        {revisandoCalidad ? 'Analizando…' : 'Revisar calidad'}
                      </p>
                      <p className="text-xs" style={{ color: '#9CA3AF' }}>Detectar incumplimientos normativos</p>
                    </div>
                  </button>
                  {/* Future tools — disabled */}
                  {[
                    { icon: ShieldCheck, label: 'Verificar coherencia', desc: 'Comprobar coherencia curricular' },
                    { icon: BookOpenCheck, label: 'Sugerir referencias', desc: 'Buscar fuentes académicas' },
                  ].map(({ icon: Icon, label, desc }) => (
                    <button
                      key={label}
                      disabled
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm"
                      style={{ color: '#CBD5E1', cursor: 'default' }}
                    >
                      <Icon size={14} style={{ color: '#E2E8F0' }} />
                      <div className="text-left">
                        <p className="text-xs font-medium" style={{ color: '#CBD5E1' }}>{label}</p>
                        <p className="text-xs" style={{ color: '#E2E8F0' }}>{desc}</p>
                      </div>
                      <span className="ml-auto text-xs px-1.5 py-0.5 rounded" style={{ background: '#F1F5F9', color: '#CBD5E1', fontFamily: "'Arial', sans-serif" }}>
                        Próx.
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Autosave toggle */}
            <button
              onClick={toggleAutosave}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: autosaveOn ? '#F0FDF4' : '#F8F9FA',
                color: autosaveOn ? '#16A34A' : '#9CA3AF',
                border: `1px solid ${autosaveOn ? '#BBF7D0' : '#E5E7EB'}`,
              }}
              title={autosaveOn ? 'Desactivar guardado automático' : 'Activar guardado automático'}
            >
              {autosaveOn ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
              {autosaveStatus === 'saving' ? 'Guardando…' : autosaveOn ? 'Autoguardado' : 'Sin guardar'}
              {autosaveStatus === 'saved' && autosaveOn && <Check size={11} />}
            </button>
            <button
              onClick={showSentToast}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
              style={{ background: '#0098CD' }}
              onMouseEnter={e => e.currentTarget.style.background = '#00729A'}
              onMouseLeave={e => e.currentTarget.style.background = '#0098CD'}
            >
              Enviar a revisión
              <ChevronRight size={13} />
            </button>
          </>
        )
      }
      // Revisando por coordinador → solo pedir permiso (amber)
      if (estado === 'revision') {
        return (
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ background: '#FFFBEB', color: '#F59E0B', border: '1px solid #FDE68A' }}
            onMouseEnter={e => e.currentTarget.style.background = '#FEF3C7'}
            onMouseLeave={e => e.currentTarget.style.background = '#FFFBEB'}
          >
            <Eye size={13} />
            Solicitar permiso de edición
          </button>
        )
      }
      // Aprobado → pedir permiso (gray)
      if (estado === 'aprobado') {
        return (
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ background: '#F8F9FA', color: '#6B7280', border: '1px solid #E5E7EB' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
            onMouseLeave={e => e.currentTarget.style.background = '#F8F9FA'}
          >
            <Eye size={13} />
            Solicitar permiso de edición
          </button>
        )
      }
      // Bloqueado → sin acciones
      return null
    }

    // ─ Coordinador ─
    if (rolActivo === 'coordinador') {
      // Revisando o Corrigiendo → puede enviar correcciones o aprobar
      if (estado === 'revision' || estado === 'comentarios') {
        return (
          <>
            <button
              onClick={showSavedToast}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: '#FFF7ED', color: '#F97316', border: '1px solid #FED7AA' }}
              onMouseEnter={e => e.currentTarget.style.background = '#FFEDD5'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFF7ED'}
            >
              <MessageSquare size={13} />
              Enviar correcciones
            </button>
            <button
              onClick={showSentToast}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
              style={{ background: '#10B981' }}
              onMouseEnter={e => e.currentTarget.style.background = '#059669'}
              onMouseLeave={e => e.currentTarget.style.background = '#10B981'}
            >
              <ChevronRight size={13} />
              Aprobar contenido
            </button>
          </>
        )
      }
      // Aprobado → comprobar actualizaciones
      if (estado === 'aprobado') {
        return (
          <button
            onClick={showSavedToast}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ background: '#F8F9FA', color: '#6B7280', border: '1px solid #E5E7EB' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
            onMouseLeave={e => e.currentTarget.style.background = '#F8F9FA'}
          >
            <Eye size={13} />
            Comprobar actualizaciones
          </button>
        )
      }
      // Editando por autor o bloqueado → sin acciones
      return null
    }

    // ─ Editor ─
    if (rolActivo === 'editor') {
      // Solo durante revisión por coordinador → puede enviar correcciones
      if (estado === 'revision') {
        return (
          <button
            onClick={showSavedToast}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ background: '#FFF7ED', color: '#F97316', border: '1px solid #FED7AA' }}
            onMouseEnter={e => e.currentTarget.style.background = '#FFEDD5'}
            onMouseLeave={e => e.currentTarget.style.background = '#FFF7ED'}
          >
            <MessageSquare size={13} />
            Enviar correcciones
          </button>
        )
      }
      // Aprobado → comprobar actualizaciones
      if (estado === 'aprobado') {
        return (
          <button
            onClick={showSavedToast}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ background: '#F8F9FA', color: '#6B7280', border: '1px solid #E5E7EB' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
            onMouseLeave={e => e.currentTarget.style.background = '#F8F9FA'}
          >
            <Eye size={13} />
            Comprobar actualizaciones
          </button>
        )
      }
      // Editando, corrigiendo o bloqueado → sin acciones
      return null
    }

    // ─ Diseñador ─
    if (rolActivo === 'disenador') {
      // Cualquier sección no bloqueada → herramientas de enriquecimiento didáctico
      if (estado !== 'bloqueado') {
        return (
          <>
            <button
              onClick={() => { setEnrichmentPanelAbierto(true); setComentarioActivoBloque(null); setPanelIAabierto(false); setPanelNotasAbierto(false) }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
              style={{ background: '#7C3AED' }}
              onMouseEnter={e => e.currentTarget.style.background = '#6D28D9'}
              onMouseLeave={e => e.currentTarget.style.background = '#7C3AED'}
            >
              <Layers size={13} />
              Crear experiencia didáctica
            </button>
          </>
        )
      }
      // Cualquier otro estado → sin acciones
      return null
    }

    return null
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 56px)', fontFamily: "'Inter', 'Arial', sans-serif" }}>
      {/* Page header — two rows */}
      <div className="flex-shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>

        {/* Row 1: section type label + estado badge */}
        <div className="flex items-center gap-3 px-5 pt-3 pb-1">
          <span className="text-xs font-medium" style={{ color: '#9CA3AF' }}>
            {isResumen ? 'Resumen de asignatura' : seccion.label}
          </span>
          <EstadoBadge estado={estadoMostrado} />
        </div>

        {/* Row 2: section title + action buttons + three-dots */}
        <div className="flex items-center justify-between px-5 pb-3 gap-3">
          <h2 className="text-base font-semibold truncate" style={{ color: '#111827', flexShrink: 1 }}>
            {isResumen
              ? (asignaturaData?.nombre || 'Nueva asignatura')
              : (seccion.labelCorto || seccion.label)}
          </h2>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Action buttons inline */}
            {getActionBar()}
          </div>
        </div>

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
        <main className="flex-1 overflow-y-auto" style={{ background: '#FFFFFF' }} onMouseUp={handleTextSelection} onKeyUp={handleTextSelection}>
          {isResumen ? (
            <SeccionResumen
              asignatura={asignaturaData}
              resumenPrefill={resumenPrefill}
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
                {rolActivo === 'coordinador' && (() => {
                  const tags = [...new Set(bloques.flatMap(b => b.etiquetas || []))]
                  return tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {tags.map(tag => <EtiquetaBloque key={tag} label={tag} />)}
                    </div>
                  ) : null
                })()}
              </div>

              {/* Índice section: AI generation flow */}
              {seccionActiva === 'indice' && creacionData?.indice ? (
                <SeccionIndice
                  bloques={bloques}
                  creacionData={creacionData}
                  onCreacionDataConsumed={onCreacionDataConsumed}
                  onGenerarResumen={() => {
                    setResumenPrefill(creacionData?.resumen || null)
                    setSeccionActiva('resumen')
                  }}
                />
              ) : seccion.estado === 'bloqueado' ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: '#F1F5F9' }}
                  >
                    <Lock size={22} style={{ color: '#CBD5E1' }} />
                  </div>
                  <p className="text-base font-medium mb-1.5" style={{ color: '#94A3B8' }}>Sección bloqueada</p>
                  <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#CBD5E1' }}>
                    Esta sección se desbloqueará automáticamente cuando se aprueben las etapas previas del tema.
                  </p>
                </div>
              ) : (
                <>
                  {!editable && (
                    <div
                      className="flex items-center gap-2 mb-8 text-sm animate-fade-in"
                      style={{ color: rolActivo === 'disenador' ? '#7C3AED' : '#9CA3AF' }}
                    >
                      {rolActivo === 'disenador' ? <Layers size={13} /> : <Eye size={13} />}
                      <span>
                        {rolActivo === 'disenador'
                          ? 'Contenido aprobado · Solo lectura — crea experiencias didácticas con el panel derecho'
                          : 'Solo lectura — el Autor puede editar este contenido'}
                      </span>
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
                          borderBottom: i < bloques.length - 1 && iaInline?.bloqueId !== bloque.id ? '1px solid #F3F4F6' : 'none',
                        }}
                      >
                        <BloqueContenido
                          bloque={bloque}
                          index={i}
                          editable={editable}
                          onComentarioClick={() => handleComentarioClick(bloque)}
                          onAccionIA={handleAccionIA}
                          onTipoChange={handleTipoChange}
                          textoReemplazando={iaInline?.bloqueId === bloque.id ? iaInline.textoOriginal : null}
                        />

                        {/* Inline IA suggestion */}
                        {iaInline?.bloqueId === bloque.id && (
                          <div className="mt-3 animate-fade-in" style={{ borderBottom: i < bloques.length - 1 ? '1px solid #F3F4F6' : 'none', paddingBottom: '20px' }}>
                            {iaInline.generando ? (
                              <div className="flex items-center gap-2.5 px-3 py-3 rounded-xl" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                                <div className="flex gap-1">
                                  {[0,1,2].map(j => (
                                    <div key={j} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#3B82F6', animationDelay: `${j * 0.15}s` }} />
                                  ))}
                                </div>
                                <span className="text-xs" style={{ color: '#3B82F6' }}>Generando versión {iaInline.accion.toLowerCase()}…</span>
                              </div>
                            ) : (
                              <>
                                {/* Label */}
                                <div className="flex items-center gap-1.5 mb-2">
                                  <Sparkles size={11} style={{ color: '#3B82F6' }} />
                                  <span className="text-xs font-semibold" style={{ color: '#3B82F6' }}>Sugerencia IA · {iaInline.accion}</span>
                                </div>

                                {/* Generated text */}
                                <div
                                  className="px-3 py-3 rounded-xl text-base leading-8"
                                  style={{
                                    background: '#EFF6FF',
                                    border: '1px solid #BFDBFE',
                                    color: '#1D4ED8',
                                  }}
                                >
                                  {iaInline.textoGenerado}
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center gap-2 mt-2.5">
                                  <button
                                    onClick={() => setIaInline(null)}
                                    className="px-3 py-1.5 rounded-lg text-xs transition-colors"
                                    style={{ color: '#9CA3AF' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                  >
                                    Descartar
                                  </button>
                                  <button
                                    onClick={() => {
                                      setIaInline(prev => ({ ...prev, generando: true, textoGenerado: null }))
                                      setTimeout(() => {
                                        setIaInline(prev => prev ? { ...prev, textoGenerado: mockGenerarInline(prev.textoOriginal, prev.accion), generando: false } : null)
                                      }, 1000)
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                    style={{ background: '#EFF6FF', color: '#3B82F6', border: '1px solid #BFDBFE' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#DBEAFE'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#EFF6FF'}
                                  >
                                    <RefreshCw size={11} />
                                    Reintentar
                                  </button>
                                  <button
                                    onClick={() => {
                                      setQuotePendiente({ texto: iaInline.textoOriginal, accion: iaInline.accion })
                                      setPanelIAabierto(true)
                                      setIaInline(null)
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                    style={{ color: '#6B7280', border: '1px solid #E5E7EB' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                  >
                                    <ArrowUpRight size={11} />
                                    Llevar al chat
                                  </button>
                                  <button
                                    onClick={() => {
                                      setBloquesState(prev => ({
                                        ...prev,
                                        [seccionActiva]: (prev[seccionActiva] || bloques).map(b =>
                                          b.id === bloque.id ? { ...b, contenido: iaInline.textoGenerado } : b
                                        ),
                                      }))
                                      setIaInline(null)
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                                    style={{ background: '#3B82F6', color: '#FFFFFF' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#3B82F6'}
                                  >
                                    <Check size={12} />
                                    Aceptar cambios
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        )}
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
                </>
              )}
            </div>
          )}
        </main>

        {/* Utilities strip — always visible */}
        <div
          className="flex-shrink-0 flex flex-col items-center pt-3 pb-4 gap-1"
          style={{ width: '60px', background: '#F8F9FA', borderLeft: '1px solid #E5E7EB' }}
        >
          {/* Comments */}
          <button
            onClick={() => {
              const first = bloques.find(b => b.comentarios?.some(c => !c.resuelto))
              if (first) { setComentarioActivoBloque(first); setPanelIAabierto(false); setPanelNotasAbierto(false) }
            }}
            className="relative flex flex-col items-center gap-1 w-full py-2 rounded-lg transition-colors"
            style={{ color: comentarioActivoBloque ? '#EF4444' : tieneComentariosActivos ? '#6B7280' : '#CBD5E1', cursor: tieneComentariosActivos ? 'pointer' : 'default' }}
            onMouseEnter={e => { if (tieneComentariosActivos) e.currentTarget.style.background = '#F1F5F9' }}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div className="relative">
              <MessageSquare size={15} />
              {totalComentariosCriticos > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#EF4444', fontSize: '8px' }}>
                  {totalComentariosCriticos}
                </span>
              )}
            </div>
            <span className="text-center leading-tight" style={{ fontSize: '9px', fontWeight: comentarioActivoBloque ? '600' : '500' }}>Comentarios</span>
          </button>

          {/* Notas */}
          <button
            onClick={() => { setPanelNotasAbierto(v => !v); setComentarioActivoBloque(null); setPanelIAabierto(false) }}
            className="relative flex flex-col items-center gap-1 w-full py-2 rounded-lg transition-colors"
            style={{ color: panelNotasAbierto ? '#D97706' : '#9CA3AF' }}
            onMouseEnter={e => { if (!panelNotasAbierto) e.currentTarget.style.background = '#F1F5F9' }}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div className="relative">
              <StickyNote size={15} />
              {notasState.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#D97706', fontSize: '8px' }}>
                  {notasState.length}
                </span>
              )}
            </div>
            <span className="text-center leading-tight" style={{ fontSize: '9px', fontWeight: panelNotasAbierto ? '600' : '500' }}>Notas</span>
          </button>

          {/* IA */}
          <button
            onClick={() => { setPanelIAabierto(true); setComentarioActivoBloque(null); setPanelNotasAbierto(false) }}
            className="flex flex-col items-center gap-1 w-full py-2 rounded-lg transition-colors"
            style={{ color: panelIAabierto ? '#0098CD' : '#9CA3AF' }}
            onMouseEnter={e => { if (!panelIAabierto) e.currentTarget.style.background = '#F1F5F9' }}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Sparkles size={15} />
            <span className="text-center leading-tight" style={{ fontSize: '9px', fontWeight: panelIAabierto ? '600' : '500' }}>Asistente IA</span>
          </button>

          {/* Experiencias (disenador only) */}
          {rolActivo === 'disenador' && (
            <button
              onClick={() => { setEnrichmentPanelAbierto(v => !v); setComentarioActivoBloque(null); setPanelIAabierto(false); setPanelNotasAbierto(false) }}
              className="flex flex-col items-center gap-1 w-full py-2 rounded-lg transition-colors"
              style={{ color: enrichmentPanelAbierto ? '#7C3AED' : '#9CA3AF' }}
              onMouseEnter={e => { if (!enrichmentPanelAbierto) e.currentTarget.style.background = '#F1F5F9' }}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div className="relative">
                <Layers size={15} />
                {enrichmentsGenerados.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#7C3AED', fontSize: '8px' }}>
                    {enrichmentsGenerados.length}
                  </span>
                )}
              </div>
              <span className="text-center leading-tight" style={{ fontSize: '9px', fontWeight: enrichmentPanelAbierto ? '600' : '500' }}>Experiencias</span>
            </button>
          )}
        </div>

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
                onClick={() => setComentarioActivoBloque(null)}
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
              {comentarioActivoBloque.comentarios?.filter(c => !c.resuelto).length === 0 && (
                <p className="text-xs text-center py-4" style={{ color: '#9CA3AF' }}>No hay comentarios activos</p>
              )}
              {comentarioActivoBloque.comentarios?.map(comentario => (
                <ComentarioHilo
                  key={comentario.id}
                  comentario={comentario}
                  onMarcarResuelto={(cid) => handleMarcarResuelto(comentarioActivoBloque.id, cid)}
                  onResponder={(cid, texto) => handleResponder(comentarioActivoBloque.id, cid, texto)}
                />
              ))}
            </div>
            {/* New comment compose */}
            <div className="px-3 pb-3 flex-shrink-0" style={{ borderTop: '1px solid #E5E7EB', paddingTop: '10px' }}>
              {nuevoComentarioAnchor && (
                <p className="text-xs mb-1.5 truncate" style={{ color: '#9CA3AF' }}>
                  Sobre: <span className="italic">"{nuevoComentarioAnchor.slice(0, 50)}{nuevoComentarioAnchor.length > 50 ? '…' : ''}"</span>
                </p>
              )}
              <textarea
                rows={3}
                placeholder="Escribe un comentario..."
                value={nuevoComentarioTexto}
                onChange={e => setNuevoComentarioTexto(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAddComentario() }}
                className="w-full resize-none rounded-lg text-xs p-2.5 outline-none"
                style={{ border: '1px solid #E5E7EB', background: '#F9FAFB', color: '#1F2937' }}
              />
              <button
                onClick={handleAddComentario}
                disabled={!nuevoComentarioTexto.trim()}
                className="w-full mt-1.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: nuevoComentarioTexto.trim() ? '#EF4444' : '#E5E7EB',
                  color: nuevoComentarioTexto.trim() ? '#FFFFFF' : '#9CA3AF',
                }}
              >
                Añadir comentario
              </button>
            </div>
          </div>
        )}

        {/* Right panel: Notas */}
        {panelNotasAbierto && !comentarioActivoBloque && !panelIAabierto && (
          <div
            className="flex flex-col h-full animate-slide-in-right"
            style={{ width: '300px', minWidth: '300px', background: '#FFFDF0', borderLeft: '1px solid #FDE68A' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #FDE68A' }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#FEF9C3' }}>
                  <StickyNote size={12} style={{ color: '#D97706' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Notas</p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>{notasState.length} nota{notasState.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={() => setPanelNotasAbierto(false)}
                className="p-1.5 rounded-lg transition-colors text-xs"
                style={{ color: '#9CA3AF' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FEF9C3'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <X size={14} />
              </button>
            </div>

            {/* Add new note — shows only when text is selected */}
            {selectionAnchor && (
              <div className="mx-3 mt-3 p-3 rounded-lg" style={{ background: '#FFFFFF', border: '1px solid #FDE68A' }}>
                <p className="text-xs font-semibold mb-1.5" style={{ color: '#D97706' }}>
                  Nota para: <span className="font-normal italic" style={{ color: '#9CA3AF' }}>«{selectionAnchor.substring(0, 50)}{selectionAnchor.length > 50 ? '…' : ''}»</span>
                </p>
                <textarea
                  value={nuevaNotaTexto}
                  onChange={e => setNuevaNotaTexto(e.target.value)}
                  placeholder="Escribe tu nota…"
                  rows={3}
                  className="w-full text-sm outline-none resize-none"
                  style={{ color: '#374151', caretColor: '#D97706', background: 'transparent' }}
                  autoFocus
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => { setSelectionAnchor(null); setNuevaNotaTexto('') }}
                    className="text-xs px-2 py-1 rounded"
                    style={{ color: '#9CA3AF' }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddNota}
                    disabled={!nuevaNotaTexto.trim()}
                    className="text-xs px-3 py-1 rounded-lg font-semibold text-white"
                    style={{ background: nuevaNotaTexto.trim() ? '#D97706' : '#E5E7EB', color: nuevaNotaTexto.trim() ? '#FFFFFF' : '#9CA3AF' }}
                  >
                    Guardar nota
                  </button>
                </div>
              </div>
            )}

            {/* Notes list */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {notasState.length === 0 && !selectionAnchor && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <StickyNote size={24} style={{ color: '#FDE68A', marginBottom: '8px' }} />
                  <p className="text-sm font-medium" style={{ color: '#9CA3AF' }}>Sin notas aún</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: '#CBD5E1' }}>
                    Selecciona texto en el Canvas y aparecerá la opción "Añadir nota"
                  </p>
                </div>
              )}
              {notasState.map(nota => (
                <div
                  key={nota.id}
                  className="rounded-xl p-3"
                  style={{ background: '#FFFFFF', border: '1px solid #FDE68A' }}
                >
                  <p className="text-xs mb-1.5 italic" style={{ color: '#CBD5E1' }}>
                    «{nota.anchor.substring(0, 60)}{nota.anchor.length > 60 ? '…' : ''}»
                  </p>
                  {notaEditandoId === nota.id ? (
                    <>
                      <textarea
                        value={notaEditandoTexto}
                        onChange={e => setNotaEditandoTexto(e.target.value)}
                        rows={3}
                        className="w-full text-sm outline-none resize-none rounded px-2 py-1"
                        style={{ color: '#374151', background: '#FFFDF0', border: '1px solid #FDE68A' }}
                        autoFocus
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button onClick={() => setNotaEditandoId(null)} className="text-xs" style={{ color: '#9CA3AF' }}>Cancelar</button>
                        <button
                          onClick={() => handleSaveEditNota(nota.id)}
                          className="text-xs px-2 py-1 rounded font-semibold text-white"
                          style={{ background: '#D97706' }}
                        >
                          Guardar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm" style={{ color: '#374151' }}>{nota.contenido}</p>
                      <div className="flex items-center gap-2 mt-2 justify-end">
                        <button
                          onClick={() => { setNotaEditandoId(nota.id); setNotaEditandoTexto(nota.contenido) }}
                          className="p-1 rounded transition-colors"
                          style={{ color: '#CBD5E1' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#D97706'}
                          onMouseLeave={e => e.currentTarget.style.color = '#CBD5E1'}
                          title="Editar"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteNota(nota.id)}
                          className="p-1 rounded transition-colors"
                          style={{ color: '#CBD5E1' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                          onMouseLeave={e => e.currentTarget.style.color = '#CBD5E1'}
                          title="Eliminar"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right panel: Experiencias Didácticas (disenador) */}
        {enrichmentPanelAbierto && rolActivo === 'disenador' && !comentarioActivoBloque && !panelIAabierto && (
          <div
            className="flex flex-col h-full animate-slide-in-right"
            style={{ width: '320px', minWidth: '320px', background: '#FFFFFF', borderLeft: '1px solid #E5E7EB' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #E5E7EB' }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#F3E8FF' }}>
                  <Layers size={12} style={{ color: '#7C3AED' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Experiencias Didácticas</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>Capa de enriquecimiento · no modifica el contenido académico</p>
                </div>
              </div>
              <button
                onClick={() => setEnrichmentPanelAbierto(false)}
                className="p-1.5 rounded-lg transition-colors text-xs"
                style={{ color: '#9CA3AF' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <X size={13} />
              </button>
            </div>

            {/* Generator buttons */}
            <div className="px-4 pt-4 pb-3 flex-shrink-0" style={{ borderBottom: '1px solid #F3F4F6' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#9CA3AF' }}>Generar para este tema</p>
              <div className="space-y-2">
                {[
                  { tipo: 'test', icon: FlaskConical, label: 'Test de autoevaluación', desc: 'Preguntas de opción múltiple', color: '#7C3AED', bg: '#F3E8FF' },
                  { tipo: 'mapa', icon: BrainCircuit, label: 'Mapa mental', desc: 'Estructura visual de conceptos', color: '#0EA5E9', bg: '#E0F2FE' },
                  { tipo: 'podcast', icon: Mic, label: 'Resumen en podcast', desc: 'Guion de audio con síntesis del tema', color: '#10B981', bg: '#ECFDF5' },
                ].map(({ tipo, icon: Icon, label, desc, color, bg }) => (
                  <button
                    key={tipo}
                    onClick={() => {
                      if (enrichmentGenerando) return
                      setEnrichmentGenerando(tipo)
                      setTimeout(() => {
                        setEnrichmentsGenerados(prev => {
                          const exists = prev.find(e => e.tipo === tipo)
                          if (exists) return prev.map(e => e.tipo === tipo ? { ...e, generado: true } : e)
                          return [...prev, { tipo, titulo: label, descripcion: desc, generado: true }]
                        })
                        setEnrichmentGenerando(null)
                      }, 1600)
                    }}
                    disabled={!!enrichmentGenerando}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                    style={{
                      background: enrichmentGenerando === tipo ? bg : '#F8F9FA',
                      border: `1px solid ${enrichmentGenerando === tipo ? color + '40' : '#E5E7EB'}`,
                      cursor: enrichmentGenerando ? 'default' : 'pointer',
                      opacity: enrichmentGenerando && enrichmentGenerando !== tipo ? 0.5 : 1,
                    }}
                    onMouseEnter={e => { if (!enrichmentGenerando) { e.currentTarget.style.background = bg; e.currentTarget.style.borderColor = color + '40' } }}
                    onMouseLeave={e => { if (!enrichmentGenerando) { e.currentTarget.style.background = '#F8F9FA'; e.currentTarget.style.borderColor = '#E5E7EB' } }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                      {enrichmentGenerando === tipo
                        ? <div className="flex gap-0.5">{[0,1,2].map(i => <div key={i} className="w-1 h-1 rounded-full animate-bounce" style={{ background: color, animationDelay: `${i*0.15}s` }} />)}</div>
                        : <Icon size={14} style={{ color }} />
                      }
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: '#1A1A1A' }}>{enrichmentGenerando === tipo ? 'Generando…' : label}</p>
                      <p className="text-xs" style={{ color: '#9CA3AF' }}>{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generated enrichments list */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {enrichmentsGenerados.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#F3E8FF' }}>
                    <Layers size={18} style={{ color: '#C4B5FD' }} />
                  </div>
                  <p className="text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>Sin experiencias todavía</p>
                  <p className="text-xs" style={{ color: '#CBD5E1' }}>Genera un test, mapa mental o podcast para este tema</p>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#9CA3AF' }}>Experiencias generadas</p>
                  <div className="space-y-2">
                    {enrichmentsGenerados.map((e, i) => {
                      const iconMap = { test: FlaskConical, mapa: BrainCircuit, podcast: Mic }
                      const colorMap = { test: '#7C3AED', mapa: '#0EA5E9', podcast: '#10B981' }
                      const bgMap = { test: '#F3E8FF', mapa: '#E0F2FE', podcast: '#ECFDF5' }
                      const Icon = iconMap[e.tipo]
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                          style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}
                        >
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: bgMap[e.tipo] }}>
                            <Icon size={12} style={{ color: colorMap[e.tipo] }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate" style={{ color: '#374151' }}>{e.titulo}</p>
                            <p className="text-xs" style={{ color: '#9CA3AF' }}>Borrador · sin publicar</p>
                          </div>
                          <button
                            className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-medium transition-all"
                            style={{ background: '#F3E8FF', color: '#7C3AED', border: '1px solid #DDD6FE' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#EDE9FE'}
                            onMouseLeave={e => e.currentTarget.style.background = '#F3E8FF'}
                          >
                            <Save size={10} />
                            Publicar
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
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

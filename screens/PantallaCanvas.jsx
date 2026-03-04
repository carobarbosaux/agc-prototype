import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronDown, Plus, Save, MessageSquare, Eye, Sparkles, X, Lock, MoreHorizontal, Star, Clock, Download, Wand2, ShieldCheck, BookOpenCheck } from 'lucide-react'
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
  const [quotePendiente, setQuotePendiente] = useState(null)
  const [bloquesState, setBloquesState] = useState({
    t2: bloquesTema2.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
    t1: bloquesTema1.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
    indice: bloquesIndice,
  })
  const [savedToast, setSavedToast] = useState(false)
  const [sentToast, setSentToast] = useState(false)
  const [revisandoCalidad, setRevisandoCalidad] = useState(false)
  const [masMenuAbierto, setMasMenuAbierto] = useState(false)
  const [herramientasMenuAbierto, setHerramientasMenuAbierto] = useState(false)
  const masMenuRef = useRef(null)
  const herramientasMenuRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (masMenuRef.current && !masMenuRef.current.contains(e.target)) {
        setMasMenuAbierto(false)
      }
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

            <button
              onClick={showSavedToast}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: '#F8F9FA', color: '#6B7280', border: '1px solid #E5E7EB' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
              onMouseLeave={e => e.currentTarget.style.background = '#F8F9FA'}
            >
              <Save size={13} />
              Guardar borrador
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
      // Solo cuando aprobado → puede solicitar permiso para sugerir enriquecimiento
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

            {/* Three-dots menu */}
            <div className="relative" ref={masMenuRef}>
              <button
                onClick={() => setMasMenuAbierto(v => !v)}
                className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                style={{
                  background: masMenuAbierto ? '#F1F5F9' : 'transparent',
                  border: '1px solid #E5E7EB',
                  color: '#6B7280',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                onMouseLeave={e => e.currentTarget.style.background = masMenuAbierto ? '#F1F5F9' : 'transparent'}
              >
                <MoreHorizontal size={14} />
              </button>

              {masMenuAbierto && (
                <div
                  className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                    width: '180px',
                    zIndex: 50,
                  }}
                >
                  {[
                    { icon: Star, label: 'Añadir a favoritos' },
                    { icon: Clock, label: 'Historial de versiones' },
                    { icon: Download, label: 'Exportar' },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      onClick={() => setMasMenuAbierto(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors"
                      style={{ color: '#374151' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <Icon size={14} style={{ color: '#9CA3AF' }} />
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
        <main className="flex-1 overflow-y-auto" style={{ background: '#FFFFFF' }}>
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
                </>
              )}
            </div>
          )}
        </main>

        {/* Utilities strip — comments + IA toggle */}
        {!comentarioActivoBloque && !panelIAabierto && (
          <div
            className="flex-shrink-0 flex flex-col items-center py-3 gap-2"
            style={{ width: '44px', background: '#F8F9FA', borderLeft: '1px solid #E5E7EB' }}
          >
            {/* Comments badge */}
            <button
              onClick={() => {
                const bloqueConComentario = bloques.find(b => b.comentarios?.some(c => !c.resuelto))
                if (bloqueConComentario) handleComentarioClick(bloqueConComentario)
              }}
              className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              style={{
                background: tieneComentariosActivos ? '#FFFFFF' : 'transparent',
                border: tieneComentariosActivos ? '1px solid #E5E7EB' : '1px solid transparent',
                cursor: tieneComentariosActivos ? 'pointer' : 'default',
                color: tieneComentariosActivos ? '#6B7280' : '#CBD5E1',
              }}
              title="Ver comentarios"
              onMouseEnter={e => { if (tieneComentariosActivos) e.currentTarget.style.background = '#F1F5F9' }}
              onMouseLeave={e => { if (tieneComentariosActivos) e.currentTarget.style.background = '#FFFFFF' }}
            >
              <MessageSquare size={14} />
              {totalComentariosCriticos > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ background: '#EF4444', fontSize: '9px' }}
                >
                  {totalComentariosCriticos}
                </span>
              )}
            </button>

            {/* IA toggle */}
            <button
              onClick={() => setPanelIAabierto(true)}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', color: '#0098CD' }}
              title="Asistente IA"
              onMouseEnter={e => { e.currentTarget.style.background = '#E0F4FB'; e.currentTarget.style.borderColor = '#B3E0F2' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E7EB' }}
            >
              <Sparkles size={14} />
            </button>
          </div>
        )}

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

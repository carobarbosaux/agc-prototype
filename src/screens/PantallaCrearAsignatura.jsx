import { useState } from 'react'
import { Sparkles, Check, BookOpen, X, ArrowLeft, Search, ChevronRight } from 'lucide-react'
import { tagsSugerenciasPorArea } from '../mockData'

// ─── Mock generation helpers ───────────────────────────────────────────────────

const INDICE_POR_AREA = {
  'Inteligencia Artificial': [
    'Tema 1: Introducción a la IA y sus paradigmas',
    'Tema 2: Aprendizaje automático supervisado',
    'Tema 3: Aprendizaje no supervisado y clustering',
    'Tema 4: Redes neuronales y deep learning',
    'Tema 5: Procesamiento del lenguaje natural',
    'Tema 6: Visión por computador',
    'Tema 7: Ética, sesgo y regulación en IA',
  ],
  'Ciencia de Datos': [
    'Tema 1: Fundamentos de ciencia de datos',
    'Tema 2: Adquisición y limpieza de datos',
    'Tema 3: Análisis exploratorio y visualización',
    'Tema 4: Modelado estadístico y predictivo',
    'Tema 5: Pipelines de datos y MLOps',
    'Tema 6: Comunicación de resultados',
  ],
  default: [
    'Tema 1: Introducción y fundamentos',
    'Tema 2: Conceptos clave y terminología',
    'Tema 3: Metodología y herramientas',
    'Tema 4: Aplicaciones prácticas',
    'Tema 5: Evaluación y mejores prácticas',
    'Tema 6: Tendencias y perspectivas',
  ],
}

const DESCRIPCION_TEMPLATES = [
  (nombre, nivel, area) =>
    `${nombre} es una asignatura de nivel ${nivel.toLowerCase()} que introduce a los estudiantes en los fundamentos de ${area}. A través de un enfoque práctico y riguroso, los participantes adquirirán las herramientas conceptuales y técnicas necesarias para afrontar problemas reales del campo.`,
]

const OBJETIVO_POOLS = {
  'Inteligencia Artificial': [
    'Comprender los fundamentos teóricos y prácticos del área',
    'Implementar algoritmos y modelos aplicados a problemas reales',
    'Evaluar el rendimiento y seleccionar la solución más adecuada',
    'Desarrollar pensamiento crítico sobre limitaciones y sesgos',
  ],
  default: [
    'Comprender los conceptos fundamentales de la disciplina',
    'Aplicar los conocimientos adquiridos en casos prácticos reales',
    'Desarrollar habilidades técnicas relevantes para el mercado profesional',
    'Evaluar críticamente soluciones y tomar decisiones fundamentadas',
  ],
}

function generarIndice(datos) {
  const area = datos.areaConocimiento || 'default'
  return (INDICE_POR_AREA[area] || INDICE_POR_AREA.default).slice(
    0,
    Math.max(4, parseInt(datos.temas) || 6)
  )
}

function generarResumen(datos) {
  const nombre = datos.nombre || 'Nueva Asignatura'
  const area = datos.areaConocimiento || 'default'
  const nivel = datos.nivel || 'Intermedio'
  const descripcion = DESCRIPCION_TEMPLATES[0](nombre, nivel, area)
  const objetivosPool = OBJETIVO_POOLS[area] || OBJETIVO_POOLS.default
  const objetivos = objetivosPool.slice(0, 4)
  const tags = (tagsSugerenciasPorArea[area] || []).slice(0, 5)
  return { nombre, descripcion, objetivos, tags }
}

// ─── Step 1: Contexto académico ────────────────────────────────────────────────

function PasoContextoAcademico({ datos, onChange }) {
  const titulaciones = datos._titulaciones || []
  const [busqueda, setBusqueda] = useState('')

  const filtradas = busqueda.trim()
    ? titulaciones.filter(t =>
        t.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.codigo.toLowerCase().includes(busqueda.toLowerCase())
      )
    : titulaciones

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold mb-1" style={{ color: '#1A1A1A' }}>Contexto académico</h3>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Cuéntanos los aspectos básicos de la asignatura para que la IA pueda generar el contenido más adecuado.
        </p>
      </div>

      {/* Titulación */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Titulación
        </label>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3"
          style={{ background: '#F8F9FA', border: '1.5px solid #E5E7EB' }}
        >
          <Search size={13} style={{ color: '#9CA3AF', flexShrink: 0 }} />
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar titulación…"
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: '#374151' }}
            onFocus={e => e.currentTarget.parentElement.style.borderColor = '#0098CD'}
            onBlur={e => e.currentTarget.parentElement.style.borderColor = '#E5E7EB'}
          />
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {filtradas.map(t => {
            const sel = datos.titulacionId === t.id
            return (
              <button
                key={t.id}
                onClick={() => onChange('titulacionId', t.id)}
                className="w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all"
                style={{
                  background: sel ? '#E0F4FB' : '#F8F9FA',
                  border: sel ? '2px solid #0098CD' : '2px solid transparent',
                }}
              >
                <BookOpen size={14} style={{ color: sel ? '#0098CD' : '#94A3B8' }} />
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate" style={{ color: sel ? '#0098CD' : '#1A1A1A' }}>{t.nombre}</p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>{t.codigo}</p>
                </div>
                {sel && <Check size={14} style={{ color: '#0098CD' }} />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Nivel */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Nivel de estudio
        </label>
        <select
          value={datos.nivel || ''}
          onChange={e => onChange('nivel', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
          style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: datos.nivel ? '#1A1A1A' : '#9CA3AF' }}
          onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        >
          <option value="">Seleccionar nivel…</option>
          {['Grado', 'Postgrado', 'Máster', 'Doctorado', 'Formación continua'].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Público objetivo */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Público objetivo
        </label>
        <textarea
          value={datos.publicoObjetivo || ''}
          onChange={e => onChange('publicoObjetivo', e.target.value)}
          placeholder="Ej. Profesionales de TI con 2+ años de experiencia que quieren especializarse en IA aplicada…"
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
          style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#374151', lineHeight: '1.6' }}
          onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        />
      </div>

      {/* Créditos + Nombre */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
            Número de créditos (ECTS)
          </label>
          <input
            type="number"
            value={datos.creditos || ''}
            onChange={e => onChange('creditos', e.target.value)}
            min={1} max={30}
            placeholder="6"
            className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
            style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#1A1A1A' }}
            onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
            onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
            Nombre provisional
          </label>
          <input
            type="text"
            value={datos.nombre || ''}
            onChange={e => onChange('nombre', e.target.value)}
            placeholder="Ej. Fundamentos de ML"
            className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
            style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#1A1A1A' }}
            onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
            onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
          />
        </div>
      </div>

      {/* Temas a tratar */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Temas o contenidos a tratar
        </label>
        <textarea
          value={datos.temasTratar || ''}
          onChange={e => onChange('temasTratar', e.target.value)}
          placeholder="Ej. Regresión lineal, clasificación, árboles de decisión, redes neuronales, evaluación de modelos…"
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
          style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#374151', lineHeight: '1.6' }}
          onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        />
      </div>
    </div>
  )
}

// ─── Step 2: Definición temática ───────────────────────────────────────────────

function PasoDefinicionTematica({ datos, onChange }) {
  const areas = Object.keys(tagsSugerenciasPorArea)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold mb-1" style={{ color: '#1A1A1A' }}>Definición temática</h3>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          La IA usará estas respuestas para generar el índice de temas automáticamente.
        </p>
      </div>

      {/* Área de conocimiento */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Área de conocimiento
        </label>
        <div className="grid grid-cols-2 gap-2">
          {areas.map(area => {
            const sel = datos.areaConocimiento === area
            return (
              <button
                key={area}
                onClick={() => onChange('areaConocimiento', area)}
                className="text-left px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  background: sel ? '#E0F4FB' : '#F8F9FA',
                  border: sel ? '2px solid #0098CD' : '2px solid transparent',
                  color: sel ? '#0098CD' : '#374151',
                  fontWeight: sel ? '600' : '400',
                }}
              >
                {area}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tipo de asignatura */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Tipo de asignatura
        </label>
        <select
          value={datos.tipoAsignatura || ''}
          onChange={e => onChange('tipoAsignatura', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
          style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: datos.tipoAsignatura ? '#1A1A1A' : '#9CA3AF' }}
          onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        >
          <option value="">Seleccionar tipo…</option>
          {['Cuantitativa', 'Cualitativa', 'Mixta'].map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {/* Enfoque */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Enfoque principal
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['Teórico', 'Práctico', 'Mixto', 'Basado en casos', 'Por proyectos', 'Investigación'].map(enfoque => {
            const sel = datos.enfoque === enfoque
            return (
              <button
                key={enfoque}
                onClick={() => onChange('enfoque', enfoque)}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: sel ? '#E0F4FB' : '#F8F9FA',
                  border: sel ? '2px solid #0098CD' : '2px solid transparent',
                  color: sel ? '#0098CD' : '#6B7280',
                }}
              >
                {enfoque}
              </button>
            )
          })}
        </div>
      </div>

      {/* AI preview hint */}
      <div
        className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg"
        style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}
      >
        <Sparkles size={12} style={{ color: '#6366F1', flexShrink: 0, marginTop: '2px' }} />
        <p className="text-xs" style={{ color: '#4338CA', lineHeight: '1.5' }}>
          Al hacer clic en <strong>Generar índice</strong>, la IA creará el índice de temas directamente en el Canvas donde podrás revisarlo y continuar con la generación del resumen.
        </p>
      </div>
    </div>
  )
}

// ─── Step 3: Preview resumen (read-only) ──────────────────────────────────────

function PasoPreviewResumen({ resumenPreview }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold mb-1" style={{ color: '#1A1A1A' }}>Vista previa generada por IA</h3>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Revisa el resumen que la IA generará para esta asignatura. Si estás de acuerdo, acepta para continuar.
        </p>
      </div>

      {/* Read-only badge */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg"
        style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
      >
        <span style={{ fontSize: '13px' }}>👁</span>
        <p className="text-xs font-medium" style={{ color: '#B45309' }}>
          Solo lectura — no puedes editar este resumen. Acéptalo o vuelve atrás.
        </p>
      </div>

      {/* Nombre */}
      <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#9CA3AF' }}>Nombre</p>
        <p className="text-lg font-semibold" style={{ color: '#111827' }}>{resumenPreview.nombre}</p>
      </div>

      {/* Descripción */}
      <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#9CA3AF' }}>Descripción</p>
        <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{resumenPreview.descripcion}</p>
      </div>

      {/* Objetivos */}
      <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Objetivos de aprendizaje</p>
        <div className="space-y-1.5">
          {resumenPreview.objetivos.map((obj, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5 flex-shrink-0" style={{ color: '#CBD5E1' }}>{i + 1}.</span>
              <p className="text-sm" style={{ color: '#374151' }}>{obj}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Etiquetas sugeridas</p>
        <div className="flex flex-wrap gap-1.5">
          {resumenPreview.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full text-xs font-medium"
              style={{ background: '#E0F4FB', color: '#0098CD', border: '1px solid #B3E0F2', padding: '3px 10px' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main screen ────────────────────────────────────────────────────────────────

const PASO_LABELS = {
  1: 'Contexto',
  2: 'Temática',
  3: 'Vista previa',
}
const TOTAL_PASOS = 3

export default function PantallaCrearAsignatura({ titulaciones, onCrearAsignatura, onCancel }) {
  const [paso, setPaso] = useState(1)
  const [generando, setGenerando] = useState(false)
  const [generandoPreview, setGenerandoPreview] = useState(false)
  const [resumenPreview, setResumenPreview] = useState(null)
  const [datos, setDatos] = useState({ _titulaciones: titulaciones })

  const updateDatos = (key, val) => setDatos(prev => ({ ...prev, [key]: val }))

  // Step 2 → 3: generate preview resumen then show it
  const handleAvanzarA3 = () => {
    setGenerandoPreview(true)
    setTimeout(() => {
      setResumenPreview(generarResumen(datos))
      setGenerandoPreview(false)
      setPaso(3)
    }, 1200)
  }

  // Step 3 accept: generate index + navigate to canvas
  const handleAceptar = () => {
    setGenerando(true)
    setTimeout(() => {
      const indice = generarIndice(datos)
      const resumen = resumenPreview
      const nuevaAsig = {
        id: `asig-${Date.now()}`,
        nombre: datos.nombre?.trim() || resumen.nombre,
        descripcion: resumen.descripcion,
        objetivos: resumen.objetivos,
        tags: resumen.tags,
        etapaActual: 'Índice',
        estado: 'borrador',
        pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
        ultimaActividad: 'Ahora mismo',
        activa: true,
      }
      onCrearAsignatura(
        datos.titulacionId || titulaciones[0]?.id,
        nuevaAsig,
        { indice, resumen }
      )
    }, 1000)
  }

  const puedeAvanzar = () => {
    if (paso === 1) return !!datos.titulacionId && !!datos.nivel && !!datos.nombre?.trim()
    if (paso === 2) return !!datos.areaConocimiento && !!datos.tipoAsignatura && !!datos.enfoque
    return true
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8F9FA', fontFamily: "'Inter', 'Arial', sans-serif" }}>

      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', height: '56px' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all"
            style={{ color: '#6B7280' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <ArrowLeft size={14} />
            Cancelar
          </button>
          <span style={{ color: '#E5E7EB' }}>·</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#EEF2FF' }}>
              <Sparkles size={12} style={{ color: '#6366F1' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Crear nueva asignatura</p>
          </div>
        </div>
        <p className="text-xs font-medium" style={{ color: '#9CA3AF' }}>
          Paso {paso} de {TOTAL_PASOS} · {PASO_LABELS[paso]}
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
        <div className="h-1" style={{ background: '#E5E7EB' }}>
          <div
            className="h-full rounded-r-full transition-all"
            style={{ width: `${(paso / TOTAL_PASOS) * 100}%`, background: '#0098CD', transition: 'width 400ms ease' }}
          />
        </div>
        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 py-3">
          {[1, 2, 3].map((n, idx) => {
            const done = n < paso
            const current = n === paso
            return (
              <div key={n} className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0 transition-all"
                    style={{
                      width: '22px', height: '22px',
                      background: done ? '#10B981' : current ? '#0098CD' : '#F1F5F9',
                    }}
                  >
                    {done
                      ? <Check size={11} style={{ color: '#FFFFFF' }} />
                      : <span style={{ fontSize: '10px', fontWeight: '700', color: current ? '#FFFFFF' : '#CBD5E1' }}>{n}</span>
                    }
                  </div>
                  <span
                    className="text-xs font-medium hidden sm:block"
                    style={{ color: done ? '#10B981' : current ? '#0098CD' : '#CBD5E1' }}
                  >
                    {PASO_LABELS[n]}
                  </span>
                </div>
                {idx < 2 && (
                  <div className="h-px" style={{ width: '28px', background: done ? '#10B981' : '#E5E7EB', transition: 'background 400ms ease' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto py-8 px-4">
        <div
          className="mx-auto"
          style={{
            maxWidth: '640px',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}
        >
          <div className="px-8 py-8">
            {(generando || generandoPreview) ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse"
                  style={{ background: '#EEF2FF' }}
                >
                  <Sparkles size={24} style={{ color: '#6366F1' }} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>
                    {generandoPreview ? 'Generando vista previa…' : 'Generando índice de temas…'}
                  </p>
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
            ) : (
              <>
                {paso === 1 && <PasoContextoAcademico datos={datos} onChange={updateDatos} />}
                {paso === 2 && <PasoDefinicionTematica datos={datos} onChange={updateDatos} />}
                {paso === 3 && resumenPreview && <PasoPreviewResumen resumenPreview={resumenPreview} />}
              </>
            )}
          </div>

          {/* Footer */}
          {!generando && !generandoPreview && (
            <div
              className="flex items-center justify-between px-8 py-5"
              style={{ borderTop: '1px solid #F1F5F9', background: '#FAFAFA', borderRadius: '0 0 16px 16px' }}
            >
              <button
                onClick={paso === 1 ? onCancel : () => setPaso(paso - 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ color: '#6B7280', background: '#F1F5F9' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
              >
                {paso === 1 ? 'Cancelar' : 'Volver'}
              </button>

              {paso === 1 && (
                <button
                  onClick={() => setPaso(2)}
                  disabled={!puedeAvanzar()}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: puedeAvanzar() ? '#0098CD' : '#E5E7EB',
                    color: puedeAvanzar() ? '#FFFFFF' : '#9CA3AF',
                    cursor: puedeAvanzar() ? 'pointer' : 'default',
                  }}
                >
                  Siguiente
                  <ChevronRight size={14} />
                </button>
              )}
              {paso === 2 && (
                <button
                  onClick={handleAvanzarA3}
                  disabled={!puedeAvanzar()}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: puedeAvanzar() ? '#6366F1' : '#E5E7EB',
                    color: puedeAvanzar() ? '#FFFFFF' : '#9CA3AF',
                    cursor: puedeAvanzar() ? 'pointer' : 'default',
                  }}
                >
                  <Sparkles size={13} />
                  Ver vista previa
                </button>
              )}
              {paso === 3 && (
                <button
                  onClick={handleAceptar}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all"
                  style={{ background: '#10B981' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#059669'}
                  onMouseLeave={e => e.currentTarget.style.background = '#10B981'}
                >
                  <Check size={14} />
                  Aceptar y generar índice
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

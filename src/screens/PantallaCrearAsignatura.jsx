import { useState } from 'react'
import { ChevronRight, ChevronLeft, Sparkles, Plus, RefreshCw, Check, BookOpen, X, ArrowLeft, Search, Save } from 'lucide-react'
import { preguntasCreacion, tagsSugerenciasPorArea, etiquetasDisponibles } from '../mockData'

// ─── Resumen generation helpers ───────────────────────────────────────────────

const OBJETIVO_POOLS = {
  'Inteligencia Artificial': [
    'Comprender los fundamentos teóricos y prácticos del área',
    'Implementar algoritmos y modelos aplicados a problemas reales',
    'Evaluar el rendimiento y seleccionar la solución más adecuada',
    'Desarrollar pensamiento crítico sobre limitaciones y sesgos',
    'Aplicar herramientas y frameworks del ecosistema actual',
  ],
  'Ciencia de Datos': [
    'Adquirir, limpiar y preparar conjuntos de datos para análisis',
    'Aplicar técnicas estadísticas y visualización para extraer insights',
    'Construir pipelines de datos escalables y reproducibles',
    'Comunicar resultados de forma clara a audiencias técnicas y no técnicas',
  ],
  default: [
    'Comprender los conceptos fundamentales de la disciplina',
    'Aplicar los conocimientos adquiridos en casos prácticos reales',
    'Desarrollar habilidades técnicas relevantes para el mercado profesional',
    'Evaluar críticamente soluciones y tomar decisiones fundamentadas',
  ],
}

const DESCRIPCION_TEMPLATES = [
  (nombre, nivel, area) =>
    `${nombre} es una asignatura de nivel ${nivel.toLowerCase()} que introduce a los estudiantes en los fundamentos de ${area}. A través de un enfoque práctico y riguroso, los participantes adquirirán las herramientas conceptuales y técnicas necesarias para afrontar problemas reales del campo.`,
  (nombre, nivel, area) =>
    `Esta asignatura de nivel ${nivel.toLowerCase()} proporciona una visión completa y aplicada de ${area}. Los estudiantes explorarán tanto los fundamentos teóricos como las mejores prácticas del sector, con énfasis en la resolución de problemas auténticos y el desarrollo de competencias profesionales.`,
  (nombre, nivel, area) =>
    `${nombre} ofrece una formación integral en ${area} orientada a estudiantes de nivel ${nivel.toLowerCase()}. El programa combina bases conceptuales sólidas con ejercicios prácticos, estudios de caso y proyectos aplicados que preparan al estudiante para entornos profesionales exigentes.`,
]

function generarResumen(respuestas, seed = 0) {
  const nombre = respuestas.q1 || 'Nueva Asignatura'
  const area = respuestas.q2 || 'Inteligencia Artificial'
  const nivel = respuestas.q3 || 'Intermedio'

  const templateIdx = seed % DESCRIPCION_TEMPLATES.length
  const descripcion = DESCRIPCION_TEMPLATES[templateIdx](nombre, nivel, area)

  const objetivosPool = OBJETIVO_POOLS[area] || OBJETIVO_POOLS.default
  const shuffled = [...objetivosPool].sort(() => (seed % 2 === 0 ? 0.5 : -0.5) - 0.3)
  const objetivos = shuffled.slice(0, Math.min(4, shuffled.length))

  const tagsBase = tagsSugerenciasPorArea[area] || []
  const tags = tagsBase.slice(0, 5)

  return { nombre, descripcion, objetivos, tags }
}

// ─── Step components ───────────────────────────────────────────────────────────

function PasoSelectorTitulacion({ titulaciones, titulacionSeleccionada, onSelect }) {
  const [busqueda, setBusqueda] = useState('')

  const titulacionesFiltradas = busqueda.trim()
    ? titulaciones.filter(t =>
        t.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.codigo.toLowerCase().includes(busqueda.toLowerCase())
      )
    : titulaciones

  return (
    <div>
      <h3 className="text-base font-semibold mb-1" style={{ color: '#1A1A1A' }}>
        Selecciona la titulación
      </h3>
      <p className="text-sm mb-5" style={{ color: '#6B7280' }}>
        La asignatura se creará dentro de esta titulación.
      </p>

      {/* Search input */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4"
        style={{ background: '#F8F9FA', border: '1.5px solid #E5E7EB' }}
        onFocus={() => {}}
      >
        <Search size={14} style={{ color: '#9CA3AF', flexShrink: 0 }} />
        <input
          type="text"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o código…"
          className="flex-1 text-sm outline-none bg-transparent"
          style={{ color: '#374151' }}
          onFocus={e => e.currentTarget.parentElement.style.borderColor = '#0098CD'}
          onBlur={e => e.currentTarget.parentElement.style.borderColor = '#E5E7EB'}
        />
        {busqueda && (
          <button onClick={() => setBusqueda('')} style={{ color: '#9CA3AF', lineHeight: 1 }}>
            <X size={13} />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {titulacionesFiltradas.length === 0 ? (
          <p className="text-sm text-center py-6" style={{ color: '#9CA3AF' }}>
            No se encontraron titulaciones para "{busqueda}"
          </p>
        ) : titulacionesFiltradas.map(t => {
          const selected = titulacionSeleccionada === t.id
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className="w-full text-left p-4 rounded-xl transition-all flex items-center gap-4"
              style={{
                background: selected ? '#E0F4FB' : '#F8F9FA',
                border: selected ? '2px solid #0098CD' : '2px solid transparent',
              }}
              onMouseEnter={e => { if (!selected) e.currentTarget.style.background = '#F1F5F9' }}
              onMouseLeave={e => { if (!selected) e.currentTarget.style.background = '#F8F9FA' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: selected ? '#0098CD' : '#E5E7EB' }}
              >
                <BookOpen size={16} style={{ color: selected ? '#FFFFFF' : '#9CA3AF' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-snug" style={{ color: selected ? '#0098CD' : '#1A1A1A' }}>
                  {t.nombre}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
                  {t.codigo} · {t.asignaturas_count} asignaturas
                </p>
              </div>
              {selected && <Check size={16} style={{ color: '#0098CD' }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}


function CampoPreguntas({ pregunta, valor, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1" style={{ color: '#374151' }}>
        {pregunta.pregunta}
      </label>
      {pregunta.descripcion && (
        <p className="text-xs mb-2.5" style={{ color: '#9CA3AF' }}>{pregunta.descripcion}</p>
      )}

      {pregunta.tipo === 'select' && (
        <select
          value={valor || ''}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
          style={{
            border: error ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
            background: '#FFFFFF',
            color: valor ? '#1A1A1A' : '#9CA3AF',
          }}
          onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = error ? '#EF4444' : '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        >
          <option value="">Selecciona una opción</option>
          {pregunta.opciones.map(op => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
      )}

      {pregunta.tipo === 'number' && (
        <input
          type="number"
          value={valor || ''}
          onChange={e => onChange(e.target.value)}
          min={pregunta.min}
          max={pregunta.max}
          placeholder={pregunta.placeholder}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
          style={{
            border: error ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
            background: '#FFFFFF',
            color: '#1A1A1A',
          }}
          onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = error ? '#EF4444' : '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        />
      )}

      {pregunta.tipo === 'text' && (
        <input
          type="text"
          value={valor || ''}
          onChange={e => onChange(e.target.value)}
          placeholder={pregunta.placeholder}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
          style={{
            border: error ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
            background: '#FFFFFF',
            color: '#1A1A1A',
          }}
          onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = error ? '#EF4444' : '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        />
      )}

      {pregunta.tipo === 'textarea' && (
        <textarea
          value={valor || ''}
          onChange={e => onChange(e.target.value)}
          placeholder={pregunta.placeholder}
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none transition-all"
          style={{
            border: error ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
            background: '#FFFFFF',
            color: '#1A1A1A',
            lineHeight: '1.6',
          }}
          onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = error ? '#EF4444' : '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        />
      )}

      {error && (
        <p className="text-xs mt-1.5" style={{ color: '#EF4444' }}>Este campo es obligatorio</p>
      )}
    </div>
  )
}

const GRUPOS_PREGUNTAS = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10],
]

function PasoFormulario({ grupoIdx, respuestas, onChange, errores }) {
  const indices = GRUPOS_PREGUNTAS[grupoIdx]
  const preguntas = indices.map(i => preguntasCreacion[i])

  return (
    <div>
      <h3 className="text-base font-semibold mb-1" style={{ color: '#1A1A1A' }}>
        Preguntas {indices[0] + 1}–{indices[indices.length - 1] + 1} de {preguntasCreacion.length}
      </h3>
      <p className="text-xs mb-6" style={{ color: '#9CA3AF' }}>
        La IA usará estas respuestas para generar el resumen inicial.
      </p>
      <div className="space-y-6">
        {preguntas.map(p => (
          <CampoPreguntas
            key={p.id}
            pregunta={p}
            valor={respuestas[p.id]}
            onChange={val => onChange(p.id, val)}
            error={errores[p.id]}
          />
        ))}
      </div>
    </div>
  )
}

function TagChip({ label, onRemove }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full"
      style={{
        background: '#E0F4FB',
        color: '#0098CD',
        border: '1px solid #B3E0F2',
        fontSize: '12px',
        fontWeight: '500',
        padding: '4px 10px',
      }}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 rounded-full flex items-center justify-center transition-colors"
          style={{ color: '#0098CD', lineHeight: 1 }}
          onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
          onMouseLeave={e => e.currentTarget.style.color = '#0098CD'}
        >
          <X size={10} />
        </button>
      )}
    </span>
  )
}

function PasoResumen({ resumen, setResumen, regenerando, onRegenerar }) {
  const [tagInput, setTagInput] = useState('')
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)

  const disponiblesNoUsados = etiquetasDisponibles.filter(e => !resumen.tags.includes(e))
  const filtrados = tagInput
    ? disponiblesNoUsados.filter(e => e.toLowerCase().includes(tagInput.toLowerCase()))
    : disponiblesNoUsados.slice(0, 12)

  const addTag = (tag) => {
    if (!resumen.tags.includes(tag)) {
      setResumen(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    }
    setTagInput('')
    setTagDropdownOpen(false)
  }

  const removeTag = (tag) => {
    setResumen(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  const updateObjetivo = (idx, val) => {
    setResumen(prev => {
      const objetivos = [...prev.objetivos]
      objetivos[idx] = val
      return { ...prev, objetivos }
    })
  }

  const removeObjetivo = (idx) => {
    setResumen(prev => ({
      ...prev,
      objetivos: prev.objetivos.filter((_, i) => i !== idx),
    }))
  }

  const addObjetivo = () => {
    setResumen(prev => ({ ...prev, objetivos: [...prev.objetivos, ''] }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Resumen generado</h3>
        <button
          onClick={onRegenerar}
          disabled={regenerando}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
          style={{
            background: regenerando ? '#F1F5F9' : '#F8F9FA',
            color: regenerando ? '#9CA3AF' : '#6B7280',
            border: '1px solid #E5E7EB',
          }}
        >
          <RefreshCw size={11} className={regenerando ? 'animate-spin' : ''} />
          {regenerando ? 'Regenerando…' : 'Regenerar'}
        </button>
      </div>
      <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>
        Revisa y edita el contenido antes de crear la asignatura.
      </p>

      {regenerando ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center animate-pulse"
            style={{ background: '#E0F4FB' }}
          >
            <Sparkles size={20} style={{ color: '#0098CD' }} />
          </div>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>La IA está generando un nuevo resumen…</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
              Nombre de la asignatura
            </label>
            <input
              type="text"
              value={resumen.nombre}
              onChange={e => setResumen(prev => ({ ...prev, nombre: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg text-sm font-semibold outline-none transition-all"
              style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#1A1A1A' }}
              onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
              onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
              Descripción
            </label>
            <textarea
              value={resumen.descripcion}
              onChange={e => setResumen(prev => ({ ...prev, descripcion: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none transition-all"
              style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#374151', lineHeight: '1.7' }}
              onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
              onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Objetivos */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
              Objetivos de aprendizaje
            </label>
            <div className="space-y-2">
              {resumen.objetivos.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-xs font-medium mt-2.5 flex-shrink-0 w-5 text-right" style={{ color: '#CBD5E1' }}>{idx + 1}.</span>
                  <input
                    type="text"
                    value={obj}
                    onChange={e => updateObjetivo(idx, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-all"
                    style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#374151' }}
                    onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
                  />
                  {resumen.objetivos.length > 1 && (
                    <button
                      onClick={() => removeObjetivo(idx)}
                      className="mt-2 p-1 rounded transition-colors flex-shrink-0"
                      style={{ color: '#CBD5E1' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                      onMouseLeave={e => e.currentTarget.style.color = '#CBD5E1'}
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addObjetivo}
                className="flex items-center gap-1.5 text-xs font-medium transition-colors mt-1"
                style={{ color: '#CBD5E1', paddingLeft: '28px' }}
                onMouseEnter={e => e.currentTarget.style.color = '#0098CD'}
                onMouseLeave={e => e.currentTarget.style.color = '#CBD5E1'}
              >
                <Plus size={12} />
                Agregar objetivo
              </button>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
              Etiquetas
            </label>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {resumen.tags.map(tag => (
                <TagChip key={tag} label={tag} onRemove={() => removeTag(tag)} />
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                value={tagInput}
                onChange={e => { setTagInput(e.target.value); setTagDropdownOpen(true) }}
                onFocus={() => setTagDropdownOpen(true)}
                onBlur={() => setTimeout(() => setTagDropdownOpen(false), 150)}
                placeholder="Buscar o añadir etiqueta…"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all"
                style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#374151' }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && tagInput.trim()) addTag(tagInput.trim())
                }}
              />
              {tagDropdownOpen && filtrados.length > 0 && (
                <div
                  className="absolute z-50 top-full mt-1 w-full rounded-xl overflow-hidden shadow-lg"
                  style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                >
                  <div className="flex flex-wrap gap-1.5 p-2.5">
                    {filtrados.map(tag => (
                      <button
                        key={tag}
                        onMouseDown={() => addTag(tag)}
                        className="text-xs px-2.5 py-1 rounded-full transition-colors"
                        style={{ background: '#F8F9FA', color: '#6B7280', border: '1px solid #E5E7EB' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#E0F4FB'; e.currentTarget.style.color = '#0098CD' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#F8F9FA'; e.currentTarget.style.color = '#6B7280' }}
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main screen ────────────────────────────────────────────────────────────────

const TOTAL_PASOS = 5
const PASO_LABELS = ['', 'Titulación', 'Información básica', 'Contexto académico', 'Evaluación y detalles', 'Revisión del resumen']

export default function PantallaCrearAsignatura({ titulaciones, onCrearAsignatura, onCancel }) {
  const [paso, setPaso] = useState(1)
  const [titulacionSeleccionada, setTitulacionSeleccionada] = useState(titulaciones[0]?.id || '')
  const [respuestas, setRespuestas] = useState({})
  const [errores, setErrores] = useState({})
  const [resumen, setResumen] = useState(null)
  const [regenerando, setRegenerando] = useState(false)
  const [regenerarSeed, setRegenerarSeed] = useState(0)
  const [borradorGuardado, setBorradorGuardado] = useState(false)

  const actualizarRespuesta = (id, valor) => {
    setRespuestas(prev => ({ ...prev, [id]: valor }))
    if (errores[id]) setErrores(prev => ({ ...prev, [id]: false }))
  }

  const validarPasoFormulario = (grupoIdx) => {
    const indices = GRUPOS_PREGUNTAS[grupoIdx]
    const nuevosErrores = {}
    let valido = true
    indices.forEach(i => {
      const p = preguntasCreacion[i]
      if (!respuestas[p.id] || String(respuestas[p.id]).trim() === '') {
        nuevosErrores[p.id] = true
        valido = false
      }
    })
    setErrores(prev => ({ ...prev, ...nuevosErrores }))
    return valido
  }

  const avanzar = () => {
    if (paso === 1) {
      if (!titulacionSeleccionada) return
      setPaso(2)
      return
    }
    if (paso >= 2 && paso <= 4) {
      const grupoIdx = paso - 2
      if (!validarPasoFormulario(grupoIdx)) return
      if (paso === 4) {
        const generado = generarResumen(respuestas, regenerarSeed)
        setResumen(generado)
        setPaso(5)
      } else {
        setPaso(paso + 1)
      }
      return
    }
  }

  const retroceder = () => {
    if (paso > 1) setPaso(paso - 1)
  }

  const handleRegenerar = () => {
    setRegenerando(true)
    const newSeed = regenerarSeed + 1
    setRegenerarSeed(newSeed)
    setTimeout(() => {
      setResumen(generarResumen(respuestas, newSeed))
      setRegenerando(false)
    }, 1200)
  }

  const handleCrear = () => {
    if (!resumen || !resumen.nombre.trim() || !resumen.descripcion.trim() || resumen.objetivos.length === 0) return
    const nuevaAsig = {
      id: `asig-${Date.now()}`,
      nombre: resumen.nombre.trim(),
      descripcion: resumen.descripcion.trim(),
      objetivos: resumen.objetivos.filter(o => o.trim()),
      tags: resumen.tags,
      etapaActual: 'Resumen',
      estado: 'borrador',
      pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
      ultimaActividad: 'Ahora mismo',
      activa: true,
      preguntas: respuestas,
    }
    onCrearAsignatura(titulacionSeleccionada, nuevaAsig)
  }

  const handleGuardarBorrador = () => {
    setBorradorGuardado(true)
    setTimeout(() => setBorradorGuardado(false), 2500)
  }

  const puedeAvanzar = paso === 1 ? !!titulacionSeleccionada : true
  const esUltimoPaso = paso === TOTAL_PASOS

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
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: '#E0F4FB' }}
            >
              <Sparkles size={12} style={{ color: '#0098CD' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Crear nueva asignatura</p>
          </div>
        </div>

        {/* Step indicator in topbar */}
        <p className="text-xs font-medium" style={{ color: '#9CA3AF' }}>
          Paso {paso} de {TOTAL_PASOS} · {PASO_LABELS[paso]}
        </p>
      </div>

      {/* Progress bar — full width */}
      <div className="flex-shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
        <div className="h-1 transition-all" style={{ background: '#E5E7EB' }}>
          <div
            className="h-full rounded-r-full transition-all"
            style={{ width: `${(paso / TOTAL_PASOS) * 100}%`, background: '#0098CD' }}
          />
        </div>
        {/* Step dots */}
        <div className="flex items-center justify-center gap-3 py-4">
          {Array.from({ length: TOTAL_PASOS }, (_, i) => i + 1).map(n => (
            <div key={n} className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0 transition-all"
                  style={{
                    width: '24px',
                    height: '24px',
                    background: n < paso ? '#10B981' : n === paso ? '#0098CD' : '#F1F5F9',
                  }}
                >
                  {n < paso
                    ? <Check size={12} style={{ color: '#FFFFFF' }} />
                    : <span style={{ fontSize: '11px', fontWeight: '600', color: n === paso ? '#FFFFFF' : '#CBD5E1' }}>{n}</span>
                  }
                </div>
                <span
                  className="text-xs font-medium hidden sm:block"
                  style={{ color: n === paso ? '#0098CD' : n < paso ? '#10B981' : '#CBD5E1' }}
                >
                  {PASO_LABELS[n]}
                </span>
              </div>
              {n < TOTAL_PASOS && (
                <div
                  className="h-px transition-all"
                  style={{ width: '40px', background: n < paso ? '#10B981' : '#E5E7EB' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content — centered card */}
      <div className="flex-1 overflow-y-auto py-10 px-4">
        <div
          className="mx-auto animate-fade-in"
          style={{
            maxWidth: '640px',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}
        >
          <div className="px-8 py-8">
            {paso === 1 && (
              <PasoSelectorTitulacion
                titulaciones={titulaciones}
                titulacionSeleccionada={titulacionSeleccionada}
                onSelect={setTitulacionSeleccionada}
              />
            )}
            {paso >= 2 && paso <= 4 && (
              <PasoFormulario
                grupoIdx={paso - 2}
                respuestas={respuestas}
                onChange={actualizarRespuesta}
                errores={errores}
              />
            )}
            {paso === 5 && resumen && (
              <PasoResumen
                resumen={resumen}
                setResumen={setResumen}
                regenerando={regenerando}
                onRegenerar={handleRegenerar}
              />
            )}
          </div>

          {/* Footer inside card */}
          <div
            className="flex items-center justify-between px-8 py-5"
            style={{ borderTop: '1px solid #F1F5F9', background: '#FAFAFA', borderRadius: '0 0 16px 16px' }}
          >
            <button
              onClick={paso === 1 ? onCancel : retroceder}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ color: '#6B7280', background: '#F1F5F9' }}
              onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
              onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
            >
              <ChevronLeft size={14} />
              {paso === 1 ? 'Cancelar' : 'Atrás'}
            </button>

            <div className="flex items-center gap-2">
              {(
                <button
                  onClick={handleGuardarBorrador}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: borradorGuardado ? '#F0FDF4' : '#F8F9FA',
                    color: borradorGuardado ? '#10B981' : '#6B7280',
                    border: borradorGuardado ? '1px solid #A7F3D0' : '1px solid #E5E7EB',
                  }}
                  onMouseEnter={e => { if (!borradorGuardado) { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#D1D5DB' } }}
                  onMouseLeave={e => { if (!borradorGuardado) { e.currentTarget.style.background = '#F8F9FA'; e.currentTarget.style.borderColor = '#E5E7EB' } }}
                >
                  {borradorGuardado ? <Check size={13} /> : <Save size={13} />}
                  {borradorGuardado ? 'Borrador guardado' : 'Guardar borrador'}
                </button>
              )}

              {esUltimoPaso ? (
                <button
                  onClick={handleCrear}
                  disabled={regenerando}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all"
                  style={{ background: regenerando ? '#9CA3AF' : '#0098CD' }}
                  onMouseEnter={e => { if (!regenerando) e.currentTarget.style.background = '#00729A' }}
                  onMouseLeave={e => { if (!regenerando) e.currentTarget.style.background = '#0098CD' }}
                >
                  <Sparkles size={13} />
                  Crear asignatura
                </button>
              ) : (
                <button
                  onClick={avanzar}
                  disabled={!puedeAvanzar}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: puedeAvanzar ? '#0098CD' : '#E5E7EB',
                    color: puedeAvanzar ? '#FFFFFF' : '#9CA3AF',
                  }}
                  onMouseEnter={e => { if (puedeAvanzar) e.currentTarget.style.background = '#00729A' }}
                  onMouseLeave={e => { if (puedeAvanzar) e.currentTarget.style.background = puedeAvanzar ? '#0098CD' : '#E5E7EB' }}
                >
                  {paso === 4 ? 'Generar resumen' : 'Siguiente'}
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

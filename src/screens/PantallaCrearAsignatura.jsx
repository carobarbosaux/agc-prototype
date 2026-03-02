import { useState } from 'react'
import { Sparkles, Check, BookOpen, X, ArrowLeft, Search, ChevronRight } from 'lucide-react'
import { tagsSugerenciasPorArea, etiquetasDisponibles } from '../mockData'

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

const TEMA1_POR_AREA = {
  'Inteligencia Artificial': {
    introduccion: 'Este primer tema establece los fundamentos conceptuales de la Inteligencia Artificial, situándola en el contexto histórico y tecnológico actual. Se abordan los distintos paradigmas de IA y su relación con otras disciplinas como la estadística, la computación y las ciencias cognitivas.',
    objetivos: [
      'Comprender el origen y la evolución histórica de la IA',
      'Distinguir entre los principales paradigmas: simbólico, conexionista y estadístico',
      'Identificar aplicaciones reales de IA en distintos sectores',
      'Situar la IA dentro del ecosistema de la ciencia de datos y el ML',
    ],
    estructura: [
      'Bloque 1: Historia y hitos de la IA (1950–2024)',
      'Bloque 2: Taxonomía: IA estrecha vs. IA general',
      'Bloque 3: Paradigmas y enfoques principales',
      'Bloque 4: Aplicaciones actuales por sector',
      'Bloque 5: Lectura complementaria y recursos',
    ],
    extension: '6–8 horas de estudio estimadas',
  },
  default: {
    introduccion: 'El primer tema proporciona una visión panorámica de la disciplina, estableciendo los conceptos fundamentales y el marco conceptual que guiará el resto del programa. Los estudiantes adquieren el vocabulario técnico necesario y comprenden el alcance y relevancia de la materia.',
    objetivos: [
      'Comprender el ámbito y alcance de la disciplina',
      'Dominar la terminología y conceptos clave',
      'Identificar los principales ámbitos de aplicación',
      'Situar la asignatura en el contexto académico y profesional',
    ],
    estructura: [
      'Bloque 1: Introducción y contexto histórico',
      'Bloque 2: Conceptos y terminología fundamental',
      'Bloque 3: Ámbitos de aplicación actuales',
      'Bloque 4: Recursos y metodología de estudio',
    ],
    extension: '4–6 horas de estudio estimadas',
  },
}

const DESCRIPCION_TEMPLATES = [
  (nombre, nivel, area) =>
    `${nombre} es una asignatura de nivel ${nivel.toLowerCase()} que introduce a los estudiantes en los fundamentos de ${area}. A través de un enfoque práctico y riguroso, los participantes adquirirán las herramientas conceptuales y técnicas necesarias para afrontar problemas reales del campo.`,
  (nombre, nivel, area) =>
    `Esta asignatura de nivel ${nivel.toLowerCase()} proporciona una visión completa y aplicada de ${area}. Los estudiantes explorarán tanto los fundamentos teóricos como las mejores prácticas del sector, con énfasis en la resolución de problemas auténticos.`,
]

const OBJETIVO_POOLS = {
  'Inteligencia Artificial': [
    'Comprender los fundamentos teóricos y prácticos del área',
    'Implementar algoritmos y modelos aplicados a problemas reales',
    'Evaluar el rendimiento y seleccionar la solución más adecuada',
    'Desarrollar pensamiento crítico sobre limitaciones y sesgos',
    'Aplicar herramientas y frameworks del ecosistema actual',
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
  return { nombre, descripcion, objetivos }
}

function generarTema1(datos) {
  const area = datos.areaConocimiento || 'default'
  return TEMA1_POR_AREA[area] || TEMA1_POR_AREA.default
}

// ─── Step components ───────────────────────────────────────────────────────────

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
    </div>
  )
}

function PasoGenerandoIndice({ indice }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={16} style={{ color: '#6366F1' }} />
        <h3 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Índice generado por IA</h3>
      </div>
      <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
        La IA ha generado un índice provisional basado en el contexto que has proporcionado. Puedes ajustarlo más adelante.
      </p>

      <div
        className="rounded-xl p-4"
        style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}
      >
        <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: '#EEF2FF' }}>
            <Sparkles size={11} style={{ color: '#6366F1' }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: '#6366F1' }}>Índice provisional · Solo lectura</span>
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

      <div
        className="mt-4 flex items-start gap-2.5 px-3 py-2.5 rounded-lg"
        style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}
      >
        <Sparkles size={12} style={{ color: '#6366F1', flexShrink: 0, marginTop: '2px' }} />
        <p className="text-xs" style={{ color: '#4338CA', lineHeight: '1.5' }}>
          El índice se ha generado en base al área temática y los contenidos indicados. Podrás reorganizar y editar los temas desde el Canvas una vez creada la asignatura.
        </p>
      </div>
    </div>
  )
}

function PasoResumenPreliminar({ resumen, setResumen }) {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={16} style={{ color: '#6366F1' }} />
          <h3 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Resumen preliminar</h3>
        </div>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          La IA ha generado el nombre, descripción y objetivos de la asignatura. Puedes editarlos antes de continuar.
        </p>
      </div>

      {/* Nombre */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Nombre de la asignatura
        </label>
        <input
          type="text"
          value={resumen.nombre}
          onChange={e => setResumen(prev => ({ ...prev, nombre: e.target.value }))}
          className="w-full px-3 py-2.5 rounded-lg text-sm font-semibold outline-none"
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
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
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
                onChange={e => {
                  const objs = [...resumen.objetivos]
                  objs[idx] = e.target.value
                  setResumen(prev => ({ ...prev, objetivos: objs }))
                }}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#374151' }}
                onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PasoTema1({ tema1 }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={16} style={{ color: '#6366F1' }} />
        <h3 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Previsualización Tema 1</h3>
      </div>
      <p className="text-sm mb-5" style={{ color: '#6B7280' }}>
        La IA ha generado la estructura del primer tema. Podrás editarlo en detalle desde el Canvas.
      </p>

      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid #E5E7EB' }}
      >
        {/* Header */}
        <div className="px-4 py-3 flex items-center gap-2" style={{ background: '#F8F9FA', borderBottom: '1px solid #E5E7EB' }}>
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: '#EEF2FF' }}>
            <Sparkles size={11} style={{ color: '#6366F1' }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: '#6366F1' }}>Tema 1 · Solo lectura</span>
          <span className="ml-auto text-xs" style={{ color: '#CBD5E1' }}>{tema1.extension}</span>
        </div>

        <div className="px-4 py-4 space-y-4" style={{ background: '#FFFFFF' }}>
          {/* Introducción */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Introducción</p>
            <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{tema1.introduccion}</p>
          </div>

          {/* Objetivos */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Objetivos del tema</p>
            <ul className="space-y-1">
              {tema1.objetivos.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#374151' }}>
                  <span style={{ color: '#0098CD', flexShrink: 0, marginTop: '1px' }}>·</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Estructura */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Estructura</p>
            <div className="space-y-1.5">
              {tema1.estructura.map((bloque, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#CBD5E1' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>{bloque}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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

function PasoConfirmacionTags({ resumen, indice, datos, tags, setTags }) {
  const [tagInput, setTagInput] = useState('')
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)

  const area = datos.areaConocimiento || ''
  const sugeridos = tagsSugerenciasPorArea[area] || []
  const disponibles = etiquetasDisponibles.filter(e => !tags.includes(e))
  const filtrados = tagInput
    ? disponibles.filter(e => e.toLowerCase().includes(tagInput.toLowerCase()))
    : sugeridos.filter(e => !tags.includes(e)).slice(0, 10)

  const addTag = (tag) => {
    if (!tags.includes(tag)) setTags(prev => [...prev, tag])
    setTagInput('')
    setTagDropdownOpen(false)
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold mb-1" style={{ color: '#1A1A1A' }}>Confirmación y etiquetas</h3>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Revisa el resumen de lo generado y ajusta las etiquetas antes de crear la asignatura.
        </p>
      </div>

      {/* Resumen de lo generado */}
      <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}>
        <div className="flex items-center gap-2 pb-2" style={{ borderBottom: '1px solid #E5E7EB' }}>
          <Check size={14} style={{ color: '#10B981' }} />
          <span className="text-xs font-semibold" style={{ color: '#10B981' }}>Generado por IA</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: '#9CA3AF' }}>Nombre</p>
            <p className="font-semibold" style={{ color: '#1A1A1A' }}>{resumen.nombre}</p>
          </div>
          <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: '#9CA3AF' }}>Área</p>
            <p style={{ color: '#374151' }}>{datos.areaConocimiento || '—'}</p>
          </div>
          <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: '#9CA3AF' }}>Nivel</p>
            <p style={{ color: '#374151' }}>{datos.nivel || '—'}</p>
          </div>
          <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: '#9CA3AF' }}>Temas generados</p>
            <p style={{ color: '#374151' }}>{indice.length} temas</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: '#9CA3AF' }}>Objetivos</p>
          <ul className="space-y-0.5">
            {resumen.objetivos.map((o, i) => (
              <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: '#6B7280' }}>
                <span style={{ color: '#10B981', flexShrink: 0 }}>✓</span> {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Etiquetas
        </label>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map(tag => (
            <TagChip key={tag} label={tag} onRemove={() => setTags(prev => prev.filter(t => t !== tag))} />
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
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#374151' }}
            onKeyDown={e => { if (e.key === 'Enter' && tagInput.trim()) addTag(tagInput.trim()) }}
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
  )
}

// ─── Loading overlay ───────────────────────────────────────────────────────────

function GenerandoOverlay({ mensaje }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse"
        style={{ background: '#EEF2FF' }}
      >
        <Sparkles size={24} style={{ color: '#6366F1' }} />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>{mensaje}</p>
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

// ─── Main screen ────────────────────────────────────────────────────────────────

const TOTAL_PASOS = 7
const PASO_LABELS = {
  1: 'Contexto',
  2: 'Temática',
  3: 'Índice IA',
  4: 'Resumen IA',
  5: 'Tema 1 IA',
  6: 'Confirmación',
  7: 'Crear',
}

export default function PantallaCrearAsignatura({ titulaciones, onCrearAsignatura, onCancel }) {
  const [paso, setPaso] = useState(1)
  const [generando, setGenerando] = useState(false)
  const [datos, setDatos] = useState({ _titulaciones: titulaciones })
  const [indice, setIndice] = useState([])
  const [resumen, setResumen] = useState(null)
  const [tema1, setTema1] = useState(null)
  const [tags, setTags] = useState([])

  const updateDatos = (key, val) => setDatos(prev => ({ ...prev, [key]: val }))

  const avanzar = () => {
    if (paso === 2) {
      // Paso 2 → 3: generar índice
      setGenerando(true)
      setTimeout(() => {
        setIndice(generarIndice(datos))
        setGenerando(false)
        setPaso(3)
      }, 1400)
      return
    }
    if (paso === 3) {
      // Paso 3 → 4: generar resumen
      setGenerando(true)
      setTimeout(() => {
        const r = generarResumen(datos)
        setResumen(r)
        setGenerando(false)
        setPaso(4)
      }, 1200)
      return
    }
    if (paso === 4) {
      // Paso 4 → 5: generar Tema 1
      setGenerando(true)
      setTimeout(() => {
        setTema1(generarTema1(datos))
        // Pre-populate tags from area
        const area = datos.areaConocimiento || ''
        const sugeridos = tagsSugerenciasPorArea[area] || []
        setTags(sugeridos.slice(0, 5))
        setGenerando(false)
        setPaso(5)
      }, 1500)
      return
    }
    if (paso < TOTAL_PASOS - 1) {
      setPaso(paso + 1)
    }
  }

  const retroceder = () => {
    if (paso > 1) setPaso(paso - 1)
  }

  const handleCrear = () => {
    if (!resumen || !resumen.nombre.trim()) return
    const nuevaAsig = {
      id: `asig-${Date.now()}`,
      nombre: resumen.nombre.trim(),
      descripcion: resumen.descripcion.trim(),
      objetivos: resumen.objetivos.filter(o => o.trim()),
      tags,
      etapaActual: 'Resumen',
      estado: 'borrador',
      pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
      ultimaActividad: 'Ahora mismo',
      activa: true,
    }
    onCrearAsignatura(datos.titulacionId || titulaciones[0]?.id, nuevaAsig)
  }

  const puedeAvanzar = () => {
    if (paso === 1) return !!datos.titulacionId && !!datos.nivel && !!datos.nombre?.trim()
    if (paso === 2) return !!datos.areaConocimiento && !!datos.tipoAsignatura && !!datos.enfoque
    if (paso === 6) return tags.length > 0
    return true
  }

  // Progress dots: only show pasos 1–6 (7 is the create action)
  const PASOS_VISIBLES = [1, 2, 3, 4, 5, 6]

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
          {paso <= 6 ? `Paso ${paso} de 6 · ${PASO_LABELS[paso]}` : 'Creando asignatura…'}
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
        <div className="h-1" style={{ background: '#E5E7EB' }}>
          <div
            className="h-full rounded-r-full transition-all"
            style={{ width: `${(Math.min(paso, 6) / 6) * 100}%`, background: '#6366F1', transition: 'width 400ms ease' }}
          />
        </div>
        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 py-3">
          {PASOS_VISIBLES.map((n, idx) => {
            const done = n < paso
            const current = n === paso
            const isAI = n >= 3 && n <= 5
            return (
              <div key={n} className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0 transition-all"
                    style={{
                      width: '22px', height: '22px',
                      background: done ? '#10B981' : current ? (isAI ? '#6366F1' : '#0098CD') : '#F1F5F9',
                    }}
                  >
                    {done
                      ? <Check size={11} style={{ color: '#FFFFFF' }} />
                      : isAI && current
                        ? <Sparkles size={10} style={{ color: '#FFFFFF' }} />
                        : <span style={{ fontSize: '10px', fontWeight: '700', color: current ? '#FFFFFF' : '#CBD5E1' }}>{n}</span>
                    }
                  </div>
                  <span
                    className="text-xs font-medium hidden sm:block"
                    style={{ color: done ? '#10B981' : current ? (isAI ? '#6366F1' : '#0098CD') : '#CBD5E1' }}
                  >
                    {PASO_LABELS[n]}
                  </span>
                </div>
                {idx < PASOS_VISIBLES.length - 1 && (
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
            {generando ? (
              <GenerandoOverlay
                mensaje={
                  paso === 2 ? 'Generando índice de temas…' :
                  paso === 3 ? 'Generando resumen preliminar…' :
                  paso === 4 ? 'Generando contenido del primer tema…' :
                  'Procesando…'
                }
              />
            ) : (
              <>
                {paso === 1 && <PasoContextoAcademico datos={datos} onChange={updateDatos} />}
                {paso === 2 && <PasoDefinicionTematica datos={datos} onChange={updateDatos} />}
                {paso === 3 && <PasoGenerandoIndice indice={indice} />}
                {paso === 4 && resumen && <PasoResumenPreliminar resumen={resumen} setResumen={setResumen} />}
                {paso === 5 && tema1 && <PasoTema1 tema1={tema1} />}
                {paso === 6 && resumen && (
                  <PasoConfirmacionTags
                    resumen={resumen}
                    indice={indice}
                    datos={datos}
                    tags={tags}
                    setTags={setTags}
                  />
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {!generando && (
            <div
              className="flex items-center justify-between px-8 py-5"
              style={{ borderTop: '1px solid #F1F5F9', background: '#FAFAFA', borderRadius: '0 0 16px 16px' }}
            >
              <button
                onClick={paso === 1 ? onCancel : retroceder}
                disabled={paso >= 3 && paso <= 5}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: paso >= 3 && paso <= 5 ? '#D1D5DB' : '#6B7280',
                  background: '#F1F5F9',
                  cursor: paso >= 3 && paso <= 5 ? 'default' : 'pointer',
                }}
                onMouseEnter={e => { if (!(paso >= 3 && paso <= 5)) e.currentTarget.style.background = '#E5E7EB' }}
                onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
              >
                {paso === 1 ? 'Cancelar' : 'Atrás'}
              </button>

              {paso === 6 ? (
                <button
                  onClick={handleCrear}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all"
                  style={{ background: '#10B981' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#059669'}
                  onMouseLeave={e => e.currentTarget.style.background = '#10B981'}
                >
                  <Check size={14} />
                  Crear asignatura
                </button>
              ) : (
                <button
                  onClick={avanzar}
                  disabled={!puedeAvanzar()}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: puedeAvanzar() ? (paso >= 2 && paso <= 4 ? '#6366F1' : '#0098CD') : '#E5E7EB',
                    color: puedeAvanzar() ? '#FFFFFF' : '#9CA3AF',
                    cursor: puedeAvanzar() ? 'pointer' : 'default',
                  }}
                >
                  {paso === 2 ? (
                    <>
                      <Sparkles size={13} />
                      Generar índice
                    </>
                  ) : paso === 3 ? (
                    <>
                      <Sparkles size={13} />
                      Generar resumen
                    </>
                  ) : paso === 4 ? (
                    <>
                      <Sparkles size={13} />
                      Generar Tema 1
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ChevronRight size={14} />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import {
  Sparkles, Check, BookOpen, X, ArrowLeft, Search, ChevronRight, Send,
  GraduationCap, FileText, Upload, CheckSquare, Square, Info, Paperclip,
} from 'lucide-react'
import { tagsSugerenciasPorArea } from '../mockData'
import { ProdiMark } from './ProdiLogo'

// ─────────────────────────────────────────────────────────────────────────────
// SHARED: Confirmation modal
// ─────────────────────────────────────────────────────────────────────────────

function ModalConfirmVolver({ onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onClick={onCancel}
    >
      <div
        className="rounded-2xl px-8 py-7 flex flex-col gap-4"
        style={{ background: '#FFFFFF', boxShadow: '0 8px 40px rgba(0,0,0,0.14)', width: '400px', maxWidth: '90vw' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Icon + title */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FEF9C3' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>¿Quieres volver atrás?</p>
            <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
              Si vuelves, perderás el avance actual en este paso. Esta acción no se puede deshacer.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ background: '#F1F5F9', color: '#374151' }}
            onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
            onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
          >
            Seguir aquí
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: '#DC2626', color: '#FFFFFF' }}
            onMouseEnter={e => e.currentTarget.style.background = '#B91C1C'}
            onMouseLeave={e => e.currentTarget.style.background = '#DC2626'}
          >
            Sí, volver
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COORDINATOR FLOW (existing 3-step flow, unchanged)
// ─────────────────────────────────────────────────────────────────────────────

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

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Titulación
        </label>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3" style={{ background: '#F8F9FA', border: '1.5px solid #E5E7EB' }}>
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
              <button key={t.id} onClick={() => onChange('titulacionId', t.id)}
                className="w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all"
                style={{ background: sel ? '#E0F4FB' : '#F8F9FA', border: sel ? '2px solid #0098CD' : '2px solid transparent' }}
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

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Nivel de estudio</label>
        <select value={datos.nivel || ''} onChange={e => onChange('nivel', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
          style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: datos.nivel ? '#1A1A1A' : '#9CA3AF' }}
          onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        >
          <option value="">Seleccionar nivel…</option>
          {['Grado', 'Postgrado', 'Máster', 'Doctorado', 'Formación continua'].map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Público objetivo</label>
        <textarea value={datos.publicoObjetivo || ''} onChange={e => onChange('publicoObjetivo', e.target.value)}
          placeholder="Ej. Profesionales de TI con 2+ años de experiencia que quieren especializarse en IA aplicada…"
          rows={3} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
          style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#374151', lineHeight: '1.6' }}
          onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Número de créditos (ECTS)</label>
          <input type="number" value={datos.creditos || ''} onChange={e => onChange('creditos', e.target.value)}
            min={1} max={30} placeholder="6" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
            style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#1A1A1A' }}
            onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
            onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Nombre provisional</label>
          <input type="text" value={datos.nombre || ''} onChange={e => onChange('nombre', e.target.value)}
            placeholder="Ej. Fundamentos de ML" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
            style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#1A1A1A' }}
            onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
            onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Temas o contenidos a tratar</label>
        <textarea value={datos.temasTratar || ''} onChange={e => onChange('temasTratar', e.target.value)}
          placeholder="Ej. Regresión lineal, clasificación, árboles de decisión, redes neuronales, evaluación de modelos…"
          rows={3} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
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
        <p className="text-sm" style={{ color: '#6B7280' }}>La IA usará estas respuestas para generar el índice de temas automáticamente.</p>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Área de conocimiento</label>
        <div className="grid grid-cols-2 gap-2">
          {areas.map(area => {
            const sel = datos.areaConocimiento === area
            return (
              <button key={area} onClick={() => onChange('areaConocimiento', area)}
                className="text-left px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{ background: sel ? '#E0F4FB' : '#F8F9FA', border: sel ? '2px solid #0098CD' : '2px solid transparent', color: sel ? '#0098CD' : '#374151', fontWeight: sel ? '600' : '400' }}
              >
                {area}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Tipo de asignatura</label>
        <select value={datos.tipoAsignatura || ''} onChange={e => onChange('tipoAsignatura', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
          style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: datos.tipoAsignatura ? '#1A1A1A' : '#9CA3AF' }}
          onFocus={e => { e.target.style.borderColor = '#0098CD'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        >
          <option value="">Seleccionar tipo…</option>
          {['Cuantitativa', 'Cualitativa', 'Mixta'].map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Enfoque principal</label>
        <div className="grid grid-cols-3 gap-2">
          {['Teórico', 'Práctico', 'Mixto', 'Basado en casos', 'Por proyectos', 'Investigación'].map(enfoque => {
            const sel = datos.enfoque === enfoque
            return (
              <button key={enfoque} onClick={() => onChange('enfoque', enfoque)}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{ background: sel ? '#E0F4FB' : '#F8F9FA', border: sel ? '2px solid #0098CD' : '2px solid transparent', color: sel ? '#0098CD' : '#6B7280' }}
              >
                {enfoque}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg" style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
        <Sparkles size={12} style={{ color: '#6366F1', flexShrink: 0, marginTop: '2px' }} />
        <p className="text-xs" style={{ color: '#4338CA', lineHeight: '1.5' }}>
          Al hacer clic en <strong>Ver vista previa</strong>, la IA generará un resumen preliminar de la asignatura que podrás revisar y ajustar antes de continuar.
        </p>
      </div>
    </div>
  )
}

const RESPUESTAS_IA_RESUMEN = [
  () => ({ texto: 'He actualizado el resumen teniendo en cuenta tu indicación. Revisa los cambios y dime si quieres ajustar algo más.' }),
  () => ({ texto: 'Listo, he reformulado la descripción y ajustado los objetivos. ¿Quieres que modifique algún aspecto adicional?' }),
  () => ({ texto: 'He aplicado los cambios solicitados. El resumen ahora refleja mejor el enfoque que describes.' }),
]
let _iaRespIdx = 0
function mockIARespuesta() {
  const fn = RESPUESTAS_IA_RESUMEN[_iaRespIdx % RESPUESTAS_IA_RESUMEN.length]
  _iaRespIdx++
  return fn()
}

function mockRegenerarResumen(resumenActual) {
  const variantes = {
    descripcion: [
      `${resumenActual.descripcion} Se pone especial énfasis en la aplicación práctica y en el desarrollo de competencias transferibles al entorno profesional.`,
      resumenActual.descripcion.replace('introduce', 'profundiza en').replace('fundamentos', 'aspectos avanzados'),
      `Esta asignatura proporciona una visión completa e integrada de ${resumenActual.nombre.toLowerCase()}, combinando marcos teóricos sólidos con casos de uso reales del sector.`,
    ],
    objetivos: [
      [...resumenActual.objetivos, 'Comunicar resultados de manera clara y rigurosa a audiencias técnicas y no técnicas'],
      resumenActual.objetivos.map(o => o.replace('Comprender', 'Analizar y dominar').replace('Aplicar', 'Diseñar e implementar')),
      [...resumenActual.objetivos.slice(0, 3), 'Integrar los conocimientos adquiridos en proyectos multidisciplinares reales'],
    ],
  }
  const idx = _iaRespIdx % 3
  return { ...resumenActual, descripcion: variantes.descripcion[idx], objetivos: variantes.objetivos[idx] }
}

function PasoPreviewResumen({ resumenPreview, onResumenChange }) {
  const [chatMensajes, setChatMensajes] = useState([{
    id: 1, rol: 'ia',
    texto: 'He generado el resumen preliminar de la asignatura. Puedes pedirme que modifique la descripción, ajuste los objetivos, cambie el enfoque o cualquier otro aspecto antes de continuar.',
  }])
  const [inputChat, setInputChat] = useState('')
  const [cargandoIA, setCargandoIA] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chatMensajes])

  const enviarMensaje = () => {
    const texto = inputChat.trim()
    if (!texto || cargandoIA) return
    setChatMensajes(prev => [...prev, { id: Date.now(), rol: 'usuario', texto }])
    setInputChat('')
    setCargandoIA(true)
    setTimeout(() => {
      const nuevoResumen = mockRegenerarResumen(resumenPreview)
      const respIA = mockIARespuesta()
      onResumenChange(nuevoResumen)
      setChatMensajes(prev => [...prev, { id: Date.now() + 1, rol: 'ia', texto: respIA.texto }])
      setCargandoIA(false)
    }, 1400)
  }

  return (
    <div className="flex gap-0" style={{ minHeight: '520px' }}>
      <div className="flex-1 min-w-0 pr-6 overflow-y-auto space-y-5" style={{ borderRight: '1px solid #F1F5F9' }}>
        <div>
          <h3 className="text-base font-semibold mb-0.5" style={{ color: '#1A1A1A' }}>Resumen preliminar</h3>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>Generado por IA · Puedes ajustarlo con el asistente →</p>
        </div>
        <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#9CA3AF' }}>Asignatura</p>
          <p className="text-base font-semibold" style={{ color: '#111827' }}>{resumenPreview.nombre}</p>
        </div>
        <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#9CA3AF' }}>Descripción</p>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{resumenPreview.descripcion}</p>
        </div>
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
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Etiquetas sugeridas</p>
          <div className="flex flex-wrap gap-1.5">
            {resumenPreview.tags.map(tag => (
              <span key={tag} className="inline-flex items-center rounded-full text-xs font-medium"
                style={{ background: '#E0F4FB', color: '#0098CD', border: '1px solid #B3E0F2', padding: '3px 10px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col pl-6" style={{ width: '280px', flexShrink: 0 }}>
        <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <ProdiMark size={20} />
          <p className="text-xs font-semibold" style={{ color: '#1A1A1A' }}>Prodi</p>
          <p className="text-xs ml-auto" style={{ color: '#9CA3AF' }}>Ajusta el resumen</p>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 mb-3" style={{ maxHeight: '340px' }}>
          {chatMensajes.map(msg => (
            <div key={msg.id} className={`flex ${msg.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
              {msg.rol === 'ia' && (
                <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mr-1.5 mt-0.5" style={{ background: '#EEF2FF' }}>
                  <Sparkles size={9} style={{ color: '#6366F1' }} />
                </div>
              )}
              <div className="px-3 py-2 rounded-xl text-xs leading-relaxed"
                style={{ maxWidth: '200px', background: msg.rol === 'usuario' ? '#0098CD' : '#F8F9FA', color: msg.rol === 'usuario' ? '#FFFFFF' : '#374151', borderRadius: msg.rol === 'usuario' ? '12px 12px 4px 12px' : '4px 12px 12px 12px' }}>
                {msg.texto}
              </div>
            </div>
          ))}
          {cargandoIA && (
            <div className="flex justify-start">
              <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mr-1.5 mt-0.5" style={{ background: '#EEF2FF' }}>
                <Sparkles size={9} style={{ color: '#6366F1' }} />
              </div>
              <div className="px-3 py-2 rounded-xl" style={{ background: '#F8F9FA', borderRadius: '4px 12px 12px 12px' }}>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#6366F1', animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="flex items-end gap-2 px-3 py-2 rounded-xl" style={{ background: '#F8F9FA', border: '1.5px solid #E5E7EB' }}>
          <textarea value={inputChat} onChange={e => setInputChat(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarMensaje() } }}
            placeholder="Pide cambios al asistente…" rows={2} disabled={cargandoIA}
            className="flex-1 text-xs outline-none resize-none bg-transparent" style={{ color: '#374151', lineHeight: '1.5' }}
          />
          <button onClick={enviarMensaje} disabled={!inputChat.trim() || cargandoIA}
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{ background: inputChat.trim() && !cargandoIA ? '#6366F1' : '#E5E7EB', color: inputChat.trim() && !cargandoIA ? '#FFFFFF' : '#9CA3AF' }}>
            <Send size={12} />
          </button>
        </div>
        <div className="mt-2 space-y-1">
          {['Hazla más práctica', 'Añade más objetivos', 'Simplifica la descripción'].map(sugerencia => (
            <button key={sugerencia} onClick={() => setInputChat(sugerencia)} disabled={cargandoIA}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all"
              style={{ background: '#F1F5F9', color: '#6B7280' }}
              onMouseEnter={e => { if (!cargandoIA) e.currentTarget.style.background = '#E5E7EB' }}
              onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}>
              {sugerencia}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHOR FLOW — 4-step flow for Deep Learning y Redes Neuronales
// ─────────────────────────────────────────────────────────────────────────────

// Pre-filled academic metadata (Step 1) — fixed, read-only
const DEEP_LEARNING_METADATA = {
  nombre: 'Deep Learning y Redes Neuronales',
  titulacion: 'Máster en Inteligencia Artificial',
  tipoEstudio: 'Máster',
  areaConocimiento: 'Tecnología',
  creditos: '6 ECTS',
  coordinador: 'Carlos Mendoza',
  especialista: 'Antonio Abad',
  modelo: '4P',
}

// AI-generated summary for Deep Learning (Step 3) — from AUTHOR_WORKFLOW_MOCKDATA resumenAsignatura
const DEEP_LEARNING_SUMMARY_BASE = {
  nombre: 'Deep Learning y Redes Neuronales',
  descripcion: 'La asignatura Deep Learning y Redes Neuronales introduce al estudiante en los fundamentos y aplicaciones del aprendizaje profundo dentro del campo de la inteligencia artificial. A lo largo del curso se analizan los principios que sustentan el funcionamiento de las redes neuronales artificiales y su capacidad para aprender patrones complejos a partir de datos. El enfoque combina bases conceptuales con una aproximación aplicada orientada a comprender cómo estos modelos se utilizan para resolver problemas en ámbitos como la visión por computador, el procesamiento del lenguaje natural o el análisis de grandes volúmenes de información.\n\nAsimismo, se estudian los procesos de entrenamiento de redes neuronales, las diferentes arquitecturas utilizadas en el aprendizaje profundo y los principales retos asociados a su desarrollo, como la necesidad de datos, la capacidad computacional o la interpretabilidad de los modelos. De esta forma, el estudiante adquiere una visión general del deep learning como una de las tecnologías más relevantes dentro de la inteligencia artificial contemporánea.',
  temas: [
    'Introducción al Deep Learning',
    'Fundamentos de redes neuronales artificiales',
    'Entrenamiento de redes neuronales',
    'Redes neuronales profundas',
    'Redes neuronales convolucionales (CNN)',
    'Redes neuronales recurrentes (RNN)',
    'Modelos generativos y aprendizaje profundo',
    'Aplicaciones avanzadas del Deep Learning',
  ],
  temasConDescripcion: [
    { numero: 1, titulo: 'Introducción al Deep Learning', descripcion: 'En este tema se va a tratar el concepto de deep learning y su relación con la inteligencia artificial y el machine learning. Se analizará la evolución histórica de las redes neuronales artificiales y los factores tecnológicos que han impulsado el desarrollo reciente del aprendizaje profundo.' },
    { numero: 2, titulo: 'Fundamentos de redes neuronales artificiales', descripcion: 'En este tema se va a tratar la estructura y funcionamiento de las redes neuronales artificiales como base del deep learning. Se estudiarán los componentes principales de una red neuronal, como las neuronas artificiales, las funciones de activación y la organización en capas.' },
    { numero: 3, titulo: 'Entrenamiento de redes neuronales', descripcion: 'En este tema se va a tratar el proceso mediante el cual las redes neuronales aprenden a partir de datos. Se estudiarán conceptos como la función de pérdida, el algoritmo de retropropagación y los métodos de optimización utilizados para ajustar los parámetros del modelo.' },
    { numero: 4, titulo: 'Redes neuronales profundas', descripcion: 'En este tema se va a tratar el desarrollo de arquitecturas de redes neuronales profundas y su capacidad para aprender representaciones jerárquicas de los datos. Se estudiarán técnicas como la regularización, la inicialización de pesos o la normalización de capas.' },
    { numero: 5, titulo: 'Redes neuronales convolucionales (CNN)', descripcion: 'En este tema se va a tratar el funcionamiento de las redes neuronales convolucionales, una de las arquitecturas más utilizadas en tareas de visión por computador. Se estudiarán los principios de las capas convolucionales, los mecanismos de pooling y las estructuras de identificación de patrones visuales.' },
    { numero: 6, titulo: 'Redes neuronales recurrentes (RNN)', descripcion: 'En este tema se va a tratar el uso de redes neuronales recurrentes para el análisis de datos secuenciales. Se estudiará cómo estas redes permiten modelar dependencias temporales y se analizarán arquitecturas avanzadas como LSTM y GRU.' },
    { numero: 7, titulo: 'Modelos generativos y aprendizaje profundo', descripcion: 'En este tema se va a tratar el desarrollo de modelos generativos basados en deep learning. Se estudiarán arquitecturas como los autoencoders y las redes generativas adversariales (GAN), así como su capacidad para generar nuevos datos a partir de patrones aprendidos.' },
    { numero: 8, titulo: 'Aplicaciones avanzadas del Deep Learning', descripcion: 'En este tema se va a tratar el uso del deep learning en diferentes contextos de aplicación dentro de la inteligencia artificial, incluyendo visión artificial, procesamiento del lenguaje natural y sistemas inteligentes de toma de decisiones.' },
  ],
  tags: ['Deep Learning', 'Redes Neuronales', 'CNN', 'RNN', 'Transformers', 'IA Generativa'],
}

// Mocked regenerated summaries based on author instructions
const DL_SUMMARY_VARIANTS = [
  {
    descripcion: 'La asignatura Deep Learning y Redes Neuronales, con un enfoque eminentemente práctico, pone especial énfasis en la implementación directa con herramientas del sector y en el desarrollo de competencias aplicables en entornos profesionales de IA. Se trabajan arquitecturas modernas como CNN, RNN y Transformers con una orientación hacia proyectos reales.',
  },
  {
    descripcion: 'Deep Learning y Redes Neuronales combina una base teórica sólida con aplicaciones reales del sector. Los estudiantes analizarán las decisiones de diseño detrás de cada arquitectura, desde los fundamentos del entrenamiento hasta los modelos generativos más avanzados, comprendiendo sus limitaciones computacionales y éticas.',
  },
]

let _dlVariantIdx = 0
function mockRegenerarSummaryDL(base) {
  const variant = DL_SUMMARY_VARIANTS[_dlVariantIdx % DL_SUMMARY_VARIANTS.length]
  _dlVariantIdx++
  return { ...base, ...variant }
}

// ── Step 1 (Author): Read-only academic metadata ──────────────────────────────

function AutorPaso1Metadata() {
  const meta = DEEP_LEARNING_METADATA
  const fields = [
    { label: 'Asignatura', value: meta.nombre, highlight: true },
    { label: 'Titulación', value: meta.titulacion },
    { label: 'Tipo de estudio', value: meta.tipoEstudio },
    { label: 'Área de conocimiento', value: meta.areaConocimiento },
    { label: 'Créditos', value: meta.creditos },
    { label: 'Coordinador', value: meta.coordinador },
    { label: 'Especialista', value: meta.especialista },
    { label: 'Modelo', value: meta.modelo },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#E0F4FB' }}>
            <GraduationCap size={14} style={{ color: '#0098CD' }} />
          </div>
          <h3 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Información académica</h3>
        </div>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Esta información ha sido asignada por tu coordinador. Revísala antes de continuar con la creación del contenido.
        </p>
      </div>

      {/* Info notice */}
      <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
        <Info size={13} style={{ color: '#0284C7', flexShrink: 0, marginTop: '1px' }} />
        <p className="text-xs leading-relaxed" style={{ color: '#0C4A6E' }}>
          Estos campos son de solo lectura. Si necesitas corregir algún dato, contacta con tu coordinador.
        </p>
      </div>

      {/* Metadata fields */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
        {fields.map((f, i) => (
          <div
            key={f.label}
            className="flex items-center px-4 py-3"
            style={{
              borderBottom: i < fields.length - 1 ? '1px solid #F1F5F9' : 'none',
              background: f.highlight ? '#F0F9FF' : i % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
            }}
          >
            <span className="text-xs font-medium w-40 flex-shrink-0" style={{ color: '#9CA3AF' }}>{f.label}</span>
            <span
              className={`text-sm ${f.highlight ? 'font-semibold' : 'font-medium'}`}
              style={{ color: f.highlight ? '#0098CD' : '#1A1A1A' }}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>

      {/* Commission info */}
      <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
        <Check size={13} style={{ color: '#16A34A', flexShrink: 0, marginTop: '1px' }} />
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: '#14532D' }}>Comisión activa</p>
          <p className="text-xs" style={{ color: '#166534' }}>
            El espacio de trabajo ha sido habilitado. Puedes comenzar a crear el contenido de la asignatura.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Step 2 (Author): Contextual form ──────────────────────────────────────────

function AutorPaso2Descriptor({ datos, onChange }) {
  const [archivosSimulados, setArchivosSimulados] = useState([])

  const toggleOpcion = (opcion) => {
    const current = datos.opciones || []
    const updated = current.includes(opcion)
      ? current.filter(o => o !== opcion)
      : [...current, opcion]
    onChange('opciones', updated)
  }

  const handleSimularSubida = () => {
    const nombres = ['bibliografia_dl.pdf', 'papers_transformers.pdf', 'dataset_imagenet_sample.zip']
    const nuevo = nombres[archivosSimulados.length % nombres.length]
    if (!archivosSimulados.includes(nuevo)) {
      setArchivosSimulados(prev => [...prev, nuevo])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#EEF2FF' }}>
            <FileText size={14} style={{ color: '#6366F1' }} />
          </div>
          <h3 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Descriptor y contexto didáctico</h3>
        </div>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          La IA usará esta información para generar el resumen de la asignatura y, posteriormente, el índice de temas.
        </p>
      </div>

      {/* Nivel de conocimiento previo */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Nivel de conocimiento previo del estudiante
        </label>
        <select
          value={datos.nivelConocimiento || ''}
          onChange={e => onChange('nivelConocimiento', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
          style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: datos.nivelConocimiento ? '#1A1A1A' : '#9CA3AF' }}
          onFocus={e => { e.target.style.borderColor = '#6366F1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)' }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        >
          <option value="">Seleccionar nivel…</option>
          {['Inicial', 'Intermedio', 'Avanzado', 'Experto'].map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {/* Número de temas */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Número de temas <span style={{ color: '#CBD5E1', fontWeight: '400' }}>(recomendado: 8)</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={datos.numTemas || ''}
            onChange={e => onChange('numTemas', e.target.value)}
            min={1} max={10}
            placeholder="8"
            className="w-28 px-3 py-2.5 rounded-lg text-sm outline-none"
            style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#1A1A1A' }}
            onFocus={e => { e.target.style.borderColor = '#6366F1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)' }}
            onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
          />
          <p className="text-xs" style={{ color: '#9CA3AF' }}>Entre 1 y 10 temas</p>
        </div>
      </div>

      {/* Enfoque de la asignatura */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Enfoque de la asignatura
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['Teórico', 'Práctico', 'Teórico-práctico', 'Basado en casos', 'Por proyectos'].map(enfoque => {
            const sel = datos.enfoque === enfoque
            return (
              <button
                key={enfoque}
                onClick={() => onChange('enfoque', enfoque)}
                className="px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-center"
                style={{
                  background: sel ? '#EEF2FF' : '#F8F9FA',
                  border: sel ? '2px solid #6366F1' : '2px solid transparent',
                  color: sel ? '#6366F1' : '#6B7280',
                }}
              >
                {enfoque}
              </button>
            )
          })}
        </div>
      </div>

      {/* Temas/conceptos obligatorios */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#9CA3AF' }}>
          Temas o conceptos obligatorios
        </label>
        <p className="text-xs mb-2" style={{ color: '#CBD5E1' }}>
          Conceptos que deben aparecer sí o sí en el índice generado
        </p>
        <textarea
          value={datos.temasObligatorios || ''}
          onChange={e => onChange('temasObligatorios', e.target.value)}
          placeholder="Ej. Backpropagation, redes convolucionales, mecanismo de atención, PyTorch…"
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
          style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: '#374151', lineHeight: '1.6' }}
          onFocus={e => { e.target.style.borderColor = '#6366F1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)' }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        />
      </div>

      {/* Archivos de referencia */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Archivos de referencia
        </label>
        <button
          onClick={handleSimularSubida}
          className="w-full flex flex-col items-center gap-2 px-4 py-5 rounded-xl transition-all"
          style={{ border: '2px dashed #E5E7EB', background: '#FAFAFA', color: '#9CA3AF' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366F1'; e.currentTarget.style.background = '#F5F3FF' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = '#FAFAFA' }}
        >
          <Upload size={18} style={{ color: '#CBD5E1' }} />
          <div className="text-center">
            <p className="text-xs font-medium" style={{ color: '#6B7280' }}>Arrastra archivos aquí o haz clic para subir</p>
            <p className="text-xs mt-0.5" style={{ color: '#CBD5E1' }}>Bibliografía, documentos, imágenes</p>
          </div>
        </button>
        {archivosSimulados.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {archivosSimulados.map(archivo => (
              <div key={archivo} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
                <Paperclip size={12} style={{ color: '#0284C7', flexShrink: 0 }} />
                <span className="text-xs flex-1" style={{ color: '#0C4A6E' }}>{archivo}</span>
                <button onClick={() => setArchivosSimulados(prev => prev.filter(a => a !== archivo))}>
                  <X size={11} style={{ color: '#94A3B8' }} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Opciones de la comisión */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
          Opciones de la comisión
        </label>
        <div className="space-y-2">
          {[
            { id: 'videoPlan', label: 'Plan de vídeo', desc: 'Incluir guión y estructura para vídeos docentes' },
            { id: 'aFondo', label: 'Apartado a fondo', desc: 'Sección de recursos y lecturas en profundidad por tema' },
          ].map(op => {
            const checked = (datos.opciones || []).includes(op.id)
            return (
              <button
                key={op.id}
                onClick={() => toggleOpcion(op.id)}
                className="w-full flex items-start gap-3 px-4 py-3 rounded-xl transition-all text-left"
                style={{
                  background: checked ? '#EEF2FF' : '#F8F9FA',
                  border: checked ? '1.5px solid #6366F1' : '1.5px solid #E5E7EB',
                }}
              >
                <div className="mt-0.5 flex-shrink-0" style={{ color: checked ? '#6366F1' : '#CBD5E1' }}>
                  {checked ? <CheckSquare size={15} /> : <Square size={15} />}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: checked ? '#4338CA' : '#374151' }}>{op.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{op.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* AI hint */}
      <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl" style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
        <Sparkles size={12} style={{ color: '#6366F1', flexShrink: 0, marginTop: '2px' }} />
        <p className="text-xs leading-relaxed" style={{ color: '#4338CA' }}>
          Al hacer clic en <strong>Generar resumen</strong>, la IA procesará toda esta información para crear un resumen de la asignatura que podrás revisar y ajustar.
        </p>
      </div>
    </div>
  )
}

// ── Step 3 (Author): AI Summary Preview + chat ────────────────────────────────

function AutorPaso3Preview({ resumen, onResumenChange }) {
  const [chatMensajes, setChatMensajes] = useState([{
    id: 1, rol: 'ia',
    texto: 'He generado el resumen de Deep Learning y Redes Neuronales a partir de la información que proporcionaste. Puedes pedirme ajustes en la descripción, los objetivos, el enfoque o cualquier otro aspecto antes de generar el índice.',
  }])
  const [inputChat, setInputChat] = useState('')
  const [cargandoIA, setCargandoIA] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chatMensajes])

  const enviarMensaje = () => {
    const texto = inputChat.trim()
    if (!texto || cargandoIA) return
    setChatMensajes(prev => [...prev, { id: Date.now(), rol: 'usuario', texto }])
    setInputChat('')
    setCargandoIA(true)
    setTimeout(() => {
      const nuevoResumen = mockRegenerarSummaryDL(resumen)
      onResumenChange(nuevoResumen)
      const respIA = mockIARespuesta()
      setChatMensajes(prev => [...prev, { id: Date.now() + 1, rol: 'ia', texto: respIA.texto }])
      setCargandoIA(false)
    }, 1500)
  }

  return (
    <div className="flex gap-0" style={{ minHeight: '540px' }}>
      {/* Left: summary */}
      <div className="flex-1 min-w-0 pr-6 overflow-y-auto space-y-5" style={{ borderRight: '1px solid #F1F5F9' }}>
        <div>
          <h3 className="text-base font-semibold mb-0.5" style={{ color: '#1A1A1A' }}>Resumen de la asignatura</h3>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>Generado por IA · Revisa y ajusta antes de generar el índice →</p>
        </div>

        {/* Subject name */}
        <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#9CA3AF' }}>Asignatura</p>
          <p className="text-base font-semibold" style={{ color: '#111827' }}>{resumen.nombre}</p>
        </div>

        {/* Description */}
        <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#9CA3AF' }}>Descripción</p>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{resumen.descripcion}</p>
        </div>

        {/* Topics preview */}
        <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Estructura de temas propuesta</p>
          <div className="space-y-2">
            {(resumen.temasConDescripcion || resumen.temas.map((t, i) => ({ numero: i + 1, titulo: t, descripcion: null }))).map((tema) => (
              <div key={tema.numero} className="px-3 py-2.5 rounded-lg" style={{ background: '#F8F9FA', border: '1px solid #F1F5F9' }}>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold flex-shrink-0 mt-0.5" style={{ color: '#0098CD', minWidth: '22px' }}>T{tema.numero}</span>
                  <p className="text-xs font-medium" style={{ color: '#1A1A1A' }}>{tema.titulo}</p>
                </div>
                {tema.descripcion && (
                  <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#6B7280', paddingLeft: '30px' }}>{tema.descripcion}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Etiquetas clave</p>
          <div className="flex flex-wrap gap-1.5">
            {resumen.tags.map(tag => (
              <span key={tag} className="inline-flex items-center rounded-full text-xs font-medium"
                style={{ background: '#E0F4FB', color: '#0098CD', border: '1px solid #B3E0F2', padding: '3px 10px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: chat */}
      <div className="flex flex-col pl-6" style={{ width: '280px', flexShrink: 0 }}>
        <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <ProdiMark size={20} />
          <p className="text-xs font-semibold" style={{ color: '#1A1A1A' }}>Prodi</p>
          <p className="text-xs ml-auto" style={{ color: '#9CA3AF' }}>Ajusta el resumen</p>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3" style={{ minHeight: 0 }}>
          {chatMensajes.map(msg => (
            <div key={msg.id} className={`flex ${msg.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
              {msg.rol === 'ia' && (
                <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mr-1.5 mt-0.5" style={{ background: '#EEF2FF' }}>
                  <Sparkles size={9} style={{ color: '#6366F1' }} />
                </div>
              )}
              <div className="px-3 py-2 rounded-xl text-xs leading-relaxed"
                style={{ maxWidth: '200px', background: msg.rol === 'usuario' ? '#6366F1' : '#F8F9FA', color: msg.rol === 'usuario' ? '#FFFFFF' : '#374151', borderRadius: msg.rol === 'usuario' ? '12px 12px 4px 12px' : '4px 12px 12px 12px' }}>
                {msg.texto}
              </div>
            </div>
          ))}
          {cargandoIA && (
            <div className="flex justify-start">
              <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mr-1.5 mt-0.5" style={{ background: '#EEF2FF' }}>
                <Sparkles size={9} style={{ color: '#6366F1' }} />
              </div>
              <div className="px-3 py-2 rounded-xl" style={{ background: '#F8F9FA', borderRadius: '4px 12px 12px 12px' }}>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#6366F1', animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        {/* Suggestions above input */}
        <div className="mt-3 space-y-1">
          {['Añade más ejemplos prácticos', 'Ajusta el nivel de dificultad', 'Incluye más sobre Transformers'].map(s => (
            <button key={s} onClick={() => setInputChat(s)} disabled={cargandoIA}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all"
              style={{ background: '#F1F5F9', color: '#6B7280' }}
              onMouseEnter={e => { if (!cargandoIA) e.currentTarget.style.background = '#E5E7EB' }}
              onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}>
              {s}
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-end gap-2 px-3 py-2 rounded-xl" style={{ background: '#F8F9FA', border: '1.5px solid #E5E7EB' }}>
          <textarea value={inputChat} onChange={e => setInputChat(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarMensaje() } }}
            placeholder="Pide ajustes al asistente…" rows={2} disabled={cargandoIA}
            className="flex-1 text-xs outline-none resize-none bg-transparent" style={{ color: '#374151', lineHeight: '1.5' }}
          />
          <button onClick={enviarMensaje} disabled={!inputChat.trim() || cargandoIA}
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{ background: inputChat.trim() && !cargandoIA ? '#6366F1' : '#E5E7EB', color: inputChat.trim() && !cargandoIA ? '#FFFFFF' : '#9CA3AF' }}>
            <Send size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHOR FLOW MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const AUTOR_PASO_LABELS = { 1: 'Información', 2: 'Descriptor', 3: 'Resumen' }
const AUTOR_TOTAL_PASOS = 3

function PantallaCrearAsignaturaAutor({ onCrearAsignatura, onCancel }) {
  const [paso, setPaso] = useState(1)
  const [generando, setGenerando] = useState(false)
  const [generandoResumen, setGenerandoResumen] = useState(false)
  const [datos, setDatos] = useState({})
  const [resumen, setResumen] = useState(null)
  const [modalVolver, setModalVolver] = useState(null) // null | 'volver' | 'cancelar'

  const updateDatos = (key, val) => setDatos(prev => ({ ...prev, [key]: val }))

  const puedeAvanzar = () => {
    if (paso === 1) return true  // Step 1 is read-only, always can proceed
    if (paso === 2) return !!datos.nivelConocimiento && !!datos.numTemas && !!datos.enfoque
    return true
  }

  const handleGenerarResumen = () => {
    setGenerandoResumen(true)
    setTimeout(() => {
      setResumen({ ...DEEP_LEARNING_SUMMARY_BASE })
      setGenerandoResumen(false)
      setPaso(3)
    }, 1600)
  }

  const handleAceptarYGenerar = () => {
    setGenerando(true)
    const indice = [
      'Tema 1: Fundamentos de redes neuronales y backpropagation',
      'Tema 2: Redes convolucionales (CNN) para visión artificial',
      'Tema 3: Redes recurrentes (RNN, LSTM) y secuencias',
      'Tema 4: Arquitecturas Transformer y atención',
      'Tema 5: Transfer learning y modelos preentrenados',
      'Tema 6: Modelos generativos: GANs y difusión',
    ]
    setTimeout(() => {
      const nuevaAsig = {
        id: 'deep-learning',
        nombre: 'Deep Learning y Redes Neuronales',
        descripcion: resumen.descripcion,
        objetivos: resumen.objetivos,
        tags: resumen.tags,
        etapaActual: 'Índice',
        estado: 'borrador',
        pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
        ultimaActividad: 'Ahora mismo',
        activa: true,
      }
      onCrearAsignatura('master-ia', nuevaAsig, { indice, resumen })
    }, 1000)
  }

  const handleVolverClick = () => setModalVolver('volver')
  const handleCancelarClick = () => setModalVolver('cancelar')
  const handleModalConfirm = () => {
    if (modalVolver === 'cancelar') onCancel()
    else setPaso(paso - 1)
    setModalVolver(null)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8F9FA', fontFamily: "'Inter', 'Arial', sans-serif" }}>
      {modalVolver && (
        <ModalConfirmVolver
          onConfirm={handleModalConfirm}
          onCancel={() => setModalVolver(null)}
        />
      )}
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', height: '56px' }}>
        <div className="flex items-center gap-3">
          <button onClick={handleCancelarClick}
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all"
            style={{ color: '#6B7280' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <ArrowLeft size={14} />
            Cancelar
          </button>
          <span style={{ color: '#E5E7EB' }}>·</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#EEF2FF' }}>
              <Sparkles size={12} style={{ color: '#6366F1' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Deep Learning y Redes Neuronales</p>
          </div>
        </div>
        <p className="text-xs font-medium" style={{ color: '#9CA3AF' }}>
          Paso {paso} de {AUTOR_TOTAL_PASOS} · {AUTOR_PASO_LABELS[paso]}
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
        <div className="h-1" style={{ background: '#E5E7EB' }}>
          <div className="h-full rounded-r-full transition-all"
            style={{ width: `${(paso / AUTOR_TOTAL_PASOS) * 100}%`, background: '#6366F1', transition: 'width 400ms ease' }} />
        </div>
        <div className="flex items-center justify-center gap-2 py-3">
          {[1, 2, 3].map((n, idx) => {
            const done = n < paso
            const current = n === paso
            return (
              <div key={n} className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center rounded-full flex-shrink-0 transition-all"
                    style={{ width: '22px', height: '22px', background: done ? '#10B981' : current ? '#6366F1' : '#F1F5F9' }}>
                    {done
                      ? <Check size={11} style={{ color: '#FFFFFF' }} />
                      : <span style={{ fontSize: '10px', fontWeight: '700', color: current ? '#FFFFFF' : '#CBD5E1' }}>{n}</span>
                    }
                  </div>
                  <span className="text-xs font-medium hidden sm:block"
                    style={{ color: done ? '#10B981' : current ? '#6366F1' : '#CBD5E1' }}>
                    {AUTOR_PASO_LABELS[n]}
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto py-8 px-4">
        <div className="mx-auto"
          style={{
            maxWidth: paso === 3 ? '960px' : '640px',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            transition: 'max-width 300ms ease',
          }}>
          <div className="px-8 py-8">
            {(generando || generandoResumen) ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse" style={{ background: '#EEF2FF' }}>
                  <Sparkles size={24} style={{ color: '#6366F1' }} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>
                    {generandoResumen ? 'Generando resumen de la asignatura…' : 'Generando índice de temas…'}
                  </p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>La IA está procesando tu solicitud…</p>
                </div>
                <div className="flex gap-1.5 mt-2">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: '#6366F1', animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {paso === 1 && <AutorPaso1Metadata />}
                {paso === 2 && <AutorPaso2Descriptor datos={datos} onChange={updateDatos} />}
                {paso === 3 && resumen && <AutorPaso3Preview resumen={resumen} onResumenChange={setResumen} />}
              </>
            )}
          </div>

          {/* Footer */}
          {!generando && !generandoResumen && (
            <div className="flex items-center justify-between px-8 py-5"
              style={{ borderTop: '1px solid #F1F5F9', background: '#FAFAFA', borderRadius: '0 0 16px 16px' }}>
              <button
                onClick={paso === 1 ? handleCancelarClick : handleVolverClick}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ color: '#6B7280', background: '#F1F5F9' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}>
                {paso === 1 ? 'Cancelar' : 'Volver'}
              </button>

              {paso === 1 && (
                <button
                  onClick={() => setPaso(2)}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all"
                  style={{ background: '#0098CD' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#0080B0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#0098CD'}>
                  Siguiente
                  <ChevronRight size={14} />
                </button>
              )}
              {paso === 2 && (
                <button
                  onClick={handleGenerarResumen}
                  disabled={!puedeAvanzar()}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: puedeAvanzar() ? '#6366F1' : '#E5E7EB',
                    color: puedeAvanzar() ? '#FFFFFF' : '#9CA3AF',
                    cursor: puedeAvanzar() ? 'pointer' : 'default',
                  }}>
                  <Sparkles size={13} />
                  Generar resumen
                </button>
              )}
              {paso === 3 && (
                <button
                  onClick={handleAceptarYGenerar}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all"
                  style={{ background: '#10B981' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#059669'}
                  onMouseLeave={e => e.currentTarget.style.background = '#10B981'}>
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

// ─────────────────────────────────────────────────────────────────────────────
// COORDINATOR FLOW MAIN COMPONENT (existing)
// ─────────────────────────────────────────────────────────────────────────────

const COORD_PASO_LABELS = { 1: 'Contexto', 2: 'Temática', 3: 'Vista previa' }
const COORD_TOTAL_PASOS = 3

function PantallaCrearAsignaturaCoordinador({ titulaciones, onCrearAsignatura, onCancel }) {
  const [paso, setPaso] = useState(1)
  const [generando, setGenerando] = useState(false)
  const [generandoPreview, setGenerandoPreview] = useState(false)
  const [resumenPreview, setResumenPreview] = useState(null)
  const [datos, setDatos] = useState({ _titulaciones: titulaciones })
  const [modalVolver, setModalVolver] = useState(null)

  const updateDatos = (key, val) => setDatos(prev => ({ ...prev, [key]: val }))

  const handleAvanzarA3 = () => {
    setGenerandoPreview(true)
    setTimeout(() => {
      setResumenPreview(generarResumen(datos))
      setGenerandoPreview(false)
      setPaso(3)
    }, 1200)
  }

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

  const handleVolverClickCoord = () => setModalVolver('volver')
  const handleCancelarClickCoord = () => setModalVolver('cancelar')
  const handleModalConfirmCoord = () => {
    if (modalVolver === 'cancelar') onCancel()
    else setPaso(paso - 1)
    setModalVolver(null)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8F9FA', fontFamily: "'Inter', 'Arial', sans-serif" }}>
      {modalVolver && (
        <ModalConfirmVolver
          onConfirm={handleModalConfirmCoord}
          onCancel={() => setModalVolver(null)}
        />
      )}
      <div className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', height: '56px' }}>
        <div className="flex items-center gap-3">
          <button onClick={handleCancelarClickCoord}
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all"
            style={{ color: '#6B7280' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
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
          Paso {paso} de {COORD_TOTAL_PASOS} · {COORD_PASO_LABELS[paso]}
        </p>
      </div>

      <div className="flex-shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
        <div className="h-1" style={{ background: '#E5E7EB' }}>
          <div className="h-full rounded-r-full transition-all"
            style={{ width: `${(paso / COORD_TOTAL_PASOS) * 100}%`, background: '#0098CD', transition: 'width 400ms ease' }} />
        </div>
        <div className="flex items-center justify-center gap-2 py-3">
          {[1, 2, 3].map((n, idx) => {
            const done = n < paso
            const current = n === paso
            return (
              <div key={n} className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center rounded-full flex-shrink-0 transition-all"
                    style={{ width: '22px', height: '22px', background: done ? '#10B981' : current ? '#0098CD' : '#F1F5F9' }}>
                    {done
                      ? <Check size={11} style={{ color: '#FFFFFF' }} />
                      : <span style={{ fontSize: '10px', fontWeight: '700', color: current ? '#FFFFFF' : '#CBD5E1' }}>{n}</span>
                    }
                  </div>
                  <span className="text-xs font-medium hidden sm:block"
                    style={{ color: done ? '#10B981' : current ? '#0098CD' : '#CBD5E1' }}>
                    {COORD_PASO_LABELS[n]}
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

      <div className="flex-1 overflow-y-auto py-8 px-4">
        <div className="mx-auto"
          style={{
            maxWidth: paso === 3 ? '960px' : '640px',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            transition: 'max-width 300ms ease',
          }}>
          <div className="px-8 py-8">
            {(generando || generandoPreview) ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse" style={{ background: '#EEF2FF' }}>
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
                    <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: '#6366F1', animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {paso === 1 && <PasoContextoAcademico datos={datos} onChange={updateDatos} />}
                {paso === 2 && <PasoDefinicionTematica datos={datos} onChange={updateDatos} />}
                {paso === 3 && resumenPreview && (
                  <PasoPreviewResumen resumenPreview={resumenPreview} onResumenChange={setResumenPreview} />
                )}
              </>
            )}
          </div>

          {!generando && !generandoPreview && (
            <div className="flex items-center justify-between px-8 py-5"
              style={{ borderTop: '1px solid #F1F5F9', background: '#FAFAFA', borderRadius: '0 0 16px 16px' }}>
              <button
                onClick={paso === 1 ? handleCancelarClickCoord : handleVolverClickCoord}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ color: '#6B7280', background: '#F1F5F9' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}>
                {paso === 1 ? 'Cancelar' : 'Volver'}
              </button>

              {paso === 1 && (
                <button onClick={() => setPaso(2)} disabled={!puedeAvanzar()}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{ background: puedeAvanzar() ? '#0098CD' : '#E5E7EB', color: puedeAvanzar() ? '#FFFFFF' : '#9CA3AF', cursor: puedeAvanzar() ? 'pointer' : 'default' }}>
                  Siguiente
                  <ChevronRight size={14} />
                </button>
              )}
              {paso === 2 && (
                <button onClick={handleAvanzarA3} disabled={!puedeAvanzar()}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{ background: puedeAvanzar() ? '#6366F1' : '#E5E7EB', color: puedeAvanzar() ? '#FFFFFF' : '#9CA3AF', cursor: puedeAvanzar() ? 'pointer' : 'default' }}>
                  <Sparkles size={13} />
                  Ver vista previa
                </button>
              )}
              {paso === 3 && (
                <button onClick={handleAceptar}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all"
                  style={{ background: '#10B981' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#059669'}
                  onMouseLeave={e => e.currentTarget.style.background = '#10B981'}>
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

// ─────────────────────────────────────────────────────────────────────────────
// ENTRY POINT — route to author or coordinator flow
// ─────────────────────────────────────────────────────────────────────────────

export default function PantallaCrearAsignatura({ titulaciones, onCrearAsignatura, onCancel, rolActivo }) {
  if (rolActivo === 'autor') {
    return (
      <PantallaCrearAsignaturaAutor
        onCrearAsignatura={onCrearAsignatura}
        onCancel={onCancel}
      />
    )
  }
  return (
    <PantallaCrearAsignaturaCoordinador
      titulaciones={titulaciones}
      onCrearAsignatura={onCrearAsignatura}
      onCancel={onCancel}
    />
  )
}

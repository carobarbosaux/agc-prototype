import { useState, useRef, useEffect } from 'react'
import {
  Check, BookOpen, X, ArrowLeft, MagnifyingGlass, CaretRight, PaperPlaneTilt,
  GraduationCap, FileText, Upload, CheckSquare, Square, Info, Paperclip, Link, Plus,
} from '@phosphor-icons/react'
import { tagsSugerenciasPorArea } from '../mockData'
import { ProdiMark } from '../components/ProdiLogo'
import PanelIA from '../components/PanelIA'

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
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>
          Titulación
        </label>
        <div className="flex items-center gap-2 px-[13px] py-[9px] rounded-[10px] mb-3" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
          <MagnifyingGlass size={13} style={{ color: '#6B7280', flexShrink: 0 }} />
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar titulación…"
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: '#374151' }}
            onFocus={e => { const p = e.currentTarget.parentElement; p.style.borderColor = '#0A5CF5'; p.style.background = '#F8FAFC' }}
            onBlur={e => { const p = e.currentTarget.parentElement; p.style.borderColor = '#CBD5E1'; p.style.background = '#FFFFFF' }}
            onMouseEnter={e => { if (document.activeElement !== e.currentTarget) e.currentTarget.parentElement.style.borderColor = '#0A5CF5' }}
            onMouseLeave={e => { if (document.activeElement !== e.currentTarget) e.currentTarget.parentElement.style.borderColor = '#CBD5E1' }}
          />
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {filtradas.map(t => {
            const sel = datos.titulacionId === t.id
            return (
              <button key={t.id} onClick={() => onChange('titulacionId', t.id)}
                className="w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all"
                style={{ background: sel ? '#E7EFFE' : '#F8F9FA', border: sel ? '2px solid #367CFF' : '2px solid transparent' }}
              >
                <BookOpen size={14} style={{ color: sel ? '#367CFF' : '#6B7280' }} />
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate" style={{ color: sel ? '#367CFF' : '#1A1A1A' }}>{t.nombre}</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>{t.codigo}</p>
                </div>
                {sel && <Check size={14} style={{ color: '#367CFF' }} />}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Nivel de estudio</label>
        <select value={datos.nivel || ''} onChange={e => onChange('nivel', e.target.value)}
          className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none"
          style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: datos.nivel ? '#334155' : '#6B7280' }}
          onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
          onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
          onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
          onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
        >
          <option value="">Seleccionar nivel…</option>
          {['Grado', 'Postgrado', 'Máster', 'Doctorado', 'Formación continua'].map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Público objetivo</label>
        <textarea value={datos.publicoObjetivo || ''} onChange={e => onChange('publicoObjetivo', e.target.value)}
          placeholder="Ej. Profesionales de TI con 2+ años de experiencia que quieren especializarse en IA aplicada…"
          rows={3} className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none resize-none"
          style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', lineHeight: '1.6' }}
          onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
          onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
          onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
          onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Número de créditos (ECTS)</label>
          <input type="number" value={datos.creditos || ''} onChange={e => onChange('creditos', e.target.value)}
            min={1} max={30} placeholder="6" className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none"
            style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155' }}
            onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
            onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
            onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
            onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Nombre provisional</label>
          <input type="text" value={datos.nombre || ''} onChange={e => onChange('nombre', e.target.value)}
            placeholder="Ej. Fundamentos de ML" className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none"
            style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155' }}
            onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
            onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
            onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
            onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Temas o contenidos a tratar</label>
        <textarea value={datos.temasTratar || ''} onChange={e => onChange('temasTratar', e.target.value)}
          placeholder="Ej. Regresión lineal, clasificación, árboles de decisión, redes neuronales, evaluación de modelos…"
          rows={3} className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none resize-none"
          style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', lineHeight: '1.6' }}
          onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
          onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
          onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
          onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Descriptor</label>
        <textarea value={datos.descriptor || ''} onChange={e => onChange('descriptor', e.target.value)}
          placeholder="Describe el propósito y alcance de la asignatura…"
          rows={3} className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none resize-none"
          style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', lineHeight: '1.6' }}
          onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
          onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
          onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
          onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Resultados de aprendizaje</label>
        <textarea value={datos.resultadosAprendizaje || ''} onChange={e => onChange('resultadosAprendizaje', e.target.value)}
          placeholder="Ej. Al finalizar, el estudiante será capaz de…"
          rows={3} className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none resize-none"
          style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', lineHeight: '1.6' }}
          onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
          onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
          onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
          onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
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
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Área de conocimiento</label>
        <div className="grid grid-cols-2 gap-2">
          {areas.map(area => {
            const sel = datos.areaConocimiento === area
            return (
              <button key={area} onClick={() => onChange('areaConocimiento', area)}
                className="text-left px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{ background: sel ? '#E7EFFE' : '#F8F9FA', border: sel ? '2px solid #367CFF' : '2px solid transparent', color: sel ? '#367CFF' : '#374151', fontWeight: sel ? '600' : '400' }}
              >
                {area}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Tipo de asignatura</label>
        <select value={datos.tipoAsignatura || ''} onChange={e => onChange('tipoAsignatura', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
          style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', color: datos.tipoAsignatura ? '#1A1A1A' : '#6B7280' }}
          onFocus={e => { e.target.style.borderColor = '#367CFF'; e.target.style.boxShadow = '0 0 0 3px rgba(0,152,205,0.12)' }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
        >
          <option value="">Seleccionar tipo…</option>
          {['Cuantitativa', 'Cualitativa', 'Mixta'].map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Enfoque principal</label>
        <div className="grid grid-cols-3 gap-2">
          {['Teórico', 'Práctico', 'Mixto', 'Basado en casos', 'Por proyectos', 'Investigación'].map(enfoque => {
            const sel = datos.enfoque === enfoque
            return (
              <button key={enfoque} onClick={() => onChange('enfoque', enfoque)}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: sel ? '#F1F5F9' : 'transparent',
                  outline: `1px solid ${sel ? '#0A5CF5' : '#E6E6E6'}`,
                  outlineOffset: '-1px',
                  color: sel ? '#0A5CF5' : '#334155',
                }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.background = '#F1F5F9' }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.background = 'transparent' }}
              >
                {enfoque}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg" style={{ background: '#E7EFFE', border: '1px solid #BAD2FF' }}>
                <p className="text-xs" style={{ color: '#0047CC', lineHeight: '1.5' }}>
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
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold mb-0.5" style={{ color: '#1A1A1A' }}>Resumen preliminar</h3>
        <p className="text-xs" style={{ color: '#6B7280' }}>Generado por IA · Puedes ajustarlo con el asistente</p>
      </div>
      <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#6B7280' }}>Asignatura</p>
        <p className="text-base font-semibold" style={{ color: '#111827' }}>{resumenPreview.nombre}</p>
      </div>
      <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Descripción</p>
        <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{resumenPreview.descripcion}</p>
      </div>
      <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Objetivos de aprendizaje</p>
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
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Etiquetas sugeridas</p>
        <div className="flex flex-wrap gap-1.5">
          {resumenPreview.tags.map(tag => (
            <span key={tag} className="inline-flex items-center rounded-full text-xs font-medium"
              style={{ background: '#E7EFFE', color: '#367CFF', border: '1px solid #BAD2FF', padding: '3px 10px' }}>
              {tag}
            </span>
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
    <div style={{ maxWidth: '640px' }} className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#E7EFFE' }}>
            <GraduationCap size={14} style={{ color: '#367CFF' }} />
          </div>
          <h3 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Información académica</h3>
        </div>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Esta información ha sido asignada por tu coordinador. Revísala antes de continuar con la creación del contenido.
        </p>
      </div>

      {/* Info notice */}
      <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
        <Info size={13} style={{ color: '#0284C7', flexShrink: 0, marginTop: '2px' }} />
        <p className="text-xs leading-relaxed" style={{ color: '#0C4A6E' }}>
          Estos campos son de solo lectura. Si necesitas corregir algún dato, contacta con tu coordinador.
        </p>
      </div>

      {/* Metadata fields */}
      <div className="space-y-0 rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
        {fields.map((f, i) => (
          <div
            key={f.label}
            className="flex items-center px-5 py-3.5"
            style={{
              borderBottom: i < fields.length - 1 ? '1px solid #F1F5F9' : 'none',
              background: f.highlight ? '#F8FAFF' : '#FFFFFF',
            }}
          >
            <span className="text-xs font-medium w-44 flex-shrink-0" style={{ color: '#9CA3AF' }}>{f.label}</span>
            <span
              className={`text-sm ${f.highlight ? 'font-semibold' : ''}`}
              style={{ color: f.highlight ? '#0A5CF5' : '#1A1A1A' }}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>

      {/* Commission info */}
      <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#DCFCE7' }}>
          <Check size={12} style={{ color: '#16A34A' }} />
        </div>
        <div>
          <p className="text-sm font-semibold mb-0.5" style={{ color: '#14532D' }}>Comisión activa</p>
          <p className="text-xs" style={{ color: '#166534' }}>
            El espacio de trabajo ha sido habilitado. Puedes comenzar a crear el contenido de la asignatura.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Panel IA mockdata for Descriptor step ─────────────────────────────────────

const PANEL_IA_CONTEXTOS = {
  nivel: {
    titulo: 'Nivel de conocimiento',
    mensajeInicial: 'Para Deep Learning y Redes Neuronales, en un Máster en IA, lo habitual es un perfil con bases de machine learning. Te recomendaría nivel Intermedio o Avanzado.',
    sugerencias: ['Recomendar un nivel', 'Diferencia entre niveles'],
    respuestas: {
      'Recomendar un nivel': 'Para este máster recomendaría Intermedio: el estudiante conoce Python y álgebra lineal, pero no ha trabajado con frameworks de deep learning. Así el temario puede construir desde backpropagation hasta Transformers sin dar pasos en falso.',
      'Diferencia entre niveles': 'Inicial: sin conocimientos previos de ML. Intermedio: sabe programar y conoce conceptos de ML supervisado. Avanzado: ha entrenado modelos y conoce frameworks. Para un máster de IA, Intermedio suele ser el punto de partida más realista.',
    },
  },
  enfoque: {
    titulo: 'Enfoque de la asignatura',
    mensajeInicial: 'El enfoque condiciona mucho la estructura. Para Deep Learning hay dos opciones fuertes: Teórico-práctico (50/50 teoría y código) o Por proyectos (un modelo end-to-end por tema). ¿Tienes preferencia?',
    sugerencias: ['Recomendar un enfoque', 'Comparar enfoques'],
    respuestas: {
      'Recomendar un enfoque': 'Para un Máster en IA recomendaría Teórico-práctico. Permite explicar la matemática detrás de cada arquitectura y aplicarla inmediatamente con PyTorch, sin perder el rigor conceptual.',
      'Comparar enfoques': 'Teórico: ideal para bases conceptuales sólidas, menor transferencia inmediata. Práctico: más empleable, pero puede quedar superficial. Teórico-práctico: equilibra comprensión y aplicación. Por proyectos: muy motivador, requiere más autonomía del estudiante.',
    },
  },
  conceptos: {
    titulo: 'Conceptos obligatorios',
    mensajeInicial: 'Para Deep Learning y Redes Neuronales, hay ciertos conceptos que no pueden faltar. ¿Quieres que te proponga una lista de partida basada en el área?',
    sugerencias: ['Proponer conceptos esenciales', 'Revisar si falta algo', 'Basarme en los archivos'],
    respuestas: {
      'Proponer conceptos esenciales': 'Conceptos clave para este temario:\n• Backpropagation y gradiente descendente\n• Redes convolucionales (CNN)\n• Redes recurrentes (RNN, LSTM, GRU)\n• Mecanismo de atención y Transformers\n• Regularización (dropout, batch norm)\n• Transfer learning\n• GANs o modelos de difusión\n• PyTorch como framework principal',
      'Revisar si falta algo': 'Si ya tienes una lista, compártela y la reviso. En general, para un máster completo no debería faltar: el mecanismo de atención (base de los LLMs modernos), al menos una arquitectura generativa, y evaluación de modelos (métricas, overfitting).',
      'Basarme en los archivos': 'Si subes la bibliografía o el plan de estudios anterior, puedo extraer los conceptos clave directamente de esos documentos y priorizarlos según su relevancia.',
    },
  },
}

const PANEL_GENERIC_RESPONSES = [
  'Entendido. ¿Quieres que ajuste algún otro aspecto del descriptor?',
  'Anotado. Puedo ayudarte con cualquier otro campo cuando quieras.',
  'De acuerdo. ¿Hay algo más en lo que pueda orientarte antes de generar el resumen?',
]
let _panelRespIdx = 0

// ── Step 2 (Author): Contextual form ──────────────────────────────────────────

function PanelIADescriptor({ contexto, onContexto }) {
  const ctx = PANEL_IA_CONTEXTOS[contexto] || null
  const [mensajes, setMensajes] = useState([])
  const [input, setInput] = useState('')
  const [cargando, setCargando] = useState(false)
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)

  // When context changes, inject the contextual opening message
  useEffect(() => {
    if (!ctx) return
    setMensajes([{ id: Date.now(), rol: 'ia', texto: ctx.mensajeInicial }])
    setInput('')
    setTimeout(() => inputRef.current?.focus(), 80)
  }, [contexto])

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [mensajes])

  const enviar = (texto) => {
    const txt = (texto || input).trim()
    if (!txt || cargando) return
    setMensajes(prev => [...prev, { id: Date.now(), rol: 'usuario', texto: txt }])
    setInput('')
    setCargando(true)
    setTimeout(() => {
      const respuesta = ctx?.respuestas?.[txt]
        || PANEL_GENERIC_RESPONSES[_panelRespIdx++ % PANEL_GENERIC_RESPONSES.length]
      setMensajes(prev => [...prev, { id: Date.now() + 1, rol: 'ia', texto: respuesta }])
      setCargando(false)
    }, 1100)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Context header — only when a context is active */}
      {ctx && (
        <div className="flex items-center justify-between mb-3 pb-3 flex-shrink-0" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <span className="text-xs font-semibold" style={{ color: '#1A1A1A' }}>{ctx.titulo}</span>
          <button
            onClick={() => onContexto(null)}
            className="text-xs px-2 py-0.5 rounded-md transition-all"
            style={{ color: '#6B7280', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#374151' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280' }}
          >
            ← Volver
          </button>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3" style={{ minHeight: 0 }}>
        {/* Idle state: no context selected yet */}
        {!ctx && mensajes.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-2">
            <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
              Usa los atajos o escribe una pregunta para recibir orientación.
            </p>
            <div className="space-y-1.5 w-full">
          
            </div>
          </div>
        )}
        {mensajes.map(msg => (
          <div key={msg.id} className={`flex ${msg.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
            {msg.rol === 'ia' && (
              <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mr-1.5 mt-0.5" style={{ background: '#E7EFFE' }}>
                <ProdiMark size={10} />
              </div>
            )}
            <div
              className="px-3 py-2 rounded-xl text-xs leading-relaxed"
              style={{
                maxWidth: '195px',
                whiteSpace: 'pre-line',
                background: msg.rol === 'usuario' ? '#0A5CF5' : '#F8F9FA',
                color: msg.rol === 'usuario' ? '#FFFFFF' : '#374151',
                borderRadius: msg.rol === 'usuario' ? '12px 12px 4px 12px' : '4px 12px 12px 12px',
              }}
            >
              {msg.texto}
            </div>
          </div>
        ))}
        {cargando && (
          <div className="flex justify-start">
            <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mr-1.5 mt-0.5" style={{ background: '#E7EFFE' }}>
              <ProdiMark size={10} />
            </div>
            <div className="px-3 py-2 rounded-xl" style={{ background: '#F8F9FA', borderRadius: '4px 12px 12px 12px' }}>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#367CFF', animationDelay: `${i * 0.15}s` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-end gap-2 px-3 py-2 rounded-xl flex-shrink-0" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() } }}
          placeholder="Pregunta algo…"
          rows={2}
          disabled={cargando}
          className="flex-1 text-xs outline-none resize-none bg-transparent"
          style={{ color: '#374151', lineHeight: '1.5' }}
        />
        <button
          onClick={() => enviar()}
          disabled={!input.trim() || cargando}
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
          style={{ background: input.trim() && !cargando ? '#0A5CF5' : '#E5E7EB', color: input.trim() && !cargando ? '#FFFFFF' : '#6B7280' }}
        >
          <PaperPlaneTilt size={12} />
        </button>
      </div>
    </div>
  )
}

function AutorPaso2Descriptor({ datos, onChange, panelContexto, onPanelContexto }) {
  const [archivosSimulados, setArchivosSimulados] = useState([])
  const [urlInput, setUrlInput] = useState('')
  const [urls, setUrls] = useState([])

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

  // Discrete CTA style
  const ctaStyle = {
    base: { fontSize: '11px', fontWeight: '500', color: '#6B7280', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0', lineHeight: 1 },
    hover: { color: '#0A5CF5' },
  }

  const CtaBtn = ({ ctxKey, label }) => {
    const [hovered, setHovered] = useState(false)
    const active = panelContexto === ctxKey
    return (
      <button
        onClick={() => onPanelContexto(active ? null : ctxKey)}
        style={{
          ...ctaStyle.base,
          color: '#0A5CF5',
          opacity: active ? 1 : hovered ? 0.9 : 0.8,
          fontWeight: active ? '600' : '500',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
      </button>
    )
  }

  const formContent = (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#E7EFFE' }}>
            <FileText size={14} style={{ color: '#367CFF' }} />
          </div>
          <h3 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Descriptor y contexto didáctico</h3>
        </div>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          La IA usará esta información para generar el resumen de la asignatura y, posteriormente, el índice de temas.
        </p>
      </div>

      {/* Nivel de conocimiento previo */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>
            Nivel de conocimiento previo del estudiante
          </label>
          <CtaBtn ctxKey="nivel" label="Sugerir nivel" />
        </div>
        <input
          type="text"
          value={datos.nivelConocimiento || ''}
          onChange={e => onChange('nivelConocimiento', e.target.value)}
          placeholder="Ej. Intermedio — familiaridad con Python y estadística básica…"
          className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none"
          style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155' }}
          onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
          onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
          onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
          onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
        />
      </div>

      {/* Número de temas */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>
          Número de temas <span style={{ color: '#6B7280', fontWeight: '400' }}>(recomendado: 8)</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={datos.numTemas || ''}
            onChange={e => onChange('numTemas', e.target.value)}
            min={1} max={10}
            placeholder="8"
            className="w-28 px-[13px] py-[9px] rounded-[10px] text-sm outline-none"
            style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155' }}
            onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
            onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
            onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
            onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
          />
          <p className="text-xs" style={{ color: '#6B7280' }}>Entre 1 y 10 temas</p>
        </div>
      </div>

      {/* Enfoque de la asignatura */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>
            Enfoque de la asignatura
          </label>
          <CtaBtn ctxKey="enfoque" label="Sugerir enfoque" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Teórico', 'Práctico', 'Teórico-práctico', 'Basado en casos', 'Por proyectos'].map(enfoque => {
            const sel = datos.enfoque === enfoque
            return (
              <button
                key={enfoque}
                onClick={() => onChange('enfoque', enfoque)}
                className="px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-center"
                style={{
                  background: sel ? '#F1F5F9' : 'transparent',
                  outline: `1px solid ${sel ? '#0A5CF5' : '#E6E6E6'}`,
                  outlineOffset: '-1px',
                  color: sel ? '#0A5CF5' : '#334155',
                }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.background = '#F1F5F9' }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.background = 'transparent' }}
              >
                {enfoque}
              </button>
            )
          })}
        </div>
      </div>

      {/* Temas/conceptos obligatorios */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>
            Temas o conceptos obligatorios
          </label>
          <CtaBtn ctxKey="conceptos" label="Sugerir conceptos" />
        </div>
        <p className="text-xs mb-2" style={{ color: '#6B7280' }}>
          Conceptos que deben aparecer sí o sí en el índice generado
        </p>
        <textarea
          value={datos.temasObligatorios || ''}
          onChange={e => onChange('temasObligatorios', e.target.value)}
          placeholder="Ej. Backpropagation, redes convolucionales, mecanismo de atención, PyTorch…"
          rows={3}
          className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none resize-none"
          style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', lineHeight: '1.6' }}
          onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
          onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
          onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
          onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
        />
      </div>

      {/* Fuentes y bibliografía */}
      <div className="flex flex-col gap-4">
        {/* Drop zone */}
        <div
          className="w-full flex flex-col items-center justify-center gap-4 rounded-[10px]"
          style={{ padding: '24px 80px', background: '#F8FAFC', outline: '1px solid #EAEDF8', outlineOffset: '-1px' }}
        >
          <button
            onClick={handleSimularSubida}
            className="flex items-center justify-center gap-2 rounded-[10px]"
            style={{ padding: 8, background: '#F9FCFF', outline: '1px solid #0A5CF5', outlineOffset: '-1px' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E6EFFF' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F9FCFF' }}
          >
            <span style={{ color: '#0A5CF5', fontSize: 14, fontFamily: 'Proeduca Sans', fontWeight: '500', lineHeight: '20px' }}>Adjuntar documento</span>
          </button>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-sm font-medium text-center" style={{ color: '#566077', lineHeight: '19.6px' }}>Archivos soportados: PDF, Word, Excel</span>
            <span className="text-sm font-medium text-center" style={{ color: '#566077', lineHeight: '19.6px' }}>Límite de peso máximo: 25MB</span>
          </div>
        </div>

        {/* URL input */}
        <div className="flex items-center gap-2">
          <div className="flex items-center flex-1 gap-2 px-3 py-2 rounded-[10px]" style={{ border: '1px solid #CBD5E1', background: '#FFFFFF' }}>
            <Link size={12} style={{ color: '#6B7280', flexShrink: 0 }} />
            <input
              type="url"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && urlInput.trim()) {
                  setUrls(prev => [...prev, urlInput.trim()])
                  setUrlInput('')
                }
              }}
              placeholder="Añadir enlace…"
              className="flex-1 text-xs outline-none bg-transparent"
              style={{ color: '#374151' }}
              onFocus={e => e.currentTarget.parentElement.style.borderColor = '#0A5CF5'}
              onBlur={e => e.currentTarget.parentElement.style.borderColor = '#CBD5E1'}
            />
          </div>
          <button
            onClick={() => { if (urlInput.trim()) { setUrls(prev => [...prev, urlInput.trim()]); setUrlInput('') } }}
            className="flex items-center justify-center rounded-[10px] text-xs font-medium"
            style={{ padding: '7px 12px', background: '#F9FCFF', outline: '1px solid #0A5CF5', outlineOffset: '-1px', color: '#0A5CF5', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E6EFFF' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F9FCFF' }}
          >
            Añadir
          </button>
        </div>

        {/* Unified list */}
        {(archivosSimulados.length > 0 || urls.length > 0) && (
          <div className="flex flex-col gap-2">
            <p className="text-sm" style={{ color: '#0F172A', fontWeight: '400', lineHeight: '20px' }}>Fuentes adjuntas</p>
            <div className="flex flex-wrap gap-2">
              {archivosSimulados.map(archivo => (
                <div
                  key={archivo}
                  className="flex items-center gap-1.5"
                  style={{ padding: '6px 10px', background: '#F8FAFC', borderRadius: 8, outline: '1px solid #EAEDF8', outlineOffset: '-1px', maxWidth: 260 }}
                >
                  <Paperclip size={12} style={{ color: '#0A5CF5', flexShrink: 0 }} />
                  <span className="text-xs font-medium truncate" style={{ color: '#0A5CF5' }}>{archivo}</span>
                  <button onClick={() => setArchivosSimulados(prev => prev.filter(a => a !== archivo))}>
                    <X size={11} style={{ color: '#94A3B8' }} />
                  </button>
                </div>
              ))}
              {urls.map((url, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5"
                  style={{ padding: '6px 10px', background: '#F8FAFC', borderRadius: 8, outline: '1px solid #EAEDF8', outlineOffset: '-1px', maxWidth: 260 }}
                >
                  <Link size={12} style={{ color: '#0A5CF5', flexShrink: 0 }} />
                  <span className="text-xs font-medium truncate" style={{ color: '#0A5CF5' }}>{url}</span>
                  <button onClick={() => setUrls(prev => prev.filter((_, idx) => idx !== i))}>
                    <X size={11} style={{ color: '#94A3B8' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Opciones de la comisión */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>
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
                  background: checked ? '#E7EFFE' : '#F8F9FA',
                  border: checked ? '1.5px solid #367CFF' : '1.5px solid #E5E7EB',
                }}
              >
                <div className="mt-0.5 flex-shrink-0" style={{ color: checked ? '#367CFF' : '#6B7280' }}>
                  {checked ? <CheckSquare size={15} /> : <Square size={15} />}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: checked ? '#0047CC' : '#374151' }}>{op.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{op.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* AI hint */}
      <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl" style={{ background: '#E7EFFE', border: '1px solid #BAD2FF' }}>
                <p className="text-xs leading-relaxed" style={{ color: '#0047CC' }}>
          Al hacer clic en <strong>Generar resumen</strong>, la IA procesará toda esta información para crear un resumen de la asignatura que podrás revisar y ajustar.
        </p>
      </div>
    </div>
  )

  return formContent
}

// ── Step 3 (Author): AI Summary Preview + chat ────────────────────────────────

function AutorPaso3Preview({ resumen, onResumenChange }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold mb-0.5" style={{ color: '#1A1A1A' }}>Resumen de la asignatura</h3>
        <p className="text-xs" style={{ color: '#6B7280' }}>Generado por IA · Revisa y ajusta con el asistente</p>
      </div>

      {/* Subject name */}
      <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#6B7280' }}>Asignatura</p>
        <p className="text-base font-semibold" style={{ color: '#111827' }}>{resumen.nombre}</p>
      </div>

      {/* Description */}
      <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Descripción</p>
        <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{resumen.descripcion}</p>
      </div>

      {/* Topics preview */}
      <div className="pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Estructura de temas propuesta</p>
        <div className="space-y-2">
          {(resumen.temasConDescripcion || resumen.temas.map((t, i) => ({ numero: i + 1, titulo: t, descripcion: null }))).map((tema) => (
            <div key={tema.numero} className="px-3 py-2.5 rounded-lg" style={{ background: '#F8F9FA', border: '1px solid #F1F5F9' }}>
              <div className="flex items-start gap-2">
                <span className="text-xs font-semibold flex-shrink-0 mt-0.5" style={{ color: '#367CFF', minWidth: '22px' }}>T{tema.numero}</span>
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
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Etiquetas clave</p>
        <div className="flex flex-wrap gap-1.5">
          {resumen.tags.map(tag => (
            <span key={tag} className="inline-flex items-center rounded-full text-xs font-medium"
              style={{ background: '#E7EFFE', color: '#367CFF', border: '1px solid #BAD2FF', padding: '3px 10px' }}>
              {tag}
            </span>
          ))}
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
  // Panel IA for step 2: null = panel not shown, string = panel open with that context
  const [panelContexto, setPanelContexto] = useState(null)

  const updateDatos = (key, val) => setDatos(prev => ({ ...prev, [key]: val }))

  // Close panel when leaving step 2
  const handlePasoChange = (newPaso) => {
    if (newPaso !== 2) setPanelContexto(null)
    setPaso(newPaso)
  }

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
      { titulo: 'Introducción al Deep Learning', epigrafes: ['Introducción y objetivos', 'Concepto de inteligencia artificial, machine learning y deep learning', 'Evolución histórica de las redes neuronales', 'Aplicaciones actuales del deep learning', 'Retos y limitaciones del aprendizaje profundo', 'Forma'] },
      { titulo: 'Fundamentos de redes neuronales artificiales', epigrafes: ['Introducción y objetivos', 'Inspiración biológica de las redes neuronales', 'La neurona artificial y las funciones de activación', 'Arquitectura básica de una red neuronal', 'Proceso de entrenamiento y aprendizaje', 'Forma'] },
      { titulo: 'Entrenamiento de redes neuronales', epigrafes: ['Introducción y objetivos', 'Concepto de función de pérdida', 'Algoritmo de retropropagación (backpropagation)', 'Métodos de optimización en deep learning', 'Problemas comunes en el entrenamiento de redes', 'Forma'] },
      { titulo: 'Redes neuronales profundas', epigrafes: ['Introducción y objetivos', 'Arquitectura de redes profundas', 'Inicialización de pesos y regularización', 'Overfitting y técnicas de generalización', 'Mejora del rendimiento en modelos profundos', 'Forma'] },
      { titulo: 'Redes neuronales convolucionales (CNN)', epigrafes: ['Introducción y objetivos', 'Concepto y funcionamiento de las CNN', 'Capas convolucionales y de pooling', 'Arquitecturas populares de CNN', 'Aplicaciones en visión por computador', 'Forma'] },
      { titulo: 'Redes neuronales recurrentes (RNN)', epigrafes: ['Introducción y objetivos', 'Concepto de secuencias y datos temporales', 'Arquitectura de redes recurrentes', 'Modelos LSTM y GRU', 'Aplicaciones en procesamiento del lenguaje natural y series temporales', 'Forma'] },
      { titulo: 'Modelos generativos y aprendizaje profundo', epigrafes: ['Introducción y objetivos', 'Concepto de modelos generativos', 'Redes generativas adversariales (GAN)', 'Autoencoders y variational autoencoders', 'Aplicaciones del deep learning generativo', 'Forma'] },
      { titulo: 'Aplicaciones avanzadas del Deep Learning', epigrafes: ['Introducción y objetivos', 'Deep learning en visión artificial', 'Deep learning en procesamiento del lenguaje natural', 'Uso de deep learning en sistemas inteligentes', 'Tendencias actuales y futuro del deep learning', 'Forma'] },
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
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#F8F9FA', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>
      {modalVolver && (
        <ModalConfirmVolver
          onConfirm={handleModalConfirm}
          onCancel={() => setModalVolver(null)}
        />
      )}
      {/* Top bar */}
      <div className="flex items-center justify-end px-6 py-3 flex-shrink-0"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', height: '56px' }}>
        {!generando && !generandoResumen && (
          <div className="flex items-center gap-2">
            {paso === 1 && (
              <button onClick={handleCancelarClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{ color: '#374151', background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}>
                Cancelar
              </button>
            )}
            {paso > 1 && (
              <button
                onClick={handleVolverClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{ color: '#374151', background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}>
                Volver
              </button>
            )}
            {paso === 1 && (
              <button
                onClick={() => handlePasoChange(2)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-sm font-medium text-white transition-all"
                style={{ background: '#0A5CF5' }}>
                Siguiente
              </button>
            )}
            {paso === 2 && (
              <button
                onClick={handleGenerarResumen}
                disabled={!puedeAvanzar()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-sm font-medium transition-all"
                style={{
                  background: puedeAvanzar() ? '#0A5CF5' : '#E5E7EB',
                  color: puedeAvanzar() ? '#FFFFFF' : '#6B7280',
                  cursor: puedeAvanzar() ? 'pointer' : 'default',
                }}>
                Generar resumen
              </button>
            )}
            {paso === 3 && (
              <button
                onClick={handleAceptarYGenerar}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-sm font-medium text-white transition-all"
                style={{ background: '#008660' }}
                onMouseEnter={e => e.currentTarget.style.background = '#005E43'}
                onMouseLeave={e => e.currentTarget.style.background = '#008660'}>
                Generar índice
              </button>
            )}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
        <div className="h-1" style={{ background: '#E5E7EB' }}>
          <div className="h-full rounded-r-full transition-all"
            style={{ width: `${(paso / AUTOR_TOTAL_PASOS) * 100}%`, background: '#367CFF', transition: 'width 400ms ease' }} />
        </div>
        <div className="flex items-center justify-center gap-2 py-3">
          {[1, 2, 3].map((n, idx) => {
            const done = n < paso
            const current = n === paso
            return (
              <div key={n} className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center rounded-full flex-shrink-0 transition-all"
                    style={{ width: '22px', height: '22px', background: done ? '#008660' : current ? '#367CFF' : '#F1F5F9' }}>
                    {done
                      ? <Check size={11} style={{ color: '#FFFFFF' }} />
                      : <span style={{ fontSize: '10px', fontWeight: '700', color: current ? '#FFFFFF' : '#CBD5E1' }}>{n}</span>
                    }
                  </div>
                  <span className="text-xs font-medium hidden sm:block"
                    style={{ color: done ? '#008660' : current ? '#367CFF' : '#CBD5E1' }}>
                    {AUTOR_PASO_LABELS[n]}
                  </span>
                </div>
                {idx < 2 && (
                  <div className="h-px" style={{ width: '28px', background: done ? '#008660' : '#E5E7EB', transition: 'background 400ms ease' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 min-h-0 ${paso === 2 || (paso === 3 && resumen) ? 'flex overflow-hidden' : 'overflow-y-auto'}`}>
        {(generando || generandoResumen) ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse" style={{ background: '#E7EFFE' }}>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>
                {generandoResumen ? 'Generando resumen de la asignatura…' : 'Generando índice de temas…'}
              </p>
              <p className="text-xs" style={{ color: '#6B7280' }}>La IA está procesando tu solicitud…</p>
            </div>
            <div className="flex gap-1.5 mt-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{ background: '#367CFF', animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        ) : paso === 2 ? (
          <>
            <div className="flex-1 overflow-y-auto" style={{ background: '#FFFFFF' }}>
              <div className="px-10 py-8">
                <AutorPaso2Descriptor datos={datos} onChange={updateDatos} panelContexto={panelContexto} onPanelContexto={setPanelContexto} />
              </div>
            </div>
            <PanelIA
              historialInicial={[{ id: 1, rol: 'ia', mensaje: 'Hola, soy tu asistente. Puedo ayudarte a definir el nivel de conocimiento previo, el número de temas o el enfoque pedagógico de la asignatura. ¿En qué te ayudo?' }]}
              temaLabel="Descriptor"
              onCerrar={null}
              quotePendiente={null}
              onQuoteConsumed={null}
            />
          </>
        ) : paso === 3 && resumen ? (
          <>
            <div className="flex-1 overflow-y-auto py-8 px-6">
              <div className="mx-auto rounded-2xl overflow-hidden" style={{ maxWidth: '720px', background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                <div className="px-8 py-8">
                  <AutorPaso3Preview resumen={resumen} onResumenChange={setResumen} />
                </div>
              </div>
            </div>
            <PanelIA
              historialInicial={[{ id: 1, rol: 'ia', mensaje: 'He generado el resumen de Deep Learning y Redes Neuronales a partir de la información que proporcionaste. Puedes pedirme ajustes en la descripción, los objetivos, el enfoque o cualquier otro aspecto antes de generar el índice.' }]}
              temaLabel="Resumen de la asignatura"
              onCerrar={null}
              quotePendiente={null}
              onQuoteConsumed={null}
            />
          </>
        ) : (
          <div className="flex-1 overflow-y-auto" style={{ background: '#FFFFFF' }}>
            <div className="flex justify-center px-10 py-8">
              {paso === 1 && <AutorPaso1Metadata />}
            </div>
          </div>
        )}
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
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#F8F9FA', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>
      {modalVolver && (
        <ModalConfirmVolver
          onConfirm={handleModalConfirmCoord}
          onCancel={() => setModalVolver(null)}
        />
      )}
      <div className="flex items-center justify-end px-6 py-3 flex-shrink-0"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', height: '56px' }}>
        {!generando && !generandoPreview && (
          <div className="flex items-center gap-2">
            {paso === 1 && (
              <button onClick={handleCancelarClickCoord}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{ color: '#374151', background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}>
                Cancelar
              </button>
            )}
            {paso > 1 && (
              <button
                onClick={handleVolverClickCoord}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{ color: '#374151', background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}>
                Volver
              </button>
            )}
            {paso === 1 && (
              <button onClick={() => setPaso(2)} disabled={!puedeAvanzar()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-sm font-medium transition-all"
                style={{ background: puedeAvanzar() ? '#0A5CF5' : '#E5E7EB', color: puedeAvanzar() ? '#FFFFFF' : '#6B7280', cursor: puedeAvanzar() ? 'pointer' : 'default' }}>
                Siguiente
              </button>
            )}
            {paso === 2 && (
              <button onClick={handleAvanzarA3} disabled={!puedeAvanzar()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-sm font-medium transition-all"
                style={{ background: puedeAvanzar() ? '#0A5CF5' : '#E5E7EB', color: puedeAvanzar() ? '#FFFFFF' : '#6B7280', cursor: puedeAvanzar() ? 'pointer' : 'default' }}>
                Generar resumen
              </button>
            )}
            {paso === 3 && (
              <button onClick={handleAceptar}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-sm font-medium text-white transition-all"
                style={{ background: '#008660' }}
                onMouseEnter={e => e.currentTarget.style.background = '#005E43'}
                onMouseLeave={e => e.currentTarget.style.background = '#008660'}>
                Generar índice
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex-shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
        <div className="h-1" style={{ background: '#E5E7EB' }}>
          <div className="h-full rounded-r-full transition-all"
            style={{ width: `${(paso / COORD_TOTAL_PASOS) * 100}%`, background: '#367CFF', transition: 'width 400ms ease' }} />
        </div>
        <div className="flex items-center justify-center gap-2 py-3">
          {[1, 2, 3].map((n, idx) => {
            const done = n < paso
            const current = n === paso
            return (
              <div key={n} className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center rounded-full flex-shrink-0 transition-all"
                    style={{ width: '22px', height: '22px', background: done ? '#008660' : current ? '#367CFF' : '#F1F5F9' }}>
                    {done
                      ? <Check size={11} style={{ color: '#FFFFFF' }} />
                      : <span style={{ fontSize: '10px', fontWeight: '700', color: current ? '#FFFFFF' : '#CBD5E1' }}>{n}</span>
                    }
                  </div>
                  <span className="text-xs font-medium hidden sm:block"
                    style={{ color: done ? '#008660' : current ? '#367CFF' : '#CBD5E1' }}>
                    {COORD_PASO_LABELS[n]}
                  </span>
                </div>
                {idx < 2 && (
                  <div className="h-px" style={{ width: '28px', background: done ? '#008660' : '#E5E7EB', transition: 'background 400ms ease' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 min-h-0 ${paso === 2 || (paso === 3 && resumenPreview) ? 'flex overflow-hidden' : 'overflow-y-auto'}`}>
        {(generando || generandoPreview) ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse" style={{ background: '#E7EFFE' }}>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>
                {generandoPreview ? 'Generando vista previa…' : 'Generando índice de temas…'}
              </p>
              <p className="text-xs" style={{ color: '#6B7280' }}>La IA está procesando tu solicitud…</p>
            </div>
            <div className="flex gap-1.5 mt-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{ background: '#367CFF', animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        ) : paso === 2 ? (
          <>
            <div className="flex-1 overflow-y-auto px-8 py-8" style={{ background: '#FFFFFF' }}>
              <PasoDefinicionTematica datos={datos} onChange={updateDatos} />
            </div>
            <div style={{ width: '320px', minWidth: '320px', borderLeft: '1px solid #E5E7EB', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <PanelIA
                historialInicial={[]}
                temaLabel="Definición temática"
                onCerrar={null}
                quotePendiente={null}
                onQuoteConsumed={null}
              />
            </div>
          </>
        ) : paso === 3 && resumenPreview ? (
          <>
            <div className="flex-1 overflow-y-auto py-8 px-6">
              <div className="mx-auto rounded-2xl overflow-hidden" style={{ maxWidth: '720px', background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                <div className="px-8 py-8">
                  <PasoPreviewResumen resumenPreview={resumenPreview} onResumenChange={setResumenPreview} />
                </div>
              </div>
            </div>
            <PanelIA
              historialInicial={[{ id: 1, rol: 'ia', mensaje: 'He generado el resumen preliminar de la asignatura. Puedes pedirme que modifique la descripción, ajuste los objetivos, cambie el enfoque o cualquier otro aspecto antes de continuar.' }]}
              temaLabel="Vista previa"
              onCerrar={null}
              quotePendiente={null}
              onQuoteConsumed={null}
            />
          </>
        ) : (
          <div className="overflow-y-auto py-8 px-6" style={{ background: '#F8F9FA' }}>
            <div className="mx-auto rounded-2xl overflow-hidden" style={{ maxWidth: '680px', background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
              <div className="px-8 py-8">
                {paso === 1 && <PasoContextoAcademico datos={datos} onChange={updateDatos} />}
              </div>
            </div>
          </div>
        )}
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

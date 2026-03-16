import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronDown, Plus, MessageSquare, Eye, Sparkles, X, Lock, Wand2, ShieldCheck, BookOpenCheck, Check, ToggleLeft, ToggleRight, StickyNote, Pencil, Trash2, RefreshCw, ArrowUpRight, FlaskConical, BrainCircuit, Mic, Save, Layers, BookOpen, Link, Send, ExternalLink, AlertTriangle } from 'lucide-react'
import PipelineSidebar from '../components/PipelineSidebar'
import BloqueContenido from '../components/BloqueContenido'
import PanelIA from '../components/PanelIA'
import ComentarioHilo from '../components/ComentarioHilo'
import StatusIndicator, { toStatusKey } from '../components/StatusIndicator'
import EtiquetaBloque from '../components/EtiquetaBloque'
import { ProdiMark } from '../components/ProdiLogo'
import {
  bloquesTema2,
  bloquesTema1,
  bloquesTema3,
  bloquesTema4,
  bloquesIndice,
  dlBloquesIndice,
  instruccionesTema1,
  instruccionesTema2,
  instruccionesTema3,
  instruccionesTema4,
  instruccionesTema5,
  instruccionesTema6,
  chatHistorialTema2,
  chatHistorialTema1,
  recursosChainingThoughts,
  recursosReferencesPool,
  recursosRefinementSuggestions,
  dlIndicacionesDidacticasT1,
  dlResumenTema1,
  dlBloquesTema1,
  citacionesPorTema,
  citacionesPorTemaDL,
} from '../mockData'

const SECCION_CONFIG = {
  // ─ Global ─
  resumen: {
    label: 'Resumen general',
    labelCorto: 'Resumen',
    estado: 'aprobado',
    bloques: [],
    chat: [],
  },
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
    estado: 'aprobado',
    bloques: bloquesTema1,
    chat: chatHistorialTema1,
  },
  'referencias-t1': {
    label: 'Referencias bibliográficas · Tema 1',
    labelCorto: 'Referencias T1',
    estado: 'borrador',
    bloques: [],
    chat: chatHistorialTema1,
  },
  'recursos-t1': {
    label: 'A fondo · Tema 1',
    labelCorto: 'A fondo T1',
    estado: 'borrador',
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
    estado: 'aprobado',
    bloques: bloquesTema2,
    chat: chatHistorialTema2,
  },
  'referencias-t2': {
    label: 'Referencias bibliográficas · Tema 2',
    labelCorto: 'Referencias T2',
    estado: 'revision',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'recursos-t2': {
    label: 'A fondo · Tema 2',
    labelCorto: 'A fondo T2',
    estado: 'revision',
    bloques: [],
    chat: chatHistorialTema2,
  },
  // ─ Tema 3 ─
  'instrucciones-t3': {
    label: 'Instrucciones didácticas · Tema 3',
    labelCorto: 'Instrucciones T3',
    estado: 'aprobado',
    bloques: instruccionesTema3,
    chat: chatHistorialTema2,
  },
  t3: {
    label: 'Temario · Tema 3',
    labelCorto: 'Temario T3',
    estado: 'comentarios',
    bloques: bloquesTema3,
    chat: chatHistorialTema2,
  },
  'referencias-t3': {
    label: 'Referencias bibliográficas · Tema 3',
    labelCorto: 'Referencias T3',
    estado: 'comentarios',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'recursos-t3': {
    label: 'A fondo · Tema 3',
    labelCorto: 'A fondo T3',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  // ─ Temas 4-6 (locked — sequential progression) ─
  'instrucciones-t4': {
    label: 'Instrucciones didácticas · Tema 4',
    labelCorto: 'Instrucciones T4',
    estado: 'bloqueado',
    bloques: instruccionesTema4,
    chat: chatHistorialTema2,
  },
  t4: {
    label: 'Temario · Tema 4',
    labelCorto: 'Temario T4',
    estado: 'bloqueado',
    bloques: bloquesTema4,
    chat: chatHistorialTema2,
  },
  'referencias-t4': {
    label: 'Referencias bibliográficas · Tema 4',
    labelCorto: 'Referencias T4',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'recursos-t4': {
    label: 'A fondo · Tema 4',
    labelCorto: 'A fondo T4',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'instrucciones-t5': {
    label: 'Instrucciones didácticas · Tema 5',
    labelCorto: 'Instrucciones T5',
    estado: 'bloqueado',
    bloques: instruccionesTema5,
    chat: chatHistorialTema2,
  },
  t5: {
    label: 'Temario · Tema 5',
    labelCorto: 'Temario T5',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'referencias-t5': {
    label: 'Referencias bibliográficas · Tema 5',
    labelCorto: 'Referencias T5',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'recursos-t5': {
    label: 'A fondo · Tema 5',
    labelCorto: 'A fondo T5',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'instrucciones-t6': {
    label: 'Instrucciones didácticas · Tema 6',
    labelCorto: 'Instrucciones T6',
    estado: 'bloqueado',
    bloques: instruccionesTema6,
    chat: chatHistorialTema2,
  },
  t6: {
    label: 'Temario · Tema 6',
    labelCorto: 'Temario T6',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'referencias-t6': {
    label: 'Referencias bibliográficas · Tema 6',
    labelCorto: 'Referencias T6',
    estado: 'bloqueado',
    bloques: [],
    chat: chatHistorialTema2,
  },
  'recursos-t6': {
    label: 'A fondo · Tema 6',
    labelCorto: 'A fondo T6',
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
          style={{ background: '#E7EFFE' }}
        >
          <Sparkles size={24} style={{ color: '#367CFF' }} />
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
              style={{ background: '#367CFF', animationDelay: `${i * 0.15}s` }}
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
          style={{ background: '#E7EFFE' }}
        >
          <Sparkles size={24} style={{ color: '#367CFF' }} />
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
              style={{ background: '#367CFF', animationDelay: `${i * 0.15}s` }}
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
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: '#E7EFFE' }}>
            <Sparkles size={11} style={{ color: '#367CFF' }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: '#367CFF' }}>Índice generado por IA · Solo lectura</span>
        </div>
        <div className="space-y-3">
          {indice.map((tema, i) => (
            <div key={i} className="py-1.5">
              <div className="flex items-start gap-3 mb-1.5">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                >
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#9CA3AF' }}>{i + 1}</span>
                </div>
                <span className="text-sm font-semibold" style={{ color: '#374151' }}>
                  {typeof tema === 'string' ? tema.replace(/^Tema \d+: /, '') : tema.titulo}
                </span>
              </div>
              {tema.epigrafes && (
                <div className="ml-8 space-y-0.5">
                  {tema.epigrafes.map((ep, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span style={{ fontSize: '10px', color: '#D1D5DB' }}>—</span>
                      <span className="text-xs" style={{ color: '#6B7280' }}>{ep}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI hint */}
      <div
        className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg mb-6"
        style={{ background: '#E7EFFE', border: '1px solid #BAD2FF' }}
      >
        <Sparkles size={12} style={{ color: '#367CFF', flexShrink: 0, marginTop: '2px' }} />
        <p className="text-xs" style={{ color: '#0047CC', lineHeight: '1.5' }}>
          El índice se ha generado en base al área temática y los contenidos indicados. Podrás reorganizar y editar los temas desde el Canvas.
        </p>
      </div>

      {/* Next step CTA */}
      <button
        onClick={handleGenerarResumen}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-[10px] text-sm font-semibold transition-all"
        style={{ background: '#367CFF', color: '#FFFFFF' }}
        onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
        onMouseLeave={e => e.currentTarget.style.background = '#367CFF'}
      >
        <Sparkles size={14} />
        Generar resumen de la asignatura
        <ChevronRight size={14} />
      </button>
    </div>
  )
}

// ─── Índice fijo (sección aprobada, vista normal) ─────────────────────────────

// ─── Recursos a Fondo ─────────────────────────────────────────────────────────

const RELEVANCE_CONFIG = {
  high:   { label: 'Alta relevancia',  bg: '#DCFCE7', color: '#16A34A', border: '#BBF7D0' },
  medium: { label: 'Media relevancia', bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
  low:    { label: 'Baja relevancia',  bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' },
}

const SOURCE_LABELS = { journal: 'Revista', book: 'Libro', conference: 'Conferencia', article: 'Artículo' }

// Shared loading screen (chain-of-thought)
function RecursosLoadingScreen({ onCancel }) {
  const [thoughtStep, setThoughtStep] = useState(0)
  useEffect(() => {
    let cancelled = false
    let i = 0
    const tick = () => {
      if (cancelled) return
      setThoughtStep(i); i++
      if (i < recursosChainingThoughts.length) setTimeout(tick, 520)
      else setTimeout(() => { if (!cancelled) onCancel() }, 600)
    }
    setTimeout(tick, 300)
    return () => { cancelled = true }
  }, [])
  const current = recursosChainingThoughts[thoughtStep] || recursosChainingThoughts[recursosChainingThoughts.length - 1]
  const pct = Math.round(((thoughtStep + 1) / recursosChainingThoughts.length) * 100)
  return (
    <div className="rounded-xl p-8" style={{ border: '1px solid #E5E7EB', background: '#FAFAFA' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center animate-pulse" style={{ background: '#E7EFFE' }}>
          <Sparkles size={16} style={{ color: '#367CFF' }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Generando referencias académicas…</p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>Paso {current.step} de {current.total}</p>
        </div>
        <button
          onClick={onCancel}
          className="ml-auto text-xs px-3 py-1.5 rounded-lg transition-colors"
          style={{ color: '#6B7280', border: '1px solid #E5E7EB', background: '#FFFFFF' }}
          onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
          onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
        >
          Cancelar
        </button>
      </div>
      <div className="rounded-full overflow-hidden mb-5" style={{ height: 4, background: '#E5E7EB' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: '#367CFF' }} />
      </div>
      <div className="space-y-2">
        {recursosChainingThoughts.slice(0, thoughtStep + 1).map((t, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="flex-shrink-0 mt-0.5">
              {i < thoughtStep
                ? <Check size={13} style={{ color: '#16A34A' }} />
                : <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#367CFF' }} />
              }
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: i < thoughtStep ? '#6B7280' : '#1A1A1A' }}>{t.text}</p>
              {i === thoughtStep && <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{t.detail}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Shared reference card
function RefCard({ data: r, idx, showDelete, showRegenerate, showEdit, onDelete, onRegenerate, onEdit, regeneratingId }) {
  const rel = RELEVANCE_CONFIG[r.relevance] || RELEVANCE_CONFIG.medium
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(r)

  const handleSave = () => {
    onEdit?.(r.id, draft)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="rounded-xl px-4 py-3.5" style={{ border: '1px solid #367CFF', background: '#FFFFFF' }}>
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold" style={{ background: '#F3F4F6', color: '#6B7280' }}>
            {idx + 1}
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <input
              className="w-full text-sm font-semibold rounded-lg px-2.5 py-1.5 outline-none"
              style={{ border: '1px solid #E5E7EB', color: '#1A1A1A', caretColor: '#367CFF' }}
              value={draft.title}
              onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
              placeholder="Título"
            />
            <input
              className="w-full text-xs rounded-lg px-2.5 py-1.5 outline-none"
              style={{ border: '1px solid #E5E7EB', color: '#6B7280', caretColor: '#367CFF' }}
              value={draft.authors.join(', ')}
              onChange={e => setDraft(d => ({ ...d, authors: e.target.value.split(',').map(a => a.trim()) }))}
              placeholder="Autores (separados por coma)"
            />
            <div className="flex gap-2">
              <input
                className="w-20 text-xs rounded-lg px-2.5 py-1.5 outline-none"
                style={{ border: '1px solid #E5E7EB', color: '#6B7280', caretColor: '#367CFF' }}
                value={draft.year}
                onChange={e => setDraft(d => ({ ...d, year: e.target.value }))}
                placeholder="Año"
              />
              <input
                className="flex-1 text-xs rounded-lg px-2.5 py-1.5 outline-none"
                style={{ border: '1px solid #E5E7EB', color: '#6B7280', caretColor: '#367CFF' }}
                value={draft.url}
                onChange={e => setDraft(d => ({ ...d, url: e.target.value }))}
                placeholder="URL"
              />
            </div>
            <textarea
              className="w-full text-sm leading-relaxed rounded-lg px-2.5 py-1.5 outline-none resize-none"
              style={{ border: '1px solid #E5E7EB', color: '#374151', caretColor: '#367CFF' }}
              rows={3}
              value={draft.description}
              onChange={e => setDraft(d => ({ ...d, description: e.target.value }))}
              placeholder="Descripción"
            />
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => { setDraft(r); setEditing(false) }}
                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                style={{ background: '#F3F4F6', color: '#6B7280' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
              >Cancelar</button>
              <button
                onClick={handleSave}
                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all text-white"
                style={{ background: '#367CFF' }}
                onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#367CFF'}
              >Guardar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-xl px-4 py-3.5 transition-all"
      style={{ border: '1px solid #E5E7EB', background: '#FFFFFF' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#D1D5DB'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}
    >
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold" style={{ background: '#F3F4F6', color: '#6B7280' }}>
          {idx + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <a href={r.url} target="_blank" rel="noopener noreferrer"
              className="text-sm font-semibold leading-snug hover:underline flex items-center gap-1"
              style={{ color: '#367CFF' }}
            >
              {draft.title}
              <ExternalLink size={11} style={{ flexShrink: 0, opacity: 0.6 }} />
            </a>
            <div className="flex items-center gap-1 flex-shrink-0">
              {showEdit && (
                <button
                  onClick={() => setEditing(true)}
                  className="p-1 rounded transition-colors"
                  style={{ color: '#D1D5DB' }}
                  title="Editar referencia"
                  onMouseEnter={e => e.currentTarget.style.color = '#374151'}
                  onMouseLeave={e => e.currentTarget.style.color = '#D1D5DB'}
                >
                  <Pencil size={13} />
                </button>
              )}
              {showRegenerate && (
                <button
                  onClick={() => onRegenerate(r.id)}
                  disabled={regeneratingId === r.id}
                  className="p-1 rounded transition-colors"
                  style={{ color: '#D1D5DB' }}
                  title="Regenerar esta referencia"
                  onMouseEnter={e => e.currentTarget.style.color = '#367CFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#D1D5DB'}
                >
                  {regeneratingId === r.id
                    ? <div className="w-3 h-3 rounded-full border-2 border-indigo-300 border-t-indigo-600 animate-spin" />
                    : <RefreshCw size={13} />
                  }
                </button>
              )}
              {showDelete && (
                <button
                  onClick={() => onDelete(r.id)}
                  className="p-1 rounded transition-colors"
                  style={{ color: '#D1D5DB' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                  onMouseLeave={e => e.currentTarget.style.color = '#D1D5DB'}
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          </div>
          <p className="text-xs mb-1.5" style={{ color: '#9CA3AF' }}>
            {draft.authors.join(', ')} · {SOURCE_LABELS[r.source] || r.source} · {draft.year}
          </p>
          <p className="text-sm leading-relaxed mb-2" style={{ color: '#374151' }}>{draft.description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: rel.bg, color: rel.color, border: `1px solid ${rel.border}` }}>
              {rel.label}
            </span>
            <a href={draft.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs hover:underline" style={{ color: '#9CA3AF' }}>
              <Link size={10} />
              {draft.url.length > 50 ? draft.url.slice(0, 50) + '…' : draft.url}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function SeccionRecursosAFondo({ estado, initialScreen, editable }) {
  // estado: 'aprobado' | 'borrador'
  // initialScreen: 'list' (T1/T2 have refs) | 'idle' (T3 has none yet)
  // T1 aprobado+list: read-only, request-edit banner
  // T2 borrador+list: individual regen per card, no chat/save
  // T3 borrador+idle: generate CTA → loading → list+chat
  // T4 bloqueado: handled above render tree, never reaches here
  const isAprobado = estado === 'aprobado'

  const [screen, setScreen] = useState(initialScreen || (isAprobado ? 'list' : 'idle'))
  const [refs, setRefs] = useState(initialScreen === 'list' || isAprobado ? recursosReferencesPool.slice(0, 10) : [])
  const [deletedIds, setDeletedIds] = useState([])
  const [regeneratingId, setRegeneratingId] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [chatLoading, setChatLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])

  const visibleRefs = refs.filter(r => !deletedIds.includes(r.id))

  const handleDelete = (id) => setDeletedIds(prev => [...prev, id])

  const handleEditRef = (id, updated) => setRefs(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r))

  const handleRegenerateOne = (id) => {
    setRegeneratingId(id)
    setTimeout(() => {
      const pool = recursosReferencesPool.filter(r => !refs.find(existing => existing.id === r.id) || r.id === id)
      const replacement = pool[Math.floor(Math.random() * pool.length)] || refs.find(r => r.id === id)
      setRefs(prev => prev.map(r => r.id === id ? { ...replacement, id } : r))
      setRegeneratingId(null)
    }, 1200)
  }

  const handleSendChat = () => {
    const text = chatInput.trim()
    if (!text) return
    setChatHistory(prev => [...prev, { role: 'user', text }])
    setChatInput('')
    setChatLoading(true)
    setTimeout(() => {
      const responses = [
        `Entendido. Aplicando el criterio "${text}" a las referencias actuales. He ajustado 3 referencias para alinearse mejor con tu solicitud.`,
        `Perfecto. He regenerado las referencias teniendo en cuenta: "${text}". Las referencias 2, 5 y 8 han sido reemplazadas.`,
        `Realizado. El criterio "${text}" ha sido aplicado. Las referencias priorizan ahora lo que has indicado.`,
      ]
      setChatHistory(prev => [...prev, { role: 'ai', text: responses[Math.floor(Math.random() * responses.length)] }])
      setChatLoading(false)
    }, 1400)
  }

  // ── Screen: idle (T3 — no refs yet, author triggers generation) ──
  if (screen === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center py-16 rounded-xl" style={{ border: '1px dashed #D1D5DB', background: '#FAFAFA' }}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#E7EFFE' }}>
          <BookOpen size={20} style={{ color: '#367CFF' }} />
        </div>
        <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>Sin referencias generadas</p>
        <p className="text-xs mb-5 text-center max-w-xs" style={{ color: '#9CA3AF' }}>
          La IA buscará 10 referencias académicas relevantes para este tema a partir del temario aprobado.
        </p>
        {editable && (
          <button
            onClick={() => setScreen('loading')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-sm font-semibold text-white transition-all"
            style={{ background: '#367CFF' }}
            onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
            onMouseLeave={e => e.currentTarget.style.background = '#367CFF'}
          >
            <Sparkles size={14} /> Generar referencias con IA
          </button>
        )}
      </div>
    )
  }

  // ── Screen: loading (chain-of-thought) ──
  if (screen === 'loading') {
    return (
      <RecursosLoadingScreen onCancel={() => {
        setRefs(recursosReferencesPool.slice(0, 10))
        setDeletedIds([])
        setScreen('list')
      }} />
    )
  }

  // ── Screen: list ──
  //          T3 (post-generation) = same but was idle before → same behavior as T2

  return (
    <div>
      {/* Editable action hint */}
      {editable && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#E0F2FE' }}>
            <Wand2 size={14} style={{ color: '#0284C7' }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold" style={{ color: '#0C4A6E' }}>Edición libre</p>
            <p className="text-xs" style={{ color: '#0369A1' }}>Edita, regenera o elimina cada referencia individualmente con los iconos en cada tarjeta.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{visibleRefs.length} referencias académicas</p>
          <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>Borrador · Puedes editar, regenerar o eliminar referencias individualmente</p>
        </div>
      </div>

      {/* Reference cards */}
      <div className="space-y-2 mb-6">
        {visibleRefs.map((r, i) => (
          <RefCard
            key={r.id}
            data={r}
            idx={i}
            showEdit={editable}
            showDelete={editable}
            showRegenerate={editable}
            onEdit={handleEditRef}
            onDelete={handleDelete}
            onRegenerate={handleRegenerateOne}
            regeneratingId={regeneratingId}
          />
        ))}
      </div>

      {/* Screen 3: Refinement chat — only for T3 (post-generation, borrador) */}
      {!isAprobado && editable && screen === 'chat' && (
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ background: '#F8F9FA', borderBottom: '1px solid #E5E7EB' }}>
            <div className="flex items-center gap-2">
              <Sparkles size={13} style={{ color: '#367CFF' }} />
              <span className="text-xs font-semibold" style={{ color: '#367CFF' }}>Refinar referencias con IA</span>
            </div>
            <button onClick={() => setScreen('list')} className="p-1 rounded hover:bg-gray-200 transition-colors">
              <X size={13} style={{ color: '#6B7280' }} />
            </button>
          </div>
          <div className="px-4 py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
            <p className="text-xs mb-2" style={{ color: '#9CA3AF' }}>Sugerencias rápidas:</p>
            <div className="flex flex-wrap gap-1.5">
              {recursosRefinementSuggestions.map(s => (
                <button key={s} onClick={() => setChatInput(s)}
                  className="text-xs px-2.5 py-1 rounded-full transition-all"
                  style={{ background: '#E7EFFE', color: '#367CFF', border: '1px solid #BAD2FF' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#BAD2FF'}
                  onMouseLeave={e => e.currentTarget.style.background = '#E7EFFE'}
                >{s}</button>
              ))}
            </div>
          </div>
          {chatHistory.length > 0 && (
            <div className="px-4 py-3 space-y-3 max-h-52 overflow-y-auto" style={{ borderBottom: '1px solid #F3F4F6' }}>
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#E7EFFE' }}>
                      <Sparkles size={10} style={{ color: '#367CFF' }} />
                    </div>
                  )}
                  <div className="text-xs leading-relaxed rounded-xl px-3 py-2 max-w-xs"
                    style={msg.role === 'user' ? { background: '#367CFF', color: '#FFFFFF' } : { background: '#F3F4F6', color: '#374151' }}
                  >{msg.text}</div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#E7EFFE' }}>
                    <Sparkles size={10} style={{ color: '#367CFF' }} />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-2 rounded-xl" style={{ background: '#F3F4F6' }}>
                    {[0,1,2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#9CA3AF', animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
          <div className="flex items-center gap-2 px-4 py-3">
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendChat() } }}
              placeholder="Pide un criterio específico para las referencias…"
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: '#374151', caretColor: '#367CFF' }}
            />
            <button
              onClick={handleSendChat}
              disabled={!chatInput.trim() || chatLoading}
              className="flex items-center justify-center w-7 h-7 rounded-lg transition-all flex-shrink-0"
              style={{ background: chatInput.trim() && !chatLoading ? '#367CFF' : '#E5E7EB' }}
            >
              <Send size={12} style={{ color: chatInput.trim() && !chatLoading ? '#FFFFFF' : '#9CA3AF' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Índice fijo (sección aprobada, vista normal) ─────────────────────────────

function SeccionIndiceFija({ bloques, resumenData }) {
  const [expandidos, setExpandidos] = useState({})
  const temaDescripciones = resumenData?.temasConDescripcion ?? []

  const toggleExpand = (id) => setExpandidos(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="space-y-3">
      {bloques.map((tema) => {
        const resumenTema = temaDescripciones.find(t => t.numero === tema.numero)
        const isExpanded = !!expandidos[tema.id]
        return (
          <div
            key={tema.id}
            className="rounded-xl transition-colors"
            style={{ border: '1px solid #E5E7EB', background: '#FFFFFF' }}
          >
            <div
              className="flex gap-4 px-5 py-4"
            >
              {/* Number badge */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold"
                style={{ background: '#E7EFFE', color: '#367CFF' }}
              >
                {tema.numero}
              </div>
              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug mb-2" style={{ color: '#111827' }}>
                  {tema.nombre ?? tema.titulo}
                </p>
                {tema.epigrafes ? (
                  <div className="space-y-0.5">
                    {tema.epigrafes.map((ep, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <span style={{ fontSize: '10px', color: '#D1D5DB' }}>—</span>
                        <span className="text-xs" style={{ color: '#6B7280' }}>{ep}</span>
                      </div>
                    ))}
                  </div>
                ) : tema.descripcion ? (
                  <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                    {tema.descripcion}
                  </p>
                ) : null}
              </div>
              {/* Expand toggle */}
              {resumenTema?.descripcion && (
                <button
                  onClick={() => toggleExpand(tema.id)}
                  className="flex items-center gap-1 flex-shrink-0 mt-0.5 text-xs font-medium rounded-md px-2 py-1 transition-colors"
                  style={{ color: isExpanded ? '#367CFF' : '#9CA3AF', background: isExpanded ? '#E7EFFE' : 'transparent' }}
                  onMouseEnter={e => { if (!isExpanded) { e.currentTarget.style.color = '#367CFF'; e.currentTarget.style.background = '#F5F8FF' } }}
                  onMouseLeave={e => { if (!isExpanded) { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.background = 'transparent' } }}
                  title={isExpanded ? 'Ocultar resumen' : 'Ver resumen del tema'}
                >
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span>Resumen</span>
                </button>
              )}
            </div>
            {/* Collapsible resumen */}
            {isExpanded && resumenTema?.descripcion && (
              <div
                className="px-5 pb-4"
                style={{ borderTop: '1px solid #F3F4F6', paddingTop: '12px', marginLeft: '48px' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}>Resumen del tema</p>
                <p className="text-xs leading-relaxed" style={{ color: '#374151' }}>{resumenTema.descripcion}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Resumen section component ────────────────────────────────────────────────

const DL_RESUMEN_DATA = {
  nombre: 'Deep Learning y Redes Neuronales',
  introduccion: 'La asignatura Deep Learning y Redes Neuronales introduce al estudiante en los fundamentos y aplicaciones del aprendizaje profundo dentro del campo de la inteligencia artificial. A lo largo del curso se analizan los principios que sustentan el funcionamiento de las redes neuronales artificiales y su capacidad para aprender patrones complejos a partir de datos. El enfoque combina bases conceptuales con una aproximación aplicada orientada a comprender cómo estos modelos se utilizan para resolver problemas en ámbitos como la visión por computador, el procesamiento del lenguaje natural o el análisis de grandes volúmenes de información.\n\nAsimismo, se estudian los procesos de entrenamiento de redes neuronales, las diferentes arquitecturas utilizadas en el aprendizaje profundo y los principales retos asociados a su desarrollo, como la necesidad de datos, la capacidad computacional o la interpretabilidad de los modelos. De esta forma, el estudiante adquiere una visión general del deep learning como una de las tecnologías más relevantes dentro de la inteligencia artificial contemporánea.',
  temasConDescripcion: [
    { numero: 1, titulo: 'Introducción al Deep Learning', descripcion: 'En este tema se va a tratar el concepto de deep learning y su relación con la inteligencia artificial y el machine learning. Se analizará la evolución histórica de las redes neuronales artificiales y los factores tecnológicos que han impulsado el desarrollo reciente del aprendizaje profundo. También se abordarán los fundamentos conceptuales que permiten comprender cómo los modelos de deep learning aprenden a partir de datos y cuáles son sus principales aplicaciones en distintos ámbitos tecnológicos.' },
    { numero: 2, titulo: 'Fundamentos de redes neuronales artificiales', descripcion: 'En este tema se va a tratar la estructura y funcionamiento de las redes neuronales artificiales como base del deep learning. Se estudiarán los componentes principales de una red neuronal, como las neuronas artificiales, las funciones de activación y la organización en capas. Asimismo, se analizará cómo estas redes procesan información y cómo se utilizan para modelar relaciones complejas dentro de los datos.' },
    { numero: 3, titulo: 'Entrenamiento de redes neuronales', descripcion: 'En este tema se va a tratar el proceso mediante el cual las redes neuronales aprenden a partir de datos. Se estudiarán conceptos fundamentales como la función de pérdida, el algoritmo de retropropagación y los métodos de optimización utilizados para ajustar los parámetros del modelo. Además, se analizarán algunos de los problemas más comunes que aparecen durante el entrenamiento, como el sobreajuste o la dificultad para generalizar los resultados.' },
    { numero: 4, titulo: 'Redes neuronales profundas', descripcion: 'En este tema se va a tratar el desarrollo de arquitecturas de redes neuronales profundas y su capacidad para aprender representaciones jerárquicas de los datos. Se estudiarán diferentes técnicas utilizadas para mejorar el rendimiento de estos modelos, como la regularización, la inicialización de pesos o la normalización de capas. Asimismo, se analizarán las ventajas y limitaciones de los modelos profundos en diferentes contextos de aplicación.' },
    { numero: 5, titulo: 'Redes neuronales convolucionales (CNN)', descripcion: 'En este tema se va a tratar el funcionamiento de las redes neuronales convolucionales, una de las arquitecturas más utilizadas en tareas de visión por computador. Se estudiarán los principios de las capas convolucionales, los mecanismos de pooling y las estructuras que permiten identificar patrones visuales en imágenes. También se analizarán algunas de las aplicaciones más relevantes de las CNN en el reconocimiento de imágenes y la clasificación visual.' },
    { numero: 6, titulo: 'Redes neuronales recurrentes (RNN)', descripcion: 'En este tema se va a tratar el uso de redes neuronales recurrentes para el análisis de datos secuenciales. Se estudiará cómo estas redes permiten modelar dependencias temporales dentro de secuencias de datos, como texto, audio o series temporales. Asimismo, se analizarán arquitecturas avanzadas como LSTM y GRU, que permiten mejorar el aprendizaje en secuencias largas y complejas.' },
    { numero: 7, titulo: 'Modelos generativos y aprendizaje profundo', descripcion: 'En este tema se va a tratar el desarrollo de modelos generativos basados en deep learning. Se estudiarán arquitecturas como los autoencoders y las redes generativas adversariales (GAN), así como su capacidad para generar nuevos datos a partir de los patrones aprendidos durante el entrenamiento. También se analizarán aplicaciones del aprendizaje generativo en ámbitos como la generación de imágenes, texto o contenido multimedia.' },
    { numero: 8, titulo: 'Aplicaciones avanzadas del Deep Learning', descripcion: 'En este tema se va a tratar el uso del deep learning en diferentes contextos de aplicación dentro de la inteligencia artificial. Se estudiarán ejemplos de uso en áreas como la visión artificial, el procesamiento del lenguaje natural y los sistemas inteligentes de toma de decisiones. Asimismo, se analizarán algunas tendencias actuales en el desarrollo de modelos de aprendizaje profundo y los desafíos futuros asociados a esta tecnología.' },
  ],
  tags: ['Deep Learning', 'Redes Neuronales', 'CNN', 'RNN', 'Transformers', 'IA Generativa'],
}

const FUNDML_RESUMEN_DATA = {
  nombre: 'Fundamentos de Machine Learning',
  introduccion: 'La asignatura Fundamentos de Machine Learning introduce al estudiante en los principios y métodos del aprendizaje automático dentro del campo de la inteligencia artificial. A lo largo del curso se analizan los algoritmos, paradigmas y flujos de trabajo que permiten a los sistemas aprender a partir de datos para resolver tareas de clasificación, regresión, agrupamiento y predicción.',
  objetivos: [
    'Comprender los fundamentos teóricos del machine learning y su relación con la estadística y la inteligencia artificial.',
    'Identificar y aplicar los principales algoritmos supervisados y no supervisados.',
    'Aplicar técnicas de preprocesamiento, validación y evaluación de modelos.',
    'Evaluar el potencial y las limitaciones del machine learning en distintos contextos tecnológicos y científicos.',
  ],
  extension: '12.000 palabras · 20 páginas (aproximadamente)',
  epigrafes: 'El tema se estructurará siguiendo los epígrafes aprobados en el índice: introducción al machine learning, aprendizaje supervisado, aprendizaje no supervisado, evaluación y validación de modelos, y aplicaciones prácticas. Cada epígrafe comenzará con una breve introducción conceptual y desarrollará los fundamentos que el estudiante debe comprender.\n\nA lo largo del tema se destacarán ideas esenciales como la diferencia entre aprendizaje supervisado y no supervisado, el papel del preprocesamiento de datos y los criterios de selección de modelos, utilizando recuadros de "punto clave" para facilitar la lectura.\n\nPara reforzar los contenidos, se incorporarán elementos visuales: esquemas del flujo de trabajo típico en machine learning, comparativas de algoritmos y ejemplos de casos de uso reales.',
}

function getResumenData(nombreAsignatura) {
  if (!nombreAsignatura) return DL_RESUMEN_DATA
  if (nombreAsignatura.toLowerCase().includes('machine learning') || nombreAsignatura.toLowerCase().includes('fund')) return FUNDML_RESUMEN_DATA
  if (nombreAsignatura.toLowerCase().includes('deep learning')) return DL_RESUMEN_DATA
  // Generic fallback: replace subject name in DL template
  return {
    ...DL_RESUMEN_DATA,
    nombre: nombreAsignatura,
    introduccion: `La asignatura ${nombreAsignatura} introduce al estudiante en los conceptos, métodos y aplicaciones fundamentales de esta disciplina dentro del campo de la inteligencia artificial. A lo largo del curso se analizan los principios teóricos y prácticos que permiten comprender y aplicar sus técnicas principales.`,
  }
}

function SeccionResumen({ nombreAsignatura, creacionData }) {
  const r = creacionData?.resumen ?? getResumenData(nombreAsignatura)
  const nombre = r.nombre ?? nombreAsignatura
  const descripcion = r.descripcion ?? r.introduccion
  const temas = r.temasConDescripcion ?? (r.temas ?? []).map((t, i) => ({ numero: i + 1, titulo: t, descripcion: null }))
  const tags = r.tags ?? []

  const Field = ({ label, children }) => (
    <div className="mb-8" style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '28px' }}>
      <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9CA3AF', letterSpacing: '0.07em' }}>{label}</p>
      {children}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto py-12 pl-16 pr-12" style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <div className="mb-10" style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '24px' }}>
        <p className="text-xs font-medium mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>
          {nombreAsignatura ?? nombre}
        </p>
        <h1 className="text-2xl font-semibold leading-snug" style={{ color: '#111827' }}>Resumen general</h1>
      </div>

      {/* Descripción */}
      <Field label="Descripción general">
        <p className="text-base leading-8" style={{ color: '#1F2937' }}>{descripcion}</p>
      </Field>

      {/* Estructura de temas */}
      <Field label="Estructura de temas propuesta">
        <div className="space-y-2">
          {temas.map((tema) => (
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
      </Field>

      {/* Etiquetas */}
      {tags.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9CA3AF', letterSpacing: '0.07em' }}>Etiquetas clave</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <span key={tag} className="inline-flex items-center rounded-full text-xs font-medium"
                style={{ background: '#E7EFFE', color: '#367CFF', border: '1px solid #BAD2FF', padding: '3px 10px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

// ─── Deep Learning: Instrucciones Didácticas T1 (two-part flow) ──────────────

function SeccionDLInstrucciones({ parte, datos, onChange, generandoResumen, onGenerarResumen, onGenerarContenido, dlGenerandoContenido, onVolverAInstrucciones }) {

  if (generandoResumen || dlGenerandoContenido) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse" style={{ background: '#E7EFFE' }}>
          <ProdiMark size={28} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>
            {dlGenerandoContenido ? 'Generando contenido del tema…' : 'Generando resumen del tema…'}
          </p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>La IA está procesando las instrucciones…</p>
        </div>
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#367CFF', animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    )
  }

  if (parte === 1) {
    return (
      <div className="space-y-6 max-w-2xl">
        {/* Header */}
        <div>
          <h3 className="text-base font-semibold mb-0.5" style={{ color: '#1A1A1A' }}>Instrucciones para la IA</h3>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>Proporciona contexto al asistente para generar el resumen del tema</p>
        </div>

        {/* Enfoque para la IA */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Enfoque para la IA</label>
          <textarea
            value={datos.enfoqueIA}
            onChange={e => onChange('enfoqueIA', e.target.value)}
            rows={3}
            className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none resize-none"
            style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', lineHeight: '1.6' }}
            onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
            onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
            onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
            onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
          />
        </div>

        {/* Bibliografía */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Bibliografía del tema</label>
          <textarea
            value={datos.bibliografiaT1}
            onChange={e => onChange('bibliografiaT1', e.target.value)}
            rows={4}
            className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none resize-none"
            style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', lineHeight: '1.6', fontFamily: "'Arial', sans-serif" }}
            onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
            onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
            onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
            onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
          />
        </div>

        {/* Notas pedagógicas */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Notas pedagógicas e instrucciones</label>
          <textarea
            value={datos.notasPedagogicas}
            onChange={e => onChange('notasPedagogicas', e.target.value)}
            rows={3}
            className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none resize-none"
            style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', lineHeight: '1.6' }}
            onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
            onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
            onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
            onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
          />
        </div>

        {/* AI hint */}
        <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl" style={{ background: '#E7EFFE', border: '1px solid #BAD2FF' }}>
          <ProdiMark size={14} className="flex-shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed" style={{ color: '#0047CC' }}>
            Al hacer clic en <strong>Generar resumen</strong>, el asistente analizará las instrucciones y creará un resumen estructurado del tema con objetivos, epígrafes e ideas didácticas.
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            className="px-4 py-2 rounded-lg text-xs font-medium transition-all"
            style={{ background: '#F1F5F9', color: '#374151' }}
            onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
            onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
          >
            Guardar borrador
          </button>
          <button
            onClick={onGenerarResumen}
            className="flex items-center gap-2 px-5 py-2 rounded-[10px] text-sm font-semibold text-white transition-all"
            style={{ background: '#367CFF' }}
            onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
            onMouseLeave={e => e.currentTarget.style.background = '#367CFF'}
          >
            <ProdiMark size={14} />
            Generar resumen del tema
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    )
  }

  // Part 2: Topic summary review
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>{dlResumenTema1.titulo}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: '#E7EFFE', color: '#367CFF', border: '1px solid #BAD2FF' }}>
              <ProdiMark size={10} /> Generado por IA
            </span>
          </div>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>Revisa la estructura antes de generar el contenido completo</p>
        </div>
      </div>

      {/* Introducción y objetivos */}
      <div className="rounded-xl p-4 space-y-2" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Introducción y objetivos</p>
        {dlResumenTema1.introduccionYObjetivos.split('\n\n').map((par, i) => (
          <p key={i} className="text-sm leading-relaxed" style={{ color: '#374151' }}>{par}</p>
        ))}
      </div>

      {/* Objetivos list */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Objetivos de aprendizaje</p>
        <div className="space-y-1.5">
          {dlResumenTema1.objetivos.map((obj, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: '#E7EFFE', color: '#367CFF' }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{obj}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Epígrafes */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9CA3AF' }}>Estructura propuesta del tema</p>
        <div className="space-y-3">
          {dlResumenTema1.epigrafes.map((ep, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold" style={{ color: '#367CFF' }}>Epígrafe {i + 1}</span>
                <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{ep.titulo}</span>
              </div>
              {ep.descripcion.split('\n\n').map((par, j) => (
                <p key={j} className="text-xs leading-relaxed mb-2" style={{ color: '#6B7280' }}>{par}</p>
              ))}
              <div className="mt-2 pt-2" style={{ borderTop: '1px solid #F1F5F9' }}>
                <p className="text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Ideas didácticas</p>
                <div className="flex flex-wrap gap-1.5">
                  {ep.ideasDidacticas.map((idea, k) => (
                    <span key={k} className="text-xs px-2 py-1 rounded-lg" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>{idea}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onVolverAInstrucciones}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all"
          style={{ background: '#F1F5F9', color: '#374151' }}
          onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
          onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
        >
          <ChevronRight size={12} style={{ transform: 'rotate(180deg)' }} />
          Volver a instrucciones
        </button>
        <button
          onClick={onGenerarContenido}
          className="flex items-center gap-2 px-5 py-2 rounded-[10px] text-sm font-semibold text-white transition-all"
          style={{ background: '#367CFF' }}
          onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
          onMouseLeave={e => e.currentTarget.style.background = '#367CFF'}
        >
          <ProdiMark size={14} />
          Generar contenido del tema
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}

// ─── Instrucciones generales (t1-t6) unified form + inline resumen ────────────

const TEMA_KEYWORDS = {
  1: ['Machine Learning', 'Supervisado', 'No supervisado', 'Pipeline', 'Overfitting', 'Bias-Variance'],
  2: ['Regresión lineal', 'Clasificación', 'KNN', 'Logística', 'MSE', 'F1-score'],
  3: ['Árboles de decisión', 'Random Forest', 'Ensemble', 'Gradient Boosting', 'XGBoost', 'Bagging'],
  4: ['Redes neuronales', 'Backpropagation', 'Activación', 'Capas ocultas', 'Perceptrón', 'Deep Learning'],
  5: ['Validación cruzada', 'Curva ROC', 'AUC', 'Regularización', 'Hyperparámetros', 'Grid Search'],
  6: ['Proyecto final', 'Pipeline completo', 'Producción', 'MLOps', 'Despliegue', 'Evaluación'],
}

function SeccionInstruccionesGeneral({ seccionId, datos, onChange, temaNum, temaLabel, resumenData, readOnly }) {
  const [archivosSimulados, setArchivosSimulados] = useState(datos.archivos || [])
  const [urls, setUrls] = useState(datos.urls || [''])
  const [expandidosMindMap, setExpandidosMindMap] = useState(false)

  const handleSimularSubida = () => {
    const nombres = ['bibliografia_tema.pdf', 'articulo_referencia.pdf', 'notas_didacticas.docx']
    const nuevo = nombres[archivosSimulados.length % nombres.length]
    if (!archivosSimulados.includes(nuevo)) {
      setArchivosSimulados(prev => {
        const next = [...prev, nuevo]
        onChange('archivos', next)
        return next
      })
    }
  }

  const handleAddUrl = () => {
    const next = [...urls, '']
    setUrls(next)
    onChange('urls', next)
  }
  const handleUrlChange = (i, val) => {
    const next = urls.map((u, idx) => idx === i ? val : u)
    setUrls(next)
    onChange('urls', next)
  }
  const handleRemoveUrl = (i) => {
    const next = urls.filter((_, idx) => idx !== i)
    setUrls(next.length ? next : [''])
    onChange('urls', next.length ? next : [''])
  }

  if (datos.generando) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse" style={{ background: '#E7EFFE' }}>
          <ProdiMark size={28} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>Generando resumen del tema…</p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>La IA está procesando las instrucciones…</p>
        </div>
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#367CFF', animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    )
  }

  // Part 2: resumen generated — show it below (form hidden)
  if (datos.resumenGenerado && resumenData) {
    const r = resumenData
    return (
      <div className="space-y-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>{temaLabel ?? `Tema ${temaNum}`}</h3>
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: '#E7EFFE', color: '#367CFF', border: '1px solid #BAD2FF' }}>
                <ProdiMark size={10} /> Generado por IA
              </span>
            </div>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>Revisa la estructura antes de generar el contenido completo</p>
          </div>
          {!readOnly && (
            <button
              onClick={() => onChange('_editarInstrucciones', true)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              style={{ background: '#F1F5F9', color: '#6B7280' }}
              onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
              onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
            >
              Editar instrucciones
            </button>
          )}
        </div>

        {/* Mind map toggle */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
          <button
            onClick={() => setExpandidosMindMap(p => !p)}
            className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
            style={{ background: expandidosMindMap ? '#F5F8FF' : '#F8F9FA' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F0F4FF'}
            onMouseLeave={e => e.currentTarget.style.background = expandidosMindMap ? '#F5F8FF' : '#F8F9FA'}
          >
            <div className="flex items-center gap-2">
              <BrainCircuit size={14} style={{ color: '#367CFF' }} />
              <span className="text-xs font-semibold" style={{ color: '#374151' }}>Mapa mental del tema</span>
            </div>
            {expandidosMindMap ? <ChevronDown size={14} style={{ color: '#9CA3AF' }} /> : <ChevronRight size={14} style={{ color: '#9CA3AF' }} />}
          </button>
          {expandidosMindMap && (
            <div className="px-4 py-5" style={{ background: '#FAFBFF', borderTop: '1px solid #E5E7EB' }}>
              {/* Static SVG mind map placeholder */}
              <svg viewBox="0 0 480 200" className="w-full" style={{ maxHeight: '180px' }}>
                {/* Center node */}
                <ellipse cx="240" cy="100" rx="54" ry="22" fill="#367CFF" />
                <text x="240" y="104" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">{temaLabel ?? `Tema ${temaNum}`}</text>
                {/* Branch lines + nodes */}
                {(r.epigrafes ?? []).slice(0, 4).map((ep, i) => {
                  const angles = [-130, -50, 50, 130]
                  const rad = (angles[i] * Math.PI) / 180
                  const nx = 240 + Math.cos(rad) * 130
                  const ny = 100 + Math.sin(rad) * 65
                  const lx = 240 + Math.cos(rad) * 95
                  const ly = 100 + Math.sin(rad) * 30
                  return (
                    <g key={i}>
                      <line x1={lx} y1={ly} x2={nx} y2={ny} stroke="#BAD2FF" strokeWidth="1.5" />
                      <ellipse cx={nx} cy={ny} rx="48" ry="16" fill="#E7EFFE" stroke="#BAD2FF" strokeWidth="1" />
                      <text x={nx} y={ny + 4} textAnchor="middle" fill="#0047CC" fontSize="8.5" fontWeight="500"
                        style={{ overflow: 'hidden' }}>
                        {(ep.titulo ?? ep).length > 18 ? (ep.titulo ?? ep).slice(0, 16) + '…' : (ep.titulo ?? ep)}
                      </text>
                    </g>
                  )
                })}
              </svg>
              <p className="text-xs text-center mt-1" style={{ color: '#9CA3AF' }}>Vista previa · Mapa generado por IA</p>
            </div>
          )}
        </div>

        {/* Introducción */}
        {r.introduccionYObjetivos && (
          <div className="rounded-xl p-4 space-y-2" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Introducción y objetivos</p>
            {r.introduccionYObjetivos.split('\n\n').map((par, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: '#374151' }}>{par}</p>
            ))}
          </div>
        )}

        {/* Objetivos */}
        {r.objetivos?.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>Objetivos de aprendizaje</p>
            <div className="space-y-1.5">
              {r.objetivos.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: '#E7EFFE', color: '#367CFF' }}>{i + 1}</span>
                  <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{obj}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Epígrafes con bibliografía */}
        {r.epigrafes?.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9CA3AF' }}>Estructura propuesta del tema</p>
            <div className="space-y-3">
              {r.epigrafes.map((ep, i) => (
                <EpigrafeConBibliografia key={i} ep={ep} index={i} />
              ))}
            </div>
          </div>
        )}

      </div>
    )
  }

  // Part 1: form
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h3 className="text-base font-semibold mb-0.5" style={{ color: '#1A1A1A' }}>Instrucciones para la IA</h3>
        <p className="text-xs" style={{ color: '#9CA3AF' }}>Proporciona contexto al asistente para generar el resumen del tema</p>
      </div>

      {readOnly && (
        <div className="flex items-center gap-2 text-xs px-3.5 py-2.5 rounded-xl" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', color: '#9CA3AF' }}>
          <Eye size={13} style={{ flexShrink: 0 }} />
          Solo lectura — solicita permiso de edición para modificar estas instrucciones
        </div>
      )}

      {/* Indicaciones para la IA */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Indicaciones para la IA</label>
        <textarea
          value={datos.indicacionesIA}
          onChange={readOnly ? undefined : e => onChange('indicacionesIA', e.target.value)}
          readOnly={readOnly}
          rows={3}
          className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none resize-none"
          style={{ border: '1px solid #CBD5E1', background: readOnly ? '#F8F9FA' : '#FFFFFF', color: '#334155', lineHeight: '1.6', cursor: readOnly ? 'default' : undefined }}
          onFocus={readOnly ? undefined : e => { e.target.style.borderColor = '#367CFF'; e.target.style.background = '#F8FAFC' }}
          onBlur={readOnly ? undefined : e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
          onMouseEnter={readOnly ? undefined : e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#367CFF' }}
          onMouseLeave={readOnly ? undefined : e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
        />
      </div>

      {/* Fuentes y bibliografía */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Fuentes y bibliografía</label>
        <p className="text-xs mb-2" style={{ color: '#9CA3AF' }}>Sube documentos o añade enlaces que la IA tendrá en cuenta para generar el contenido.</p>
        {/* Upload area */}
        <div
          onClick={readOnly ? undefined : handleSimularSubida}
          className="flex flex-col items-center justify-center gap-2 rounded-xl transition-colors px-4 py-5 mb-3"
          style={{ border: '1.5px dashed #CBD5E1', background: '#FAFBFC', cursor: readOnly ? 'default' : 'pointer' }}
          onMouseEnter={readOnly ? undefined : e => { e.currentTarget.style.borderColor = '#367CFF'; e.currentTarget.style.background = '#F5F8FF' }}
          onMouseLeave={readOnly ? undefined : e => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.background = '#FAFBFC' }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#E7EFFE' }}>
            <BookOpen size={15} style={{ color: '#367CFF' }} />
          </div>
          <p className="text-xs font-medium text-center" style={{ color: '#374151' }}>
            Arrastra archivos aquí o <span style={{ color: '#367CFF' }}>haz clic para subir</span>
          </p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>PDF, Docs, URL — máx. 25 MB</p>
        </div>
        {/* Uploaded files */}
        {archivosSimulados.length > 0 && (
          <div className="space-y-1.5 mb-3">
            {archivosSimulados.map((f, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}>
                <BookOpen size={12} style={{ color: '#367CFF' }} />
                <span className="text-xs flex-1 truncate" style={{ color: '#374151' }}>{f}</span>
                {!readOnly && (
                  <button onClick={() => setArchivosSimulados(prev => prev.filter((_, j) => j !== i))} style={{ color: '#9CA3AF' }}>
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {/* URL inputs */}
        <div className="space-y-2">
          {urls.map((url, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center flex-1 gap-2 px-3 py-2 rounded-[10px]" style={{ border: '1px solid #CBD5E1', background: '#FFFFFF' }}>
                <Link size={12} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                <input
                  type="url"
                  value={url}
                  onChange={readOnly ? undefined : e => handleUrlChange(i, e.target.value)}
                  readOnly={readOnly}
                  placeholder="https://…"
                  className="flex-1 text-xs outline-none bg-transparent"
                  style={{ color: '#374151', cursor: readOnly ? 'default' : undefined }}
                  onFocus={readOnly ? undefined : e => e.currentTarget.parentElement.style.borderColor = '#367CFF'}
                  onBlur={readOnly ? undefined : e => e.currentTarget.parentElement.style.borderColor = '#CBD5E1'}
                />
              </div>
              {!readOnly && urls.length > 1 && (
                <button onClick={() => handleRemoveUrl(i)} className="flex-shrink-0" style={{ color: '#9CA3AF' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                  onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          {!readOnly && (
            <button
              onClick={handleAddUrl}
              className="flex items-center gap-1.5 text-xs font-medium mt-1"
              style={{ color: '#367CFF' }}
              onMouseEnter={e => e.currentTarget.style.color = '#2563EB'}
              onMouseLeave={e => e.currentTarget.style.color = '#367CFF'}
            >
              <Plus size={13} /> Añadir enlace
            </button>
          )}
        </div>
      </div>

      {/* Notas pedagógicas */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Notas pedagógicas e instrucciones</label>
        <textarea
          value={datos.notasPedagogicas}
          onChange={readOnly ? undefined : e => onChange('notasPedagogicas', e.target.value)}
          readOnly={readOnly}
          rows={3}
          className="w-full px-[13px] py-[9px] rounded-[10px] text-sm outline-none resize-none"
          style={{ border: '1px solid #CBD5E1', background: readOnly ? '#F8F9FA' : '#FFFFFF', color: '#334155', lineHeight: '1.6', cursor: readOnly ? 'default' : undefined }}
          onFocus={readOnly ? undefined : e => { e.target.style.borderColor = '#367CFF'; e.target.style.background = '#F8FAFC' }}
          onBlur={readOnly ? undefined : e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
          onMouseEnter={readOnly ? undefined : e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#367CFF' }}
          onMouseLeave={readOnly ? undefined : e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
        />
      </div>

      {/* AI hint */}
      {!readOnly && (
        <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl" style={{ background: '#E7EFFE', border: '1px solid #BAD2FF' }}>
          <ProdiMark size={14} className="flex-shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed" style={{ color: '#0047CC' }}>
            Al hacer clic en <strong>Generar resumen</strong>, el asistente analizará las instrucciones y creará un resumen estructurado del tema con objetivos, epígrafes e ideas didácticas.
          </p>
        </div>
      )}

    </div>
  )
}

// ─── Epígrafe con bibliografía (used in instrucciones resumen view) ────────────

function EpigrafeConBibliografia({ ep, index }) {
  const [mostrarAddRef, setMostrarAddRef] = useState(false)
  const [refUrl, setRefUrl] = useState('')
  const [refDoi, setRefDoi] = useState('')
  const [refUso, setRefUso] = useState('')

  return (
    <div className="rounded-xl p-4" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold" style={{ color: '#367CFF' }}>Epígrafe {index + 1}</span>
        <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{ep.titulo}</span>
      </div>
      {ep.descripcion && ep.descripcion.split('\n\n').map((par, j) => (
        <p key={j} className="text-xs leading-relaxed mb-2" style={{ color: '#6B7280' }}>{par}</p>
      ))}
      {ep.ideasDidacticas?.length > 0 && (
        <div className="mt-2 pt-2" style={{ borderTop: '1px solid #F1F5F9' }}>
          <p className="text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Ideas didácticas</p>
          <div className="flex flex-wrap gap-1.5">
            {ep.ideasDidacticas.map((idea, k) => (
              <span key={k} className="text-xs px-2 py-1 rounded-lg" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>{idea}</span>
            ))}
          </div>
        </div>
      )}
      {/* Bibliography section */}
      <div className="mt-3 pt-3" style={{ borderTop: '1px solid #F1F5F9' }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#9CA3AF' }}>Bibliografía</p>
          <button
            onClick={() => setMostrarAddRef(p => !p)}
            className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg transition-all"
            style={{ color: '#367CFF', background: mostrarAddRef ? '#E7EFFE' : 'transparent', border: '1px solid transparent' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E7EFFE'; e.currentTarget.style.borderColor = '#BAD2FF' }}
            onMouseLeave={e => { if (!mostrarAddRef) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' } }}
          >
            <Plus size={11} /> Añadir referencia
          </button>
        </div>
        {/* Empty state */}
        <p className="text-xs italic" style={{ color: '#CBD5E1' }}>Sin referencias añadidas. Usa el botón para agregar fuentes bibliográficas.</p>
        {/* Add reference form */}
        {mostrarAddRef && (
          <div className="mt-3 space-y-2 p-3 rounded-lg" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>URL</label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ border: '1px solid #CBD5E1', background: '#FFFFFF' }}>
                <Link size={11} style={{ color: '#9CA3AF' }} />
                <input type="url" value={refUrl} onChange={e => setRefUrl(e.target.value)} placeholder="https://…"
                  className="flex-1 text-xs outline-none bg-transparent" style={{ color: '#374151' }} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>DOI</label>
              <input type="text" value={refDoi} onChange={e => setRefDoi(e.target.value)} placeholder="10.xxxx/…"
                className="w-full px-3 py-2 rounded-lg text-xs outline-none" style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#374151' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>¿Para qué se usa esta fuente?</label>
              <input type="text" value={refUso} onChange={e => setRefUso(e.target.value)} placeholder="Ej. Marco teórico del epígrafe…"
                className="w-full px-3 py-2 rounded-lg text-xs outline-none" style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#374151' }} />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button onClick={() => setMostrarAddRef(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: '#F1F5F9', color: '#374151' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}>
                Cancelar
              </button>
              <button onClick={() => { setMostrarAddRef(false); setRefUrl(''); setRefDoi(''); setRefUso('') }}
                className="px-3 py-1.5 rounded-[10px] text-xs font-semibold text-white transition-all"
                style={{ background: '#367CFF' }}
                onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#367CFF'}>
                Guardar referencia
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Referencias bibliográficas section ───────────────────────────────────────

function RefBibCard({ ref: r, temaNum, onNavigateToContent }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  return (
    <div
      id={`ref-${r.num}-t${temaNum}`}
      className="rounded-2xl px-5 py-4"
      style={{ border: '1px solid #E5E7EB', background: '#FFFFFF', transition: 'border-color 0.12s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#D1D5DB'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: '#EFF6FF', color: '#2563EB' }}
        >
          Bibliografía del tema
        </span>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: '#9CA3AF' }}
            onMouseEnter={e => e.currentTarget.style.color = '#374151'}
            onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
            title="Editar referencia"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: '#9CA3AF' }}
            onMouseEnter={e => e.currentTarget.style.color = '#374151'}
            onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
            title="Eliminar referencia"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* APA citation */}
      <p className="text-sm leading-relaxed mb-3" style={{ color: '#1F2937' }}>
        <ApaFormattedText text={r.apaFormatted} />
      </p>

      {/* Extracto blockquote */}
      {r.extracto && (
        <div
          className="rounded-xl px-4 py-3 mb-3"
          style={{ background: '#F0F6FF', borderLeft: '3px solid #93C5FD' }}
        >
          <p className="text-sm italic leading-relaxed" style={{ color: '#374151' }}>
            {r.extracto}
          </p>
        </div>
      )}

      {/* Epígrafe + actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {r.epigrafe ? (
          <div className="flex items-center gap-1.5">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ border: '1.5px solid #9CA3AF' }}
            >
              <div className="w-1 h-1 rounded-full" style={{ background: '#9CA3AF' }} />
            </div>
            <span className="text-xs" style={{ color: '#6B7280' }}>{r.epigrafe}</span>
          </div>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-3">
          {r.url && (
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium"
              style={{ color: '#9CA3AF' }}
              onMouseEnter={e => e.currentTarget.style.color = '#367CFF'}
              onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
            >
              <ExternalLink size={11} />
              Enlace
            </a>
          )}
          <button
            onClick={() => onNavigateToContent?.(temaNum, r.num)}
            className="inline-flex items-center gap-1 text-xs font-medium"
            style={{ color: '#367CFF' }}
            onMouseEnter={e => e.currentTarget.style.color = '#2563EB'}
            onMouseLeave={e => e.currentTarget.style.color = '#367CFF'}
            title="Ir a la primera mención en el texto"
          >
            <ArrowUpRight size={11} />
            Ir al texto
          </button>
        </div>
      </div>
    </div>
  )
}

function ApaFormattedText({ text }) {
  // Italicize the title portion — the part between ". " and ". " or "," that looks like a book/journal title
  // APA: Authors (Year). *Title*. Publisher. or Authors (Year). Title. *Journal*, vol(num), pages.
  // Simple heuristic: italicize content between the year closing paren and first following period's next segment
  const parts = []
  // Split on italic markers — we detect italics by finding the segment after "(YYYY). " up to the next ". " or ", "
  const italicMatch = text.match(/^(.+?\(\d{4}[a-z]?\)\.\s)(.+?)(\.\s.+|,\s.+|$)/)
  if (italicMatch) {
    parts.push(<span key="pre">{italicMatch[1]}</span>)
    parts.push(<em key="title">{italicMatch[2]}</em>)
    parts.push(<span key="post">{italicMatch[3]}</span>)
    return <>{parts}</>
  }
  return <>{text}</>
}

function SeccionReferencias({ temaNum, referencias = [], onNavigateToContent }) {
  const [buscando, setBuscando] = useState(false)
  const hasRefs = referencias.length > 0
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-base font-semibold mb-0.5" style={{ color: '#1A1A1A' }}>Referencias bibliográficas</h3>
        <p className="text-xs" style={{ color: '#9CA3AF' }}>Fuentes académicas del Tema {temaNum}</p>
      </div>
      {buscando ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse" style={{ background: '#E7EFFE' }}>
            <ProdiMark size={24} />
          </div>
          <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Buscando referencias…</p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>La IA está buscando fuentes relevantes para este tema.</p>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#367CFF', animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      ) : hasRefs ? (
        <div className="space-y-3">
          {referencias.map((ref) => (
            <RefBibCard key={ref.num} ref={ref} temaNum={temaNum} onNavigateToContent={onNavigateToContent} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4" style={{ border: '1.5px dashed #E5E7EB', borderRadius: '16px', background: '#FAFBFC' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#F1F5F9' }}>
            <BookOpen size={20} style={{ color: '#CBD5E1' }} />
          </div>
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Sin referencias añadidas</p>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: '#9CA3AF' }}>
              Usa la IA para buscar referencias académicas relevantes para este tema, o añade las tuyas manualmente.
            </p>
          </div>
          <button
            onClick={() => { setBuscando(true); setTimeout(() => setBuscando(false), 2400) }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white transition-all"
            style={{ background: '#367CFF' }}
            onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
            onMouseLeave={e => e.currentTarget.style.background = '#367CFF'}
          >
            <Sparkles size={14} />
            Buscar referencias con IA
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Accumulated context panel ─────────────────────────────────────────────────

const TEMA_LABELS = {
  1: 'Introducción al aprendizaje automático',
  2: 'Regresión y clasificación',
  3: 'Árboles de decisión y ensemble methods',
  4: 'Redes neuronales básicas',
  5: 'Evaluación y validación de modelos',
  6: 'Proyecto práctico final',
}

function PanelContextoTemas({ seccionActiva, bloquesState, SECCION_CFG, resumenData, onCerrar }) {
  const temaActualNum = (() => {
    const m = seccionActiva.match(/t(\d+)$/)
    if (!m) return null
    return parseInt(m[1], 10)
  })()

  const temasAprobados = [1,2,3,4,5,6]
    .filter(n => (SECCION_CFG[`t${n}`]?.estado === 'aprobado') && (temaActualNum === null || n < temaActualNum))
    .map(n => ({ num: n, label: TEMA_LABELS[n] ?? `Tema ${n}` }))

  return (
    <div
      className="flex flex-col h-full"
      style={{ width: '280px', background: '#FFFFFF', borderLeft: '1px solid #E5E7EB', flexShrink: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <div className="flex items-center gap-2">
          <BrainCircuit size={14} style={{ color: '#367CFF' }} />
          <span className="text-sm font-semibold" style={{ color: '#111827' }}>Contexto acumulado</span>
        </div>
        <button onClick={onCerrar} style={{ color: '#9CA3AF' }}
          onMouseEnter={e => e.currentTarget.style.color = '#374151'}
          onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>
          <X size={16} />
        </button>
      </div>
      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {temasAprobados.length === 0 ? (
          <p className="text-xs text-center py-8" style={{ color: '#9CA3AF' }}>
            No hay temas completados anteriores.<br />El contexto se irá acumulando conforme avances.
          </p>
        ) : (
          <>
            {/* AI student knowledge summary */}
            {(() => {
              const allKeywords = temasAprobados.flatMap(t => (TEMA_KEYWORDS[t.num] || []).slice(0, 3))
              const summaryByCount = {
                1: `En este punto el estudiante ha completado el ${TEMA_LABELS[temasAprobados[0].num]}. Conoce los fundamentos del aprendizaje automático, los tres paradigmas principales y el pipeline estándar de un proyecto ML. Puede distinguir sobreajuste de subajuste y tiene experiencia práctica con cuadernos interactivos.`,
                2: `El estudiante domina los fundamentos del ML y los modelos supervisados de regresión y clasificación. Comprende métricas de evaluación como MSE y F1-score, y ha aplicado algoritmos como KNN y regresión logística. Está listo para abordar métodos más complejos basados en estructuras de árbol.`,
                3: `El estudiante ha consolidado una base sólida en ML clásico, incluyendo modelos lineales, árboles de decisión y métodos ensemble (Random Forest, XGBoost). Comprende el trade-off sesgo-varianza y sabe evaluar modelos con métricas estándar. Está preparado para explorar arquitecturas de redes neuronales.`,
                4: `Con cuatro temas completados, el estudiante tiene un perfil robusto: domina ML clásico y ha entrado en el Deep Learning con perceptrones y backpropagation. Comprende funciones de activación y ha entrenado redes básicas. El siguiente paso es consolidar la evaluación y validación rigurosa de modelos complejos.`,
                5: `El estudiante ha recorrido casi todo el currículo: desde fundamentos hasta redes neuronales, con validación cruzada, curvas ROC y técnicas de regularización. Tiene criterio para seleccionar y comparar modelos. Está en condiciones óptimas para aplicar todo lo aprendido en un proyecto de producción real.`,
              }
              const count = Math.min(temasAprobados.length, 5)
              const summaryText = summaryByCount[count]
              return (
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #BAD2FF', background: '#F5F8FF' }}>
                  <div className="flex items-center gap-2 px-3 py-2.5" style={{ borderBottom: '1px solid #BAD2FF', background: '#E7EFFE' }}>
                    <ProdiMark size={13} />
                    <span className="text-xs font-semibold" style={{ color: '#0047CC' }}>Qué sabe el estudiante hasta aquí</span>
                  </div>
                  <div className="px-3 py-3">
                    <p className="text-xs leading-relaxed" style={{ color: '#1E3A8A' }}>{summaryText}</p>
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {allKeywords.slice(0, 9).map(kw => (
                        <span key={kw} className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#DBEAFE', color: '#1D4ED8', fontSize: '10px' }}>{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Per-topic breakdown */}
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}>Temas completados</p>
            {temasAprobados.map(tema => {
              const keywords = TEMA_KEYWORDS[tema.num] || []
              const desc = resumenData?.temasConDescripcion?.find(t => t.numero === tema.num)?.descripcion
              return (
                <div key={tema.num} className="rounded-xl p-3 space-y-2" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ background: '#E7EFFE', color: '#367CFF', padding: '2px 8px', borderRadius: '6px' }}>T{tema.num}</span>
                    <span className="text-xs font-semibold truncate" style={{ color: '#111827' }}>{tema.label}</span>
                  </div>
                  {desc && <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>{desc.slice(0, 120)}…</p>}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {keywords.map(kw => (
                      <span key={kw} className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#E7EFFE', color: '#0047CC', fontSize: '10px' }}>{kw}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

// ─── Citation hover popover ────────────────────────────────────────────────────

function CitaPopover({ citaPopover, onClose, onMouseEnter, onMouseLeave, onVerReferencias }) {
  const { num, anchorRect, apaFormatted, url } = citaPopover
  const popoverRef = useRef(null)

  // Click-outside to close
  useEffect(() => {
    const handler = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  // Position: above the anchor by default, flip below if near top of viewport
  const POPOVER_HEIGHT = 110
  const MARGIN = 10
  const top = anchorRect.top - POPOVER_HEIGHT - MARGIN > 0
    ? anchorRect.top - POPOVER_HEIGHT - MARGIN
    : anchorRect.bottom + MARGIN
  const left = Math.max(8, Math.min(anchorRect.left, window.innerWidth - 296))

  return (
    <div
      ref={popoverRef}
      className="animate-fade-in"
      style={{
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        width: '280px',
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        padding: '12px 14px',
        zIndex: 300,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-start gap-2.5">
        <span
          className="flex-shrink-0 font-semibold text-xs rounded px-1.5 py-0.5"
          style={{ background: '#E7EFFE', color: '#367CFF', border: '1px solid #BAD2FF' }}
        >
          [{num}]
        </span>
        <p className="text-xs leading-relaxed flex-1" style={{ color: '#374151' }}>
          {apaFormatted}
        </p>
      </div>
      <div className="flex items-center justify-end gap-2 mt-3">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium"
            style={{ color: '#9CA3AF' }}
            onMouseEnter={e => e.currentTarget.style.color = '#6B7280'}
            onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
          >
            <ExternalLink size={11} />
            Enlace
          </a>
        )}
        <button
          onClick={onVerReferencias}
          className="inline-flex items-center gap-1 text-xs font-semibold"
          style={{ color: '#367CFF' }}
          onMouseEnter={e => e.currentTarget.style.color = '#2563EB'}
          onMouseLeave={e => e.currentTarget.style.color = '#367CFF'}
        >
          Ver referencias
          <ArrowUpRight size={11} />
        </button>
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
  const [esAsignaturaNueva] = useState(!!creacionData?.indice)
  // DL-specific instrucciones-t1 two-part flow
  const [dlInstruccionesParte, setDlInstruccionesParte] = useState(1) // 1=setup form | 2=summary review
  const [dlInstruccionesData, setDlInstruccionesData] = useState({ ...dlIndicacionesDidacticasT1 })
  const [dlGenerandoResumen, setDlGenerandoResumen] = useState(false)
  const [dlGenerandoContenido, setDlGenerandoContenido] = useState(false)
  // General instrucciones form state — keyed by section ID ('instrucciones-t2' etc.)
  const [instruccionesData, setInstruccionesData] = useState(() => {
    const temas = [
      { id: 'instrucciones-t1', bloques: instruccionesTema1 },
      { id: 'instrucciones-t2', bloques: instruccionesTema2 },
      { id: 'instrucciones-t3', bloques: instruccionesTema3 },
      { id: 'instrucciones-t4', bloques: instruccionesTema4 },
      { id: 'instrucciones-t5', bloques: instruccionesTema5 },
      { id: 'instrucciones-t6', bloques: instruccionesTema6 },
    ]
    const result = {}
    temas.forEach(({ id, bloques: bqs }) => {
      result[id] = {
        indicacionesIA: bqs[0]?.contenido ?? '',
        notasPedagogicas: bqs[1]?.contenido ?? '',
        archivos: [],
        urls: [''],
        resumenGenerado: false,
        generando: false,
      }
    })
    return result
  })
  const [panelContextoTemaAbierto, setPanelContextoTemaAbierto] = useState(false)
  const [comentarioActivoBloque, setComentarioActivoBloque] = useState(null)
  const [nuevoComentarioTexto, setNuevoComentarioTexto] = useState('')
  const [nuevoComentarioAnchor, setNuevoComentarioAnchor] = useState(null)
  const [quotePendiente, setQuotePendiente] = useState(null)
  const isDL = asignaturaActiva?.asignaturaId === 'deep-learning'
  const indiceParaAsignatura = isDL ? dlBloquesIndice : bloquesIndice
  const [bloquesState, setBloquesState] = useState(() => {
    // When coming from the author creation flow, topic sections start empty
    if (creacionData?.indice) {
      const emptyTopicSections = {}
      ;['t1','t2','t3','t4','t5','t6'].forEach(t => {
        emptyTopicSections[t] = []
        emptyTopicSections[`referencias-${t}`] = []
        emptyTopicSections[`recursos-${t}`] = []
      })
      return { indice: indiceParaAsignatura, ...emptyTopicSections }
    }
    const t1Bloques = isDL ? dlBloquesTema1 : bloquesTema1
    return {
      t2: bloquesTema2.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
      t1: t1Bloques.map(b => ({ ...b, comentarios: (b.comentarios || []).map(c => ({ ...c, respuestas: [] })) })),
      t3: bloquesTema3.map(b => ({ ...b, comentarios: [] })),
      t4: bloquesTema4.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
      indice: indiceParaAsignatura,
    }
  })
  // Single source of truth for new-subject section statuses.
  // Only sections present here are accessible; absent = sin_comenzar.
  const [estadosSeccion, setEstadosSeccion] = useState(
    () => esAsignaturaNueva ? { indice: 'borrador', resumen: 'aprobado' } : {}
  )
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
  const [editarResumenWarning, setEditarResumenWarning] = useState(false)
  const [resumenEditando, setResumenEditando] = useState(false)
  const herramientasMenuRef = useRef(null)
  const [enrichmentPanelAbierto, setEnrichmentPanelAbierto] = useState(false)
  const [enrichmentGenerando, setEnrichmentGenerando] = useState(null) // null | 'test' | 'mapa' | 'podcast'
  const [enrichmentsGenerados, setEnrichmentsGenerados] = useState([]) // [{ tipo, titulo, descripcion }]
  // Inline IA suggestion state
  const [iaInline, setIaInline] = useState(null) // { bloqueId, accion, textoOriginal, textoGenerado, generando }
  // Citation popover state
  const [citaPopover, setCitaPopover] = useState(null) // { num, temaNum, anchorRect, apaFormatted }
  const citaHoverTimerRef = useRef(null)
  const pendingCitaScrollRef = useRef(null) // { type: 'referencias'|'content', temaNum, refNum }

  useEffect(() => {
    const handler = (e) => {
      if (herramientasMenuRef.current && !herramientasMenuRef.current.contains(e.target)) {
        setHerramientasMenuAbierto(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Citation interaction handler — called by BloqueContenido spans
  const handleCitaInteraction = ({ type, num, anchorEl }) => {
    const temaMatch = seccionActiva.match(/^t(\d+)$/)
    const temaNum = temaMatch ? parseInt(temaMatch[1], 10) : null
    if (!temaNum) return

    if (type === 'hover') {
      clearTimeout(citaHoverTimerRef.current)
      const refs = (isDL ? citacionesPorTemaDL : citacionesPorTema)[temaNum] || []
      const cita = refs.find(c => c.num === num)
      if (!cita) return
      const anchorRect = anchorEl.getBoundingClientRect()
      setCitaPopover({ num, temaNum, anchorRect, apaFormatted: cita.apaFormatted, url: cita.url })
    } else if (type === 'leave') {
      citaHoverTimerRef.current = setTimeout(() => setCitaPopover(null), 200)
    } else if (type === 'click') {
      setCitaPopover(null)
      pendingCitaScrollRef.current = { type: 'referencias', temaNum, refNum: num }
      setSeccionActiva(`referencias-t${temaNum}`)
    }
  }

  const handleNavigateToContent = (temaNum, refNum) => {
    pendingCitaScrollRef.current = { type: 'content', temaNum, refNum }
    setSeccionActiva(`t${temaNum}`)
  }

  // Scroll to pending citation target after section change
  useEffect(() => {
    if (!pendingCitaScrollRef.current) return
    const pending = pendingCitaScrollRef.current
    pendingCitaScrollRef.current = null
    requestAnimationFrame(() => {
      let el
      if (pending.type === 'referencias') {
        el = document.getElementById(`ref-${pending.refNum}-t${pending.temaNum}`)
      } else {
        el = document.querySelector(`[data-cita-num="${pending.refNum}"]`)
      }
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('cita-highlight')
      setTimeout(() => el.classList.remove('cita-highlight'), 1600)
    })
  }, [seccionActiva])

  // Resolve active asignatura for resumen section
  const asignaturaData = (() => {
    if (!asignaturaActiva || !titulaciones) return null
    const tit = titulaciones.find(t => t.id === asignaturaActiva.titulacionId)
    return tit?.asignaturas?.find(a => a.id === asignaturaActiva.asignaturaId) || null
  })()

  const isResumen = seccionActiva === 'resumen'
  const seccion = SECCION_CONFIG[seccionActiva] || SECCION_CONFIG.t2
  // When coming from creation flow, topic section blocks are explicitly empty []
  const bloques = bloquesState[seccionActiva] !== undefined ? bloquesState[seccionActiva] : seccion.bloques
  const editable = rolActivo === 'autor'
  const isTemaSection = /^t\d+$/.test(seccionActiva)
  const temaNumActivo = isTemaSection ? parseInt(seccionActiva.replace('t', ''), 10) : null
  const citacionesMap = isDL ? citacionesPorTemaDL : citacionesPorTema
  const citacionesActivas = isTemaSection ? (citacionesMap[temaNumActivo] ?? []) : null

  const estadoMostrado = esAsignaturaNueva
    ? (estadosSeccion[seccionActiva] ?? 'sin_comenzar')
    : seccion.estado

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
      [seccionActiva]: (prev[seccionActiva] || bloques).map(b => {
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
      [seccionActiva]: (prev[seccionActiva] || bloques).map(b => {
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
    if (esAsignaturaNueva) {
      const order = [
        'indice',
        'instrucciones-t1', 't1', 'referencias-t1', 'recursos-t1',
        'instrucciones-t2', 't2', 'referencias-t2', 'recursos-t2',
        'instrucciones-t3', 't3', 'referencias-t3', 'recursos-t3',
        'instrucciones-t4', 't4', 'referencias-t4', 'recursos-t4',
        'instrucciones-t5', 't5', 'referencias-t5', 'recursos-t5',
        'instrucciones-t6', 't6', 'referencias-t6', 'recursos-t6',
      ]
      const idx = order.indexOf(seccionActiva)
      const next = order[idx + 1]
      setEstadosSeccion(prev => ({
        ...prev,
        [seccionActiva]: 'aprobado',
        ...(next ? { [next]: 'borrador' } : {}),
      }))
      if (next) setTimeout(() => setSeccionActiva(next), 300)
    }
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
    const estado = estadoMostrado

    // ─ Instrucciones sections (all topics) ─
    if (seccionActiva.startsWith('instrucciones-') && estado !== 'aprobado') {
      const datosInstr = instruccionesData[seccionActiva] ?? {}
      if (datosInstr.generando) return null
      if (datosInstr.resumenGenerado) {
        return (
          <>
            <button
              onClick={() => {
                if (esAsignaturaNueva && seccionActiva === 'instrucciones-t1') {
                  setEditarResumenWarning(true)
                } else {
                  setInstruccionesData(prev => ({ ...prev, [seccionActiva]: { ...prev[seccionActiva], resumenGenerado: false } }))
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ background: '#F1F5F9', color: '#374151', border: '1px solid #E5E7EB' }}
              onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
              onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
            >
              <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
              Volver
            </button>
            <button
              onClick={() => {
                const tNum = parseInt(seccionActiva.replace('instrucciones-t', ''), 10)
                const instrSecId = seccionActiva
                if (tNum === 1) {
                  setDlGenerandoContenido(true)
                  setTimeout(() => {
                    setBloquesState(prev => ({ ...prev, t1: dlBloquesTema1 }))
                    setEstadosSeccion(prev => ({ ...prev, t1: prev.t1 ?? 'borrador', [instrSecId]: 'aprobado' }))
                    setDlGenerandoContenido(false)
                    setSeccionActiva('t1')
                  }, 1600)
                } else {
                  setEstadosSeccion(prev => ({ ...prev, [instrSecId]: 'aprobado' }))
                  setSeccionActiva(`t${tNum}`)
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-sm font-semibold text-white transition-all"
              style={{ background: '#367CFF' }}
              onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
              onMouseLeave={e => e.currentTarget.style.background = '#367CFF'}
            >
              <Sparkles size={14} />
              Generar contenido del tema
              <ChevronRight size={14} />
            </button>
          </>
        )
      }
      // Part 1: form — show "Generar resumen" primary CTA
      return (
        <button
          onClick={() => {
            setInstruccionesData(prev => ({ ...prev, [seccionActiva]: { ...prev[seccionActiva], generando: true } }))
            setTimeout(() => {
              setInstruccionesData(prev => ({ ...prev, [seccionActiva]: { ...prev[seccionActiva], generando: false, resumenGenerado: true } }))
            }, 1500)
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-sm font-semibold text-white transition-all"
          style={{ background: '#367CFF' }}
          onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
          onMouseLeave={e => e.currentTarget.style.background = '#367CFF'}
        >
          <Sparkles size={14} />
          Generar resumen del tema
        </button>
      )
    }

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
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: herramientasMenuAbierto ? '#E7EFFE' : '#F8F9FA',
                  color: herramientasMenuAbierto ? '#367CFF' : '#6B7280',
                  border: herramientasMenuAbierto ? '1px solid #BAD2FF' : '1px solid #E5E7EB',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E7EFFE'; e.currentTarget.style.color = '#367CFF'; e.currentTarget.style.borderColor = '#BAD2FF' }}
                onMouseLeave={e => {
                  if (!herramientasMenuAbierto) {
                    e.currentTarget.style.background = '#F8F9FA'; e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderColor = '#E5E7EB'
                  }
                }}
              >
                <Sparkles size={14} />
                Herramientas IA
                <ChevronDown size={12} />
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
                    <Wand2 size={14} style={{ color: revisandoCalidad ? '#CBD5E1' : '#367CFF' }} />
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
              onClick={showSentToast}
              className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-sm font-semibold text-white transition-all"
              style={{ background: '#367CFF' }}
              onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
              onMouseLeave={e => e.currentTarget.style.background = '#367CFF'}
            >
              Enviar a revisión
              <ChevronRight size={14} />
            </button>
          </>
        )
      }
      // Revisando por coordinador → solo pedir permiso (amber)
      if (estado === 'revision') {
        return (
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ background: '#FFFBEB', color: '#F59E0B', border: '1px solid #FDE68A' }}
            onMouseEnter={e => e.currentTarget.style.background = '#FEF3C7'}
            onMouseLeave={e => e.currentTarget.style.background = '#FFFBEB'}
          >
            <Eye size={14} />
            Solicitar permiso de edición
          </button>
        )
      }
      // Aprobado → pedir permiso (gray)
      if (estado === 'aprobado') {
        return (
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ background: '#F8F9FA', color: '#6B7280', border: '1px solid #E5E7EB' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
            onMouseLeave={e => e.currentTarget.style.background = '#F8F9FA'}
          >
            <Eye size={14} />
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ background: '#FFF7ED', color: '#F97316', border: '1px solid #FED7AA' }}
              onMouseEnter={e => e.currentTarget.style.background = '#FFEDD5'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFF7ED'}
            >
              <MessageSquare size={14} />
              Enviar correcciones
            </button>
            <button
              onClick={showSentToast}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ background: '#10B981' }}
              onMouseEnter={e => e.currentTarget.style.background = '#059669'}
              onMouseLeave={e => e.currentTarget.style.background = '#10B981'}
            >
              <ChevronRight size={14} />
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ background: '#F8F9FA', color: '#6B7280', border: '1px solid #E5E7EB' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
            onMouseLeave={e => e.currentTarget.style.background = '#F8F9FA'}
          >
            <Eye size={14} />
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ background: '#FFF7ED', color: '#F97316', border: '1px solid #FED7AA' }}
            onMouseEnter={e => e.currentTarget.style.background = '#FFEDD5'}
            onMouseLeave={e => e.currentTarget.style.background = '#FFF7ED'}
          >
            <MessageSquare size={14} />
            Enviar correcciones
          </button>
        )
      }
      // Aprobado → comprobar actualizaciones
      if (estado === 'aprobado') {
        return (
          <button
            onClick={showSavedToast}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ background: '#F8F9FA', color: '#6B7280', border: '1px solid #E5E7EB' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
            onMouseLeave={e => e.currentTarget.style.background = '#F8F9FA'}
          >
            <Eye size={14} />
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ background: '#7C3AED' }}
              onMouseEnter={e => e.currentTarget.style.background = '#6D28D9'}
              onMouseLeave={e => e.currentTarget.style.background = '#7C3AED'}
            >
              <Layers size={14} />
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

      {/* Page header — single row */}
      <div className="flex-shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>

        <div className="flex items-center gap-2 py-2.5 min-w-0" style={{ paddingLeft: '20px', paddingRight: '68px' }}>
          {/* Breadcrumb text — truncates with ellipsis */}
          <span className="text-xs font-medium truncate min-w-0 flex-shrink" style={{ color: '#9CA3AF' }}>
            {[asignaturaData?.nombre, isResumen ? 'Resumen general' : seccion.label].filter(Boolean).join(' · ')}
          </span>
          <StatusIndicator status={toStatusKey(estadoMostrado)} variant="badge" className="flex-shrink-0" />
          {/* Autosave inline switcher */}
          <button
            role="switch"
            aria-checked={autosaveOn}
            onClick={toggleAutosave}
            className="flex items-center gap-1.5 flex-shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
            style={{
              background: 'none',
              border: 'none',
              padding: '2px 4px',
              cursor: 'pointer',
              color: autosaveOn ? '#16A34A' : '#9CA3AF',
              '--tw-ring-color': '#367CFF',
            }}
            aria-label={autosaveOn ? 'Desactivar guardado automático' : 'Activar guardado automático'}
          >
            {/* Toggle pill */}
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: '28px',
                height: '16px',
                borderRadius: '8px',
                background: autosaveOn ? '#16A34A' : '#D1D5DB',
                position: 'relative',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute',
                left: autosaveOn ? '14px' : '2px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#FFFFFF',
                transition: 'left 0.2s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }} />
            </span>
            <span className="text-xs font-medium" style={{ color: autosaveOn ? '#374151' : '#9CA3AF' }}>
              {autosaveStatus === 'saving' ? 'Guardando…' : autosaveOn ? 'Autoguardado' : 'Sin guardar'}
            </span>
          </button>
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            {isResumen && editable ? (
              <button
                onClick={() => setEditarResumenWarning(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-sm font-medium transition-all"
                style={{ background: 'transparent', color: '#6B7280', border: '1px solid #E5E7EB' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.borderColor = '#D1D5DB' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#E5E7EB' }}
              >
                <Pencil size={14} />
                Editar resumen
              </button>
            ) : !isResumen ? getActionBar() : null}
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
          creacionData={creacionData}
          esAsignaturaNueva={esAsignaturaNueva}
          estadosSeccion={estadosSeccion}
        />

        {/* Content area */}
        <main className="flex-1 overflow-y-auto" style={{ background: '#FFFFFF' }} onMouseUp={handleTextSelection} onKeyUp={handleTextSelection}>
          {isResumen ? (
            <SeccionResumen
              nombreAsignatura={asignaturaData?.nombre}
              creacionData={creacionData}
            />
          ) : (
            <div className="max-w-2xl mx-auto py-12 pl-16 pr-12" style={{ paddingBottom: '64px' }}>

              {/* Document header */}
              <div className="mb-10" style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '24px' }}>
                <p className="text-xs font-medium mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>
                  {asignaturaData?.nombre ?? 'Deep Learning y Redes Neuronales'} · Máster en IA
                </p>
                <h1 className="text-2xl font-semibold leading-snug" style={{ color: '#111827' }}>
                  {seccion.label}
                </h1>
                {/* Tags — temario only */}
                {/^t\d+$/.test(seccionActiva) && (() => {
                  const isRevision = seccion.estado === 'revision'
                  const existingTags = [...new Set(bloques.flatMap(b => b.etiquetas || []))]

                  // AI-suggested tags for revision temario (shown to coordinator)
                  if (isRevision && rolActivo === 'coordinador') {
                    const aiTags = ['Machine Learning', 'Árboles de decisión', 'Ensemble Methods', 'Random Forest', 'Gradient Boosting', 'XGBoost']
                    return (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles size={12} style={{ color: '#367CFF' }} />
                          <span className="text-xs font-medium" style={{ color: '#367CFF' }}>Etiquetas sugeridas por IA</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {aiTags.map(tag => (
                            <button
                              key={tag}
                              className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded transition-all"
                              style={{ background: '#E7EFFE', color: '#367CFF', border: '1px solid #BAD2FF' }}
                              onMouseEnter={e => { e.currentTarget.style.background = '#BAD2FF'; e.currentTarget.style.borderColor = '#8EB6FF' }}
                              onMouseLeave={e => { e.currentTarget.style.background = '#E7EFFE'; e.currentTarget.style.borderColor = '#BAD2FF' }}
                            >
                              + {tag}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>Haz clic para añadir al temario</p>
                      </div>
                    )
                  }

                  // Real tags for aprobado temario (shown to coordinator)
                  if (!isRevision && rolActivo === 'coordinador' && existingTags.length > 0) {
                    return (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {existingTags.map(tag => <EtiquetaBloque key={tag} label={tag} />)}
                      </div>
                    )
                  }

                  return null
                })()}
              </div>

              {/* Recursos a fondo section */}
              {seccionActiva.startsWith('recursos-') ? (
                <SeccionRecursosAFondo
                  key={seccionActiva}
                  estado={seccion.estado}
                  initialScreen={seccion.estado === 'aprobado' || seccionActiva === 'recursos-t1' || seccionActiva === 'recursos-t2' ? 'list' : 'idle'}
                  editable={editable}
                />
              ) : seccionActiva.startsWith('referencias-') ? (
                <SeccionReferencias
                  temaNum={parseInt(seccionActiva.replace('referencias-t', ''), 10)}
                  referencias={(isDL ? citacionesPorTemaDL : citacionesPorTema)[parseInt(seccionActiva.replace('referencias-t', ''), 10)] ?? []}
                  onNavigateToContent={handleNavigateToContent}
                />
              ) : seccionActiva.startsWith('instrucciones-') ? (
                <SeccionInstruccionesGeneral
                  key={seccionActiva}
                  seccionId={seccionActiva}
                  temaNum={parseInt(seccionActiva.replace('instrucciones-t', ''), 10)}
                  temaLabel={TEMA_LABELS[parseInt(seccionActiva.replace('instrucciones-t', ''), 10)] ?? null}
                  datos={instruccionesData[seccionActiva] ?? {
                    indicacionesIA: '', notasPedagogicas: '', archivos: [], urls: [''], resumenGenerado: false, generando: false
                  }}
                  resumenData={seccionActiva === 'instrucciones-t1' ? dlResumenTema1 : null}
                  readOnly={estadoMostrado === 'aprobado'}
                  onChange={(key, val) => {
                    if (key === '_generarResumen') {
                      setInstruccionesData(prev => ({ ...prev, [seccionActiva]: { ...prev[seccionActiva], generando: true } }))
                      setTimeout(() => {
                        setInstruccionesData(prev => ({ ...prev, [seccionActiva]: { ...prev[seccionActiva], generando: false, resumenGenerado: true } }))
                      }, 1500)
                    } else if (key === '_editarInstrucciones') {
                      setEditarResumenWarning(true)
                    } else if (key === '_generarContenido') {
                      const tNum = parseInt(seccionActiva.replace('instrucciones-t', ''), 10)
                      const instrSecId = seccionActiva
                      if (tNum === 1) {
                        setDlGenerandoContenido(true)
                        setTimeout(() => {
                          setBloquesState(prev => ({ ...prev, t1: dlBloquesTema1 }))
                          setEstadosSeccion(prev => ({ ...prev, t1: prev.t1 ?? 'borrador', [instrSecId]: 'aprobado' }))
                          setDlGenerandoContenido(false)
                          setSeccionActiva('t1')
                        }, 1600)
                      } else {
                        setEstadosSeccion(prev => ({ ...prev, [instrSecId]: 'aprobado' }))
                        setSeccionActiva(`t${tNum}`)
                      }
                    } else {
                      setInstruccionesData(prev => ({ ...prev, [seccionActiva]: { ...prev[seccionActiva], [key]: val } }))
                    }
                  }}
                />
              ) : seccionActiva === 'indice' && creacionData?.indice ? (
                <SeccionIndice
                  bloques={bloques}
                  creacionData={creacionData}
                  onCreacionDataConsumed={onCreacionDataConsumed}
                  onGenerarResumen={() => {
                    setResumenPrefill(creacionData?.resumen || null)
                    setEstadosSeccion(prev => ({ ...prev, indice: 'aprobado', resumen: 'aprobado', 'instrucciones-t1': 'sin_comenzar' }))
                    setSeccionActiva('instrucciones-t1')
                  }}
                />
              ) : seccionActiva === 'indice' ? (
                <SeccionIndiceFija bloques={bloques} resumenData={creacionData?.resumen ?? getResumenData(asignaturaData?.nombre)} />
              ) : estadoMostrado === 'bloqueado' ? (
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

                  {/* Empty state for new subjects */}
                  {bloques.length === 0 && editable && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#F1F5F9' }}>
                        <BookOpen size={20} style={{ color: '#CBD5E1' }} />
                      </div>
                      <p className="text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>Sección vacía</p>
                      <p className="text-xs leading-relaxed max-w-xs" style={{ color: '#CBD5E1' }}>
                        Empieza a escribir el contenido de este tema o usa el Asistente de contenidos para generarlo.
                      </p>
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
                          onContenidoChange={(bloqueId, nuevoContenido) => {
                            setBloquesState(prev => ({
                              ...prev,
                              [seccionActiva]: (prev[seccionActiva] || bloques).map(b =>
                                b.id === bloqueId ? { ...b, contenido: nuevoContenido } : b
                              ),
                            }))
                          }}
                          textoReemplazando={iaInline?.bloqueId === bloque.id ? iaInline.textoOriginal : null}
                          citaciones={citacionesActivas}
                          onCitaInteraction={handleCitaInteraction}
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
                      onMouseEnter={e => e.currentTarget.style.color = '#367CFF'}
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
          {/* IA */}
          <button
            onClick={() => { setPanelIAabierto(true); setComentarioActivoBloque(null); setPanelNotasAbierto(false) }}
            className="flex flex-col items-center gap-1 w-full py-2.5 rounded-lg transition-colors"
            style={{ color: panelIAabierto ? '#367CFF' : '#4B5563', background: panelIAabierto ? '#E7EFFE' : 'transparent' }}
            onMouseEnter={e => { if (!panelIAabierto) { e.currentTarget.style.background = '#EAECF0'; e.currentTarget.style.color = '#111827' } }}
            onMouseLeave={e => { if (!panelIAabierto) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4B5563' } }}
          >
            <ProdiMark size={18} />
            <span className="text-center leading-tight" style={{ fontSize: '9px', fontWeight: panelIAabierto ? '700' : '500' }}>Asistente</span>
          </button>

          {/* Comments */}
          <button
            onClick={() => {
              const first = bloques.find(b => b.comentarios?.some(c => !c.resuelto))
              if (first) { setComentarioActivoBloque(first); setPanelIAabierto(false); setPanelNotasAbierto(false) }
            }}
            className="relative flex flex-col items-center gap-1 w-full py-2.5 rounded-lg transition-colors"
            style={{ color: comentarioActivoBloque ? '#EF4444' : tieneComentariosActivos ? '#4B5563' : '#9CA3AF', background: comentarioActivoBloque ? '#FEE2E2' : 'transparent', cursor: tieneComentariosActivos ? 'pointer' : 'default' }}
            onMouseEnter={e => { if (tieneComentariosActivos && !comentarioActivoBloque) { e.currentTarget.style.background = '#EAECF0'; e.currentTarget.style.color = '#111827' } }}
            onMouseLeave={e => { if (!comentarioActivoBloque) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = tieneComentariosActivos ? '#4B5563' : '#9CA3AF' } }}
          >
            <div className="relative">
              <MessageSquare size={16} />
              {totalComentariosCriticos > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#EF4444', fontSize: '8px' }}>
                  {totalComentariosCriticos}
                </span>
              )}
            </div>
            <span className="text-center leading-tight" style={{ fontSize: '9px', fontWeight: comentarioActivoBloque ? '700' : '500' }}>Comentarios</span>
          </button>

          {/* Notas */}
          <button
            onClick={() => { setPanelNotasAbierto(v => !v); setComentarioActivoBloque(null); setPanelIAabierto(false) }}
            className="relative flex flex-col items-center gap-1 w-full py-2.5 rounded-lg transition-colors"
            style={{ color: panelNotasAbierto ? '#D97706' : '#4B5563', background: panelNotasAbierto ? '#FEF3C7' : 'transparent' }}
            onMouseEnter={e => { if (!panelNotasAbierto) { e.currentTarget.style.background = '#EAECF0'; e.currentTarget.style.color = '#111827' } }}
            onMouseLeave={e => { if (!panelNotasAbierto) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4B5563' } }}
          >
            <div className="relative">
              <StickyNote size={16} />
              {notasState.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#D97706', fontSize: '8px' }}>
                  {notasState.length}
                </span>
              )}
            </div>
            <span className="text-center leading-tight" style={{ fontSize: '9px', fontWeight: panelNotasAbierto ? '700' : '500' }}>Notas</span>
          </button>

          {/* Experiencias (disenador only) */}
          {rolActivo === 'disenador' && (
            <button
              onClick={() => { setEnrichmentPanelAbierto(v => !v); setComentarioActivoBloque(null); setPanelIAabierto(false); setPanelNotasAbierto(false); setPanelContextoTemaAbierto(false) }}
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

          {/* Contexto acumulado — visible in instrucciones and temario sections */}
          {(seccionActiva.startsWith('instrucciones-') || /^t\d+$/.test(seccionActiva)) && (
            <button
              onClick={() => { setPanelContextoTemaAbierto(v => !v); setComentarioActivoBloque(null); setPanelIAabierto(false); setPanelNotasAbierto(false); setEnrichmentPanelAbierto(false) }}
              className="flex flex-col items-center gap-1 w-full py-2.5 rounded-lg transition-colors"
              style={{ color: panelContextoTemaAbierto ? '#367CFF' : '#4B5563', background: panelContextoTemaAbierto ? '#E7EFFE' : 'transparent' }}
              onMouseEnter={e => { if (!panelContextoTemaAbierto) { e.currentTarget.style.background = '#EAECF0'; e.currentTarget.style.color = '#111827' } }}
              onMouseLeave={e => { if (!panelContextoTemaAbierto) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4B5563' } }}
              title="Contexto acumulado de temas anteriores"
            >
              <BrainCircuit size={16} />
              <span className="text-center leading-tight" style={{ fontSize: '9px', fontWeight: panelContextoTemaAbierto ? '700' : '500' }}>Contexto</span>
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
                className="w-full resize-none rounded-[10px] text-xs px-[13px] py-[9px] outline-none"
                style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155' }}
                onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
                onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
                onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
                onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
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

        {/* Right panel: Contexto acumulado */}
        {panelContextoTemaAbierto && !comentarioActivoBloque && !panelIAabierto && (
          <PanelContextoTemas
            seccionActiva={seccionActiva}
            SECCION_CFG={SECCION_CONFIG}
            resumenData={creacionData?.resumen ?? getResumenData(asignaturaData?.nombre)}
            onCerrar={() => setPanelContextoTemaAbierto(false)}
          />
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

      {/* Citation hover popover */}
      {citaPopover && (
        <CitaPopover
          citaPopover={citaPopover}
          onClose={() => setCitaPopover(null)}
          onMouseEnter={() => clearTimeout(citaHoverTimerRef.current)}
          onMouseLeave={() => { citaHoverTimerRef.current = setTimeout(() => setCitaPopover(null), 200) }}
          onVerReferencias={() => {
            setCitaPopover(null)
            pendingCitaScrollRef.current = { type: 'referencias', temaNum: citaPopover.temaNum, refNum: citaPopover.num }
            setSeccionActiva(`referencias-t${citaPopover.temaNum}`)
          }}
        />
      )}

      {savedToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-xl animate-fade-in"
          style={{ background: '#10B981', zIndex: 100 }}>
          ✓ Borrador guardado
        </div>
      )}
      {sentToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-xl animate-fade-in"
          style={{ background: '#367CFF', zIndex: 100 }}>
          ✓ Tema 2 enviado a revisión
        </div>
      )}

      {/* Editar resumen — warning modal */}
      {editarResumenWarning && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.35)', zIndex: 200 }}
          onClick={() => setEditarResumenWarning(false)}
        >
          <div
            className="rounded-2xl p-6 w-full max-w-sm mx-4"
            style={{ background: '#FFFFFF', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Icon + title */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#FEF3C7' }}>
                <AlertTriangle size={18} style={{ color: '#D97706' }} />
              </div>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#111827' }}>¿Editar el resumen general?</p>
                <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                  Si modificas el resumen general, el índice de la asignatura deberá regenerarse y podrías perder los avances realizados en los temas ya comenzados.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                onClick={() => setEditarResumenWarning(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{ background: '#F3F4F6', color: '#374151' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setEditarResumenWarning(false)
                  setResumenEditando(true)
                  if (seccionActiva.startsWith('instrucciones-')) {
                    setInstruccionesData(prev => ({ ...prev, [seccionActiva]: { ...prev[seccionActiva], resumenGenerado: false } }))
                  } else {
                    setEstadosSeccion(prev => ({ ...prev, resumen: 'borrador' }))
                  }
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
                style={{ background: '#DC2626' }}
                onMouseEnter={e => e.currentTarget.style.background = '#B91C1C'}
                onMouseLeave={e => e.currentTarget.style.background = '#DC2626'}
              >
                Sí, editar instrucciones
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

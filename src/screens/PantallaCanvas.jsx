import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronDown, Plus, MessageSquare, Eye, Sparkles, X, Lock, Wand2, ShieldCheck, BookOpenCheck, Check, ToggleLeft, ToggleRight, StickyNote, Pencil, Trash2, RefreshCw, ArrowUpRight, FlaskConical, BrainCircuit, Mic, Save, Layers, BookOpen, Link, Send, ExternalLink } from 'lucide-react'
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
    estado: 'aprobado',
    bloques: bloquesTema1,
    chat: chatHistorialTema1,
  },
  'recursos-t1': {
    label: 'Recursos a fondo · Tema 1',
    labelCorto: 'Recursos T1',
    estado: 'aprobado',
    bloques: [],
    chat: chatHistorialTema1,
  },
  'test-t1': {
    label: 'Tests · Tema 1',
    labelCorto: 'Tests T1',
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
  'recursos-t2': {
    label: 'Recursos a fondo · Tema 2',
    labelCorto: 'Recursos T2',
    estado: 'borrador',
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
    estado: 'revision',
    bloques: bloquesTema3,
    chat: chatHistorialTema2,
  },
  'recursos-t3': {
    label: 'Recursos a fondo · Tema 3',
    labelCorto: 'Recursos T3',
    estado: 'borrador',
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
    estado: 'comentarios',
    bloques: bloquesTema4,
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
        style={{ background: '#0A5CF5', color: '#FFFFFF' }}
        onMouseEnter={e => e.currentTarget.style.background = '#0039A3'}
        onMouseLeave={e => e.currentTarget.style.background = '#0A5CF5'}
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
function RefCard({ data: r, idx, showDelete, showRegenerate, onDelete, onRegenerate, regeneratingId }) {
  const rel = RELEVANCE_CONFIG[r.relevance] || RELEVANCE_CONFIG.medium
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
              {r.title}
              <ExternalLink size={11} style={{ flexShrink: 0, opacity: 0.6 }} />
            </a>
            <div className="flex items-center gap-1 flex-shrink-0">
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
            {r.authors.join(', ')} · {SOURCE_LABELS[r.source] || r.source} · {r.year}
          </p>
          <p className="text-sm leading-relaxed mb-2" style={{ color: '#374151' }}>{r.description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: rel.bg, color: rel.color, border: `1px solid ${rel.border}` }}>
              {rel.label}
            </span>
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs hover:underline" style={{ color: '#9CA3AF' }}>
              <Link size={10} />
              {r.url.length > 50 ? r.url.slice(0, 50) + '…' : r.url}
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
            style={{ background: '#0A5CF5' }}
            onMouseEnter={e => e.currentTarget.style.background = '#0039A3'}
            onMouseLeave={e => e.currentTarget.style.background = '#0A5CF5'}
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
      {/* Borrador action hint */}
      {!isAprobado && editable && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#E0F2FE' }}>
            <Wand2 size={14} style={{ color: '#0284C7' }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold" style={{ color: '#0C4A6E' }}>En construcción — edición libre</p>
            <p className="text-xs" style={{ color: '#0369A1' }}>Regenera o elimina cada referencia individualmente con los iconos en cada tarjeta.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{visibleRefs.length} referencias académicas</p>
          <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
            {isAprobado ? 'Aprobadas · Contenido finalizado' : 'Borrador · Puedes regenerar o eliminar referencias individualmente'}
          </p>
        </div>
      </div>

      {/* Reference cards */}
      <div className="space-y-2 mb-6">
        {visibleRefs.map((r, i) => (
          <RefCard
            key={r.id}
            data={r}
            idx={i}
            showDelete={!isAprobado && editable}
            showRegenerate={!isAprobado && editable}
            onDelete={handleDelete}
            onRegenerate={handleRegenerateOne}
            regeneratingId={regeneratingId}
          />
        ))}
      </div>

      {/* T1 aprobado — request edit permission */}
      {isAprobado && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#FEF3C7' }}>
            <Lock size={14} style={{ color: '#D97706' }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold" style={{ color: '#92400E' }}>Contenido aprobado — Solo lectura</p>
            <p className="text-xs" style={{ color: '#B45309' }}>Las referencias han sido validadas. Solicita permiso para modificarlas.</p>
          </div>
          <button
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
            style={{ background: '#D97706', color: '#FFFFFF' }}
            onMouseEnter={e => e.currentTarget.style.background = '#B45309'}
            onMouseLeave={e => e.currentTarget.style.background = '#D97706'}
          >
            Solicitar permiso de edición
          </button>
        </div>
      )}

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

function SeccionIndiceFija({ bloques }) {
  return (
    <div className="space-y-3">
      {bloques.map((tema) => (
        <div
          key={tema.id}
          className="flex gap-4 rounded-xl px-5 py-4 transition-colors"
          style={{ border: '1px solid #E5E7EB', background: '#FFFFFF' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#D1D5DB'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}
        >
          {/* Number badge */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold"
            style={{ background: '#E7EFFE', color: '#367CFF' }}
          >
            {tema.numero}
          </div>
          {/* Content */}
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-snug mb-1" style={{ color: '#111827' }}>
              {tema.nombre}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
              {tema.descripcion}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Resumen section component ────────────────────────────────────────────────

const RESUMEN_DATA = {
  nombre: 'Deep Learning y Redes Neuronales',
  introduccion: 'La asignatura Deep Learning y Redes Neuronales introduce al estudiante en los fundamentos y aplicaciones del aprendizaje profundo dentro del campo de la inteligencia artificial. A lo largo del curso se analizan los principios que sustentan el funcionamiento de las redes neuronales artificiales y su capacidad para aprender patrones complejos a partir de datos.',
  objetivos: [
    'Comprender los fundamentos teóricos del deep learning y su relación con la inteligencia artificial y el machine learning.',
    'Analizar las principales arquitecturas de redes neuronales profundas (CNN, RNN, Transformers) y sus aplicaciones.',
    'Aplicar técnicas de entrenamiento y optimización de modelos de aprendizaje profundo.',
    'Evaluar el potencial y las limitaciones del deep learning en distintos contextos tecnológicos y científicos.',
  ],
  extension: 'XXXX palabras · 20 páginas (aproximadamente)',
  epigrafes: 'El tema se estructurará siguiendo los epígrafes aprobados en el índice: introducción al deep learning, fundamentos de redes neuronales artificiales, entrenamiento y optimización, arquitecturas CNN y RNN, modelos generativos y aplicaciones avanzadas. Cada epígrafe comenzará con una breve introducción conceptual y desarrollará los fundamentos que el estudiante debe comprender.\n\nA lo largo del tema se destacarán ideas esenciales como la relación entre IA, machine learning y deep learning, el papel de los datos en el entrenamiento de modelos, y las diferencias entre las principales arquitecturas de redes neuronales profundas, utilizando recuadros de "punto clave" para facilitar la lectura.\n\nPara reforzar los contenidos, se incorporarán elementos visuales: una línea temporal de la evolución del deep learning, un esquema comparativo de arquitecturas (CNN, RNN, Transformers) y diagramas del proceso de entrenamiento. El tema trabajará dos competencias principales: la capacidad de comprender el funcionamiento de las redes neuronales y la habilidad para identificar la arquitectura adecuada según el tipo de problema.',
}

function SeccionResumen({ editable, nombreAsignatura }) {
  const [data, setData] = useState(RESUMEN_DATA)
  const [unsaved, setUnsaved] = useState(false)

  const mark = () => setUnsaved(true)
  const set = (field, val) => { setData(prev => ({ ...prev, [field]: val })); mark() }
  const setObjetivo = (idx, val) => {
    setData(prev => { const o = [...prev.objetivos]; o[idx] = val; return { ...prev, objetivos: o } })
    mark()
  }
  const removeObjetivo = (idx) => { setData(prev => ({ ...prev, objetivos: prev.objetivos.filter((_, i) => i !== idx) })); mark() }
  const addObjetivo = () => { setData(prev => ({ ...prev, objetivos: [...prev.objetivos, ''] })); mark() }

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
          {nombreAsignatura ?? data.nombre} · Máster en IA · En borrador
        </p>
        <h1 className="text-2xl font-semibold leading-snug" style={{ color: '#111827' }}>Resumen general</h1>
        {unsaved && editable && (
          <p className="text-xs mt-2 animate-fade-in" style={{ color: '#F59E0B' }}>● Sin guardar</p>
        )}
      </div>

      {/* Introducción */}
      <Field label="Introducción">
        {editable ? (
          <textarea
            value={data.introduccion}
            onChange={e => set('introduccion', e.target.value)}
            rows={3}
            className="w-full text-base leading-8 outline-none resize-none bg-transparent"
            style={{ color: '#1F2937', caretColor: '#367CFF' }}
          />
        ) : (
          <p className="text-base leading-8" style={{ color: '#1F2937' }}>{data.introduccion}</p>
        )}
      </Field>

      {/* Objetivos */}
      <Field label="Objetivos de aprendizaje">
        <div className="space-y-2">
          {data.objetivos.map((obj, idx) => (
            <div key={idx} className="flex items-start gap-3 group">
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1.5"
                style={{ background: '#E7EFFE', color: '#367CFF' }}
              >
                {idx + 1}
              </span>
              {editable ? (
                <>
                  <input
                    value={obj}
                    onChange={e => setObjetivo(idx, e.target.value)}
                    className="flex-1 text-base leading-8 outline-none bg-transparent"
                    style={{ color: '#1F2937', caretColor: '#367CFF' }}
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
                <p className="flex-1 text-base leading-7 pt-1" style={{ color: '#1F2937' }}>{obj}</p>
              )}
            </div>
          ))}
          {editable && (
            <button
              onClick={addObjetivo}
              className="flex items-center gap-2 text-sm mt-2 transition-all"
              style={{ color: '#D1D5DB', paddingLeft: '32px' }}
              onMouseEnter={e => e.currentTarget.style.color = '#367CFF'}
              onMouseLeave={e => e.currentTarget.style.color = '#D1D5DB'}
            >
              <Plus size={14} /> Agregar objetivo
            </button>
          )}
        </div>
      </Field>

      {/* Extensión */}
      <Field label="Extensión estimada">
        {editable ? (
          <input
            value={data.extension}
            onChange={e => set('extension', e.target.value)}
            className="text-base leading-8 outline-none bg-transparent w-full"
            style={{ color: '#1F2937', caretColor: '#367CFF' }}
          />
        ) : (
          <p className="text-base leading-8" style={{ color: '#1F2937' }}>{data.extension}</p>
        )}
      </Field>

      {/* Epígrafes y puntos destacados */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9CA3AF', letterSpacing: '0.07em' }}>Epígrafes y puntos destacados</p>
        {editable ? (
          <textarea
            value={data.epigrafes}
            onChange={e => set('epigrafes', e.target.value)}
            rows={10}
            className="w-full text-base leading-8 outline-none resize-none bg-transparent"
            style={{ color: '#1F2937', caretColor: '#367CFF' }}
          />
        ) : (
          <div className="space-y-4">
            {data.epigrafes.split('\n\n').map((para, i) => (
              <p key={i} className="text-base leading-8" style={{ color: '#1F2937' }}>{para}</p>
            ))}
          </div>
        )}
      </div>

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
            style={{ background: '#0A5CF5' }}
            onMouseEnter={e => e.currentTarget.style.background = '#0039A3'}
            onMouseLeave={e => e.currentTarget.style.background = '#0A5CF5'}
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
          style={{ background: '#0A5CF5' }}
          onMouseEnter={e => e.currentTarget.style.background = '#0039A3'}
          onMouseLeave={e => e.currentTarget.style.background = '#0A5CF5'}
        >
          <ProdiMark size={14} />
          Generar contenido del tema
          <ChevronRight size={14} />
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
  const [comentarioActivoBloque, setComentarioActivoBloque] = useState(null)
  const [nuevoComentarioTexto, setNuevoComentarioTexto] = useState('')
  const [nuevoComentarioAnchor, setNuevoComentarioAnchor] = useState(null)
  const [quotePendiente, setQuotePendiente] = useState(null)
  const [bloquesState, setBloquesState] = useState(() => {
    // When coming from the author creation flow, topic sections start empty
    if (creacionData?.indice) {
      const emptyTopicSections = {}
      ;['t1','t2','t3','t4','t5','t6'].forEach(t => {
        emptyTopicSections[t] = []
        emptyTopicSections[`recursos-${t}`] = []
        emptyTopicSections[`test-${t}`] = []
      })
      return { indice: bloquesIndice, ...emptyTopicSections }
    }
    return {
      t2: bloquesTema2.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
      t1: bloquesTema1.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
      t3: bloquesTema3.map(b => ({ ...b, comentarios: [] })),
      t4: bloquesTema4.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
      indice: bloquesIndice,
    }
  })
  // Single source of truth for new-subject section statuses.
  // Only sections present here are accessible; absent = sin_comenzar.
  const [estadosSeccion, setEstadosSeccion] = useState(
    () => esAsignaturaNueva ? { indice: 'borrador' } : {}
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
  // When coming from creation flow, topic section blocks are explicitly empty []
  const bloques = bloquesState[seccionActiva] !== undefined ? bloquesState[seccionActiva] : seccion.bloques
  const editable = rolActivo === 'autor'

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
    if (esAsignaturaNueva) {
      const order = [
        'indice', 'resumen',
        'instrucciones-t1', 't1', 'recursos-t1',
        'instrucciones-t2', 't2', 'recursos-t2',
        'instrucciones-t3', 't3', 'recursos-t3',
        'instrucciones-t4', 't4', 'recursos-t4',
        'instrucciones-t5', 't5', 'recursos-t5',
        'instrucciones-t6', 't6', 'recursos-t6',
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

    // DL instrucciones-t1 has its own CTA buttons inside SeccionDLInstrucciones
    if (esAsignaturaNueva && seccionActiva === 'instrucciones-t1') return null

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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-semibold text-white transition-all"
              style={{ background: '#0A5CF5' }}
              onMouseEnter={e => e.currentTarget.style.background = '#0039A3'}
              onMouseLeave={e => e.currentTarget.style.background = '#0A5CF5'}
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

      {/* Page header — single row */}
      <div className="flex-shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>

        <div className="flex items-center gap-2 px-5 py-2.5 min-w-0">
          {/* Breadcrumb text — truncates with ellipsis */}
          <span className="text-xs font-medium truncate min-w-0 flex-shrink" style={{ color: '#9CA3AF' }}>
            {isResumen
              ? 'Resumen de asignatura'
              : [asignaturaData?.nombre, seccion.label].filter(Boolean).join(' · ')}
          </span>
          <StatusIndicator status={toStatusKey(estadoMostrado)} variant="badge" className="flex-shrink-0" />
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
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
          creacionData={creacionData}
          esAsignaturaNueva={esAsignaturaNueva}
          estadosSeccion={estadosSeccion}
        />

        {/* Content area */}
        <main className="flex-1 overflow-y-auto" style={{ background: '#FFFFFF' }} onMouseUp={handleTextSelection} onKeyUp={handleTextSelection}>
          {isResumen ? (
            <SeccionResumen
              editable={editable}
              nombreAsignatura={asignaturaData?.nombre}
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
                  initialScreen={seccion.estado === 'aprobado' || seccionActiva === 'recursos-t2' ? 'list' : 'idle'}
                  editable={editable}
                />
              ) : esAsignaturaNueva && seccionActiva === 'instrucciones-t1' ? (
                <SeccionDLInstrucciones
                  parte={dlInstruccionesParte}
                  datos={dlInstruccionesData}
                  onChange={(key, val) => setDlInstruccionesData(prev => ({ ...prev, [key]: val }))}
                  generandoResumen={dlGenerandoResumen}
                  dlGenerandoContenido={dlGenerandoContenido}
                  onGenerarResumen={() => {
                    setDlGenerandoResumen(true)
                    setTimeout(() => { setDlGenerandoResumen(false); setDlInstruccionesParte(2) }, 1400)
                  }}
                  onGenerarContenido={() => {
                    setDlGenerandoContenido(true)
                    setTimeout(() => {
                      setBloquesState(prev => ({ ...prev, t1: dlBloquesTema1 }))
                      setEstadosSeccion(prev => ({ ...prev, t1: prev.t1 ?? 'borrador' }))
                      setDlGenerandoContenido(false)
                      setSeccionActiva('t1')
                    }, 1600)
                  }}
                  onVolverAInstrucciones={() => setDlInstruccionesParte(1)}
                />
              ) : seccionActiva === 'indice' && creacionData?.indice ? (
                <SeccionIndice
                  bloques={bloques}
                  creacionData={creacionData}
                  onCreacionDataConsumed={onCreacionDataConsumed}
                  onGenerarResumen={() => {
                    setResumenPrefill(creacionData?.resumen || null)
                    setEstadosSeccion(prev => ({ ...prev, indice: 'aprobado', resumen: 'borrador' }))
                    setSeccionActiva('resumen')
                  }}
                />
              ) : seccionActiva === 'indice' ? (
                <SeccionIndiceFija bloques={bloques} />
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
            style={{ color: panelIAabierto ? '#367CFF' : '#9CA3AF' }}
            onMouseEnter={e => { if (!panelIAabierto) e.currentTarget.style.background = '#F1F5F9' }}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <ProdiMark size={18} />
            <span className="text-center leading-tight" style={{ fontSize: '9px', fontWeight: panelIAabierto ? '600' : '500' }}>Asistente</span>
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
          style={{ background: '#367CFF', zIndex: 100 }}>
          ✓ Tema 2 enviado a revisión
        </div>
      )}
    </div>
  )
}

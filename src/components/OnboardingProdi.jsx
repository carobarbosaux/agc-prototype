import { useState, useEffect } from 'react'
import {
  Sparkles, X, ChevronRight, ChevronLeft,
  MessageSquare, StickyNote, Expand, RotateCcw,
  BookOpen, Microscope, ArrowUpRight, Check,
} from 'lucide-react'
import { onboardingSlides } from '../data/onboardingProdiData'
import { ProdiMark, ProdiWordmark } from './ProdiLogo'

// ─── Visual mockups per slide ─────────────────────────────────────────────────

function VisualEditorZoom() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.10)', border: '1px solid #E5E7EB' }}>
        {/* Editor toolbar mockup */}
        <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F87171' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FCD34D' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#4ADE80' }} />
          <div className="flex-1 mx-3 h-5 rounded-md" style={{ background: '#F1F5F9' }} />
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#E7EFFE' }}>
            <Sparkles size={11} style={{ color: '#367CFF' }} />
          </div>
        </div>
        {/* Content mockup */}
        <div className="px-5 py-4 space-y-3" style={{ background: '#FFFFFF' }}>
          <div className="h-4 rounded-md w-2/3" style={{ background: '#F1F5F9' }} />
          <div className="h-3 rounded-md w-full" style={{ background: '#F8F9FA' }} />
          <div className="h-3 rounded-md w-4/5" style={{ background: '#F8F9FA' }} />
          <div className="h-3 rounded-md w-full" style={{ background: '#F8F9FA' }} />
          <div className="h-3 rounded-md w-3/4" style={{ background: '#F8F9FA' }} />
          {/* Highlighted block */}
          <div className="h-3 rounded-md w-full" style={{ background: '#E7EFFE' }} />
          <div className="h-3 rounded-md w-2/3" style={{ background: '#E7EFFE' }} />
        </div>
        {/* Prodi badge */}
        <div className="px-5 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: '#E7EFFE', border: '1px solid #BAD2FF' }}>
            <ProdiMark size={14} />
            <span className="text-xs font-semibold" style={{ color: '#0047CC' }}>Prodi</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function VisualCanvasOverview() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.10)', border: '1px solid #E5E7EB' }}>
        <div className="flex gap-0" style={{ minHeight: '180px' }}>
          {/* Sidebar */}
          <div className="w-28 flex-shrink-0 p-3 space-y-1.5" style={{ background: '#F8F9FA', borderRight: '1px solid #F1F5F9' }}>
            {['Índice', 'Tema 1', 'Tema 2', 'Tema 3'].map((item, i) => (
              <div key={item} className="px-2 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: i === 1 ? '#E7EFFE' : 'transparent', color: i === 1 ? '#0047CC' : '#6B7280' }}>
                {item}
              </div>
            ))}
          </div>
          {/* Content */}
          <div className="flex-1 p-4 space-y-2.5" style={{ background: '#FFFFFF' }}>
            <div className="h-4 w-3/4 rounded-md" style={{ background: '#F1F5F9' }} />
            <div className="h-3 w-full rounded-md" style={{ background: '#F8F9FA' }} />
            <div className="h-3 w-5/6 rounded-md" style={{ background: '#F8F9FA' }} />
            <div className="h-3 w-full rounded-md" style={{ background: '#F8F9FA' }} />
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: '#E7EFFE', color: '#0047CC', border: '1px solid #BAD2FF' }}>
              <Sparkles size={10} style={{ color: '#367CFF' }} />
              Generar contenido
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function VisualContextualSelection() {
  const [showMenu, setShowMenu] = useState(false)
  const [activeAction, setActiveAction] = useState(null)

  useEffect(() => {
    const t1 = setTimeout(() => setShowMenu(true), 600)
    const t2 = setTimeout(() => setActiveAction(0), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const actions = [
    { icon: RotateCcw, label: 'Corregir redacción', color: '#367CFF' },
    { icon: Expand, label: 'Expandir o resumir', color: '#367CFF' },
    { icon: Sparkles, label: 'Regenerar texto', color: '#7C3AED' },
    { icon: BookOpen, label: 'Buscar bibliografía', color: '#059669' },
    { icon: Microscope, label: 'Deep research', color: '#D97706' },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-3">
        {/* Text block with selection */}
        <div className="relative rounded-xl p-4 space-y-2" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <div className="h-3 w-full rounded" style={{ background: '#F1F5F9' }} />
          <div className="flex gap-1 items-center">
            <div className="h-3 rounded flex-1" style={{ background: '#BAD2FF' }} />
            <div className="h-3 rounded w-1/3" style={{ background: '#BAD2FF' }} />
          </div>
          <div className="h-3 w-4/5 rounded" style={{ background: '#F1F5F9' }} />
          {/* Floating menu */}
          {showMenu && (
            <div className="absolute left-4 -top-10 flex items-center gap-1 px-2 py-1.5 rounded-lg"
              style={{ background: '#1A1A1A', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', animation: 'fadeInUp 0.25s ease' }}>
              {[
                { icon: Sparkles, label: 'IA' },
                { icon: MessageSquare, label: 'Comentar' },
                { icon: StickyNote, label: 'Nota' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1 px-2 py-1 rounded-md"
                  style={{ color: '#E5E7EB' }}>
                  <Icon size={11} />
                  <span className="text-xs">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Actions list */}
        <div className="space-y-1">
          {actions.map(({ icon: Icon, label, color }, i) => (
            <div key={label}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
              style={{
                background: activeAction === i ? `${color}10` : '#FFFFFF',
                border: `1px solid ${activeAction === i ? color + '40' : '#F1F5F9'}`,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.2s',
              }}>
              <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}14` }}>
                <Icon size={10} style={{ color }} />
              </div>
              <span className="text-xs font-medium" style={{ color: '#374151' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VisualSidePanel() {
  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <div className="w-full max-w-xs space-y-2">
        {/* AI Panel */}
        <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
          <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: '#E7EFFE', borderBottom: '1px solid #BAD2FF' }}>
            <ProdiMark size={16} />
            <span className="text-xs font-semibold" style={{ color: '#0047CC' }}>Prodi</span>
          </div>
          <div className="p-3 space-y-2" style={{ background: '#FFFFFF' }}>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-md flex-shrink-0 flex items-center justify-center" style={{ background: '#E7EFFE' }}>
                <Sparkles size={7} style={{ color: '#367CFF' }} />
              </div>
              <div className="px-2.5 py-1.5 rounded-xl text-xs leading-relaxed" style={{ background: '#F8F9FA', color: '#374151', maxWidth: '140px' }}>
                ¿En qué puedo ayudarte hoy?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-2.5 py-1.5 rounded-xl text-xs" style={{ background: '#367CFF', color: '#FFFFFF', maxWidth: '120px' }}>
                Investigar fuentes sobre CNN
              </div>
            </div>
          </div>
          <div className="px-3 pb-3" style={{ background: '#FFFFFF' }}>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}>
              <span className="flex-1 text-xs" style={{ color: '#9CA3AF' }}>Escribe tu pregunta…</span>
              <div className="w-4 h-4 rounded-md flex items-center justify-center" style={{ background: '#367CFF' }}>
                <ArrowUpRight size={9} style={{ color: '#FFFFFF' }} />
              </div>
            </div>
          </div>
        </div>
        {/* Notes + Comments */}
        <div className="flex gap-2">
          <div className="flex-1 rounded-xl p-2.5 flex items-start gap-2" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <StickyNote size={11} style={{ color: '#CA8A04', flexShrink: 0, marginTop: '1px' }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: '#92400E' }}>Nota</p>
              <p className="text-xs leading-snug mt-0.5" style={{ color: '#78350F' }}>Revisar con más ejemplos</p>
            </div>
          </div>
          <div className="flex-1 rounded-xl p-2.5 flex items-start gap-2" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
            <MessageSquare size={11} style={{ color: '#2563EB', flexShrink: 0, marginTop: '1px' }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: '#1E40AF' }}>Comentario</p>
              <p className="text-xs leading-snug mt-0.5" style={{ color: '#1E3A8A' }}>¿Ampliamos el 2.3?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function VisualFinalState() {
  const caps = [
    { label: 'Generar', desc: 'contenido desde cero' },
    { label: 'Editar', desc: 'y mejorar fragmentos' },
    { label: 'Revisar', desc: 'calidad y coherencia' },
  ]
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="flex items-center gap-6 w-full max-w-xs">
        {/* Logo */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#FFFFFF', boxShadow: '0 12px 32px rgba(99,102,241,0.15)', border: '1px solid #E5E7EB' }}>
            <ProdiMark size={38} />
          </div>
          <p className="text-xs font-semibold text-center" style={{ color: '#1A1A1A' }}>Prodi</p>
        </div>
        {/* Tags vertical */}
        <div className="flex flex-col gap-2 flex-1">
          {caps.map(({ label, desc }) => (
            <div key={label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
              style={{ background: '#FFFFFF', border: '1px solid #E7EFFE', boxShadow: '0 2px 8px rgba(54,124,255,0.08)' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#E7EFFE' }}>
                <Check size={10} style={{ color: '#367CFF' }} />
              </div>
              <div>
                <span className="text-xs font-semibold block" style={{ color: '#0047CC' }}>{label}</span>
                <span className="text-xs leading-none" style={{ color: '#9CA3AF' }}>{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const VISUAL_MAP = {
  'editor-zoom': VisualEditorZoom,
  'canvas-overview': VisualCanvasOverview,
  'contextual-selection': VisualContextualSelection,
  'side-panel': VisualSidePanel,
  'final-state': VisualFinalState,
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function OnboardingProdi({ onClose, onOpenAssistant }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [exiting, setExiting] = useState(false)

  const slide = onboardingSlides[slideIndex]
  const isFirst = slideIndex === 0
  const isLast = slideIndex === onboardingSlides.length - 1
  const Visual = VISUAL_MAP[slide.visualType] || VisualEditorZoom

  const goNext = () => {
    if (isLast) return
    setSlideIndex(i => i + 1)
  }

  const goBack = () => {
    if (isFirst) return
    setSlideIndex(i => i - 1)
  }

  const handleClose = () => {
    setExiting(true)
    setTimeout(onClose, 200)
  }

  const handleCta = () => {
    handleClose()
    onOpenAssistant?.()
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0,0,0,0.45)', transition: 'opacity 0.2s', opacity: exiting ? 0 : 1 }}
      onClick={handleClose}
    >
      <div
        className="flex overflow-hidden"
        style={{
          width: '780px',
          maxWidth: '95vw',
          height: '480px',
          maxHeight: '90vh',
          background: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
          transition: 'transform 0.2s, opacity 0.2s',
          transform: exiting ? 'scale(0.97)' : 'scale(1)',
          opacity: exiting ? 0 : 1,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Left panel — step list */}
        <div className="flex flex-col justify-between px-7 py-7 flex-shrink-0"
          style={{ width: '220px', background: '#F8F9FA', borderRight: '1px solid #F1F5F9' }}>
          <div>
            {/* Prodi brand */}
            <div className="flex items-center gap-2 mb-8">
              <ProdiWordmark height={20} />
            </div>

            {/* Step list */}
            <div className="space-y-1">
              {onboardingSlides.map((s, i) => {
                const isPast = i < slideIndex
                const isActive = i === slideIndex
                return (
                  <button
                    key={s.id}
                    onClick={() => setSlideIndex(i)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all"
                    style={{ background: isActive ? '#E7EFFE' : 'transparent' }}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        background: isActive ? '#367CFF' : isPast ? '#DCFCE7' : '#E5E7EB',
                        border: isActive ? '2px solid #367CFF' : isPast ? '2px solid #16A34A' : '2px solid #E5E7EB',
                      }}>
                      {isPast
                        ? <Check size={10} style={{ color: '#16A34A' }} />
                        : <span className="text-xs font-semibold" style={{ color: isActive ? '#FFFFFF' : '#9CA3AF', fontSize: '10px' }}>{i + 1}</span>
                      }
                    </div>
                    <span className="text-xs font-medium truncate"
                      style={{ color: isActive ? '#0047CC' : isPast ? '#374151' : '#9CA3AF' }}>
                      {s.title || s.stepLabel || `Paso ${i + 1}`}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs" style={{ color: '#9CA3AF' }}>{slideIndex + 1} de {onboardingSlides.length}</span>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height: '4px', background: '#E5E7EB' }}>
              <div className="h-full rounded-full transition-all"
                style={{ background: 'linear-gradient(90deg, #367CFF, #7C3AED)', width: `${((slideIndex + 1) / onboardingSlides.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Right panel — slide content */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Close button */}
          <div className="flex justify-end px-6 pt-5 pb-0 flex-shrink-0">
            <button onClick={handleClose}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
              style={{ background: '#F1F5F9', color: '#9CA3AF' }}
              onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
              onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}>
              <X size={13} />
            </button>
          </div>

          {/* Content + visual */}
          <div className="flex flex-1 min-h-0 px-8 pb-0 gap-6">
            {/* Text content */}
            <div className="flex flex-col justify-center gap-3 flex-1 min-w-0" style={{ maxWidth: '240px' }}>
              {!slide.titleFirst && slide.body && (
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#374151' }}>{slide.body}</p>
              )}
              {slide.title && (
                <div>
                  <h2 className="text-xl font-bold leading-tight" style={{ color: '#1A1A1A' }}>{slide.title}</h2>
                  {slide.subtitle && (
                    <p className="text-sm mt-1" style={{ color: '#6B7280' }}>{slide.subtitle}</p>
                  )}
                </div>
              )}
              {slide.titleFirst && slide.body && (
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#374151' }}>{slide.body}</p>
              )}
              {slide.bullets && slide.bullets.length > 0 && (
                <div className="space-y-1.5">
                  {slide.bullets.map(b => (
                    <div key={b} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#367CFF' }} />
                      <span className="text-sm" style={{ color: '#374151' }}>{b}</span>
                    </div>
                  ))}
                </div>
              )}
              {slide.additionalSection && (
                <div className="mt-1">
                  <p className="text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>{slide.additionalSection.label}</p>
                  <div className="space-y-1">
                    {slide.additionalSection.items.map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#9CA3AF' }} />
                        <span className="text-sm" style={{ color: '#374151' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Visual area */}
            <div className="flex-1 min-w-0 rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ background: '#F8F9FA', border: '1px solid #F1F5F9', minHeight: '240px' }}>
              <Visual key={slideIndex} />
            </div>
          </div>

          {/* Footer nav */}
          <div className="flex items-center justify-between px-8 py-5 flex-shrink-0" style={{ borderTop: '1px solid #F8F9FA' }}>
            <button
              onClick={goBack}
              disabled={isFirst}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                color: isFirst ? '#CBD5E1' : '#6B7280',
                background: isFirst ? 'transparent' : '#F1F5F9',
                cursor: isFirst ? 'default' : 'pointer',
              }}
              onMouseEnter={e => { if (!isFirst) e.currentTarget.style.background = '#E5E7EB' }}
              onMouseLeave={e => { if (!isFirst) e.currentTarget.style.background = '#F1F5F9' }}
            >
              <ChevronLeft size={15} />
              Anterior
            </button>

            {isLast ? (
              <button
                onClick={handleCta}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ background: 'linear-gradient(135deg, #367CFF 0%, #7C3AED 100%)', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {slide.cta}
              </button>
            ) : (
              <button
                onClick={goNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all"
                style={{ background: '#0A5CF5', color: '#FFFFFF' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0039A3'}
                onMouseLeave={e => e.currentTarget.style.background = '#0A5CF5'}
              >
                Siguiente
                <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

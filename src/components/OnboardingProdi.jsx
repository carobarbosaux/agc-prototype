import { useState, useEffect } from 'react'
import {
  Sparkles, X, ChevronRight, ChevronLeft,
  MessageSquare, StickyNote, Search, Expand, RotateCcw,
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

  useEffect(() => {
    const t = setTimeout(() => setShowMenu(true), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-xs">
        {/* Text block */}
        <div className="rounded-xl p-4 space-y-2" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <div className="h-3 w-full rounded" style={{ background: '#F1F5F9' }} />
          <div className="flex gap-1 items-center">
            <div className="h-3 rounded flex-1" style={{ background: '#BAD2FF' }} />
            <div className="h-3 rounded w-1/3" style={{ background: '#BAD2FF' }} />
          </div>
          <div className="h-3 w-4/5 rounded" style={{ background: '#F1F5F9' }} />
        </div>
        {/* Floating menu */}
        {showMenu && (
          <div className="absolute left-4 -top-12 flex items-center gap-1 px-2 py-1.5 rounded-lg"
            style={{
              background: '#1A1A1A', boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              animation: 'fadeInUp 0.25s ease',
            }}>
            {[
              { icon: Sparkles, label: 'IA' },
              { icon: MessageSquare, label: 'Comentar' },
              { icon: StickyNote, label: 'Nota' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer"
                style={{ color: '#E5E7EB' }}
                onMouseEnter={e => e.currentTarget.style.background = '#374151'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <Icon size={11} />
                <span className="text-xs">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function VisualContextualActions() {
  const actions = [
    { icon: RotateCcw, label: 'Corregir redacción', color: '#367CFF' },
    { icon: Expand, label: 'Expandir o resumir', color: '#367CFF' },
    { icon: Sparkles, label: 'Regenerar texto', color: '#7C3AED' },
    { icon: BookOpen, label: 'Buscar bibliografía', color: '#059669' },
    { icon: Microscope, label: 'Deep research', color: '#D97706' },
  ]
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-1.5">
        {actions.map(({ icon: Icon, label, color }, i) => (
          <div key={label}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{
              background: '#FFFFFF',
              border: '1px solid #F1F5F9',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              transform: `translateX(${i % 2 === 0 ? '0' : '8px'})`,
              opacity: i === 0 ? 1 : 0.7 + i * 0.05,
            }}>
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${color}14` }}>
              <Icon size={12} style={{ color }} />
            </div>
            <span className="text-xs font-medium" style={{ color: '#374151' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function VisualSidePanel() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-xs rounded-2xl overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.10)', border: '1px solid #E5E7EB' }}>
        {/* Panel header */}
        <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#E7EFFE', borderBottom: '1px solid #BAD2FF' }}>
          <ProdiMark size={20} />
          <span className="text-sm font-semibold" style={{ color: '#0047CC' }}>Prodi</span>
        </div>
        {/* Messages */}
        <div className="p-4 space-y-3" style={{ background: '#FFFFFF' }}>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center" style={{ background: '#E7EFFE' }}>
              <Sparkles size={8} style={{ color: '#367CFF' }} />
            </div>
            <div className="px-3 py-2 rounded-xl text-xs leading-relaxed" style={{ background: '#F8F9FA', color: '#374151', maxWidth: '160px' }}>
              ¿En qué puedo ayudarte hoy?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="px-3 py-2 rounded-xl text-xs" style={{ background: '#367CFF', color: '#FFFFFF', maxWidth: '140px' }}>
              Investigar fuentes sobre CNN
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center" style={{ background: '#E7EFFE' }}>
              <Sparkles size={8} style={{ color: '#367CFF' }} />
            </div>
            <div className="px-3 py-2 rounded-xl text-xs leading-relaxed" style={{ background: '#F8F9FA', color: '#374151', maxWidth: '160px' }}>
              Aquí tienes algunas referencias clave...
            </div>
          </div>
        </div>
        {/* Input */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}>
            <span className="flex-1 text-xs" style={{ color: '#9CA3AF' }}>Escribe tu pregunta…</span>
            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: '#367CFF' }}>
              <ArrowUpRight size={10} style={{ color: '#FFFFFF' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function VisualNotesComments() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-3">
        {/* Note */}
        <div className="rounded-xl p-3 flex items-start gap-3" style={{ background: '#FFFBEB', border: '1px solid #FDE68A', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#FEF9C3' }}>
            <StickyNote size={12} style={{ color: '#CA8A04' }} />
          </div>
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: '#92400E' }}>Nota personal</p>
            <p className="text-xs leading-relaxed" style={{ color: '#78350F' }}>Revisar esta sección con más ejemplos prácticos.</p>
          </div>
        </div>
        {/* Comment */}
        <div className="rounded-xl p-3 flex items-start gap-3" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#DBEAFE' }}>
            <MessageSquare size={12} style={{ color: '#2563EB' }} />
          </div>
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: '#1E40AF' }}>Comentario — Carlos M.</p>
            <p className="text-xs leading-relaxed" style={{ color: '#1E3A8A' }}>¿Podemos ampliar el apartado 2.3?</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function VisualFinalState() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center" style={{ background: '#FFFFFF', boxShadow: '0 12px 32px rgba(99,102,241,0.15)', border: '1px solid #E5E7EB' }}>
          <ProdiMark size={48} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Prodi está listo</p>
          <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>Tu asistente de contenidos</p>
        </div>
        <div className="flex items-center gap-3">
          {['Generar', 'Editar', 'Revisar'].map(cap => (
            <div key={cap} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
              style={{ background: '#E7EFFE', border: '1px solid #BAD2FF' }}>
              <Check size={9} style={{ color: '#367CFF' }} />
              <span className="text-xs font-medium" style={{ color: '#0047CC' }}>{cap}</span>
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
  'contextual-actions': VisualContextualActions,
  'side-panel': VisualSidePanel,
  'notes-comments': VisualNotesComments,
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
                      {s.title || `Paso ${i + 1}`}
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
            <div className="flex flex-col justify-center gap-4 flex-1 min-w-0" style={{ maxWidth: '240px' }}>
              {slide.title && (
                <div>
                  <h2 className="text-xl font-bold leading-tight" style={{ color: '#1A1A1A' }}>{slide.title}</h2>
                  {slide.subtitle && (
                    <p className="text-sm mt-1" style={{ color: '#6B7280' }}>{slide.subtitle}</p>
                  )}
                </div>
              )}
              {slide.body && (
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#374151' }}>{slide.body}</p>
              )}
              {slide.bullets && slide.bullets.length > 0 && (
                <div className="space-y-2">
                  {slide.bullets.map(b => (
                    <div key={b} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#367CFF' }} />
                      <span className="text-sm" style={{ color: '#374151' }}>{b}</span>
                    </div>
                  ))}
                </div>
              )}
              {slide.concepts && (
                <div className="space-y-2 mt-1">
                  {slide.concepts.map(c => (
                    <div key={c.label} className="px-3 py-2 rounded-lg" style={{ background: '#F8F9FA', border: '1px solid #F1F5F9' }}>
                      <span className="text-xs font-semibold" style={{ color: '#1A1A1A' }}>{c.label}</span>
                      <span className="text-xs ml-1.5" style={{ color: '#6B7280' }}>→ {c.desc}</span>
                    </div>
                  ))}
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
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ background: '#367CFF', color: '#FFFFFF' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0A5CF5'}
                onMouseLeave={e => e.currentTarget.style.background = '#367CFF'}
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

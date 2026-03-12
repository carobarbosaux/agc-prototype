import { Clock, Pencil, Eye, CheckCircle, Lock } from 'lucide-react'
import { useState } from 'react'

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  sin_comenzar: {
    label: 'Asignado',
    icon: Clock,
    bg: '#EEF2F7',
    color: '#64748B',
  },
  editando: {
    label: 'Editando',
    icon: Pencil,
    bg: '#EAF2FF',
    color: '#0A5CF5',
  },
  revisando: {
    label: 'Revisando',
    icon: Eye,
    bg: '#FFF4DB',
    color: '#C88700',
  },
  aprobado: {
    label: 'Aprobado',
    icon: CheckCircle,
    bg: '#EAF8EF',
    color: '#1F8F4C',
  },
  bloqueado: {
    label: 'Bloqueado',
    icon: Lock,
    bg: '#F3F4F6',
    color: '#4B5563',
  },
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tooltip({ label, visible }) {
  if (!visible) return null
  return (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 pointer-events-none"
      style={{ zIndex: 100 }}
    >
      <div
        className="px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap"
        style={{
          background: '#1E293B',
          color: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </div>
      {/* Arrow */}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #1E293B',
        }}
      />
    </div>
  )
}

// ─── StatusIndicator ──────────────────────────────────────────────────────────

export default function StatusIndicator({
  status,
  variant = 'badge',
  showTooltip = true,
  size = 'md',
  className = '',
}) {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.sin_comenzar
  const Icon = cfg.icon

  // ── Variant: icon-only ─────────────────────────────────────────────────────
  if (variant === 'icon') {
    const dim = size === 'sm' ? 20 : 28
    const iconSize = size === 'sm' ? 10 : 13
    return (
      <div
        className={`relative inline-flex ${className}`}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        onFocus={() => setTooltipVisible(true)}
        onBlur={() => setTooltipVisible(false)}
      >
        <div
          role="img"
          aria-label={cfg.label}
          tabIndex={0}
          className="flex items-center justify-center rounded-full outline-none focus-visible:ring-2"
          style={{
            width: dim,
            height: dim,
            background: cfg.bg,
            color: cfg.color,
            '--tw-ring-color': cfg.color + '44',
          }}
        >
          <Icon size={iconSize} strokeWidth={2} aria-hidden="true" />
        </div>
        {showTooltip && <Tooltip label={cfg.label} visible={tooltipVisible} />}
      </div>
    )
  }

  // ── Variant: badge ─────────────────────────────────────────────────────────
  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      onFocus={() => setTooltipVisible(true)}
      onBlur={() => setTooltipVisible(false)}
    >
      <span
        role="status"
        aria-label={cfg.label}
        tabIndex={0}
        className="inline-flex items-center gap-1.5 rounded-md font-medium outline-none focus-visible:ring-2"
        style={{
          paddingInline: '8px',
          paddingBlock: '4px',
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.01em',
          background: cfg.bg,
          color: cfg.color,
          fontFamily: "'Inter', 'Arial', sans-serif",
          '--tw-ring-color': cfg.color + '44',
        }}
      >
        <Icon size={11} strokeWidth={2.2} aria-hidden="true" style={{ flexShrink: 0 }} />
        {cfg.label}
      </span>
      {showTooltip && <Tooltip label={cfg.label} visible={tooltipVisible} />}
    </div>
  )
}

// ─── Named export for config (for external use) ───────────────────────────────
export { STATUS_CONFIG }

// Maps legacy estadoConfig keys → StatusIndicator keys
export function toStatusKey(legacy) {
  const map = {
    porComenzar:  'sin_comenzar',
    sin_comenzar: 'sin_comenzar',
    bloqueado:    'bloqueado',
    borrador:     'editando',
    revision:     'revisando',
    comentarios:  'revisando',
    aprobado:     'aprobado',
    publicado:    'aprobado',
    disenado:     'aprobado',
  }
  return map[legacy] || 'sin_comenzar'
}

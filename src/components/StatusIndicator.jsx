import { Clock, Pencil, Eye, CheckCircle, Lock, BookmarkSimple } from '@phosphor-icons/react'

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
  en_borrador: {
    label: 'En borrador',
    icon: BookmarkSimple,
    bg: '#FFF7ED',
    color: '#C2500A',
  },
}

// ─── StatusIndicator ──────────────────────────────────────────────────────────

export default function StatusIndicator({
  status,
  variant = 'badge',
  size = 'md',
  className = '',
}) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.sin_comenzar
  const Icon = cfg.icon

  // ── Variant: icon-only ─────────────────────────────────────────────────────
  if (variant === 'icon') {
    const dim = size === 'sm' ? 20 : 28
    const iconSize = size === 'sm' ? 10 : 13
    return (
      <div
        role="img"
        aria-label={cfg.label}
        className={`inline-flex items-center justify-center rounded-full ${className}`}
        style={{ width: dim, height: dim, background: cfg.bg, color: cfg.color }}
      >
        <Icon size={iconSize} strokeWidth={2} aria-hidden="true" />
      </div>
    )
  }

  // ── Variant: badge ─────────────────────────────────────────────────────────
  return (
    <div
      data-darkmode="Off"
      data-rounded="No"
      data-severity={status}
      role="status"
      aria-label={cfg.label}
      className={`inline-flex items-center ${className}`}
      style={{
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3.5,
        paddingBottom: 3.5,
        background: cfg.bg,
        borderRadius: 6,
        gap: 4,
      }}
    >
      <Icon size={11} strokeWidth={2.2} aria-hidden="true" style={{ color: cfg.color, flexShrink: 0 }} />
      <div
        style={{
          color: cfg.color,
          fontSize: 12,
          fontFamily: 'Proeduca Sans',
          fontWeight: '500',
          lineHeight: '15.84px',
          wordWrap: 'break-word',
        }}
      >
        {cfg.label}
      </div>
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
    enBorrador:   'en_borrador',
  }
  return map[legacy] || 'sin_comenzar'
}

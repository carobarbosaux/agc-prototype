import { estadoConfig } from '../mockData'

export default function EstadoBadge({ estado, size = 'md' }) {
  const cfg = estadoConfig[estado] || estadoConfig.porComenzar

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md ${sizeClasses[size]}`}
      style={{
        background: cfg.bg,
        color: cfg.text,
        border: `1px solid ${cfg.border}`,
        fontFamily: "'Proeduca Sans', system-ui, sans-serif",
        letterSpacing: '0.01em',
      }}
    >
      <span
        className="rounded-full flex-shrink-0"
        style={{ width: '5px', height: '5px', background: cfg.dot }}
      />
      {cfg.label}
    </span>
  )
}

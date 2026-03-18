import { gravedadConfig } from '../mockData'

export default function GravedadTag({ gravedad, size = 'md' }) {
  const cfg = gravedadConfig[gravedad] || gravedadConfig.nota

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded ${sizeClasses[size]}`}
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        fontFamily: "'Proeduca Sans', system-ui, sans-serif",
      }}
    >
      {cfg.label}
    </span>
  )
}

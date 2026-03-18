import { ArrowRight, Warning, Lightbulb, Info, ShieldWarning } from '@phosphor-icons/react'
import { misPendientes, gravedadConfig } from '../mockData'

const gravedadIcon = {
  critico: Warning,
  importante: Warning,
  sugerencia: Lightbulb,
  nota: Info,
  alertaNormativa: ShieldWarning,
}

export default function PanelMisPendientes({ rolActivo, onNavigate }) {
  const items = misPendientes

  return (
    <div
      className="flex flex-col h-full rounded-2xl overflow-hidden"
      style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Mis pendientes</p>
          <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
            {items.filter(i => i.activo).length} activos
          </p>
        </div>
        <div
          className="text-xs font-semibold px-2 py-0.5 rounded-md"
          style={{ background: '#FEF2F2', color: '#EF4444', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}
        >
          {items.filter(i => i.gravedad === 'critico').length} críticos
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto py-1">
        {items.map((item, i) => {
          const cfg = gravedadConfig[item.gravedad] || gravedadConfig.nota
          const Icon = gravedadIcon[item.gravedad] || Info
          const clickable = item.activo && item.canvasDestino

          return (
            <div
              key={item.id}
              onClick={() => clickable && onNavigate('canvas', { seccion: item.canvasDestino })}
              className="flex items-start gap-3 px-4 py-3 transition-all group"
              style={{
                borderBottom: i < items.length - 1 ? '1px solid #F8F9FA' : 'none',
                cursor: clickable ? 'pointer' : 'default',
                background: item.activo ? 'transparent' : '#FAFAFA',
              }}
              onMouseEnter={e => { if (clickable) e.currentTarget.style.background = '#F8F9FA' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              {/* Gravedad icon */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
              >
                <Icon size={13} style={{ color: cfg.color }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium leading-snug"
                  style={{ color: clickable ? '#1A1A1A' : '#64748B' }}
                >
                  {item.titulo}
                </p>
                <p className="text-xs mt-0.5 truncate" style={{ color: '#6B7280' }}>
                  {item.asignatura}
                </p>
                <p className="text-xs truncate" style={{ color: '#6B7280' }}>
                  {item.seccion}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{
                      background: cfg.bg,
                      color: cfg.color,
                      fontFamily: "'Proeduca Sans', system-ui, sans-serif",
                    }}
                  >
                    {cfg.label}
                  </span>
                  <span className="text-xs" style={{ color: '#6B7280' }}>·</span>
                  <span className="text-xs" style={{ color: '#6B7280' }}>{item.tiempo}</span>
                </div>
              </div>

              {/* Arrow */}
              {clickable && (
                <ArrowRight
                  size={13}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                  style={{ color: '#9CA3AF' }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

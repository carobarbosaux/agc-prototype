import { AlertTriangle, RefreshCw, BarChart2, Flame } from 'lucide-react'
import { calidadContenidosIndicadores } from '../mockData'

const cards = [
  {
    id: 'alertas',
    label: 'Alertas normativas',
    tooltip: 'Asignaturas con contenido desactualizado respecto a normativa vigente',
    getValue: (d) => d.alertasNormativas,
    icon: AlertTriangle,
    color: '#F97316',
    bgColor: '#FFF7ED',
    borderColor: '#FED7AA',
    suffix: '',
    description: 'requieren revisión',
    urgente: true,
  },
  {
    id: 'revision',
    label: 'Revisión profunda',
    tooltip: 'Porcentaje de contenido que ha superado revisión profunda de calidad',
    getValue: (d) => `${d.revisionProfunda}%`,
    icon: RefreshCw,
    color: '#367CFF',
    bgColor: '#E7EFFE',
    borderColor: '#BAD2FF',
    suffix: '',
    description: 'completado',
    urgente: false,
  },
  {
    id: 'ise',
    label: 'ISE medio ponderado',
    tooltip: 'Índice de Satisfacción Estudiantil medio de todas las asignaturas activas',
    getValue: (d) => d.iseMediaPonderado.toFixed(1),
    icon: BarChart2,
    color: '#10B981',
    bgColor: '#F0FDF4',
    borderColor: '#A7F3D0',
    suffix: '/5',
    description: 'valoración media',
    urgente: false,
  },
  {
    id: 'critico',
    label: 'Estado crítico',
    tooltip: 'Asignaturas con comentarios críticos no resueltos o bloqueadas en el pipeline',
    getValue: (d) => d.asignaturasEstadoCritico,
    icon: Flame,
    color: '#EF4444',
    bgColor: '#FEF2F2',
    borderColor: '#FECACA',
    suffix: '',
    description: 'asignaturas bloqueadas',
    urgente: true,
  },
]

export default function CalidadContenidosCards({ onCardClick }) {
  const data = calidadContenidosIndicadores

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold" style={{ color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Calidad de contenidos
        </span>
        <div className="flex-1 h-px" style={{ background: '#F1F5F9' }} />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => {
          const Icon = card.icon
          const valor = card.getValue(data)

          return (
            <button
              key={card.id}
              onClick={() => onCardClick && onCardClick(card.id)}
              className="text-left rounded-xl p-4 transition-all"
              style={{
                background: card.bgColor,
                border: `1px solid ${card.borderColor}`,
                cursor: onCardClick ? 'pointer' : 'default',
              }}
              onMouseEnter={e => {
                if (onCardClick) e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: '#FFFFFF' }}
                >
                  <Icon size={15} style={{ color: card.color }} />
                </div>
                {card.urgente && (
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: card.color }}
                  />
                )}
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span
                  className="text-2xl font-bold"
                  style={{ color: card.color, fontFamily: "'Inter', sans-serif" }}
                >
                  {valor}
                </span>
                {card.suffix && (
                  <span className="text-sm font-medium" style={{ color: card.color, opacity: 0.7 }}>
                    {card.suffix}
                  </span>
                )}
              </div>

              <p className="text-xs font-semibold mb-0.5" style={{ color: '#374151' }}>
                {card.label}
              </p>
              <p className="text-xs" style={{ color: '#9CA3AF' }}>
                {card.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

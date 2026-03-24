import { useState } from 'react'
import { X, CaretRight, CheckCircle } from '@phosphor-icons/react'
import { notificaciones } from '../mockData'

const FILTROS = [
  { id: 'todas', label: 'Todas' },
  { id: 'accion', label: 'Pendiente de mi acción' },
  { id: 'info', label: 'Informativas' },
]

// Design system toast styles per notification type
const tipoEstilos = {
  comentarios: {
    bg: 'var(--warning-warning-100, #FEF7E1)',
    border: 'var(--warning-warning-800, #A47B04)',
    iconColor: 'var(--warning-warning-950, #735603)',
    // Warning triangle icon
    Icon: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1.5 13.5L8 2L14.5 13.5H1.5Z" stroke="var(--warning-warning-950, #735603)" strokeWidth="1" fill="none"/>
        <circle cx="8" cy="11.5" r="0.75" fill="var(--warning-warning-950, #735603)"/>
        <line x1="8" y1="6" x2="8" y2="10" stroke="var(--warning-warning-950, #735603)" strokeWidth="1"/>
      </svg>
    ),
  },
  aprobado: {
    bg: 'var(--success-success-10, #F2FDF6)',
    border: 'var(--success-success-900, #12542D)',
    iconColor: 'var(--success-success-950, #092A16)',
    // Checkmark circle icon
    Icon: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="6" stroke="var(--success-success-950, #092A16)" strokeWidth="1"/>
        <path d="M5.25 8L7 9.75L10.75 6" stroke="var(--success-success-950, #092A16)" strokeWidth="1" fill="none"/>
      </svg>
    ),
  },
  info: {
    bg: 'var(--info-info-100, #E8F7FC)',
    border: 'var(--info-info-700, #1592BC)',
    iconColor: 'var(--info-info-700, #1592BC)',
    // Info circle icon
    Icon: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="6" stroke="var(--info-info-700, #1592BC)" strokeWidth="1"/>
        <line x1="8" y1="7.5" x2="8" y2="11" stroke="var(--info-info-700, #1592BC)" strokeWidth="1"/>
        <circle cx="8" cy="5.25" r="0.75" fill="var(--info-info-700, #1592BC)"/>
      </svg>
    ),
  },
}

function agrupar(notifs) {
  const grupos = {}
  notifs.forEach(n => {
    if (!grupos[n.asignatura]) grupos[n.asignatura] = []
    grupos[n.asignatura].push(n)
  })
  return grupos
}

export default function PanelNotificaciones({ onClose, onNavigate }) {
  const [filtro, setFiltro] = useState('todas')

  const filtradas = notificaciones.filter(n => {
    if (filtro === 'accion') return n.accionRequerida
    if (filtro === 'info') return !n.accionRequerida
    return true
  })

  const grupos = agrupar(filtradas)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(15, 23, 42, 0.3)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col animate-slide-in-right"
        style={{
          width: '380px',
          background: '#FFFFFF',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
          fontFamily: "'Proeduca Sans', system-ui, sans-serif",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <div>
            <h2 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Notificaciones</h2>
            <p className="text-xs mt-0.5" style={{ color: '#4B5563' }}>
              {notificaciones.filter(n => n.accionRequerida).length} requieren tu atención
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <X size={18} style={{ color: '#6B7280' }} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-1 px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #F1F5F9' }}>
          {FILTROS.map(f => (
            <button
              key={f.id}
              onClick={() => setFiltro(f.id)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: filtro === f.id ? '#E7EFFE' : 'transparent',
                color: filtro === f.id ? '#367CFF' : '#4B5563',
                border: filtro === f.id ? '1px solid #BAD2FF' : '1px solid transparent',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {Object.entries(grupos).map(([asignatura, notifs]) => (
            <div key={asignatura}>
              <p
                className="text-xs font-semibold tracking-wider mb-2"
                style={{ color: '#6B7280', fontFamily: "'Proeduca Sans', system-ui, sans-serif", letterSpacing: '0.06em' }}
              >
                {asignatura}
              </p>
              <div className="space-y-2">
                {notifs.map(notif => {
                  const estilo = tipoEstilos[notif.tipo] || tipoEstilos.info
                  const { Icon } = estilo

                  return (
                    <button
                      key={notif.id}
                      onClick={() => onNavigate(notif.link)}
                      className="w-full text-left transition-all group"
                      style={{
                        padding: 16,
                        background: estilo.bg,
                        borderRadius: 8,
                        outline: `1px ${estilo.border} solid`,
                        outlineOffset: '-1px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      <div style={{ flexShrink: 0, paddingTop: 2 }}>
                        <Icon />
                      </div>
                      <div style={{ flex: '1 1 0', minWidth: 0 }}>
                        <p style={{ color: 'var(--neutrals-old-Black, #090B11)', fontSize: 14, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: 500, lineHeight: '20px', marginBottom: 2 }}>{notif.seccion}</p>
                        <p style={{ color: 'var(--neutrals-old-Black, #090B11)', fontSize: 14, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: 400, lineHeight: '20px' }}>{notif.mensaje}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span style={{ fontSize: 12, color: '#6B7280', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>{notif.tiempo}</span>
                          {notif.accionRequerida && (
                            <span style={{ fontSize: 12, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: 'var(--warning-warning-100, #FEF7E1)', color: 'var(--warning-warning-800, #A47B04)', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>
                              Acción requerida
                            </span>
                          )}
                        </div>
                      </div>
                      <CaretRight size={14} style={{ color: '#9CA3AF', flexShrink: 0, marginTop: 4 }} />
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {filtradas.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: '#F1F5F9' }}>
                <CheckCircle size={22} className="text-slate-400" />
              </div>
              <p className="text-sm font-medium" style={{ color: '#4B5563' }}>Sin notificaciones</p>
              <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Todo al día</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

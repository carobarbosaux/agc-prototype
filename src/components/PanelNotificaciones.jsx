import { useState } from 'react'
import { X, AlertCircle, CheckCircle, Info, ChevronRight } from 'lucide-react'
import { notificaciones } from '../mockData'

const FILTROS = [
  { id: 'todas', label: 'Todas' },
  { id: 'accion', label: 'Pendiente de mi acción' },
  { id: 'info', label: 'Informativas' },
]

const tipoIconos = {
  comentarios: { Icon: AlertCircle, color: '#F97316', bg: '#FFF7ED' },
  aprobado: { Icon: CheckCircle, color: '#10B981', bg: '#F0FDF4' },
  info: { Icon: Info, color: '#367CFF', bg: '#E7EFFE' },
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
          fontFamily: "'Inter', 'Arial', sans-serif",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <div>
            <h2 className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Notificaciones</h2>
            <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
              {notificaciones.filter(n => n.accionRequerida).length} requieren tu atención
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <X size={18} style={{ color: '#9CA3AF' }} />
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
                color: filtro === f.id ? '#367CFF' : '#6B7280',
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
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: '#9CA3AF', fontFamily: "'Arial', sans-serif", letterSpacing: '0.06em' }}
              >
                {asignatura}
              </p>
              <div className="space-y-2">
                {notifs.map(notif => {
                  const { Icon, color, bg } = tipoIconos[notif.tipo] || tipoIconos.info

                  return (
                    <button
                      key={notif.id}
                      onClick={() => onNavigate(notif.link)}
                      className="w-full text-left rounded-xl p-4 transition-all group"
                      style={{
                        background: notif.accionRequerida ? '#FFFDF9' : '#F8F9FA',
                        border: notif.accionRequerida ? '1px solid #FED7AA' : '1px solid #E5E7EB',
                        borderLeft: `3px solid ${color}`,
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: bg }}
                        >
                          <Icon size={15} style={{ color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium mb-0.5" style={{ color: '#1A1A1A' }}>{notif.seccion}</p>
                          <p className="text-sm leading-snug" style={{ color: '#6B7280' }}>{notif.mensaje}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <p className="text-xs" style={{ color: '#9CA3AF' }}>{notif.tiempo}</p>
                            {notif.accionRequerida && (
                              <span
                                className="text-xs font-medium px-2 py-0.5 rounded"
                                style={{ background: '#FFF7ED', color: '#F97316', fontFamily: "'Arial', sans-serif" }}
                              >
                                Acción requerida
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight size={14} style={{ color: '#CBD5E1' }} className="flex-shrink-0 mt-2 group-hover:text-slate-400 transition-colors" />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {filtradas.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: '#F1F5F9' }}>
                <CheckCircle size={22} className="text-slate-300" />
              </div>
              <p className="text-sm font-medium" style={{ color: '#9CA3AF' }}>Sin notificaciones</p>
              <p className="text-xs mt-1" style={{ color: '#CBD5E1' }}>Todo al día</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

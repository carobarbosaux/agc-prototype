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
  info: { Icon: Info, color: '#3B82F6', bg: '#EFF6FF' },
}

// Group notifications by asignatura
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
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #E2E8F0' }}
        >
          <div>
            <h2 className="text-base font-semibold text-slate-800">Notificaciones</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {notificaciones.filter(n => n.accionRequerida).length} requieren tu atención
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        {/* Filters */}
        <div
          className="flex gap-1 px-4 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid #F1F5F9' }}
        >
          {FILTROS.map(f => (
            <button
              key={f.id}
              onClick={() => setFiltro(f.id)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: filtro === f.id ? '#EEF2FF' : 'transparent',
                color: filtro === f.id ? '#6366F1' : '#64748B',
                border: filtro === f.id ? '1px solid #C7D2FE' : '1px solid transparent',
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
                className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}
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
                      className="w-full text-left rounded-xl p-4 transition-all hover:scale-[1.01] group"
                      style={{
                        background: notif.accionRequerida ? '#FFFDF9' : '#F8FAFC',
                        border: notif.accionRequerida ? '1px solid #FED7AA' : '1px solid #E2E8F0',
                        borderLeft: notif.accionRequerida ? `3px solid ${color}` : `3px solid ${color}`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: bg }}
                        >
                          <Icon size={15} style={{ color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 mb-0.5">{notif.seccion}</p>
                          <p className="text-sm text-slate-500 leading-snug">{notif.mensaje}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <p className="text-xs text-slate-400">{notif.tiempo}</p>
                            {notif.accionRequerida && (
                              <span
                                className="text-xs font-medium px-2 py-0.5 rounded"
                                style={{
                                  background: '#FFF7ED',
                                  color: '#F97316',
                                  fontFamily: "'JetBrains Mono', monospace",
                                }}
                              >
                                Acción requerida
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight
                          size={14}
                          className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0 mt-2"
                        />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {filtradas.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                style={{ background: '#F1F5F9' }}
              >
                <CheckCircle size={22} className="text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-400">Sin notificaciones</p>
              <p className="text-xs text-slate-300 mt-1">Todo al día</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

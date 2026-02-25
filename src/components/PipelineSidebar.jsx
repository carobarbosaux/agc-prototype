import { useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronRight, Lock } from 'lucide-react'
import EstadoBadge from './EstadoBadge'
import { pipeline } from '../mockData'

const ESTADO_CLICKABLE = ['aprobado', 'borrador', 'revision', 'comentarios']

export default function PipelineSidebar({ seccionActiva, onSeccionChange }) {
  const [temarioExpandido, setTemarioExpandido] = useState(true)

  const handleClick = (id, estado) => {
    if (!ESTADO_CLICKABLE.includes(estado)) return
    onSeccionChange(id)
  }

  const renderEstadoIcon = (estado) => {
    if (estado === 'aprobado') return <CheckCircle2 size={13} style={{ color: '#10B981' }} />
    if (estado === 'bloqueado') return <Lock size={12} style={{ color: '#CBD5E1' }} />
    return null
  }

  return (
    <aside
      className="flex flex-col h-full overflow-y-auto"
      style={{
        width: '240px',
        minWidth: '240px',
        background: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
      }}
    >
      <div className="px-4 pt-5 pb-3">
        <p
          className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}
        >
          Flujo de contenido
        </p>

        <nav className="space-y-0.5">
          {pipeline.map((etapa) => {
            if (etapa.tipo === 'grupo') {
              return (
                <div key={etapa.id}>
                  {/* Group header */}
                  <button
                    onClick={() => setTemarioExpandido(!temarioExpandido)}
                    className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-600">{etapa.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <EstadoBadge estado={etapa.estado} size="sm" />
                      {temarioExpandido
                        ? <ChevronDown size={13} className="text-slate-400" />
                        : <ChevronRight size={13} className="text-slate-400" />
                      }
                    </div>
                  </button>

                  {/* Temas */}
                  {temarioExpandido && etapa.temas && (
                    <div className="ml-3 mt-0.5 space-y-0.5 pl-2" style={{ borderLeft: '1.5px solid #E2E8F0' }}>
                      {etapa.temas.map(tema => {
                        const clickable = ESTADO_CLICKABLE.includes(tema.estado)
                        const activo = seccionActiva === tema.id

                        return (
                          <div
                            key={tema.id}
                            onClick={() => handleClick(tema.id, tema.estado)}
                            className="flex items-start gap-2 px-2 py-2 rounded-lg transition-all"
                            style={{
                              cursor: clickable ? 'pointer' : 'not-allowed',
                              background: activo ? '#EEF2FF' : 'transparent',
                              borderLeft: activo ? '2px solid #6366F1' : '2px solid transparent',
                              marginLeft: '-2px',
                            }}
                            data-tooltip={!clickable ? 'Bloqueado hasta aprobar la etapa anterior' : undefined}
                          >
                            <div className="mt-0.5 flex-shrink-0">
                              {renderEstadoIcon(tema.estado)}
                              {!renderEstadoIcon(tema.estado) && (
                                <div
                                  className="w-1.5 h-1.5 rounded-full mt-1"
                                  style={{
                                    background:
                                      tema.estado === 'borrador' ? '#3B82F6'
                                      : tema.estado === 'revision' ? '#F59E0B'
                                      : tema.estado === 'comentarios' ? '#F97316'
                                      : '#CBD5E1',
                                  }}
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-xs font-semibold leading-tight mb-0.5"
                                style={{
                                  color: activo ? '#6366F1' : clickable ? '#475569' : '#94A3B8',
                                  fontFamily: "'JetBrains Mono', monospace",
                                }}
                              >
                                {tema.label}
                              </p>
                              <p
                                className="text-xs leading-tight"
                                style={{
                                  color: clickable ? '#94A3B8' : '#CBD5E1',
                                  overflow: 'hidden',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                }}
                              >
                                {tema.labelCorto}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            // Regular section
            const clickable = ESTADO_CLICKABLE.includes(etapa.estado)
            const activo = seccionActiva === etapa.id

            return (
              <div
                key={etapa.id}
                onClick={() => handleClick(etapa.id, etapa.estado)}
                className="flex items-center justify-between px-2 py-2.5 rounded-lg transition-all"
                style={{
                  cursor: clickable ? 'pointer' : 'not-allowed',
                  background: activo ? '#EEF2FF' : 'transparent',
                  borderLeft: activo ? '2px solid #6366F1' : '2px solid transparent',
                }}
                data-tooltip={!clickable ? 'Bloqueado hasta aprobar la etapa anterior' : undefined}
              >
                <div className="flex items-center gap-2">
                  {renderEstadoIcon(etapa.estado)}
                  <span
                    className="text-sm"
                    style={{
                      fontWeight: activo ? '600' : '500',
                      color: activo ? '#6366F1' : clickable ? '#475569' : '#94A3B8',
                    }}
                  >
                    {etapa.label}
                  </span>
                </div>
                <EstadoBadge estado={etapa.estado} size="sm" />
              </div>
            )
          })}
        </nav>
      </div>

      {/* Progress indicator at bottom */}
      <div className="mt-auto px-4 py-4" style={{ borderTop: '1px solid #F1F5F9' }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-slate-400">Progreso de la asignatura</p>
          <p className="text-xs font-semibold text-slate-600">28%</p>
        </div>
        <div className="w-full h-1.5 rounded-full" style={{ background: '#E2E8F0' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: '28%', background: '#6366F1' }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-1.5">2 de 7 etapas aprobadas</p>
      </div>
    </aside>
  )
}

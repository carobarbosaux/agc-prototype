import { useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronRight, Lock } from 'lucide-react'
import EstadoBadge from './EstadoBadge'
import { pipeline } from '../mockData'

const ESTADO_CLICKABLE = ['aprobado', 'borrador', 'revision', 'comentarios']

export default function PipelineSidebar({ seccionActiva, onSeccionChange }) {
  const [gruposExpandidos, setGruposExpandidos] = useState({ 'instrucciones-grupo': true, temario: true })

  const toggleGrupo = (id) => setGruposExpandidos(prev => ({ ...prev, [id]: !prev[id] }))

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
        borderRight: '1px solid #E5E7EB',
        fontFamily: "'Inter', 'Arial', sans-serif",
      }}
    >
      <div className="px-4 pt-5 pb-3">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: '#9CA3AF', fontFamily: "'Arial', sans-serif", letterSpacing: '0.08em' }}
        >
          Flujo de contenido
        </p>

        <nav className="space-y-0.5">
          {pipeline.map((etapa) => {
            if (etapa.tipo === 'grupo') {
              return (
                <div key={etapa.id}>
                  <button
                    onClick={() => toggleGrupo(etapa.id)}
                    className="w-full flex items-center justify-between px-2 py-2 rounded-lg transition-colors"
                    onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: '#374151' }}>{etapa.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <EstadoBadge estado={etapa.estado} size="sm" />
                      {gruposExpandidos[etapa.id]
                        ? <ChevronDown size={13} style={{ color: '#9CA3AF' }} />
                        : <ChevronRight size={13} style={{ color: '#9CA3AF' }} />
                      }
                    </div>
                  </button>

                  {gruposExpandidos[etapa.id] && etapa.temas && (
                    <div className="ml-3 mt-0.5 space-y-0.5 pl-2" style={{ borderLeft: '1.5px solid #E5E7EB' }}>
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
                              background: activo ? '#E0F4FB' : 'transparent',
                              borderLeft: activo ? '2px solid #0098CD' : '2px solid transparent',
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
                                      tema.estado === 'borrador' ? '#0098CD'
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
                                  color: activo ? '#0098CD' : clickable ? '#374151' : '#94A3B8',
                                  fontFamily: "'Arial', sans-serif",
                                }}
                              >
                                {tema.label}
                              </p>
                              <p
                                className="text-xs leading-tight"
                                style={{
                                  color: clickable ? '#9CA3AF' : '#CBD5E1',
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

            const clickable = ESTADO_CLICKABLE.includes(etapa.estado)
            const activo = seccionActiva === etapa.id

            return (
              <div
                key={etapa.id}
                onClick={() => handleClick(etapa.id, etapa.estado)}
                className="flex items-center justify-between px-2 py-2.5 rounded-lg transition-all"
                style={{
                  cursor: clickable ? 'pointer' : 'not-allowed',
                  background: activo ? '#E0F4FB' : 'transparent',
                  borderLeft: activo ? '2px solid #0098CD' : '2px solid transparent',
                }}
                data-tooltip={!clickable ? 'Bloqueado hasta aprobar la etapa anterior' : undefined}
                onMouseEnter={e => { if (!activo && clickable) e.currentTarget.style.background = '#F8F9FA' }}
                onMouseLeave={e => { if (!activo) e.currentTarget.style.background = 'transparent' }}
              >
                <div className="flex items-center gap-2">
                  {renderEstadoIcon(etapa.estado)}
                  <span
                    className="text-sm"
                    style={{
                      fontWeight: activo ? '600' : '500',
                      color: activo ? '#0098CD' : clickable ? '#374151' : '#94A3B8',
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

      {/* Progress indicator */}
      <div className="mt-auto px-4 py-4" style={{ borderTop: '1px solid #F1F5F9' }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs" style={{ color: '#9CA3AF' }}>Progreso de la asignatura</p>
          <p className="text-xs font-semibold" style={{ color: '#374151' }}>28%</p>
        </div>
        <div className="w-full h-1.5 rounded-full" style={{ background: '#E5E7EB' }}>
          <div className="h-full rounded-full transition-all" style={{ width: '28%', background: '#0098CD' }} />
        </div>
        <p className="text-xs mt-1.5" style={{ color: '#9CA3AF' }}>2 de 7 etapas aprobadas</p>
      </div>
    </aside>
  )
}

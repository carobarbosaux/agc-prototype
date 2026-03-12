import { useState } from 'react'
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { pipeline } from '../mockData'
import StatusIndicator, { toStatusKey } from './StatusIndicator'

const ESTADO_CLICKABLE = ['aprobado', 'borrador', 'revision', 'comentarios']

export default function PipelineSidebar({ seccionActiva, onSeccionChange }) {
  const [temasExpandidos, setTemasExpandidos] = useState({ 'tema-1': true, 'tema-2': true })
  const [collapsed, setCollapsed] = useState(false)

  const toggleTema = (id) => setTemasExpandidos(prev => ({ ...prev, [id]: !prev[id] }))

  const handleClick = (id, estado) => {
    if (!ESTADO_CLICKABLE.includes(estado)) return
    onSeccionChange(id)
  }


  // Count approved sections for progress
  const allSecciones = pipeline.flatMap(e => e.tipo === 'tema' ? e.secciones : [e])
  const aprobadas = allSecciones.filter(s => s.estado === 'aprobado').length
  const total = allSecciones.length
  const pct = Math.round((aprobadas / total) * 100)

  if (collapsed) {
    return (
      <aside
        className="flex flex-col items-center h-full flex-shrink-0"
        style={{ width: '40px', minWidth: '40px', background: '#FFFFFF', borderRight: '1px solid #E5E7EB' }}
      >
        <button
          onClick={() => setCollapsed(false)}
          className="w-full flex items-center justify-center py-3 transition-colors"
          style={{ color: '#9CA3AF' }}
          title="Expandir flujo de contenido"
          onMouseEnter={e => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = '#F8F9FA' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.background = 'transparent' }}
        >
          <PanelLeftOpen size={15} />
        </button>
        <div
          className="flex-1 flex items-center justify-center"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider select-none" style={{ color: '#CBD5E1', letterSpacing: '0.08em' }}>
            Flujo de contenido
          </span>
        </div>
      </aside>
    )
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
      <div className="px-4 pt-5 pb-3 flex-1">
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: '#9CA3AF', fontFamily: "'Arial', sans-serif", letterSpacing: '0.08em' }}
          >
            Flujo de contenido
          </p>
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded transition-colors"
            style={{ color: '#CBD5E1' }}
            title="Colapsar"
            onMouseEnter={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.background = '#F3F4F6' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#CBD5E1'; e.currentTarget.style.background = 'transparent' }}
          >
            <PanelLeftClose size={14} />
          </button>
        </div>

        <nav className="space-y-0.5">
          {pipeline.map((etapa) => {
            // ─ Flat sections (Resumen, Índice) ─
            if (etapa.tipo === 'seccion') {
              const clickable = ESTADO_CLICKABLE.includes(etapa.estado)
              const activo = seccionActiva === etapa.id
              return (
                <div
                  key={etapa.id}
                  onClick={() => handleClick(etapa.id, etapa.estado)}
                  className="flex items-center justify-between px-2 py-2 rounded-lg transition-all"
                  style={{
                    cursor: clickable ? 'pointer' : 'default',
                    background: activo ? '#E7EFFE' : 'transparent',
                    borderLeft: activo ? '2px solid #367CFF' : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (!activo && clickable) e.currentTarget.style.background = '#F8F9FA' }}
                  onMouseLeave={e => { if (!activo) e.currentTarget.style.background = 'transparent' }}
                >
                  <div className="flex items-center gap-2">
                    <StatusIndicator status={toStatusKey(etapa.estado)} variant="icon" size="sm" showTooltip={true} />
                    <span
                      className="text-sm"
                      style={{
                        fontWeight: activo ? '600' : '500',
                        color: activo ? '#367CFF' : clickable ? '#374151' : '#94A3B8',
                      }}
                    >
                      {etapa.label}
                    </span>
                  </div>
                </div>
              )
            }

            // ─ Tema groups ─
            if (etapa.tipo === 'tema') {
              const expandido = !!temasExpandidos[etapa.id]
              const tieneActivo = etapa.secciones.some(s => s.id === seccionActiva)
              const estadoTema = etapa.secciones.some(s => s.estado === 'comentarios') ? 'comentarios'
                : etapa.secciones.some(s => s.estado === 'revision') ? 'revision'
                : etapa.secciones.some(s => s.estado === 'borrador') ? 'borrador'
                : etapa.secciones.every(s => s.estado === 'aprobado') ? 'aprobado'
                : 'bloqueado'

              return (
                <div key={etapa.id}>
                  {/* Tema header */}
                  <button
                    onClick={() => toggleTema(etapa.id)}
                    className="w-full flex items-center justify-between px-2 py-2 rounded-lg transition-colors"
                    style={{
                      background: tieneActivo && !expandido ? '#F0F9FF' : 'transparent',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                    onMouseLeave={e => e.currentTarget.style.background = tieneActivo && !expandido ? '#F0F9FF' : 'transparent'}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <StatusIndicator status={toStatusKey(estadoTema)} variant="icon" size="sm" showTooltip={true} />
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-medium leading-tight" style={{ color: '#374151' }}>
                          {etapa.label}
                        </p>
                        <p className="text-xs leading-tight truncate" style={{ color: '#9CA3AF', maxWidth: '140px' }}>
                          {etapa.labelCorto}
                        </p>
                      </div>
                    </div>
                    {expandido
                      ? <ChevronDown size={13} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                      : <ChevronRight size={13} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                    }
                  </button>

                  {/* Subsections */}
                  {expandido && (
                    <div className="mt-0.5 mb-1 ml-4 space-y-0.5 pl-2.5" style={{ borderLeft: '1.5px solid #E5E7EB' }}>
                      {etapa.secciones.map(sec => {
                        const clickable = ESTADO_CLICKABLE.includes(sec.estado)
                        const activo = seccionActiva === sec.id
                        return (
                          <div
                            key={sec.id}
                            onClick={() => handleClick(sec.id, sec.estado)}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md transition-all"
                            style={{
                              cursor: clickable ? 'pointer' : 'default',
                              background: activo ? '#E7EFFE' : 'transparent',
                              borderLeft: activo ? '2px solid #367CFF' : '2px solid transparent',
                              marginLeft: '-2px',
                            }}
                            title={!clickable ? 'Bloqueado hasta aprobar la etapa anterior' : undefined}
                            onMouseEnter={e => { if (!activo && clickable) e.currentTarget.style.background = '#F8F9FA' }}
                            onMouseLeave={e => { if (!activo) e.currentTarget.style.background = 'transparent' }}
                          >
                            <StatusIndicator status={toStatusKey(sec.estado)} variant="icon" size="sm" showTooltip={true} />
                            <span
                              className="text-xs"
                              style={{
                                fontWeight: activo ? '600' : '400',
                                color: activo ? '#367CFF' : clickable ? '#4B5563' : '#CBD5E1',
                              }}
                            >
                              {sec.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            return null
          })}
        </nav>
      </div>

      {/* Progress indicator */}
      <div className="px-4 py-4 flex-shrink-0" style={{ borderTop: '1px solid #F1F5F9' }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs" style={{ color: '#9CA3AF' }}>Progreso</p>
          <p className="text-xs font-semibold" style={{ color: '#374151' }}>{pct}%</p>
        </div>
        <div className="w-full h-1.5 rounded-full" style={{ background: '#E5E7EB' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: '#367CFF' }} />
        </div>
        <p className="text-xs mt-1.5" style={{ color: '#9CA3AF' }}>{aprobadas} de {total} secciones aprobadas</p>
      </div>
    </aside>
  )
}

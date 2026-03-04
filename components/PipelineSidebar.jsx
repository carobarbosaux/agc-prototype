import { useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronRight, Lock } from 'lucide-react'
import { pipeline } from '../mockData'

const ESTADO_CLICKABLE = ['aprobado', 'borrador', 'revision', 'comentarios']

const estadoDot = {
  borrador: '#3B82F6',
  revision: '#F59E0B',
  comentarios: '#F97316',
  aprobado: '#10B981',
  bloqueado: '#CBD5E1',
}

export default function PipelineSidebar({ seccionActiva, onSeccionChange }) {
  // Start with Tema 1 and 2 expanded since they have active sections
  const [temasExpandidos, setTemasExpandidos] = useState({ 'tema-1': true, 'tema-2': true })

  const toggleTema = (id) => setTemasExpandidos(prev => ({ ...prev, [id]: !prev[id] }))

  const handleClick = (id, estado) => {
    if (!ESTADO_CLICKABLE.includes(estado)) return
    onSeccionChange(id)
  }

  const renderSeccionIcon = (estado) => {
    if (estado === 'aprobado') return <CheckCircle2 size={12} style={{ color: '#10B981', flexShrink: 0 }} />
    if (estado === 'bloqueado') return <Lock size={11} style={{ color: '#CBD5E1', flexShrink: 0 }} />
    return (
      <div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: estadoDot[estado] || '#CBD5E1', marginTop: '1px' }}
      />
    )
  }

  // Count approved sections for progress
  const allSecciones = pipeline.flatMap(e => e.tipo === 'tema' ? e.secciones : [e])
  const aprobadas = allSecciones.filter(s => s.estado === 'aprobado').length
  const total = allSecciones.length
  const pct = Math.round((aprobadas / total) * 100)

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
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: '#9CA3AF', fontFamily: "'Arial', sans-serif", letterSpacing: '0.08em' }}
        >
          Flujo de contenido
        </p>

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
                    background: activo ? '#E0F4FB' : 'transparent',
                    borderLeft: activo ? '2px solid #0098CD' : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (!activo && clickable) e.currentTarget.style.background = '#F8F9FA' }}
                  onMouseLeave={e => { if (!activo) e.currentTarget.style.background = 'transparent' }}
                >
                  <div className="flex items-center gap-2">
                    {renderSeccionIcon(etapa.estado)}
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
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: estadoDot[estadoTema] || '#CBD5E1' }}
                      />
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
                              background: activo ? '#E0F4FB' : 'transparent',
                              borderLeft: activo ? '2px solid #0098CD' : '2px solid transparent',
                              marginLeft: '-2px',
                            }}
                            title={!clickable ? 'Bloqueado hasta aprobar la etapa anterior' : undefined}
                            onMouseEnter={e => { if (!activo && clickable) e.currentTarget.style.background = '#F8F9FA' }}
                            onMouseLeave={e => { if (!activo) e.currentTarget.style.background = 'transparent' }}
                          >
                            {renderSeccionIcon(sec.estado)}
                            <span
                              className="text-xs"
                              style={{
                                fontWeight: activo ? '600' : '400',
                                color: activo ? '#0098CD' : clickable ? '#4B5563' : '#CBD5E1',
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
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: '#0098CD' }} />
        </div>
        <p className="text-xs mt-1.5" style={{ color: '#9CA3AF' }}>{aprobadas} de {total} secciones aprobadas</p>
      </div>
    </aside>
  )
}

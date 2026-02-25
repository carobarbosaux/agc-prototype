import { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import EstadoBadge from '../components/EstadoBadge'
import { titulaciones, dashboardStats, estadoConfig } from '../mockData'

export default function PantallaDashboard({ rolActivo, onNavigate }) {
  const [expandidas, setExpandidas] = useState({ 'master-ia': true })
  const [filtroActivo, setFiltroActivo] = useState(null)

  const stats = dashboardStats[rolActivo] || dashboardStats.autor

  const toggleExpandida = (id) => {
    setExpandidas(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleStatClick = (filter) => {
    setFiltroActivo(filtroActivo === filter ? null : filter)
  }

  const filtrarAsignaturas = (asignaturas) => {
    if (!filtroActivo) return asignaturas
    return asignaturas.filter(a => a.estado === filtroActivo)
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="max-w-5xl mx-auto px-8 py-8">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-slate-800 mb-1">Dashboard</h1>
          <p className="text-sm text-slate-400">
            {rolActivo === 'autor' && 'Tus asignaturas asignadas'}
            {rolActivo === 'coordinador' && 'Asignaturas que supervisas'}
            {rolActivo === 'editor' && 'Asignaturas con revisiones activas'}
            {rolActivo === 'disenador' && 'Asignaturas para enriquecimiento'}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => {
            const cfg = estadoConfig[stat.estado] || {}
            const isActive = filtroActivo === stat.filter

            return (
              <button
                key={stat.label}
                onClick={() => handleStatClick(stat.filter)}
                className="text-left rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{
                  background: '#FFFFFF',
                  border: isActive ? `1.5px solid ${cfg.border || '#E2E8F0'}` : '1px solid #E2E8F0',
                  boxShadow: isActive ? `0 0 0 3px ${cfg.bg || '#F8FAFC'}` : 'none',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: cfg.bg || '#F8FAFC' }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: cfg.dot || '#CBD5E1' }}
                    />
                  </div>
                  {isActive && (
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ background: cfg.bg, color: cfg.text, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Filtrado
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold mb-1" style={{ color: cfg.text || '#0F172A' }}>
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </button>
            )
          })}
        </div>

        {/* Filter indicator */}
        {filtroActivo && (
          <div className="flex items-center gap-2 mb-4 animate-fade-in">
            <span className="text-sm text-slate-500">Mostrando:</span>
            <EstadoBadge estado={filtroActivo} />
            <button
              onClick={() => setFiltroActivo(null)}
              className="text-xs text-slate-400 hover:text-slate-600 ml-1"
            >
              Quitar filtro ×
            </button>
          </div>
        )}

        {/* Titulaciones */}
        {titulaciones.map((titulacion) => {
          const asignaturasFiltradas = filtrarAsignaturas(titulacion.asignaturas)
          const expandida = expandidas[titulacion.id] !== false

          return (
            <div
              key={titulacion.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
            >
              {/* Group header */}
              <button
                onClick={() => toggleExpandida(titulacion.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
                style={{ borderBottom: expandida ? '1px solid #F1F5F9' : 'none' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#6366F1' }}
                  />
                  <span className="text-sm font-semibold text-slate-700">{titulacion.nombre}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded font-medium"
                    style={{
                      background: '#EEF2FF',
                      color: '#6366F1',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {asignaturasFiltradas.length} asignaturas
                  </span>
                </div>
                {expandida
                  ? <ChevronUp size={16} className="text-slate-400" />
                  : <ChevronDown size={16} className="text-slate-400" />
                }
              </button>

              {/* Table */}
              {expandida && (
                <>
                  {/* Table header */}
                  <div
                    className="grid px-6 py-2"
                    style={{
                      gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                      background: '#F8FAFC',
                      borderBottom: '1px solid #E2E8F0',
                    }}
                  >
                    {['Asignatura', 'Etapa actual', 'Estado', 'Pendiente de', 'Última actividad'].map(col => (
                      <span
                        key={col}
                        className="text-xs font-semibold text-slate-400 uppercase tracking-wide"
                        style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}
                      >
                        {col}
                      </span>
                    ))}
                  </div>

                  {/* Rows */}
                  {asignaturasFiltradas.length === 0 ? (
                    <div className="px-6 py-8 text-center">
                      <p className="text-sm text-slate-400">No hay asignaturas con este estado</p>
                    </div>
                  ) : (
                    asignaturasFiltradas.map((asig, i) => {
                      const clickable = asig.activa
                      const pendiente = typeof asig.pendienteDe === 'object'
                        ? asig.pendienteDe[rolActivo] || '—'
                        : asig.pendienteDe

                      return (
                        <div
                          key={asig.id}
                          onClick={() => clickable && onNavigate('canvas', { seccion: 't2' })}
                          className="grid px-6 py-3.5 transition-all group"
                          style={{
                            gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                            borderBottom: i < asignaturasFiltradas.length - 1 ? '1px solid #F1F5F9' : 'none',
                            cursor: clickable ? 'pointer' : 'default',
                            background: clickable ? 'transparent' : 'transparent',
                          }}
                          onMouseEnter={e => {
                            if (clickable) e.currentTarget.style.background = '#F8FAFC'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          {/* Nombre */}
                          <div className="flex items-center gap-2">
                            {clickable && (
                              <div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse-dot"
                                style={{ background: '#6366F1' }}
                              />
                            )}
                            <span
                              className="text-sm font-medium"
                              style={{ color: clickable ? '#1E293B' : '#94A3B8' }}
                            >
                              {asig.nombre}
                            </span>
                            {clickable && (
                              <ArrowRight
                                size={13}
                                className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                              />
                            )}
                          </div>

                          {/* Etapa */}
                          <span
                            className="text-sm flex items-center"
                            style={{ color: clickable ? '#64748B' : '#CBD5E1' }}
                          >
                            {asig.etapaActual}
                          </span>

                          {/* Estado */}
                          <div className="flex items-center">
                            {clickable
                              ? <EstadoBadge estado={asig.estado} size="sm" />
                              : <EstadoBadge estado={asig.estado} size="sm" />
                            }
                          </div>

                          {/* Pendiente de */}
                          <div className="flex items-center">
                            <span
                              className="text-sm"
                              style={{ color: pendiente === 'tú' || pendiente === 'Tú' ? '#6366F1' : '#94A3B8', fontWeight: pendiente === 'tú' || pendiente === 'Tú' ? '500' : '400' }}
                            >
                              {pendiente}
                            </span>
                          </div>

                          {/* Última actividad */}
                          <span className="text-sm flex items-center" style={{ color: '#94A3B8' }}>
                            {asig.ultimaActividad}
                          </span>
                        </div>
                      )
                    })
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

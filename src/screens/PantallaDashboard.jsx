import { useState } from 'react'
import {
  ChevronDown, ChevronUp, ArrowRight, List, LayoutGrid,
  AlertCircle, BookOpen, Lock, Clock
} from 'lucide-react'
import EstadoBadge from '../components/EstadoBadge'
import { titulaciones, dashboardStats, miTrabajo, estadoConfig } from '../mockData'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StatCards({ stats, filtroActivo, onStatClick }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => {
        const cfg = estadoConfig[stat.estado] || {}
        const isActive = filtroActivo === stat.filter
        return (
          <button
            key={stat.label}
            onClick={() => onStatClick(stat.filter)}
            className="text-left rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{
              background: '#FFFFFF',
              border: isActive ? `1.5px solid ${cfg.border || '#E2E8F0'}` : '1px solid #E2E8F0',
              boxShadow: isActive ? `0 0 0 3px ${cfg.bg || '#F8FAFC'}` : 'none',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: cfg.bg || '#F8FAFC' }}>
                <span className="w-2 h-2 rounded-full" style={{ background: cfg.dot || '#CBD5E1' }} />
              </div>
              {isActive && (
                <span className="text-xs px-2 py-0.5 rounded font-medium"
                  style={{ background: cfg.bg, color: cfg.text, fontFamily: "'JetBrains Mono', monospace" }}>
                  Filtrado
                </span>
              )}
            </div>
            <p className="text-3xl font-bold mb-1" style={{ color: cfg.text || '#0F172A' }}>{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </button>
        )
      })}
    </div>
  )
}

// ─── View: Mi trabajo (Linear-style inbox) ────────────────────────────────────

function VistaMiTrabajo({ filtroActivo, onNavigate }) {
  const items = filtroActivo
    ? miTrabajo.filter(w => w.estado === filtroActivo)
    : miTrabajo

  // Group by priority: first items with accion requerida (comentarios), then borrador, then rest
  const urgentes = items.filter(w => w.estado === 'comentarios')
  const activos = items.filter(w => w.estado === 'borrador')
  const resto = items.filter(w => !['comentarios', 'borrador'].includes(w.estado))

  const renderItem = (item) => {
    const cfg = estadoConfig[item.estado] || {}
    const clickable = item.activa && item.canvasDestino

    return (
      <div
        key={item.id}
        onClick={() => clickable && onNavigate('canvas', { seccion: item.canvasDestino })}
        className="flex items-center gap-4 px-5 py-4 transition-all group"
        style={{
          cursor: clickable ? 'pointer' : 'default',
          borderBottom: '1px solid #F1F5F9',
        }}
        onMouseEnter={e => { if (clickable) e.currentTarget.style.background = '#F8FAFC' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        {/* State dot */}
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: cfg.dot || '#CBD5E1' }}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-sm font-medium"
              style={{ color: clickable ? '#1E293B' : '#94A3B8' }}
            >
              {item.seccion}
            </span>
            {item.comentariosCriticos > 0 && (
              <span
                className="flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded"
                style={{ background: '#FEF2F2', color: '#EF4444', fontFamily: "'JetBrains Mono', monospace" }}
              >
                <AlertCircle size={10} />
                {item.comentariosCriticos} crítico
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            {item.asignatura}
            <span className="mx-1.5 text-slate-200">·</span>
            {item.titulacion}
          </p>
        </div>

        {/* Estado */}
        <EstadoBadge estado={item.estado} size="sm" />

        {/* Pendiente de */}
        <div className="w-20 text-right">
          <span
            className="text-xs font-medium"
            style={{ color: item.pendienteDe === 'tú' ? '#6366F1' : '#94A3B8' }}
          >
            {item.pendienteDe}
          </span>
        </div>

        {/* Actividad */}
        <div className="w-24 flex items-center gap-1 justify-end text-slate-300">
          <Clock size={11} />
          <span className="text-xs">{item.ultimaActividad}</span>
        </div>

        {/* Arrow */}
        {clickable && (
          <ArrowRight size={14} className="text-slate-200 group-hover:text-slate-400 transition-colors flex-shrink-0" />
        )}
        {!clickable && <div className="w-[14px]" />}
      </div>
    )
  }

  const renderGroup = (label, items, color) => {
    if (items.length === 0) return null
    return (
      <div key={label} className="mb-1">
        <div
          className="flex items-center gap-2 px-5 py-2"
          style={{ borderBottom: '1px solid #F1F5F9' }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: '#94A3B8', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.07em' }}
          >
            {label}
          </span>
          <span
            className="text-xs px-1.5 py-0.5 rounded font-medium"
            style={{ background: '#F1F5F9', color: '#94A3B8', fontFamily: "'JetBrains Mono', monospace" }}
          >
            {items.length}
          </span>
        </div>
        {items.map(renderItem)}
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
    >
      {/* Table header */}
      <div
        className="grid px-5 py-2.5"
        style={{
          gridTemplateColumns: '16px 1fr auto 80px 96px 14px',
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          gap: '16px',
        }}
      >
        {['', 'Sección · Asignatura', 'Estado', 'Pendiente de', 'Actividad', ''].map((col, i) => (
          <span
            key={i}
            className="text-xs font-semibold text-slate-400 uppercase tracking-wide"
            style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}
          >
            {col}
          </span>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="text-sm text-slate-400">No hay tareas con este estado</p>
        </div>
      ) : (
        <>
          {renderGroup('Requieren atención', urgentes, '#F97316')}
          {renderGroup('En progreso', activos, '#3B82F6')}
          {renderGroup('Por comenzar', resto, '#CBD5E1')}
        </>
      )}
    </div>
  )
}

// ─── View: Por titulación ─────────────────────────────────────────────────────

function VistaPorTitulacion({ rolActivo, filtroActivo, onNavigate }) {
  const [titulacionSeleccionada, setTitulacionSeleccionada] = useState('master-ia')

  const titulacion = titulaciones.find(t => t.id === titulacionSeleccionada)

  const asignaturasFiltradas = filtroActivo && titulacion?.asignaturas?.length
    ? titulacion.asignaturas.filter(a => a.estado === filtroActivo)
    : titulacion?.asignaturas || []

  return (
    <div className="flex gap-4" style={{ minHeight: '400px' }}>
      {/* Left: Titulaciones list */}
      <div
        className="flex-shrink-0 rounded-2xl overflow-hidden"
        style={{
          width: '260px',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
        }}
      >
        <div
          className="px-4 py-3"
          style={{ borderBottom: '1px solid #F1F5F9' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider text-slate-400"
            style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.07em' }}
          >
            Titulaciones
          </p>
        </div>
        <div className="py-1.5">
          {titulaciones.map(t => {
            const selected = titulacionSeleccionada === t.id
            return (
              <button
                key={t.id}
                onClick={() => t.navegable && setTitulacionSeleccionada(t.id)}
                className="w-full text-left px-4 py-3 transition-all flex items-start gap-3 group"
                style={{
                  cursor: t.navegable ? 'pointer' : 'default',
                  background: selected ? '#EEF2FF' : 'transparent',
                  borderLeft: selected ? '2px solid #6366F1' : '2px solid transparent',
                  opacity: t.navegable ? 1 : 0.45,
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: selected ? '#EEF2FF' : '#F8FAFC' }}
                >
                  {t.navegable
                    ? <BookOpen size={13} style={{ color: selected ? '#6366F1' : '#94A3B8' }} />
                    : <Lock size={12} style={{ color: '#CBD5E1' }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium leading-snug"
                    style={{ color: selected ? '#6366F1' : t.navegable ? '#475569' : '#94A3B8' }}
                  >
                    {t.nombre}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: '#94A3B8', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {t.codigo} · {t.asignaturas_count} asig.
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: Asignaturas */}
      <div
        className="flex-1 rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: '1px solid #F1F5F9' }}
        >
          <div>
            <p className="text-sm font-semibold text-slate-700">{titulacion?.nombre}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {asignaturasFiltradas.length} de {titulacion?.asignaturas_count} asignaturas
            </p>
          </div>
          {titulacion?.navegable && (
            <span
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{ background: '#EEF2FF', color: '#6366F1', border: '1px solid #C7D2FE', fontFamily: "'JetBrains Mono', monospace" }}
            >
              Activa
            </span>
          )}
        </div>

        {/* Table header */}
        {titulacion?.navegable ? (
          <>
            <div
              className="grid px-5 py-2.5"
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

            {asignaturasFiltradas.length === 0 ? (
              <div className="px-5 py-10 text-center">
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
                    className="grid px-5 py-3.5 transition-all group"
                    style={{
                      gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                      borderBottom: i < asignaturasFiltradas.length - 1 ? '1px solid #F1F5F9' : 'none',
                      cursor: clickable ? 'pointer' : 'default',
                    }}
                    onMouseEnter={e => { if (clickable) e.currentTarget.style.background = '#F8FAFC' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <div className="flex items-center gap-2">
                      {clickable && (
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse-dot"
                          style={{ background: '#6366F1' }}
                        />
                      )}
                      <span className="text-sm font-medium" style={{ color: clickable ? '#1E293B' : '#94A3B8' }}>
                        {asig.nombre}
                      </span>
                      {clickable && (
                        <ArrowRight size={13} className="text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <span className="text-sm flex items-center" style={{ color: clickable ? '#64748B' : '#CBD5E1' }}>
                      {asig.etapaActual}
                    </span>
                    <div className="flex items-center">
                      <EstadoBadge estado={asig.estado} size="sm" />
                    </div>
                    <div className="flex items-center">
                      <span
                        className="text-sm"
                        style={{
                          color: pendiente === 'tú' ? '#6366F1' : '#94A3B8',
                          fontWeight: pendiente === 'tú' ? '500' : '400',
                        }}
                      >
                        {pendiente}
                      </span>
                    </div>
                    <span className="text-sm flex items-center" style={{ color: '#94A3B8' }}>
                      {asig.ultimaActividad}
                    </span>
                  </div>
                )
              })
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center px-8">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: '#F1F5F9' }}
            >
              <Lock size={20} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-400 mb-1">Titulación no disponible en el prototipo</p>
            <p className="text-xs text-slate-300">Selecciona el Máster en Inteligencia Artificial para navegar</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main screen ─────────────────────────────────────────────────────────────

const VISTAS = [
  { id: 'trabajo', label: 'Mi trabajo', icon: List },
  { id: 'titulacion', label: 'Por titulación', icon: LayoutGrid },
]

export default function PantallaDashboard({ rolActivo, onNavigate }) {
  const [vistaActiva, setVistaActiva] = useState('trabajo')
  const [filtroActivo, setFiltroActivo] = useState(null)

  const stats = dashboardStats[rolActivo] || dashboardStats.autor

  const handleStatClick = (filter) => {
    setFiltroActivo(prev => prev === filter ? null : filter)
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="max-w-5xl mx-auto px-8 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-slate-800 mb-0.5">Generación de Asignaturas</h1>
            <p className="text-sm text-slate-400">
              {rolActivo === 'autor' && 'Tu trabajo como autor en todas las titulaciones asignadas'}
              {rolActivo === 'coordinador' && 'Contenido pendiente de revisión y aprobación'}
              {rolActivo === 'editor' && 'Asignaturas con revisiones activas'}
              {rolActivo === 'disenador' && 'Asignaturas disponibles para enriquecimiento'}
            </p>
          </div>

          {/* View toggle — Linear style */}
          <div
            className="flex items-center p-1 rounded-xl"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
          >
            {VISTAS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setVistaActiva(id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: vistaActiva === id ? '#EEF2FF' : 'transparent',
                  color: vistaActiva === id ? '#6366F1' : '#94A3B8',
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <StatCards
          stats={stats}
          filtroActivo={filtroActivo}
          onStatClick={handleStatClick}
        />

        {/* Active filter indicator */}
        {filtroActivo && (
          <div className="flex items-center gap-2 mb-4 animate-fade-in">
            <span className="text-sm text-slate-400">Filtrando por:</span>
            <EstadoBadge estado={filtroActivo} />
            <button
              onClick={() => setFiltroActivo(null)}
              className="text-xs text-slate-300 hover:text-slate-500 transition-colors ml-1"
            >
              Quitar ×
            </button>
          </div>
        )}

        {/* Content views */}
        <div className="animate-fade-in" key={vistaActiva}>
          {vistaActiva === 'trabajo' && (
            <VistaMiTrabajo
              filtroActivo={filtroActivo}
              onNavigate={onNavigate}
            />
          )}
          {vistaActiva === 'titulacion' && (
            <VistaPorTitulacion
              rolActivo={rolActivo}
              filtroActivo={filtroActivo}
              onNavigate={onNavigate}
            />
          )}
        </div>
      </div>
    </div>
  )
}

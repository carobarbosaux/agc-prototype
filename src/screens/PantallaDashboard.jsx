import { useState } from 'react'
import {
  ArrowRight, List, LayoutGrid,
  AlertCircle, BookOpen, Lock, Clock
} from 'lucide-react'
import EstadoBadge from '../components/EstadoBadge'
import { titulaciones, dashboardStats, miTrabajo, estadoConfig } from '../mockData'

// "tú" means the current user's role is responsible — map to the role label
const rolLabel = {
  autor: 'Autor',
  coordinador: 'Coordinador',
  editor: 'Editor',
  disenador: 'Diseñador',
}

function getPendiente(raw, rolActivo) {
  if (raw === 'tú') return rolLabel[rolActivo] ?? raw
  if (raw in rolLabel) return rolLabel[raw]
  return raw
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StatCards({ stats, filtroActivo, onStatClick }) {
  return (
    <div className="flex gap-2 mb-6">
      {stats.map((stat) => {
        const cfg = estadoConfig[stat.estado] || {}
        const isActive = filtroActivo === stat.filter
        return (
          <button
            key={stat.label}
            onClick={() => onStatClick(stat.filter)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all"
            style={{
              background: isActive ? cfg.bg || '#F8F9FA' : '#FFFFFF',
              border: isActive ? `1px solid ${cfg.border || '#E5E7EB'}` : '1px solid #E5E7EB',
              fontFamily: "'Inter', 'Arial', sans-serif",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F8F9FA' }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = '#FFFFFF' }}
          >
            <span
              className="text-base font-semibold"
              style={{ color: isActive ? cfg.text : '#374151' }}
            >
              {stat.value}
            </span>
            <span className="text-xs" style={{ color: isActive ? cfg.text : '#9CA3AF' }}>
              {stat.label}
            </span>
            {isActive && (
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: cfg.dot }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─── View: Mi trabajo ─────────────────────────────────────────────────────────

function VistaMiTrabajo({ rolActivo, filtroActivo, onNavigate }) {
  const items = filtroActivo
    ? miTrabajo.filter(w => w.estado === filtroActivo)
    : miTrabajo

  const urgentes = items.filter(w => w.estado === 'comentarios')
  const activos = items.filter(w => w.estado === 'borrador')
  const resto = items.filter(w => !['comentarios', 'borrador'].includes(w.estado))

  const renderItem = (item) => {
    const cfg = estadoConfig[item.estado] || {}
    const clickable = item.activa && item.canvasDestino
    const pendiente = getPendiente(item.pendienteDe, rolActivo)
    const esPropio = item.pendienteDe === 'tú'

    return (
      <div
        key={item.id}
        onClick={() => clickable && onNavigate('canvas', { seccion: item.canvasDestino })}
        className="grid items-center px-5 py-3.5 transition-all group"
        style={{
          gridTemplateColumns: '16px 1fr 120px 100px 90px 14px',
          gap: '12px',
          cursor: clickable ? 'pointer' : 'default',
          borderBottom: '1px solid #F1F5F9',
        }}
        onMouseEnter={e => { if (clickable) e.currentTarget.style.background = '#F8F9FA' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.dot || '#CBD5E1' }} />

        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-medium truncate block" style={{ color: clickable ? '#1A1A1A' : '#94A3B8' }}>
              {item.seccion}
            </span>
            {item.comentariosCriticos > 0 && (
              <span
                className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded"
                style={{ background: '#FEF2F2', color: '#EF4444', fontFamily: "'Arial', sans-serif" }}
              >
                <AlertCircle size={10} />
                {item.comentariosCriticos} crítico
              </span>
            )}
          </div>
          <p className="text-xs truncate" style={{ color: '#6B7280' }}>
            {item.asignatura}
            <span className="mx-1.5" style={{ color: '#E5E7EB' }}>·</span>
            {item.titulacion}
          </p>
        </div>

        <div className="flex items-center">
          <EstadoBadge estado={item.estado} size="sm" />
        </div>

        <div>
          <span
            className="text-sm font-medium"
            style={{ color: esPropio ? '#0098CD' : '#6B7280' }}
          >
            {pendiente}
          </span>
        </div>

        <div className="flex items-center gap-1" style={{ color: '#CBD5E1' }}>
          <Clock size={11} />
          <span className="text-xs">{item.ultimaActividad}</span>
        </div>

        {clickable
          ? <ArrowRight size={14} className="flex-shrink-0 group-hover:text-slate-400" style={{ color: '#CBD5E1' }} />
          : <div />
        }
      </div>
    )
  }

  const renderGroup = (label, items, color) => {
    if (items.length === 0) return null
    return (
      <div key={label} className="mb-1">
        <div className="flex items-center gap-2 px-5 py-2.5" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
          <span className="text-xs font-semibold" style={{ color: '#6B7280' }}>
            {label}
          </span>
          <span
            className="text-xs px-1.5 py-0.5 rounded font-medium"
            style={{ background: '#F1F5F9', color: '#94A3B8', fontFamily: "'Arial', sans-serif" }}
          >
            {items.length}
          </span>
        </div>
        {items.map(renderItem)}
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
      {/* Table header */}
      <div
        className="grid px-5 py-2.5"
        style={{
          gridTemplateColumns: '16px 1fr 120px 100px 90px 14px',
          background: '#F8F9FA',
          borderBottom: '1px solid #E5E7EB',
          gap: '12px',
        }}
      >
        {['', 'Sección · Asignatura', 'Estado', 'Pendiente de', 'Actividad', ''].map((col, i) => (
          <span
            key={i}
            className="text-xs font-medium"
            style={{ color: '#9CA3AF' }}
          >
            {col}
          </span>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="text-sm" style={{ color: '#9CA3AF' }}>No hay tareas con este estado</p>
        </div>
      ) : (
        <>
          {renderGroup('Requieren atención', urgentes, '#F97316')}
          {renderGroup('En progreso', activos, '#0098CD')}
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
    <div className="flex gap-4" style={{ minHeight: '400px', fontFamily: "'Inter', 'Arial', sans-serif" }}>
      {/* Left: Titulaciones list */}
      <div
        className="flex-shrink-0 rounded-2xl overflow-hidden"
        style={{ width: '260px', background: '#FFFFFF', border: '1px solid #E5E7EB' }}
      >
        <div className="px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <p className="text-xs font-semibold" style={{ color: '#9CA3AF' }}>
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
                className="w-full text-left px-4 py-3 transition-all flex items-start gap-3"
                style={{
                  cursor: t.navegable ? 'pointer' : 'default',
                  background: selected ? '#E0F4FB' : 'transparent',
                  borderLeft: selected ? '2px solid #0098CD' : '2px solid transparent',
                  opacity: t.navegable ? 1 : 0.45,
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: selected ? '#E0F4FB' : '#F8F9FA' }}
                >
                  {t.navegable
                    ? <BookOpen size={13} style={{ color: selected ? '#0098CD' : '#94A3B8' }} />
                    : <Lock size={12} style={{ color: '#CBD5E1' }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium leading-snug"
                    style={{ color: selected ? '#0098CD' : t.navegable ? '#374151' : '#94A3B8' }}
                  >
                    {t.nombre}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#9CA3AF', fontFamily: "'Arial', sans-serif" }}>
                    {t.codigo} · {t.asignaturas_count} asig.
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: Asignaturas */}
      <div className="flex-1 rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{titulacion?.nombre}</p>
            <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
              {asignaturasFiltradas.length} de {titulacion?.asignaturas_count} asignaturas
            </p>
          </div>
          {titulacion?.navegable && (
            <span
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{ background: '#E0F4FB', color: '#0098CD', border: '1px solid #B3E0F2', fontFamily: "'Arial', sans-serif" }}
            >
              Activa
            </span>
          )}
        </div>

        {titulacion?.navegable ? (
          <>
            <div
              className="grid px-5 py-2.5"
              style={{
                gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                background: '#F8F9FA',
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              {['Asignatura', 'Etapa actual', 'Estado', 'Pendiente de', 'Última actividad'].map(col => (
                <span key={col} className="text-xs font-semibold" style={{ color: '#9CA3AF' }}>
                  {col}
                </span>
              ))}
            </div>

            {asignaturasFiltradas.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm" style={{ color: '#9CA3AF' }}>No hay asignaturas con este estado</p>
              </div>
            ) : (
              asignaturasFiltradas.map((asig, i) => {
                const clickable = asig.activa
                const pendienteRaw = typeof asig.pendienteDe === 'object'
                  ? asig.pendienteDe[rolActivo] || '—'
                  : asig.pendienteDe
                const esPropio = pendienteRaw === 'tú'
                const pendienteDisplay = esPropio
                  ? (() => {
                      const labels = { autor: 'Autor', coordinador: 'Coordinador', editor: 'Editor', disenador: 'Diseñador' }
                      return labels[rolActivo] || pendienteRaw
                    })()
                  : pendienteRaw

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
                    onMouseEnter={e => { if (clickable) e.currentTarget.style.background = '#F8F9FA' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <div className="flex items-center gap-2">
                      {clickable && (
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse-dot" style={{ background: '#0098CD' }} />
                      )}
                      <span className="text-sm font-medium" style={{ color: clickable ? '#1A1A1A' : '#94A3B8' }}>
                        {asig.nombre}
                      </span>
                      {clickable && (
                        <ArrowRight size={13} style={{ color: '#CBD5E1' }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <span className="text-sm flex items-center" style={{ color: clickable ? '#6B7280' : '#CBD5E1' }}>
                      {asig.etapaActual}
                    </span>
                    <div className="flex items-center">
                      <EstadoBadge estado={asig.estado} size="sm" />
                    </div>
                    <div className="flex items-center">
                      <span
                        className="text-sm"
                        style={{
                          color: esPropio ? '#0098CD' : '#94A3B8',
                          fontWeight: esPropio ? '500' : '400',
                        }}
                      >
                        {pendienteDisplay}
                      </span>
                    </div>
                    <span className="text-sm flex items-center" style={{ color: '#9CA3AF' }}>
                      {asig.ultimaActividad}
                    </span>
                  </div>
                )
              })
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center px-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#F1F5F9' }}>
              <Lock size={20} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium" style={{ color: '#9CA3AF' }}>Titulación no disponible en el prototipo</p>
            <p className="text-xs mt-1" style={{ color: '#CBD5E1' }}>Selecciona el Máster en Inteligencia Artificial para navegar</p>
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
    <div className="min-h-screen" style={{ background: '#F8F9FA', fontFamily: "'Inter', 'Arial', sans-serif" }}>
      <div className="max-w-5xl mx-auto px-8 py-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold mb-0.5" style={{ color: '#1A1A1A' }}>Generación de Asignaturas</h1>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              {rolActivo === 'autor' && 'Tu trabajo como autor en todas las titulaciones asignadas'}
              {rolActivo === 'coordinador' && 'Contenido pendiente de revisión y aprobación'}
              {rolActivo === 'editor' && 'Asignaturas con revisiones activas'}
              {rolActivo === 'disenador' && 'Asignaturas disponibles para enriquecimiento'}
            </p>
          </div>

          <div
            className="flex items-center p-1 rounded-xl"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
          >
            {VISTAS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setVistaActiva(id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: vistaActiva === id ? '#E0F4FB' : 'transparent',
                  color: vistaActiva === id ? '#0098CD' : '#9CA3AF',
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <StatCards stats={stats} filtroActivo={filtroActivo} onStatClick={handleStatClick} />

        {filtroActivo && (
          <div className="flex items-center gap-2 mb-4 animate-fade-in">
            <span className="text-sm" style={{ color: '#9CA3AF' }}>Filtrando por:</span>
            <EstadoBadge estado={filtroActivo} />
            <button
              onClick={() => setFiltroActivo(null)}
              className="text-xs ml-1 transition-colors"
              style={{ color: '#CBD5E1' }}
              onMouseEnter={e => e.currentTarget.style.color = '#6B7280'}
              onMouseLeave={e => e.currentTarget.style.color = '#CBD5E1'}
            >
              Quitar ×
            </button>
          </div>
        )}

        <div className="animate-fade-in" key={vistaActiva}>
          {vistaActiva === 'trabajo' && (
            <VistaMiTrabajo rolActivo={rolActivo} filtroActivo={filtroActivo} onNavigate={onNavigate} />
          )}
          {vistaActiva === 'titulacion' && (
            <VistaPorTitulacion rolActivo={rolActivo} filtroActivo={filtroActivo} onNavigate={onNavigate} />
          )}
        </div>
      </div>
    </div>
  )
}

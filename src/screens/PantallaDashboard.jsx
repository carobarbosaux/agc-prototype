import { useState } from 'react'
import { ArrowRight, AlertCircle, Clock, Plus, BookOpen, Lock } from 'lucide-react'
import EstadoBadge from '../components/EstadoBadge'
import Chatbar from '../components/Chatbar'
import CalidadContenidosCards from '../components/CalidadContenidosCards'
import PanelMisPendientes from '../components/PanelMisPendientes'
import { dashboardStats, titulaciones as titulacionesData, miTrabajo, estadoConfig, tagsFiltrablesDashboard } from '../mockData'

const rolLabel = {
  autor: 'Autor',
  coordinador: 'Coordinador',
  editor: 'Editor',
  disenador: 'Diseñador',
}

// ─── Sidebar Titulaciones ────────────────────────────────────────────────────

function SidebarTitulaciones({ titulaciones, seleccionada, onSelect }) {
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', width: '232px', flexShrink: 0 }}
    >
      <div className="px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <p className="text-xs font-semibold" style={{ color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Titulaciones
        </p>
      </div>
      <div className="flex-1 overflow-y-auto py-1.5">
        {titulaciones.map(t => {
          const selected = seleccionada === t.id
          return (
            <button
              key={t.id}
              onClick={() => t.navegable && onSelect(t.id)}
              className="w-full text-left px-4 py-2.5 transition-all flex items-start gap-2.5"
              style={{
                cursor: t.navegable ? 'pointer' : 'default',
                background: selected ? '#E0F4FB' : 'transparent',
                borderLeft: selected ? '2.5px solid #0098CD' : '2.5px solid transparent',
                opacity: t.navegable ? 1 : 0.4,
              }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: selected ? '#E0F4FB' : '#F8F9FA' }}
              >
                {t.navegable
                  ? <BookOpen size={11} style={{ color: selected ? '#0098CD' : '#94A3B8' }} />
                  : <Lock size={10} style={{ color: '#CBD5E1' }} />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-medium leading-snug"
                  style={{ color: selected ? '#0098CD' : t.navegable ? '#374151' : '#94A3B8' }}
                >
                  {t.nombre}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#CBD5E1', fontFamily: "'Arial', sans-serif" }}>
                  {t.codigo} · {t.asignaturas_count} asig.
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Tabla Asignaturas ────────────────────────────────────────────────────────

function TablaAsignaturas({ rolActivo, titulaciones, titulacionSeleccionada, filtroTag, onNavigate }) {
  const titulacion = titulaciones.find(t => t.id === titulacionSeleccionada)

  let asignaturas = titulacion?.asignaturas || []

  // Apply tag filter
  if (filtroTag && filtroTag !== 'todos') {
    if (filtroTag === 'pendientes') {
      asignaturas = asignaturas.filter(a => {
        const pd = typeof a.pendienteDe === 'object' ? a.pendienteDe[rolActivo] : a.pendienteDe
        return pd === 'tú'
      })
    } else {
      asignaturas = asignaturas.filter(a => a.estado === filtroTag)
    }
  }

  if (!titulacion?.navegable) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#F1F5F9' }}>
          <Lock size={20} style={{ color: '#CBD5E1' }} />
        </div>
        <p className="text-sm font-medium" style={{ color: '#9CA3AF' }}>Titulación no disponible en el prototipo</p>
        <p className="text-xs mt-1" style={{ color: '#CBD5E1' }}>Selecciona el Máster en IA para navegar</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #F1F5F9', background: '#F8F9FA' }}>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{titulacion?.nombre}</p>
          <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
            {asignaturas.length} de {titulacion?.asignaturas_count} asignaturas
          </p>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-md font-medium"
          style={{ background: '#E0F4FB', color: '#0098CD', border: '1px solid #B3E0F2', fontFamily: "'Arial', sans-serif" }}
        >
          Activa
        </span>
      </div>

      {/* Column headers */}
      <div
        className="grid px-5 py-2.5"
        style={{
          gridTemplateColumns: '2fr 1.4fr 0.9fr 0.9fr 1fr',
          borderBottom: '1px solid #E5E7EB',
          gap: '12px',
        }}
      >
        {['Asignatura', 'Etapa actual', 'Estado', 'Pendiente de', 'Última actividad'].map(col => (
          <span key={col} className="text-xs font-semibold" style={{ color: '#9CA3AF' }}>{col}</span>
        ))}
      </div>

      {asignaturas.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm" style={{ color: '#9CA3AF' }}>No hay asignaturas con este filtro</p>
        </div>
      ) : (
        asignaturas.map((asig, i) => {
          const clickable = asig.activa
          const pendienteRaw = typeof asig.pendienteDe === 'object'
            ? asig.pendienteDe[rolActivo] || '—'
            : asig.pendienteDe
          const esPropio = pendienteRaw === 'tú'
          const pendienteDisplay = esPropio
            ? rolLabel[rolActivo] || pendienteRaw
            : pendienteRaw

          return (
            <div
              key={asig.id}
              onClick={() => clickable && onNavigate('canvas', { seccion: 't2' })}
              className="grid px-5 py-3.5 transition-all group"
              style={{
                gridTemplateColumns: '2fr 1.4fr 0.9fr 0.9fr 1fr',
                borderBottom: i < asignaturas.length - 1 ? '1px solid #F8F9FA' : 'none',
                cursor: clickable ? 'pointer' : 'default',
                gap: '12px',
              }}
              onMouseEnter={e => { if (clickable) e.currentTarget.style.background = '#F8F9FA' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              <div className="flex items-center gap-2 min-w-0">
                {clickable && (
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: '#0098CD' }} />
                )}
                <span className="text-sm font-medium truncate" style={{ color: clickable ? '#1A1A1A' : '#94A3B8' }}>
                  {asig.nombre}
                </span>
                {clickable && (
                  <ArrowRight size={12} style={{ color: '#CBD5E1', flexShrink: 0 }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>

              <span className="text-sm flex items-center truncate" style={{ color: clickable ? '#6B7280' : '#CBD5E1' }}>
                {asig.etapaActual}
              </span>

              <div className="flex items-center">
                <EstadoBadge estado={asig.estado} size="sm" />
              </div>

              <div className="flex items-center">
                <span className="text-sm" style={{ color: esPropio ? '#0098CD' : '#9CA3AF', fontWeight: esPropio ? '500' : '400' }}>
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
    </div>
  )
}

// ─── Barra acciones + tags ────────────────────────────────────────────────────

function BarraAccionesDashboard({ rolActivo, filtroTag, onFiltroChange, onNuevaAsignatura }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 flex-wrap">
        {tagsFiltrablesDashboard.map(tag => {
          const active = filtroTag === tag.id || (tag.id === 'todos' && !filtroTag)
          return (
            <button
              key={tag.id}
              onClick={() => onFiltroChange(tag.id === 'todos' ? null : tag.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: active ? '#0098CD' : '#FFFFFF',
                color: active ? '#FFFFFF' : '#6B7280',
                border: active ? '1px solid #0098CD' : '1px solid #E5E7EB',
              }}
            >
              {tag.label}
            </button>
          )
        })}
      </div>

      {rolActivo === 'autor' && (
        <button
          onClick={onNuevaAsignatura}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all flex-shrink-0"
          style={{ background: '#0098CD' }}
          onMouseEnter={e => e.currentTarget.style.background = '#00729A'}
          onMouseLeave={e => e.currentTarget.style.background = '#0098CD'}
        >
          <Plus size={14} />
          Nueva asignatura
        </button>
      )}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PantallaDashboard({ rolActivo, onNavigate, titulaciones, chatHistorial, setChatHistorial }) {
  const [titulacionSeleccionada, setTitulacionSeleccionada] = useState('master-ia')
  const [filtroTag, setFiltroTag] = useState(null)

  const subtitulo = {
    autor: 'Tu trabajo como autor en todas las titulaciones asignadas',
    coordinador: 'Contenido pendiente de revisión y aprobación',
    editor: 'Asignaturas con revisiones activas',
    disenador: 'Asignaturas disponibles para enriquecimiento',
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8F9FA', fontFamily: "'Inter', 'Arial', sans-serif" }}>
      <div className="max-w-screen-xl mx-auto px-6 py-6">

        {/* Page title */}
        <div className="mb-5">
          <h1 className="text-xl font-semibold mb-0.5" style={{ color: '#1A1A1A' }}>Generación de Asignaturas</h1>
          <p className="text-sm" style={{ color: '#6B7280' }}>{subtitulo[rolActivo]}</p>
        </div>

        {/* Chatbar */}
        <div className="mb-6">
          <Chatbar
            onNavigate={onNavigate}
            placeholder="Pregunta qué necesitas o usa /generar-asignatura…"
            chatHistorial={chatHistorial}
            setChatHistorial={setChatHistorial}
          />
        </div>

        {/* Calidad de Contenidos */}
        <div className="mb-6">
          <CalidadContenidosCards />
        </div>

        {/* Barra de acciones + tags */}
        <BarraAccionesDashboard
          rolActivo={rolActivo}
          filtroTag={filtroTag}
          onFiltroChange={setFiltroTag}
          onNuevaAsignatura={() => onNavigate('crearAsignatura')}
        />

        {/* 3-column layout */}
        <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
          {/* Left: Sidebar titulaciones */}
          <SidebarTitulaciones
            titulaciones={titulaciones}
            seleccionada={titulacionSeleccionada}
            onSelect={setTitulacionSeleccionada}
          />

          {/* Center: Tabla */}
          <div className="flex-1 min-w-0">
            <TablaAsignaturas
              rolActivo={rolActivo}
              titulaciones={titulaciones}
              titulacionSeleccionada={titulacionSeleccionada}
              filtroTag={filtroTag}
              onNavigate={onNavigate}
            />
          </div>

          {/* Right: Mis pendientes */}
          <div style={{ width: '264px', flexShrink: 0 }}>
            <PanelMisPendientes rolActivo={rolActivo} onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </div>
  )
}

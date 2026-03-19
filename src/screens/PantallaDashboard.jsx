import { useState, useEffect } from 'react'
import { Warning, Clock, Plus, BookOpen, Lock, Funnel, Globe, CheckCircle, XCircle, GitBranch, CaretRight, X, CaretRight as ChevronRight } from '@phosphor-icons/react'
import StatusIndicator, { toStatusKey } from '../components/StatusIndicator'
import Chatbar from '../components/Chatbar'
import CalidadContenidosCards from '../components/CalidadContenidosCards'
import PanelMisPendientes from '../components/PanelMisPendientes'
import OnboardingProdi from '../components/OnboardingProdi'
import { dashboardStats, estadoConfig, tagsFiltrablesDashboard, coordinatorTrackingData, shortcutsDashboard } from '../mockData'

const rolLabel = {
  autor: 'Autor',
  coordinador: 'Coordinador',
  editor: 'Editor',
  disenador: 'Diseñador',
}

const obsolescenciaConfig = {
  ok: { label: 'OK', bg: '#DCFCE7', color: '#16A34A', border: '#BBF7D0' },
  requiereRevision: { label: 'Requiere revisión', bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
  mantenimiento: { label: 'Mantenimiento', bg: '#FFF7ED', color: '#EA580C', border: '#FED7AA' },
  obsoleta: { label: 'Obsoleta', bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
}

// ─── Sidebar Titulaciones ─────────────────────────────────────────────────────

function SidebarTitulaciones({ titulaciones, seleccionada, onSelect }) {
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', width: '232px', flexShrink: 0 }}
    >
      <div className="px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <p className="text-xs font-semibold" style={{ color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Titulaciones
        </p>
      </div>
      <div className="flex-1 overflow-y-auto py-1.5 px-2">
        {titulaciones.map(t => {
          const selected = seleccionada === t.id
          return (
            <button
              key={t.id}
              onClick={() => t.navegable && onSelect(t.id)}
              className="w-full text-left px-3 py-2.5 transition-all flex items-start gap-3"
              style={{
                cursor: t.navegable ? 'pointer' : 'default',
                background: selected ? '#F4F6FD' : 'transparent',
                borderRadius: 12,
              }}
              onMouseEnter={e => { if (!selected && t.navegable) e.currentTarget.style.background = '#F4F6FD' }}
              onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'transparent' }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: selected ? '#E7EFFE' : t.navegable ? '#F8F9FA' : '#F1F5F9' }}
              >
                {t.navegable
                  ? <BookOpen size={11} style={{ color: selected ? '#367CFF' : '#64748B' }} />
                  : <Lock size={10} style={{ color: '#64748B' }} />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-medium leading-snug"
                  style={{ color: selected ? '#367CFF' : t.navegable ? '#272A3F' : '#6B7280' }}
                >
                  {t.nombre}
                </p>
                <p className="text-xs mt-0.5" style={{ color: t.navegable ? '#6B7280' : '#9CA3AF', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>
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

// ─── Tabla Asignaturas — Author (reducida) ────────────────────────────────────

function TablaAutor({ titulaciones, titulacionSeleccionada, filtroTag, rolActivo, onNavigate }) {
  const titulacion = titulaciones.find(t => t.id === titulacionSeleccionada)
  let asignaturas = titulacion?.asignaturas || []

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
          <Lock size={20} style={{ color: '#9CA3AF' }} />
        </div>
        <p className="text-sm font-medium" style={{ color: '#4B5563' }}>Titulación no disponible en el prototipo</p>
        <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Selecciona el Máster en IA para navegar</p>
      </div>
    )
  }

  const COLS_AUTOR = '2fr 1.1fr 0.9fr 1fr 1fr'
  const HDR = { padding: '10px 16px', background: '#E6EFFF', borderBottom: '1px solid #DCDFEB', display: 'flex', alignItems: 'center' }
  const hdrtxt = { color: '#3A455C', fontSize: 12, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }
  const CELL = { padding: '12px 16px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', minWidth: 0 }
  const txt = { color: '#334155', fontSize: 13, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '500', lineHeight: '20px' }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #DCDFEB', background: '#F8F9FA' }}>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{titulacion?.nombre}</p>
          <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{asignaturas.length} de {titulacion?.asignaturas_count} asignaturas</p>
        </div>
        <div style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 3.5, paddingBottom: 3.5, background: 'var(--primary-primary-100, #E7EFFE)', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <div style={{ color: 'var(--primary-primary-600, #0A5CF5)', fontSize: 12, fontFamily: 'Proeduca Sans', fontWeight: '500', lineHeight: '15.84px' }}>Activa</div>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid" style={{ gridTemplateColumns: COLS_AUTOR }}>
        {['Asignatura', 'Estado', 'Etapa', 'Pendiente de', 'Última actividad'].map(col => (
          <div key={col} style={HDR}><span style={hdrtxt}>{col}</span></div>
        ))}
      </div>

      {asignaturas.length === 0 ? (
        <div className="px-5 py-10 text-center"><p className="text-sm" style={{ color: '#4B5563' }}>No hay asignaturas con este filtro</p></div>
      ) : (
        asignaturas.map((asig) => {
          const clickable = asig.activa
          const pendienteRaw = typeof asig.pendienteDe === 'object' ? asig.pendienteDe[rolActivo] || '—' : asig.pendienteDe
          const esPropio = pendienteRaw === 'tú'
          const pendienteDisplay = esPropio ? rolLabel[rolActivo] || pendienteRaw : pendienteRaw

          return (
            <div
              key={asig.id}
              onClick={() => {
                if (!clickable) return
                if (asig.crearAsignatura) onNavigate('crearAsignatura')
                else onNavigate('canvas', { seccion: 't2', titulacionId: 'master-ia', asignaturaId: asig.id })
              }}
              className="grid transition-colors group"
              style={{ gridTemplateColumns: COLS_AUTOR, cursor: clickable ? 'pointer' : 'default' }}
              onMouseEnter={e => { if (clickable) e.currentTarget.style.background = '#F4F6FD' }}
              onMouseLeave={e => { e.currentTarget.style.background = '' }}
            >
              <div style={{ ...CELL, gap: 8 }}>
                {clickable && <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${!asig.crearAsignatura ? 'animate-pulse' : ''}`} style={{ background: '#367CFF' }} />}
                <span style={{ ...txt, color: clickable ? '#1A1A1A' : '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{asig.nombre}</span>
                {clickable && <CaretRight size={12} style={{ color: '#9CA3AF', flexShrink: 0 }} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
              </div>
              <div style={CELL}><StatusIndicator status={toStatusKey(asig.estado)} variant="badge" /></div>
              <div style={CELL}><span style={{ ...txt, color: '#6B7280' }}>{asig.etapaActual}</span></div>
              <div style={CELL}><span style={{ ...txt, color: esPropio ? '#367CFF' : '#6B7280', fontWeight: esPropio ? '600' : '500' }}>{pendienteDisplay}</span></div>
              <div style={CELL}><span style={{ ...txt, color: '#6B7280' }}>{asig.ultimaActividad}</span></div>
            </div>
          )
        })
      )}
    </div>
  )
}

// ─── Tabla Asignaturas — Coordinator (completa) ───────────────────────────────

function TablaCoordinador({ titulaciones, titulacionSeleccionada, filtroTag, filtroFilial, onFiltroFilialChange, rolActivo, onNavigate }) {
  const titulacion = titulaciones.find(t => t.id === titulacionSeleccionada)
  let asignaturas = titulacion?.asignaturas || []

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

  if (filtroFilial) {
    asignaturas = asignaturas.filter(a => a.filial === filtroFilial)
  }

  const filialesDisponibles = [...new Set((titulacion?.asignaturas || []).map(a => a.filial).filter(Boolean))]

  if (!titulacion?.navegable) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#F1F5F9' }}>
          <Lock size={20} style={{ color: '#9CA3AF' }} />
        </div>
        <p className="text-sm font-medium" style={{ color: '#4B5563' }}>Titulación no disponible en el prototipo</p>
        <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Selecciona el Máster en IA para navegar</p>
      </div>
    )
  }

  const COLS_COORD = '2fr 1fr 1fr 0.7fr 1fr 1fr 0.9fr'
  const HDR = { padding: '10px 16px', background: '#E6EFFF', borderBottom: '1px solid #DCDFEB', display: 'flex', alignItems: 'center' }
  const hdrtxt = { color: '#3A455C', fontSize: 12, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }
  const CELL = { padding: '12px 16px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', minWidth: 0 }
  const txt = { color: '#334155', fontSize: 13, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '500', lineHeight: '20px' }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #DCDFEB', background: '#F8F9FA' }}>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{titulacion?.nombre}</p>
          <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{asignaturas.length} de {titulacion?.asignaturas_count} asignaturas</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Globe size={12} style={{ color: '#6B7280' }} />
            <select
              className="text-xs outline-none rounded-md px-2 py-1"
              style={{ border: '1px solid #E5E7EB', background: '#FFFFFF', color: '#6B7280' }}
              value={filtroFilial || ''}
              onChange={e => onFiltroFilialChange?.(e.target.value || null)}
            >
              <option value="">Todas las filiales</option>
              {filialesDisponibles.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 3.5, paddingBottom: 3.5, background: 'var(--primary-primary-100, #E7EFFE)', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <div style={{ color: 'var(--primary-primary-600, #0A5CF5)', fontSize: 12, fontFamily: 'Proeduca Sans', fontWeight: '500', lineHeight: '15.84px' }}>Activa</div>
          </div>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid" style={{ gridTemplateColumns: COLS_COORD }}>
        {['Asignatura', 'Estado', 'Responsable', 'Filial', 'Obsolescencia', 'Última actividad', 'Fecha objetivo'].map(col => (
          <div key={col} style={HDR}><span style={hdrtxt}>{col}</span></div>
        ))}
      </div>

      {asignaturas.length === 0 ? (
        <div className="px-5 py-10 text-center"><p className="text-sm" style={{ color: '#4B5563' }}>No hay asignaturas con este filtro</p></div>
      ) : (
        asignaturas.map((asig) => {
          const clickable = asig.activa
          const pendienteRaw = typeof asig.pendienteDe === 'object' ? asig.pendienteDe[rolActivo] || '—' : asig.pendienteDe
          const esPropio = pendienteRaw === 'tú'
          const pendienteDisplay = esPropio ? rolLabel[rolActivo] || pendienteRaw : pendienteRaw
          const obs = obsolescenciaConfig[asig.obsolescencia] || obsolescenciaConfig.ok

          return (
            <div
              key={asig.id}
              onClick={() => {
                if (!clickable) return
                if (asig.crearAsignatura) onNavigate('crearAsignatura')
                else onNavigate('canvas', { seccion: 't2', titulacionId: 'master-ia', asignaturaId: asig.id })
              }}
              className="grid transition-colors group"
              style={{ gridTemplateColumns: COLS_COORD, cursor: clickable ? 'pointer' : 'default' }}
              onMouseEnter={e => { if (clickable) e.currentTarget.style.background = '#F4F6FD' }}
              onMouseLeave={e => { e.currentTarget.style.background = '' }}
            >
              <div style={{ ...CELL, gap: 8 }}>
                {clickable && <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${!asig.crearAsignatura ? 'animate-pulse' : ''}`} style={{ background: '#367CFF' }} />}
                <span style={{ ...txt, color: clickable ? '#1A1A1A' : '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{asig.nombre}</span>
                {clickable && <CaretRight size={12} style={{ color: '#9CA3AF', flexShrink: 0 }} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
              </div>
              <div style={CELL}><StatusIndicator status={toStatusKey(asig.estado)} variant="badge" /></div>
              <div style={CELL}><span style={{ ...txt, color: esPropio ? '#367CFF' : '#6B7280', fontWeight: esPropio ? '600' : '500' }}>{pendienteDisplay}</span></div>
              <div style={CELL}><span style={{ ...txt, color: '#6B7280' }}>{asig.filial || '—'}</span></div>
              <div style={CELL}>
                {asig.obsolescencia
                  ? <div style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 3.5, paddingBottom: 3.5, background: obs.bg, borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}><div style={{ color: obs.color, fontSize: 12, fontFamily: 'Proeduca Sans', fontWeight: '500', lineHeight: '15.84px' }}>{obs.label}</div></div>
                  : <span style={{ ...txt, color: '#9CA3AF' }}>—</span>}
              </div>
              <div style={CELL}><span style={{ ...txt, color: '#6B7280' }}>{asig.ultimaActividad}</span></div>
              <div style={CELL}><span style={{ ...txt, color: '#6B7280' }}>{asig.fechaObjetivo || '—'}</span></div>
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
              className="transition-all"
              style={{
                padding: '8px 12px',
                borderRadius: 10,
                outline: `1px ${active ? '#0A5CF5' : '#E6E6E6'} solid`,
                outlineOffset: '-1px',
                background: active ? '#F1F5F9' : 'transparent',
                color: active ? '#0A5CF5' : '#334155',
                fontSize: 12,
                fontFamily: "'Proeduca Sans', system-ui, sans-serif",
                fontWeight: '500',
                lineHeight: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                if (!active) e.currentTarget.style.background = '#F1F5F9'
              }}
              onMouseLeave={e => {
                if (!active) e.currentTarget.style.background = 'transparent'
              }}
            >
              {tag.label}
            </button>
          )
        })}
      </div>

      {/* Only Coordinator can create new asignaturas */}
      {rolActivo === 'coordinador' && (
        <button
          onClick={onNuevaAsignatura}
          className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-sm font-semibold text-white transition-all flex-shrink-0"
          style={{ background: '#0A5CF5' }}
          onMouseEnter={e => e.currentTarget.style.background = '#0039A3'}
          onMouseLeave={e => e.currentTarget.style.background = '#0A5CF5'}
        >
          <Plus size={14} />
          Nueva asignatura
        </button>
      )}
    </div>
  )
}

// ─── Tabla Asignaturas — Diseñador (solo aprobadas, 2 cols) ───────────────────

function TablaDisenador({ titulaciones, titulacionSeleccionada, onNavigate }) {
  const titulacion = titulaciones.find(t => t.id === titulacionSeleccionada)
  const asignaturas = (titulacion?.asignaturas || []).filter(a => a.disenadorEstado)

  if (!titulacion?.navegable) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#F1F5F9' }}>
          <Lock size={20} style={{ color: '#9CA3AF' }} />
        </div>
        <p className="text-sm font-medium" style={{ color: '#4B5563' }}>Titulación no disponible en el prototipo</p>
        <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Selecciona el Máster en IA para navegar</p>
      </div>
    )
  }

  const estadoDisenadorConfig = {
    aprobado: { label: 'Disponible', bg: '#F0FDF4', color: '#10B981', border: '#A7F3D0' },
    disenado: { label: 'Diseñado', bg: '#F5F3FF', color: '#7C3AED', border: '#DDD6FE' },
    porComenzar: { label: 'No disponible', bg: '#F8FAFC', color: '#64748B', border: '#E2E8F0' },
  }

  const COLS_DIS = '3fr 140px'
  const HDR = { padding: '10px 16px', background: '#E6EFFF', borderBottom: '1px solid #DCDFEB', display: 'flex', alignItems: 'center' }
  const hdrtxt = { color: '#3A455C', fontSize: 12, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }
  const CELL = { padding: '12px 16px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', minWidth: 0 }
  const txt = { color: '#334155', fontSize: 13, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '500', lineHeight: '20px' }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #DCDFEB', background: '#F8F9FA' }}>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{titulacion?.nombre}</p>
          <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
            {asignaturas.filter(a => a.disenadorEstado === 'aprobado').length} disponibles · {asignaturas.filter(a => a.disenadorEstado === 'disenado').length} diseñadas
          </p>
        </div>
        <div style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 3.5, paddingBottom: 3.5, background: 'rgba(2, 6, 23, 0.10)', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <div style={{ color: 'var(--neutrals-old-Black, #090B11)', fontSize: 12, fontFamily: 'Proeduca Sans', fontWeight: '500', lineHeight: '15.84px' }}>Diseñador instruccional</div>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid" style={{ gridTemplateColumns: COLS_DIS }}>
        {['Asignatura', 'Estado'].map(col => (
          <div key={col} style={HDR}><span style={hdrtxt}>{col}</span></div>
        ))}
      </div>

      {asignaturas.map((asig) => {
        const est = estadoDisenadorConfig[asig.disenadorEstado] || estadoDisenadorConfig.porComenzar
        const clickable = asig.disenadorEstado === 'aprobado' && asig.activa
        return (
          <div
            key={asig.id}
            onClick={() => { if (clickable) onNavigate('canvas', { seccion: 't1', titulacionId: 'master-ia', asignaturaId: asig.id }) }}
            className="grid transition-colors group"
            style={{ gridTemplateColumns: COLS_DIS, cursor: clickable ? 'pointer' : 'default' }}
            onMouseEnter={e => { if (clickable) e.currentTarget.style.background = '#F4F6FD' }}
            onMouseLeave={e => { e.currentTarget.style.background = '' }}
          >
            <div style={{ ...CELL, gap: 8 }}>
              {clickable && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: '#7C3AED' }} />}
              <span style={{ ...txt, color: clickable ? '#1A1A1A' : '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{asig.nombre}</span>
              {clickable && <CaretRight size={12} style={{ color: '#9CA3AF', flexShrink: 0 }} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
            </div>
            <div style={CELL}>
              <div style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 3.5, paddingBottom: 3.5, background: est.bg, borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}><div style={{ color: est.color, fontSize: 12, fontFamily: 'Proeduca Sans', fontWeight: '500', lineHeight: '15.84px' }}>{est.label}</div></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Tracking Dashboard ───────────────────────────────────────────────────────

const TODAY_TRACKING = new Date('2026-03-05')
const calcDaysOld = date => Math.floor((TODAY_TRACKING - new Date(date)) / 86400000)
const calcObsPct = (days, years) => Math.round(days / (years * 365) * 1000) / 10
const calcStatus = pct => pct <= 60 ? 'healthy' : pct <= 90 ? 'approaching' : pct <= 100 ? 'critical' : 'overdue'

const STATUS_CONFIG = {
  healthy:    { label: 'Saludable',  bg: '#DCFCE7', color: '#16A34A', border: '#BBF7D0', dot: '#16A34A', Icon: CheckCircle },
  approaching:{ label: 'Próximo',    bg: '#FFFBEB', color: '#D97706', border: '#FDE68A', dot: '#D97706', Icon: Clock },
  critical:   { label: 'Crítico',    bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', dot: '#DC2626', Icon: Warning },
  overdue:    { label: 'Caducado',   bg: '#F5F3FF', color: '#7C3AED', border: '#DDD6FE', dot: '#7C3AED', Icon: XCircle },
}

const ALARM_CONFIG = {
  'version-mismatch':          { label: 'Desajuste de versión',     color: '#D97706' },
  'approaching-obsolescence':  { label: 'Obsolescencia próxima',    color: '#D97706' },
  'critical-obsolescence':     { label: 'Obsolescencia crítica',    color: '#DC2626' },
  'expired-content':           { label: 'Contenido caducado',       color: '#7C3AED' },
  'pending-update':            { label: 'Actualización pendiente',  color: '#367CFF' },
}

const FILIAL_LABELS = { espana: 'España', colombia: 'Colombia', mexico: 'México', ecuador: 'Ecuador' }

function TrackingDashboard({ onNavigate }) {
  const [statusFilter, setStatusFilter] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const enriched = coordinatorTrackingData.map(s => {
    const daysOld = calcDaysOld(s.lastVersionDate)
    const pct = calcObsPct(daysOld, s.obsolescenceCycleYears)
    const status = calcStatus(pct)
    return { ...s, daysOld, pct, status }
  })

  const counts = {
    healthy: enriched.filter(s => s.status === 'healthy').length,
    approaching: enriched.filter(s => s.status === 'approaching').length,
    critical: enriched.filter(s => s.status === 'critical').length,
    overdue: enriched.filter(s => s.status === 'overdue').length,
  }

  const filtered = statusFilter ? enriched.filter(s => s.status === statusFilter) : enriched
  const selected = enriched.find(s => s.id === selectedId)

  const formatDate = iso => {
    const d = new Date(iso)
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
      {/* Main content */}
      <div className="flex-1 min-w-0">

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
            const { Icon } = cfg
            const count = counts[key]
            const active = statusFilter === key
            return (
              <button
                key={key}
                onClick={() => setStatusFilter(active ? null : key)}
                className="rounded-xl p-4 text-left transition-all"
                style={{
                  background: active ? cfg.bg : '#FFFFFF',
                  border: `1px solid ${active ? cfg.border : '#E5E7EB'}`,
                  outline: active ? `2px solid ${cfg.color}` : 'none',
                  outlineOffset: '2px',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} style={{ color: cfg.color }} />
                  <span className="text-xs font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
                </div>
                <div className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>{count}</div>
                <div className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                  {count === 1 ? 'asignatura' : 'asignaturas'}
                </div>
              </button>
            )
          })}
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
          {/* Table header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>
              Seguimiento de contenidos
              {statusFilter && (
                <span className="ml-2 inline-flex items-center gap-1" style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 3.5, paddingBottom: 3.5, background: STATUS_CONFIG[statusFilter].bg, borderRadius: 6 }}>
                  <span style={{ color: STATUS_CONFIG[statusFilter].color, fontSize: 12, fontFamily: 'Proeduca Sans', fontWeight: '500', lineHeight: '15.84px' }}>{STATUS_CONFIG[statusFilter].label}</span>
                  <button className="opacity-60 hover:opacity-100" style={{ color: STATUS_CONFIG[statusFilter].color }} onClick={() => setStatusFilter(null)}>×</button>
                </span>
              )}
            </span>
            <span className="text-xs" style={{ color: '#6B7280' }}>{filtered.length} de {enriched.length}</span>
          </div>

          {/* Column headers */}
          <div className="grid" style={{ gridTemplateColumns: '2fr 1.2fr 70px 90px 70px 130px 1fr 110px' }}>
            {['Asignatura', 'Últ. actualización', 'Días', 'Tipo', 'Ciclo', 'Obsolescencia', 'Filiales', 'Estado'].map(col => (
              <div key={col} style={{ padding: '10px 16px', background: '#E6EFFF', borderBottom: '1px solid #DCDFEB', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#3A455C', fontSize: 12, fontFamily: "'Proeduca Sans', system-ui, sans-serif", fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{col}</span>
              </div>
            ))}
          </div>

          {/* Rows */}
          {filtered.map(s => {
            const cfg = STATUS_CONFIG[s.status]
            const barWidth = Math.min(s.pct, 100)
            const barColor = s.status === 'healthy' ? '#16A34A' : s.status === 'approaching' ? '#D97706' : s.status === 'critical' ? '#DC2626' : '#7C3AED'
            const isSelected = selectedId === s.id
            return (
              <div
                key={s.id}
                className="grid items-center cursor-pointer transition-colors"
                style={{
                  gridTemplateColumns: '2fr 1.2fr 70px 90px 70px 130px 1fr 110px',
                  borderBottom: '1px solid #F1F5F9',
                  background: isSelected ? '#EEF4FF' : undefined,
                  padding: '0',
                }}
                onClick={() => setSelectedId(isSelected ? null : s.id)}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#F4F6FD' }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = '' }}
              >
                {/* Asignatura */}
                <div className="flex items-center gap-2 min-w-0" style={{ padding: '12px 16px' }}>
                  {s.alarms.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ALARM_CONFIG[s.alarms[0]]?.color || '#D97706' }} />
                  )}
                  <span className="text-sm font-medium truncate" style={{ color: '#1A1A1A' }}>{s.nombre}</span>
                </div>
                {/* Última actualización */}
                <div style={{ padding: '12px 16px' }}><span className="text-xs" style={{ color: '#6B7280' }}>{formatDate(s.lastVersionDate)}</span></div>
                {/* Días */}
                <div style={{ padding: '12px 16px' }}><span className="text-xs font-mono" style={{ color: s.daysOld > 365 ? '#DC2626' : '#374151' }}>{s.daysOld}</span></div>
                {/* Tipo */}
                <div style={{ padding: '12px 16px' }}><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F3F4F6', color: '#374151' }}>{s.subjectType}</span></div>
                {/* Ciclo */}
                <div style={{ padding: '12px 16px' }}><span className="text-xs" style={{ color: '#6B7280' }}>{s.obsolescenceCycleYears}a</span></div>
                {/* Obsolescencia % — progress bar + number */}
                <div className="flex items-center gap-2" style={{ padding: '12px 16px' }}>
                  <div className="rounded-full overflow-hidden" style={{ width: 48, height: 5, background: '#F3F4F6', flexShrink: 0 }}>
                    <div style={{ width: `${barWidth}%`, height: '100%', background: barColor, borderRadius: '9999px' }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: barColor }}>{s.pct}%</span>
                </div>
                {/* Filiales */}
                <div className="flex items-center gap-1 flex-wrap" style={{ padding: '12px 16px' }}>
                  {Object.entries(s.filialVersions).map(([key, fv]) => (
                    <span key={key} className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', color: '#374151' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: fv.status === 'published' ? '#16A34A' : '#D97706' }} />
                      {FILIAL_LABELS[key] || key}
                    </span>
                  ))}
                </div>
                {/* Estado */}
                <div style={{ padding: '12px 16px' }}>
                  <div style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 3.5, paddingBottom: 3.5, background: cfg.bg, borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ color: cfg.color, fontSize: 12, fontFamily: 'Proeduca Sans', fontWeight: '500', lineHeight: '15.84px' }}>{cfg.label}</div>
                  </div>
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="px-4 py-10 text-center text-sm" style={{ color: '#4B5563' }}>
              No hay asignaturas con ese estado
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 304, background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
          {/* Header */}
          <div className="px-4 py-3 flex items-start justify-between gap-2" style={{ borderBottom: '1px solid #E5E7EB', background: '#F8F9FA' }}>
            <div className="min-w-0">
              <div className="text-xs mb-1" style={{ color: '#6B7280' }}>{selected.titulacion}</div>
              <div className="text-sm font-semibold leading-tight" style={{ color: '#1A1A1A' }}>{selected.nombre}</div>
            </div>
            <button onClick={() => setSelectedId(null)} className="flex-shrink-0 p-0.5 rounded hover:bg-gray-200 transition-colors">
              <X size={14} style={{ color: '#6B7280' }} />
            </button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 260px)' }}>
            {/* Structural info */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Información estructural</div>
              <div className="space-y-1.5 text-xs">
                {[
                  ['Última versión', formatDate(selected.lastVersionDate)],
                  ['Tipo', selected.subjectType],
                  ['Ciclo obsolescencia', `${selected.obsolescenceCycleYears} años`],
                  ['Versiones acumuladas', selected.accumulatedVersions],
                  ['Días sin actualizar', `${selected.daysOld} días`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span style={{ color: '#6B7280' }}>{k}</span>
                    <span className="font-medium" style={{ color: '#1A1A1A' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Obsolescence status */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Estado de obsolescencia</div>
              <div className="rounded-lg p-3 space-y-2" style={{ background: STATUS_CONFIG[selected.status].bg, border: `1px solid ${STATUS_CONFIG[selected.status].border}` }}>
                <div className="flex items-center gap-2">
                  {(() => { const { Icon } = STATUS_CONFIG[selected.status]; return <Icon size={13} style={{ color: STATUS_CONFIG[selected.status].color }} /> })()}
                  <span className="text-xs font-semibold" style={{ color: STATUS_CONFIG[selected.status].color }}>{STATUS_CONFIG[selected.status].label}</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 6, background: 'rgba(0,0,0,0.08)' }}>
                  <div style={{ width: `${Math.min(selected.pct, 100)}%`, height: '100%', background: STATUS_CONFIG[selected.status].color, borderRadius: '9999px' }} />
                </div>
                <div className="flex justify-between text-xs" style={{ color: STATUS_CONFIG[selected.status].color }}>
                  <span>{selected.pct}% del ciclo</span>
                  <span>{Math.max(0, selected.obsolescenceCycleYears * 365 - selected.daysOld)} días restantes</span>
                </div>
              </div>
            </div>

            {/* Filial versions */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Versiones por filial</div>
              <div className="space-y-2">
                {Object.entries(selected.filialVersions).map(([key, fv]) => (
                  <div key={key} className="rounded-lg px-3 py-2" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium" style={{ color: '#374151' }}>{FILIAL_LABELS[key] || key}</span>
                      <span className="text-xs font-mono" style={{ color: '#367CFF' }}>v{fv.version}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs" style={{ color: '#6B7280' }}>
                      <span>{formatDate(fv.date)}</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: fv.status === 'published' ? '#16A34A' : '#D97706' }} />
                        {fv.status === 'published' ? 'Publicado' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alarms */}
            {selected.alarms.length > 0 && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Alarmas</div>
                <div className="space-y-1.5">
                  {selected.alarms.map(a => {
                    const ac = ALARM_CONFIG[a]
                    return (
                      <div key={a} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: '#F8F9FA', border: `1px solid ${ac?.color}22` }}>
                        <Warning size={11} style={{ color: ac?.color, flexShrink: 0 }} />
                        <span className="text-xs" style={{ color: ac?.color }}>{ac?.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] text-xs font-semibold text-white transition-all"
                style={{ background: '#0A5CF5' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0039A3'}
                onMouseLeave={e => e.currentTarget.style.background = '#0A5CF5'}
                onClick={() => onNavigate('canvas', { asignaturaId: selected.id, seccion: 't1' })}
              >
                <ChevronRight size={13} />
                Revisar contenido
              </button>
              <button
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{ background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
              >
                Programar revisión
              </button>
              <button
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{ background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
              >
                Ver historial de versiones
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PantallaDashboard({ rolActivo, onNavigate, titulaciones, chatHistorial, setChatHistorial }) {
  const [titulacionSeleccionada, setTitulacionSeleccionada] = useState('master-ia')
  const [filtroTag, setFiltroTag] = useState(null)
  const [filtroFilial, setFiltroFilial] = useState(null)
  const [dashTab, setDashTab] = useState('operativo')
  const [onboardingVisible, setOnboardingVisible] = useState(rolActivo === 'autor')

  // Re-show onboarding whenever rol switches to autor
  useEffect(() => {
    if (rolActivo === 'autor') setOnboardingVisible(true)
  }, [rolActivo])

  const esCoordinador = rolActivo === 'coordinador' || rolActivo === 'editor'
  const esDisenador = rolActivo === 'disenador'

  const dashShortcuts = shortcutsDashboard.filter(s => s.roles.includes(rolActivo))

  const chatbarPlaceholder = {
    autor: 'Pregunta qué necesitas o usa /mis-pendientes…',
    coordinador: 'Pregunta qué necesitas o usa /nueva-asignatura…',
    editor: 'Pregunta qué necesitas o usa /mis-pendientes…',
    disenador: '¿En qué puedo ayudarte?',
  }[rolActivo] ?? 'Pregunta qué necesitas…'

  const subtitulo = {
    autor: 'Tu trabajo como autor en todas las titulaciones asignadas',
    coordinador: 'Seguimiento completo de asignaturas por titulación, filial y estado',
    editor: 'Asignaturas con revisiones activas',
    disenador: 'Asignaturas disponibles para enriquecimiento',
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8F9FA', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>
      {onboardingVisible && (
        <OnboardingProdi onClose={() => setOnboardingVisible(false)} />
      )}
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
            placeholder={chatbarPlaceholder}
            chatHistorial={chatHistorial}
            setChatHistorial={setChatHistorial}
            shortcuts={dashShortcuts}
            onShortcutAction={(accion) => {
              if (accion === 'filtrarPendientes') setFiltroTag('pendientes')
              if (accion === 'filtrarAlertas') setFiltroTag('comentarios')
              if (accion === 'filtrarRevision') setFiltroTag('revision')
              if (accion === 'seguimiento') setDashTab('seguimiento')
            }}
          />
        </div>

        {/* Tab bar — coordinator only */}
        {rolActivo === 'coordinador' && (
          <div className="flex gap-0 mb-5" style={{ borderBottom: '2px solid #E5E7EB' }}>
            {[
              { key: 'operativo', label: 'Operativo' },
              { key: 'seguimiento', label: 'Seguimiento de contenidos' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setDashTab(tab.key)}
                className="px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  color: dashTab === tab.key ? '#367CFF' : '#6B7280',
                  borderBottom: dashTab === tab.key ? '2px solid #367CFF' : '2px solid transparent',
                  marginBottom: '-2px',
                  background: 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Seguimiento tab — coordinator only */}
        {rolActivo === 'coordinador' && dashTab === 'seguimiento' ? (
          <TrackingDashboard onNavigate={onNavigate} />
        ) : (
          <>
            {/* Calidad de Contenidos — hidden for disenador and autor */}
            {!esDisenador && rolActivo !== 'autor' && (
              <div className="mb-6">
                <CalidadContenidosCards onCardClick={id => {
                  const map = { alertas: 'comentarios', revision: 'revision', ise: null, critico: 'comentarios' }
                  setFiltroTag(map[id] ?? null)
                }} />
              </div>
            )}

            {/* Barra de acciones + tags — hidden for disenador */}
            {!esDisenador && (
              <BarraAccionesDashboard
                rolActivo={rolActivo}
                filtroTag={filtroTag}
                onFiltroChange={setFiltroTag}
                onNuevaAsignatura={() => onNavigate('crearAsignatura')}
              />
            )}

            {/* 3-column layout */}
            <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
              {/* Left: Sidebar titulaciones */}
              <SidebarTitulaciones
                titulaciones={titulaciones}
                seleccionada={titulacionSeleccionada}
                onSelect={setTitulacionSeleccionada}
              />

              {/* Center: Tabla (role-differentiated) */}
              <div className="flex-1 min-w-0">
                {esDisenador ? (
                  <TablaDisenador
                    titulaciones={titulaciones}
                    titulacionSeleccionada={titulacionSeleccionada}
                    onNavigate={onNavigate}
                  />
                ) : esCoordinador ? (
                  <TablaCoordinador
                    titulaciones={titulaciones}
                    titulacionSeleccionada={titulacionSeleccionada}
                    filtroTag={filtroTag}
                    filtroFilial={filtroFilial}
                    onFiltroFilialChange={setFiltroFilial}
                    rolActivo={rolActivo}
                    onNavigate={onNavigate}
                  />
                ) : (
                  <TablaAutor
                    titulaciones={titulaciones}
                    titulacionSeleccionada={titulacionSeleccionada}
                    filtroTag={filtroTag}
                    rolActivo={rolActivo}
                    onNavigate={onNavigate}
                  />
                )}
              </div>

              {/* Right: Mis pendientes — only for coordinator/editor, NOT disenador */}
              {esCoordinador && (
                <div style={{ width: '264px', flexShrink: 0 }}>
                  <PanelMisPendientes rolActivo={rolActivo} onNavigate={onNavigate} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

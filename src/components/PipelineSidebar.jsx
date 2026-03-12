import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen, Info, X } from 'lucide-react'
import { pipeline } from '../mockData'
import StatusIndicator, { toStatusKey } from './StatusIndicator'

const ESTADO_CLICKABLE = ['aprobado', 'borrador', 'revision', 'comentarios']

function TemaResumenPopover({ tema, onClose, anchorRef }) {
  const popRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (popRef.current && !popRef.current.contains(e.target) && !anchorRef.current?.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose, anchorRef])

  return (
    <div
      ref={popRef}
      className="absolute z-50 left-full ml-2 top-0 w-64 rounded-xl p-3.5"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-semibold leading-tight" style={{ color: '#1A1A1A' }}>
          T{tema.numero} — {tema.titulo}
        </span>
        <button onClick={onClose} className="flex-shrink-0 mt-0.5" style={{ color: '#9CA3AF' }}>
          <X size={12} />
        </button>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
        {tema.descripcion}
      </p>
    </div>
  )
}

export default function PipelineSidebar({ seccionActiva, onSeccionChange, creacionData, esAsignaturaNueva, estadosSeccion }) {
  const [temasExpandidos, setTemasExpandidos] = useState({ 'tema-1': true, 'tema-2': true })
  const [collapsed, setCollapsed] = useState(false)
  const [popoverAbierto, setPopoverAbierto] = useState(null)
  const infoRefs = useRef({})

  const temaDescMap = creacionData?.resumen?.temasConDescripcion
    ? Object.fromEntries(creacionData.resumen.temasConDescripcion.map((t, i) => [i + 1, t]))
    : null

  const getEstado = (secId, staticEstado) => {
    if (!esAsignaturaNueva) return staticEstado
    return estadosSeccion?.[secId] ?? 'sin_comenzar'
  }

  const toggleTema = (id) => setTemasExpandidos(prev => ({ ...prev, [id]: !prev[id] }))

  const handleClick = (id, estado) => {
    if (!ESTADO_CLICKABLE.includes(estado)) return
    onSeccionChange(id)
  }

  // Count approved sections for progress — use estadosSeccion for new subjects
  const allSecciones = pipeline.flatMap(e => e.tipo === 'tema' ? e.secciones : [e])
  const aprobadas = allSecciones.filter(s => getEstado(s.id, s.estado) === 'aprobado').length
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
              const estado = getEstado(etapa.id, etapa.estado)
              const clickable = ESTADO_CLICKABLE.includes(estado)
              const activo = seccionActiva === etapa.id
              return (
                <div
                  key={etapa.id}
                  onClick={() => handleClick(etapa.id, estado)}
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
                    <StatusIndicator status={toStatusKey(estado)} variant="icon" size="sm" showTooltip={true} />
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
              const secEstados = etapa.secciones.map(s => getEstado(s.id, s.estado))
              const estadoTema = secEstados.some(e => e === 'comentarios') ? 'comentarios'
                : secEstados.some(e => e === 'revision') ? 'revision'
                : secEstados.some(e => e === 'borrador') ? 'borrador'
                : secEstados.every(e => e === 'aprobado') ? 'aprobado'
                : secEstados.every(e => e === 'sin_comenzar') ? 'sin_comenzar'
                : 'bloqueado'

              // Extract tema number from id (e.g. 'tema-1' → 1)
              const temaNum = parseInt(etapa.id.split('-')[1], 10)
              const temaDesc = temaDescMap?.[temaNum] ?? null

              return (
                <div key={etapa.id} className="relative">
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
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {temaDesc && (
                        <span
                          ref={el => infoRefs.current[etapa.id] = el}
                          onClick={e => { e.stopPropagation(); setPopoverAbierto(prev => prev === etapa.id ? null : etapa.id) }}
                          className="flex items-center justify-center w-5 h-5 rounded-md transition-colors"
                          style={{
                            color: popoverAbierto === etapa.id ? '#367CFF' : '#9CA3AF',
                            background: popoverAbierto === etapa.id ? '#E7EFFE' : 'transparent',
                          }}
                          onMouseEnter={e => { e.stopPropagation(); e.currentTarget.style.color = '#367CFF'; e.currentTarget.style.background = '#E7EFFE' }}
                          onMouseLeave={e => { e.stopPropagation(); if (popoverAbierto !== etapa.id) { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.background = 'transparent' } }}
                        >
                          <Info size={12} />
                        </span>
                      )}
                      {expandido
                        ? <ChevronDown size={13} style={{ color: '#9CA3AF' }} />
                        : <ChevronRight size={13} style={{ color: '#9CA3AF' }} />
                      }
                    </div>
                  </button>
                  {popoverAbierto === etapa.id && temaDesc && (
                    <TemaResumenPopover
                      tema={temaDesc}
                      onClose={() => setPopoverAbierto(null)}
                      anchorRef={{ current: infoRefs.current[etapa.id] }}
                    />
                  )}

                  {/* Subsections */}
                  {expandido && (
                    <div className="mt-0.5 mb-1 ml-4 space-y-0.5 pl-2.5" style={{ borderLeft: '1.5px solid #E5E7EB' }}>
                      {etapa.secciones.map(sec => {
                        const secEstado = getEstado(sec.id, sec.estado)
                        const clickable = ESTADO_CLICKABLE.includes(secEstado)
                        const activo = seccionActiva === sec.id
                        return (
                          <div
                            key={sec.id}
                            onClick={() => handleClick(sec.id, secEstado)}
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
                            <StatusIndicator status={toStatusKey(secEstado)} variant="icon" size="sm" showTooltip={true} />
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

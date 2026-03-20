import { useState, useRef, useEffect } from 'react'
import { CaretDown, CaretRight, SidebarSimple, Info, X } from '@phosphor-icons/react'
import { pipeline } from '../mockData'
import Tooltip from './Tooltip'
import StatusIndicator, { toStatusKey } from './StatusIndicator'

const ESTADO_CLICKABLE = ['aprobado', 'borrador', 'revision', 'comentarios', 'sin_comenzar']

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
        <button onClick={onClose} className="flex-shrink-0 mt-0.5" style={{ color: '#6B7280' }}>
          <X size={12} />
        </button>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: '#4B5563' }}>
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
    if (estadosSeccion?.[secId] !== undefined) return estadosSeccion[secId]
    if (!esAsignaturaNueva) return staticEstado
    return 'sin_comenzar'
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
        className="flex flex-col items-center flex-shrink-0"
        style={{ width: '40px', minWidth: '40px', background: '#F8FAFC', borderRight: '1px solid #E5E7EB' }}
      >
        <Tooltip text="Expandir flujo de contenido" side="right">
          <button
            onClick={() => setCollapsed(false)}
            className="w-full flex items-center justify-center py-3 transition-colors"
            style={{ color: '#9CA3AF' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = '#EEF2F7' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.background = 'transparent' }}
          >
            <SidebarSimple size={15} />
          </button>
        </Tooltip>
        <div
          className="flex-1 flex items-center justify-center"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          <span className="select-none whitespace-nowrap" style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>
            Flujo de contenido
          </span>
        </div>
      </aside>
    )
  }

  return (
    <aside
      className="flex flex-col overflow-hidden flex-shrink-0 h-full"
      style={{
        width: '208px',
        minWidth: '208px',
        background: '#F8FAFC',
        borderRight: '1px solid #E5E7EB',
        fontFamily: "'Proeduca Sans', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div className="px-3.5 py-3 flex items-center justify-between flex-shrink-0" style={{ borderBottom: '1px solid #E5E7EB' }}>
        <p style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>
          Flujo de contenido
        </p>
        <Tooltip text="Colapsar" side="bottom">
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-md transition-colors"
            style={{ color: '#9CA3AF' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.background = '#F3F4F6' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.background = 'transparent' }}
          >
            <SidebarSimple size={14} />
          </button>
        </Tooltip>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-1.5 px-1.5">
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
                  className="flex items-center gap-2.5 px-3 py-2.5 transition-all"
                  style={{
                    cursor: clickable ? 'pointer' : 'default',
                    background: activo ? '#F4F6FD' : 'transparent',
                    borderRadius: 12,
                  }}
                  onMouseEnter={e => { if (!activo && clickable) e.currentTarget.style.background = '#F4F6FD' }}
                  onMouseLeave={e => { if (!activo) e.currentTarget.style.background = 'transparent' }}
                >
                  <StatusIndicator status={toStatusKey(estado)} variant="icon" size="sm" noBg={true} />
                  <span
                    className="leading-snug"
                    style={{ fontSize: '13px', fontWeight: activo ? 600 : 500, color: activo ? '#272A3F' : clickable ? '#374151' : '#9CA3AF', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}
                  >
                    {etapa.label}
                  </span>
                  {activo && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#367CFF' }} />
                  )}
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

              const temaNum = parseInt(etapa.id.split('-')[1], 10)
              const temaDesc = temaDescMap?.[temaNum] ?? null
              const bloqueado = estadoTema === 'bloqueado' || estadoTema === 'sin_comenzar'

              return (
                <div key={etapa.id} className="relative">
                  {/* Tema header */}
                  <button
                    onClick={() => toggleTema(etapa.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 transition-colors"
                    style={{
                      borderRadius: 12,
                      background: tieneActivo && !expandido ? '#F4F6FD' : 'transparent',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F4F6FD'}
                    onMouseLeave={e => e.currentTarget.style.background = tieneActivo && !expandido ? '#F4F6FD' : 'transparent'}
                  >
                    <StatusIndicator status={toStatusKey(estadoTema)} variant="icon" size="sm" noBg={true} />
                    <div className="min-w-0 text-left flex-1">
                      <p className="leading-snug" style={{ fontSize: '13px', fontWeight: 600, color: bloqueado ? '#9CA3AF' : '#272A3F', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>
                        {etapa.label}
                      </p>
                      <p className="leading-tight truncate" style={{ fontSize: '11px', fontWeight: 400, color: '#9CA3AF', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>
                        {etapa.labelCorto}
                      </p>
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
                        ? <CaretDown size={12} style={{ color: '#9CA3AF' }} />
                        : <CaretRight size={12} style={{ color: '#9CA3AF' }} />
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
                    <div className="mt-0.5 mb-1 ml-4 space-y-0.5 pl-2" style={{ borderLeft: '1.5px solid #E5E7EB' }}>
                      {etapa.secciones.map(sec => {
                        const secEstado = getEstado(sec.id, sec.estado)
                        const clickable = ESTADO_CLICKABLE.includes(secEstado)
                        const activo = seccionActiva === sec.id
                        return (
                          <div
                            key={sec.id}
                            onClick={() => handleClick(sec.id, secEstado)}
                            className="flex items-center gap-2 px-2.5 py-2 transition-all"
                            style={{
                              cursor: clickable ? 'pointer' : 'default',
                              background: activo ? '#F4F6FD' : 'transparent',
                              borderRadius: 10,
                            }}
                            title={!clickable ? 'Bloqueado hasta aprobar la etapa anterior' : undefined}
                            onMouseEnter={e => { if (!activo && clickable) e.currentTarget.style.background = '#F4F6FD' }}
                            onMouseLeave={e => { if (!activo) e.currentTarget.style.background = 'transparent' }}
                          >
                            <StatusIndicator status={toStatusKey(secEstado)} variant="icon" size="sm" noBg={true} />
                            <span
                              className="flex-1"
                              style={{
                                fontSize: '12px',
                                fontWeight: activo ? 600 : 400,
                                color: activo ? '#272A3F' : clickable ? '#4B5563' : '#9CA3AF',
                                fontFamily: "'Proeduca Sans', system-ui, sans-serif",
                              }}
                            >
                              {sec.label}
                            </span>
                            {activo && (
                              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#367CFF' }} />
                            )}
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
      <div className="px-3.5 py-3 flex-shrink-0" style={{ borderTop: '1px solid #E5E7EB', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>
        <div className="flex items-center justify-between mb-1.5">
          <p style={{ fontSize: '10px', fontWeight: 400, color: '#9CA3AF' }}>Progreso</p>
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#374151' }}>{pct}%</p>
        </div>
        <div className="w-full h-1 rounded-full" style={{ background: '#E5E7EB' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: '#367CFF' }} />
        </div>
        <p style={{ fontSize: '10px', fontWeight: 400, color: '#9CA3AF', marginTop: '6px' }}>{aprobadas} de {total} secciones aprobadas</p>
      </div>
    </aside>
  )
}

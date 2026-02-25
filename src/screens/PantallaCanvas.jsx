import { useState } from 'react'
import { ChevronRight, Plus, Save, Send, MessageSquare, Eye, Sparkles } from 'lucide-react'
import PipelineSidebar from '../components/PipelineSidebar'
import BloqueContenido from '../components/BloqueContenido'
import PanelIA from '../components/PanelIA'
import ComentarioHilo from '../components/ComentarioHilo'
import EstadoBadge from '../components/EstadoBadge'
import {
  bloquesTema2,
  bloquesTema1,
  bloquesIndice,
  bloquesInstrucciones,
  chatHistorialTema2,
  chatHistorialTema1,
} from '../mockData'

const SECCION_CONFIG = {
  t2: {
    label: 'Tema 2: Regresión y clasificación',
    labelCorto: 'Tema 2',
    estado: 'borrador',
    bloques: bloquesTema2,
    chat: chatHistorialTema2,
  },
  t1: {
    label: 'Tema 1: Introducción al aprendizaje automático',
    labelCorto: 'Tema 1',
    estado: 'revision',
    bloques: bloquesTema1,
    chat: chatHistorialTema1,
  },
  indice: {
    label: 'Índice',
    labelCorto: 'Índice',
    estado: 'aprobado',
    bloques: bloquesIndice,
    chat: chatHistorialTema2,
  },
  instrucciones: {
    label: 'Instrucciones didácticas',
    labelCorto: 'Instrucciones',
    estado: 'aprobado',
    bloques: bloquesInstrucciones,
    chat: chatHistorialTema2,
  },
}

export default function PantallaCanvas({
  rolActivo,
  seccionActiva,
  setSeccionActiva,
  panelIAabierto,
  setPanelIAabierto,
  onNavigate,
}) {
  const [comentarioActivoBloque, setComentarioActivoBloque] = useState(null)
  const [bloquesState, setBloquesState] = useState({
    t2: bloquesTema2.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
    t1: bloquesTema1.map(b => ({ ...b, comentarios: b.comentarios.map(c => ({ ...c, respuestas: [] })) })),
    indice: bloquesIndice,
    instrucciones: bloquesInstrucciones,
  })
  const [savedToast, setSavedToast] = useState(false)
  const [sentToast, setSentToast] = useState(false)

  const seccion = SECCION_CONFIG[seccionActiva] || SECCION_CONFIG.t2
  const bloques = bloquesState[seccionActiva] || seccion.bloques
  const editable = rolActivo === 'autor'

  // For autor on t1: show "con comentarios" state
  const estadoMostrado = seccionActiva === 't1' && rolActivo === 'autor' ? 'comentarios' : seccion.estado

  const handleComentarioClick = (bloque) => {
    if (bloque.comentarios?.length > 0) {
      setComentarioActivoBloque(bloque)
      setPanelIAabierto(false)
    }
  }

  const handleMarcarResuelto = (bloqueId, comentarioId) => {
    setBloquesState(prev => ({
      ...prev,
      [seccionActiva]: prev[seccionActiva].map(b => {
        if (b.id !== bloqueId) return b
        return {
          ...b,
          comentarios: b.comentarios.map(c =>
            c.id === comentarioId ? { ...c, resuelto: true } : c
          ),
        }
      }),
    }))
    // If all resolved, close panel
    const bloque = bloquesState[seccionActiva]?.find(b => b.id === bloqueId)
    if (bloque) {
      const remaining = bloque.comentarios.filter(c => c.id !== comentarioId && !c.resuelto)
      if (remaining.length === 0) {
        setTimeout(() => setComentarioActivoBloque(null), 800)
      }
    }
  }

  const handleResponder = (bloqueId, comentarioId, texto) => {
    setBloquesState(prev => ({
      ...prev,
      [seccionActiva]: prev[seccionActiva].map(b => {
        if (b.id !== bloqueId) return b
        return {
          ...b,
          comentarios: b.comentarios.map(c =>
            c.id === comentarioId
              ? { ...c, respuestas: [...(c.respuestas || []), { autor: 'Ana Lucía M.', texto }] }
              : c
          ),
        }
      }),
    }))
  }

  const totalComentariosCriticos = bloques.reduce((acc, b) => {
    return acc + (b.comentarios?.filter(c => c.gravedad === 'critico' && !c.resuelto).length || 0)
  }, 0)

  const showSavedToast = () => {
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 2000)
  }

  const showSentToast = () => {
    setSentToast(true)
    setTimeout(() => setSentToast(false), 2500)
  }

  // Action bar config per role & section
  const getActionBar = () => {
    if (rolActivo === 'autor') {
      if (seccionActiva === 't1') {
        // Autor with feedback
        return (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const bloqueConComentario = bloques.find(b => b.comentarios?.some(c => !c.resuelto))
                if (bloqueConComentario) handleComentarioClick(bloqueConComentario)
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
              style={{ background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA' }}
            >
              <MessageSquare size={15} />
              Ver comentarios
              {totalComentariosCriticos > 0 && (
                <span
                  className="ml-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: '#EF4444' }}
                >
                  {totalComentariosCriticos}
                </span>
              )}
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
              style={{ background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}
            >
              <Eye size={15} />
              Solicitar permiso de edición
            </button>
          </div>
        )
      }
      // Autor on t2 or other editable sections
      return (
        <div className="flex items-center gap-3">
          <button
            onClick={showSavedToast}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
            style={{ background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}
          >
            <Save size={15} />
            Guardar borrador
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
            style={{ background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}
          >
            <Eye size={15} />
            Solicitar permiso de edición
          </button>
          <button
            onClick={showSentToast}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
            style={{ background: '#6366F1' }}
          >
            Enviar a revisión
            <ChevronRight size={15} />
          </button>
        </div>
      )
    }
    return null
  }

  return (
    <div
      className="flex flex-col"
      style={{ height: 'calc(100vh - 56px)' }}
    >
      {/* Section header bar */}
      <div
        className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          minHeight: '52px',
        }}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-slate-700">{seccion.label}</h2>
          <EstadoBadge estado={estadoMostrado} />
        </div>
        <div className="flex items-center gap-2">
          {/* Toggle IA panel */}
          <button
            onClick={() => {
              setComentarioActivoBloque(null)
              setPanelIAabierto(!panelIAabierto)
            }}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: panelIAabierto && !comentarioActivoBloque ? '#EEF2FF' : '#F8FAFC',
              color: panelIAabierto && !comentarioActivoBloque ? '#6366F1' : '#94A3B8',
              border: panelIAabierto && !comentarioActivoBloque ? '1px solid #C7D2FE' : '1px solid #E2E8F0',
            }}
          >
            <Sparkles size={12} />
            Asistente IA
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Pipeline sidebar */}
        <PipelineSidebar
          seccionActiva={seccionActiva}
          onSeccionChange={(id) => {
            setSeccionActiva(id)
            setComentarioActivoBloque(null)
          }}
        />

        {/* Content area */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: '#F8FAFC' }}
        >
          <div
            className="max-w-2xl mx-auto py-8 px-8 space-y-5"
            style={{ paddingBottom: '96px' }}
          >
            {/* Section title */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-800 mb-1">{seccion.label}</h3>
              <p className="text-sm text-slate-400">Fundamentos de Machine Learning · Máster en IA</p>
            </div>

            {/* Read-only notice */}
            {!editable && (
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm animate-fade-in"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#64748B' }}
              >
                <Eye size={14} />
                <span>Solo lectura — solo el Autor puede editar este contenido</span>
              </div>
            )}

            {/* Blocks */}
            {bloques.map((bloque, i) => (
              <BloqueContenido
                key={bloque.id}
                bloque={bloque}
                index={i}
                editable={editable}
                onComentarioClick={() => handleComentarioClick(bloque)}
              />
            ))}

            {/* Add block button (autor only) */}
            {editable && (
              <button
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm text-slate-400 hover:text-slate-600 transition-all hover:bg-white group"
                style={{ border: '1.5px dashed #E2E8F0' }}
              >
                <Plus size={15} className="group-hover:scale-110 transition-transform" />
                Añadir bloque
              </button>
            )}
          </div>
        </main>

        {/* Right panel: IA or Comentarios */}
        {comentarioActivoBloque && (
          <div
            className="flex flex-col h-full animate-slide-in-right"
            style={{
              width: '320px',
              minWidth: '320px',
              background: '#FFFFFF',
              borderLeft: '1px solid #E2E8F0',
            }}
          >
            {/* Panel header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid #E2E8F0' }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: '#FEF2F2' }}
                >
                  <MessageSquare size={12} style={{ color: '#EF4444' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Comentarios</p>
                  <p className="text-xs text-slate-400">
                    {comentarioActivoBloque.comentarios?.filter(c => !c.resuelto).length} sin resolver
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setComentarioActivoBloque(null)
                  setPanelIAabierto(true)
                }}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-xs text-slate-400"
              >
                ✕
              </button>
            </div>

            {/* Bloque context */}
            <div
              className="mx-3 mt-3 p-3 rounded-lg text-xs text-slate-500 leading-relaxed"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
            >
              <p className="font-medium text-slate-400 mb-1 uppercase tracking-wide" style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace" }}>
                Bloque referenciado
              </p>
              {comentarioActivoBloque.contenido.substring(0, 120)}...
            </div>

            {/* Comments */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {comentarioActivoBloque.comentarios?.map(comentario => (
                <ComentarioHilo
                  key={comentario.id}
                  comentario={comentario}
                  onMarcarResuelto={(cid) => handleMarcarResuelto(comentarioActivoBloque.id, cid)}
                  onResponder={(cid, texto) => handleResponder(comentarioActivoBloque.id, cid, texto)}
                />
              ))}
            </div>
          </div>
        )}

        {panelIAabierto && !comentarioActivoBloque && (
          <PanelIA
            historialInicial={seccion.chat}
            temaLabel={seccion.labelCorto}
            onCerrar={() => setPanelIAabierto(false)}
          />
        )}

        {/* Collapsed IA toggle */}
        {!panelIAabierto && !comentarioActivoBloque && (
          <button
            onClick={() => setPanelIAabierto(true)}
            className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 px-2 hover:bg-indigo-50 transition-colors"
            style={{
              width: '36px',
              background: '#F8FAFC',
              borderLeft: '1px solid #E2E8F0',
            }}
          >
            <Sparkles size={14} style={{ color: '#6366F1' }} />
            <span
              className="text-xs font-medium"
              style={{
                color: '#6366F1',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
              }}
            >
              IA
            </span>
          </button>
        )}
      </div>

      {/* Action bar */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-end px-6 z-40"
        style={{
          height: '64px',
          background: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        }}
      >
        {getActionBar()}
      </div>

      {/* Toast: Saved */}
      {savedToast && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-xl animate-fade-in"
          style={{ background: '#10B981', zIndex: 100 }}
        >
          ✓ Borrador guardado
        </div>
      )}

      {/* Toast: Sent */}
      {sentToast && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-xl animate-fade-in"
          style={{ background: '#6366F1', zIndex: 100 }}
        >
          ✓ Tema 2 enviado a revisión
        </div>
      )}
    </div>
  )
}

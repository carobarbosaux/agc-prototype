import { useState } from 'react'
import { CheckCircle, ArrowCounterClockwise } from '@phosphor-icons/react'
import GravedadTag from './GravedadTag'
import { gravedadConfig } from '../mockData'

export default function ComentarioHilo({ comentario, onMarcarResuelto, onResponder, compact = false }) {
  const [respuesta, setRespuesta] = useState('')
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false)

  const handleResponder = () => {
    if (!respuesta.trim()) return
    onResponder?.(comentario.id, respuesta)
    setRespuesta('')
    setMostrarRespuesta(false)
  }

  return (
    <div
      className={`rounded-xl p-4 transition-all ${comentario.resuelto ? 'opacity-60' : ''}`}
      style={{
        background: comentario.resuelto ? '#F8FAFC' : (gravedadConfig[comentario.gravedad]?.bg ?? '#FFFFFF'),
        border: `1px solid ${comentario.resuelto ? '#E2E8F0' : (gravedadConfig[comentario.gravedad]?.border ?? '#E2E8F0')}`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: '#64748B' }}
          >
            {comentario.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">{comentario.autor}</p>
            <p className="text-xs text-slate-500">{comentario.rol} · {comentario.timestamp}</p>
          </div>
        </div>
        <GravedadTag gravedad={comentario.gravedad} size="sm" />
      </div>

      {/* Texto */}
      <p className="text-sm text-slate-600 leading-relaxed mb-3">{comentario.texto}</p>

      {/* Respuestas */}
      {comentario.respuestas && comentario.respuestas.length > 0 && (
        <div className="mt-3 pl-3 space-y-2" style={{ borderLeft: '2px solid #E2E8F0' }}>
          {comentario.respuestas.map((r, i) => (
            <div key={i} className="text-sm text-slate-600">
              <span className="font-medium text-slate-700 mr-1">{r.autor}:</span>
              {r.texto}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {!comentario.resuelto && (
        <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #F1F5F9' }}>
          <button
            onClick={() => onMarcarResuelto?.(comentario.id)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all hover:scale-[1.02]"
            style={{ background: '#F0FDF4', color: '#10B981', border: '1px solid #A7F3D0' }}
          >
            <CheckCircle size={13} />
            Marcar como resuelto
          </button>
          <button
            onClick={() => setMostrarRespuesta(!mostrarRespuesta)}
            className="text-xs text-slate-600 hover:text-slate-800 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Responder
          </button>
        </div>
      )}

      {comentario.resuelto && (
        <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600">
          <CheckCircle size={12} />
          <span>Resuelto</span>
        </div>
      )}

      {/* Reply input */}
      {mostrarRespuesta && !comentario.resuelto && (
        <div className="mt-3 animate-fade-in">
          <textarea
            value={respuesta}
            onChange={e => setRespuesta(e.target.value)}
            placeholder="Escribe tu respuesta..."
            className="w-full text-sm px-[13px] py-[9px] rounded-[10px] resize-none outline-none"
            style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#334155',
              minHeight: '72px',
              fontFamily: "'Proeduca Sans', system-ui, sans-serif",
            }}
            rows={3}
            onFocus={e => { e.target.style.borderColor = '#0A5CF5'; e.target.style.background = '#F8FAFC' }}
            onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#FFFFFF' }}
            onMouseEnter={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#0A5CF5' }}
            onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#CBD5E1' }}
          />
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleResponder}
              className="text-xs font-medium px-3 py-1.5 rounded-lg text-white transition-all"
              style={{ background: '#0A5CF5' }}
            >
              Enviar
            </button>
            <button
              onClick={() => setMostrarRespuesta(false)}
              className="text-xs text-slate-600 hover:text-slate-800 px-2 py-1.5 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

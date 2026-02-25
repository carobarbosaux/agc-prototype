import { useState, useRef, useEffect, useCallback } from 'react'
import { Wand2, ZoomIn, Minimize2, Palette, MessageCircle } from 'lucide-react'
import EtiquetaBloque from './EtiquetaBloque'
import { gravedadConfig } from '../mockData'

export default function BloqueContenido({
  bloque,
  index,
  editable = true,
  onComentarioClick,
  onContenidoChange,
}) {
  const [toolbarVisible, setToolbarVisible] = useState(false)
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 })
  const [contenido, setContenido] = useState(bloque.contenido)
  const contenedorRef = useRef(null)
  const toolbarRef = useRef(null)

  const comentariosActivos = bloque.comentarios?.filter(c => !c.resuelto) || []
  const tieneComentarioCritico = comentariosActivos.some(c => c.gravedad === 'critico')

  const handleMouseUp = useCallback(() => {
    if (!editable) return
    setTimeout(() => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed || selection.toString().trim().length < 3) {
        setToolbarVisible(false)
        return
      }
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      const containerRect = contenedorRef.current?.getBoundingClientRect()
      if (!containerRect) return

      setToolbarPos({
        top: rect.top - containerRect.top - 44,
        left: rect.left - containerRect.left + rect.width / 2 - 100,
      })
      setToolbarVisible(true)
    }, 10)
  }, [editable])

  const handleClickOutside = useCallback((e) => {
    if (toolbarRef.current && !toolbarRef.current.contains(e.target)) {
      setToolbarVisible(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  const toolbarActions = [
    { label: 'Mejorar', icon: Wand2 },
    { label: 'Expandir', icon: ZoomIn },
    { label: 'Resumir', icon: Minimize2 },
    { label: 'Cambiar tono', icon: Palette },
  ]

  return (
    <div
      className="group relative"
      ref={contenedorRef}
    >
      <div
        className="relative rounded-xl transition-all"
        style={{
          background: '#FFFFFF',
          border: tieneComentarioCritico ? '1px solid #FECACA' : '1px solid #E2E8F0',
          boxShadow: tieneComentarioCritico
            ? '0 0 0 3px rgba(239, 68, 68, 0.06)'
            : '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        {/* Block number indicator */}
        <div
          className="absolute -left-8 top-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: '#CBD5E1', fontFamily: "'JetBrains Mono', monospace" }}
        >
          {index + 1}
        </div>

        {/* Comment marker — right side */}
        {comentariosActivos.length > 0 && (
          <button
            onClick={() => onComentarioClick?.(bloque)}
            className="absolute -right-3 top-4 z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-md transition-transform hover:scale-110"
            style={{
              background: gravedadConfig[comentariosActivos[0].gravedad]?.color || '#EF4444',
            }}
            title={`${comentariosActivos.length} comentario${comentariosActivos.length > 1 ? 's' : ''}`}
          >
            <MessageCircle size={11} className="text-white" />
          </button>
        )}

        {/* Content */}
        <div className="p-5">
          {editable ? (
            <div
              contentEditable
              suppressContentEditableWarning
              onMouseUp={handleMouseUp}
              onInput={e => {
                setContenido(e.currentTarget.textContent)
                onContenidoChange?.(bloque.id, e.currentTarget.textContent)
              }}
              className="text-sm leading-relaxed outline-none"
              style={{ color: '#334155', minHeight: '60px' }}
            >
              {bloque.contenido}
            </div>
          ) : (
            <p
              className="text-sm leading-relaxed"
              style={{ color: '#334155' }}
            >
              {bloque.contenido}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4 pt-3" style={{ borderTop: '1px solid #F1F5F9' }}>
            {bloque.etiquetas.map(tag => (
              <EtiquetaBloque key={tag} label={tag} />
            ))}
            {!editable && comentariosActivos.length > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded font-medium"
                style={{
                  background: gravedadConfig[comentariosActivos[0].gravedad]?.bg,
                  color: gravedadConfig[comentariosActivos[0].gravedad]?.color,
                  border: `1px solid ${gravedadConfig[comentariosActivos[0].gravedad]?.border}`,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {gravedadConfig[comentariosActivos[0].gravedad]?.emoji} {comentariosActivos.length} comentario
              </span>
            )}
          </div>
        </div>

        {/* Inline toolbar */}
        {toolbarVisible && editable && (
          <div
            ref={toolbarRef}
            className="absolute z-50 flex items-center gap-0.5 p-1 rounded-lg shadow-2xl animate-fade-in"
            style={{
              top: `${toolbarPos.top}px`,
              left: `${Math.max(0, toolbarPos.left)}px`,
              background: '#0F172A',
            }}
          >
            {toolbarActions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onMouseDown={e => e.preventDefault()}
                onClick={() => {
                  setToolbarVisible(false)
                  window.getSelection()?.removeAllRanges()
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Icon size={11} className="opacity-70" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

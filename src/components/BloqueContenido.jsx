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
  onAccionIA,
}) {
  const [toolbarVisible, setToolbarVisible] = useState(false)
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 })
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
      style={{ fontFamily: "'Inter', 'Arial', sans-serif" }}
    >
      {/* Left accent for critical comments */}
      {tieneComentarioCritico && (
        <div
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{ width: '3px', background: '#EF4444', left: '-16px' }}
        />
      )}

      {/* Block number in gutter */}
      <div
        className="absolute text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity select-none"
        style={{ color: '#D1D5DB', top: '2px', left: '-32px', fontVariantNumeric: 'tabular-nums' }}
      >
        {index + 1}
      </div>

      {/* Comment button in right gutter */}
      {comentariosActivos.length > 0 && (
        <button
          onClick={() => onComentarioClick?.(bloque)}
          className="absolute flex items-center gap-1 transition-all hover:scale-105"
          style={{
            right: '-44px',
            top: '2px',
            background: gravedadConfig[comentariosActivos[0].gravedad]?.bg,
            color: gravedadConfig[comentariosActivos[0].gravedad]?.color,
            border: `1px solid ${gravedadConfig[comentariosActivos[0].gravedad]?.border}`,
            borderRadius: '6px',
            padding: '2px 6px',
            fontSize: '11px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
          }}
          title={`${comentariosActivos.length} comentario${comentariosActivos.length > 1 ? 's' : ''}`}
        >
          <MessageCircle size={10} />
          {comentariosActivos.length}
        </button>
      )}

      {/* Content — markdown-style, no box */}
      <div className="relative py-1">
        {editable ? (
          <div
            contentEditable
            suppressContentEditableWarning
            onMouseUp={handleMouseUp}
            onInput={e => onContenidoChange?.(bloque.id, e.currentTarget.textContent)}
            className="text-base leading-8 outline-none"
            style={{
              color: '#1F2937',
              caretColor: '#0098CD',
            }}
          >
            {bloque.contenido}
          </div>
        ) : (
          <p
            className="text-base leading-8"
            style={{ color: '#1F2937' }}
          >
            {bloque.contenido}
          </p>
        )}

        {/* Tags — inline, subtle */}
        <div className="flex flex-wrap gap-1.5 mt-2">
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
              }}
            >
              {gravedadConfig[comentariosActivos[0].gravedad]?.emoji} {comentariosActivos.length} comentario
            </span>
          )}
        </div>
      </div>

      {/* Inline AI toolbar on text selection */}
      {toolbarVisible && editable && (
        <div
          ref={toolbarRef}
          className="absolute z-50 flex items-center gap-0.5 p-1 rounded-lg shadow-2xl animate-fade-in"
          style={{
            top: `${toolbarPos.top}px`,
            left: `${Math.max(0, toolbarPos.left)}px`,
            background: '#073676',
          }}
        >
          {toolbarActions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onMouseDown={e => e.preventDefault()}
              onClick={() => {
                const texto = window.getSelection()?.toString().trim() || ''
                setToolbarVisible(false)
                window.getSelection()?.removeAllRanges()
                if (texto && onAccionIA) onAccionIA(texto, label)
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-white whitespace-nowrap transition-colors"
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <Icon size={11} className="opacity-70" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

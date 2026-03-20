import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

/**
 * Tooltip — dark navy tooltip with a clean CSS arrow.
 * Renders via portal to body so it's never clipped by overflow:hidden ancestors.
 *
 * Props:
 *   text   {string}  — tooltip label
 *   side   {string}  — 'right' (default) | 'left' | 'top' | 'bottom'
 */
export default function Tooltip({ text, side = 'right', children }) {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)

  const BG = '#001D52'
  const ARROW = 6
  const GAP = 8

  useEffect(() => {
    if (!visible || !triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()

    let top, left
    if (side === 'top') {
      top = rect.top + window.scrollY - GAP
      left = rect.left + window.scrollX + rect.width / 2
    } else if (side === 'bottom') {
      top = rect.bottom + window.scrollY + GAP
      left = rect.left + window.scrollX + rect.width / 2
    } else if (side === 'right') {
      top = rect.top + window.scrollY + rect.height / 2
      left = rect.right + window.scrollX + GAP
    } else { // left
      top = rect.top + window.scrollY + rect.height / 2
      left = rect.left + window.scrollX - GAP
    }
    setCoords({ top, left })
  }, [visible, side])

  const transformMap = {
    top:    'translateX(-50%) translateY(-100%)',
    bottom: 'translateX(-50%)',
    right:  'translateY(-50%)',
    left:   'translateX(-100%) translateY(-50%)',
  }

  const arrowStyle = {
    right: {
      position: 'absolute', top: '50%', left: -ARROW,
      transform: 'translateY(-50%)',
      width: 0, height: 0,
      borderTop: `${ARROW}px solid transparent`,
      borderBottom: `${ARROW}px solid transparent`,
      borderRight: `${ARROW}px solid ${BG}`,
    },
    left: {
      position: 'absolute', top: '50%', right: -ARROW,
      transform: 'translateY(-50%)',
      width: 0, height: 0,
      borderTop: `${ARROW}px solid transparent`,
      borderBottom: `${ARROW}px solid transparent`,
      borderLeft: `${ARROW}px solid ${BG}`,
    },
    top: {
      position: 'absolute', bottom: -ARROW, left: '50%',
      transform: 'translateX(-50%)',
      width: 0, height: 0,
      borderLeft: `${ARROW}px solid transparent`,
      borderRight: `${ARROW}px solid transparent`,
      borderTop: `${ARROW}px solid ${BG}`,
    },
    bottom: {
      position: 'absolute', top: -ARROW, left: '50%',
      transform: 'translateX(-50%)',
      width: 0, height: 0,
      borderLeft: `${ARROW}px solid transparent`,
      borderRight: `${ARROW}px solid transparent`,
      borderBottom: `${ARROW}px solid ${BG}`,
    },
  }

  const tooltip = visible ? createPortal(
    <div
      style={{
        position: 'absolute',
        top: coords.top,
        left: coords.left,
        transform: transformMap[side] ?? transformMap.right,
        zIndex: 99999,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <div style={arrowStyle[side] ?? arrowStyle.right} />
      <div
        style={{
          background: BG,
          borderRadius: 8,
          padding: '6px 10px',
          color: '#FFFFFF',
          fontSize: 12,
          fontFamily: "'Proeduca Sans', system-ui, sans-serif",
          fontWeight: 400,
          lineHeight: 1.4,
        }}
      >
        {text}
      </div>
    </div>,
    document.body
  ) : null

  return (
    <div
      ref={triggerRef}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {tooltip}
    </div>
  )
}

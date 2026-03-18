import { useState } from 'react'

/**
 * Tooltip — dark navy tooltip with a clean CSS arrow.
 *
 * Props:
 *   text   {string}  — tooltip label
 *   side   {string}  — 'right' (default) | 'left' | 'top' | 'bottom'
 */
export default function Tooltip({ text, side = 'right', children }) {
  const [visible, setVisible] = useState(false)

  const BG = '#001D52'
  const ARROW = 6  // px, half-base of the triangle

  // Position of the tooltip box relative to the trigger
  const boxPos = {
    right:  { left: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' },
    left:   { right: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' },
    top:    { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
  }

  // CSS-triangle arrow positioned on the edge of the bubble facing the trigger
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

  const pos = boxPos[side] ?? boxPos.right
  const arrow = arrowStyle[side] ?? arrowStyle.right

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          style={{
            position: 'absolute',
            ...pos,
            zIndex: 9999,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Arrow */}
          <div style={arrow} />
          {/* Bubble */}
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
        </div>
      )}
    </div>
  )
}

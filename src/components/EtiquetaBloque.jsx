export default function EtiquetaBloque({ label }) {
  return (
    <span
      className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded"
      style={{
        background: '#E7EFFE',
        color: '#367CFF',
        border: '1px solid #BAD2FF',
        fontFamily: "'Proeduca Sans', system-ui, sans-serif",
        letterSpacing: '0.01em',
      }}
    >
      {label}
    </span>
  )
}

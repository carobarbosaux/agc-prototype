export default function EtiquetaBloque({ label }) {
  return (
    <span
      className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded"
      style={{
        background: '#EEF2FF',
        color: '#6366F1',
        border: '1px solid #C7D2FE',
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: '0.01em',
      }}
    >
      {label}
    </span>
  )
}

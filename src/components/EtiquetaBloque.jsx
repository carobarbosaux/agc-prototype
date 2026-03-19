const SEVERITY_CONFIG = {
  Primary: {
    background: 'var(--primary-primary-100, #E7EFFE)',
    color: 'var(--primary-primary-600, #0A5CF5)',
    iconBg: 'var(--primary-primary-600, #0A5CF5)',
  },
  Secondary: {
    background: 'var(--neutrals-old-white, white)',
    color: 'var(--primary-primary-600, #0A5CF5)',
    iconBg: 'var(--primary-primary-600, #0A5CF5)',
  },
  Success: {
    background: 'var(--tag-success-background, #DCFCE7)',
    color: '#15803D',
    iconBg: '#343330',
  },
  Info: {
    background: 'var(--tag-info-background, #E0F2FE)',
    color: 'var(--tag-info-color, #0369A1)',
    iconBg: '#343330',
  },
  Warning: {
    background: 'var(--tag-warn-background, #FFEDD5)',
    color: '#C2410C',
    iconBg: '#343330',
  },
  Error: {
    background: 'var(--tag-danger-background, #FEE2E2)',
    color: 'var(--tag-danger-color, #B91C1C)',
    iconBg: '#343330',
  },
  Contrast: {
    background: 'rgba(2, 6, 23, 0.10)',
    color: 'var(--neutrals-old-Black, #090B11)',
    iconBg: '#343330',
  },
}

export default function EtiquetaBloque({ label, severity = 'Primary', showIcon = false }) {
  const cfg = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.Primary

  return (
    <div
      data-darkmode="Off"
      data-icon-={showIcon ? 'true' : 'false'}
      data-rounded="No"
      data-severity={severity}
      style={{
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3.5,
        paddingBottom: 3.5,
        background: cfg.background,
        borderRadius: 6,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 4,
        display: 'inline-flex',
      }}
    >
      {showIcon && (
        <div
          data-format="Outline"
          data-weight="Light"
          style={{ width: 16, height: 16, position: 'relative' }}
        >
          <div
            style={{
              width: 11.75,
              height: 11.75,
              left: 2.13,
              top: 2.13,
              position: 'absolute',
              background: cfg.iconBg,
            }}
          />
        </div>
      )}
      <div
        style={{
          color: cfg.color,
          fontSize: 12,
          fontFamily: 'Proeduca Sans',
          fontWeight: '500',
          lineHeight: '15.84px',
          wordWrap: 'break-word',
        }}
      >
        {label}
      </div>
    </div>
  )
}

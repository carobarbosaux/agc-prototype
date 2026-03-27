import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

const SEVERITY_CONFIG: Record<string, { background: string; color: string; iconBg: string }> = {
  Primary: {
    background: 'var(--primary-primary-100, var(--color-ai-light))',
    color: 'var(--primary-primary-600, var(--color-primary))',
    iconBg: 'var(--primary-primary-600, var(--color-primary))',
  },
  Secondary: {
    background: 'var(--neutrals-old-white, white)',
    color: 'var(--primary-primary-600, var(--color-primary))',
    iconBg: 'var(--primary-primary-600, var(--color-primary))',
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
    color: 'var(--color-amber-800)',
    iconBg: '#343330',
  },
  Error: {
    background: 'var(--tag-danger-background, #FEE2E2)',
    color: 'var(--tag-danger-color, var(--color-error))',
    iconBg: '#343330',
  },
  Contrast: {
    background: 'rgba(2, 6, 23, 0.10)',
    color: 'var(--neutrals-old-Black, #090B11)',
    iconBg: '#343330',
  },
};

@Component({
  selector: 'app-etiqueta-bloque',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [ngStyle]="{
        paddingLeft: '7px',
        paddingRight: '7px',
        paddingTop: '3.5px',
        paddingBottom: '3.5px',
        background: cfg.background,
        borderRadius: '6px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '4px',
        display: 'inline-flex'
      }"
    >
      @if (showIcon) {
        <div [ngStyle]="{ width: '16px', height: '16px', position: 'relative' }">
          <div
            [ngStyle]="{
              width: '11.75px',
              height: '11.75px',
              left: '2.13px',
              top: '2.13px',
              position: 'absolute',
              background: cfg.iconBg
            }"
          ></div>
        </div>
      }
      <div
        [ngStyle]="{
          color: cfg.color,
          fontSize: '12px',
          fontFamily: 'Proeduca Sans',
          fontWeight: '500',
          lineHeight: '15.84px',
          wordWrap: 'break-word'
        }"
      >
        {{ label }}
      </div>
    </div>
  `,
})
/**
 * @source      Figma — Prodi DS / Atoms / EtiquetaBloque
 * @type        atom
 * @tokens      --color-primary-500, --color-ai-light, --color-ai-border
 * @figma       TBD
 *
 * Small label chip used to tag content blocks with AI-suggested or manual labels.
 */
/**
 * Inline comment-gravity badge rendered inside a content block.
 *
 * Shows the count of unresolved comments with a colour-coded severity indicator
 * (crítico, importante, sugerencia, nota, alertaNormativa).
 * Clicking it opens the full comment thread in the Canvas right panel.
 */
export class EtiquetaBloqueComponent {
  @Input() label: string = '';
  @Input() severity: string = 'Primary';
  @Input() showIcon: boolean = false;

  get cfg(): { background: string; color: string; iconBg: string } {
    return SEVERITY_CONFIG[this.severity] ?? SEVERITY_CONFIG['Primary'];
  }
}

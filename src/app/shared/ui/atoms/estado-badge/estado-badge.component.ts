import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { estadoConfig } from '../../../../mock-data';

@Component({
  selector: 'app-estado-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [class]="'inline-flex items-center gap-1.5 font-medium rounded-md ' + sizeClass"
      [ngStyle]="{
        background: cfg.bg,
        color: cfg.text,
        border: '1px solid ' + cfg.border,
        fontFamily: '\\'Proeduca Sans\\', system-ui, sans-serif',
        letterSpacing: '0.01em'
      }"
    >
      <span
        class="rounded-full flex-shrink-0"
        [ngStyle]="{ width: '5px', height: '5px', background: cfg.dot }"
      ></span>
      {{ cfg.label }}
    </span>
  `,
})
/**
 * Small inline pill badge for pipeline `estado` values.
 *
 * Accepts a raw estado string (borrador, revision, comentarios, aprobado…)
 * and renders it with the appropriate background / foreground colours.
 */
/**
 * @source      Figma — Prodi DS / Atoms / EstadoBadge
 * @type        atom
 * @tokens      --color-primary, --color-warning, --color-success, --color-error, --color-surface-*
 * @figma       TBD
 *
 * Pill badge rendering a pipeline estado with colour-coded background and dot indicator.
 */
export class EstadoBadgeComponent {
  @Input() estado: string = 'porComenzar';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  private readonly allConfig: Record<string, any> = estadoConfig as any;

  private readonly sizeClasses: Record<string, string> = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  get cfg(): any {
    return this.allConfig[this.estado] ?? this.allConfig['porComenzar'];
  }

  get sizeClass(): string {
    return this.sizeClasses[this.size] ?? this.sizeClasses['md'];
  }
}

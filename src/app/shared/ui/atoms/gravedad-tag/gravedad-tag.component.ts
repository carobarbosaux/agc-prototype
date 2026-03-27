import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gravedadConfig } from '../../../../mock-data';

@Component({
  selector: 'app-gravedad-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [class]="'inline-flex items-center gap-1 font-medium rounded ' + sizeClass"
      [ngStyle]="{
        background: cfg.bg,
        color: cfg.color,
        border: '1px solid ' + cfg.border,
        fontFamily: '\\'Proeduca Sans\\', system-ui, sans-serif'
      }"
    >
      {{ cfg.label }}
    </span>
  `,
})
/**
 * @source      Figma — Prodi DS / Atoms / GravedadTag
 * @type        atom
 * @tokens      --color-error, --color-warning, --color-success, --color-text-muted
 * @figma       TBD
 *
 * Emoji + label chip indicating comment severity (crítico, importante, sugerencia, nota, alertaNormativa).
 */
/**
 * Inline tag displaying the gravity level of a comment.
 *
 * Supported values: `crítico` | `importante` | `sugerencia` | `nota` | `alertaNormativa`.
 */
export class GravedadTagComponent {
  @Input() gravedad: string = 'nota';
  @Input() size: 'sm' | 'md' = 'md';

  private readonly allConfig: Record<string, any> = gravedadConfig as any;

  private readonly sizeClasses: Record<string, string> = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
  };

  get cfg(): any {
    return this.allConfig[this.gravedad] ?? this.allConfig['nota'];
  }

  get sizeClass(): string {
    return this.sizeClasses[this.size] ?? this.sizeClasses['md'];
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhIconComponent } from '../../../../icons/ph-icon.component';

/** Visual configuration for a single content status. */
export interface StatusConfig {
  label: string;
  iconName: string;
  bg: string;
  color: string;
}

/** Mapping of canonical status keys to their badge / icon configuration. */
export const STATUS_CONFIG: Record<string, StatusConfig> = {
  sin_comenzar: { label: 'Asignado', iconName: 'Clock', bg: '#EEF2F7', color: 'var(--color-text-muted)' },
  editando: { label: 'Editando', iconName: 'Pencil', bg: 'var(--color-ai-light)', color: 'var(--color-primary)' },
  revisando: { label: 'Revisando', iconName: 'Eye', bg: '#FFF4DB', color: 'var(--color-amber-700)' },
  aprobado: { label: 'Aprobado', iconName: 'CheckCircle', bg: 'var(--color-success-bg)', color: 'var(--status-aprobado-color)' },
  bloqueado: { label: 'Bloqueado', iconName: 'Lock', bg: 'var(--color-bg-neutral-alt)', color: 'var(--color-neutral-600)' },
  en_borrador: { label: 'En borrador', iconName: 'BookmarkSimple', bg: 'var(--color-warning-bg)', color: '#C2500A' },
};

/**
 * Normalise a legacy pipeline-estado string to a canonical `STATUS_CONFIG` key.
 *
 * Legacy values (`borrador`, `revision`, `comentarios`, …) come from mock-data;
 * this mapping keeps the indicator component decoupled from those raw values.
 */
export function toStatusKey(legacy: string): string {
  const map: Record<string, string> = {
    porComenzar: 'sin_comenzar',
    sin_comenzar: 'sin_comenzar',
    bloqueado: 'bloqueado',
    borrador: 'editando',
    revision: 'revisando',
    comentarios: 'revisando',
    aprobado: 'aprobado',
    publicado: 'aprobado',
    disenado: 'aprobado',
    enBorrador: 'en_borrador',
  };
  return map[legacy] ?? 'sin_comenzar';
}

@Component({
  selector: 'app-status-indicator',
  standalone: true,
  imports: [CommonModule, PhIconComponent],
  template: `
    @if (variant === 'icon') {
      @if (noBg) {
        <ph-icon
          [name]="cfg.iconName"
          [size]="iconSize"
          [ngStyle]="{ color: cfg.color, flexShrink: 0 }"
        />
      } @else {
        <div
          [class]="'inline-flex items-center justify-center rounded-full ' + className"
          [ngStyle]="{ width: dim + 'px', height: dim + 'px', background: cfg.bg, color: cfg.color }"
        >
          <ph-icon [name]="cfg.iconName" [size]="iconSize" />
        </div>
      }
    } @else {
      <div
        [class]="'inline-flex items-center ' + className"
        [ngStyle]="{
          paddingLeft: '7px',
          paddingRight: '7px',
          paddingTop: '3.5px',
          paddingBottom: '3.5px',
          background: cfg.bg,
          borderRadius: '6px',
          gap: '4px'
        }"
      >
        <ph-icon [name]="cfg.iconName" [size]="11" [ngStyle]="{ color: cfg.color, flexShrink: 0 }" />
        <div
          [ngStyle]="{
            color: cfg.color,
            fontSize: '12px',
            fontFamily: 'Proeduca Sans',
            fontWeight: '500',
            lineHeight: '15.84px'
          }"
        >
          {{ cfg.label }}
        </div>
      </div>
    }
  `,
})
/**
 * @source      Figma — Prodi DS / Atoms / StatusBadge
 * @type        atom
 * @tokens      --status-*-bg, --status-*-color (via STATUS_CONFIG)
 * @figma       TBD
 *
 * Renders a content-status as either a pill badge (variant=badge) or circular icon (variant=icon).
 */
/**
 * Renders a content-status as either a pill badge (`variant='badge'`)
 * or a circular icon (`variant='icon'`).
 *
 * Use {@link toStatusKey} to convert raw pipeline estados before passing
 * the `status` input.
 */
export class StatusIndicatorComponent {
  /** Canonical status key from {@link STATUS_CONFIG}. */
  @Input() status: string = 'sin_comenzar';
  /** `'badge'` renders a labelled pill; `'icon'` renders only the status icon. */
  @Input() variant: 'badge' | 'icon' = 'badge';
  /** Controls icon container dimensions (sm = 20 px, md = 28 px). */
  @Input() size: 'sm' | 'md' = 'md';
  /** When `true` on `variant='icon'`, renders the icon without the circular background. */
  @Input() noBg: boolean = false;
  @Input() className: string = '';

  get cfg(): StatusConfig {
    return STATUS_CONFIG[this.status] ?? STATUS_CONFIG['sin_comenzar'];
  }

  get dim(): number {
    return this.size === 'sm' ? 20 : 28;
  }

  get iconSize(): number {
    return this.size === 'sm' ? 10 : 13;
  }
}

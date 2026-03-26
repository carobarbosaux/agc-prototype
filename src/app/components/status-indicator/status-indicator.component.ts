import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhIconComponent } from '../../icons/ph-icon.component';

export interface StatusConfig {
  label: string;
  iconName: string;
  bg: string;
  color: string;
}

export const STATUS_CONFIG: Record<string, StatusConfig> = {
  sin_comenzar: { label: 'Asignado', iconName: 'Clock', bg: '#EEF2F7', color: '#64748B' },
  editando: { label: 'Editando', iconName: 'Pencil', bg: '#EAF2FF', color: '#0A5CF5' },
  revisando: { label: 'Revisando', iconName: 'Eye', bg: '#FFF4DB', color: '#C88700' },
  aprobado: { label: 'Aprobado', iconName: 'CheckCircle', bg: '#EAF8EF', color: '#1F8F4C' },
  bloqueado: { label: 'Bloqueado', iconName: 'Lock', bg: '#F3F4F6', color: '#4B5563' },
  en_borrador: { label: 'En borrador', iconName: 'BookmarkSimple', bg: '#FFF7ED', color: '#C2500A' },
};

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
export class StatusIndicatorComponent {
  @Input() status: string = 'sin_comenzar';
  @Input() variant: 'badge' | 'icon' = 'badge';
  @Input() size: 'sm' | 'md' = 'md';
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

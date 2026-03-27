import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhIconComponent } from '../../../../icons/ph-icon.component';
import { misPendientes, gravedadConfig } from '../../../../mock-data';

const GRAVEDAD_ICON: Record<string, string> = {
  critico: 'Warning',
  importante: 'Warning',
  sugerencia: 'Lightbulb',
  nota: 'Info',
  alertaNormativa: 'ShieldWarning',
};

@Component({
  selector: 'app-panel-mis-pendientes',
  standalone: true,
  imports: [CommonModule, PhIconComponent],
  template: `
    <div class="flex flex-col gap-1">
      @for (item of pendientes; track item.id) {
        <div
          class="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all"
          [ngStyle]="{
            background: hoveredItem === item.id ? 'var(--color-surface-100)' : 'transparent',
            opacity: item.activo ? 1 : 0.6
          }"
          (mouseenter)="hoveredItem = item.id"
          (mouseleave)="hoveredItem = null"
          (click)="handleClick(item)"
        >
          <!-- Gravedad icon -->
          <div
            class="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            [ngStyle]="{
              background: getGravedadBg(item.gravedad),
              color: getGravedadColor(item.gravedad)
            }"
          >
            <ph-icon [name]="getGravedadIcon(item.gravedad)" [size]="13" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium text-slate-700 truncate"
              [ngStyle]="{ fontFamily: '\\'Proeduca Sans\\', system-ui, sans-serif' }"
            >
              {{ item.titulo }}
            </p>
            <p class="text-xs text-slate-500 mt-0.5 truncate">
              {{ item.asignatura }} · {{ item.seccion }}
            </p>
            <p class="text-xs text-slate-400 mt-0.5">{{ item.tiempo }}</p>
          </div>

          <!-- Arrow -->
          @if (item.activo) {
            <ph-icon name="ArrowRight" [size]="14" class="text-slate-400 flex-shrink-0 mt-1" />
          }
        </div>
      }

      @if (pendientes.length === 0) {
        <div class="text-sm text-slate-500 text-center py-6">
          No tienes pendientes activos.
        </div>
      }
    </div>
  `,
})
/**
 * @source      Figma — Prodi DS / Molecules / PanelMisPendientes
 * @type        molecule
 * @composedOf  GravedadTag (atom), PhIconComponent
 * @tokens      --color-primary, --color-error, --color-border, --color-text-muted
 * @figma       TBD
 *
 * Sidebar panel listing pending tasks for the current user with priority and deadline indicators.
 */
/**
 * Sidebar panel listing the current user's pending review items.
 *
 * Items are grouped by type (secciones, comentarios, aprobaciones) and
 * link back to the relevant Canvas section via the AppStateService navigator.
 */
export class PanelMisPendientesComponent {
  @Input() rolActivo: string = 'autor';
  @Output() onNavigate = new EventEmitter<{ destino: string; params?: any }>();

  readonly pendientes = misPendientes;
  private readonly gc: Record<string, any> = gravedadConfig as any;

  hoveredItem: string | null = null;

  getGravedadIcon(gravedad: string): string {
    return GRAVEDAD_ICON[gravedad] ?? 'Info';
  }

  getGravedadBg(gravedad: string): string {
    return this.gc[gravedad]?.bg ?? 'var(--color-bg)';
  }

  getGravedadColor(gravedad: string): string {
    return this.gc[gravedad]?.color ?? 'var(--color-text-muted)';
  }

  handleClick(item: any): void {
    if (!item.activo || !item.canvasDestino) return;
    this.onNavigate.emit({ destino: 'canvas', params: { seccion: item.canvasDestino } });
  }
}

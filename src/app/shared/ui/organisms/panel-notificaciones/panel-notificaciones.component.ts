import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhIconComponent } from '../../../../icons/ph-icon.component';
import { notificaciones } from '../../../../mock-data';

type FilterTab = 'todas' | 'accion' | 'info';

interface Notificacion {
  id: string;
  tipo: string;
  asignatura: string;
  seccion: string;
  mensaje: string;
  tiempo: string;
  accionRequerida: boolean;
  link: string;
}

const TIPO_ICON: Record<string, string> = {
  comentarios: 'ChatCircle',
  aprobado: 'CheckCircle',
  info: 'Info',
  revision: 'Eye',
  bloqueado: 'Lock',
};

const TIPO_COLOR: Record<string, string> = {
  comentarios: '#F97316',
  aprobado: 'var(--color-green-700)',
  info: 'var(--color-primary-500)',
  revision: 'var(--color-amber-700)',
  bloqueado: 'var(--color-text-muted)',
};

const TIPO_BG: Record<string, string> = {
  comentarios: 'var(--color-warning-bg)',
  aprobado: 'var(--color-success-bg)',
  info: 'var(--color-ai-light)',
  revision: '#FFF4DB',
  bloqueado: 'var(--color-bg-neutral-alt)',
};

@Component({
  selector: 'app-panel-notificaciones',
  standalone: true,
  imports: [CommonModule, PhIconComponent],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-50"
      [ngStyle]="{ background: 'rgba(0,0,0,0.2)' }"
      (click)="onClose.emit()"
    ></div>

    <!-- Panel -->
    <div
      class="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
      [ngStyle]="{
        width: '380px',
        background: 'var(--color-surface)',
        borderLeft: '1px solid var(--color-border)',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.08)'
      }"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between px-5 py-4 flex-shrink-0"
        [ngStyle]="{ borderBottom: '1px solid var(--color-surface-100)' }"
      >
        <div class="flex items-center gap-2">
          <ph-icon name="Bell" [size]="18" [ngStyle]="{ color: 'var(--color-primary)' }" />
          <span
            class="font-semibold text-slate-800"
            [ngStyle]="{ fontFamily: '\\'Proeduca Sans\\', system-ui, sans-serif', fontSize: '15px' }"
          >
            Notificaciones
          </span>
          @if (unreadCount > 0) {
            <span
              class="text-xs font-bold text-white px-1.5 py-0.5 rounded-full"
              [ngStyle]="{ background: 'var(--color-primary)', minWidth: '20px', textAlign: 'center' }"
            >
              {{ unreadCount }}
            </span>
          }
        </div>
        <button
          class="p-1.5 rounded-lg text-slate-500 transition-colors"
          [ngStyle]="closeHovered ? { background: 'var(--color-surface-100)', color: 'var(--color-text)' } : {}"
          (click)="onClose.emit()"
          (mouseenter)="closeHovered = true"
          (mouseleave)="closeHovered = false"
        >
          <ph-icon name="X" [size]="18" />
        </button>
      </div>

      <!-- Filter tabs -->
      <div
        class="flex items-center gap-1 px-4 py-3 flex-shrink-0"
        [ngStyle]="{ borderBottom: '1px solid var(--color-surface-100)' }"
      >
        @for (tab of tabs; track tab.id) {
          <button
            class="text-xs font-medium px-3 py-1.5 rounded-full transition-all"
            [ngStyle]="activeTab === tab.id
              ? { background: 'var(--color-primary)', color: 'var(--color-surface)' }
              : { background: 'var(--color-surface-100)', color: 'var(--color-text-muted)' }"
            (click)="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        }
      </div>

      <!-- Scrollable list grouped by asignatura -->
      <div class="flex-1 overflow-y-auto px-4 py-3">
        @for (group of groupedNotificaciones; track group.asignatura) {
          <div class="mb-4">
            <!-- Group header -->
            <p
              class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 px-1"
              [ngStyle]="{ fontFamily: '\\'Proeduca Sans\\', system-ui, sans-serif', letterSpacing: '0.06em' }"
            >
              {{ group.asignatura }}
            </p>

            <!-- Notifications in group -->
            @for (n of group.items; track n.id) {
              <div
                class="flex items-start gap-3 px-3 py-3 rounded-xl mb-1.5 cursor-pointer transition-all"
                [ngStyle]="{
                  background: hoveredItem === n.id ? 'var(--color-bg)' : 'transparent',
                  border: '1px solid ' + (hoveredItem === n.id ? 'var(--color-border)' : 'transparent')
                }"
                (mouseenter)="hoveredItem = n.id"
                (mouseleave)="hoveredItem = null"
                (click)="handleNotifClick(n)"
              >
                <!-- Icon -->
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  [ngStyle]="{
                    background: getTipoBg(n.tipo),
                    color: getTipoColor(n.tipo)
                  }"
                >
                  <ph-icon [name]="getTipoIcon(n.tipo)" [size]="14" />
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-semibold text-slate-500 mb-0.5">{{ n.seccion }}</p>
                  <p class="text-sm text-slate-700 leading-snug">{{ n.mensaje }}</p>
                  <p class="text-xs text-slate-400 mt-1">{{ n.tiempo }}</p>
                </div>

                <!-- Action required dot -->
                @if (n.accionRequerida) {
                  <div
                    class="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                    [ngStyle]="{ background: 'var(--color-primary)' }"
                  ></div>
                }
              </div>
            }
          </div>
        }

        @if (groupedNotificaciones.length === 0) {
          <div class="text-sm text-slate-500 text-center py-10">
            No hay notificaciones.
          </div>
        }
      </div>
    </div>
  `,
})
/**
 * @source      Figma — Prodi DS / Organisms / PanelNotificaciones
 * @type        organism
 * @composedOf  PhIconComponent
 * @tokens      --color-primary, --color-warning, --color-border, --color-text-muted
 * @figma       TBD
 *
 * Dropdown notification centre listing unread system and review alerts.
 */
/**
 * Sliding notifications drawer.
 *
 * Aggregates all system notifications, groups them by date, and allows
 * filtering by type (comentarios, aprobaciones, alertas…).
 * Navigates directly to the relevant Canvas section on item click.
 */
export class PanelNotificacionesComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Output() onNavigate = new EventEmitter<{ destino: string; params?: any }>();

  activeTab: FilterTab = 'todas';
  hoveredItem: string | null = null;
  closeHovered: boolean = false;

  readonly tabs: { id: FilterTab; label: string }[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'accion', label: 'Acción requerida' },
    { id: 'info', label: 'Informativas' },
  ];

  private readonly allNotificaciones: Notificacion[] = notificaciones as Notificacion[];

  ngOnInit(): void {}

  get filteredNotificaciones(): Notificacion[] {
    if (this.activeTab === 'accion') {
      return this.allNotificaciones.filter((n) => n.accionRequerida);
    }
    if (this.activeTab === 'info') {
      return this.allNotificaciones.filter((n) => !n.accionRequerida);
    }
    return this.allNotificaciones;
  }

  get groupedNotificaciones(): { asignatura: string; items: Notificacion[] }[] {
    const map = new Map<string, Notificacion[]>();
    for (const n of this.filteredNotificaciones) {
      if (!map.has(n.asignatura)) {
        map.set(n.asignatura, []);
      }
      map.get(n.asignatura)!.push(n);
    }
    return Array.from(map.entries()).map(([asignatura, items]) => ({ asignatura, items }));
  }

  get unreadCount(): number {
    return this.allNotificaciones.filter((n) => n.accionRequerida).length;
  }

  getTipoIcon(tipo: string): string {
    return TIPO_ICON[tipo] ?? 'Bell';
  }

  getTipoColor(tipo: string): string {
    return TIPO_COLOR[tipo] ?? 'var(--color-text-muted)';
  }

  getTipoBg(tipo: string): string {
    return TIPO_BG[tipo] ?? 'var(--color-surface-100)';
  }

  handleNotifClick(n: Notificacion): void {
    if (n.link) {
      this.onNavigate.emit({ destino: n.link });
    }
    this.onClose.emit();
  }
}

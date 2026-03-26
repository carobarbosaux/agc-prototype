import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';
import {
  tagsFiltrablesDashboard,
  coordinatorTrackingData,
  shortcutsDashboard,
} from '../../mock-data';
import { toStatusKey } from '../../components/status-indicator/status-indicator.component';
import { PhIconComponent } from '../../icons/ph-icon.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { StatusIndicatorComponent } from '../../components/status-indicator/status-indicator.component';
import { CalidadContenidosCardsComponent } from '../../components/calidad-contenidos-cards/calidad-contenidos-cards.component';
import { PanelMisPendientesComponent } from '../../components/panel-mis-pendientes/panel-mis-pendientes.component';
import { ChatbarComponent } from '../../components/chatbar/chatbar.component';

const TODAY_TRACKING = new Date('2026-03-05');

/** Calculate how many full days have elapsed since `date` relative to `TODAY_TRACKING`. */
function calcDaysOld(date: string): number {
  return Math.floor((TODAY_TRACKING.getTime() - new Date(date).getTime()) / 86400000);
}
/** Return the obsolescence percentage (0–100+) for `days` old content with a `years`-year cycle. */
function calcObsPct(days: number, years: number): number {
  return Math.round((days / (years * 365)) * 1000) / 10;
}
/** Map an obsolescence percentage to a tracking-status key. */
function calcStatus(pct: number): string {
  return pct <= 60 ? 'healthy' : pct <= 90 ? 'approaching' : pct <= 100 ? 'critical' : 'overdue';
}

/** Visual configuration for content-obsolescence tracking statuses. */
export const TRACKING_STATUS_CONFIG: Record<string, any> = {
  healthy:    { label: 'Saludable',  bg: '#DCFCE7', color: '#16A34A', border: '#BBF7D0', dot: '#16A34A', icon: 'CheckCircle' },
  approaching:{ label: 'Próximo',    bg: '#FFFBEB', color: '#D97706', border: '#FDE68A', dot: '#D97706', icon: 'Clock' },
  critical:   { label: 'Crítico',    bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', dot: '#DC2626', icon: 'Warning' },
  overdue:    { label: 'Caducado',   bg: '#F5F3FF', color: '#7C3AED', border: '#DDD6FE', dot: '#7C3AED', icon: 'XCircle' },
};

/** Label and accent colour for each alarm type shown in the coordinator view. */
export const ALARM_CONFIG: Record<string, any> = {
  'version-mismatch':         { label: 'Desajuste de versión',     color: '#D97706' },
  'approaching-obsolescence': { label: 'Obsolescencia próxima',    color: '#D97706' },
  'critical-obsolescence':    { label: 'Obsolescencia crítica',    color: '#DC2626' },
  'expired-content':          { label: 'Contenido caducado',       color: '#7C3AED' },
  'pending-update':           { label: 'Actualización pendiente',  color: '#367CFF' },
};

/** Human-readable label for each campus / filial code. */
export const FILIAL_LABELS: Record<string, string> = {
  espana: 'España', colombia: 'Colombia', mexico: 'México', ecuador: 'Ecuador',
};

/** Badge style for each obsolescence level. */
export const OBSOLESCENCIA_CONFIG: Record<string, any> = {
  ok:              { label: 'OK',               bg: '#DCFCE7', color: '#16A34A', border: '#BBF7D0' },
  requiereRevision:{ label: 'Requiere revisión', bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
  mantenimiento:   { label: 'Mantenimiento',     bg: '#FFF7ED', color: '#EA580C', border: '#FED7AA' },
  obsoleta:        { label: 'Obsoleta',          bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
};

/** Badge style for designer-role section statuses. */
export const ESTADO_DISENADOR_CONFIG: Record<string, any> = {
  aprobado:    { label: 'Disponible',    bg: '#F0FDF4', color: '#10B981', border: '#A7F3D0' },
  disenado:    { label: 'Diseñado',      bg: '#F5F3FF', color: '#7C3AED', border: '#DDD6FE' },
  porComenzar: { label: 'No disponible', bg: '#F8FAFC', color: '#64748B', border: '#E2E8F0' },
};

const ROL_LABEL: Record<string, string> = {
  autor: 'Autor',
  coordinador: 'Coordinador',
  editor: 'Editor',
  disenador: 'Diseñador',
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PhIconComponent,
    TopbarComponent,
    StatusIndicatorComponent,
    CalidadContenidosCardsComponent,
    PanelMisPendientesComponent,
    ChatbarComponent,
  ],
  templateUrl: './dashboard.component.html',
})
/**
 * Content-tracking dashboard screen.
 *
 * Renders different table layouts depending on the active role:
 * - **Autor** / **Editor**: personal assignments list with pipeline-estado badges.
 * - **Coordinador**: full asignatura grid with obsolescence tracking and alarm column;
 *   includes a secondary "Seguimiento" tab with quality cards and IA chat.
 * - **Diseñador**: design-status view.
 *
 * All filtering (status, tag, filial) is handled locally via signals; no server calls.
 */
export class DashboardComponent {
  readonly state = inject(AppStateService);

  // ── Signals ──────────────────────────────────────────────────
  readonly statusFilter = signal<string>('todos');
  readonly selectedId = signal<string>('');
  readonly titulacionSeleccionada = signal<string>('master-ia');
  readonly filtroTag = signal<string>('todos');
  readonly filtroFilial = signal<string>('');
  readonly dashTab = signal<string>('mis-asignaturas');

  // ── Constants ────────────────────────────────────────────────
  readonly HDR_STYLE = {
    padding: '10px 16px',
    background: '#E6EFFF',
    borderBottom: '1px solid #DCDFEB',
    display: 'flex',
    alignItems: 'center',
  };
  readonly CELL_STYLE = {
    padding: '12px 16px',
    borderBottom: '1px solid #F1F5F9',
    display: 'flex',
    alignItems: 'center',
    minWidth: '0',
  };
  readonly hdrtxt = {
    color: '#3A455C',
    fontSize: '12px',
    fontFamily: "'Proeduca Sans', system-ui, sans-serif",
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
  };
  readonly txtstyle = {
    color: '#334155',
    fontSize: '13px',
    fontFamily: "'Proeduca Sans', system-ui, sans-serif",
    fontWeight: '500',
    lineHeight: '20px',
  };

  // ── Static data ──────────────────────────────────────────────
  readonly tagsFiltrables = tagsFiltrablesDashboard;
  readonly trackingStatusEntries = Object.entries(TRACKING_STATUS_CONFIG);
  readonly toStatusKey = toStatusKey;

  // ── Derived ──────────────────────────────────────────────────
  readonly esCoordinador = computed(() => {
    const r = this.state.rolActivo();
    return r === 'coordinador' || r === 'editor';
  });
  readonly esDisenador = computed(() => this.state.rolActivo() === 'disenador');

  readonly subtitulo = computed(() => {
    const map: Record<string, string> = {
      autor: 'Tu trabajo como autor en todas las titulaciones asignadas',
      coordinador: 'Seguimiento completo de asignaturas por titulación, filial y estado',
      editor: 'Asignaturas con revisiones activas',
      disenador: 'Asignaturas disponibles para enriquecimiento',
    };
    return map[this.state.rolActivo()] ?? '';
  });

  readonly chatbarPlaceholder = computed(() => {
    const map: Record<string, string> = {
      autor: 'Pregunta qué necesitas o usa /mis-pendientes…',
      coordinador: 'Pregunta qué necesitas o usa /nueva-asignatura…',
      editor: 'Pregunta qué necesitas o usa /mis-pendientes…',
      disenador: '¿En qué puedo ayudarte?',
    };
    return map[this.state.rolActivo()] ?? 'Pregunta qué necesitas…';
  });

  readonly dashShortcuts = computed(() =>
    (shortcutsDashboard as any[]).filter((s: any) => s.roles.includes(this.state.rolActivo()))
  );

  readonly breadcrumb = computed(() => this.state.getBreadcrumb('dashboard'));

  // ── Titulacion actual ─────────────────────────────────────────
  readonly titulacionActual = computed(() =>
    this.state.titulaciones().find((t: any) => t.id === this.titulacionSeleccionada())
  );

  // ── Tabla Autor computed ──────────────────────────────────────
  readonly asignaturasAutor = computed(() => {
    const tit = this.titulacionActual();
    let asigs: any[] = tit?.asignaturas || [];
    const tag = this.filtroTag();
    const rol = this.state.rolActivo();
    if (tag && tag !== 'todos') {
      if (tag === 'pendientes') {
        asigs = asigs.filter((a: any) => {
          const pd = typeof a.pendienteDe === 'object' ? a.pendienteDe[rol] : a.pendienteDe;
          return pd === 'tú';
        });
      } else {
        asigs = asigs.filter((a: any) => a.estado === tag);
      }
    }
    return asigs;
  });

  // ── Tabla Coordinador computed ───────────────────────────────
  readonly asignaturasCoord = computed(() => {
    const tit = this.titulacionActual();
    let asigs: any[] = tit?.asignaturas || [];
    const tag = this.filtroTag();
    const rol = this.state.rolActivo();
    if (tag && tag !== 'todos') {
      if (tag === 'pendientes') {
        asigs = asigs.filter((a: any) => {
          const pd = typeof a.pendienteDe === 'object' ? a.pendienteDe[rol] : a.pendienteDe;
          return pd === 'tú';
        });
      } else {
        asigs = asigs.filter((a: any) => a.estado === tag);
      }
    }
    const filial = this.filtroFilial();
    if (filial) {
      asigs = asigs.filter((a: any) => a.filial === filial);
    }
    return asigs;
  });

  readonly filialesDisponibles = computed(() => {
    const tit = this.titulacionActual();
    const all: string[] = (tit?.asignaturas || []).map((a: any) => a.filial).filter(Boolean);
    return [...new Set(all)] as string[];
  });

  // ── Tabla Diseñador computed ─────────────────────────────────
  readonly asignaturasDisenador = computed(() => {
    const tit = this.titulacionActual();
    return (tit?.asignaturas || []).filter((a: any) => a.disenadorEstado);
  });

  // ── Tracking computed ─────────────────────────────────────────
  readonly enrichedTracking = computed(() =>
    (coordinatorTrackingData as any[]).map((s: any) => {
      const daysOld = calcDaysOld(s.lastVersionDate);
      const pct = calcObsPct(daysOld, s.obsolescenceCycleYears);
      const status = calcStatus(pct);
      return { ...s, daysOld, pct, status };
    })
  );

  readonly trackingCounts = computed(() => {
    const e = this.enrichedTracking();
    return {
      healthy:    e.filter((s: any) => s.status === 'healthy').length,
      approaching:e.filter((s: any) => s.status === 'approaching').length,
      critical:   e.filter((s: any) => s.status === 'critical').length,
      overdue:    e.filter((s: any) => s.status === 'overdue').length,
    };
  });

  readonly filteredTracking = computed(() => {
    const sf = this.statusFilter();
    const e = this.enrichedTracking();
    return sf && sf !== 'todos' ? e.filter((s: any) => s.status === sf) : e;
  });

  readonly selectedTracking = computed(() =>
    this.enrichedTracking().find((s: any) => s.id === this.selectedId())
  );

  // ── Helpers ───────────────────────────────────────────────────
  getPendienteDisplay(asig: any): string {
    const rol = this.state.rolActivo();
    const raw = typeof asig.pendienteDe === 'object'
      ? (asig.pendienteDe[rol] || '—')
      : asig.pendienteDe;
    return raw === 'tú' ? (ROL_LABEL[rol] || raw) : raw;
  }

  isPendientePropio(asig: any): boolean {
    const rol = this.state.rolActivo();
    const raw = typeof asig.pendienteDe === 'object'
      ? asig.pendienteDe[rol]
      : asig.pendienteDe;
    return raw === 'tú';
  }

  getObsConfig(key: string): any {
    return OBSOLESCENCIA_CONFIG[key] || OBSOLESCENCIA_CONFIG['ok'];
  }

  getDisenadorEstado(key: string): any {
    return ESTADO_DISENADOR_CONFIG[key] || ESTADO_DISENADOR_CONFIG['porComenzar'];
  }

  getTrackingStatusCfg(status: string): any {
    return TRACKING_STATUS_CONFIG[status] || TRACKING_STATUS_CONFIG['healthy'];
  }

  getAlarmCfg(key: string): any {
    return ALARM_CONFIG[key];
  }

  getFilialLabel(key: string): string {
    return FILIAL_LABELS[key] || key;
  }

  getTrackingEntries(obj: Record<string, any>): [string, any][] {
    return Object.entries(obj);
  }

  getTrackingCountForKey(key: string): number {
    return (this.trackingCounts() as any)[key] ?? 0;
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  barWidth(pct: number): number {
    return Math.min(pct, 100);
  }

  barColor(status: string): string {
    const map: Record<string, string> = {
      healthy: '#16A34A', approaching: '#D97706', critical: '#DC2626', overdue: '#7C3AED',
    };
    return map[status] || '#16A34A';
  }

  daysRemaining(item: any): number {
    return Math.max(0, item.obsolescenceCycleYears * 365 - item.daysOld);
  }

  // ── Event handlers ────────────────────────────────────────────
  onRowHover(el: EventTarget | null, enter: boolean, clickable: boolean): void {
    if (!clickable || !el) return;
    (el as HTMLElement).style.background = enter ? '#F4F6FD' : '';
  }

  onDetailHover(el: EventTarget | null, enter: boolean): void {
    if (!el) return;
    (el as HTMLElement).style.background = enter ? '#E5E7EB' : 'transparent';
  }

  onBtnHover(el: EventTarget | null, enter: boolean, onColor: string, offColor: string): void {
    if (!el) return;
    (el as HTMLElement).style.background = enter ? onColor : offColor;
  }

  onSidebarHover(el: EventTarget | null, enter: boolean, selected: boolean, navegable: boolean): void {
    if (!el) return;
    if (!selected && navegable) {
      (el as HTMLElement).style.background = enter ? '#F4F6FD' : 'transparent';
    }
  }

  onTrackingRowHover(el: EventTarget | null, enter: boolean, isSelected: boolean): void {
    if (!el) return;
    if (!isSelected) {
      (el as HTMLElement).style.background = enter ? '#F4F6FD' : '';
    }
  }

  navigateToCanvas(asig: any): void {
    if (!asig.activa) return;
    if (asig.crearAsignatura) {
      this.state.navigate('crearAsignatura');
    } else {
      this.state.navigate('canvas', { seccion: 't2', titulacionId: 'master-ia', asignaturaId: asig.id });
    }
  }

  navigateToCanvasDis(asig: any): void {
    if (asig.disenadorEstado === 'aprobado' && asig.activa) {
      this.state.navigate('canvas', { seccion: 't1', titulacionId: 'master-ia', asignaturaId: asig.id });
    }
  }

  toggleTrackingSelected(id: string): void {
    this.selectedId.set(this.selectedId() === id ? '' : id);
  }

  toggleStatusFilter(key: string): void {
    this.statusFilter.set(this.statusFilter() === key ? 'todos' : key);
  }

  onShortcutAction(accion: string): void {
    if (accion === 'filtrarPendientes') this.filtroTag.set('pendientes');
    if (accion === 'filtrarAlertas') this.filtroTag.set('comentarios');
    if (accion === 'filtrarRevision') this.filtroTag.set('revision');
    if (accion === 'seguimiento') this.dashTab.set('seguimiento-calidad');
  }

  onCalidadCardClick(id: string): void {
    const map: Record<string, string> = {
      alertas: 'comentarios', revision: 'revision', ise: 'todos', critico: 'comentarios',
    };
    this.filtroTag.set(map[id] ?? 'todos');
  }

  onPendientesNavigate(event: { destino: string; params?: any }): void {
    this.state.navigate(event.destino, event.params);
  }

  onChatHistorialChange(h: any[]): void {
    this.state.chatHistorial.set(h);
  }
}

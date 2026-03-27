import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhIconComponent } from '../../../../icons/ph-icon.component';
import { StatusIndicatorComponent, toStatusKey } from '../../atoms/status-indicator/status-indicator.component';
import { TooltipComponent } from '../../atoms/tooltip/tooltip.component';
import { pipeline } from '../../../../mock-data';

const ESTADO_CLICKABLE = ['aprobado', 'borrador', 'revision', 'comentarios', 'sin_comenzar'];

@Component({
  selector: 'app-pipeline-sidebar',
  standalone: true,
  imports: [CommonModule, PhIconComponent, StatusIndicatorComponent, TooltipComponent],
  templateUrl: './pipeline-sidebar.component.html',
})
/**
 * @source      Figma — Prodi DS / Organisms / PipelineSidebar
 * @type        organism
 * @composedOf  StatusIndicatorComponent (atom), TooltipComponent (atom), PhIconComponent
 * @tokens      --pipeline-item-bg, --pipeline-item-border, --pipeline-item-active-bg, --pipeline-item-active-border
 * @figma       TBD
 *
 * Left-rail navigation for Canvas showing all pipeline sections with status indicators.
 */
export class PipelineSidebarComponent implements OnDestroy {
  @Input() seccionActiva: any = null;
  @Input() creacionData: any = null;
  @Input() esAsignaturaNueva: any = false;
  @Input() estadosSeccion: any = null;

  @Output() seccionChange = new EventEmitter<string>();

  readonly pipeline = pipeline;
  readonly toStatusKey = toStatusKey;

  temasExpandidos = signal<Record<string, boolean>>({ 'tema-1': true, 'tema-2': true });
  collapsed = signal(false);
  popoverAbierto = signal<string | null>(null);

  /** Map of temaId → info button element (for popover dismiss detection) */
  infoRefs: Map<string, HTMLElement> = new Map();

  // ── Helpers ──────────────────────────────────────────────────────────

  get temaDescMap(): Record<number, any> | null {
    const temas = this.creacionData?.resumen?.temasConDescripcion;
    if (!temas) return null;
    return Object.fromEntries(temas.map((t: any, i: number) => [i + 1, t]));
  }

  getEstado(secId: string, staticEstado: string): string {
    if (this.estadosSeccion?.[secId] !== undefined) return this.estadosSeccion[secId];
    if (!this.esAsignaturaNueva) return staticEstado;
    return 'sin_comenzar';
  }

  isClickable(estado: string): boolean {
    return ESTADO_CLICKABLE.includes(estado);
  }

  isTemaActive(etapa: any): boolean {
    return !!(this.seccionActiva && etapa.secciones && etapa.secciones.some((s: any) => s.id === this.seccionActiva));
  }

  toggleTema(id: string): void {
    this.temasExpandidos.update(prev => ({ ...prev, [id]: !prev[id] }));
  }

  handleClick(id: string, estado: string): void {
    if (!ESTADO_CLICKABLE.includes(estado)) return;
    this.seccionChange.emit(id);
  }

  getTemaEstado(etapa: any): string {
    const secEstados = etapa.secciones.map((s: any) => this.getEstado(s.id, s.estado));
    if (secEstados.some((e: string) => e === 'comentarios')) return 'comentarios';
    if (secEstados.some((e: string) => e === 'revision')) return 'revision';
    if (secEstados.some((e: string) => e === 'borrador')) return 'borrador';
    if (secEstados.every((e: string) => e === 'aprobado')) return 'aprobado';
    if (secEstados.every((e: string) => e === 'sin_comenzar')) return 'sin_comenzar';
    return 'bloqueado';
  }

  getTemaDesc(etapa: any): any | null {
    const temaNum = parseInt(etapa.id.split('-')[1], 10);
    return this.temaDescMap?.[temaNum] ?? null;
  }

  togglePopover(etapa: any, event: Event): void {
    event.stopPropagation();
    const current = this.popoverAbierto();
    this.popoverAbierto.set(current === etapa.id ? null : etapa.id);
  }

  closePopover(): void {
    this.popoverAbierto.set(null);
  }

  setInfoRef(temaId: string, el: HTMLElement | null): void {
    if (el) {
      this.infoRefs.set(temaId, el);
    } else {
      this.infoRefs.delete(temaId);
    }
  }

  // ── Progress ─────────────────────────────────────────────────────────

  get allSecciones(): any[] {
    return this.pipeline.flatMap((e: any) => e.tipo === 'tema' ? e.secciones : [e]);
  }

  get aprobadas(): number {
    return this.allSecciones.filter(s => this.getEstado(s.id, s.estado) === 'aprobado').length;
  }

  get total(): number {
    return this.allSecciones.length;
  }

  get pct(): number {
    return Math.round((this.aprobadas / this.total) * 100);
  }

  // ── Popover dismiss on outside click ─────────────────────────────────

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    if (!this.popoverAbierto()) return;
    const target = event.target as Node;

    // Check if click is inside any info button
    for (const [, el] of this.infoRefs) {
      if (el.contains(target)) return;
    }

    // Check if click is inside the popover itself
    const popoverEl = document.querySelector('.pipeline-popover');
    if (popoverEl?.contains(target)) return;

    this.popoverAbierto.set(null);
  }

  ngOnDestroy(): void {
    // HostListener cleans itself up automatically
  }
}

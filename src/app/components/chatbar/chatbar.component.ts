import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  signal,
  inject,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhIconComponent } from '../../icons/ph-icon.component';
import { ProdiMarkComponent } from '../prodi-logo/prodi-logo.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { shortcutsComandos, respuestasIAChatbar } from '../../mock-data';
import { AppStateService } from '../../services/app-state.service';

const SUGERENCIAS: Record<string, string[]> = {
  teams:      ['Resumir comentarios del coordinador', 'Identificar cambios solicitados'],
  sharepoint: ['Buscar documentación relevante', 'Extraer conceptos clave', 'Verificar alineación con guías'],
  outlook:    ['Extraer correcciones', 'Detectar puntos críticos'],
  onedrive:   ['Buscar archivos relacionados', 'Reutilizar contenido previo', 'Resumir documentos', 'Detectar inconsistencias'],
  canva:      ['Proponer estructura visual', 'Simplificar contenido'],
  genially:   ['Crear actividad interactiva', 'Proponer experiencia dinámica'],
};

const CK_CHILDREN_IDS = ['teams', 'sharepoint', 'outlook', 'onedrive'];

export interface ConectorItem {
  id: string;
  letter: string;
  color: string;
  label: string;
  desc?: string;
  size?: number;
}

export const ALL_CONECTORES: ConectorItem[] = [
  { id: 'teams',      letter: 'T',  color: '#6264A7', label: 'Teams',      desc: 'Conversaciones y archivos' },
  { id: 'sharepoint', letter: 'SP', color: '#0078D4', label: 'SharePoint', desc: 'Documentos institucionales' },
  { id: 'outlook',    letter: 'OL', color: '#0078D4', label: 'Outlook',    desc: 'Correos y adjuntos' },
  { id: 'onedrive',   letter: 'OD', color: '#0078D4', label: 'OneDrive',   desc: 'Archivos personales' },
  { id: 'canva',      letter: 'CA', color: '#7C3AED', label: 'Canva',      desc: 'Diseños y recursos visuales', size: 20 },
  { id: 'genially',   letter: 'GE', color: '#F97316', label: 'Genially',   desc: 'Contenidos interactivos',    size: 20 },
];

@Component({
  selector: 'app-chatbar',
  standalone: true,
  imports: [CommonModule, FormsModule, PhIconComponent, ProdiMarkComponent],
  templateUrl: './chatbar.component.html',
})
export class ChatbarComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() placeholder: string = 'Mensaje';
  @Input() chatHistorial: any[] = [];
  @Input() shortcuts: any[] | null = null;
  @Input() onShortcutAction?: (accion: string) => void;
  @Input() conectoresHaciaArriba: boolean = false;

  @Output() chatHistorialChange = new EventEmitter<any[]>();

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('dropdownRef') dropdownRef!: ElementRef<HTMLDivElement>;
  @ViewChild('conectoresRef') conectoresRef!: ElementRef<HTMLDivElement>;

  private appState = inject(AppStateService);

  // ── State ──────────────────────────────────────────────────────────────────
  valor = signal('');
  dropdownAbierto = signal(false);
  dropdownFiltrado = signal<any[]>([]);
  historialVisible = signal(false);
  conectoresAbierto = signal(false);
  companyKnowledgeOn = signal(false);
  selectedConectores = signal<Set<string>>(new Set());
  sugerenciasOcultas = signal(false);
  expanded = signal(false);

  // Hover state for buttons (plain booleans — no signals needed)
  plusBtnHovered = false;
  sendBtnHovered = false;

  get shortcutList(): any[] {
    return this.shortcuts ?? shortcutsComandos;
  }

  get canSend(): boolean {
    return this.valor().trim().length > 0;
  }

  get suggestedChips(): { text: string; id: string }[] {
    const chips: { text: string; id: string }[] = [];
    for (const id of this.selectedConectores()) {
      const suggestions = SUGERENCIAS[id] ?? [];
      for (const text of suggestions) {
        chips.push({ text, id });
      }
    }
    return chips;
  }

  get hasChips(): boolean {
    return this.suggestedChips.length > 0 && !this.sugerenciasOcultas();
  }

  get containerBorderRadius(): string {
    const sel = this.selectedConectores().size;
    const exp = this.expanded();
    const chips = this.hasChips;

    const topR = sel > 0 ? 18 : (exp ? 28 : 40);
    const botR = chips ? 0 : (sel > 0 ? 18 : (exp ? 28 : 40));
    return `${topR}px ${topR}px ${botR}px ${botR}px`;
  }

  // Connector data for template
  ckConnectors: ConectorItem[] = ALL_CONECTORES.slice(0, 4);
  otherConnectors: ConectorItem[] = ALL_CONECTORES.slice(4);
  allConectores = ALL_CONECTORES;

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.dropdownFiltrado.set(this.shortcutList);
    document.addEventListener('mousedown', this._outsideHandler);
  }

  ngAfterViewChecked(): void {
    // no-op: history div scrolls via CSS overflow auto
  }

  private _outsideHandler = (e: MouseEvent) => {
    const target = e.target as Node;

    if (
      this.dropdownRef?.nativeElement &&
      !this.dropdownRef.nativeElement.contains(target) &&
      this.inputRef?.nativeElement &&
      !this.inputRef.nativeElement.contains(target)
    ) {
      this.dropdownAbierto.set(false);
    }

    if (
      this.conectoresRef?.nativeElement &&
      !this.conectoresRef.nativeElement.contains(target)
    ) {
      this.conectoresAbierto.set(false);
    }
  };

  ngOnDestroy(): void {
    document.removeEventListener('mousedown', this._outsideHandler);
  }

  // ── Methods ────────────────────────────────────────────────────────────────
  toggleCompanyKnowledge(): void {
    if (this.companyKnowledgeOn()) {
      const next = new Set(this.selectedConectores());
      CK_CHILDREN_IDS.forEach(id => next.delete(id));
      this.selectedConectores.set(next);
      this.companyKnowledgeOn.set(false);
    } else {
      this.companyKnowledgeOn.set(true);
    }
  }

  toggleConector(id: string): void {
    const next = new Set(this.selectedConectores());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.selectedConectores.set(next);
    this.sugerenciasOcultas.set(false);
    this.conectoresAbierto.set(false);
  }

  removeConector(id: string, event: MouseEvent): void {
    event.stopPropagation();
    const next = new Set(this.selectedConectores());
    next.delete(id);
    this.selectedConectores.set(next);
  }

  isConectorSelected(id: string): boolean {
    return this.selectedConectores().has(id);
  }

  getConectorById(id: string): ConectorItem | undefined {
    return ALL_CONECTORES.find(c => c.id === id);
  }

  get selectedConectoresList(): string[] {
    return [...this.selectedConectores()];
  }

  handleChange(event: Event): void {
    const val = (event.target as HTMLTextAreaElement).value;
    this.valor.set(val);

    if (val.startsWith('/')) {
      const query = val.slice(1).toLowerCase();
      const filtrados = this.shortcutList.filter(s =>
        s.comando.toLowerCase().includes(query) || s.descripcion.toLowerCase().includes(query)
      );
      this.dropdownFiltrado.set(filtrados);
      this.dropdownAbierto.set(true);
    } else {
      this.dropdownAbierto.set(false);
    }
  }

  handleInput(event: Event): void {
    const ta = event.target as HTMLTextAreaElement;
    ta.style.height = 'auto';
    const h = Math.min(ta.scrollHeight, 144);
    ta.style.height = h + 'px';
    this.expanded.set(ta.scrollHeight > 44);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (this.dropdownAbierto() && this.dropdownFiltrado().length > 0) {
        this.handleSelectShortcut(this.dropdownFiltrado()[0]);
      } else {
        this.handleSend();
      }
    }
    if (event.key === 'Escape') {
      this.dropdownAbierto.set(false);
      this.historialVisible.set(false);
      this.conectoresAbierto.set(false);
    }
  }

  handleSelectShortcut(shortcut: any): void {
    this.dropdownAbierto.set(false);
    this.valor.set('');

    if (shortcut.accion === 'crearAsignatura') {
      this.appState.navigate('crearAsignatura');
    } else if (['filtrarPendientes', 'seguimiento', 'filtrarAlertas', 'filtrarRevision'].includes(shortcut.accion)) {
      this.onShortcutAction?.(shortcut.accion);
    } else {
      const msg = { id: Date.now(), rol: 'usuario', mensaje: shortcut.comando };
      const resp = {
        id: Date.now() + 1,
        rol: 'ia',
        mensaje: `La herramienta "${shortcut.descripcion}" estará disponible próximamente. Por ahora puedes usar /generar-asignatura.`,
      };
      const updated = [...this.chatHistorial, msg, resp];
      this.chatHistorialChange.emit(updated);
      this.historialVisible.set(true);
    }
  }

  handleSend(): void {
    const texto = this.valor().trim();
    if (!texto) return;

    if (texto.startsWith('/')) {
      const match = this.shortcutList.find(s => s.comando === texto || texto.startsWith(s.comando));
      if (match) {
        this.handleSelectShortcut(match);
        return;
      }
    }

    const msg = { id: Date.now(), rol: 'usuario', mensaje: texto };
    const respIdx = Math.floor(Math.random() * respuestasIAChatbar.length);
    const resp = { id: Date.now() + 1, rol: 'ia', mensaje: respuestasIAChatbar[respIdx] };

    const updated = [...this.chatHistorial, msg, resp];
    this.chatHistorialChange.emit(updated);
    this.valor.set('');
    this.expanded.set(false);
    this.historialVisible.set(true);

    // Reset textarea height
    setTimeout(() => {
      if (this.inputRef?.nativeElement) {
        this.inputRef.nativeElement.style.height = 'auto';
      }
    }, 0);
  }

  focusInput(): void {
    this.inputRef?.nativeElement?.focus();
  }

  toggleConectoresDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.conectoresAbierto.update(v => !v);
  }

  clickSend(event: MouseEvent): void {
    event.stopPropagation();
    this.handleSend();
  }

  showHistorial(event: MouseEvent): void {
    event.stopPropagation();
    this.historialVisible.set(true);
  }

  closeHistorial(): void {
    this.historialVisible.set(false);
  }

  selectChip(text: string): void {
    this.valor.set(text);
    this.sugerenciasOcultas.set(true);
    this.inputRef?.nativeElement?.focus();
  }

  // ── Hover helpers for inline-style hover effects ───────────────────────────
  onPlusBtnEnter(el: HTMLElement): void {
    if (!this.conectoresAbierto()) {
      el.style.background = '#F1F5F9';
      el.style.borderColor = '#E2E8F0';
    }
  }

  onPlusBtnLeave(el: HTMLElement): void {
    if (!this.conectoresAbierto()) {
      el.style.background = 'transparent';
      el.style.borderColor = 'transparent';
    }
  }

  onSendBtnEnter(el: HTMLElement): void {
    if (this.canSend) {
      el.style.background = '#0039A3';
    }
  }

  onSendBtnLeave(el: HTMLElement): void {
    el.style.background = this.canSend ? '#0A5CF5' : '#E6E6E6';
  }

  onConectorBtnEnter(el: HTMLElement, active: boolean): void {
    if (!active) el.style.background = '#F3F4F6';
  }

  onConectorBtnLeave(el: HTMLElement, active: boolean, color: string): void {
    el.style.background = active ? color + '12' : 'transparent';
  }

  onChipEnter(el: HTMLElement): void {
    el.style.background = '#E7EFFE';
    el.style.borderColor = '#BAD2FF';
    el.style.color = '#367CFF';
  }

  onChipLeave(el: HTMLElement): void {
    el.style.background = '#F1F5F9';
    el.style.borderColor = '#E2E8F0';
    el.style.color = '#374151';
  }

  onHistoryCloseBtnEnter(el: HTMLElement): void {
    el.style.background = '#F8F9FA';
  }

  onHistoryCloseBtnLeave(el: HTMLElement): void {
    el.style.background = 'transparent';
  }

  onHistoryCountBtnEnter(el: HTMLElement): void {
    el.style.background = '#F1F5F9';
  }

  onHistoryCountBtnLeave(el: HTMLElement): void {
    el.style.background = '#F8F9FA';
  }
}

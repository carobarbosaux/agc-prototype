import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  HostListener,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ─── Block type config ────────────────────────────────────────────────────────

interface TipoConf {
  label: string;
  title: string;
  className: string;
  style: Record<string, string>;
}

const TIPO_CONFIG: Record<string, TipoConf> = {
  p:     { label: 'p',  title: 'Párrafo',        className: 'text-base leading-8',                style: { color: 'var(--color-neutral-800)' } },
  h1:    { label: 'H1', title: 'Título 1',        className: 'text-3xl font-bold leading-tight',   style: { color: 'var(--color-text-strong)' } },
  h2:    { label: 'H2', title: 'Título 2',        className: 'text-xl font-semibold leading-snug', style: { color: 'var(--color-text-strong)' } },
  h3:    { label: 'H3', title: 'Título 3',        className: 'text-lg font-semibold leading-snug', style: { color: 'var(--color-neutral-800)' } },
  quote: { label: '"',  title: 'Cita',            className: 'text-base leading-8 italic',         style: { color: 'var(--color-neutral-600)', borderLeft: '3px solid var(--color-primary-500)', paddingLeft: '16px', marginLeft: '4px' } },
  ul:    { label: '•',  title: 'Lista',           className: 'text-base leading-7',                style: { color: 'var(--color-neutral-800)' } },
  ol:    { label: '1.', title: 'Lista numerada',  className: 'text-base leading-7',                style: { color: 'var(--color-neutral-800)' } },
};

export const TIPO_ORDER = ['p', 'h1', 'h2', 'h3', 'quote', 'ul', 'ol'];

// ─── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-bloque-contenido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './bloque-contenido.component.html',
})
/**
 * @source      Figma — Prodi DS / Organisms / BloqueContenido
 * @type        organism
 * @composedOf  PhIconComponent
 * @tokens      --color-primary, --color-border, --color-surface, --color-text
 * @figma       TBD
 *
 * Rich-text content block editor supporting h1-h4, p, ul, ol, blockquote, code, hr, and img block types.
 */
export class BloqueContenidoComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() bloque: any = null;
  @Input() index: number = 0;
  @Input() editable: boolean = true;
  @Input() rolActivo: string = 'autor';
  @Input() comentarios: any[] = [];
  @Input() activeComentarioId: string = '';
  @Input() iaInline: any = null;
  @Input() textoReemplazando: string | null = null;
  @Input() citaciones: any[] | null = null;

  @Output() contenidoChange = new EventEmitter<{ id: string; contenido: string }>();
  @Output() comentarioClick = new EventEmitter<string>();
  @Output() iaAccion = new EventEmitter<{ bloqueId: string; accion: string; texto?: string }>();
  @Output() tipoChange = new EventEmitter<{ id: string; tipo: string }>();
  @Output() citaInteraction = new EventEmitter<{ type: string; num: number; anchorEl?: HTMLElement }>();

  @ViewChild('contenedorRef') contenedorRef!: ElementRef<HTMLDivElement>;
  @ViewChild('toolbarRef') toolbarRef!: ElementRef<HTMLDivElement>;
  @ViewChild('editableRef') editableRef!: ElementRef<HTMLDivElement>;
  @ViewChild('menuFormatoRef') menuFormatoRef!: ElementRef<HTMLDivElement>;

  // ── Reactive state ──────────────────────────────────────────────────────────
  toolbarVisible = signal(false);
  toolbarPos = signal({ top: 0, left: 0 });
  selectedText = signal('');
  menuFormato = signal(false);

  // ── Derived from bloque ────────────────────────────────────────────────────
  get tipo(): string {
    return this.bloque?.tipo || 'p';
  }

  get tipoConf(): TipoConf {
    return TIPO_CONFIG[this.tipo] || TIPO_CONFIG['p'];
  }

  get comentariosActivos(): any[] {
    return (this.bloque?.comentarios || []).filter((c: any) => !c.resuelto);
  }

  get tieneComentarioCritico(): boolean {
    return this.comentariosActivos.some((c: any) => c.gravedad === 'critico');
  }

  get isContenidoArray(): boolean {
    return Array.isArray(this.bloque?.contenido);
  }

  get contenidoArray(): string[] {
    return Array.isArray(this.bloque?.contenido) ? this.bloque.contenido : [];
  }

  get tipoOrder(): string[] {
    return TIPO_ORDER;
  }

  get tipoConfigMap(): Record<string, TipoConf> {
    return TIPO_CONFIG;
  }

  getEditableStyle(): Record<string, string> {
    return { ...this.tipoConf.style, caretColor: this.editable ? 'var(--color-primary-500)' : 'transparent', outline: 'none' };
  }

  getToolbarLeft(): string {
    return Math.max(0, this.toolbarPos().left) + 'px';
  }

  getGravedadConfig(gravedad: string): any {
    const configs: Record<string, any> = {
      critico:         { bg: 'var(--color-error-bg)', color: '#DC2626', border: 'var(--color-error-border)', emoji: '🔴' },
      importante:      { bg: 'var(--color-warning-bg)', color: '#EA580C', border: 'var(--color-warning-border)', emoji: '🟠' },
      sugerencia:      { bg: 'var(--color-success-bg)', color: '#16A34A', border: '#BBF7D0', emoji: '🟢' },
      nota:            { bg: 'var(--color-bg)', color: 'var(--color-surface-600)', border: 'var(--color-border)', emoji: '📝' },
      alertaNormativa: { bg: '#FEFCE8', color: '#CA8A04', border: '#FEF08A', emoji: '⚠️' },
    };
    return configs[gravedad] || configs['nota'];
  }

  // ── Toolbar IA actions ─────────────────────────────────────────────────────
  get toolbarActionsIA(): Array<{ label: string; icon: string }> {
    if (!this.editable) return [];
    return [
      { label: 'Buscar fuentes bibliográficas', icon: 'bookmark-simple' },
      { label: 'Expandir',                      icon: 'magnifying-glass-plus' },
      { label: 'Resumir',                        icon: 'corners-in' },
      { label: 'Regenerar',                      icon: 'arrows-clockwise' },
      { label: 'Realizar investigación profunda', icon: 'magnifying-glass' },
    ];
  }

  readonly toolbarActionsChat = [{ label: 'Llevar al chat', icon: 'arrow-up-right' }];
  readonly toolbarActionsAnotaciones = [
    { label: 'Añadir comentario', icon: 'chat' },
    { label: 'Añadir nota',       icon: 'note' },
  ];

  get toolbarActionsChatAndAnotaciones(): Array<{ label: string; icon: string; isSeparatorAfter?: boolean }> {
    return [
      ...this.toolbarActionsChat.map((a, i) => ({
        ...a,
        isSeparatorAfter: i === this.toolbarActionsChat.length - 1,
      })),
      ...this.toolbarActionsAnotaciones,
    ];
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    this.syncInnerHTML();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bloque'] && !changes['bloque'].firstChange) {
      // Sync innerHTML only when bloque.contenido changes externally
      if (!this.isContenidoArray) {
        const el = this.editableRef?.nativeElement;
        if (el && el.innerHTML !== this.bloque?.contenido) {
          el.innerHTML = this.bloque.contenido ?? '';
        }
      }
      if (this.citaciones?.length) {
        setTimeout(() => this.applyCitacionMarkers(), 0);
      }
    }
    if (changes['citaciones'] && !changes['citaciones'].firstChange) {
      setTimeout(() => this.applyCitacionMarkers(), 0);
    }
  }

  ngOnDestroy(): void {
    // HostListener cleanup is automatic
  }

  private syncInnerHTML(): void {
    if (this.isContenidoArray) return;
    const el = this.editableRef?.nativeElement;
    if (!el) return;
    if (el.innerHTML !== (this.bloque?.contenido ?? '')) {
      el.innerHTML = this.bloque?.contenido ?? '';
    }
    if (this.citaciones?.length) {
      this.applyCitacionMarkers();
    }
  }

  // ── Citation markers ───────────────────────────────────────────────────────

  private applyCitacionMarkers(): void {
    const el = this.editableRef?.nativeElement;
    if (!el || !this.citaciones?.length) return;
    if (this.tipo === 'code' || this.tipo === 'hr') return;

    // Idempotent cleanup
    el.querySelectorAll('.cita-marker').forEach((span) => {
      span.replaceWith(document.createTextNode(span.textContent ?? ''));
    });

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const replacements: Array<{ node: Text; text: string }> = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = (node as Text).nodeValue ?? '';
      if (/\[\d+\]/.test(text)) {
        replacements.push({ node: node as Text, text });
      }
    }

    replacements.forEach(({ node, text }) => {
      const regex = /\[(\d+)\]/g;
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        const num = parseInt(match[1], 10);
        const cita = this.citaciones!.find((c) => c.num === num);
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        if (!cita) {
          fragment.appendChild(document.createTextNode(match[0]));
        } else {
          const span = document.createElement('span');
          span.className = 'cita-marker';
          span.setAttribute('contenteditable', 'false');
          span.setAttribute('data-cita-num', String(num));
          span.textContent = `[${num}]`;
          span.style.cssText = [
            'display:inline-block',
            'padding:0 3px',
            'border-radius:3px',
            'font-size:0.78em',
            'font-weight:600',
            'vertical-align:super',
            'line-height:1',
            'cursor:pointer',
            'user-select:none',
            'background:var(--color-ai-light)',
            'color:var(--color-primary-500)',
            'border:1px solid var(--color-ai-border)',
            'transition:background 0.12s',
          ].join(';');
          span.addEventListener('mouseenter', () => {
            span.style.background = 'var(--color-ai-border)';
            this.citaInteraction.emit({ type: 'hover', num, anchorEl: span });
          });
          span.addEventListener('mouseleave', () => {
            span.style.background = 'var(--color-ai-light)';
            this.citaInteraction.emit({ type: 'leave', num, anchorEl: span });
          });
          span.addEventListener('click', (e) => {
            e.stopPropagation();
            this.citaInteraction.emit({ type: 'click', num, anchorEl: span });
          });
          fragment.appendChild(span);
        }
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      }
      node.parentNode?.replaceChild(fragment, node);
    });
  }

  // ── Mouse / selection handling ─────────────────────────────────────────────

  onMouseUp(): void {
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.toString().trim().length < 2) {
        this.toolbarVisible.set(false);
        return;
      }
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = this.contenedorRef?.nativeElement?.getBoundingClientRect();
      if (!containerRect) return;

      this.toolbarPos.set({
        top:  rect.top  - containerRect.top,
        left: rect.left - containerRect.left,
      });
      this.selectedText.set(selection.toString().trim());
      this.toolbarVisible.set(true);
    }, 10);
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    const target = event.target as Node;
    if (this.toolbarRef?.nativeElement && !this.toolbarRef.nativeElement.contains(target)) {
      this.toolbarVisible.set(false);
    }
    if (this.menuFormatoRef?.nativeElement && !this.menuFormatoRef.nativeElement.contains(target)) {
      this.menuFormato.set(false);
    }
  }

  // ── Inline marks ───────────────────────────────────────────────────────────

  applyMark(command: string): void {
    this.editableRef?.nativeElement?.focus();
    document.execCommand(command);
    const el = this.editableRef?.nativeElement;
    if (el) {
      this.contenidoChange.emit({ id: this.bloque.id, contenido: el.innerHTML });
    }
  }

  // ── Block type change ──────────────────────────────────────────────────────

  handleTipoChange(nuevoTipo: string): void {
    this.toolbarVisible.set(false);
    this.menuFormato.set(false);
    window.getSelection()?.removeAllRanges();
    this.tipoChange.emit({ id: this.bloque.id, tipo: nuevoTipo });
  }

  // ── Content editable events ────────────────────────────────────────────────

  onEditableInput(event: Event): void {
    const el = event.currentTarget as HTMLDivElement;
    if (this.editable) {
      this.contenidoChange.emit({ id: this.bloque.id, contenido: el.innerHTML });
    } else {
      el.innerHTML = this.bloque?.contenido ?? '';
    }
  }

  onEditableKeyDown(event: KeyboardEvent): void {
    if (!this.editable) {
      event.preventDefault();
    }
  }

  onEditablePaste(event: ClipboardEvent): void {
    if (!this.editable) {
      event.preventDefault();
    }
  }

  // ── Toolbar actions ────────────────────────────────────────────────────────

  fireIaAction(label: string): void {
    const texto = this.selectedText();
    this.toolbarVisible.set(false);
    this.selectedText.set('');
    window.getSelection()?.removeAllRanges();
    if (texto) {
      this.iaAccion.emit({ bloqueId: this.bloque.id, accion: label, texto });
    }
  }

  fireChatAction(label: string): void {
    const texto = this.selectedText();
    this.toolbarVisible.set(false);
    this.selectedText.set('');
    window.getSelection()?.removeAllRanges();
    if (texto || label === 'Añadir comentario') {
      this.iaAccion.emit({ bloqueId: this.bloque.id, accion: label, texto: texto || '' });
    }
  }

  onComentarioClick(): void {
    this.comentarioClick.emit(this.bloque?.id);
  }

  onAddComentarioFromGutter(): void {
    this.iaAccion.emit({ bloqueId: this.bloque.id, accion: 'Añadir comentario', texto: '' });
  }

  toggleMenuFormato(): void {
    this.menuFormato.update((v) => !v);
  }
}

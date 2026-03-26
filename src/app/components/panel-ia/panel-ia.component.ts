import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhIconComponent } from '../../icons/ph-icon.component';
import { ProdiMarkComponent, ProdiWordmarkComponent } from '../prodi-logo/prodi-logo.component';
import { respuestasIA, respuestasCalidadIA } from '../../mock-data';

// ── Constants ────────────────────────────────────────────────────────────────

const SUGERENCIAS: Record<string, string[]> = {
  teams:      ['Resumir comentarios del coordinador', 'Identificar cambios solicitados'],
  sharepoint: ['Buscar documentación relevante', 'Extraer conceptos clave', 'Verificar alineación con guías'],
  outlook:    ['Extraer correcciones', 'Detectar puntos críticos'],
  onedrive:   ['Buscar archivos relacionados', 'Reutilizar contenido previo', 'Resumir documentos', 'Detectar inconsistencias'],
  canva:      ['Proponer estructura visual', 'Simplificar contenido'],
  genially:   ['Crear actividad interactiva', 'Proponer experiencia dinámica'],
};

export interface Mensaje {
  id: number;
  rol: 'usuario' | 'ia';
  mensaje: string;
}

export interface Conversacion {
  id: string;
  titulo: string;
  preview: string;
  grupo: string;
  mensajes: Mensaje[];
}

export interface QuotePendiente {
  accion: string;
  texto: string;
  sugerencias?: string[];
  respuestas?: Record<string, string>;
}

export interface SugerenciasContexto {
  sugerencias: string[];
  respuestas?: Record<string, string>;
}

interface Conector {
  id: string;
  letter: string;
  color: string;
  label: string;
  desc: string;
}

const HISTORIAL_CONVERSACIONES: Conversacion[] = [
  {
    id: 'h1',
    titulo: 'Referencias académicas para Bloque 2',
    preview: 'He analizado el bloque. Te sugiero añadir la referencia: Bishop...',
    grupo: 'Hoy',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: 'Necesito referencias para el bloque de regresión lineal' },
      { id: 2, rol: 'ia', mensaje: 'He analizado el bloque. Te sugiero añadir la referencia: Bishop, C.M. (2006). *Pattern Recognition and Machine Learning*. Springer. Es la referencia estándar para este tipo de contenido.' },
      { id: 3, rol: 'usuario', mensaje: '¿Tienes alguna más reciente?' },
      { id: 4, rol: 'ia', mensaje: 'Para la referencia académica que pide el Coordinador, también puedes usar: Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press. Disponible online de forma gratuita.' },
    ],
  },
  {
    id: 'h2',
    titulo: 'Mejorar explicación de KNN',
    preview: 'El contenido está bien estructurado. Considera añadir una transición más clara...',
    grupo: 'Hoy',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: '[Mejorar] "El algoritmo K-Nearest Neighbors (KNN) clasifica un nuevo punto..."' },
      { id: 2, rol: 'ia', mensaje: 'El contenido está bien estructurado. Considera añadir una transición más clara entre los paradigmas supervisado y no supervisado para mejorar la fluidez.' },
    ],
  },
  {
    id: 'h3',
    titulo: 'Generar ejemplo de regresión logística',
    preview: 'Puedo expandir este concepto con un ejemplo más detallado...',
    grupo: 'Ayer',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: 'Genera un ejemplo práctico de regresión logística para estudiantes' },
      { id: 2, rol: 'ia', mensaje: 'Puedo expandir este concepto con un ejemplo más detallado. ¿Quieres que lo genere en el canvas o prefieres verlo aquí primero?' },
    ],
  },
  {
    id: 'h4',
    titulo: 'Resumen del Tema 3 para coordinador',
    preview: 'Aquí tienes un resumen ejecutivo del Tema 3 listo para revisión...',
    grupo: 'Ayer',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: 'Necesito un resumen ejecutivo del Tema 3 para el coordinador' },
      { id: 2, rol: 'ia', mensaje: 'Aquí tienes un resumen ejecutivo del Tema 3 listo para revisión del coordinador.' },
    ],
  },
  {
    id: 'h5',
    titulo: 'Adaptar nivel de dificultad del test',
    preview: 'He revisado las preguntas. Tres de ellas superan el nivel esperado...',
    grupo: 'Esta semana',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: '¿Puedes revisar si el nivel de dificultad del test es adecuado?' },
      { id: 2, rol: 'ia', mensaje: 'He revisado las preguntas. Tres de ellas superan el nivel esperado para este módulo.' },
    ],
  },
  {
    id: 'h6',
    titulo: 'Coherencia entre temario y recursos',
    preview: 'Los recursos están bien alineados con el temario, aunque detecté...',
    grupo: 'Esta semana',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: 'Comprueba si los recursos a fondo son coherentes con el temario' },
      { id: 2, rol: 'ia', mensaje: 'Los recursos están bien alineados con el temario, aunque detecté una referencia desactualizada en la sección de redes convolucionales.' },
    ],
  },
  {
    id: 'h7',
    titulo: 'Revisar calidad del Bloque 5',
    preview: 'El bloque cumple los criterios de calidad. Sugerencia menor: ampliar...',
    grupo: 'Hace más tiempo',
    mensajes: [
      { id: 1, rol: 'usuario', mensaje: 'Revisar calidad — Bloque 5: Introducción a las redes neuronales' },
      { id: 2, rol: 'ia', mensaje: 'El bloque cumple los criterios de calidad. Sugerencia menor: ampliar el ejemplo de backpropagation con una notación más clara.' },
    ],
  },
];

const RECENT_LIMIT = 5;

const CONECTORES: Conector[] = [
  { id: 'teams',      letter: 'T',  color: '#6264A7', label: 'Teams',      desc: 'Conversaciones y archivos' },
  { id: 'sharepoint', letter: 'SP', color: '#0078D4', label: 'SharePoint', desc: 'Documentos institucionales' },
  { id: 'outlook',    letter: 'OL', color: '#0078D4', label: 'Outlook',    desc: 'Correos y adjuntos' },
  { id: 'onedrive',   letter: 'OD', color: '#0078D4', label: 'OneDrive',   desc: 'Archivos personales' },
  { id: 'canva',      letter: 'CA', color: '#7C3AED', label: 'Canva',      desc: 'Diseños y recursos visuales' },
  { id: 'genially',   letter: 'GE', color: '#F97316', label: 'Genially',   desc: 'Contenidos interactivos' },
];

const MICROSOFT_CONECTORES = CONECTORES.slice(0, 4);
const EXTERNAL_CONECTORES = CONECTORES.slice(4);

const CK_CHILDREN_IDS = ['teams', 'sharepoint', 'outlook', 'onedrive'];

// ── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-panel-ia',
  standalone: true,
  imports: [CommonModule, FormsModule, PhIconComponent, ProdiMarkComponent, ProdiWordmarkComponent],
  templateUrl: './panel-ia.component.html',
})
export class PanelIAComponent implements OnChanges, AfterViewChecked {
  // ── Inputs ──────────────────────────────────────────────────────────────
  @Input() abierto = false;
  @Input() seccionActiva: string | null = null;
  @Input() rolActivo: string | null = null;
  @Input() asignaturaActiva: any = null;
  @Input() titulaciones: any[] = [];
  @Input() creacionData: any = null;
  @Input() historialInicial: Mensaje[] = [];
  @Input() temaLabel = '';
  @Input() quotePendiente: QuotePendiente | null = null;
  @Input() contextoSugerencias: SugerenciasContexto | null = null;

  // ── Outputs ─────────────────────────────────────────────────────────────
  @Output() cerrar = new EventEmitter<void>();
  @Output() panelIACerrado = new EventEmitter<void>();
  @Output() quoteConsumed = new EventEmitter<void>();

  // ── ViewChild for scroll ─────────────────────────────────────────────────
  @ViewChild('chatEnd') chatEnd!: ElementRef;
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLTextAreaElement>;

  // ── State (signals) ──────────────────────────────────────────────────────
  mensajes = signal<Mensaje[]>([]);
  input = signal('');
  quote = signal<QuotePendiente | null>(null);
  esperando = signal(false);
  respIdx = signal(0);
  vistaHistorial = signal(false);
  sugerenciasContexto = signal<SugerenciasContexto | null>(null);
  conectoresAbierto = signal(false);
  companyKnowledgeOn = signal(false);
  selectedConectores = signal<Set<string>>(new Set());
  inputExpanded = signal(false);
  inputHeight = signal(21);
  busqueda = signal('');
  mostrarTodo = signal(false);

  // ── Scroll tracking ──────────────────────────────────────────────────────
  private lastMensajesLength = 0;
  private lastEsperando = false;
  private shouldScroll = false;

  // ── Expose constants to template ─────────────────────────────────────────
  readonly MICROSOFT_CONECTORES = MICROSOFT_CONECTORES;
  readonly EXTERNAL_CONECTORES = EXTERNAL_CONECTORES;
  readonly HISTORIAL_CONVERSACIONES = HISTORIAL_CONVERSACIONES;
  readonly RECENT_LIMIT = RECENT_LIMIT;
  readonly SUGERENCIAS = SUGERENCIAS;

  // ── Computed ─────────────────────────────────────────────────────────────
  get canSend(): boolean {
    return (!!this.input().trim() || !!this.quote()) && !this.esperando();
  }

  get allChips(): { text: string; autoSend: boolean }[] {
    const connectorChips = [...this.selectedConectores()]
      .flatMap(id => (SUGERENCIAS[id] || []).map(text => ({ text, autoSend: false })));
    const ctx = this.sugerenciasContexto();
    const contextChips = (ctx?.sugerencias || []).map(text => ({ text, autoSend: true }));
    return [...contextChips, ...connectorChips];
  }

  get showChips(): boolean {
    return this.allChips.length > 0;
  }

  get filteredHistorial(): Conversacion[] {
    const q = this.busqueda().trim().toLowerCase();
    if (!q) return HISTORIAL_CONVERSACIONES;
    return HISTORIAL_CONVERSACIONES.filter(c =>
      c.titulo.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q)
    );
  }

  get visibleHistorial(): Conversacion[] {
    const filtered = this.filteredHistorial;
    if (!this.mostrarTodo() && !this.busqueda().trim()) {
      return filtered.slice(0, RECENT_LIMIT);
    }
    return filtered;
  }

  get historialGrupos(): string[] {
    const seen = new Set<string>();
    const grupos: string[] = [];
    for (const c of this.visibleHistorial) {
      if (!seen.has(c.grupo)) { seen.add(c.grupo); grupos.push(c.grupo); }
    }
    return grupos;
  }

  getHistorialByGrupo(grupo: string): Conversacion[] {
    return this.visibleHistorial.filter(c => c.grupo === grupo);
  }

  isConectorActive(id: string): boolean {
    return this.selectedConectores().has(id);
  }

  getConectorById(id: string): Conector | undefined {
    return CONECTORES.find(c => c.id === id);
  }

  get selectedConectoresList(): string[] {
    return [...this.selectedConectores()];
  }

  getConectorBgStyle(c: Conector): string {
    return this.isConectorActive(c.id) ? c.color + '12' : 'transparent';
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['historialInicial'] && !changes['historialInicial'].firstChange) {
      this.mensajes.set(this.historialInicial || []);
    }
    if (changes['contextoSugerencias']) {
      this.sugerenciasContexto.set(this.contextoSugerencias);
    }
    if (changes['quotePendiente'] && this.quotePendiente) {
      this.handleQuotePendiente(this.quotePendiente);
    }
  }

  ngAfterViewChecked(): void {
    const currentLen = this.mensajes().length;
    const currentEsperando = this.esperando();
    if (currentLen !== this.lastMensajesLength || currentEsperando !== this.lastEsperando) {
      this.lastMensajesLength = currentLen;
      this.lastEsperando = currentEsperando;
      this.scrollToBottom();
    }
  }

  // ── Scroll ────────────────────────────────────────────────────────────────
  private scrollToBottom(): void {
    try {
      if (this.chatContainer?.nativeElement) {
        const el = this.chatContainer.nativeElement as HTMLElement;
        el.scrollTop = el.scrollHeight;
      }
    } catch (_) {}
  }

  // ── Quote handling ────────────────────────────────────────────────────────
  private handleQuotePendiente(qp: QuotePendiente): void {
    this.vistaHistorial.set(false);
    this.quoteConsumed.emit();

    if (qp.accion === 'Revisar calidad') {
      const userMsg: Mensaje = {
        id: Date.now(),
        rol: 'usuario',
        mensaje: `Revisar calidad de contenidos — ${qp.texto.replace('[Revisar calidad] ', '')}`,
      };
      this.mensajes.update(prev => [...prev, userMsg]);
      this.esperando.set(true);
      setTimeout(() => {
        const idx = Math.floor(Math.random() * respuestasCalidadIA.length);
        const iaMsg: Mensaje = { id: Date.now() + 1, rol: 'ia', mensaje: (respuestasCalidadIA as string[])[idx] };
        this.mensajes.update(prev => [...prev, iaMsg]);
        this.esperando.set(false);
      }, 1400);
    } else if (qp.accion === 'iaContexto') {
      this.sugerenciasContexto.set({ sugerencias: qp.sugerencias || [], respuestas: qp.respuestas });
      this.esperando.set(true);
      setTimeout(() => {
        const iaMsg: Mensaje = { id: Date.now() + 1, rol: 'ia', mensaje: qp.texto };
        this.mensajes.update(prev => [...prev, iaMsg]);
        this.esperando.set(false);
        setTimeout(() => this.inputEl?.nativeElement?.focus(), 50);
      }, 800);
    } else {
      this.quote.set(qp);
      setTimeout(() => this.inputEl?.nativeElement?.focus(), 50);
    }
  }

  // ── Actions ────────────────────────────────────────────────────────────────
  enviarMensaje(textoDirecto?: string): void {
    const q = this.quote();
    const texto = textoDirecto || (q
      ? `[${q.accion}] "${q.texto}"${this.input().trim() ? `\n\n${this.input().trim()}` : ''}`
      : this.input().trim());

    if (!texto || this.esperando()) return;

    const userMsg: Mensaje = { id: Date.now(), rol: 'usuario', mensaje: texto };
    this.mensajes.update(prev => [...prev, userMsg]);
    this.input.set('');
    this.quote.set(null);
    this.esperando.set(true);
    this.inputHeight.set(21);
    this.inputExpanded.set(false);

    // Reset textarea height
    if (this.inputEl?.nativeElement) {
      this.inputEl.nativeElement.style.height = '21px';
    }

    setTimeout(() => {
      const ctx = this.sugerenciasContexto();
      const respuestaContextual = ctx?.respuestas?.[texto];
      const iaMsg: Mensaje = {
        id: Date.now() + 1,
        rol: 'ia',
        mensaje: respuestaContextual || (respuestasIA as string[])[this.respIdx() % (respuestasIA as string[]).length],
      };
      this.mensajes.update(prev => [...prev, iaMsg]);
      if (!respuestaContextual) this.respIdx.update(v => v + 1);
      this.esperando.set(false);
    }, 1200);
  }

  handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.enviarMensaje();
    }
  }

  onInputChange(value: string): void {
    this.input.set(value);
  }

  onTextareaInput(e: Event): void {
    const el = e.target as HTMLTextAreaElement;
    el.style.height = '21px';
    const h = Math.min(el.scrollHeight, 63);
    this.inputHeight.set(h);
    this.inputExpanded.set(h > 21);
  }

  nuevaConversacion(): void {
    this.mensajes.set(this.historialInicial || []);
    this.input.set('');
    this.quote.set(null);
    this.sugerenciasContexto.set(null);
    this.vistaHistorial.set(false);
  }

  reanudarConversacion(conv: Conversacion): void {
    this.mensajes.set(conv.mensajes);
    this.vistaHistorial.set(false);
  }

  toggleHistorial(): void {
    this.vistaHistorial.update(v => !v);
    this.busqueda.set('');
    this.mostrarTodo.set(false);
  }

  toggleConectoresAbierto(e: Event): void {
    e.stopPropagation();
    this.conectoresAbierto.update(v => !v);
  }

  toggleCompanyKnowledge(e: Event): void {
    e.stopPropagation();
    if (this.companyKnowledgeOn()) {
      this.selectedConectores.update(prev => {
        const next = new Set(prev);
        CK_CHILDREN_IDS.forEach(id => next.delete(id));
        return next;
      });
      this.companyKnowledgeOn.set(false);
    } else {
      this.companyKnowledgeOn.set(true);
    }
  }

  toggleConector(id: string, e: Event): void {
    e.stopPropagation();
    this.selectedConectores.update(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    this.conectoresAbierto.set(false);
  }

  removeConector(id: string, e: Event): void {
    e.stopPropagation();
    this.selectedConectores.update(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  clearBusqueda(): void {
    this.busqueda.set('');
  }

  onBusquedaChange(value: string): void {
    this.busqueda.set(value);
    this.mostrarTodo.set(false);
  }

  onCerrar(): void {
    this.cerrar.emit();
    this.panelIACerrado.emit();
  }

  onChipClick(chip: { text: string; autoSend: boolean }): void {
    if (chip.autoSend) {
      this.enviarMensaje(chip.text);
    } else {
      this.input.set(chip.text);
      setTimeout(() => this.inputEl?.nativeElement?.focus(), 0);
    }
  }

  focusInput(): void {
    this.inputEl?.nativeElement?.focus();
  }

  // ── Mouse hover helpers ───────────────────────────────────────────────────
  hoverBg(e: Event, bg: string): void {
    (e.currentTarget as HTMLElement).style.background = bg;
  }

  hoverColor(e: Event, color: string): void {
    (e.currentTarget as HTMLElement).style.color = color;
  }
}

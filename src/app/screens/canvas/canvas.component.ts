import {
  Component, inject, signal, computed, OnInit, OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../services/app-state.service';
import {
  bloquesTema1, bloquesTema2, bloquesTema3, bloquesTema4,
  bloquesIndice, dlBloquesIndice, dlBloquesTema1,
  instruccionesTema1, instruccionesTema2, instruccionesTema3,
  instruccionesTema4, instruccionesTema5, instruccionesTema6,
  chatHistorialTema1, chatHistorialTema2,
  dlResumenTema1, citacionesPorTema, citacionesPorTemaDL,
} from '../../mock-data';
import { PhIconComponent } from '../../icons/ph-icon.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { PipelineSidebarComponent } from '../../components/pipeline-sidebar/pipeline-sidebar.component';
import { ChatbarComponent } from '../../components/chatbar/chatbar.component';
import { PanelIAComponent } from '../../components/panel-ia/panel-ia.component';
import { BloqueContenidoComponent } from '../../components/bloque-contenido/bloque-contenido.component';
import { ComentarioHiloComponent } from '../../components/comentario-hilo/comentario-hilo.component';
import { StatusIndicatorComponent, toStatusKey } from '../../components/status-indicator/status-indicator.component';
import { ProdiMarkComponent } from '../../components/prodi-logo/prodi-logo.component';

const SECCION_CONFIG: Record<string, any> = {
  resumen: { label: 'Resumen general', estado: 'aprobado', bloques: [], chat: [] },
  indice: { label: 'Índice', estado: 'aprobado', bloques: bloquesIndice, chat: chatHistorialTema2 },
  'instrucciones-t1': { label: 'Instrucciones didácticas · Tema 1', estado: 'aprobado', bloques: instruccionesTema1, chat: chatHistorialTema1 },
  t1: { label: 'Temario · Tema 1', estado: 'aprobado', bloques: bloquesTema1, chat: chatHistorialTema1 },
  'referencias-t1': { label: 'Referencias · Tema 1', estado: 'borrador', bloques: [], chat: chatHistorialTema1 },
  'recursos-t1': { label: 'A fondo · Tema 1', estado: 'borrador', bloques: [], chat: chatHistorialTema1 },
  'instrucciones-t2': { label: 'Instrucciones didácticas · Tema 2', estado: 'aprobado', bloques: instruccionesTema2, chat: chatHistorialTema2 },
  t2: { label: 'Temario · Tema 2', estado: 'aprobado', bloques: bloquesTema2, chat: chatHistorialTema2 },
  'referencias-t2': { label: 'Referencias · Tema 2', estado: 'revision', bloques: [], chat: chatHistorialTema2 },
  'recursos-t2': { label: 'A fondo · Tema 2', estado: 'revision', bloques: [], chat: chatHistorialTema2 },
  'instrucciones-t3': { label: 'Instrucciones didácticas · Tema 3', estado: 'aprobado', bloques: instruccionesTema3, chat: chatHistorialTema2 },
  t3: { label: 'Temario · Tema 3', estado: 'comentarios', bloques: bloquesTema3, chat: chatHistorialTema2 },
  'referencias-t3': { label: 'Referencias · Tema 3', estado: 'comentarios', bloques: [], chat: chatHistorialTema2 },
  'recursos-t3': { label: 'A fondo · Tema 3', estado: 'bloqueado', bloques: [], chat: chatHistorialTema2 },
  'instrucciones-t4': { label: 'Instrucciones · Tema 4', estado: 'bloqueado', bloques: instruccionesTema4, chat: chatHistorialTema2 },
  t4: { label: 'Temario · Tema 4', estado: 'bloqueado', bloques: bloquesTema4, chat: chatHistorialTema2 },
  'referencias-t4': { label: 'Referencias · Tema 4', estado: 'bloqueado', bloques: [], chat: chatHistorialTema2 },
  'recursos-t4': { label: 'A fondo · Tema 4', estado: 'bloqueado', bloques: [], chat: chatHistorialTema2 },
  'instrucciones-t5': { label: 'Instrucciones · Tema 5', estado: 'bloqueado', bloques: instruccionesTema5, chat: chatHistorialTema2 },
  t5: { label: 'Temario · Tema 5', estado: 'bloqueado', bloques: [], chat: chatHistorialTema2 },
  'referencias-t5': { label: 'Referencias · Tema 5', estado: 'bloqueado', bloques: [], chat: chatHistorialTema2 },
  'recursos-t5': { label: 'A fondo · Tema 5', estado: 'bloqueado', bloques: [], chat: chatHistorialTema2 },
  'instrucciones-t6': { label: 'Instrucciones · Tema 6', estado: 'bloqueado', bloques: instruccionesTema6, chat: chatHistorialTema2 },
  t6: { label: 'Temario · Tema 6', estado: 'bloqueado', bloques: [], chat: chatHistorialTema2 },
  'referencias-t6': { label: 'Referencias · Tema 6', estado: 'bloqueado', bloques: [], chat: chatHistorialTema2 },
  'recursos-t6': { label: 'A fondo · Tema 6', estado: 'bloqueado', bloques: [], chat: chatHistorialTema2 },
};

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    PhIconComponent, TopbarComponent, PipelineSidebarComponent,
    ChatbarComponent, PanelIAComponent, BloqueContenidoComponent,
    ComentarioHiloComponent, StatusIndicatorComponent,
    ProdiMarkComponent,
  ],
  templateUrl: './canvas.component.html',
})
/**
 * Main content editor screen (Canvas).
 *
 * Hosts the full authoring experience: section navigation via the pipeline sidebar,
 * rich-text block editing, AI inline suggestions, comment threads, notes, and
 * a floating chatbar. All mutable state is held as Angular Signals so the template
 * reacts without manual change-detection calls.
 *
 * @see SECCION_CONFIG  Static metadata (label, initial estado, seed blocks) per section ID.
 */
export class CanvasComponent implements OnInit, OnDestroy {
  readonly state = inject(AppStateService);
  readonly toStatusKey = toStatusKey;

  // ── New-subject mode ─────────────────────────────────────────

  readonly esAsignaturaNueva = signal(false);
  readonly bloquesState = signal<Record<string, any[]>>({});
  readonly estadosSeccion = signal<Record<string, string>>({});
  readonly instruccionesData = signal<Record<string, any>>({});

  // ── Toast / feedback signals ──────────────────────────────

  readonly savedToast = signal(false);
  readonly sentToast = signal(false);
  readonly correctionToast = signal(false);
  readonly approvedToast = signal(false);
  readonly revisandoCalidad = signal(false);
  readonly autosaveOn = signal(true);
  readonly autosaveStatus = signal<'saved'|'saving'|'unsaved'>('saved');
  readonly comentarioActivoBloque = signal<any>(null);
  readonly nuevoComentarioTexto = signal('');
  readonly nuevoComentarioAnchor = signal<string|null>(null);
  readonly quotePendiente = signal<any>(null);
  readonly panelNotasAbierto = signal(false);
  readonly notasState = signal<any[]>([]);
  readonly notaEditandoId = signal<string|null>(null);
  readonly notaEditandoTexto = signal('');
  readonly selectionAnchor = signal<string|null>(null);
  readonly nuevaNotaTexto = signal('');
  readonly herramientasMenuAbierto = signal(false);
  readonly enrichmentPanelAbierto = signal(false);
  readonly enrichmentsGenerados = signal<any[]>([]);
  readonly iaInline = signal<any>(null);
  readonly dlGenerandoContenido = signal(false);
  readonly editarResumenWarning = signal(false);
  readonly panelContextoTemaAbierto = signal(false);
  readonly resumen = signal<any>(null);
  readonly generandoResumen = signal(false);

  // ── Computed ─────────────────────────────────────────────

  readonly seccion = computed(() => SECCION_CONFIG[this.state.seccionActiva()] || SECCION_CONFIG['t2']);
  readonly breadcrumb = computed(() => this.state.getBreadcrumb('canvas'));

  readonly asignaturaData = computed(() => {
    const aa = this.state.asignaturaActiva();
    if (!aa) return null;
    const tit = this.state.titulaciones().find((t: any) => t.id === aa.titulacionId);
    return tit?.asignaturas?.find((a: any) => a.id === aa.asignaturaId) || null;
  });

  readonly isDL = computed(() => this.state.asignaturaActiva()?.asignaturaId === 'deep-learning');

  readonly bloques = computed(() => {
    const sec = this.state.seccionActiva();
    const bs = this.bloquesState();
    return bs[sec] !== undefined ? bs[sec] : (this.seccion().bloques || []);
  });

  readonly editable = computed(() => this.state.rolActivo() === 'autor');
  readonly isResumen = computed(() => this.state.seccionActiva() === 'resumen');
  readonly isTemaSection = computed(() => /^t\d+$/.test(this.state.seccionActiva()));
  readonly temaNumActivo = computed(() => {
    const m = this.state.seccionActiva().match(/^t(\d+)$/);
    return m ? parseInt(m[1], 10) : null;
  });

  readonly estadoMostrado = computed(() => {
    const sec = this.state.seccionActiva();
    if (this.esAsignaturaNueva()) return this.estadosSeccion()[sec] ?? 'sin_comenzar';
    return this.seccion().estado;
  });

  readonly totalComentariosCriticos = computed(() =>
    this.bloques().reduce((acc: number, b: any) =>
      acc + (b.comentarios?.filter((c: any) => c.gravedad === 'critico' && !c.resuelto).length || 0), 0)
  );

  readonly citacionesActivas = computed(() => {
    if (!this.isTemaSection()) return null;
    const n = this.temaNumActivo();
    if (!n) return null;
    const map = this.isDL() ? (citacionesPorTemaDL as any) : (citacionesPorTema as any);
    return map[n] ?? [];
  });

  readonly instrDataActual = computed(() => this.getInstrData(this.state.seccionActiva()));

  private menuHandler?: (e: MouseEvent) => void;

  // ── Lifecycle ─────────────────────────────────────────────────

  ngOnInit(): void {
    if (!this.state.seccionActiva()) this.state.seccionActiva.set('t2');
    const isDL = this.state.asignaturaActiva()?.asignaturaId === 'deep-learning';
    const indice = isDL ? dlBloquesIndice as any[] : bloquesIndice as any[];
    const t1 = isDL ? dlBloquesTema1 as any[] : bloquesTema1 as any[];
    this.bloquesState.set({
      t2: (bloquesTema2 as any[]).map((b: any) => ({ ...b, comentarios: (b.comentarios||[]).map((c: any) => ({...c,respuestas:[]})) })),
      t1: t1.map((b: any) => ({ ...b, comentarios: (b.comentarios||[]).map((c: any) => ({...c,respuestas:[]})) })),
      t3: (bloquesTema3 as any[]).map((b: any) => ({ ...b, comentarios: [] })),
      t4: (bloquesTema4 as any[]).map((b: any) => ({ ...b, comentarios: (b.comentarios||[]).map((c: any) => ({...c,respuestas:[]})) })),
      indice,
    });
    const temas = [
      { id: 'instrucciones-t1', bqs: instruccionesTema1 as any[] },
      { id: 'instrucciones-t2', bqs: instruccionesTema2 as any[] },
      { id: 'instrucciones-t3', bqs: instruccionesTema3 as any[] },
      { id: 'instrucciones-t4', bqs: instruccionesTema4 as any[] },
      { id: 'instrucciones-t5', bqs: instruccionesTema5 as any[] },
      { id: 'instrucciones-t6', bqs: instruccionesTema6 as any[] },
    ];
    const instrData: Record<string, any> = {};
    temas.forEach(({ id, bqs }) => {
      instrData[id] = { indicacionesIA: bqs[0]?.contenido??'', notasPedagogicas: bqs[1]?.contenido??'', archivos:[], urls:[''], resumenGenerado:false, generando:false };
    });
    this.instruccionesData.set(instrData);
    this.menuHandler = (e: MouseEvent) => {
      if (this.herramientasMenuAbierto() && !(e.target as HTMLElement).closest('.herramientas-menu')) {
        this.herramientasMenuAbierto.set(false);
      }
    };
    document.addEventListener('mousedown', this.menuHandler);
  }

  ngOnDestroy(): void {
    if (this.menuHandler) document.removeEventListener('mousedown', this.menuHandler);
  }

  // ── Instrucciones helpers ─────────────────────────────────

  /** Set the `resumenGenerado` flag for the active instrucciones section. */
  setInstrResumenGenerado(val: boolean): void {
    const sec = this.state.seccionActiva();
    this.instruccionesData.update(p => ({ ...p, [sec]: { ...p[sec], resumenGenerado: val } }));
  }

  setInstrIndicacionesIA(val: string): void {
    const sec = this.state.seccionActiva();
    this.instruccionesData.update(p => ({ ...p, [sec]: { ...p[sec], indicacionesIA: val } }));
  }

  setInstrNotasPedagogicas(val: string): void {
    const sec = this.state.seccionActiva();
    this.instruccionesData.update(p => ({ ...p, [sec]: { ...p[sec], notasPedagogicas: val } }));
  }

  // ── Section & content mutations ───────────────────────────

  /** Navigate to a different Canvas section and clear the active comment. */
  onSeccionChange(id: string): void {
    this.state.seccionActiva.set(id);
    this.comentarioActivoBloque.set(null);
  }

  onContenidoChange(bloqueId: string, nuevoContenido: string): void {
    const sec = this.state.seccionActiva();
    this.bloquesState.update(prev => ({
      ...prev, [sec]: (prev[sec]||this.bloques()).map((b: any) => b.id===bloqueId ? {...b,contenido:nuevoContenido} : b),
    }));
  }

  onTipoChange(bloqueId: string, nuevoTipo: string): void {
    const sec = this.state.seccionActiva();
    this.bloquesState.update(prev => ({
      ...prev, [sec]: (prev[sec]||this.bloques()).map((b: any) => b.id===bloqueId ? {...b,tipo:nuevoTipo} : b),
    }));
  }

  // ── Comment interactions ──────────────────────────────────

  /** Open the comment thread for a block (collapses AI panel and notes). */
  onComentarioClick(bloque: any): void {
    if (bloque.comentarios?.length > 0) {
      this.comentarioActivoBloque.set(bloque);
      this.state.panelIAabierto.set(false);
      this.panelNotasAbierto.set(false);
      this.enrichmentPanelAbierto.set(false);
    }
  }

  onMarcarResuelto(bloqueId: string, comentarioId: string): void {
    const sec = this.state.seccionActiva();
    this.bloquesState.update(prev => ({
      ...prev, [sec]: (prev[sec]||this.bloques()).map((b: any) => b.id!==bloqueId ? b : {
        ...b, comentarios: b.comentarios.map((c: any) => c.id===comentarioId ? {...c,resuelto:true} : c)
      }),
    }));
    const bloque = this.bloquesState()[sec]?.find((b: any) => b.id===bloqueId);
    if (bloque && bloque.comentarios.filter((c: any) => c.id!==comentarioId && !c.resuelto).length === 0) {
      setTimeout(() => this.comentarioActivoBloque.set(null), 800);
    }
  }

  onResponder(bloqueId: string, comentarioId: string, texto: string): void {
    const sec = this.state.seccionActiva();
    this.bloquesState.update(prev => ({
      ...prev, [sec]: (prev[sec]||this.bloques()).map((b: any) => b.id!==bloqueId ? b : {
        ...b, comentarios: b.comentarios.map((c: any) => c.id===comentarioId
          ? {...c, respuestas:[...(c.respuestas||[]),{autor:'Ana Lucía M.',texto}]} : c)
      }),
    }));
  }

  addComentario(): void {
    const texto = this.nuevoComentarioTexto().trim();
    const ab = this.comentarioActivoBloque();
    if (!texto || !ab) return;
    const c = { id:`c-${Date.now()}`, autor:'Ana Lucía M.', rol: this.state.rolActivo()==='coordinador'?'Coordinador':'Autor', avatar:'AL', gravedad:'sugerencia', texto, anchor:this.nuevoComentarioAnchor(), resuelto:false, respuestas:[] };
    const sec = this.state.seccionActiva();
    this.bloquesState.update(prev => ({ ...prev, [sec]: (prev[sec]||[]).map((b: any) => b.id===ab.id ? {...b,comentarios:[...(b.comentarios||[]),c]} : b) }));
    this.comentarioActivoBloque.update((prev: any) => prev ? {...prev, comentarios:[...(prev.comentarios||[]),c]} : null);
    this.nuevoComentarioTexto.set('');
    this.nuevoComentarioAnchor.set(null);
  }

  // ── AI inline & chat actions ──────────────────────────────

  /**
   * Dispatch a contextual AI action triggered from the floating toolbar.
   * Routes to: comment creation, chat quote, inline rewrite, or panel open.
   */
  onAccionIA(args: { texto: string; accion: string; bloque: any }): void {
    const { texto, accion, bloque } = args;
    if (accion === 'Añadir comentario') {
      this.comentarioActivoBloque.set(bloque);
      this.nuevoComentarioAnchor.set(texto);
      this.nuevoComentarioTexto.set('');
      this.state.panelIAabierto.set(false);
      return;
    }
    if (accion === 'Llevar al chat') {
      this.quotePendiente.set({ texto, accion: 'Consultar' });
      this.state.panelIAabierto.set(true);
      this.comentarioActivoBloque.set(null);
      return;
    }
    if (['Expandir','Resumir','Regenerar'].includes(accion) && bloque) {
      this.iaInline.set({bloqueId:bloque.id,accion,textoOriginal:texto,textoGenerado:null,generando:true});
      setTimeout(() => {
        this.iaInline.update((p: any) => p ? {...p, textoGenerado:this.mockGenerarInline(texto,accion), generando:false} : null);
      }, 1200); return;
    }
    this.quotePendiente.set({texto, accion}); this.state.panelIAabierto.set(true);
  }

  mockGenerarInline(texto: string, accion: string): string {
    if (accion==='Expandir') return texto+' Este concepto tiene importancia fundamental en el aprendizaje automático moderno, estableciendo las bases teóricas sobre las cuales se construyen los modelos más complejos.';
    if (accion==='Resumir') return texto.split(' ').slice(0,Math.ceil(texto.split(' ').length*0.45)).join(' ')+'.';
    return `En términos prácticos, ${texto.charAt(0).toLowerCase()+texto.slice(1)}`;
  }

  acceptIaInline(): void {
    const il = this.iaInline();
    if (!il) return;
    const sec = this.state.seccionActiva();
    this.bloquesState.update(prev => ({
      ...prev, [sec]: (prev[sec]||this.bloques()).map((b: any) => b.id===il.bloqueId ? {...b,contenido:il.textoGenerado} : b)
    }));
    this.iaInline.set(null);
  }

  retryIaInline(): void {
    this.iaInline.update((p: any) => p ? {...p,generando:true,textoGenerado:null} : null);
    setTimeout(() => {
      this.iaInline.update((p: any) => p ? {...p,textoGenerado:this.mockGenerarInline(p.textoOriginal,p.accion),generando:false} : null);
    }, 1000);
  }

  handleRevisarCalidad(): void {
    this.revisandoCalidad.set(true);
    this.comentarioActivoBloque.set(null);
    this.state.panelIAabierto.set(true);
    setTimeout(() => { this.revisandoCalidad.set(false); this.quotePendiente.set({texto:`[Revisar calidad] ${this.seccion().label}`, accion:'Revisar calidad'}); }, 1800);
  }

  // ── Toasts & autosave ─────────────────────────────────────

  /** Flash the "guardado" confirmation toast for 2 s. */
  showSavedToast(): void {
    this.savedToast.set(true);
    setTimeout(() => this.savedToast.set(false), 2000);
  }

  showSentToast(): void {
    if (this.esAsignaturaNueva()) {
      const order = [
        'indice',
        'instrucciones-t1', 't1', 'referencias-t1', 'recursos-t1',
        'instrucciones-t2', 't2', 'referencias-t2', 'recursos-t2',
        'instrucciones-t3', 't3', 'referencias-t3', 'recursos-t3',
        'instrucciones-t4', 't4', 'referencias-t4', 'recursos-t4',
        'instrucciones-t5', 't5', 'referencias-t5', 'recursos-t5',
        'instrucciones-t6', 't6', 'referencias-t6', 'recursos-t6',
      ];
      const sec = this.state.seccionActiva();
      const idx = order.indexOf(sec);
      const next = order[idx+1];
      this.estadosSeccion.update(prev => ({ ...prev, [sec]: 'aprobado', ...(next ? { [next]: 'borrador' } : {}) }));
      if (next) setTimeout(() => this.state.seccionActiva.set(next), 300);
    }
    this.sentToast.set(true); setTimeout(()=>this.sentToast.set(false),2500);
  }

  showCorrectionToast(): void {
    this.correctionToast.set(true);
    setTimeout(() => this.correctionToast.set(false), 2500);
  }
  showApprovedToast(): void {
    this.approvedToast.set(true);
    setTimeout(() => this.approvedToast.set(false), 2500);
  }

  toggleAutosave(): void {
    const next = !this.autosaveOn();
    this.autosaveOn.set(next);
    if (next) {
      this.autosaveStatus.set('saving');
      setTimeout(() => this.autosaveStatus.set('saved'), 900);
    } else {
      this.autosaveStatus.set('unsaved');
    }
  }

  // ── Notes panel ───────────────────────────────────────────

  /** Append a new note anchored to the current text selection. */
  addNota(): void {
    const texto = this.nuevaNotaTexto().trim();
    if (!texto) return;
    this.notasState.update(prev => [
      ...prev,
      { id: `nota-${Date.now()}`, anchor: this.selectionAnchor(), contenido: texto, bloqueId: this.state.seccionActiva() },
    ]);
    this.nuevaNotaTexto.set('');
    this.selectionAnchor.set(null);
    this.panelNotasAbierto.set(true);
  }

  deleteNota(id: string): void {
    this.notasState.update(prev => prev.filter((n: any) => n.id !== id));
  }

  saveEditNota(id: string): void {
    this.notasState.update(prev => prev.map((n: any) => n.id === id ? { ...n, contenido: this.notaEditandoTexto() } : n));
    this.notaEditandoId.set(null);
    this.notaEditandoTexto.set('');
  }

  onTextSelection(): void {
    const sel = window.getSelection()?.toString().trim();
    if (sel && sel.length > 2) {
      this.selectionAnchor.set(sel);
    } else {
      this.selectionAnchor.set(null);
    }
  }

  // ── AI generation ─────────────────────────────────────────

  /** Simulate AI summarisation of the current instrucciones section (1.5 s delay). */
  generarResumenInstrucciones(): void {
    const sec = this.state.seccionActiva();
    this.instruccionesData.update(prev => ({ ...prev, [sec]: { ...prev[sec], generando: true } }));
    setTimeout(() => {
      this.instruccionesData.update(prev => ({ ...prev, [sec]: { ...prev[sec], generando: false, resumenGenerado: true } }));
    }, 1500);
  }

  generarContenidoTema(): void {
    const sec = this.state.seccionActiva();
    const tNum = parseInt(sec.replace('instrucciones-t',''),10);
    if (tNum===1) {
      this.dlGenerandoContenido.set(true);
      setTimeout(()=>{
        this.bloquesState.update(prev => ({ ...prev, t1: dlBloquesTema1 as any[] }));
        this.estadosSeccion.update(prev => ({ ...prev, t1: prev['t1'] ?? 'borrador', [sec]: 'aprobado' }));
        this.dlGenerandoContenido.set(false);
        this.state.seccionActiva.set('t1');
      }, 1600);
    } else {
      this.estadosSeccion.update(prev=>({...prev,[sec]:'aprobado'}));
      this.state.seccionActiva.set(`t${tNum}`);
    }
  }

  // ── Chat & track helpers ──────────────────────────────────

  /** Propagate updated chat history from Chatbar up to AppStateService. */
  onChatHistorialChange(h: any[]): void {
    this.state.chatHistorial.set(h);
  }

  getInstrData(secId: string): any {
    return this.instruccionesData()[secId] || { indicacionesIA:'', notasPedagogicas:'', archivos:[], urls:[''], resumenGenerado:false, generando:false };
  }

  trackByBloqueId(_: number, bloque: any): string { return bloque.id; }
  trackById(_: number, item: any): any { return item.id || item; }

  // ── AI tags ───────────────────────────────────────────────────────
  readonly aiTags = ['Machine Learning','Árboles de decisión','Ensemble Methods','Random Forest','Gradient Boosting','XGBoost'];
}

import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../services/app-state.service';
import { PhIconComponent } from '../../icons/ph-icon.component';
import { PanelIAComponent } from '../../shared/ui/organisms/panel-ia/panel-ia.component';
import { ProdiMarkComponent } from '../../shared/ui/atoms/prodi-logo/prodi-logo.component';

const DEEP_LEARNING_SUMMARY = {
  nombre: 'Deep Learning y Redes Neuronales',
  descripcion: 'Esta asignatura proporciona una formación completa en deep learning y redes neuronales artificiales, abarcando desde los fundamentos teóricos hasta las aplicaciones prácticas más avanzadas. Los estudiantes aprenderán a diseñar, implementar y optimizar modelos de aprendizaje profundo para resolver problemas complejos en visión por computador, procesamiento del lenguaje natural y otras áreas del machine learning.',
  objetivos: [
    'Comprender los fundamentos matemáticos y computacionales del deep learning',
    'Implementar y entrenar redes neuronales profundas con herramientas como TensorFlow y PyTorch',
    'Aplicar arquitecturas especializadas como CNN, RNN, y Transformers a problemas reales',
    'Evaluar y optimizar el rendimiento de modelos de aprendizaje profundo',
    'Desarrollar proyectos end-to-end de inteligencia artificial aplicada',
  ],
  tags: ['Deep Learning', 'Redes Neuronales', 'Machine Learning', 'IA', 'Python'],
};

const INDICE_DL = [
  { titulo: 'Introducción al Deep Learning', epigrafes: ['Introducción y objetivos','Concepto de IA, ML y DL','Evolución histórica','Aplicaciones actuales','Retos y limitaciones'] },
  { titulo: 'Fundamentos de redes neuronales', epigrafes: ['Introducción y objetivos','Inspiración biológica','La neurona artificial','Arquitectura básica','Proceso de entrenamiento'] },
  { titulo: 'Entrenamiento de redes neuronales', epigrafes: ['Introducción y objetivos','Función de pérdida','Backpropagation','Métodos de optimización','Problemas comunes'] },
  { titulo: 'Redes neuronales profundas', epigrafes: ['Introducción y objetivos','Arquitecturas profundas','Inicialización y regularización','Overfitting','Mejora del rendimiento'] },
  { titulo: 'Redes neuronales convolucionales (CNN)', epigrafes: ['Introducción y objetivos','Funcionamiento de las CNN','Capas convolucionales','Arquitecturas populares','Visión por computador'] },
  { titulo: 'Redes neuronales recurrentes (RNN)', epigrafes: ['Introducción y objetivos','Datos secuenciales','Arquitectura RNN','LSTM y GRU','Procesamiento del lenguaje'] },
];

const AUTOR_PASO_LABELS: Record<number, string> = { 1: 'Información', 2: 'Descriptor', 3: 'Vista previa' };
const COORD_PASO_LABELS: Record<number, string> = { 1: 'Contexto', 2: 'Temática', 3: 'Vista previa' };

const NIVELES = ['Grado', 'Máster', 'Doctorado', 'Certificación'];
const IDIOMAS = ['Español', 'Inglés', 'Portugués', 'Francés'];
const MODALIDADES = ['Online', 'Presencial', 'Semipresencial'];
const TIPOS_ASIG = ['Obligatoria', 'Optativa', 'Libre configuración', 'TFG/TFM'];
const ENFOQUES = ['Teórico', 'Práctico', 'Mixto'];
const AREAS = ['Inteligencia Artificial', 'Ingeniería de Software', 'Ciencias de Datos', 'Redes y Telecomunicaciones', 'Ciberseguridad', 'Matemáticas Aplicadas'];

@Component({
  selector: 'app-crear-asignatura',
  standalone: true,
  imports: [CommonModule, FormsModule, PhIconComponent, PanelIAComponent, ProdiMarkComponent],
  templateUrl: './crear-asignatura.component.html',
})
/**
 * Subject-creation wizard screen (Crear asignatura).
 *
 * A 3-step wizard whose content varies by active role:
 * - **Autor** (steps: Información → Descriptor → Vista previa): fixed subject data,
 *   difficulty / topic / approach selectors, AI-generated summary preview.
 * - **Coordinador** (steps: Contexto → Temática → Vista previa): free-form context
 *   form, thematic selectors, same preview step.
 *
 * Generation is simulated with `setTimeout` chains using {@link DEEP_LEARNING_SUMMARY}
 * as the hardcoded AI output.
 */
export class CrearAsignaturaComponent implements OnInit {
  readonly state = inject(AppStateService);

  // ── Wizard state ──────────────────────────────────────────

  /** Current wizard step (1–3). */
  readonly paso = signal(1);
  readonly generando = signal(false);
  readonly generandoResumen = signal(false);
  readonly resumen = signal<any>(null);
  readonly modalVolver = signal<'volver'|'cancelar'|null>(null);
  readonly panelIAAbierto = signal(true);
  readonly quotePendiente = signal<any>(null);

  // ── Form data ─────────────────────────────────────────────

  readonly datos = signal<Record<string,any>>({});
  // Fixed datos shown to the Autor on step 1 (read-only, pre-assigned by coordinator).
  readonly asigNombre = 'Deep Learning y Redes Neuronales';
  readonly asigCodigo = 'IA-302';
  readonly asigCreditos = 6;

  // ── Computed ─────────────────────────────────────────────

  readonly breadcrumb = computed(() => [
    { label: 'Generación de Asignaturas', route: '/herramientas' },
    { label: 'Crear asignatura' },
  ]);

  readonly esAutor = computed(() => this.state.rolActivo() === 'autor');
  readonly pasoLabels = computed(() => this.esAutor() ? AUTOR_PASO_LABELS : COORD_PASO_LABELS);
  readonly totalPasos = 3;
  readonly progressPct = computed(() => (this.paso() / this.totalPasos) * 100);

  // ── Selector option lists (exposed to template) ───────────

  readonly niveles = NIVELES;
  readonly idiomas = IDIOMAS;
  readonly modalidades = MODALIDADES;
  readonly tiposAsig = TIPOS_ASIG;
  readonly enfoques = ENFOQUES;
  readonly areas = AREAS;

  // ── Lifecycle ─────────────────────────────────────────────

  ngOnInit(): void {
    this.datos.set({ titulacionId: this.state.titulaciones()[0]?.id || 'master-ia' });
  }

  // ── Form helpers ──────────────────────────────────────────

  /** Merge a single key/value pair into the wizard form data signal. */
  updateDatos(key: string, val: any): void {
    this.datos.update(prev => ({ ...prev, [key]: val }));
  }

  puedeAvanzar(): boolean {
    const p = this.paso();
    const d = this.datos();
    if (this.esAutor()) {
      if (p === 1) return true;
      if (p === 2) return !!d['nivelConocimiento'] && !!d['numTemas'] && !!d['enfoque'];
      return true;
    } else {
      if (p === 1) return !!d['titulacionId'] && !!d['nivel'] && !!(d['nombre']?.trim());
      if (p === 2) return !!d['areaConocimiento'] && !!d['tipoAsignatura'] && !!d['enfoque'];
      return true;
    }
  }

  // ── Navigation ────────────────────────────────────────────

  /**
   * Advance to the next step.
   * Step 2 → triggers AI summary generation; step 3 → finalises creation.
   */
  handleSiguiente(): void {
    if (this.paso() === 2) {
      this.handleGenerarResumen();
    } else if (this.paso() === 3) {
      this.handleAceptarYGenerar();
    } else {
      this.paso.update(p => p + 1);
    }
  }

  handleGenerarResumen(): void {
    this.generandoResumen.set(true);
    setTimeout(() => {
      this.resumen.set({ ...DEEP_LEARNING_SUMMARY });
      this.generandoResumen.set(false);
      this.paso.set(3);
    }, 1600);
  }

  handleAceptarYGenerar(): void {
    this.generando.set(true);
    const r = this.resumen() || DEEP_LEARNING_SUMMARY;
    const nuevaAsig = {
      id: 'deep-learning',
      nombre: r.nombre,
      descripcion: r.descripcion,
      objetivos: r.objetivos,
      tags: r.tags,
      etapaActual: 'Índice',
      estado: 'borrador',
      pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
      ultimaActividad: 'Ahora mismo',
      activa: true,
    };
    setTimeout(() => {
      this.state.handleCrearAsignatura(
        this.datos()['titulacionId'] || 'master-ia',
        nuevaAsig,
        { indice: INDICE_DL, resumen: r }
      );
    }, 1000);
  }

  /** Open the "volver" confirmation modal. */
  handleVolver(): void {
    this.modalVolver.set('volver');
  }

  /** Open the "cancelar" confirmation modal. */
  handleCancelar(): void {
    this.modalVolver.set('cancelar');
  }

  /** Execute the pending modal action (navigate away or step back) and close the modal. */
  confirmModal(): void {
    if (this.modalVolver() === 'cancelar') {
      this.state.navigate('dashboard');
    } else {
      this.paso.update(p => p - 1);
    }
    this.modalVolver.set(null);
  }

  getBackLabel(): string {
    return this.paso() === 3 ? 'Editar descripción previa' : 'Volver';
  }

  getForwardLabel(): string {
    if (this.paso() === 2) return 'Generar resumen';
    if (this.paso() === 3) return 'Generar índice';
    return 'Siguiente';
  }

  getForwardColor(): string {
    return this.paso() === 3 ? 'var(--color-success-hover)' : 'var(--color-primary)';
  }

  // ── Resumen editing ───────────────────────────────────────

  /** Patch a top-level field on the generated resumen signal. */
  updateResumenField(key: string, val: any): void {
    this.resumen.update(prev => prev ? { ...prev, [key]: val } : prev);
  }

  updateResumenObjetivo(idx: number, val: string): void {
    this.resumen.update(prev => {
      if (!prev) return prev;
      const objs = [...prev.objetivos];
      objs[idx] = val;
      return { ...prev, objetivos: objs };
    });
  }

  trackByIndex(i: number): number { return i; }
  trackByKey(_: number, item: any): any { return item; }

  // ── Lookup helpers ────────────────────────────────────────

  /** Resolve a titulación ID to its display name. */
  getTitulacionNombre(id: string): string {
    return this.state.titulaciones().find((t: any) => t.id === id)?.nombre || id;
  }
}

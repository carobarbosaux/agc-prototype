import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../services/app-state.service';
import { PhIconComponent } from '../../icons/ph-icon.component';
import { PanelIAComponent } from '../../components/panel-ia/panel-ia.component';
import { ProdiMarkComponent } from '../../components/prodi-logo/prodi-logo.component';

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
export class CrearAsignaturaComponent implements OnInit {
  readonly state = inject(AppStateService);

  readonly paso = signal(1);
  readonly generando = signal(false);
  readonly generandoResumen = signal(false);
  readonly resumen = signal<any>(null);
  readonly modalVolver = signal<'volver'|'cancelar'|null>(null);
  readonly panelIAAbierto = signal(true);
  readonly quotePendiente = signal<any>(null);

  // Form data
  readonly datos = signal<Record<string,any>>({});
  // Autor step 1 fixed data
  readonly asigNombre = 'Deep Learning y Redes Neuronales';
  readonly asigCodigo = 'IA-302';
  readonly asigCreditos = 6;

  readonly breadcrumb = computed(() => [
    { label: 'Generación de Asignaturas', route: '/herramientas' },
    { label: 'Crear asignatura' },
  ]);

  readonly esAutor = computed(() => this.state.rolActivo() === 'autor');
  readonly pasoLabels = computed(() => this.esAutor() ? AUTOR_PASO_LABELS : COORD_PASO_LABELS);
  readonly totalPasos = 3;
  readonly progressPct = computed(() => (this.paso() / this.totalPasos) * 100);

  readonly niveles = NIVELES;
  readonly idiomas = IDIOMAS;
  readonly modalidades = MODALIDADES;
  readonly tiposAsig = TIPOS_ASIG;
  readonly enfoques = ENFOQUES;
  readonly areas = AREAS;

  ngOnInit(): void {
    this.datos.set({ titulacionId: this.state.titulaciones()[0]?.id || 'master-ia' });
  }

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

  handleVolver(): void {
    this.modalVolver.set('volver');
  }

  handleCancelar(): void {
    this.modalVolver.set('cancelar');
  }

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
    return this.paso() === 3 ? '#008660' : '#0A5CF5';
  }

  // Resumen editing
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

  // For coordinador step 1 titulacion selector
  getTitulacionNombre(id: string): string {
    return this.state.titulaciones().find((t: any) => t.id === id)?.nombre || id;
  }
}

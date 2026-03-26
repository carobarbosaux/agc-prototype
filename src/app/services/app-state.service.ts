import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { titulaciones as titulacionesIniciales } from '../mock-data';

/** Shape of the currently selected titulación + asignatura pair. */
export interface AsignaturaActiva {
  titulacionId: string;
  asignaturaId: string;
}

/** Optional parameters accepted by {@link AppStateService.navigate}. */
export interface NavigateParams {
  /** Canvas section to activate on arrival. */
  seccion?: string;
  titulacionId?: string;
  asignaturaId?: string;
}

/**
 * Singleton service that owns all cross-screen application state.
 *
 * All fields are Angular Signals so consumers react automatically to changes.
 * There is no external store — this service IS the store.
 */
@Injectable({ providedIn: 'root' })
export class AppStateService {
  // ── Core state ────────────────────────────────────────────────

  /** Currently active user role. Drives permissions and UI layout. */
  readonly rolActivo = signal<string>('autor');

  /** Active Canvas section ID (e.g. `'t2'`, `'instrucciones-t1'`). */
  readonly seccionActiva = signal<string>('t2');

  /** Whether the AI side panel is expanded. */
  readonly panelIAabierto = signal<boolean>(true);

  /** Whether the notifications drawer is open. */
  readonly notifAbiertas = signal<boolean>(false);

  /** Full list of titulaciones, kept in sync as new asignaturas are created. */
  readonly titulaciones = signal<any[]>(titulacionesIniciales as any[]);

  /** Titulación + asignatura currently open in the Canvas. */
  readonly asignaturaActiva = signal<AsignaturaActiva>({ titulacionId: 'master-ia', asignaturaId: 'fund-ml' });

  /** Shared AI chat history surfaced to the Chatbar. */
  readonly chatHistorial = signal<any[]>([]);

  /** Payload produced by {@link handleCrearAsignatura} (índice, resumen). Consumed once by Canvas. */
  readonly creacionData = signal<any>(null);

  /** Draft data saved mid-wizard by {@link handleSaveDraft}. */
  readonly draftCreacion = signal<any>(null);

  // ── Derived ───────────────────────────────────────────────────

  /** `true` when `rolActivo` is `'autor'` — the only role allowed to edit content. */
  readonly editable = computed(() => this.rolActivo() === 'autor');

  constructor(private router: Router) {}

  // ── Navigation ────────────────────────────────────────────────

  /**
   * Navigate to a named destination, optionally setting Canvas parameters.
   *
   * @param destino  One of `'herramientas'` | `'dashboard'` | `'canvas'` | `'crearAsignatura'`.
   * @param params   Optional section / titulación / asignatura overrides for Canvas.
   */
  navigate(destino: string, params: NavigateParams = {}): void {
    if (destino === 'canvas') {
      if (params.seccion) this.seccionActiva.set(params.seccion);
      if (params.titulacionId) {
        this.asignaturaActiva.set({ titulacionId: params.titulacionId!, asignaturaId: params.asignaturaId! });
      }
      this.notifAbiertas.set(false);
      this.router.navigate(['/canvas']);
    } else if (destino === 'dashboard') {
      this.notifAbiertas.set(false);
      this.router.navigate(['/dashboard']);
    } else if (destino === 'herramientas') {
      this.notifAbiertas.set(false);
      this.router.navigate(['/herramientas']);
    } else if (destino === 'crearAsignatura') {
      this.notifAbiertas.set(false);
      this.router.navigate(['/crear-asignatura']);
    }
  }

  // ── Subject creation ──────────────────────────────────────────

  /**
   * Commit a new asignatura to the titulaciones list and navigate to Canvas.
   * Called by {@link CrearAsignaturaComponent} after the wizard completes.
   *
   * @param titulacionId  Target titulación to attach the new subject to.
   * @param nuevaAsig     Asignatura object to insert.
   * @param generados     Pre-generated payload (índice, resumen) written to {@link creacionData}.
   */
  handleCrearAsignatura(titulacionId: string, nuevaAsig: any, generados: any = {}): void {
    this.titulaciones.update((prev: any[]) => prev.map((t: any) => {
      if (t.id !== titulacionId) return t;
      const sinDuplicado = (t.asignaturas || []).filter((a: any) => a.id !== nuevaAsig.id);
      return { ...t, asignaturas: [...sinDuplicado, nuevaAsig], asignaturas_count: sinDuplicado.length + 1 };
    }));
    this.asignaturaActiva.set({ titulacionId, asignaturaId: nuevaAsig.id });
    this.creacionData.set(generados);
    this.seccionActiva.set('indice');
    this.router.navigate(['/canvas']);
  }

  /**
   * Persist a wizard draft and navigate back to Dashboard.
   * Marks the subject as `'enBorrador'` in the titulaciones list.
   */
  handleSaveDraft(draft: any): void {
    this.draftCreacion.set(draft);
    this.titulaciones.update((prev: any[]) => prev.map((t: any) => {
      if (t.id !== 'master-ia') return t;
      return {
        ...t,
        asignaturas: t.asignaturas.map((a: any) =>
          a.id === 'deep-learning'
            ? { ...a, estado: 'enBorrador', crearAsignatura: true, activa: true, etapaActual: `Paso ${draft.paso} de 3`, ultimaActividad: 'Ahora mismo' }
            : a
        ),
      };
    }));
    this.router.navigate(['/dashboard']);
  }

  /** Clear {@link creacionData} after Canvas has consumed it (one-shot read). */
  consumeCreacionData(): void {
    this.creacionData.set(null);
  }

  // ── Breadcrumb ────────────────────────────────────────────────

  /**
   * Returns the breadcrumb trail for a given route.
   *
   * @param ruta  One of `'herramientas'` | `'dashboard'` | `'canvas'`.
   */
  getBreadcrumb(ruta: string): { label: string; route?: string }[] {
    if (ruta === 'herramientas') return [];
    if (ruta === 'dashboard') return [
      { label: 'Generación de Asignaturas', route: '/herramientas' },
      { label: 'Dashboard' },
    ];
    if (ruta === 'canvas') return [
      { label: 'Generación de Asignaturas', route: '/herramientas' },
      { label: 'Dashboard', route: '/dashboard' },
      { label: 'Canvas' },
    ];
    return [];
  }
}

import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { titulaciones as titulacionesIniciales } from '../mock-data';

export interface AsignaturaActiva {
  titulacionId: string;
  asignaturaId: string;
}

export interface NavigateParams {
  seccion?: string;
  titulacionId?: string;
  asignaturaId?: string;
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  // ── Core state ────────────────────────────────────────────────
  readonly rolActivo = signal<string>('autor');
  readonly seccionActiva = signal<string>('t2');
  readonly panelIAabierto = signal<boolean>(true);
  readonly notifAbiertas = signal<boolean>(false);
  readonly titulaciones = signal<any[]>(titulacionesIniciales as any[]);
  readonly asignaturaActiva = signal<AsignaturaActiva>({ titulacionId: 'master-ia', asignaturaId: 'fund-ml' });
  readonly chatHistorial = signal<any[]>([]);
  readonly creacionData = signal<any>(null);
  readonly draftCreacion = signal<any>(null);

  // ── Derived ───────────────────────────────────────────────────
  readonly editable = computed(() => this.rolActivo() === 'autor');

  constructor(private router: Router) {}

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

  consumeCreacionData(): void {
    this.creacionData.set(null);
  }

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

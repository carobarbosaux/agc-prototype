import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';
import { PhIconComponent } from '../../icons/ph-icon.component';
import { roles } from '../../mock-data';

const herramientas = [
  {
    id: 'generacion',
    label: 'Generación de Asignaturas',
    descripcion: 'Crea y gestiona contenido estructurado con IA para tus asignaturas. Pipeline completo de aprobación.',
    iconName: 'BookOpen',
    activa: true,
    clickable: true,
    badge: 'Activo',
  },
  {
    id: 'actividades',
    label: 'Diseñador de Actividades',
    descripcion: 'Genera actividades de aprendizaje adaptadas a los objetivos didácticos de tu asignatura.',
    iconName: 'PencilSimple',
    activa: false,
    clickable: false,
  },
  {
    id: 'rubricas',
    label: 'Mejora de Rúbricas',
    descripcion: 'Optimiza y refina criterios de evaluación con asistencia inteligente.',
    iconName: 'ClipboardText',
    activa: false,
    clickable: false,
  },
  {
    id: 'tests',
    label: 'Generador de Tests',
    descripcion: 'Crea preguntas de evaluación alineadas con el contenido de la asignatura.',
    iconName: 'Flask',
    activa: false,
    clickable: false,
  },
  {
    id: 'corrector',
    label: 'Corrector de Actividades',
    descripcion: 'Evalúa entregas de alumnos de forma consistente y detallada.',
    iconName: 'CheckSquare',
    activa: false,
    clickable: false,
  },
];

@Component({
  selector: 'app-herramientas',
  standalone: true,
  imports: [CommonModule, PhIconComponent],
  templateUrl: './herramientas.component.html',
})
/**
 * Tools-hub landing page (Herramientas).
 *
 * Shows the catalogue of available AGC tools as interactive cards.
 * Only "Generación de Asignaturas" is currently active; the remaining
 * cards are rendered as disabled placeholders for future features.
 * Also provides the global role selector for demo switching.
 */
export class HerramientasComponent {
  readonly state = inject(AppStateService);
  readonly router = inject(Router);

  readonly roles = roles as any[];
  readonly herramientas = herramientas;
  readonly rolMenuAbierto = signal(false);

  readonly rolColors: Record<string, any> = {
    autor: { bg: '#F9FCFF', text: '#0A5CF5', border: '#0A5CF5', hoverBg: '#E6EFFF' },
    coordinador: { bg: '#F0FDF4', text: '#10B981', border: '#A7F3D0', hoverBg: '#DCFCE7' },
    editor: { bg: '#FFFBEB', text: '#F59E0B', border: '#FDE68A', hoverBg: '#FEF3C7' },
    disenador: { bg: '#E7EFFE', text: '#073676', border: '#BAD2FF', hoverBg: '#D1E3FF' },
  };

  /** Current role colour tokens (shorthand alias). */
  get rc() {
    return this.rolColors[this.state.rolActivo()] || this.rolColors['autor'];
  }

  /** Display label for the currently active role. */
  get rolActualLabel(): string {
    return (this.roles as any[]).find(r => r.id === this.state.rolActivo())?.label || 'Autor';
  }

  /** Change the active role and close the role menu. */
  selectRol(id: string): void {
    this.state.rolActivo.set(id);
    this.rolMenuAbierto.set(false);
  }

  rolBtnHover = false;
  cardHover: Record<string, boolean> = {};

  /** Apply hover styles to a clickable tool card on mouse-enter. */
  onCardEnter(id: string, el: HTMLElement, h: any): void {
    if (h.clickable) {
      el.style.background = '#F4F6FD';
      el.style.outline = '1px solid #0A5CF5';
      el.style.boxShadow = 'none';
    }
  }

  /** Restore default styles on a clickable tool card on mouse-leave. */
  onCardLeave(id: string, el: HTMLElement, h: any): void {
    if (h.clickable) {
      el.style.background = '#FBFCFF';
      el.style.outline = 'none';
      el.style.boxShadow = h.activa ? '0 4px 16px rgba(0, 152, 205, 0.10)' : 'none';
    }
  }

  /** Navigate to the tool destination when a clickable card is pressed. */
  onCardClick(h: any): void {
    if (h.clickable) {
      this.state.navigate('dashboard');
    }
  }
}

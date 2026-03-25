import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Phosphor icon SVG paths (256x256 viewBox)
const ICON_PATHS: Record<string, string> = {
  BookOpen: `<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM112,168a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h32A8,8,0,0,1,112,168Zm0-32a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h32A8,8,0,0,1,112,136Zm0-32a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h32A8,8,0,0,1,112,104Zm80,72H152a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Zm0-32H152a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Zm0-32H152a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16ZM48,96V48H208V96Z"/>`,
  PencilSimple: `<path d="M227.31,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.31,64l24-24L216,84.69Z"/>`,
  Note: `<path d="M224,72,184,32a8,8,0,0,0-5.66-2.34H48A16,16,0,0,0,32,46V210a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V77.66A8,8,0,0,0,224,72ZM184,52.69,211.31,80H184ZM208,210H48V46H168V88a8,8,0,0,0,8,8h32V210Zm-48-96a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h48A8,8,0,0,1,160,114Zm0,32a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h48A8,8,0,0,1,160,146Zm0,32a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h48A8,8,0,0,1,160,178Z"/>`,
  Exam: `<path d="M200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24ZM56,40H200V80H56ZM56,216V96H200V216Zm104-80a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h48A8,8,0,0,1,160,136Zm0,32a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h48A8,8,0,0,1,160,168Zm0,32a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h48A8,8,0,0,1,160,200ZM80,136a8,8,0,1,1,8,8A8,8,0,0,1,80,136Zm0,32a8,8,0,1,1,8,8A8,8,0,0,1,80,168Zm0,32a8,8,0,1,1,8,8A8,8,0,0,1,80,200Z"/>`,
  Check: `<path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>`,
};

interface Herramienta {
  id: string;
  label: string;
  descripcion: string;
  icon: string;
  activa: boolean;
  clickable: boolean;
  badge: string;
  hovered: boolean;
  accederHovered: boolean;
}

@Component({
  selector: 'app-herramientas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './herramientas.component.html',
  styleUrl: './herramientas.component.css',
})
export class HerramientasComponent {
  chatInput = signal('');
  notifCount = signal(3);

  // Button hover states
  notifBtnHovered = false;
  plusHovered = false;
  sendHovered = false;

  herramientas: Herramienta[] = [
    {
      id: 'generacion',
      label: 'Generación de Asignaturas',
      descripcion: 'Crea y gestiona contenido estructurado con IA para tus asignaturas. Pipeline completo de aprobación.',
      icon: ICON_PATHS['BookOpen'],
      activa: true,
      clickable: true,
      badge: 'Activo',
      hovered: false,
      accederHovered: false,
    },
    {
      id: 'actividades',
      label: 'Diseñador de Actividades',
      descripcion: 'Genera actividades de aprendizaje adaptadas a los objetivos didácticos de tu asignatura.',
      icon: ICON_PATHS['PencilSimple'],
      activa: false,
      clickable: false,
      badge: 'Inactivo',
      hovered: false,
      accederHovered: false,
    },
    {
      id: 'rubricas',
      label: 'Mejora de Rúbricas de Asignaturas',
      descripcion: 'Optimiza y refina criterios de evaluación con asistencia inteligente.',
      icon: ICON_PATHS['Note'],
      activa: false,
      clickable: false,
      badge: 'Inactivo',
      hovered: false,
      accederHovered: false,
    },
    {
      id: 'tests',
      label: 'Generador de Tests',
      descripcion: 'Crea preguntas de evaluación alineadas con el contenido de la asignatura.',
      icon: ICON_PATHS['Exam'],
      activa: false,
      clickable: false,
      badge: 'Inactivo',
      hovered: false,
      accederHovered: false,
    },
    {
      id: 'corrector',
      label: 'Corrector de Actividades',
      descripcion: 'Evalúa entregas de alumnos de forma consistente y detallada.',
      icon: ICON_PATHS['Check'],
      activa: false,
      clickable: false,
      badge: 'Inactivo',
      hovered: false,
      accederHovered: false,
    },
  ];

  onChatInput(value: string) {
    this.chatInput.set(value);
  }
}

// Onboarding Prodi — slide data
// 5 slides introducing Prodi as the transversal AI assistant for Asistente de Contenidos

export interface AdditionalSection {
  label: string;
  items: string[];
}

export interface OnboardingSlide {
  id: number;
  title: string | null;
  stepLabel?: string;
  subtitle: string | null;
  body: string | null;
  titleFirst?: boolean;
  bullets: string[];
  cta: string | null;
  visualType: 'editor-zoom' | 'canvas-overview' | 'contextual-selection' | 'side-panel' | 'final-state';
  additionalSection?: AdditionalSection;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Conoce el nuevo Asistente de contenidos',
    body: 'Tu criterio profesional en el centro.',
    titleFirst: true,
    bullets: [],
    cta: null,
    subtitle: null,
    visualType: 'editor-zoom',
  },
  {
    id: 2,
    title: null,
    stepLabel: 'Genera contenido',
    subtitle: null,
    body: 'Define aspectos de tu asignatura\ny comienza a generar contenido.',
    bullets: [],
    cta: null,
    visualType: 'canvas-overview',
  },
  {
    id: 3,
    title: 'Mejora tu contenido',
    subtitle: null,
    body: 'Selecciona cualquier fragmento para usar las herramientas del asistente.',
    bullets: [
      'Corregir redacción',
      'Expandir o resumir',
      'Regenerar texto',
      'Buscar bibliografía',
      'Deep research',
    ],
    cta: null,
    visualType: 'contextual-selection',
  },
  {
    id: 4,
    title: null,
    stepLabel: 'Asistente siempre disponible',
    subtitle: null,
    body: 'Consulta al asistente en cualquier momento\ndesde el panel de IA.',
    bullets: [
      'Investigar un tema',
      'Desarrollar ideas',
    ],
    additionalSection: {
      label: 'También puedes añadir:',
      items: ['Notas personales', 'Comentarios para colaborar'],
    },
    cta: null,
    visualType: 'side-panel',
  },
  {
    id: 5,
    title: 'Empieza a crear con el asistente',
    subtitle: null,
    body: null,
    bullets: [],
    cta: 'Comenzar',
    visualType: 'final-state',
  },
];

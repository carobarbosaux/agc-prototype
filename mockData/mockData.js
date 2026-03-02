// mockData.js — All hardcoded data for AGC 2.0 prototype with subject creation
// No API calls, no localStorage, no dynamic data
// Hierarchical structure: titulaciones > asignaturas > temas > bloques

export const currentUser = {
  id: 'user-001',
  name: 'Ana Lucía Martínez',
  role: 'autor',
  avatar: 'AL',
  email: 'ana.martinez@unir.edu',
}

export const roles = [
  { id: 'autor', label: 'Autor', description: 'Crea y edita contenido' },
  { id: 'coordinador', label: 'Coordinador', description: 'Revisa y aprueba' },
  { id: 'editor', label: 'Editor de contenido', description: 'Revisa y comenta' },
  { id: 'disenador', label: 'Diseñador instruccional', description: 'Enriquece formato' },
]

export const dashboardStats = {
  autor: [
    { label: 'Asignaturas en borrador', value: 2, color: 'borrador', filter: 'borrador' },
    { label: 'Con comentarios pendientes', value: 1, color: 'comentarios', filter: 'comentarios' },
    { label: 'Aprobadas esta semana', value: 1, color: 'aprobado', filter: 'aprobado' },
  ],
  coordinador: [
    { label: 'Pendientes de aprobación', value: 1, color: 'revision', filter: 'revision' },
    { label: 'Con comentario crítico', value: 1, color: 'comentarios', filter: 'comentarios' },
    { label: 'Ya aprobadas', value: 3, color: 'aprobado', filter: 'aprobado' },
  ],
  editor: [
    { label: 'En revisión activa', value: 2, color: 'revision', filter: 'revision' },
    { label: 'Listos para enriquecer', value: 1, color: 'borrador', filter: 'borrador' },
    { label: 'Publicados', value: 5, color: 'aprobado', filter: 'aprobado' },
  ],
  disenador: [
    { label: 'Listos para enriquecer', value: 2, color: 'aprobado', filter: 'aprobado' },
    { label: 'Con sugerencias aplicadas', value: 1, color: 'aprobado', filter: 'aprobado' },
    { label: 'En progreso', value: 1, color: 'borrador', filter: 'borrador' },
  ],
}

// Preguntas para creación de asignatura (7 preguntas clave del flujo optimizado)
// Basadas en la tabla "Para autor" y el flujo "Propuesta nuevo Flujo"
export const preguntasCreacion = [
  {
    id: 'q1',
    paso: 1,
    pregunta: 'Nivel de estudio',
    descripcion: 'Desplegable: Grado, Posgrado, Máster, Especialista, Diplomado, Título propio',
    tipo: 'select',
    opciones: ['Grado', 'Posgrado', 'Máster', 'Especialista', 'Diplomado', 'Título propio'],
    requerida: true,
  },
  {
    id: 'q2',
    paso: 1,
    pregunta: 'Público objetivo',
    descripcion: 'Describe brevemente quién va a estudiar esta asignatura',
    tipo: 'textarea',
    placeholder: 'Ej: Estudiantes de MBA en administración con experiencia profesional',
    requerida: true,
  },
  {
    id: 'q3',
    paso: 1,
    pregunta: 'Número de créditos',
    descripcion: 'Input numérico: 1-12',
    tipo: 'number',
    min: 1,
    max: 12,
    requerida: true,
  },
  {
    id: 'q4',
    paso: 1,
    pregunta: 'Temas a tratar',
    descripcion: 'Lista los temas principales que debe cubrir esta asignatura',
    tipo: 'textarea',
    placeholder: 'Ej: Concepto de IA, Machine Learning, Deep Learning, Aplicaciones prácticas',
    requerida: true,
  },
  {
    id: 'q5',
    paso: 2,
    pregunta: 'Área de conocimiento',
    descripcion: 'Desplegable: Educación, Empresa, Derecho, Tecnología, Salud, Humanidades, Ciencias',
    tipo: 'select',
    opciones: ['Educación', 'Empresa', 'Derecho', 'Tecnología', 'Salud', 'Humanidades', 'Ciencias'],
    requerida: true,
    nota: 'Se usa para generar el resumen preliminar y sugerir tags temáticos',
  },
  {
    id: 'q6',
    paso: 2,
    pregunta: 'Tipo de asignatura',
    descripcion: 'Desplegable: Cuantitativa, Cualitativa, Mixta',
    tipo: 'select',
    opciones: ['Cuantitativa', 'Cualitativa', 'Mixta'],
    requerida: true,
  },
  {
    id: 'q7',
    paso: 2,
    pregunta: 'Enfoque de la asignatura',
    descripcion: 'Desplegable: Teórico, Práctico, Teórico-práctico, Basado en casos, Basado en proyectos',
    tipo: 'select',
    opciones: ['Teórico', 'Práctico', 'Teórico-práctico', 'Basado en casos', 'Basado en proyectos'],
    requerida: true,
  },
]

// Estructura jerárquica: titulaciones > asignaturas > temas > bloques
export const titulaciones = [
  {
    id: 'master-ia',
    nombre: 'Máster en Inteligencia Artificial',
    navegable: true,
    asignaturas: [
      {
        id: 'fund-ml',
        nombre: 'Fundamentos de Machine Learning',
        resumen: 'Introducción completa a los conceptos fundamentales del machine learning, desde la teoría hasta la aplicación práctica en contextos reales.',
        objetivos: [
          'Comprender los principios básicos del aprendizaje automático',
          'Aplicar técnicas supervisadas y no supervisadas a problemas reales',
          'Evaluar modelos usando métricas estándar de rendimiento',
          'Identificar cuándo usar cada tipo de algoritmo',
        ],
        tags: ['Machine Learning', 'Concepto', 'Fundamentos'],
        etapaActual: 'Temario · Tema 2',
        estado: 'borrador',
        pendienteDe: 'tú',
        ultimaActividad: 'Hace 2 horas',
        activa: true,
        preguntas: {
          tipoEstudio: 'posgrado',
          areaConocimiento: 'Tecnología',
          nivelEducativo: 'intermedio',
          creditos: 6,
          noBloques: 4,
          noTemasExtension: '6 temas, 15-20 minutos cada uno',
          tipoAsignatura: 'cuantitativa',
          enfoque: 'teórico-práctico',
          competencias: 'Capacidad de análisis de datos, comprensión de algoritmos, pensamiento crítico en selección de modelos',
          metodologia: 'Clases expositivas, ejercicios prácticos, casos de estudio reales, laboratorios computacionales',
          temasObligatorios: 'Regresión, Clasificación, Evaluación y validación de modelos, Validación cruzada',
        },
        temas: [
          { 
            id: 't1', 
            label: 'Tema 1: Introducción al aprendizaje automático', 
            estado: 'revision',
            bloques: [
              {
                id: 'b1-t1',
                contenido: 'El aprendizaje automático es una rama de la inteligencia artificial que permite a los sistemas aprender de los datos sin ser programados explícitamente. En lugar de seguir un conjunto de instrucciones predefinidas, los sistemas de machine learning descubren patrones en los datos.',
                etiquetas: ['Machine Learning', 'Concepto', 'Fundamentos'],
                comentarios: [],
              },
              {
                id: 'b2-t1',
                contenido: 'Existen tres tipos principales de aprendizaje: supervisado, no supervisado y por refuerzo. El aprendizaje supervisado utiliza datos etiquetados. El aprendizaje no supervisado encuentra patrones sin etiquetar.',
                etiquetas: ['Machine Learning', 'Tipos'],
                comentarios: [
                  {
                    id: 'c1',
                    autor: 'Carlos Mendoza',
                    rol: 'coordinador',
                    avatar: 'CM',
                    gravedad: 'critico',
                    texto: 'Necesitas una referencia académica para esta categorización. Sugiero citar Goodfellow et al. (2016).',
                    resuelto: false,
                    timestamp: '2026-02-26T10:30:00Z',
                    respuestas: [],
                  }
                ],
              },
            ]
          },
          { 
            id: 't2', 
            label: 'Tema 2: Regresión y clasificación', 
            estado: 'borrador', 
            activo: true,
            bloques: [
              {
                id: 'b1-t2',
                contenido: 'La regresión y la clasificación son las dos tareas supervisadas fundamentales del machine learning. En la regresión, el objetivo es predecir un valor numérico continuo. En la clasificación, el objetivo es asignar una categoría discreta.',
                etiquetas: ['Machine Learning', 'Concepto'],
                comentarios: [],
              },
              {
                id: 'b2-t2',
                contenido: 'Un ejemplo clásico de regresión lineal es predecir el precio de una vivienda en función de su superficie. La ecuación resultante, y = mx + b, nos permite estimar el precio de cualquier vivienda.',
                etiquetas: ['Machine Learning', 'Ejemplo'],
                comentarios: [],
              },
            ]
          },
          { id: 't3', label: 'Tema 3: Árboles de decisión y ensemble methods', estado: 'bloqueado', bloques: [] },
          { id: 't4', label: 'Tema 4: Redes neuronales básicas', estado: 'bloqueado', bloques: [] },
          { id: 't5', label: 'Tema 5: Evaluación y validación de modelos', estado: 'bloqueado', bloques: [] },
          { id: 't6', label: 'Tema 6: Proyecto práctico', estado: 'bloqueado', bloques: [] },
        ]
      },
      { 
        id: 'deep-learning', 
        nombre: 'Deep Learning y Redes Neuronales', 
        resumen: 'Exploración avanzada de redes neuronales profundas y sus aplicaciones en visión y lenguaje.',
        objetivos: ['Diseñar arquitecturas de redes neuronales', 'Entrenar modelos con datos grandes'],
        tags: ['Deep Learning', 'Redes Neuronales', 'Avanzado'],
        etapaActual: 'Índice', 
        estado: 'porComenzar', 
        pendienteDe: 'tú', 
        ultimaActividad: '—',
        temas: [],
      },
      { 
        id: 'nlp', 
        nombre: 'Procesamiento del Lenguaje Natural', 
        resumen: 'Introducción a técnicas NLP para análisis de texto y comprensión del lenguaje.',
        objetivos: ['Procesar y analizar texto', 'Construir modelos de lenguaje'],
        tags: ['NLP', 'Lenguaje Natural', 'Intermedio'],
        etapaActual: 'Índice', 
        estado: 'porComenzar', 
        pendienteDe: 'tú', 
        ultimaActividad: '—',
        temas: [],
      },
      { 
        id: 'vision', 
        nombre: 'Visión por Computador', 
        resumen: 'Técnicas para procesamiento y análisis de imágenes digitales.',
        objetivos: ['Analizar imágenes digitales', 'Detectar objetos y patrones'],
        tags: ['Visión', 'Imágenes', 'Intermedio'],
        etapaActual: 'Índice', 
        estado: 'porComenzar', 
        pendienteDe: 'tú', 
        ultimaActividad: '—',
        temas: [],
      },
      { 
        id: 'etica', 
        nombre: 'IA Ética y Regulación', 
        resumen: 'Consideraciones éticas y regulatorias en sistemas de IA y GDPR.',
        objetivos: ['Entender implicaciones éticas', 'Cumplir regulaciones'],
        tags: ['Ética', 'Regulación', 'Fundamental'],
        etapaActual: 'Índice', 
        estado: 'porComenzar', 
        pendienteDe: 'tú', 
        ultimaActividad: '—',
        temas: [],
      },
      { 
        id: 'mlops', 
        nombre: 'MLOps y Despliegue de Modelos', 
        resumen: 'Operacionalización de modelos de machine learning en producción con DevOps.',
        objetivos: ['Desplegar modelos', 'Monitorear en producción'],
        tags: ['MLOps', 'Despliegue', 'Avanzado'],
        etapaActual: 'Índice', 
        estado: 'porComenzar', 
        pendienteDe: 'tú', 
        ultimaActividad: '—',
        temas: [],
      },
      { 
        id: 'tfm', 
        nombre: 'Proyecto Final de Máster', 
        resumen: 'Trabajo final aplicando todos los conocimientos adquiridos en el programa.',
        objetivos: ['Aplicar conceptos integrados', 'Demostrar maestría del programa'],
        tags: ['Proyecto', 'Integración', 'Final'],
        etapaActual: 'Índice', 
        estado: 'porComenzar', 
        pendienteDe: 'tú', 
        ultimaActividad: '—',
        temas: [],
      },
    ]
  },
  { 
    id: 'master-daa', 
    nombre: 'Máster en Data Analytics Avanzado', 
    navegable: true,
    asignaturas: [
      { 
        id: 'analytics-1', 
        nombre: 'Fundamentos de Analytics', 
        resumen: 'Base de datos y análisis descriptivo',
        objetivos: [],
        tags: [],
        etapaActual: 'Índice', 
        estado: 'porComenzar', 
        pendienteDe: 'tú', 
        ultimaActividad: '—',
        temas: [],
      },
    ]
  },
  { 
    id: 'master-ciberseguridad', 
    nombre: 'Máster en Ciberseguridad', 
    navegable: true,
    asignaturas: [],
  },
  { 
    id: 'master-cloud', 
    nombre: 'Máster en Cloud Computing', 
    navegable: true,
    asignaturas: [],
  },
  { 
    id: 'especialista-ia', 
    nombre: 'Especialista en Inteligencia Artificial', 
    navegable: true,
    asignaturas: [],
  },
  { 
    id: 'diplomado-data', 
    nombre: 'Diplomado en Data Science', 
    navegable: true,
    asignaturas: [],
  },
]

// Pipeline structure for subject
export const pipelineTemplate = [
  { id: 'resumen', label: 'Resumen', estado: 'borrador', tipo: 'seccion' },
  { id: 'indice', label: 'Índice', estado: 'porComenzar', tipo: 'seccion' },
  { id: 'instrucciones', label: 'Instrucciones didácticas', estado: 'porComenzar', tipo: 'seccion' },
  {
    id: 'temario', label: 'Temario', estado: 'porComenzar', tipo: 'grupo',
    temas: [
      { id: 't1', label: 'Tema 1', estado: 'porComenzar' },
      { id: 't2', label: 'Tema 2', estado: 'porComenzar' },
      { id: 't3', label: 'Tema 3', estado: 'bloqueado' },
    ]
  },
  { id: 'recursos', label: 'Recursos a fondo', estado: 'bloqueado', tipo: 'seccion' },
  { id: 'test', label: 'Test de evaluación', estado: 'bloqueado', tipo: 'seccion' },
]

export const chatHistorialTema2 = [
  { id: 'm1', autor: 'Ana Lucía', role: 'autor', texto: '¿Cómo puedo hacer este párrafo más accesible para principiantes?', timestamp: '2026-02-26T14:00:00Z' },
  { id: 'm2', autor: 'AGC IA', role: 'ia', texto: 'Sugiero simplificar los conceptos matemáticos y añadir más ejemplos visuales. ¿Quieres que reformule el párrafo?', timestamp: '2026-02-26T14:01:00Z' },
]

export const chatHistorialTema1 = [
  { id: 'm1', autor: 'Ana Lucía', role: 'autor', texto: 'He añadido la referencia de Goodfellow. ¿Es suficiente?', timestamp: '2026-02-26T11:15:00Z' },
  { id: 'm2', autor: 'AGC IA', role: 'ia', texto: 'Sí, esa referencia es perfecta. También te recomendaría añadir un ejemplo práctico.', timestamp: '2026-02-26T11:16:00Z' },
]

export const respuestasIA = [
  'Sugiero restructurar este párrafo para mayor claridad. ¿Quieres que lo haga?',
  'Excelente punto. Te recomiendo añadir una visualización que muestre este concepto.',
  'Esta sección está bien. Considera añadir un ejemplo práctico para mejorar la comprensión.',
  'Podrías expandir esto con más detalles sobre casos de uso reales.',
  'Muy bien escrito. ¿Necesitas ayuda con la siguiente sección?',
]

export const notificaciones = [
  {
    id: 'n1',
    tipo: 'comentarios',
    asignatura: 'Fundamentos de ML',
    seccion: 'Tema 1',
    mensaje: 'El Coordinador solicitó correcciones · 1 crítico',
    tiempo: 'Hace 1 hora',
    accionRequerida: true,
    link: 'canvas-t1',
  },
  {
    id: 'n2',
    tipo: 'aprobado',
    asignatura: 'Fundamentos de ML',
    seccion: 'Índice',
    mensaje: 'Aprobado ✓ — Instrucciones desbloqueadas',
    tiempo: 'Hace 3 días',
    accionRequerida: false,
    link: 'canvas-instrucciones',
  },
  {
    id: 'n3',
    tipo: 'info',
    asignatura: 'Deep Learning',
    seccion: 'Índice',
    mensaje: 'Asignatura disponible para comenzar',
    tiempo: 'Hace 1 semana',
    accionRequerida: false,
    link: 'dashboard',
  },
]

export const estadoConfig = {
  porComenzar: {
    bg: 'bg-slate-50',
    text: 'text-slate-500',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    label: 'Por comenzar',
  },
  bloqueado: {
    bg: 'bg-slate-50',
    text: 'text-slate-500',
    border: 'border-slate-200',
    dot: 'bg-slate-300',
    label: 'Bloqueado',
  },
  borrador: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
    label: 'Borrador',
  },
  revision: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'En revisión',
  },
  comentarios: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-200',
    dot: 'bg-orange-500',
    label: 'Comentarios',
  },
  aprobado: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200',
    dot: 'bg-green-500',
    label: 'Aprobado',
  },
  publicado: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'Publicado',
  },
}

export const gravedadConfig = {
  critico: {
    color: '#EF4444',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    label: 'Crítico',
    icon: '🔴',
  },
  importante: {
    color: '#F97316',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    label: 'Importante',
    icon: '🟠',
  },
  sugerencia: {
    color: '#EAB308',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    label: 'Sugerencia',
    icon: '🟡',
  },
  nota: {
    color: '#3B82F6',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    label: 'Nota',
    icon: '🔵',
  },
}

export const etiquetasDisponibles = [
  'Machine Learning',
  'Deep Learning',
  'Concepto',
  'Ejemplo',
  'Caso de uso',
  'Código',
  'Algoritmo',
  'Fundamentos',
  'Avanzado',
  'Práctica',
]

export const herramientas = [
  {
    id: 'h1',
    nombre: 'Generación de Asignaturas',
    descripcion: 'Crea asignaturas completas con índice y temario',
    icono: 'BookOpen',
    estado: 'activa',
    clickeable: true,
  },
  {
    id: 'h2',
    nombre: 'Diseñador de Actividades',
    descripcion: 'Genera actividades prácticas y evaluaciones',
    icono: 'Lightbulb',
    estado: 'proximamente',
    clickeable: false,
  },
  {
    id: 'h3',
    nombre: 'Mejora de Rúbricas',
    descripcion: 'Enriquece y optimiza tus rúbricas de evaluación',
    icono: 'CheckCircle2',
    estado: 'proximamente',
    clickeable: false,
  },
  {
    id: 'h4',
    nombre: 'Generador de Tests',
    descripcion: 'Crea tests adaptativos basados en el contenido',
    icono: 'HelpCircle',
    estado: 'proximamente',
    clickeable: false,
  },
  {
    id: 'h5',
    nombre: 'Corrector de Actividades',
    descripcion: 'Revisa y mejora la calidad de las actividades',
    icono: 'Sparkles',
    estado: 'proximamente',
    clickeable: false,
  },
]

// Sugerencias de tags según respuestas
export const tagsSugerenciasPorArea = {
  Tecnología: ['Machine Learning', 'Deep Learning', 'Algoritmo', 'Código', 'Fundamentos'],
  Educación: ['Pedagogía', 'Métodos', 'Evaluación', 'Competencias'],
  Empresa: ['Casos de uso', 'Aplicación profesional', 'ROI', 'Estrategia'],
  Derecho: ['Regulación', 'Cumplimiento', 'Ética', 'Normativa'],
  Salud: ['Práctica clínica', 'Evidencia', 'Casos clínicos', 'Protocolos'],
}

// Comandos con shortcuts para el chatbar
export const shortcutsComandos = [
  { 
    comando: '/generar-asignatura', 
    label: 'Generar asignatura', 
    descripcion: 'Crea una nueva asignatura con wizard guiado',
    icono: 'BookOpen',
  },
  { 
    comando: '/mejora-rúbricas', 
    label: 'Mejora de rúbricas', 
    descripcion: 'Optimiza y enriquece tus rúbricas de evaluación',
    icono: 'CheckCircle2',
  },
  { 
    comando: '/diseñador-actividades', 
    label: 'Diseñador de actividades', 
    descripcion: 'Genera actividades prácticas y ejercicios',
    icono: 'Lightbulb',
  },
  { 
    comando: '/crear-test', 
    label: 'Crear test', 
    descripcion: 'Tests adaptativos basados en el contenido',
    icono: 'HelpCircle',
  },
  { 
    comando: '/corregir-actividades', 
    label: 'Corregir actividades', 
    descripcion: 'Revisa y mejora la calidad de las actividades',
    icono: 'Sparkles',
  },
]

// Respuestas simuladas del chatbar para mensajes generales
export const respuestasIAChatbar = [
  'Puedo ayudarte a generar una asignatura con `/generar-asignatura`',
  '¿Necesitas mejorar alguna rúbrica? Usa `/mejora-rúbricas` para optimizarlas',
  '¿Quieres crear actividades? Intenta `/diseñador-actividades`',
  'Veo que tienes trabajo pendiente. ¿Te ayudo a generar contenido nuevo?',
  'Usa `/` para ver los comandos disponibles y crear contenido más rápido',
]

// Mis pendientes en el dashboard
export const misPendientes = [
  { 
    id: 'p1', 
    gravedad: 'critico', 
    nombre: 'Revisar Tema 1', 
    asignatura: 'Fundamentos ML', 
    asignaturaId: 'fund-ml', 
    seccion: 't1',
    timestamp: '2026-02-26T10:30:00Z',
  },
  { 
    id: 'p2', 
    gravedad: 'importante', 
    nombre: 'Responder comentarios', 
    asignatura: 'Fundamentos ML', 
    asignaturaId: 'fund-ml', 
    seccion: 't2',
    timestamp: '2026-02-26T14:00:00Z',
  },
  { 
    id: 'p3', 
    gravedad: 'sugerencia', 
    nombre: 'Mejorar descripción del resumen', 
    asignatura: 'Deep Learning', 
    asignaturaId: 'deep-learning', 
    seccion: 'resumen',
    timestamp: '2026-02-25T09:15:00Z',
  },
]

// Tags para filtros rápidos en dashboard
export const tagsFiltrabledashboard = [
  { id: 'todos', label: 'Todos', filter: null },
  { id: 'pendientes', label: 'Pendientes de acción', filter: 'pendiente' },
  { id: 'revision', label: 'En revisión', filter: 'revision' },
  { id: 'aprobadas', label: 'Aprobadas', filter: 'aprobado' },
  { id: 'borrador', label: 'En borrador', filter: 'borrador' },
]

// Indicadores de Calidad de Contenidos para Dashboard
export const calidadContenidosIndicadores = {
  alertasNormativas: 6,
  revisionProfunda: 21,
  iseMediaPonderado: 3.9,
  asignaturasEstadoCritico: 3,
  estables: 62,
  enRiesgo: 41,
}

// Detalles de alertas normativas por asignatura
export const alertasNormativasPorAsignatura = {
  'fund-ml': {
    totalAlertas: 2,
    alertas: [
      {
        id: 'a1',
        tipo: 'Citación incorrecta',
        norma: 'APA',
        bloques: ['b2-t2'],
        severidad: 'critico',
      },
      {
        id: 'a2',
        tipo: 'Contenido desactualizado',
        norma: 'Estándar actualización anual',
        bloques: ['b1-t1'],
        severidad: 'importante',
      },
    ],
  },
  'deep-learning': {
    totalAlertas: 1,
    alertas: [
      {
        id: 'a3',
        tipo: 'Falta referencia académica',
        norma: 'Estándar UNIR',
        bloques: [],
        severidad: 'importante',
      },
    ],
  },
}

// Tags de gravedad para comentarios (ahora con Alerta normativa)
export const gravedadConfig = {
  critico: {
    color: '#EF4444',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    label: 'Crítico',
    icon: '🔴',
    bloqueaAprobacion: true,
  },
  importante: {
    color: '#F97316',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    label: 'Importante',
    icon: '🟠',
    bloqueaAprobacion: false,
  },
  sugerencia: {
    color: '#EAB308',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    label: 'Sugerencia',
    icon: '🟡',
    bloqueaAprobacion: false,
  },
  nota: {
    color: '#3B82F6',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    label: 'Nota',
    icon: '🔵',
    bloqueaAprobacion: false,
  },
  alertaNormativa: {
    color: '#DC2626',
    bgColor: 'bg-red-100',
    textColor: 'text-red-900',
    label: 'Alerta normativa',
    icon: '🔺',
    bloqueaAprobacion: true,
  },
}

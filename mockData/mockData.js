// mockData.js — All hardcoded data for AGC 2.0 prototype
// No API calls, no localStorage, no dynamic data

export const currentUser = {
  id: 'user-001',
  name: 'Ana Lucía Martínez',
  role: 'autor', // 'autor' | 'coordinador' | 'editor' | 'disenador'
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

export const titulaciones = [
  {
    id: 'master-ia',
    nombre: 'Máster en Inteligencia Artificial',
    navegable: true,
    asignaturas: [
      {
        id: 'fund-ml',
        nombre: 'Fundamentos de Machine Learning',
        etapaActual: 'Temario · Tema 2',
        estado: 'borrador',
        pendienteDe: 'tú',
        ultimaActividad: 'Hace 2 horas',
        activa: true,
      },
      { id: 'deep-learning', nombre: 'Deep Learning y Redes Neuronales', etapaActual: 'Índice', estado: 'porComenzar', pendienteDe: 'tú', ultimaActividad: '—' },
      { id: 'nlp', nombre: 'Procesamiento del Lenguaje Natural', etapaActual: 'Índice', estado: 'porComenzar', pendienteDe: 'tú', ultimaActividad: '—' },
      { id: 'vision', nombre: 'Visión por Computador', etapaActual: 'Índice', estado: 'porComenzar', pendienteDe: 'tú', ultimaActividad: '—' },
      { id: 'etica', nombre: 'IA Ética y Regulación', etapaActual: 'Índice', estado: 'porComenzar', pendienteDe: 'tú', ultimaActividad: '—' },
      { id: 'mlops', nombre: 'MLOps y Despliegue de Modelos', etapaActual: 'Índice', estado: 'porComenzar', pendienteDe: 'tú', ultimaActividad: '—' },
      { id: 'tfm', nombre: 'Proyecto Final de Máster', etapaActual: 'Índice', estado: 'porComenzar', pendienteDe: 'tú', ultimaActividad: '—' },
    ]
  },
  { id: 'master-daa', nombre: 'Máster en Data Analytics Avanzado', navegable: false },
  { id: 'master-ciberseguridad', nombre: 'Máster en Ciberseguridad', navegable: false },
  { id: 'master-cloud', nombre: 'Máster en Cloud Computing', navegable: false },
  { id: 'especialista-ia', nombre: 'Especialista en Inteligencia Artificial', navegable: false },
  { id: 'diplomado-data', nombre: 'Diplomado en Data Science', navegable: false },
]

export const pipeline = [
  { id: 'indice', label: 'Índice', estado: 'aprobado', tipo: 'seccion' },
  { id: 'instrucciones', label: 'Instrucciones didácticas', estado: 'aprobado', tipo: 'seccion' },
  {
    id: 'temario', label: 'Temario', estado: 'borrador', tipo: 'grupo',
    temas: [
      { id: 't1', label: 'Tema 1: Introducción al aprendizaje automático', estado: 'revision' },
      { id: 't2', label: 'Tema 2: Regresión y clasificación', estado: 'borrador', activo: true },
      { id: 't3', label: 'Tema 3: Árboles de decisión y ensemble methods', estado: 'bloqueado' },
      { id: 't4', label: 'Tema 4: Redes neuronales básicas', estado: 'bloqueado' },
      { id: 't5', label: 'Tema 5: Evaluación y validación de modelos', estado: 'bloqueado' },
      { id: 't6', label: 'Tema 6: Proyecto práctico', estado: 'bloqueado' },
    ]
  },
  { id: 'recursos-t1', label: 'Recursos a fondo · Tema 1', estado: 'bloqueado', tipo: 'seccion' },
  { id: 'test-t1', label: 'Test de evaluación · Tema 1', estado: 'bloqueado', tipo: 'seccion' },
]

export const bloquesTema2 = [
  {
    id: 'b1',
    contenido: 'La regresión y la clasificación son las dos tareas supervisadas fundamentales del machine learning. En la regresión, el objetivo es predecir un valor numérico continuo, como el precio de una vivienda o la temperatura de mañana. En la clasificación, el objetivo es asignar una categoría discreta, como determinar si un email es spam o si una imagen contiene un gato.',
    etiquetas: ['Machine Learning', 'Concepto'],
    comentarios: [],
  },
  {
    id: 'b2',
    contenido: 'Un ejemplo clásico de regresión lineal es predecir el precio de una vivienda en función de su superficie. Si representamos los datos en un gráfico, la regresión lineal encuentra la recta que mejor se ajusta a los puntos. La ecuación resultante, y = mx + b, nos permite estimar el precio de cualquier vivienda conociendo únicamente su tamaño.',
    etiquetas: ['Machine Learning', 'Ejemplo'],
    comentarios: [],
  },
]

export const bloquesTema1 = [
  {
    id: 'b1-t1',
    contenido: 'El aprendizaje automático es una rama de la inteligencia artificial que permite a los sistemas aprender de los datos sin ser programados explícitamente. En lugar de seguir un conjunto de instrucciones predefinidas, los sistemas de machine learning descubren patrones en los datos y utilizan esos patrones para hacer predicciones o tomar decisiones.',
    etiquetas: ['Machine Learning', 'Concepto', 'Fundamentos'],
    comentarios: [],
  },
  {
    id: 'b2-t1',
    contenido: 'Existen tres tipos principales de aprendizaje: supervisado, no supervisado y por refuerzo. El aprendizaje supervisado utiliza datos etiquetados para entrenar el modelo. El aprendizaje no supervisado encuentra patrones en datos sin etiquetar. El aprendizaje por refuerzo entrena agentes a través de recompensas y castigos.',
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

export const chatHistorialTema2 = [
  { id: 'm1', autor: 'Ana Lucía', role: 'autor', texto: '¿Cómo puedo hacer este párrafo más accesible para principiantes?', timestamp: '2026-02-26T14:00:00Z' },
  { id: 'm2', autor: 'AGC IA', role: 'ia', texto: 'Sugiero simplificar los conceptos matemáticos y añadir más ejemplos visuales. ¿Quieres que reformule el párrafo?', timestamp: '2026-02-26T14:01:00Z' },
]

export const chatHistorialTema1 = [
  { id: 'm1', autor: 'Ana Lucía', role: 'autor', texto: 'He añadido la referencia de Goodfellow. ¿Es suficiente?', timestamp: '2026-02-26T11:15:00Z' },
  { id: 'm2', autor: 'AGC IA', role: 'ia', texto: 'Sí, esa referencia es perfecta. También te recomendaría añadir un ejemplo práctico de cómo funciona cada tipo de aprendizaje.', timestamp: '2026-02-26T11:16:00Z' },
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

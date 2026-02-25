// mockData.js — AGC 2.0 Prototype · UNIR 2026

export const currentUser = {
  name: 'Ana Lucía Martínez',
  role: 'autor',
  avatar: 'AL',
}

export const dashboardStats = {
  autor: [
    { label: 'Asignaturas en borrador', value: 2, estado: 'borrador', filter: 'borrador' },
    { label: 'Con comentarios pendientes', value: 1, estado: 'comentarios', filter: 'comentarios' },
    { label: 'Aprobadas esta semana', value: 1, estado: 'aprobado', filter: 'aprobado' },
  ],
  coordinador: [
    { label: 'Pendientes de aprobación', value: 1, estado: 'revision', filter: 'revision' },
    { label: 'Con comentario crítico', value: 1, estado: 'comentarios', filter: 'comentarios' },
    { label: 'Aprobadas este mes', value: 3, estado: 'aprobado', filter: 'aprobado' },
  ],
  editor: [
    { label: 'Revisiones activas', value: 2, estado: 'revision', filter: 'revision' },
    { label: 'Comentarios pendientes', value: 1, estado: 'comentarios', filter: 'comentarios' },
    { label: 'Revisadas esta semana', value: 1, estado: 'aprobado', filter: 'aprobado' },
  ],
  disenador: [
    { label: 'Para enriquecer', value: 3, estado: 'aprobado', filter: 'aprobado' },
    { label: 'Sugerencias enviadas', value: 2, estado: 'revision', filter: 'revision' },
    { label: 'Aceptadas este mes', value: 1, estado: 'aprobado', filter: 'aprobado' },
  ],
}

export const titulaciones = [
  {
    id: 'master-ia',
    nombre: 'Máster en Inteligencia Artificial',
    asignaturas: [
      {
        id: 'fund-ml',
        nombre: 'Fundamentos de Machine Learning',
        etapaActual: 'Temario · Tema 2',
        estado: 'borrador',
        pendienteDe: { autor: 'tú', coordinador: 'Ana Lucía M.', editor: 'tú', disenador: 'tú' },
        ultimaActividad: 'Hace 2 horas',
        activa: true,
      },
      {
        id: 'deep-learning',
        nombre: 'Deep Learning y Redes Neuronales',
        etapaActual: 'Índice',
        estado: 'porComenzar',
        pendienteDe: { autor: 'tú', coordinador: 'Ana Lucía M.', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: false,
      },
      {
        id: 'nlp',
        nombre: 'Procesamiento del Lenguaje Natural',
        etapaActual: 'Índice',
        estado: 'porComenzar',
        pendienteDe: { autor: 'tú', coordinador: 'Ana Lucía M.', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: false,
      },
      {
        id: 'vision',
        nombre: 'Visión por Computador',
        etapaActual: 'Índice',
        estado: 'porComenzar',
        pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: false,
      },
      {
        id: 'etica',
        nombre: 'IA Ética y Regulación',
        etapaActual: 'Índice',
        estado: 'porComenzar',
        pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: false,
      },
      {
        id: 'mlops',
        nombre: 'MLOps y Despliegue de Modelos',
        etapaActual: 'Índice',
        estado: 'porComenzar',
        pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: false,
      },
      {
        id: 'tfm',
        nombre: 'Proyecto Final de Máster',
        etapaActual: 'Índice',
        estado: 'porComenzar',
        pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: false,
      },
    ],
  },
]

export const pipeline = [
  { id: 'indice', label: 'Índice', estado: 'aprobado', tipo: 'seccion' },
  { id: 'instrucciones', label: 'Instrucciones didácticas', estado: 'aprobado', tipo: 'seccion' },
  {
    id: 'temario',
    label: 'Temario',
    estado: 'borrador',
    tipo: 'grupo',
    temas: [
      { id: 't1', label: 'Tema 1', labelCorto: 'Introducción al aprendizaje automático', estado: 'revision' },
      { id: 't2', label: 'Tema 2', labelCorto: 'Regresión y clasificación', estado: 'borrador', activo: true },
      { id: 't3', label: 'Tema 3', labelCorto: 'Árboles de decisión y ensemble methods', estado: 'bloqueado' },
      { id: 't4', label: 'Tema 4', labelCorto: 'Redes neuronales básicas', estado: 'bloqueado' },
      { id: 't5', label: 'Tema 5', labelCorto: 'Evaluación y validación de modelos', estado: 'bloqueado' },
      { id: 't6', label: 'Tema 6', labelCorto: 'Proyecto práctico', estado: 'bloqueado' },
    ],
  },
  { id: 'recursos-t1', label: 'Recursos a fondo · Tema 1', estado: 'bloqueado', tipo: 'seccion' },
  { id: 'test-t1', label: 'Test de evaluación · Tema 1', estado: 'bloqueado', tipo: 'seccion' },
]

export const bloquesTema2 = [
  {
    id: 'b1',
    contenido:
      'La regresión y la clasificación son las dos tareas supervisadas fundamentales del machine learning. En la regresión, el objetivo es predecir un valor numérico continuo, como el precio de una vivienda o la temperatura de mañana. En la clasificación, el objetivo es asignar una categoría discreta, como determinar si un email es spam o si una imagen contiene un gato.',
    etiquetas: ['Machine Learning', 'Concepto'],
    comentarios: [],
  },
  {
    id: 'b2',
    contenido:
      'Un ejemplo clásico de regresión lineal es predecir el precio de una vivienda en función de su superficie. Si representamos los datos en un gráfico, la regresión lineal encuentra la recta que mejor se ajusta a los puntos. La ecuación resultante, y = mx + b, nos permite estimar el precio de cualquier vivienda conociendo únicamente su tamaño.',
    etiquetas: ['Machine Learning', 'Ejemplo'],
    comentarios: [
      {
        id: 'c1',
        autor: 'Carlos Mendoza',
        rol: 'Coordinador',
        avatar: 'CM',
        gravedad: 'critico',
        texto: 'Añadir referencia académica a este ejemplo. Sin fuente no se puede aprobar.',
        resuelto: false,
        respuestas: [],
        timestamp: 'Hace 1 hora',
      },
    ],
  },
]

export const bloquesTema1 = [
  {
    id: 'b1t1',
    contenido:
      'El aprendizaje automático es una rama de la inteligencia artificial que permite a los sistemas aprender y mejorar a partir de la experiencia sin ser programados explícitamente. A través de algoritmos y modelos estadísticos, los sistemas identifican patrones en los datos para tomar decisiones con una mínima intervención humana.',
    etiquetas: ['Machine Learning', 'Concepto'],
    comentarios: [],
  },
  {
    id: 'b2t1',
    contenido:
      'Existen tres paradigmas principales de aprendizaje: el aprendizaje supervisado, donde el modelo aprende de ejemplos etiquetados; el aprendizaje no supervisado, donde descubre patrones ocultos en datos sin etiquetar; y el aprendizaje por refuerzo, donde un agente aprende a tomar decisiones interactuando con un entorno.',
    etiquetas: ['Machine Learning', 'Concepto'],
    comentarios: [
      {
        id: 'c1t1',
        autor: 'Carlos Mendoza',
        rol: 'Coordinador',
        avatar: 'CM',
        gravedad: 'critico',
        texto: 'Añadir referencia académica a este bloque. Sin fuente no se puede aprobar este tema.',
        resuelto: false,
        respuestas: [],
        timestamp: 'Hace 1 hora',
      },
    ],
  },
]

export const bloquesIndice = [
  {
    id: 'bi1',
    contenido:
      'Tema 1: Introducción al aprendizaje automático — Historia, definición y aplicaciones reales del ML. Tipos de aprendizaje y paradigmas fundamentales.',
    etiquetas: ['Machine Learning', 'Estructura'],
    comentarios: [],
  },
  {
    id: 'bi2',
    contenido:
      'Tema 2: Regresión y clasificación — Algoritmos supervisados esenciales. Regresión lineal, logística y KNN. Métricas de evaluación y casos prácticos.',
    etiquetas: ['Machine Learning', 'Estructura'],
    comentarios: [],
  },
  {
    id: 'bi3',
    contenido:
      'Tema 3 al 6: Métodos avanzados — Árboles de decisión, redes neuronales, validación cruzada y proyecto final integrador.',
    etiquetas: ['Machine Learning', 'Estructura'],
    comentarios: [],
  },
]

export const bloquesInstrucciones = [
  {
    id: 'bins1',
    contenido:
      'Esta asignatura está diseñada para estudiantes con conocimientos básicos de programación en Python y estadística descriptiva. El enfoque es eminentemente práctico: cada concepto teórico va acompañado de código ejecutable y datasets reales.',
    etiquetas: ['Instrucciones', 'Metodología'],
    comentarios: [],
  },
  {
    id: 'bins2',
    contenido:
      'El ritmo sugerido es de un tema por semana. Los ejercicios de autoevaluación al final de cada tema son obligatorios. Se recomienda usar Google Colab o Jupyter Notebook para seguir los ejemplos de código.',
    etiquetas: ['Instrucciones', 'Logística'],
    comentarios: [],
  },
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
    link: 'dashboard',
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

export const chatHistorialTema2 = [
  {
    id: 'msg0',
    rol: 'ia',
    mensaje:
      'Estoy aquí para ayudarte con el Tema 2: Regresión y clasificación. Puedo generar contenido, mejorar lo que ya tienes, buscar referencias académicas o responder preguntas sobre el tema. ¿Por dónde empezamos?',
  },
]

export const chatHistorialTema1 = [
  {
    id: 'msg0',
    rol: 'ia',
    mensaje:
      'Estoy viendo el Tema 1: Introducción al aprendizaje automático. Hay un comentario crítico del Coordinador en el Bloque 2 solicitando referencias académicas. ¿Quieres que te sugiera fuentes adecuadas?',
  },
]

export const respuestasIA = [
  'He analizado el bloque. Te sugiero añadir la referencia: Bishop, C.M. (2006). *Pattern Recognition and Machine Learning*. Springer. Es la referencia estándar para este tipo de contenido.',
  'Puedo expandir este concepto con un ejemplo más detallado. ¿Quieres que lo genere en el canvas o prefieres verlo aquí primero?',
  'El contenido está bien estructurado. Considera añadir una transición más clara entre los paradigmas supervisado y no supervisado para mejorar la fluidez.',
  'Para la referencia académica que pide el Coordinador, también puedes usar: Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press. Disponible online de forma gratuita.',
  'Revisando el contexto del bloque: el tono es correcto para el nivel del Máster. Sugiero añadir un ejemplo visual — una tabla comparativa entre regresión y clasificación funcionaría muy bien aquí.',
]

export const estadoConfig = {
  porComenzar: { bg: '#F8FAFC', text: '#94A3B8', border: '#E2E8F0', label: 'Por comenzar', dot: '#CBD5E1' },
  bloqueado: { bg: '#F1F5F9', text: '#94A3B8', border: '#CBD5E1', label: 'Bloqueado', dot: '#CBD5E1' },
  borrador: { bg: '#EFF6FF', text: '#3B82F6', border: '#BFDBFE', label: 'En borrador', dot: '#3B82F6' },
  revision: { bg: '#FFFBEB', text: '#F59E0B', border: '#FDE68A', label: 'En revisión', dot: '#F59E0B' },
  comentarios: { bg: '#FFF7ED', text: '#F97316', border: '#FED7AA', label: 'Con comentarios', dot: '#F97316' },
  aprobado: { bg: '#F0FDF4', text: '#10B981', border: '#A7F3D0', label: 'Aprobado', dot: '#10B981' },
  publicado: { bg: '#ECFDF5', text: '#059669', border: '#6EE7B7', label: 'Publicado', dot: '#059669' },
}

export const gravedadConfig = {
  critico: { color: '#EF4444', bg: '#FEF2F2', border: '#FECACA', label: '🔴 Crítico', emoji: '🔴' },
  importante: { color: '#F97316', bg: '#FFF7ED', border: '#FED7AA', label: '🟠 Importante', emoji: '🟠' },
  sugerencia: { color: '#EAB308', bg: '#FEFCE8', border: '#FEF08A', label: '🟡 Sugerencia', emoji: '🟡' },
  nota: { color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE', label: '🔵 Nota', emoji: '🔵' },
}

export const roles = [
  { id: 'autor', label: 'Autor', description: 'Crea y edita contenido' },
  { id: 'coordinador', label: 'Coordinador', description: 'Revisa y aprueba' },
  { id: 'editor', label: 'Editor de contenido', description: 'Revisa y comenta' },
  { id: 'disenador', label: 'Diseñador instruccional', description: 'Sugiere mejoras de formato' },
]

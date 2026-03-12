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
    codigo: 'MIA-26',
    asignaturas_count: 7,
    navegable: true,
    asignaturas: [
      {
        id: 'fund-ml',
        nombre: 'Fundamentos de Machine Learning',
        etapaActual: 'Temario · Tema 2',
        estado: 'borrador',
        disenadorEstado: 'aprobado',
        pendienteDe: { autor: 'tú', coordinador: 'Ana Lucía M.', editor: 'tú', disenador: 'tú' },
        ultimaActividad: 'Hace 2 horas',
        activa: true,
        filial: 'Colombia',
        obsolescencia: 'ok',
        fechaObjetivo: '15 mar 2026',
      },
      {
        id: 'deep-learning',
        nombre: 'Deep Learning y Redes Neuronales',
        etapaActual: 'Sin comenzar',
        estado: 'porComenzar',
        disenadorEstado: 'aprobado',
        pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: true,
        crearAsignatura: true,
        filial: 'México',
        obsolescencia: 'requiereRevision',
        fechaObjetivo: '30 mar 2026',
      },
      {
        id: 'nlp',
        nombre: 'Procesamiento del Lenguaje Natural',
        etapaActual: 'Índice',
        estado: 'porComenzar',
        disenadorEstado: 'disenado',
        pendienteDe: { autor: 'tú', coordinador: 'Ana Lucía M.', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: false,
        filial: 'Colombia',
        obsolescencia: 'ok',
        fechaObjetivo: '—',
      },
      {
        id: 'vision',
        nombre: 'Visión por Computador',
        etapaActual: 'Índice',
        estado: 'porComenzar',
        disenadorEstado: 'porComenzar',
        pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: false,
        filial: 'España',
        obsolescencia: 'mantenimiento',
        fechaObjetivo: '—',
      },
      {
        id: 'etica',
        nombre: 'IA Ética y Regulación',
        etapaActual: 'Índice',
        estado: 'porComenzar',
        disenadorEstado: 'aprobado',
        pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: false,
        filial: 'España',
        obsolescencia: 'obsoleta',
        fechaObjetivo: '—',
      },
      {
        id: 'mlops',
        nombre: 'MLOps y Despliegue de Modelos',
        etapaActual: 'Índice',
        estado: 'porComenzar',
        disenadorEstado: 'disenado',
        pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: false,
        filial: 'México',
        obsolescencia: 'ok',
        fechaObjetivo: '—',
      },
      {
        id: 'tfm',
        nombre: 'Proyecto Final de Máster',
        etapaActual: 'Índice',
        estado: 'porComenzar',
        disenadorEstado: 'porComenzar',
        pendienteDe: { autor: 'tú', coordinador: '—', editor: '—', disenador: '—' },
        ultimaActividad: '—',
        activa: false,
        filial: 'Colombia',
        obsolescencia: 'ok',
        fechaObjetivo: '—',
      },
    ],
  },
  {
    id: 'grado-informatica',
    nombre: 'Grado en Ingeniería Informática',
    codigo: 'GII-26',
    asignaturas_count: 12,
    navegable: false,
    asignaturas: [],
  },
  {
    id: 'master-ciberseguridad',
    nombre: 'Máster en Ciberseguridad',
    codigo: 'MCS-26',
    asignaturas_count: 6,
    navegable: false,
    asignaturas: [],
  },
  {
    id: 'master-data',
    nombre: 'Máster en Data Science y Big Data',
    codigo: 'MDS-26',
    asignaturas_count: 8,
    navegable: false,
    asignaturas: [],
  },
  {
    id: 'postgrado-ux',
    nombre: 'Postgrado en UX y Diseño de Producto',
    codigo: 'PUX-26',
    asignaturas_count: 5,
    navegable: false,
    asignaturas: [],
  },
  {
    id: 'master-cloud',
    nombre: 'Máster en Cloud Computing y DevOps',
    codigo: 'MCC-26',
    asignaturas_count: 7,
    navegable: false,
    asignaturas: [],
  },
]

// Flattened work items for "Mi trabajo" view — all pending sections across all titulaciones
export const miTrabajo = [
  {
    id: 'w1',
    seccion: 'Tema 2: Regresión y clasificación',
    asignatura: 'Fundamentos de Machine Learning',
    titulacion: 'Máster en IA',
    estado: 'borrador',
    pendienteDe: 'tú',
    ultimaActividad: 'Hace 2 horas',
    activa: true,
    canvasDestino: 't2',
  },
  {
    id: 'w2',
    seccion: 'Tema 1: Introducción al aprendizaje automático',
    asignatura: 'Fundamentos de Machine Learning',
    titulacion: 'Máster en IA',
    estado: 'comentarios',
    pendienteDe: 'tú',
    ultimaActividad: 'Hace 1 hora',
    activa: true,
    canvasDestino: 't1',
    comentariosCriticos: 1,
  },
  {
    id: 'w3',
    seccion: 'Índice',
    asignatura: 'Deep Learning y Redes Neuronales',
    titulacion: 'Máster en IA',
    estado: 'porComenzar',
    pendienteDe: 'tú',
    ultimaActividad: '—',
    activa: false,
    canvasDestino: null,
  },
  {
    id: 'w4',
    seccion: 'Índice',
    asignatura: 'Procesamiento del Lenguaje Natural',
    titulacion: 'Máster en IA',
    estado: 'porComenzar',
    pendienteDe: 'tú',
    ultimaActividad: '—',
    activa: false,
    canvasDestino: null,
  },
  {
    id: 'w5',
    seccion: 'Tema 3: Redes Profundas',
    asignatura: 'Deep Learning y Redes Neuronales',
    titulacion: 'Máster en IA',
    estado: 'porComenzar',
    pendienteDe: 'tú',
    ultimaActividad: '—',
    activa: false,
    canvasDestino: null,
  },
]

export const pipeline = [
  { id: 'resumen', label: 'Resumen', estado: 'borrador', tipo: 'seccion' },
  { id: 'indice', label: 'Índice', estado: 'aprobado', tipo: 'seccion' },
  {
    id: 'tema-1',
    label: 'Tema 1',
    labelCorto: 'Introducción al aprendizaje automático',
    tipo: 'tema',
    secciones: [
      { id: 'instrucciones-t1', label: 'Instrucciones didácticas', estado: 'aprobado' },
      { id: 't1', label: 'Temario', estado: 'aprobado' },
      { id: 'recursos-t1', label: 'Recursos a fondo', estado: 'borrador' },
      { id: 'test-t1', label: 'Tests', estado: 'borrador' },
    ],
  },
  {
    id: 'tema-2',
    label: 'Tema 2',
    labelCorto: 'Regresión y clasificación',
    tipo: 'tema',
    secciones: [
      { id: 'instrucciones-t2', label: 'Instrucciones didácticas', estado: 'aprobado' },
      { id: 't2', label: 'Temario', estado: 'aprobado' },
      { id: 'recursos-t2', label: 'Recursos a fondo', estado: 'borrador' },
      { id: 'test-t2', label: 'Tests', estado: 'bloqueado' },
    ],
  },
  {
    id: 'tema-3',
    label: 'Tema 3',
    labelCorto: 'Árboles de decisión y ensemble methods',
    tipo: 'tema',
    secciones: [
      { id: 'instrucciones-t3', label: 'Instrucciones didácticas', estado: 'aprobado' },
      { id: 't3', label: 'Temario', estado: 'revision' },
      { id: 'recursos-t3', label: 'Recursos a fondo', estado: 'bloqueado' },
      { id: 'test-t3', label: 'Tests', estado: 'bloqueado' },
    ],
  },
  {
    id: 'tema-4',
    label: 'Tema 4',
    labelCorto: 'Redes neuronales básicas',
    tipo: 'tema',
    secciones: [
      { id: 'instrucciones-t4', label: 'Instrucciones didácticas', estado: 'aprobado' },
      { id: 't4', label: 'Temario', estado: 'comentarios' },
      { id: 'recursos-t4', label: 'Recursos a fondo', estado: 'bloqueado' },
      { id: 'test-t4', label: 'Tests', estado: 'bloqueado' },
    ],
  },
  {
    id: 'tema-5',
    label: 'Tema 5',
    labelCorto: 'Evaluación y validación de modelos',
    tipo: 'tema',
    secciones: [
      { id: 'instrucciones-t5', label: 'Instrucciones didácticas', estado: 'aprobado' },
      { id: 't5', label: 'Temario', estado: 'bloqueado' },
      { id: 'recursos-t5', label: 'Recursos a fondo', estado: 'bloqueado' },
      { id: 'test-t5', label: 'Tests', estado: 'bloqueado' },
    ],
  },
  {
    id: 'tema-6',
    label: 'Tema 6',
    labelCorto: 'Proyecto práctico final',
    tipo: 'tema',
    secciones: [
      { id: 'instrucciones-t6', label: 'Instrucciones didácticas', estado: 'aprobado' },
      { id: 't6', label: 'Temario', estado: 'bloqueado' },
      { id: 'recursos-t6', label: 'Recursos a fondo', estado: 'bloqueado' },
      { id: 'test-t6', label: 'Tests', estado: 'bloqueado' },
    ],
  },
]

export const bloquesTema2 = [
  {
    id: 'b0',
    tipo: 'h1',
    contenido: 'Regresión y clasificación',
    etiquetas: ['Machine Learning'],
    comentarios: [],
  },
  {
    id: 'b0b',
    tipo: 'quote',
    contenido: 'El objetivo del aprendizaje supervisado es generalizar a partir de ejemplos etiquetados para predecir con precisión sobre datos no vistos. — Tom Mitchell, 1997',
    etiquetas: ['Machine Learning', 'Cita'],
    comentarios: [],
  },
  {
    id: 'b1',
    tipo: 'p',
    contenido:
      'La regresión y la clasificación son las dos tareas supervisadas fundamentales del machine learning. En la regresión, el objetivo es predecir un valor numérico continuo —como el precio de una vivienda, la temperatura de mañana o la demanda energética de una ciudad—. En la clasificación, el objetivo es asignar una categoría discreta: determinar si un email es spam, si una imagen contiene un tumor o si un cliente abandonará el servicio.',
    etiquetas: ['Machine Learning', 'Concepto'],
    comentarios: [],
  },
  {
    id: 'b1h',
    tipo: 'h2',
    contenido: 'Regresión lineal',
    etiquetas: ['Machine Learning'],
    comentarios: [],
  },
  {
    id: 'b2',
    tipo: 'p',
    contenido:
      'Un ejemplo clásico de regresión lineal es predecir el precio de una vivienda en función de su superficie. Si representamos los datos en un gráfico, la regresión lineal encuentra la recta que minimiza el error cuadrático medio entre las predicciones y los valores reales. La ecuación resultante, ŷ = β₀ + β₁x, nos permite estimar el precio de cualquier vivienda conociendo su tamaño. Cuando intervienen múltiples variables —superficie, número de habitaciones, distancia al centro—, hablamos de regresión lineal múltiple.',
    etiquetas: ['Machine Learning', 'Ejemplo'],
    comentarios: [],
  },
  {
    id: 'b2h',
    tipo: 'h2',
    contenido: 'Regresión logística y clasificación binaria',
    etiquetas: ['Clasificación'],
    comentarios: [],
  },
  {
    id: 'b3',
    tipo: 'p',
    contenido:
      'La regresión logística, a pesar de su nombre, es un algoritmo de clasificación binaria. Transforma la salida de una regresión lineal mediante la función sigmoide σ(z) = 1 / (1 + e⁻ᶻ), produciendo una probabilidad entre 0 y 1. Si la probabilidad supera el umbral 0.5, el modelo predice la clase positiva. Es el punto de partida para comprender redes neuronales, ya que la neurona logística es su unidad básica.',
    etiquetas: ['Clasificación', 'Algoritmo'],
    comentarios: [],
  },
  {
    id: 'b3h',
    tipo: 'h3',
    contenido: 'Métricas de evaluación',
    etiquetas: ['Evaluación'],
    comentarios: [],
  },
  {
    id: 'b4',
    tipo: 'p',
    contenido:
      'Para evaluar un modelo de clasificación, la precisión global no siempre es suficiente. En datasets desbalanceados —donde una clase es mucho más frecuente que otra—, un modelo que siempre predice la clase mayoritaria puede tener 95% de precisión y ser inútil. Las métricas clave son: precisión (de los casos predichos positivos, ¿cuántos lo son realmente?), recall (de todos los casos positivos reales, ¿cuántos detectamos?) y F1-score, que combina ambas en una sola cifra. La matriz de confusión visualiza verdaderos positivos, falsos positivos, verdaderos negativos y falsos negativos.',
    etiquetas: ['Clasificación', 'Evaluación'],
    comentarios: [],
  },
  {
    id: 'b4a',
    tipo: 'ul',
    contenido: 'Precisión: de los casos predichos positivos, ¿cuántos lo son realmente?',
    etiquetas: ['Evaluación'],
    comentarios: [],
  },
  {
    id: 'b4b',
    tipo: 'ul',
    contenido: 'Recall: de todos los casos positivos reales, ¿cuántos detectamos?',
    etiquetas: ['Evaluación'],
    comentarios: [],
  },
  {
    id: 'b4c',
    tipo: 'ul',
    contenido: 'F1-score: media armónica entre precisión y recall, útil en datos desbalanceados.',
    etiquetas: ['Evaluación'],
    comentarios: [],
  },
  {
    id: 'b5',
    tipo: 'p',
    contenido:
      'El algoritmo K-Nearest Neighbors (KNN) clasifica un nuevo punto basándose en los k puntos de entrenamiento más cercanos según una métrica de distancia, habitualmente la euclidiana. Es un método perezoso —no construye un modelo explícito durante el entrenamiento—, lo que lo hace simple pero costoso en inferencia para datasets grandes. La elección de k es crítica: valores pequeños generan modelos muy sensibles al ruido (sobreajuste), mientras que valores grandes producen fronteras de decisión demasiado suavizadas (infraajuste).',
    etiquetas: ['KNN', 'Algoritmo'],
    comentarios: [],
  },
]

export const bloquesTema1 = [
  {
    id: 'b1t1',
    tipo: 'p',
    contenido:
      'El aprendizaje automático es una rama de la inteligencia artificial que permite a los sistemas aprender y mejorar a partir de la experiencia sin ser programados explícitamente para cada tarea. A través de algoritmos y modelos estadísticos, los sistemas identifican patrones en los datos y generalizan ese conocimiento para tomar decisiones sobre datos nuevos. La definición más citada es la de Tom Mitchell (1997): un programa aprende de la experiencia E con respecto a una clase de tareas T y una medida de rendimiento P, si su rendimiento en T medido con P mejora con la experiencia E.',
    etiquetas: ['Machine Learning', 'Concepto'],
    comentarios: [],
  },
  {
    id: 'b2t1',
    tipo: 'p',
    contenido:
      'Existen tres paradigmas principales de aprendizaje. En el aprendizaje supervisado, el modelo aprende de pares (entrada, etiqueta) y su objetivo es predecir la etiqueta correcta para entradas nuevas; es el más utilizado en aplicaciones industriales. En el aprendizaje no supervisado, los datos no tienen etiquetas y el algoritmo descubre estructura latente: agrupaciones, distribuciones o representaciones comprimidas. En el aprendizaje por refuerzo, un agente aprende a tomar decisiones interactuando con un entorno: recibe recompensas por acciones positivas y penalizaciones por negativas, buscando maximizar la recompensa acumulada.',
    etiquetas: ['Machine Learning', 'Paradigmas'],
    comentarios: [],
  },
  {
    id: 'b3t1',
    tipo: 'p',
    contenido:
      'El pipeline típico de un proyecto de machine learning sigue una secuencia bien definida: (1) definición del problema y recogida de datos, (2) exploración y análisis exploratorio (EDA), (3) preprocesamiento y limpieza, (4) selección e ingeniería de variables (feature engineering), (5) selección del algoritmo, (6) entrenamiento y validación cruzada, (7) optimización de hiperparámetros, (8) evaluación final sobre el conjunto de test, (9) despliegue y monitorización. Cada etapa puede consumir hasta el 80% del tiempo total del proyecto, siendo el preprocesamiento y la ingeniería de variables las más costosas.',
    etiquetas: ['Machine Learning', 'Pipeline'],
    comentarios: [],
  },
  {
    id: 'b4t1',
    tipo: 'p',
    contenido:
      'El sobreajuste (overfitting) ocurre cuando el modelo memoriza el conjunto de entrenamiento y pierde capacidad de generalización. Se detecta porque el error de entrenamiento es bajo pero el error de validación es alto. El infraajuste (underfitting) ocurre cuando el modelo es demasiado simple para capturar la estructura real de los datos. La solución al sobreajuste incluye técnicas de regularización (L1, L2), dropout en redes neuronales, y el aumento de datos. El equilibrio entre sesgo y varianza —el bias-variance tradeoff— es uno de los conceptos más importantes del ML clásico.',
    etiquetas: ['Overfitting', 'Generalización'],
    comentarios: [],
  },
]

export const bloquesTema3 = [
  {
    id: 'b1t3',
    tipo: 'h1',
    contenido: 'Árboles de decisión y ensemble methods',
    etiquetas: [],
    comentarios: [],
  },
  {
    id: 'b2t3',
    tipo: 'p',
    contenido:
      'Los árboles de decisión son modelos de aprendizaje supervisado que aprenden reglas de decisión simples inferidas de los datos de entrenamiento. Su estructura jerárquica permite interpretar fácilmente cómo el modelo toma decisiones: en cada nodo interno se evalúa una característica, y en cada hoja se produce una predicción. A pesar de su interpretabilidad, los árboles de decisión tienden al sobreajuste cuando crecen sin restricciones, lo que motivó el desarrollo de métodos ensemble que combinan múltiples árboles para mejorar la robustez.',
    etiquetas: [],
    comentarios: [],
  },
  {
    id: 'b3t3',
    tipo: 'h2',
    contenido: 'Random Forest',
    etiquetas: [],
    comentarios: [],
  },
  {
    id: 'b4t3',
    tipo: 'p',
    contenido:
      'Random Forest construye un conjunto de árboles de decisión entrenados con subconjuntos aleatorios de datos (bagging) y subconjuntos aleatorios de características en cada nodo. La predicción final se obtiene por votación mayoritaria en clasificación o por promedio en regresión. Esta aleatoriedad decorrelaciona los árboles individuales, reduciendo la varianza del modelo conjunto sin incrementar significativamente el sesgo. Es uno de los algoritmos más utilizados en competiciones de datos por su equilibrio entre rendimiento y facilidad de uso.',
    etiquetas: [],
    comentarios: [],
  },
  {
    id: 'b5t3',
    tipo: 'h2',
    contenido: 'Gradient Boosting',
    etiquetas: [],
    comentarios: [],
  },
  {
    id: 'b6t3',
    tipo: 'p',
    contenido:
      'A diferencia del bagging, el boosting construye árboles de forma secuencial: cada árbol nuevo se entrena para corregir los errores del modelo anterior. Gradient Boosting implementa este principio mediante descenso de gradiente en el espacio funcional, optimizando una función de pérdida arbitraria. Implementaciones modernas como XGBoost, LightGBM y CatBoost añaden regularización, tratamiento eficiente de valores faltantes y optimizaciones computacionales que los convierten en el estado del arte para datos tabulares estructurados.',
    etiquetas: [],
    comentarios: [],
  },
]

export const bloquesTema4 = [
  {
    id: 'b1t4',
    tipo: 'h1',
    contenido: 'Redes neuronales básicas',
    etiquetas: ['Deep Learning', 'Redes Neuronales'],
    comentarios: [
      {
        id: 'c0t4',
        autor: 'Carlos Mendoza',
        rol: 'Coordinador',
        avatar: 'CM',
        gravedad: 'nota',
        texto: 'El título está bien, pero considerar si "básicas" es el término más preciso del índice aprobado. Verificar coherencia con el epígrafe del índice.',
        resuelto: false,
        respuestas: [],
        timestamp: 'Hace 4 horas',
      },
    ],
  },
  {
    id: 'b2t4',
    tipo: 'p',
    contenido:
      'Una red neuronal artificial está inspirada en la estructura del cerebro humano. Está compuesta por capas de neuronas artificiales interconectadas: una capa de entrada que recibe los datos, una o varias capas ocultas que transforman la información, y una capa de salida que produce la predicción. Cada conexión tiene un peso asociado que se ajusta durante el entrenamiento para minimizar el error del modelo.',
    etiquetas: ['Deep Learning', 'Concepto'],
    comentarios: [
      {
        id: 'c1t4',
        autor: 'Carlos Mendoza',
        rol: 'Coordinador',
        avatar: 'CM',
        gravedad: 'importante',
        texto: 'La analogía con el cerebro humano está simplificada en exceso. Añadir nota aclaratoria sobre las diferencias fundamentales con las neuronas biológicas reales.',
        resuelto: false,
        respuestas: [],
        timestamp: 'Hace 3 horas',
      },
    ],
  },
  {
    id: 'b3t4',
    tipo: 'h2',
    contenido: 'El perceptrón y las funciones de activación',
    etiquetas: ['Deep Learning'],
    comentarios: [
      {
        id: 'c2t4',
        autor: 'Carlos Mendoza',
        rol: 'Coordinador',
        avatar: 'CM',
        gravedad: 'sugerencia',
        texto: 'Separar en dos epígrafes: "El perceptrón" y "Funciones de activación". Son conceptos suficientemente distintos para merecer tratamiento independiente.',
        resuelto: false,
        respuestas: [],
        timestamp: 'Hace 3 horas',
      },
    ],
  },
  {
    id: 'b4t4',
    tipo: 'p',
    contenido:
      'El perceptrón es la unidad computacional básica de una red neuronal. Calcula una suma ponderada de sus entradas y aplica una función de activación para decidir si "se activa" o no. Las funciones de activación introducen no-linealidad en el modelo, lo que permite aprender representaciones complejas. Las más comunes son: ReLU (Rectified Linear Unit), que es la dominante hoy por su eficiencia computacional; Sigmoid, usada en capas de salida para clasificación binaria; Softmax, para clasificación multiclase; y Tanh, que centrada en cero facilita el entrenamiento en capas ocultas.',
    etiquetas: ['Deep Learning', 'Fundamentos'],
    comentarios: [
      {
        id: 'c3t4',
        autor: 'Carlos Mendoza',
        rol: 'Coordinador',
        avatar: 'CM',
        gravedad: 'sugerencia',
        texto: 'Incluir una tabla comparativa de las funciones de activación con sus rangos de salida y casos de uso recomendados. Mejoraría notablemente la comprensión.',
        resuelto: false,
        respuestas: [],
        timestamp: 'Hace 2 horas',
      },
      {
        id: 'c4t4',
        autor: 'Carlos Mendoza',
        rol: 'Coordinador',
        avatar: 'CM',
        gravedad: 'importante',
        texto: 'No se menciona el problema del vanishing gradient, que es precisamente el motivo por el que ReLU desplazó a Sigmoid en capas ocultas. Es un contenido esencial en este epígrafe.',
        resuelto: false,
        respuestas: [],
        timestamp: 'Hace 2 horas',
      },
    ],
  },
  {
    id: 'b5t4',
    tipo: 'h2',
    contenido: 'Retropropagación y optimizadores',
    etiquetas: ['Deep Learning', 'Algoritmos'],
    comentarios: [
      {
        id: 'c5t4',
        autor: 'Carlos Mendoza',
        rol: 'Coordinador',
        avatar: 'CM',
        gravedad: 'nota',
        texto: 'Epígrafe correcto, pero asegurarse de que el desarrollo incluye al menos un ejemplo numérico sencillo de backprop para anclar el concepto.',
        resuelto: false,
        respuestas: [],
        timestamp: 'Hace 1 hora',
      },
    ],
  },
  {
    id: 'b6t4',
    tipo: 'p',
    contenido:
      'El algoritmo de retropropagación (backpropagation) calcula el gradiente de la función de pérdida respecto a cada peso de la red aplicando la regla de la cadena de forma recursiva desde la capa de salida hacia la capa de entrada. Este gradiente indica la dirección en la que hay que modificar cada peso para reducir el error. El descenso de gradiente estocástico (SGD) actualiza los pesos en mini-lotes para mayor eficiencia. Adam combina momentum y RMSprop para una convergencia más rápida y estable, siendo el optimizador por defecto en la mayoría de proyectos modernos.',
    etiquetas: ['Deep Learning', 'Optimización'],
    comentarios: [
      {
        id: 'c6t4',
        autor: 'Carlos Mendoza',
        rol: 'Coordinador',
        avatar: 'CM',
        gravedad: 'critico',
        texto: 'Falta la explicación matemática de la regla de la cadena. Este es un concepto clave del temario y no puede quedar implícito. Añadir la derivación paso a paso con notación clara.',
        resuelto: false,
        respuestas: [],
        timestamp: 'Hace 1 hora',
      },
      {
        id: 'c7t4',
        autor: 'Carlos Mendoza',
        rol: 'Coordinador',
        avatar: 'CM',
        gravedad: 'importante',
        texto: 'Comparar SGD, SGD con momentum y Adam explícitamente. Actualmente Adam aparece como si fuera la única alternativa relevante, lo que no es pedagógicamente correcto.',
        resuelto: false,
        respuestas: [],
        timestamp: 'Hace 1 hora',
      },
    ],
  },
  {
    id: 'b7t4',
    tipo: 'h2',
    contenido: 'Frameworks: PyTorch y TensorFlow',
    etiquetas: ['Deep Learning', 'Herramientas'],
    comentarios: [],
  },
  {
    id: 'b8t4',
    tipo: 'p',
    contenido:
      'PyTorch y TensorFlow son los dos frameworks dominantes para el desarrollo de redes neuronales. PyTorch, desarrollado por Meta, utiliza grafos computacionales dinámicos que facilitan la depuración y la experimentación rápida, siendo el favorito en investigación académica. TensorFlow, de Google, destaca por su ecosistema de producción: TensorFlow Serving para despliegue, TensorFlow Lite para dispositivos móviles y TensorBoard para visualización. Keras, integrado en TensorFlow desde la versión 2.0, ofrece una API de alto nivel que permite construir redes complejas con pocas líneas de código.',
    etiquetas: ['Deep Learning', 'Herramientas'],
    comentarios: [
      {
        id: 'c8t4',
        autor: 'Carlos Mendoza',
        rol: 'Coordinador',
        avatar: 'CM',
        gravedad: 'critico',
        texto: 'Este epígrafe no estaba en el índice aprobado. Si se va a incluir debe justificarse y validarse con el coordinador antes de entregarlo a revisión. Por ahora no se puede aprobar.',
        resuelto: false,
        respuestas: [],
        timestamp: 'Hace 30 minutos',
      },
    ],
  },
]

export const bloquesIndice = [
  {
    id: 'bi1',
    numero: 1,
    nombre: 'Introducción al aprendizaje automático',
    descripcion: 'Definición, historia y paradigmas del ML. Pipeline estándar de un proyecto. Conceptos de sobreajuste, infraajuste y bias-variance tradeoff.',
  },
  {
    id: 'bi2',
    numero: 2,
    nombre: 'Regresión y clasificación',
    descripcion: 'Regresión lineal y logística. Algoritmo KNN. Métricas de evaluación: MSE, RMSE, precisión, recall, F1-score y matriz de confusión.',
  },
  {
    id: 'bi3',
    numero: 3,
    nombre: 'Árboles de decisión y métodos ensemble',
    descripcion: 'Criterios de división (Gini, entropía). Random Forest y bagging. Gradient Boosting y XGBoost. Interpretabilidad de modelos basados en árboles.',
  },
  {
    id: 'bi4',
    numero: 4,
    nombre: 'Redes neuronales básicas',
    descripcion: 'Perceptrón y funciones de activación. Arquitectura feedforward. Retropropagación y optimizadores: SGD, Adam. Introducción a PyTorch y TensorFlow.',
  },
  {
    id: 'bi5',
    numero: 5,
    nombre: 'Evaluación y validación de modelos',
    descripcion: 'Validación cruzada k-fold. Grid Search, Random Search y Bayesian Optimization. Curvas ROC y AUC. Detección de data leakage.',
  },
  {
    id: 'bi6',
    numero: 6,
    nombre: 'Proyecto final integrador',
    descripcion: 'Desarrollo end-to-end de un pipeline ML sobre un dataset real. Preprocesamiento, modelado, evaluación y presentación de resultados con MLflow.',
  },
]

// Instrucciones didácticas generales (sección "Instrucciones" del pipeline)
export const bloquesInstrucciones = [
  {
    id: 'bins1',
    tipo: 'p',
    contenido:
      'Perfil del estudiante y prerrequisitos: Esta asignatura está diseñada para estudiantes del Máster en Inteligencia Artificial con conocimientos básicos de programación en Python (sintaxis, estructuras de datos, funciones) y estadística descriptiva (media, varianza, distribuciones). No se requiere experiencia previa en machine learning. Se recomienda haber completado previamente la asignatura de Fundamentos de Python del programa.',
    etiquetas: ['Instrucciones', 'Prerrequisitos'],
    comentarios: [],
  },
  {
    id: 'bins2',
    tipo: 'p',
    contenido:
      'Metodología por tema: Cada uno de los 6 temas sigue la misma estructura didáctica. Primero, una lectura conceptual con ejemplos contextualizados (este documento). Segundo, un notebook de práctica en Google Colab con código ejecutable y datasets reales —disponible en el aula virtual—. Tercero, un ejercicio de autoevaluación tipo test de 10 preguntas, obligatorio antes de avanzar al tema siguiente. El ritmo sugerido es un tema por semana, con una dedicación de 4 a 6 horas semanales.',
    etiquetas: ['Instrucciones', 'Metodología'],
    comentarios: [],
  },
  {
    id: 'bins3',
    tipo: 'p',
    contenido:
      'Herramientas y entorno de trabajo: Los ejemplos de código están escritos en Python 3.10+ con NumPy, Pandas, Matplotlib, Seaborn y Scikit-learn para los Temas 1 al 5, y PyTorch para el Tema 4. Todos los notebooks están disponibles en Google Colab. Para trabajo local, el archivo environment.yml del repositorio del curso contiene el entorno Conda completo.',
    etiquetas: ['Instrucciones', 'Herramientas'],
    comentarios: [],
  },
  {
    id: 'bins4',
    tipo: 'p',
    contenido:
      'Criterios de evaluación: El proyecto final del Tema 6 representa el 60% de la nota final. Los ejercicios de autoevaluación de los Temas 1 al 5 representan el 40% restante (8% cada uno). El proyecto se entrega en formato notebook (.ipynb) con un informe de resultados en PDF. Se valorará la claridad del análisis, la justificación de decisiones de modelado y la interpretación crítica de resultados.',
    etiquetas: ['Instrucciones', 'Evaluación'],
    comentarios: [],
  },
]

// Instrucciones didácticas por tema
export const instruccionesTema1 = [
  {
    id: 'it1-1',
    tipo: 'p',
    contenido:
      'Objetivo de aprendizaje: Al finalizar este tema, el estudiante será capaz de definir el aprendizaje automático y distinguirlo de la programación tradicional, identificar los tres paradigmas de aprendizaje (supervisado, no supervisado y por refuerzo) con ejemplos reales, y describir las etapas del pipeline estándar de un proyecto ML.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 1'],
    comentarios: [],
  },
  {
    id: 'it1-2',
    tipo: 'p',
    contenido:
      'Cómo estudiar este tema: Comienza con la lectura completa antes de abrir el notebook. Los conceptos de sesgo y varianza (bias-variance tradeoff) son fundamentales para todos los temas siguientes —dedícales tiempo extra si es necesario—. El notebook del Tema 1 incluye un experimento interactivo donde puedes ajustar la complejidad del modelo y observar en tiempo real cómo cambia el sobreajuste.',
    etiquetas: ['Instrucciones', 'Metodología', 'Tema 1'],
    comentarios: [],
  },
  {
    id: 'it1-3',
    tipo: 'p',
    contenido:
      'Autoevaluación y avance: El test de autoevaluación del Tema 1 cubre definiciones, paradigmas de aprendizaje y fases del pipeline. Debes obtener al menos 6/10 para desbloquear el Tema 2. Si no lo superas en el primer intento, revisa los bloques sobre paradigmas y pipeline antes de repetirlo. El test se puede repetir hasta tres veces.',
    etiquetas: ['Instrucciones', 'Evaluación', 'Tema 1'],
    comentarios: [],
  },
]

export const instruccionesTema2 = [
  {
    id: 'it2-1',
    tipo: 'p',
    contenido:
      'Objetivo de aprendizaje: Al finalizar este tema, el estudiante será capaz de implementar regresión lineal y logística desde cero en Python, seleccionar la métrica de evaluación adecuada según el tipo de problema (MSE para regresión, F1-score para clasificación desbalanceada), y aplicar el algoritmo KNN explicando el efecto del hiperparámetro k sobre el modelo.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 2'],
    comentarios: [],
  },
  {
    id: 'it2-2',
    tipo: 'p',
    contenido:
      'Cómo estudiar este tema: Este tema es el más matemático de la primera mitad del curso. Si la notación matricial te resulta nueva, el aula virtual incluye un repaso de álgebra lineal básica. Presta especial atención al bloque sobre métricas de evaluación: es el error más común en proyectos reales usar precisión global cuando el dataset está desbalanceado. El notebook incluye tres datasets de práctica: precios de vivienda (regresión), detección de spam (clasificación binaria) y clasificación de flores Iris (multiclase).',
    etiquetas: ['Instrucciones', 'Metodología', 'Tema 2'],
    comentarios: [],
  },
  {
    id: 'it2-3',
    tipo: 'p',
    contenido:
      'Conexión con el Tema 3: Los conceptos de frontera de decisión y sobreajuste que introduces aquí son la base directa de los árboles de decisión del Tema 3. Cuando termines este tema, reflexiona sobre por qué KNN con k=1 sobreajusta siempre: esa intuición te ayudará a entender la profundidad de los árboles de decisión.',
    etiquetas: ['Instrucciones', 'Conexión temática', 'Tema 2'],
    comentarios: [],
  },
]

export const instruccionesTema3 = [
  {
    id: 'it3-1',
    tipo: 'p',
    contenido:
      'Objetivo de aprendizaje: Al finalizar este tema, el estudiante será capaz de construir un árbol de decisión desde cero usando los criterios Gini y entropía, implementar un Random Forest explicando el mecanismo de bagging y la decorrelación de árboles, y comparar el rendimiento de Gradient Boosting frente a Random Forest en un dataset tabulado.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 3'],
    comentarios: [],
  },
  {
    id: 'it3-2',
    tipo: 'p',
    contenido:
      'Cómo estudiar este tema: Este tema es clave para aplicaciones industriales — los métodos ensemble dominan competiciones de datos tabulados. Primero asegúrate de entender bien un árbol de decisión individual antes de pasar a Random Forest. El notebook incluye visualizaciones interactivas de las fronteras de decisión de un árbol vs. un ensemble. Dedica tiempo especial a XGBoost: es el algoritmo más usado en producción para datos estructurados.',
    etiquetas: ['Instrucciones', 'Metodología', 'Tema 3'],
    comentarios: [],
  },
  {
    id: 'it3-3',
    tipo: 'p',
    contenido:
      'Autoevaluación y avance: El test del Tema 3 cubre criterios de división, hiperparámetros de Random Forest (n_estimators, max_depth) y diferencias entre bagging y boosting. Se requiere 6/10 para desbloquear el Tema 4. El notebook incluye un ejercicio práctico de tuning de hiperparámetros sobre el dataset UCI Adult.',
    etiquetas: ['Instrucciones', 'Evaluación', 'Tema 3'],
    comentarios: [],
  },
]

export const instruccionesTema4 = [
  {
    id: 'it4-1',
    tipo: 'p',
    contenido:
      'Objetivo de aprendizaje: Al finalizar este tema, el estudiante será capaz de implementar un perceptrón multicapa (MLP) en PyTorch, explicar el algoritmo de retropropagación paso a paso con derivadas parciales, y entrenar una red feedforward sobre un dataset de clasificación eligiendo la función de activación y el optimizador correctos.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 4'],
    comentarios: [],
  },
  {
    id: 'it4-2',
    tipo: 'p',
    contenido:
      'Cómo estudiar este tema: Este es el tema más denso matemáticamente del curso. Recomendamos repasar la regla de la cadena del cálculo diferencial antes de la sesión de backpropagation. El notebook incluye una implementación desde cero en NumPy (sin frameworks) para que entiendas cada operación, seguida de la versión equivalente en PyTorch. No avances a la práctica hasta entender bien el forward pass y el cálculo del gradiente.',
    etiquetas: ['Instrucciones', 'Metodología', 'Tema 4'],
    comentarios: [],
  },
  {
    id: 'it4-3',
    tipo: 'p',
    contenido:
      'Conexión con temas anteriores y siguientes: La neurona logística del Tema 2 es literalmente la unidad básica de una red neuronal. Los conceptos de sobreajuste del Tema 1 aplican directamente: el dropout es la técnica de regularización específica de redes neuronales. El Tema 5 cubrirá cómo validar correctamente estos modelos, que son especialmente propensos a overfitting.',
    etiquetas: ['Instrucciones', 'Conexión temática', 'Tema 4'],
    comentarios: [],
  },
]

export const instruccionesTema5 = [
  {
    id: 'it5-1',
    tipo: 'p',
    contenido:
      'Objetivo de aprendizaje: Al finalizar este tema, el estudiante será capaz de diseñar una estrategia de validación cruzada k-fold correcta evitando data leakage, implementar búsqueda de hiperparámetros con Grid Search y Random Search, e interpretar curvas ROC y AUC para comparar modelos de clasificación binaria.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 5'],
    comentarios: [],
  },
  {
    id: 'it5-2',
    tipo: 'p',
    contenido:
      'Cómo estudiar este tema: La validación correcta de modelos es el tema más subestimado y el que genera más errores en proyectos reales. Presta atención especial al concepto de data leakage: es el error más costoso y difícil de detectar en producción. El notebook incluye tres casos de estudio de leakage real —uno en preprocesamiento, uno en feature engineering y uno en validación— extraídos de competiciones de Kaggle.',
    etiquetas: ['Instrucciones', 'Metodología', 'Tema 5'],
    comentarios: [],
  },
  {
    id: 'it5-3',
    tipo: 'p',
    contenido:
      'Preparación para el proyecto final: Este tema cierra el ciclo técnico del curso. Después de completarlo, tendrás todas las herramientas para el Tema 6. Recomendamos revisar los temas 1 a 5 antes de comenzar el proyecto, con especial atención a las métricas de evaluación (Tema 2) y la validación cruzada (este tema). El proyecto requiere justificar todas las decisiones de modelado — empieza a documentar tus razonamientos desde el primer análisis exploratorio.',
    etiquetas: ['Instrucciones', 'Proyecto final', 'Tema 5'],
    comentarios: [],
  },
]

export const instruccionesTema6 = [
  {
    id: 'it6-1',
    tipo: 'p',
    contenido:
      'Objetivo de aprendizaje: El Tema 6 es un proyecto integrador. El estudiante deberá desarrollar un pipeline ML completo sobre un dataset real a elegir de una lista propuesta, documentando cada decisión desde el análisis exploratorio hasta la evaluación final. Se valorará la capacidad de justificación crítica, no solo el rendimiento del modelo.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 6'],
    comentarios: [],
  },
  {
    id: 'it6-2',
    tipo: 'p',
    contenido:
      'Estructura del entregable: El proyecto se entrega como notebook (.ipynb) con las siguientes secciones obligatorias: (1) Análisis exploratorio con al menos 5 visualizaciones comentadas, (2) Preprocesamiento y justificación de decisiones, (3) Selección y entrenamiento de al menos 2 modelos distintos, (4) Validación cruzada y comparación de métricas, (5) Análisis de errores e interpretabilidad, (6) Conclusiones y limitaciones del modelo.',
    etiquetas: ['Instrucciones', 'Entregable', 'Tema 6'],
    comentarios: [],
  },
  {
    id: 'it6-3',
    tipo: 'p',
    contenido:
      'Criterios de evaluación del proyecto: Se distribuyen 100 puntos entre: calidad del EDA (20), correcta validación sin leakage (25), justificación de elección de modelos (20), análisis de métricas apropiadas al problema (20) y claridad de conclusiones (15). El uso de MLflow para tracking de experimentos suma hasta 10 puntos extra. La fecha límite de entrega es el último día de la semana 8.',
    etiquetas: ['Instrucciones', 'Evaluación', 'Tema 6'],
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

export const respuestasCalidadIA = [
  'He analizado el contenido contra los estándares institucionales UNIR. Detecté 2 incumplimientos:\n\n🔺 Citación incorrecta (APA): La referencia de Bishop (2006) en el Bloque 2 no sigue el formato APA 7ª edición. Falta el DOI.\n\n🔺 Concepto desactualizado: La definición de "aprendizaje profundo" en el Bloque 3 no refleja avances post-2022 (transformers, LLMs). Recomiendo actualizar.\n\n¿Quieres que cree alertas normativas para estos hallazgos?',
  'Revisión de calidad completada. Encontré 1 incumplimiento:\n\n🔺 Coherencia curricular: Los objetivos declarados en el Resumen mencionan "evaluación de modelos" pero ningún bloque del tema aborda métricas de evaluación explícitamente. Se recomienda añadir un bloque de evaluación o ajustar los objetivos.\n\nEl resto del contenido cumple con los estándares UNIR y las normas de citación están correctas.',
  'Análisis de calidad completado. El contenido está en buen estado:\n\n✓ Citaciones en formato APA correcto\n✓ Coherencia con los objetivos de aprendizaje\n✓ Nivel de complejidad adecuado para el perfil del estudiante\n\n⚠️ Sugerencia menor: El Bloque 4 podría beneficiarse de un ejemplo práctico adicional para reforzar la teoría. No es un incumplimiento normativo, pero mejoraría la experiencia de aprendizaje.',
]

export const estadoConfig = {
  porComenzar: { bg: '#F8FAFC', text: '#94A3B8', border: '#E2E8F0', label: 'Por comenzar', dot: '#CBD5E1' },
  bloqueado: { bg: '#F1F5F9', text: '#94A3B8', border: '#CBD5E1', label: 'Bloqueado', dot: '#CBD5E1' },
  borrador: { bg: '#EFF6FF', text: '#3B82F6', border: '#BFDBFE', label: 'En borrador', dot: '#3B82F6' },
  revision: { bg: '#FFFBEB', text: '#F59E0B', border: '#FDE68A', label: 'En revisión', dot: '#F59E0B' },
  comentarios: { bg: '#FFF7ED', text: '#F97316', border: '#FED7AA', label: 'Con comentarios', dot: '#F97316' },
  aprobado: { bg: '#F0FDF4', text: '#10B981', border: '#A7F3D0', label: 'Aprobado', dot: '#10B981' },
  publicado: { bg: '#ECFDF5', text: '#059669', border: '#6EE7B7', label: 'Publicado', dot: '#059669' },
  disenado: { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE', label: 'Diseñado', dot: '#7C3AED' },
}

export const gravedadConfig = {
  critico: { color: '#EF4444', bg: '#FEF2F2', border: '#FECACA', label: '🔴 Crítico', emoji: '🔴' },
  importante: { color: '#F97316', bg: '#FFF7ED', border: '#FED7AA', label: '🟠 Importante', emoji: '🟠' },
  sugerencia: { color: '#EAB308', bg: '#FEFCE8', border: '#FEF08A', label: '🟡 Sugerencia', emoji: '🟡' },
  nota: { color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE', label: '🔵 Nota', emoji: '🔵' },
  alertaNormativa: { color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', label: '🔺 Alerta normativa', emoji: '🔺' },
}

export const roles = [
  { id: 'autor', label: 'Autor', description: 'Crea y edita contenido' },
  { id: 'coordinador', label: 'Coordinador', description: 'Revisa y aprueba' },
  { id: 'disenador', label: 'Diseñador instruccional', description: 'Sugiere mejoras de formato' },
]

export const preguntasCreacion = [
  {
    id: 'q1',
    pregunta: '¿Cuál es el nombre provisional de la asignatura?',
    descripcion: 'Un título descriptivo que identifique el contenido. Se puede editar después.',
    tipo: 'text',
    placeholder: 'Ej. Fundamentos de Machine Learning',
  },
  {
    id: 'q2',
    pregunta: '¿A qué área de conocimiento pertenece?',
    descripcion: 'El área temática principal de la asignatura.',
    tipo: 'select',
    opciones: [
      'Inteligencia Artificial',
      'Ciencia de Datos',
      'Ingeniería de Software',
      'Ciberseguridad',
      'Redes y Comunicaciones',
      'Matemáticas y Estadística',
      'Gestión Empresarial',
      'Diseño y UX',
      'Derecho y Regulación',
      'Otra',
    ],
  },
  {
    id: 'q3',
    pregunta: '¿Cuál es el nivel del estudiante al que va dirigida?',
    descripcion: 'El nivel académico y de conocimiento previo esperado.',
    tipo: 'select',
    opciones: ['Básico', 'Intermedio', 'Avanzado', 'Experto'],
  },
  {
    id: 'q4',
    pregunta: '¿Cuántos temas tendrá la asignatura?',
    descripcion: 'Número de temas o unidades didácticas principales.',
    tipo: 'number',
    min: 1,
    max: 20,
    placeholder: '6',
  },
  {
    id: 'q5',
    pregunta: '¿Cuántas horas de estudio se estiman en total?',
    descripcion: 'Incluye lectura, práctica y evaluación.',
    tipo: 'number',
    min: 10,
    max: 300,
    placeholder: '40',
  },
  {
    id: 'q6',
    pregunta: '¿Qué tipo de contenido predominará?',
    descripcion: 'Define el enfoque didáctico principal.',
    tipo: 'select',
    opciones: ['Teórico-conceptual', 'Práctico-aplicado', 'Mixto', 'Basado en casos reales', 'Basado en proyectos'],
  },
  {
    id: 'q7',
    pregunta: '¿Cuáles son los conocimientos previos necesarios?',
    descripcion: 'Especifica los prerrequisitos mínimos que deben cumplir los estudiantes.',
    tipo: 'textarea',
    placeholder: 'Ej. Conocimientos básicos de Python, estadística descriptiva...',
  },
  {
    id: 'q8',
    pregunta: '¿Cuál es el objetivo principal de aprendizaje?',
    descripcion: 'Describe qué será capaz de hacer el estudiante al finalizar la asignatura.',
    tipo: 'textarea',
    placeholder: 'Ej. El estudiante será capaz de implementar modelos de ML y evaluar su rendimiento...',
  },
  {
    id: 'q9',
    pregunta: '¿Qué herramientas o tecnologías se utilizarán?',
    descripcion: 'Software, lenguajes, frameworks o plataformas principales.',
    tipo: 'text',
    placeholder: 'Ej. Python, Scikit-learn, TensorFlow, Google Colab',
  },
  {
    id: 'q10',
    pregunta: '¿Cómo se evaluará al estudiante?',
    descripcion: 'Método de evaluación principal.',
    tipo: 'select',
    opciones: ['Proyecto final', 'Examen teórico', 'Ejercicios prácticos', 'Mixto (proyecto + test)', 'Portafolio', 'Otro'],
  },
  {
    id: 'q11',
    pregunta: '¿Hay algún contexto adicional relevante?',
    descripcion: 'Requisitos especiales, enfoque institucional, normativa o cualquier información que el generador de contenido deba considerar.',
    tipo: 'textarea',
    placeholder: 'Ej. La asignatura debe alinearse con la certificación AWS ML Specialty...',
  },
]

export const tagsSugerenciasPorArea = {
  'Inteligencia Artificial': ['Machine Learning', 'Deep Learning', 'IA', 'Algoritmos', 'Redes Neuronales', 'NLP', 'Visión por Computador'],
  'Ciencia de Datos': ['Data Science', 'Análisis de Datos', 'Visualización', 'Python', 'Estadística', 'Big Data'],
  'Ingeniería de Software': ['Desarrollo', 'Arquitectura', 'Testing', 'DevOps', 'APIs', 'Software'],
  'Ciberseguridad': ['Seguridad', 'Criptografía', 'Pentesting', 'Redes', 'GDPR', 'Ethical Hacking'],
  'Redes y Comunicaciones': ['Redes', 'Protocolos', 'TCP/IP', 'Cloud', 'IoT', 'Telecomunicaciones'],
  'Matemáticas y Estadística': ['Matemáticas', 'Estadística', 'Álgebra', 'Cálculo', 'Probabilidad'],
  'Gestión Empresarial': ['Gestión', 'Estrategia', 'Liderazgo', 'Innovación', 'Negocio'],
  'Diseño y UX': ['UX', 'Diseño', 'Prototipado', 'Usabilidad', 'Figma', 'Producto'],
  'Derecho y Regulación': ['Derecho', 'Regulación', 'GDPR', 'Compliance', 'Ética', 'Normativa'],
  'Otra': ['Concepto', 'Fundamentos', 'Práctica', 'Evaluación'],
}

// ─── Chatbar & Shortcuts ───────────────────────────────────────────────────

export const shortcutsComandos = [
  {
    id: 'generar-asignatura',
    comando: '/generar-asignatura',
    descripcion: 'Crear nueva asignatura con IA',
    accion: 'crearAsignatura',
    icon: 'BookOpen',
  },
  {
    id: 'mejora-rubricas',
    comando: '/mejora-rúbricas',
    descripcion: 'Mejorar rúbricas de evaluación',
    accion: 'placeholder',
    icon: 'ClipboardCheck',
  },
  {
    id: 'disenador-actividades',
    comando: '/diseñador-actividades',
    descripcion: 'Diseñar actividades de aprendizaje',
    accion: 'placeholder',
    icon: 'Edit3',
  },
  {
    id: 'crear-test',
    comando: '/crear-test',
    descripcion: 'Generar test de evaluación',
    accion: 'placeholder',
    icon: 'FlaskConical',
  },
  {
    id: 'corregir-actividades',
    comando: '/corregir-actividades',
    descripcion: 'Corregir entregas de actividades',
    accion: 'placeholder',
    icon: 'CheckSquare',
  },
]

export const respuestasIAChatbar = [
  'Veo que tienes 2 asignaturas en borrador. ¿Quieres continuar con Fundamentos de ML o crear una nueva?',
  'Tengo acceso al contexto de tus asignaturas. Puedo ayudarte a mejorar contenido, buscar referencias o generar nuevas secciones.',
  'Para crear una nueva asignatura, usa el comando /generar-asignatura o haz clic en el botón "Nueva asignatura".',
  'Hay 1 comentario crítico pendiente en Fundamentos de ML · Tema 1. ¿Quieres ir directamente a resolverlo?',
  'Puedo ayudarte a revisar el pipeline de cualquier asignatura. ¿Con cuál quieres trabajar?',
]

// ─── Dashboard: Mis pendientes (panel derecho) ────────────────────────────────

export const misPendientes = [
  {
    id: 'p0',
    titulo: 'Incumplimiento norma APA en citación',
    asignatura: 'Fundamentos de ML',
    seccion: 'Tema 2 · Bloque 3',
    gravedad: 'alertaNormativa',
    tiempo: 'Hace 30 min',
    canvasDestino: 't2',
    activo: true,
  },
  {
    id: 'p1',
    titulo: 'Añadir referencia académica',
    asignatura: 'Fundamentos de ML',
    seccion: 'Tema 1 · Bloque 2',
    gravedad: 'critico',
    tiempo: 'Hace 1 hora',
    canvasDestino: 't1',
    activo: true,
  },
  {
    id: 'p2',
    titulo: 'Completar redacción',
    asignatura: 'Fundamentos de ML',
    seccion: 'Tema 2 · Bloque 5',
    gravedad: 'importante',
    tiempo: 'Hace 2 horas',
    canvasDestino: 't2',
    activo: true,
  },
  {
    id: 'p3',
    titulo: 'Revisar objetivos de aprendizaje',
    asignatura: 'Deep Learning',
    seccion: 'Índice',
    gravedad: 'sugerencia',
    tiempo: 'Ayer',
    canvasDestino: null,
    activo: false,
  },
  {
    id: 'p4',
    titulo: 'Comenzar redacción inicial',
    asignatura: 'NLP',
    seccion: 'Índice',
    gravedad: 'nota',
    tiempo: 'Hace 1 semana',
    canvasDestino: null,
    activo: false,
  },
]

export const tagsFiltrablesDashboard = [
  { id: 'todos', label: 'Todos' },
  { id: 'pendientes', label: 'Pendientes de mí' },
  { id: 'borrador', label: 'En borrador' },
  { id: 'revision', label: 'En revisión' },
  { id: 'comentarios', label: 'Con comentarios' },
  { id: 'aprobado', label: 'Aprobados' },
]

// ─── Calidad de Contenidos ─────────────────────────────────────────────────

export const calidadContenidosIndicadores = {
  alertasNormativas: 6,
  revisionProfunda: 21,
  iseMediaPonderado: 3.9,
  asignaturasEstadoCritico: 3,
}

export const alertasNormativasPorAsignatura = {
  'fund-ml': {
    totalAlertas: 2,
    alertas: [
      { id: 'a1', tipo: 'normativa', descripcion: 'Actualizar referencias a normativa EU AI Act 2024', seccion: 'Tema 1', gravedad: 'importante' },
      { id: 'a2', tipo: 'contenido', descripcion: 'Revisar métricas según última versión de scikit-learn', seccion: 'Tema 2', gravedad: 'sugerencia' },
    ],
  },
  'deep-learning': {
    totalAlertas: 1,
    alertas: [
      { id: 'a3', tipo: 'normativa', descripcion: 'Incorporar nuevas arquitecturas transformer (2024)', seccion: 'Índice', gravedad: 'importante' },
    ],
  },
}

export const etiquetasDisponibles = [
  'Machine Learning', 'Deep Learning', 'IA', 'Algoritmos', 'Redes Neuronales', 'NLP',
  'Visión por Computador', 'Data Science', 'Análisis de Datos', 'Visualización', 'Python',
  'Estadística', 'Big Data', 'Desarrollo', 'Arquitectura', 'Testing', 'DevOps', 'APIs',
  'Seguridad', 'Criptografía', 'Cloud', 'IoT', 'Matemáticas', 'Álgebra', 'Cálculo',
  'Probabilidad', 'Gestión', 'Estrategia', 'UX', 'Diseño', 'Usabilidad', 'Derecho',
  'Regulación', 'GDPR', 'Compliance', 'Ética', 'Concepto', 'Fundamentos', 'Práctica',
  'Evaluación', 'Proyecto', 'Clasificación', 'Regresión', 'Ejemplo', 'Pipeline',
  'Overfitting', 'Generalización', 'Paradigmas', 'Objetivos', 'Metodología', 'Herramientas',
]

export const coordinatorTrackingData = [
  {
    id: 'fund-ml',
    titulacion: 'Máster en IA',
    nombre: 'Fundamentos de Machine Learning',
    lastVersionDate: '2025-09-15',
    subjectType: 'técnica',
    obsolescenceCycleYears: 5,
    accumulatedVersions: 4,
    filialVersions: {
      espana:   { version: '4.2', date: '2025-09-15', status: 'published' },
      colombia: { version: '4.1', date: '2025-08-20', status: 'published' },
      ecuador:  { version: '3.9', date: '2025-05-10', status: 'pending' },
    },
    alarms: ['version-mismatch', 'approaching-obsolescence'],
  },
  {
    id: 'deep-learning',
    titulacion: 'Máster en IA',
    nombre: 'Deep Learning y Redes Neuronales',
    lastVersionDate: '2023-06-10',
    subjectType: 'técnica',
    obsolescenceCycleYears: 7,
    accumulatedVersions: 2,
    filialVersions: {
      espana: { version: '2.1', date: '2023-06-10', status: 'published' },
      mexico: { version: '2.0', date: '2023-04-01', status: 'published' },
    },
    alarms: ['approaching-obsolescence'],
  },
  {
    id: 'nlp',
    titulacion: 'Máster en IA',
    nombre: 'Procesamiento del Lenguaje Natural',
    lastVersionDate: '2025-02-14',
    subjectType: 'técnica',
    obsolescenceCycleYears: 5,
    accumulatedVersions: 3,
    filialVersions: {
      espana:   { version: '3.0', date: '2025-02-14', status: 'published' },
      colombia: { version: '3.0', date: '2025-02-14', status: 'published' },
    },
    alarms: [],
  },
  {
    id: 'vision',
    titulacion: 'Máster en IA',
    nombre: 'Visión por Computador',
    lastVersionDate: '2024-01-20',
    subjectType: 'técnica',
    obsolescenceCycleYears: 5,
    accumulatedVersions: 1,
    filialVersions: {
      espana:  { version: '1.0', date: '2024-01-20', status: 'published' },
      ecuador: { version: '1.0', date: '2024-01-20', status: 'published' },
    },
    alarms: ['approaching-obsolescence'],
  },
  {
    id: 'etica',
    titulacion: 'Máster en IA',
    nombre: 'IA Ética y Regulación',
    lastVersionDate: '2022-11-01',
    subjectType: 'regulada',
    obsolescenceCycleYears: 5,
    accumulatedVersions: 2,
    filialVersions: {
      espana:   { version: '2.0', date: '2022-11-01', status: 'published' },
      colombia: { version: '1.9', date: '2022-09-15', status: 'published' },
    },
    alarms: ['expired-content'],
  },
  {
    id: 'mlops',
    titulacion: 'Máster en IA',
    nombre: 'MLOps y Despliegue de Modelos',
    lastVersionDate: '2025-11-30',
    subjectType: 'técnica',
    obsolescenceCycleYears: 3,
    accumulatedVersions: 5,
    filialVersions: {
      espana:  { version: '5.0', date: '2025-11-30', status: 'published' },
      mexico:  { version: '4.9', date: '2025-10-15', status: 'published' },
      ecuador: { version: '4.8', date: '2025-09-01', status: 'pending' },
    },
    alarms: [],
  },
  {
    id: 'tfm',
    titulacion: 'Máster en IA',
    nombre: 'Proyecto Final de Máster',
    lastVersionDate: '2025-06-01',
    subjectType: 'transversal',
    obsolescenceCycleYears: 7,
    accumulatedVersions: 1,
    filialVersions: {
      espana:   { version: '1.0', date: '2025-06-01', status: 'published' },
      colombia: { version: '1.0', date: '2025-06-01', status: 'published' },
      mexico:   { version: '1.0', date: '2025-06-01', status: 'published' },
    },
    alarms: ['pending-update'],
  },
]

export const recursosChainingThoughts = [
  { step: 1, total: 4, text: 'Analizando el contexto temático…', detail: 'Identificando conceptos clave: Machine Learning, redes neuronales, optimización' },
  { step: 1, total: 4, text: 'Conceptos identificados', detail: 'Fundamentos ML · Aprendizaje supervisado · Redes neuronales · Backpropagation · Optimizadores' },
  { step: 2, total: 4, text: 'Consultando bases de datos académicas…', detail: 'IEEE Xplore: 312 resultados · Google Scholar: 1.240 resultados · arXiv: 876 resultados' },
  { step: 2, total: 4, text: 'Aplicando filtros de calidad…', detail: 'Revisado por pares: 654 · Publicado 2019-2025: 489 · Inglés / Español: 461' },
  { step: 3, total: 4, text: 'Calculando puntuaciones de relevancia…', detail: 'Alineación temática · Factor de impacto · Accesibilidad para estudiantes' },
  { step: 3, total: 4, text: 'Ordenando candidatos…', detail: '23 referencias finalistas · Eliminando duplicados y fuentes de baja calidad' },
  { step: 4, total: 4, text: 'Seleccionando las 10 mejores referencias…', detail: 'Equilibrio entre teoría, práctica y casos reales' },
]

export const recursosReferencesPool = [
  {
    id: 1,
    title: 'Deep Learning',
    authors: ['Goodfellow, I.', 'Bengio, Y.', 'Courville, A.'],
    description: 'El texto de referencia más completo sobre aprendizaje profundo. Cubre redes feedforward, convolucionales, recurrentes y técnicas de optimización modernas con rigor matemático.',
    url: 'https://www.deeplearningbook.org',
    relevance: 'high',
    source: 'book',
    year: 2016,
    language: 'en',
  },
  {
    id: 2,
    title: 'Neural Networks and Deep Learning: A Textbook',
    authors: ['Aggarwal, C.C.'],
    description: 'Texto universitario que aborda redes neuronales desde los fundamentos del perceptrón hasta arquitecturas avanzadas, con énfasis en aplicaciones prácticas y ejemplos detallados.',
    url: 'https://doi.org/10.1007/978-3-319-94463-0',
    relevance: 'high',
    source: 'book',
    year: 2023,
    language: 'en',
  },
  {
    id: 3,
    title: 'Gradient-Based Learning Applied to Document Recognition',
    authors: ['LeCun, Y.', 'Bottou, L.', 'Bengio, Y.', 'Haffner, P.'],
    description: 'Artículo seminal que introduce LeNet y las redes convolucionales modernas. Fundamental para comprender el origen de las arquitecturas CNN utilizadas en visión por computador.',
    url: 'https://doi.org/10.1109/5.726791',
    relevance: 'high',
    source: 'journal',
    year: 1998,
    language: 'en',
  },
  {
    id: 4,
    title: 'Adam: A Method for Stochastic Optimization',
    authors: ['Kingma, D.P.', 'Ba, J.'],
    description: 'Propone el optimizador Adam, actualmente el más utilizado en entrenamiento de redes neuronales. Explica la adaptación de tasas de aprendizaje individuales combinando momentum y RMSprop.',
    url: 'https://arxiv.org/abs/1412.6980',
    relevance: 'high',
    source: 'conference',
    year: 2015,
    language: 'en',
  },
  {
    id: 5,
    title: 'Dropout: A Simple Way to Prevent Neural Networks from Overfitting',
    authors: ['Srivastava, N.', 'Hinton, G.', 'Krizhevsky, A.', 'Sutskever, I.'],
    description: 'Introduce la técnica dropout como regularizador para redes neuronales profundas, demostrando mejoras significativas sobre benchmarks estándar y su fundamento probabilístico.',
    url: 'https://jmlr.org/papers/v15/srivastava14a.html',
    relevance: 'high',
    source: 'journal',
    year: 2014,
    language: 'en',
  },
  {
    id: 6,
    title: 'Batch Normalization: Accelerating Deep Network Training',
    authors: ['Ioffe, S.', 'Szegedy, C.'],
    description: 'Presenta la normalización por lotes como técnica para estabilizar y acelerar el entrenamiento de redes profundas, reduciendo la dependencia en la inicialización de pesos.',
    url: 'https://arxiv.org/abs/1502.03167',
    relevance: 'high',
    source: 'conference',
    year: 2015,
    language: 'en',
  },
  {
    id: 7,
    title: 'Introducción al Aprendizaje Profundo',
    authors: ['Soria Olivas, E.', 'Martín Guerrero, J.D.'],
    description: 'Recurso en español que ofrece una introducción accesible al aprendizaje profundo con ejemplos prácticos, ideal para estudiantes hispanohablantes que se inician en el área.',
    url: 'https://doi.org/10.5209/rev_RIAI.2019.v36',
    relevance: 'medium',
    source: 'journal',
    year: 2019,
    language: 'es',
  },
  {
    id: 8,
    title: 'Understanding the Difficulty of Training Deep Feedforward Neural Networks',
    authors: ['Glorot, X.', 'Bengio, Y.'],
    description: 'Analiza los problemas de gradiente en redes profundas y propone la inicialización Xavier/Glorot, esencial para comprender por qué el entrenamiento de redes profundas era difícil antes de 2010.',
    url: 'https://proceedings.mlr.press/v9/glorot10a.html',
    relevance: 'medium',
    source: 'conference',
    year: 2010,
    language: 'en',
  },
  {
    id: 9,
    title: 'PyTorch: An Imperative Style, High-Performance Deep Learning Library',
    authors: ['Paszke, A.', 'Gross, S.', 'Massa, F.'],
    description: 'Paper oficial de PyTorch que describe su diseño basado en grafos dinámicos, su integración con Python y su rendimiento comparado con frameworks alternativos.',
    url: 'https://arxiv.org/abs/1912.01703',
    relevance: 'medium',
    source: 'conference',
    year: 2019,
    language: 'en',
  },
  {
    id: 10,
    title: 'TensorFlow: Large-Scale Machine Learning on Heterogeneous Systems',
    authors: ['Abadi, M.', 'Barham, P.', 'Chen, J.'],
    description: 'Artículo fundacional de TensorFlow que describe su arquitectura de grafos de flujo de datos, escalabilidad distribuida y comparativa de rendimiento en tareas reales.',
    url: 'https://arxiv.org/abs/1603.04467',
    relevance: 'medium',
    source: 'conference',
    year: 2016,
    language: 'en',
  },
  {
    id: 11,
    title: 'Redes Neuronales Artificiales y sus Aplicaciones',
    authors: ['Hilera González, J.R.', 'Martínez Hernando, V.J.'],
    description: 'Libro en español que cubre los fundamentos teóricos y aplicaciones prácticas de las redes neuronales, con enfoque pedagógico orientado a estudiantes universitarios.',
    url: 'https://doi.org/10.1007/978-84-7719-581-4',
    relevance: 'medium',
    source: 'book',
    year: 2020,
    language: 'es',
  },
  {
    id: 12,
    title: 'Backpropagation Applied to Handwritten Zip Code Recognition',
    authors: ['LeCun, Y.', 'Boser, B.', 'Denker, J.S.'],
    description: 'Uno de los primeros trabajos que demuestran la aplicabilidad práctica de backpropagation en un problema real, siendo referencia histórica imprescindible del campo.',
    url: 'https://doi.org/10.1162/neco.1989.1.4.541',
    relevance: 'low',
    source: 'journal',
    year: 1989,
    language: 'en',
  },
]

export const recursosRefinementSuggestions = [
  'Solo fuentes en español',
  'Publicaciones 2020-2025',
  'Solo revistas revisadas por pares',
  'Incluir recursos en vídeo',
  'Libros y monografías únicamente',
  'Más referencias sobre backpropagation',
  'Incluir casos prácticos',
  'Fuentes de acceso libre (open access)',
]

// ─── Deep Learning Author Workflow Mockdata ───────────────────────────────────
// Used only for deep-learning new-subject flow (esAsignaturaNueva === true)

export const dlIndicacionesDidacticasT1 = {
  enfoqueIA: 'Proporciona una introducción clara y accesible al concepto de deep learning, diferenciando entre IA, ML y deep learning. Incluye elementos visuales y una línea temporal histórica.',
  bibliografiaT1: 'Russell, S. y Norvig, P. (2021). Artificial Intelligence: A Modern Approach. Pearson.\nMitchell, T. M. (1997). Machine Learning. McGraw-Hill.',
  notasPedagogicas: 'Incluir actividades interactivas para identificar diferencias entre conceptos. Usar ejemplos de aplicaciones prácticas actuales (visión por computador, NLP). Destacar la importancia de los datos en deep learning.',
}

export const dlResumenTema1 = {
  titulo: 'Tema 1. Introducción al Deep Learning',
  introduccionYObjetivos: 'Este primer epígrafe introduce al estudiante en el significado y la relevancia del deep learning dentro del campo más amplio de la inteligencia artificial y el aprendizaje automático. Se presenta el aprendizaje profundo como un conjunto de técnicas basadas en redes neuronales artificiales capaces de aprender representaciones complejas a partir de grandes volúmenes de datos. Asimismo, se contextualiza su papel en el desarrollo de sistemas inteligentes capaces de resolver problemas como el reconocimiento de imágenes, la comprensión del lenguaje natural o la predicción de patrones complejos.\n\nEste apartado también permite situar al estudiante en los contenidos del tema y comprender la importancia del deep learning como una de las tecnologías clave en el desarrollo actual de la inteligencia artificial.',
  objetivos: [
    'Comprender el concepto de deep learning y su relación con la inteligencia artificial y el machine learning.',
    'Identificar las principales características que diferencian el aprendizaje profundo de otros enfoques de aprendizaje automático.',
    'Analizar el papel de las redes neuronales artificiales como base de los modelos de deep learning.',
    'Conocer las principales aplicaciones actuales del deep learning en distintos ámbitos tecnológicos y científicos.',
    'Reconocer los retos y limitaciones asociados al desarrollo y uso de modelos de aprendizaje profundo.',
  ],
  epigrafes: [
    {
      titulo: 'Concepto y evolución del Deep Learning',
      descripcion: 'En este epígrafe se aborda el concepto de deep learning desde una perspectiva conceptual e histórica, analizando cómo ha evolucionado a partir de las primeras investigaciones en redes neuronales artificiales. Se revisan los principales hitos en el desarrollo de esta disciplina, desde los primeros modelos neuronales hasta el auge reciente impulsado por la disponibilidad de grandes volúmenes de datos y el aumento de la capacidad computacional.\n\nTambién se analizan las razones por las cuales el deep learning ha adquirido un papel central en la inteligencia artificial contemporánea, especialmente en tareas complejas relacionadas con el análisis de datos no estructurados como imágenes, texto o audio.',
      ideasDidacticas: [
        'Línea temporal que muestre la evolución histórica de las redes neuronales y del deep learning.',
        'Cuadro comparativo entre inteligencia artificial, machine learning y deep learning.',
        'Ejemplo práctico de aplicaciones actuales del deep learning.',
      ],
    },
    {
      titulo: 'Fundamentos de las redes neuronales artificiales',
      descripcion: 'Este epígrafe introduce los principios básicos que sustentan el funcionamiento de las redes neuronales artificiales, explicando su inspiración en el funcionamiento del cerebro humano. Se describen los componentes fundamentales de una red neuronal, como las neuronas artificiales, los pesos, las funciones de activación y las capas que conforman la arquitectura de la red.\n\nAsimismo, se explica cómo las redes neuronales procesan la información y cómo pueden aprender patrones a partir de datos mediante procesos de entrenamiento.',
      ideasDidacticas: [
        'Esquema visual de la estructura de una red neuronal artificial.',
        'Diagrama que represente el funcionamiento de una neurona artificial.',
        'Actividad breve de identificación de los componentes de una red neuronal.',
      ],
    },
    {
      titulo: 'El papel de los datos y el entrenamiento de modelos',
      descripcion: 'En este epígrafe se explica la importancia de los datos en el desarrollo de modelos de deep learning. Se analizan los diferentes tipos de datos utilizados en el entrenamiento de redes neuronales, así como los procesos mediante los cuales los modelos aprenden a partir de ejemplos.\n\nTambién se introducen conceptos básicos relacionados con el entrenamiento de modelos, como el ajuste de parámetros, la función de pérdida y el proceso de optimización.',
      ideasDidacticas: [
        'Diagrama del proceso de entrenamiento de una red neuronal.',
        'Ejemplo sencillo que ilustre cómo un modelo aprende a partir de datos.',
        'Actividad breve de reflexión sobre la importancia de los datos en sistemas de inteligencia artificial.',
      ],
    },
    {
      titulo: 'Aplicaciones y retos del Deep Learning',
      descripcion: 'Este último epígrafe presenta algunas de las principales aplicaciones del deep learning en diferentes sectores, como la visión por computador, el procesamiento del lenguaje natural, la medicina o la automatización industrial. Se analizan ejemplos de sistemas que utilizan redes neuronales profundas para resolver problemas complejos.\n\nAsimismo, se abordan algunos de los retos asociados al uso de estos modelos, como la necesidad de grandes volúmenes de datos, el alto consumo computacional o las cuestiones relacionadas con la interpretabilidad y la ética de los sistemas de inteligencia artificial.',
      ideasDidacticas: [
        'Tabla con ejemplos de aplicaciones del deep learning en distintos sectores.',
        'Caso práctico sobre el uso de redes neuronales en una aplicación real.',
        'Preguntas de autoevaluación para reforzar la comprensión de los conceptos clave.',
      ],
    },
  ],
}

export const dlBloquesTema1 = [
  { id: 'dl-t1-b1', tipo: 'h2', contenido: '1.1. Introducción y objetivos', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b2', tipo: 'p', contenido: 'A lo largo de este tema se presentan las ideas principales, definiciones y fundamentos en torno al concepto de *deep learning* y se señala su relevancia dentro del desarrollo actual de la inteligencia artificial. El *deep learning* ha experimentado una evolución notable en las últimas décadas, impulsada por el aumento de la capacidad computacional, la disponibilidad de grandes volúmenes de datos y los avances en algoritmos de entrenamiento. Esta disciplina no se limita al uso de modelos matemáticos complejos, sino que constituye un enfoque que permite a los sistemas aprender representaciones jerárquicas de los datos y resolver problemas que anteriormente resultaban difíciles de abordar mediante técnicas tradicionales.', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b3', tipo: 'p', contenido: 'El aprendizaje profundo ha adquirido una posición central en ámbitos como la visión por computador, el procesamiento del lenguaje natural, la robótica, la medicina o los sistemas de recomendación. Su estudio resulta fundamental para comprender una parte importante de los avances recientes en inteligencia artificial, así como los retos técnicos, éticos y prácticos que acompañan a su desarrollo e implementación.', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b4', tipo: 'p', contenido: 'Para ampliar información sobre estos conceptos puedes consultar *Deep Learning*, de Goodfellow, Bengio y Courville (2016), así como *Artificial Intelligence: A Modern Approach*, de Russell y Norvig (2021), en la sección A fondo.', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b5', tipo: 'p', contenido: 'Los objetivos de aprendizaje de este tema son los siguientes:', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b6', tipo: 'ul', contenido: [
    'Definir el concepto de *deep learning* y su relación con la inteligencia artificial y el *machine learning*.',
    'Conocer el origen y la evolución de las redes neuronales artificiales.',
    'Comprender los principios generales del funcionamiento de una red neuronal.',
    'Identificar el papel de los datos y del entrenamiento en el aprendizaje profundo.',
    'Delimitar las principales aplicaciones, ventajas y limitaciones del *deep learning*.',
  ], etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b7', tipo: 'hr', contenido: '', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b8', tipo: 'h2', contenido: '1.2. Naturaleza y alcance del deep learning', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b9', tipo: 'p', contenido: '*Deep learning* es una expresión de origen anglosajón que se traduce en español como \'aprendizaje profundo\'. Se trata de una rama del *machine learning* basada en el uso de redes neuronales artificiales con múltiples capas capaces de aprender representaciones complejas de los datos. Mientras que otros enfoques de aprendizaje automático suelen apoyarse en la extracción manual de características, el aprendizaje profundo permite que el propio modelo aprenda automáticamente las representaciones más útiles a partir de la información disponible.', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b10', tipo: 'p', contenido: 'Durante los últimos años se han producido importantes avances en este ámbito y, en ocasiones, se percibe una cierta confusión sobre sus límites y diferencias respecto a otros conceptos cercanos. Sin embargo, existe un acuerdo generalizado en situar el *deep learning* dentro del campo del *machine learning*, y a este, a su vez, dentro del ámbito más amplio de la inteligencia artificial.', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b11', tipo: 'p', contenido: 'La inteligencia artificial engloba el conjunto de métodos y técnicas orientados a diseñar sistemas capaces de realizar tareas que normalmente requerirían inteligencia humana, como reconocer patrones, tomar decisiones, comprender lenguaje o generar contenido. Dentro de este campo, el *machine learning* hace referencia a la capacidad de los sistemas para aprender a partir de datos, sin necesidad de ser programados de manera explícita para cada tarea. El *deep learning*, por su parte, constituye un enfoque específico basado en arquitecturas neuronales profundas.', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b12', tipo: 'p', contenido: 'El aprendizaje profundo se encarga de estudiar cómo un sistema computacional puede transformar datos de entrada en representaciones internas cada vez más abstractas. De esta forma, un modelo puede aprender desde rasgos simples hasta estructuras complejas. Por ejemplo, en una tarea de reconocimiento de imágenes, una red neuronal puede aprender primero bordes y texturas, después formas básicas y finalmente objetos completos. En el caso del lenguaje, puede aprender primero relaciones entre palabras, después estructuras sintácticas y finalmente significados más complejos.', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b13', tipo: 'p', contenido: 'Existen numerosas definiciones de *deep learning*. Goodfellow, Bengio y Courville (2016) lo describen como un enfoque del *machine learning* que permite a los modelos aprender representaciones múltiples de los datos mediante el uso de capas sucesivas de procesamiento. Desde una perspectiva más aplicada, puede señalarse que el *deep learning* es el conjunto de técnicas que permiten entrenar redes neuronales profundas para resolver tareas de clasificación, predicción, reconocimiento o generación de información.', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b14', tipo: 'p', contenido: 'A partir de estas definiciones se identifican dos niveles:', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b15', tipo: 'ul', contenido: [
    'Es una técnica computacional, ya que proporciona modelos, algoritmos y arquitecturas concretas para aprender a partir de datos.',
    'Es también un marco metodológico, porque ha modificado la forma en que se abordan múltiples problemas dentro de la inteligencia artificial, sustituyendo reglas manuales por aprendizaje basado en ejemplos.',
  ], etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b16', tipo: 'p', contenido: 'En este contexto, el elemento central del *deep learning* pasa a ser la representación automática de la información. Los modelos no solo producen una salida, sino que construyen internamente distintas capas de abstracción que permiten captar patrones complejos. Esta capacidad ha sido clave para el éxito del aprendizaje profundo en tareas donde los datos son abundantes y poco estructurados, como imágenes, texto, audio o vídeo.', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b17', tipo: 'h3', contenido: 'Evolución del concepto de deep learning', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b18', tipo: 'p', contenido: 'Existen distintos hitos que marcan el desarrollo del *deep learning*. Sus orígenes pueden situarse en las primeras investigaciones sobre neuronas artificiales y modelos conexionistas a mediados del siglo XX. Uno de los antecedentes más conocidos es el perceptrón, propuesto por Rosenblatt, que sentó las bases de las primeras redes neuronales.', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b19', tipo: 'p', contenido: 'Posteriormente, el desarrollo de estas técnicas experimentó etapas de avance y retroceso. Durante algunos periodos, el interés por las redes neuronales disminuyó debido a limitaciones matemáticas, falta de capacidad computacional y escasez de datos adecuados para el entrenamiento. Sin embargo, a partir de finales del siglo XX y especialmente durante el siglo XXI, el crecimiento de la potencia de cálculo, el uso de GPU y la disponibilidad de grandes conjuntos de datos permitieron revitalizar este campo.', etiquetas: [], comentarios: [] },
  { id: 'dl-t1-b20', tipo: 'p', contenido: 'En la actualidad, el *deep learning* constituye una de las áreas más dinámicas de la inteligencia artificial. Su expansión ha estado relacionada con el éxito de arquitecturas como las redes convolucionales para visión por computador, las redes recurrentes para secuencias y, más recientemente, los modelos basados en mecanismos de atención y *transformers*.', etiquetas: [], comentarios: [] },
]

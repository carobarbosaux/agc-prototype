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
    id: 'instrucciones-grupo',
    label: 'Instrucciones didácticas',
    estado: 'aprobado',
    tipo: 'grupo',
    temas: [
      { id: 'instrucciones-t1', label: 'Tema 1', labelCorto: 'Introducción al aprendizaje automático', estado: 'aprobado' },
      { id: 'instrucciones-t2', label: 'Tema 2', labelCorto: 'Regresión y clasificación', estado: 'aprobado' },
      { id: 'instrucciones-t3', label: 'Tema 3', labelCorto: 'Árboles de decisión y ensemble methods', estado: 'aprobado' },
      { id: 'instrucciones-t4', label: 'Tema 4', labelCorto: 'Redes neuronales básicas', estado: 'aprobado' },
      { id: 'instrucciones-t5', label: 'Tema 5', labelCorto: 'Evaluación y validación de modelos', estado: 'aprobado' },
      { id: 'instrucciones-t6', label: 'Tema 6', labelCorto: 'Proyecto práctico final', estado: 'aprobado' },
    ],
  },
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
      'La regresión y la clasificación son las dos tareas supervisadas fundamentales del machine learning. En la regresión, el objetivo es predecir un valor numérico continuo —como el precio de una vivienda, la temperatura de mañana o la demanda energética de una ciudad—. En la clasificación, el objetivo es asignar una categoría discreta: determinar si un email es spam, si una imagen contiene un tumor o si un cliente abandonará el servicio.',
    etiquetas: ['Machine Learning', 'Concepto'],
    comentarios: [],
  },
  {
    id: 'b2',
    contenido:
      'Un ejemplo clásico de regresión lineal es predecir el precio de una vivienda en función de su superficie. Si representamos los datos en un gráfico, la regresión lineal encuentra la recta que minimiza el error cuadrático medio entre las predicciones y los valores reales. La ecuación resultante, ŷ = β₀ + β₁x, nos permite estimar el precio de cualquier vivienda conociendo su tamaño. Cuando intervienen múltiples variables —superficie, número de habitaciones, distancia al centro—, hablamos de regresión lineal múltiple.',
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
  {
    id: 'b3',
    contenido:
      'La regresión logística, a pesar de su nombre, es un algoritmo de clasificación binaria. Transforma la salida de una regresión lineal mediante la función sigmoide σ(z) = 1 / (1 + e⁻ᶻ), produciendo una probabilidad entre 0 y 1. Si la probabilidad supera el umbral 0.5, el modelo predice la clase positiva. Es el punto de partida para comprender redes neuronales, ya que la neurona logística es su unidad básica.',
    etiquetas: ['Clasificación', 'Algoritmo'],
    comentarios: [],
  },
  {
    id: 'b4',
    contenido:
      'Para evaluar un modelo de clasificación, la precisión global no siempre es suficiente. En datasets desbalanceados —donde una clase es mucho más frecuente que otra—, un modelo que siempre predice la clase mayoritaria puede tener 95% de precisión y ser inútil. Las métricas clave son: precisión (de los casos predichos positivos, ¿cuántos lo son realmente?), recall (de todos los casos positivos reales, ¿cuántos detectamos?) y F1-score, que combina ambas en una sola cifra. La matriz de confusión visualiza verdaderos positivos, falsos positivos, verdaderos negativos y falsos negativos.',
    etiquetas: ['Clasificación', 'Evaluación'],
    comentarios: [],
  },
  {
    id: 'b5',
    contenido:
      'El algoritmo K-Nearest Neighbors (KNN) clasifica un nuevo punto basándose en los k puntos de entrenamiento más cercanos según una métrica de distancia, habitualmente la euclidiana. Es un método perezoso —no construye un modelo explícito durante el entrenamiento—, lo que lo hace simple pero costoso en inferencia para datasets grandes. La elección de k es crítica: valores pequeños generan modelos muy sensibles al ruido (sobreajuste), mientras que valores grandes producen fronteras de decisión demasiado suavizadas (infraajuste).',
    etiquetas: ['KNN', 'Algoritmo'],
    comentarios: [],
  },
]

export const bloquesTema1 = [
  {
    id: 'b1t1',
    contenido:
      'El aprendizaje automático es una rama de la inteligencia artificial que permite a los sistemas aprender y mejorar a partir de la experiencia sin ser programados explícitamente para cada tarea. A través de algoritmos y modelos estadísticos, los sistemas identifican patrones en los datos y generalizan ese conocimiento para tomar decisiones sobre datos nuevos. La definición más citada es la de Tom Mitchell (1997): un programa aprende de la experiencia E con respecto a una clase de tareas T y una medida de rendimiento P, si su rendimiento en T medido con P mejora con la experiencia E.',
    etiquetas: ['Machine Learning', 'Concepto'],
    comentarios: [],
  },
  {
    id: 'b2t1',
    contenido:
      'Existen tres paradigmas principales de aprendizaje. En el aprendizaje supervisado, el modelo aprende de pares (entrada, etiqueta) y su objetivo es predecir la etiqueta correcta para entradas nuevas; es el más utilizado en aplicaciones industriales. En el aprendizaje no supervisado, los datos no tienen etiquetas y el algoritmo descubre estructura latente: agrupaciones, distribuciones o representaciones comprimidas. En el aprendizaje por refuerzo, un agente aprende a tomar decisiones interactuando con un entorno: recibe recompensas por acciones positivas y penalizaciones por negativas, buscando maximizar la recompensa acumulada.',
    etiquetas: ['Machine Learning', 'Paradigmas'],
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
  {
    id: 'b3t1',
    contenido:
      'El pipeline típico de un proyecto de machine learning sigue una secuencia bien definida: (1) definición del problema y recogida de datos, (2) exploración y análisis exploratorio (EDA), (3) preprocesamiento y limpieza, (4) selección e ingeniería de variables (feature engineering), (5) selección del algoritmo, (6) entrenamiento y validación cruzada, (7) optimización de hiperparámetros, (8) evaluación final sobre el conjunto de test, (9) despliegue y monitorización. Cada etapa puede consumir hasta el 80% del tiempo total del proyecto, siendo el preprocesamiento y la ingeniería de variables las más costosas.',
    etiquetas: ['Machine Learning', 'Pipeline'],
    comentarios: [],
  },
  {
    id: 'b4t1',
    contenido:
      'El sobreajuste (overfitting) ocurre cuando el modelo memoriza el conjunto de entrenamiento y pierde capacidad de generalización. Se detecta porque el error de entrenamiento es bajo pero el error de validación es alto. El infraajuste (underfitting) ocurre cuando el modelo es demasiado simple para capturar la estructura real de los datos. La solución al sobreajuste incluye técnicas de regularización (L1, L2), dropout en redes neuronales, y el aumento de datos. El equilibrio entre sesgo y varianza —el bias-variance tradeoff— es uno de los conceptos más importantes del ML clásico.',
    etiquetas: ['Overfitting', 'Generalización'],
    comentarios: [],
  },
]

export const bloquesIndice = [
  {
    id: 'bi1',
    contenido:
      'Tema 1: Introducción al aprendizaje automático — Definición, historia y aplicaciones reales. Paradigmas de aprendizaje: supervisado, no supervisado y por refuerzo. Pipeline estándar de un proyecto ML. Conceptos de sobreajuste, infraajuste y bias-variance tradeoff.',
    etiquetas: ['Índice', 'Tema 1'],
    comentarios: [],
  },
  {
    id: 'bi2',
    contenido:
      'Tema 2: Regresión y clasificación — Regresión lineal simple y múltiple. Regresión logística y función sigmoide. Algoritmo KNN. Métricas de evaluación: MSE, RMSE, precisión, recall, F1-score. Matriz de confusión.',
    etiquetas: ['Índice', 'Tema 2'],
    comentarios: [],
  },
  {
    id: 'bi3',
    contenido:
      'Tema 3: Árboles de decisión y métodos ensemble — Árboles de decisión: criterios de división (Gini, entropía). Random Forest y bagging. Gradient Boosting y XGBoost. Interpretabilidad de modelos basados en árboles.',
    etiquetas: ['Índice', 'Tema 3'],
    comentarios: [],
  },
  {
    id: 'bi4',
    contenido:
      'Tema 4: Redes neuronales básicas — Perceptrón y función de activación. Arquitectura de red feedforward. Retropropagación del error (backpropagation). Optimizadores: SGD, Adam. Introducción a frameworks: PyTorch y TensorFlow.',
    etiquetas: ['Índice', 'Tema 4'],
    comentarios: [],
  },
  {
    id: 'bi5',
    contenido:
      'Tema 5: Evaluación y validación de modelos — Validación cruzada k-fold. Búsqueda de hiperparámetros: Grid Search, Random Search, Bayesian Optimization. Curvas ROC y AUC. Detección y corrección de data leakage.',
    etiquetas: ['Índice', 'Tema 5'],
    comentarios: [],
  },
  {
    id: 'bi6',
    contenido:
      'Tema 6: Proyecto final integrador — Desarrollo end-to-end de un pipeline ML sobre un dataset real. Preprocesamiento, modelado, evaluación y presentación de resultados. Uso de MLflow para tracking de experimentos.',
    etiquetas: ['Índice', 'Tema 6'],
    comentarios: [],
  },
]

// Instrucciones didácticas generales (sección "Instrucciones" del pipeline)
export const bloquesInstrucciones = [
  {
    id: 'bins1',
    contenido:
      'Perfil del estudiante y prerrequisitos: Esta asignatura está diseñada para estudiantes del Máster en Inteligencia Artificial con conocimientos básicos de programación en Python (sintaxis, estructuras de datos, funciones) y estadística descriptiva (media, varianza, distribuciones). No se requiere experiencia previa en machine learning. Se recomienda haber completado previamente la asignatura de Fundamentos de Python del programa.',
    etiquetas: ['Instrucciones', 'Prerrequisitos'],
    comentarios: [],
  },
  {
    id: 'bins2',
    contenido:
      'Metodología por tema: Cada uno de los 6 temas sigue la misma estructura didáctica. Primero, una lectura conceptual con ejemplos contextualizados (este documento). Segundo, un notebook de práctica en Google Colab con código ejecutable y datasets reales —disponible en el aula virtual—. Tercero, un ejercicio de autoevaluación tipo test de 10 preguntas, obligatorio antes de avanzar al tema siguiente. El ritmo sugerido es un tema por semana, con una dedicación de 4 a 6 horas semanales.',
    etiquetas: ['Instrucciones', 'Metodología'],
    comentarios: [],
  },
  {
    id: 'bins3',
    contenido:
      'Herramientas y entorno de trabajo: Los ejemplos de código están escritos en Python 3.10+ con NumPy, Pandas, Matplotlib, Seaborn y Scikit-learn para los Temas 1 al 5, y PyTorch para el Tema 4. Todos los notebooks están disponibles en Google Colab. Para trabajo local, el archivo environment.yml del repositorio del curso contiene el entorno Conda completo.',
    etiquetas: ['Instrucciones', 'Herramientas'],
    comentarios: [],
  },
  {
    id: 'bins4',
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
    contenido:
      'Objetivo de aprendizaje: Al finalizar este tema, el estudiante será capaz de definir el aprendizaje automático y distinguirlo de la programación tradicional, identificar los tres paradigmas de aprendizaje (supervisado, no supervisado y por refuerzo) con ejemplos reales, y describir las etapas del pipeline estándar de un proyecto ML.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 1'],
    comentarios: [],
  },
  {
    id: 'it1-2',
    contenido:
      'Cómo estudiar este tema: Comienza con la lectura completa antes de abrir el notebook. Los conceptos de sesgo y varianza (bias-variance tradeoff) son fundamentales para todos los temas siguientes —dedícales tiempo extra si es necesario—. El notebook del Tema 1 incluye un experimento interactivo donde puedes ajustar la complejidad del modelo y observar en tiempo real cómo cambia el sobreajuste.',
    etiquetas: ['Instrucciones', 'Metodología', 'Tema 1'],
    comentarios: [],
  },
  {
    id: 'it1-3',
    contenido:
      'Autoevaluación y avance: El test de autoevaluación del Tema 1 cubre definiciones, paradigmas de aprendizaje y fases del pipeline. Debes obtener al menos 6/10 para desbloquear el Tema 2. Si no lo superas en el primer intento, revisa los bloques sobre paradigmas y pipeline antes de repetirlo. El test se puede repetir hasta tres veces.',
    etiquetas: ['Instrucciones', 'Evaluación', 'Tema 1'],
    comentarios: [],
  },
]

export const instruccionesTema2 = [
  {
    id: 'it2-1',
    contenido:
      'Objetivo de aprendizaje: Al finalizar este tema, el estudiante será capaz de implementar regresión lineal y logística desde cero en Python, seleccionar la métrica de evaluación adecuada según el tipo de problema (MSE para regresión, F1-score para clasificación desbalanceada), y aplicar el algoritmo KNN explicando el efecto del hiperparámetro k sobre el modelo.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 2'],
    comentarios: [],
  },
  {
    id: 'it2-2',
    contenido:
      'Cómo estudiar este tema: Este tema es el más matemático de la primera mitad del curso. Si la notación matricial te resulta nueva, el aula virtual incluye un repaso de álgebra lineal básica. Presta especial atención al bloque sobre métricas de evaluación: es el error más común en proyectos reales usar precisión global cuando el dataset está desbalanceado. El notebook incluye tres datasets de práctica: precios de vivienda (regresión), detección de spam (clasificación binaria) y clasificación de flores Iris (multiclase).',
    etiquetas: ['Instrucciones', 'Metodología', 'Tema 2'],
    comentarios: [],
  },
  {
    id: 'it2-3',
    contenido:
      'Conexión con el Tema 3: Los conceptos de frontera de decisión y sobreajuste que introduces aquí son la base directa de los árboles de decisión del Tema 3. Cuando termines este tema, reflexiona sobre por qué KNN con k=1 sobreajusta siempre: esa intuición te ayudará a entender la profundidad de los árboles de decisión.',
    etiquetas: ['Instrucciones', 'Conexión temática', 'Tema 2'],
    comentarios: [],
  },
]

export const instruccionesTema3 = [
  {
    id: 'it3-1',
    contenido:
      'Objetivo de aprendizaje: Al finalizar este tema, el estudiante será capaz de construir un árbol de decisión desde cero usando los criterios Gini y entropía, implementar un Random Forest explicando el mecanismo de bagging y la decorrelación de árboles, y comparar el rendimiento de Gradient Boosting frente a Random Forest en un dataset tabulado.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 3'],
    comentarios: [],
  },
  {
    id: 'it3-2',
    contenido:
      'Cómo estudiar este tema: Este tema es clave para aplicaciones industriales — los métodos ensemble dominan competiciones de datos tabulados. Primero asegúrate de entender bien un árbol de decisión individual antes de pasar a Random Forest. El notebook incluye visualizaciones interactivas de las fronteras de decisión de un árbol vs. un ensemble. Dedica tiempo especial a XGBoost: es el algoritmo más usado en producción para datos estructurados.',
    etiquetas: ['Instrucciones', 'Metodología', 'Tema 3'],
    comentarios: [],
  },
  {
    id: 'it3-3',
    contenido:
      'Autoevaluación y avance: El test del Tema 3 cubre criterios de división, hiperparámetros de Random Forest (n_estimators, max_depth) y diferencias entre bagging y boosting. Se requiere 6/10 para desbloquear el Tema 4. El notebook incluye un ejercicio práctico de tuning de hiperparámetros sobre el dataset UCI Adult.',
    etiquetas: ['Instrucciones', 'Evaluación', 'Tema 3'],
    comentarios: [],
  },
]

export const instruccionesTema4 = [
  {
    id: 'it4-1',
    contenido:
      'Objetivo de aprendizaje: Al finalizar este tema, el estudiante será capaz de implementar un perceptrón multicapa (MLP) en PyTorch, explicar el algoritmo de retropropagación paso a paso con derivadas parciales, y entrenar una red feedforward sobre un dataset de clasificación eligiendo la función de activación y el optimizador correctos.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 4'],
    comentarios: [],
  },
  {
    id: 'it4-2',
    contenido:
      'Cómo estudiar este tema: Este es el tema más denso matemáticamente del curso. Recomendamos repasar la regla de la cadena del cálculo diferencial antes de la sesión de backpropagation. El notebook incluye una implementación desde cero en NumPy (sin frameworks) para que entiendas cada operación, seguida de la versión equivalente en PyTorch. No avances a la práctica hasta entender bien el forward pass y el cálculo del gradiente.',
    etiquetas: ['Instrucciones', 'Metodología', 'Tema 4'],
    comentarios: [],
  },
  {
    id: 'it4-3',
    contenido:
      'Conexión con temas anteriores y siguientes: La neurona logística del Tema 2 es literalmente la unidad básica de una red neuronal. Los conceptos de sobreajuste del Tema 1 aplican directamente: el dropout es la técnica de regularización específica de redes neuronales. El Tema 5 cubrirá cómo validar correctamente estos modelos, que son especialmente propensos a overfitting.',
    etiquetas: ['Instrucciones', 'Conexión temática', 'Tema 4'],
    comentarios: [],
  },
]

export const instruccionesTema5 = [
  {
    id: 'it5-1',
    contenido:
      'Objetivo de aprendizaje: Al finalizar este tema, el estudiante será capaz de diseñar una estrategia de validación cruzada k-fold correcta evitando data leakage, implementar búsqueda de hiperparámetros con Grid Search y Random Search, e interpretar curvas ROC y AUC para comparar modelos de clasificación binaria.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 5'],
    comentarios: [],
  },
  {
    id: 'it5-2',
    contenido:
      'Cómo estudiar este tema: La validación correcta de modelos es el tema más subestimado y el que genera más errores en proyectos reales. Presta atención especial al concepto de data leakage: es el error más costoso y difícil de detectar en producción. El notebook incluye tres casos de estudio de leakage real —uno en preprocesamiento, uno en feature engineering y uno en validación— extraídos de competiciones de Kaggle.',
    etiquetas: ['Instrucciones', 'Metodología', 'Tema 5'],
    comentarios: [],
  },
  {
    id: 'it5-3',
    contenido:
      'Preparación para el proyecto final: Este tema cierra el ciclo técnico del curso. Después de completarlo, tendrás todas las herramientas para el Tema 6. Recomendamos revisar los temas 1 a 5 antes de comenzar el proyecto, con especial atención a las métricas de evaluación (Tema 2) y la validación cruzada (este tema). El proyecto requiere justificar todas las decisiones de modelado — empieza a documentar tus razonamientos desde el primer análisis exploratorio.',
    etiquetas: ['Instrucciones', 'Proyecto final', 'Tema 5'],
    comentarios: [],
  },
]

export const instruccionesTema6 = [
  {
    id: 'it6-1',
    contenido:
      'Objetivo de aprendizaje: El Tema 6 es un proyecto integrador. El estudiante deberá desarrollar un pipeline ML completo sobre un dataset real a elegir de una lista propuesta, documentando cada decisión desde el análisis exploratorio hasta la evaluación final. Se valorará la capacidad de justificación crítica, no solo el rendimiento del modelo.',
    etiquetas: ['Instrucciones', 'Objetivos', 'Tema 6'],
    comentarios: [],
  },
  {
    id: 'it6-2',
    contenido:
      'Estructura del entregable: El proyecto se entrega como notebook (.ipynb) con las siguientes secciones obligatorias: (1) Análisis exploratorio con al menos 5 visualizaciones comentadas, (2) Preprocesamiento y justificación de decisiones, (3) Selección y entrenamiento de al menos 2 modelos distintos, (4) Validación cruzada y comparación de métricas, (5) Análisis de errores e interpretabilidad, (6) Conclusiones y limitaciones del modelo.',
    etiquetas: ['Instrucciones', 'Entregable', 'Tema 6'],
    comentarios: [],
  },
  {
    id: 'it6-3',
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

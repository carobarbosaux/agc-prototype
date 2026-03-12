// AUTHOR_WORKFLOW_MOCKDATA.js
// Deep Learning case study: New subject assignment workflow
// Use case: Author with newly assigned subject (no content created yet)

// ============================================================================
// 1. SUBJECT ASSIGNMENT (Entry Point)
// ============================================================================

export const asignacionesActuales = [
  {
    id: "deep-learning",
    nombre: "Deep Learning",
    titulacion: "Master in Artificial Intelligence",
    tipoEstudio: "Master",
    area: "Technology",
    creditos: "6 ECTS",
    coordinador: "Carlos Mendoza",
    especialista: "Antonio Abad",
    modelo: "4P",
    estado: "NO_CREADA", // NOT_CREATED - workflow starts from Step 1
    pasoActual: 1 // Current step in creation workflow (1, 2, or 3)
  }
];

// ============================================================================
// 2. STEP 1: ACADEMIC METADATA (Fixed Information - Read Only)
// ============================================================================

export const metadatosAcademicos = {
  "deep-learning": {
    nombre: "Deep Learning",
    titulacion: "Master in Artificial Intelligence",
    tipoEstudio: "Master",
    area: "Technology",
    creditos: "6 ECTS",
    coordinador: "Carlos Mendoza",
    especialista: "Antonio Abad",
    modelo: "4P"
  }
};

// ============================================================================
// 3. STEP 2: MEMORY DESCRIPTOR + LEARNING OUTCOMES (Author Input)
// ============================================================================

// Form structure (empty - what Author will fill)
export const descriptorMemoriaFormulario = {
  "deep-learning": {
    nivelConocimientoPrevio: null, // Will be: "inicial" | "intermedio" | "avanzado" | "experto"
    numeroTemas: null, // Will be: 1-10 (recommended: 8)
    enfoque: null, // Will be: "teorico" | "practico" | "teorico-practico" | "basado-casos" | "basado-proyectos"
    temasObligatorios: "", // Free text
    opciones: [], // Will contain: ["plan-videos", "apartado-fondo"]
    archivos: [] // Will contain uploaded files
  }
};

// Sample filled data (for testing/preview)
export const descriptorMemoriaDatos = {
  "deep-learning": {
    nivelConocimientoPrevio: "avanzado",
    numeroTemas: 8,
    enfoque: "teorico-practico",
    temasObligatorios: "Fundamentos de redes neuronales, Entrenamiento y optimización, Arquitecturas modernas (CNN, RNN, Transformers), Aplicaciones prácticas en visión y NLP",
    opciones: ["plan-videos", "apartado-fondo"],
    archivos: []
  }
};

// ============================================================================
// 4. STEP 3: SUBJECT SUMMARY (AI-Generated)
// ============================================================================

export const resumenAsignatura = {
  "deep-learning": {
    titulo: "Deep Learning y Redes Neuronales",
    
    descripcionGeneral: `La asignatura **Deep Learning y Redes Neuronales** introduce al estudiante en los fundamentos y aplicaciones del aprendizaje profundo dentro del campo de la inteligencia artificial. A lo largo del curso se analizan los principios que sustentan el funcionamiento de las redes neuronales artificiales y su capacidad para aprender patrones complejos a partir de datos. El enfoque combina bases conceptuales con una aproximación aplicada orientada a comprender cómo estos modelos se utilizan para resolver problemas en ámbitos como la visión por computador, el procesamiento del lenguaje natural o el análisis de grandes volúmenes de información.

Asimismo, se estudian los procesos de entrenamiento de redes neuronales, las diferentes arquitecturas utilizadas en el aprendizaje profundo y los principales retos asociados a su desarrollo, como la necesidad de datos, la capacidad computacional o la interpretabilidad de los modelos. De esta forma, el estudiante adquiere una visión general del *deep learning* como una de las tecnologías más relevantes dentro de la inteligencia artificial contemporánea.`,
    
    temasConDescripcion: [
      {
        numero: 1,
        titulo: "Introducción al Deep Learning",
        descripcion: "En este tema se va a tratar el concepto de *deep learning* y su relación con la inteligencia artificial y el *machine learning*. Se analizará la evolución histórica de las redes neuronales artificiales y los factores tecnológicos que han impulsado el desarrollo reciente del aprendizaje profundo. También se abordarán los fundamentos conceptuales que permiten comprender cómo los modelos de *deep learning* aprenden a partir de datos y cuáles son sus principales aplicaciones en distintos ámbitos tecnológicos."
      },
      {
        numero: 2,
        titulo: "Fundamentos de redes neuronales artificiales",
        descripcion: "En este tema se va a tratar la estructura y funcionamiento de las redes neuronales artificiales como base del *deep learning*. Se estudiarán los componentes principales de una red neuronal, como las neuronas artificiales, las funciones de activación y la organización en capas. Asimismo, se analizará cómo estas redes procesan información y cómo se utilizan para modelar relaciones complejas dentro de los datos."
      },
      {
        numero: 3,
        titulo: "Entrenamiento de redes neuronales",
        descripcion: "En este tema se va a tratar el proceso mediante el cual las redes neuronales aprenden a partir de datos. Se estudiarán conceptos fundamentales como la función de pérdida, el algoritmo de retropropagación (*backpropagation*) y los métodos de optimización utilizados para ajustar los parámetros del modelo. Además, se analizarán algunos de los problemas más comunes que aparecen durante el entrenamiento, como el sobreajuste o la dificultad para generalizar los resultados."
      },
      {
        numero: 4,
        titulo: "Redes neuronales profundas",
        descripcion: "En este tema se va a tratar el desarrollo de arquitecturas de redes neuronales profundas y su capacidad para aprender representaciones jerárquicas de los datos. Se estudiarán diferentes técnicas utilizadas para mejorar el rendimiento de estos modelos, como la regularización, la inicialización de pesos o la normalización de capas. Asimismo, se analizarán las ventajas y limitaciones de los modelos profundos en diferentes contextos de aplicación."
      },
      {
        numero: 5,
        titulo: "Redes neuronales convolucionales (CNN)",
        descripcion: "En este tema se va a tratar el funcionamiento de las redes neuronales convolucionales, una de las arquitecturas más utilizadas en tareas de visión por computador. Se estudiarán los principios de las capas convolucionales, los mecanismos de *pooling* y las estructuras que permiten identificar patrones visuales en imágenes. También se analizarán algunas de las aplicaciones más relevantes de las CNN en el reconocimiento de imágenes y la clasificación visual."
      },
      {
        numero: 6,
        titulo: "Redes neuronales recurrentes (RNN)",
        descripcion: "En este tema se va a tratar el uso de redes neuronales recurrentes para el análisis de datos secuenciales. Se estudiará cómo estas redes permiten modelar dependencias temporales dentro de secuencias de datos, como texto, audio o series temporales. Asimismo, se analizarán arquitecturas avanzadas como LSTM y GRU, que permiten mejorar el aprendizaje en secuencias largas y complejas."
      },
      {
        numero: 7,
        titulo: "Modelos generativos y aprendizaje profundo",
        descripcion: "En este tema se va a tratar el desarrollo de modelos generativos basados en *deep learning*. Se estudiarán arquitecturas como los autoencoders y las redes generativas adversariales (GAN), así como su capacidad para generar nuevos datos a partir de los patrones aprendidos durante el entrenamiento. También se analizarán aplicaciones del aprendizaje generativo en ámbitos como la generación de imágenes, texto o contenido multimedia."
      },
      {
        numero: 8,
        titulo: "Aplicaciones avanzadas del Deep Learning",
        descripcion: "En este tema se va a tratar el uso del *deep learning* en diferentes contextos de aplicación dentro de la inteligencia artificial. Se estudiarán ejemplos de uso en áreas como la visión artificial, el procesamiento del lenguaje natural y los sistemas inteligentes de toma de decisiones. Asimismo, se analizarán algunas tendencias actuales en el desarrollo de modelos de aprendizaje profundo y los desafíos futuros asociados a esta tecnología."
      }
    ]
  }
};

// ============================================================================
// 5. STEP 4: INDEX (Índice)
// ============================================================================

export const indiceAsignatura = {
  "deep-learning": {
    estado: "generado", // generado | completado
    
    temas: [
      {
        id: "t1",
        numero: 1,
        titulo: "Introducción al Deep Learning",
        epigrafe: "Introducción y objetivos",
        orden: 1
      },
      {
        id: "t2",
        numero: 2,
        titulo: "Fundamentos de redes neuronales artificiales",
        epigrafe: "Introducción y objetivos",
        orden: 2
      },
      {
        id: "t3",
        numero: 3,
        titulo: "Entrenamiento de redes neuronales",
        epigrafe: "Introducción y objetivos",
        orden: 3
      },
      {
        id: "t4",
        numero: 4,
        titulo: "Redes neuronales profundas",
        epigrafe: "Introducción y objetivos",
        orden: 4
      },
      {
        id: "t5",
        numero: 5,
        titulo: "Redes neuronales convolucionales (CNN)",
        epigrafe: "Introducción y objetivos",
        orden: 5
      },
      {
        id: "t6",
        numero: 6,
        titulo: "Redes neuronales recurrentes (RNN)",
        epigrafe: "Introducción y objetivos",
        orden: 6
      },
      {
        id: "t7",
        numero: 7,
        titulo: "Modelos generativos y aprendizaje profundo",
        epigrafe: "Introducción y objetivos",
        orden: 7
      },
      {
        id: "t8",
        numero: 8,
        titulo: "Aplicaciones avanzadas del Deep Learning",
        epigrafe: "Introducción y objetivos",
        orden: 8
      }
    ]
  }
};

// ============================================================================
// 6. TOPIC 1: INSTRUCTIONS (Indicaciones didácticas - Author Input)
// ============================================================================

export const indicacionesDidacticasTema1 = {
  "deep-learning": {
    enfoqueIA: "Proporciona una introducción clara y accesible al concepto de deep learning, diferenciando entre IA, ML y deep learning. Incluye elementos visuales y una línea temporal histórica.",
    bibliografiaT1: "Russell, S. y Norvig, P. (2021). Artificial Intelligence: A Modern Approach. Pearson.\nMitchell, T. M. (1997). Machine Learning. McGraw-Hill.",
    archivosReferencia: [],
    notasPedagogicas: "Incluir actividades interactivas para identificar diferencias entre conceptos. Usar ejemplos de aplicaciones prácticas actuales (visión por computador, NLP). Destacar la importancia de los datos en deep learning."
  }
};

// ============================================================================
// 7. TOPIC 1: SUMMARY (AI-Generated based on Instructions)
// ============================================================================

export const resumenTema1 = {
  "deep-learning": {
    titulo: "Tema 1. Introducción al Deep Learning",
    estado: "generado", // generado | en-edicion | completado
    
    introduccionYObjetivos: `Este primer epígrafe introduce al estudiante en el significado y la relevancia del *deep learning* dentro del campo más amplio de la inteligencia artificial y el aprendizaje automático. Se presenta el aprendizaje profundo como un conjunto de técnicas basadas en redes neuronales artificiales capaces de aprender representaciones complejas a partir de grandes volúmenes de datos. Asimismo, se contextualiza su papel en el desarrollo de sistemas inteligentes capaces de resolver problemas como el reconocimiento de imágenes, la comprensión del lenguaje natural o la predicción de patrones complejos.

Este apartado también permite situar al estudiante en los contenidos del tema y comprender la importancia del *deep learning* como una de las tecnologías clave en el desarrollo actual de la inteligencia artificial.`,
    
    objetivos: [
      "Comprender el concepto de *deep learning* y su relación con la inteligencia artificial y el *machine learning*.",
      "Identificar las principales características que diferencian el aprendizaje profundo de otros enfoques de aprendizaje automático.",
      "Analizar el papel de las redes neuronales artificiales como base de los modelos de *deep learning*.",
      "Conocer las principales aplicaciones actuales del *deep learning* en distintos ámbitos tecnológicos y científicos.",
      "Reconocer los retos y limitaciones asociados al desarrollo y uso de modelos de aprendizaje profundo."
    ],
    
    epigrafe1: {
      titulo: "Concepto y evolución del Deep Learning",
      descripcion: `En este epígrafe se aborda el concepto de *deep learning* desde una perspectiva conceptual e histórica, analizando cómo ha evolucionado a partir de las primeras investigaciones en redes neuronales artificiales. Se revisan los principales hitos en el desarrollo de esta disciplina, desde los primeros modelos neuronales hasta el auge reciente impulsado por la disponibilidad de grandes volúmenes de datos y el aumento de la capacidad computacional.

También se analizan las razones por las cuales el *deep learning* ha adquirido un papel central en la inteligencia artificial contemporánea, especialmente en tareas complejas relacionadas con el análisis de datos no estructurados como imágenes, texto o audio.`,
      ideasDidacticas: [
        "Línea temporal que muestre la evolución histórica de las redes neuronales y del *deep learning*.",
        "Cuadro comparativo entre inteligencia artificial, *machine learning* y *deep learning*.",
        "Ejemplo práctico de aplicaciones actuales del *deep learning*."
      ]
    },
    
    epigrafe2: {
      titulo: "Fundamentos de las redes neuronales artificiales",
      descripcion: `Este epígrafe introduce los principios básicos que sustentan el funcionamiento de las redes neuronales artificiales, explicando su inspiración en el funcionamiento del cerebro humano. Se describen los componentes fundamentales de una red neuronal, como las neuronas artificiales, los pesos, las funciones de activación y las capas que conforman la arquitectura de la red.

Asimismo, se explica cómo las redes neuronales procesan la información y cómo pueden aprender patrones a partir de datos mediante procesos de entrenamiento.`,
      ideasDidacticas: [
        "Esquema visual de la estructura de una red neuronal artificial.",
        "Diagrama que represente el funcionamiento de una neurona artificial.",
        "Actividad breve de identificación de los componentes de una red neuronal."
      ]
    },
    
    epigrafe3: {
      titulo: "El papel de los datos y el entrenamiento de modelos",
      descripcion: `En este epígrafe se explica la importancia de los datos en el desarrollo de modelos de *deep learning*. Se analizan los diferentes tipos de datos utilizados en el entrenamiento de redes neuronales, así como los procesos mediante los cuales los modelos aprenden a partir de ejemplos.

También se introducen conceptos básicos relacionados con el entrenamiento de modelos, como el ajuste de parámetros, la función de pérdida y el proceso de optimización.`,
      ideasDidacticas: [
        "Diagrama del proceso de entrenamiento de una red neuronal.",
        "Ejemplo sencillo que ilustre cómo un modelo aprende a partir de datos.",
        "Actividad breve de reflexión sobre la importancia de los datos en sistemas de inteligencia artificial."
      ]
    },
    
    epigrafe4: {
      titulo: "Aplicaciones y retos del Deep Learning",
      descripcion: `Este último epígrafe presenta algunas de las principales aplicaciones del *deep learning* en diferentes sectores, como la visión por computador, el procesamiento del lenguaje natural, la medicina o la automatización industrial. Se analizan ejemplos de sistemas que utilizan redes neuronales profundas para resolver problemas complejos.

Asimismo, se abordan algunos de los retos asociados al uso de estos modelos, como la necesidad de grandes volúmenes de datos, el alto consumo computacional o las cuestiones relacionadas con la interpretabilidad y la ética de los sistemas de inteligencia artificial.`,
      ideasDidacticas: [
        "Tabla con ejemplos de aplicaciones del *deep learning* en distintos sectores.",
        "Caso práctico sobre el uso de redes neuronales en una aplicación real.",
        "Preguntas de autoevaluación para reforzar la comprensión de los conceptos clave."
      ]
    }
  }
};

// ============================================================================
// 8. TOPIC 1: CONTENT (Full written content - AI Generated)
// ============================================================================

export const contenidoTema1 = {
  "deep-learning": {
    titulo: "Tema 1. Introducción al Deep Learning",
    estado: "generado", // generado | en-edicion | aprobado

    bloques: [
      {
        id: "t1-b1",
        tipo: "h2",
        contenido: "1.1. Introducción y objetivos",
        etiqueta: null
      },
      {
        id: "t1-b2",
        tipo: "p",
        contenido: "A lo largo de este tema se presentan las ideas principales, definiciones y fundamentos en torno al concepto de *deep learning* y se señala su relevancia dentro del desarrollo actual de la inteligencia artificial. El *deep learning* ha experimentado una evolución notable en las últimas décadas, impulsada por el aumento de la capacidad computacional, la disponibilidad de grandes volúmenes de datos y los avances en algoritmos de entrenamiento. Esta disciplina no se limita al uso de modelos matemáticos complejos, sino que constituye un enfoque que permite a los sistemas aprender representaciones jerárquicas de los datos y resolver problemas que anteriormente resultaban difíciles de abordar mediante técnicas tradicionales.",
        etiqueta: null
      },
      {
        id: "t1-b3",
        tipo: "p",
        contenido: "El aprendizaje profundo ha adquirido una posición central en ámbitos como la visión por computador, el procesamiento del lenguaje natural, la robótica, la medicina o los sistemas de recomendación. Su estudio resulta fundamental para comprender una parte importante de los avances recientes en inteligencia artificial, así como los retos técnicos, éticos y prácticos que acompañan a su desarrollo e implementación.",
        etiqueta: null
      },
      {
        id: "t1-b4",
        tipo: "p",
        contenido: "Para ampliar información sobre estos conceptos puedes consultar *Deep Learning*, de Goodfellow, Bengio y Courville (2016), así como *Artificial Intelligence: A Modern Approach*, de Russell y Norvig (2021), en la sección A fondo.",
        etiqueta: null
      },
      {
        id: "t1-b5",
        tipo: "p",
        contenido: "Los objetivos de aprendizaje de este tema son los siguientes:",
        etiqueta: null
      },
      {
        id: "t1-b6",
        tipo: "ul",
        contenido: [
          "Definir el concepto de *deep learning* y su relación con la inteligencia artificial y el *machine learning*.",
          "Conocer el origen y la evolución de las redes neuronales artificiales.",
          "Comprender los principios generales del funcionamiento de una red neuronal.",
          "Identificar el papel de los datos y del entrenamiento en el aprendizaje profundo.",
          "Delimitar las principales aplicaciones, ventajas y limitaciones del *deep learning*."
        ],
        etiqueta: null
      },
      {
        id: "t1-b7",
        tipo: "hr",
        contenido: "",
        etiqueta: null
      },
      {
        id: "t1-b8",
        tipo: "h2",
        contenido: "1.2. Naturaleza y alcance del deep learning",
        etiqueta: null
      },
      {
        id: "t1-b9",
        tipo: "p",
        contenido: "*Deep learning* es una expresión de origen anglosajón que se traduce en español como 'aprendizaje profundo'. Se trata de una rama del *machine learning* basada en el uso de redes neuronales artificiales con múltiples capas capaces de aprender representaciones complejas de los datos. Mientras que otros enfoques de aprendizaje automático suelen apoyarse en la extracción manual de características, el aprendizaje profundo permite que el propio modelo aprenda automáticamente las representaciones más útiles a partir de la información disponible.",
        etiqueta: null
      },
      {
        id: "t1-b10",
        tipo: "p",
        contenido: "Durante los últimos años se han producido importantes avances en este ámbito y, en ocasiones, se percibe una cierta confusión sobre sus límites y diferencias respecto a otros conceptos cercanos. Sin embargo, existe un acuerdo generalizado en situar el *deep learning* dentro del campo del *machine learning*, y a este, a su vez, dentro del ámbito más amplio de la inteligencia artificial.",
        etiqueta: null
      },
      {
        id: "t1-b11",
        tipo: "p",
        contenido: "La inteligencia artificial engloba el conjunto de métodos y técnicas orientados a diseñar sistemas capaces de realizar tareas que normalmente requerirían inteligencia humana, como reconocer patrones, tomar decisiones, comprender lenguaje o generar contenido. Dentro de este campo, el *machine learning* hace referencia a la capacidad de los sistemas para aprender a partir de datos, sin necesidad de ser programados de manera explícita para cada tarea. El *deep learning*, por su parte, constituye un enfoque específico basado en arquitecturas neuronales profundas.",
        etiqueta: null
      },
      {
        id: "t1-b12",
        tipo: "p",
        contenido: "El aprendizaje profundo se encarga de estudiar cómo un sistema computacional puede transformar datos de entrada en representaciones internas cada vez más abstractas. De esta forma, un modelo puede aprender desde rasgos simples hasta estructuras complejas. Por ejemplo, en una tarea de reconocimiento de imágenes, una red neuronal puede aprender primero bordes y texturas, después formas básicas y finalmente objetos completos. En el caso del lenguaje, puede aprender primero relaciones entre palabras, después estructuras sintácticas y finalmente significados más complejos.",
        etiqueta: null
      },
      {
        id: "t1-b13",
        tipo: "p",
        contenido: "Existen numerosas definiciones de *deep learning*. Goodfellow, Bengio y Courville (2016) lo describen como un enfoque del *machine learning* que permite a los modelos aprender representaciones múltiples de los datos mediante el uso de capas sucesivas de procesamiento. Desde una perspectiva más aplicada, puede señalarse que el *deep learning* es el conjunto de técnicas que permiten entrenar redes neuronales profundas para resolver tareas de clasificación, predicción, reconocimiento o generación de información.",
        etiqueta: null
      },
      {
        id: "t1-b14",
        tipo: "p",
        contenido: "A partir de estas definiciones se identifican dos niveles:",
        etiqueta: null
      },
      {
        id: "t1-b15",
        tipo: "ul",
        contenido: [
          "Es una técnica computacional, ya que proporciona modelos, algoritmos y arquitecturas concretas para aprender a partir de datos.",
          "Es también un marco metodológico, porque ha modificado la forma en que se abordan múltiples problemas dentro de la inteligencia artificial, sustituyendo reglas manuales por aprendizaje basado en ejemplos."
        ],
        etiqueta: null
      },
      {
        id: "t1-b16",
        tipo: "p",
        contenido: "En este contexto, el elemento central del *deep learning* pasa a ser la representación automática de la información. Los modelos no solo producen una salida, sino que construyen internamente distintas capas de abstracción que permiten captar patrones complejos. Esta capacidad ha sido clave para el éxito del aprendizaje profundo en tareas donde los datos son abundantes y poco estructurados, como imágenes, texto, audio o vídeo.",
        etiqueta: null
      },
      {
        id: "t1-b17",
        tipo: "h3",
        contenido: "Evolución del concepto de deep learning",
        etiqueta: null
      },
      {
        id: "t1-b18",
        tipo: "p",
        contenido: "Existen distintos hitos que marcan el desarrollo del *deep learning*. Sus orígenes pueden situarse en las primeras investigaciones sobre neuronas artificiales y modelos conexionistas a mediados del siglo XX. Uno de los antecedentes más conocidos es el perceptrón, propuesto por Rosenblatt, que sentó las bases de las primeras redes neuronales.",
        etiqueta: null
      },
      {
        id: "t1-b19",
        tipo: "p",
        contenido: "Posteriormente, el desarrollo de estas técnicas experimentó etapas de avance y retroceso. Durante algunos periodos, el interés por las redes neuronales disminuyó debido a limitaciones matemáticas, falta de capacidad computacional y escasez de datos adecuados para el entrenamiento. Sin embargo, a partir de finales del siglo XX y especialmente durante el siglo XXI, el crecimiento de la potencia de cálculo, el uso de GPU y la disponibilidad de grandes conjuntos de datos permitieron revitalizar este campo.",
        etiqueta: null
      },
      {
        id: "t1-b20",
        tipo: "p",
        contenido: "En la actualidad, el *deep learning* constituye una de las áreas más dinámicas de la inteligencia artificial. Su expansión ha estado relacionada con el éxito de arquitecturas como las redes convolucionales para visión por computador, las redes recurrentes para secuencias y, más recientemente, los modelos basados en mecanismos de atención y *transformers*.",
        etiqueta: null
      }
    ]
  }
};

// ============================================================================
// 9. A FONDO (In-Depth Resources) - WITH NEW CATEGORY LABELS
// ============================================================================

export const aFondoTema1 = {
  "deep-learning": {
    estado: "generado", // generado | en-edicion | aprobado
    
    referencias: [
      {
        id: "af-t1-1",
        numero: 1,
        titulo: "Fundamentos de Inteligencia Artificial",
        autores: ["Russell, S.", "Norvig, P."],
        año: 2021,
        descripcion: "Utiliza este recurso para ampliar la comprensión de los conceptos fundamentales de la inteligencia artificial, incluyendo la definición de agentes inteligentes, los principales enfoques de la disciplina y la evolución histórica del campo. Esta lectura permite contextualizar el desarrollo actual de los sistemas basados en IA dentro de un marco teórico sólido.",
        url: "https://pearson.com/artificial-intelligence-modern-approach",
        relevancia: "high",
        tipo: "book",
        idioma: "en",
        categoria: "ampliaciones-conceptuales"
      },
      {
        id: "af-t1-2",
        numero: 2,
        titulo: "Introducción al Machine Learning",
        autores: ["Mitchell, T. M."],
        año: 1997,
        descripcion: "Con esta lectura puedes profundizar en los principios básicos del aprendizaje automático, una de las áreas clave dentro de la inteligencia artificial. El autor introduce los conceptos de aprendizaje supervisado, no supervisado y por refuerzo, así como las bases teóricas que explican cómo los sistemas pueden mejorar su desempeño a partir de datos.",
        url: "https://www.mheducation.com/highered/product",
        relevancia: "high",
        tipo: "book",
        idioma: "en",
        categoria: "ampliaciones-conceptuales"
      },
      {
        id: "af-t1-3",
        numero: 3,
        titulo: "AI4People—An ethical framework for a good AI society",
        autores: ["Floridi, L.", "Cowls, J.", "Beltrametti, M.", "et al."],
        año: 2018,
        descripcion: "Este artículo analiza los principales retos éticos asociados al desarrollo de la inteligencia artificial. Los autores proponen un marco conceptual para orientar la creación de sistemas de IA responsables, abordando cuestiones como la transparencia, la justicia algorítmica y la responsabilidad en la toma de decisiones automatizadas.",
        url: "https://doi.org/10.1007/s11023-018-9482-5",
        relevancia: "medium",
        tipo: "journal",
        idioma: "en",
        categoria: "tendencias"
      },
      {
        id: "af-t1-4",
        numero: 4,
        titulo: "Deep Learning",
        autores: ["Goodfellow, I.", "Bengio, Y.", "Courville, A."],
        año: 2016,
        descripcion: "Esta obra constituye una referencia fundamental para comprender el funcionamiento de las redes neuronales profundas. A través de este recurso se pueden explorar los principios matemáticos y computacionales que sustentan el aprendizaje profundo, así como su aplicación en áreas como la visión por computador, el procesamiento del lenguaje natural y el reconocimiento de patrones.",
        url: "https://mitpress.mit.edu/books/deep-learning",
        relevancia: "high",
        tipo: "book",
        idioma: "en",
        categoria: "ampliaciones-conceptuales"
      },
      {
        id: "af-t1-5",
        numero: 5,
        titulo: "What is Artificial Intelligence?",
        autores: ["IBM Technology"],
        año: 2023,
        descripcion: "Este recurso audiovisual ofrece una introducción clara a los conceptos clave de la inteligencia artificial y sus principales aplicaciones en la actualidad. El vídeo explica cómo funcionan los sistemas de IA, qué tecnologías los sustentan y en qué ámbitos están siendo implementados, facilitando una comprensión general del impacto de esta tecnología en distintos sectores.",
        url: "https://www.youtube.com/watch?v=ad79nYk2keg",
        relevancia: "medium",
        tipo: "video",
        idioma: "en",
        categoria: "lecturas-complementarias"
      }
    ],
    
    categoriasDisponibles: [
      {
        id: "casos-reales",
        label: "Casos reales",
        descripcion: "Real-world applications and case studies"
      },
      {
        id: "ampliaciones-conceptuales",
        label: "Ampliaciones conceptuales",
        descripcion: "Deeper conceptual exploration and theory"
      },
      {
        id: "tendencias",
        label: "Tendencias",
        descripcion: "Current trends and cutting-edge developments"
      },
      {
        id: "lecturas-complementarias",
        label: "Lecturas complementarias",
        descripcion: "Complementary reading and supplementary materials"
      }
    ]
  }
};

// ============================================================================
// 10. LOADING STATES & CHAIN OF THOUGHT
// ============================================================================

export const recursosChainingThoughts = [
  "Analyzing topic: Introduction to Deep Learning",
  "Identified key concepts: AI, ML, deep learning, neural networks, historical evolution",
  "Searching academic databases...",
  "PubMed: 124 results | IEEE Xplore: 89 results | JSTOR: 456 results",
  "Filtering by: peer-reviewed, 2015-2024, English/Spanish",
  "Candidates after filtering: 542 results",
  "Computing relevance scores based on topic alignment...",
  "Ranking by citation count and recency...",
  "Finalizing top 10 references..."
];

export const cargandoResumenTema1 = [
  "Analyzing didactic instructions for Topic 1...",
  "Processing pedagogical notes and learning objectives...",
  "Generating structure based on prior knowledge level and approach...",
  "Creating introduction and objectives sections...",
  "Developing conceptual framework for sections...",
  "Adding didactic ideas and visual element suggestions...",
  "Finalizing Topic 1 Summary..."
];

// ============================================================================
// 11. STATUS CONFIGURATIONS
// ============================================================================

export const estadosPosibles = {
  indice: ["generado", "en-edicion", "completado"],
  
  tema: {
    indicaciones: ["pendiente", "editando", "completado"],
    resumen: ["generado", "en-edicion", "completado"],
    contenido: ["generado", "en-edicion", "aprobado"],
    aFondo: ["generado", "en-edicion", "aprobado"]
  },
  
  recurso: ["generado", "editando", "aprobado"],
  
  asignatura: ["no-creada", "en-creacion", "en-edicion", "enviada-revision", "aprobada"]
};

export const estadoBadgeConfig = {
  "generado": { color: "blue", label: "Generado", icon: "sparkles" },
  "en-edicion": { color: "yellow", label: "En edición", icon: "edit" },
  "completado": { color: "green", label: "Completado", icon: "checkCircle" },
  "aprobado": { color: "green", label: "Aprobado", icon: "checkCircle" },
  "pendiente": { color: "gray", label: "Pendiente", icon: "clock" }
};

// ============================================================================
// 12. VALIDATION RULES
// ============================================================================

export const validacionesStep2 = {
  nivelConocimientoPrevio: {
    required: true,
    options: ["inicial", "intermedio", "avanzado", "experto"],
    errorMsg: "Nivel de conocimiento previo requerido"
  },
  numeroTemas: {
    required: true,
    min: 1,
    max: 10,
    recommended: 8,
    errorMsg: "Máximo 10 temas (recomendado 8)"
  },
  enfoque: {
    required: true,
    options: ["teorico", "practico", "teorico-practico", "basado-casos", "basado-proyectos"],
    errorMsg: "Enfoque de asignatura requerido"
  },
  temasObligatorios: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    errorMsg: "Ingrese al menos 10 caracteres"
  },
  opciones: {
    maxSelections: 2,
    options: ["plan-videos", "apartado-fondo"],
    errorMsg: "Máximo 2 opciones"
  }
};

// ============================================================================
// 13. CATEGORY OPTIONS FOR A FONDO RESOURCES
// ============================================================================

export const categoriasRecursos = [
  { 
    id: "casos-reales", 
    label: "Casos reales",
    descripcion: "Aplicaciones prácticas y estudios de caso del mundo real"
  },
  { 
    id: "ampliaciones-conceptuales", 
    label: "Ampliaciones conceptuales",
    descripcion: "Exploración conceptual más profunda y teoría avanzada"
  },
  { 
    id: "tendencias", 
    label: "Tendencias",
    descripcion: "Desarrollos actuales y tecnologías de vanguardia"
  },
  { 
    id: "lecturas-complementarias", 
    label: "Lecturas complementarias",
    descripcion: "Materiales de lectura adicional y suplementarios"
  }
];

// ============================================================================
// END OF AUTHOR WORKFLOW MOCKDATA
// ============================================================================


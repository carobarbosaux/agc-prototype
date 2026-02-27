# AGC 2.0 — Plan para Claude Code
### Prototipo navegable · Fase 2: Plataforma de contenido inteligente

---

## Objetivo

Construir un prototipo navegable de alta fidelidad de AGC 2.0 que simule el flujo real de trabajo de un Autor creando contenido educativo para el Máster en Inteligencia Artificial de UNIR.

No es un producto funcional. Es una experiencia simulada con datos hardcodeados que permita demostrar el flujo completo: dashboard → canvas → revisión → aprobación.

---

## Stack técnico

- **Framework:** React (single file .jsx o proyecto Vite según complejidad)
- **Estilos:** Tailwind CSS — clases utilitarias únicamente, sin CSS custom salvo variables de tokens
- **Iconos:** lucide-react
- **Estado:** useState / useReducer — sin backend, sin localStorage
- **Datos:** todos hardcodeados en un archivo `mockData.js`
- **Routing:** estado interno con useState (sin react-router para mantenerlo simple)

---

## Tokens de diseño

### Paleta de colores

```js
// Estados del pipeline
const colors = {
  porComenzar:  { bg: '#F8FAFC', text: '#94A3B8', border: '#E2E8F0' },
  bloqueado:    { bg: '#F1F5F9', text: '#94A3B8', border: '#CBD5E1' },
  borrador:     { bg: '#EFF6FF', text: '#3B82F6', border: '#BFDBFE' },
  revision:     { bg: '#FFFBEB', text: '#F59E0B', border: '#FDE68A' },
  comentarios:  { bg: '#FFF7ED', text: '#F97316', border: '#FED7AA' },
  aprobado:     { bg: '#F0FDF4', text: '#10B981', border: '#A7F3D0' },
  publicado:    { bg: '#ECFDF5', text: '#059669', border: '#6EE7B7' },
}

// Tags de gravedad en comentarios
const severity = {
  critico:    '#EF4444',  // rojo
  importante: '#F97316',  // naranja
  sugerencia: '#EAB308',  // amarillo
  nota:       '#3B82F6',  // azul
}

// Capa IA
const ai = {
  primary:    '#6366F1',  // índigo
  light:      '#EEF2FF',  // fondo suave
  accent:     '#8B5CF6',  // púrpura para acciones IA
}
```

### Tipografía
- Fuente principal: `'DM Sans'` (Google Fonts) — legible, moderna, no genérica
- Fuente de código/etiquetas: `'JetBrains Mono'` — para tags y badges técnicos
- Tamaños: sistema de 4px (12, 14, 16, 20, 24, 32px)

### Espaciado y layout
- Canvas: 3 columnas — sidebar 240px | área central flexible | panel IA 320px (colapsable)
- Topbar: 56px fijo
- Barra de acciones: 64px fija en la parte inferior
- Border radius: 8px para cards, 6px para badges, 4px para tags pequeños

---

## Datos de muestra (mockData)

```js
// mockData.js — hardcodear todo, nunca mostrar pantallas vacías

export const currentUser = {
  name: 'Ana Lucía Martínez',
  role: 'autor', // 'autor' | 'coordinador' | 'editor' | 'disenador'
  avatar: 'AL'
}

export const dashboardStats = [
  { label: 'Asignaturas en borrador', value: 2, color: 'borrador', filter: 'borrador' },
  { label: 'Con comentarios pendientes', value: 1, color: 'comentarios', filter: 'comentarios' },
  { label: 'Aprobadas esta semana', value: 1, color: 'aprobado', filter: 'aprobado' },
]

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
  }
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
    comentarios: [
      {
        id: 'c1',
        autor: 'Carlos Mendoza (Coordinador)',
        avatar: 'CM',
        gravedad: 'critico',
        texto: 'Añadir referencia académica a este ejemplo. Sin fuente no se puede aprobar.',
        resuelto: false,
        respuestas: [],
      }
    ],
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
```

---

## Componentes (reutilizables)

### Componentes base
- `Topbar` — breadcrumb + selector de rol (dropdown) + badge notificaciones + avatar
- `PipelineSidebar` — pipeline con estados, expandible, bloqueados con tooltip
- `PanelIA` — chat con historial, typing indicator, sugerencias rápidas
- `PanelNotificaciones` — overlay lateral con filtros
- `BloqueContenido` — bloque editable con toolbar inline, marcador de comentarios
- `ComentarioHilo` — comentario con respuestas anidadas y opción de marcar resuelto
- `EstadoBadge` — badge de color por estado del pipeline
- `GravedadTag` — tag de severidad de comentario (🔴🟠🟡🔵)
- `EtiquetaBloque` — chip de etiqueta de dominio temático
- `BloqueContenido` — bloque de texto con etiquetas, comentarios y toolbar inline
- `ComentarioHilo` — comentario con respuestas anidadas y opción de marcar resuelto
- `NotificacionItem` — fila de notificación con icono, texto y link

### Pantallas (páginas)
- `PantallaHerramientas` — grid de herramientas, Generación de Asignaturas destacada
- `PantallaDashboard` — cards de resumen + tabla agrupada por titulación
- `PantallaCanvas` — layout 3 columnas: pipeline | contenido | IA
- `PantallaNotificaciones` — lista agrupada con filtros

---

## Estructura de navegación (con useState)

```jsx
// Estado de navegación — sin react-router
const [pantalla, setPantalla] = useState('herramientas')
const [rolActivo, setRolActivo] = useState('autor') // para demo de cambio de rol
const [seccionActiva, setSeccionActiva] = useState('t2')
const [panelIAabierto, setPanelIAabierto] = useState(true)

// Flujo principal:
// 'herramientas' → 'dashboard' → 'canvas' → (dentro del canvas: seccionActiva cambia)
// Pantalla de notificaciones: modal o pantalla separada
```

---

## Comportamientos interactivos requeridos

### Dashboard
- [ ] Titulación expandida/colapsada al hacer clic en el encabezado del grupo
- [ ] Cards de resumen filtran la tabla al hacer clic
- [ ] Clic en fila de asignatura activa → navega al canvas en la sección activa
- [ ] Filtros de tabla funcionales (al menos por estado)

### Pipeline (sidebar del canvas)
- [ ] Etapas aprobadas y en borrador son clickeables → cambian `seccionActiva`
- [ ] Etapas bloqueadas no son clickeables — cursor `not-allowed` + tooltip explicativo
- [ ] Etapa activa resaltada visualmente
- [ ] Temas colapsables dentro del grupo Temario

### Canvas — área de contenido
- [ ] Al seleccionar texto aparece toolbar inline: `Mejorar / Expandir / Resumir / Cambiar tono`
- [ ] Comentarios anclados visibles como marcador lateral en el bloque correspondiente
- [ ] Al hacer clic en un comentario se abre el hilo en el panel derecho (o modal)
- [ ] Comentarios mostrando tag de gravedad con color correcto
- [ ] Botón "Marcar como resuelto" en cada comentario

### Panel IA
- [ ] Colapsable con animación suave
- [ ] Input de chat funcional — al enviar un mensaje aparece respuesta simulada
- [ ] Respuesta simulada de la IA: texto fijo para el prototipo (no llamada real a API)
- [ ] Historial de conversación visible con scroll

### Selector de rol (para demo)
El selector de rol es el mecanismo central del prototipo. Está en la esquina superior derecha, siempre visible. Al cambiar de rol, **toda la interfaz se reconfigura** — misma pantalla, mismo contenido, mismo pipeline. Lo único que cambia es lo que cada rol puede ver y hacer.

- [ ] Selector desplegable con las 4 opciones: `Autor / Coordinador / Editor de contenido / Diseñador instruccional`
- [ ] El cambio es instantáneo — sin navegación, sin recarga
- [ ] **NUNCA** mostrar vistas mezcladas o simultáneas de distintos roles
- [ ] El estado del contenido no cambia al cambiar de rol — solo cambian los permisos y acciones disponibles

**Qué cambia por rol en el canvas:**

| Elemento | Autor | Coordinador | Editor | Diseñador |
|---|---|---|---|---|
| Área de contenido | Editable | Solo lectura | Solo lectura | Solo lectura |
| Barra de acciones | Guardar / Enviar a revisión | Aprobar / Solicitar correcciones | Dejar comentario | Dejar comentario |
| Panel IA | Chat activo | Visible pero sin edición | — | — |
| Comentarios | Ve los que recibe, puede responder | Puede crear y responder | Puede crear y responder | Puede crear |
| Etiquetas | Editable inline | Aprueba junto con contenido | Ve pero no edita | Ve pero no edita |

**Qué cambia por rol en el dashboard:**

| Elemento | Autor | Coordinador | Editor | Diseñador |
|---|---|---|---|---|
| Cards de resumen | Sus borradores y comentarios pendientes | Sus pendientes de aprobación | Sus revisiones activas | Sus asignaturas para enriquecer |
| Tabla | Solo sus asignaturas asignadas | Todas las que supervisa, ordenadas por urgencia | Asignaturas con revisiones activas | Asignaturas con contenido aprobado |
| Columna "Pendiente de" | "Tú" o "Coordinador" | "Tú" o nombre del Autor | "Tú" | "Tú" |

### Notificaciones
- [ ] Badge numérico en topbar (🔔 con número)
- [ ] Panel de notificaciones con las 3 notificaciones hardcodeadas
- [ ] Filtros: `Todas / Pendiente de mi acción / Informativas`
- [ ] Clic en notificación → navega a la pantalla correspondiente

---

## Pantallas del prototipo

El prototipo tiene **3 pantallas**, no una por rol. El selector de rol en la esquina superior derecha reconfigura cada pantalla. No hay pantallas separadas por rol.

---

### Pantalla 1 — Herramientas
Grid de cards. Herramientas disponibles (ficticias, para contexto visual):
- **Generación de Asignaturas** — destacada, card grande o con borde/color diferente, estado activo
- Diseñador de Actividades — card secundaria, apagada visualmente
- Mejora de Rúbricas — card secundaria
- Generador de Tests — card secundaria
- Corrector de Actividades — card secundaria

Ninguna card secundaria es clickeable. El selector de rol ya está visible aquí en el topbar.

Al hacer clic en "Generación de Asignaturas" → Pantalla 2.

---

### Pantalla 2 — Dashboard
Una sola pantalla que se reconfigura por rol.

**Con rol Autor:** La titulación "Máster en IA" expandida, 7 asignaturas, "Fundamentos de ML" en borrador con "Pendiente de: tú". Cards: `2 en borrador · 1 con comentarios · 1 aprobada`.

**Con rol Coordinador:** Las mismas asignaturas pero reordenadas por urgencia. "Fundamentos de ML · Tema 1" aparece primera con estado "En revisión · pendiente de ti". Cards: `1 pendiente de aprobación · 1 con comentario crítico`.

**Con rol Editor / Diseñador:** Tabla filtrada a las asignaturas relevantes para su rol. Cards adaptadas.

Al hacer clic en "Fundamentos de Machine Learning" → Pantalla 3 (canvas), en la sección activa para ese rol.

---

### Pantalla 3 — Canvas
Una sola pantalla con layout de 3 columnas: pipeline izquierdo | contenido central | panel IA derecho.

El contenido, el pipeline y los datos son siempre los mismos. Lo que cambia por rol:

**Con rol Autor:**
- Sección activa: Tema 2 en borrador
- Área central: editable, bloques con etiquetas, toolbar inline al seleccionar texto
- Panel IA: chat activo con historial
- Barra de acciones: `Guardar borrador · Solicitar permiso de edición · → Enviar a revisión`

**Con rol Coordinador:**
- Sección activa: Tema 1 en revisión (el coordinador tiene pendiente este tema)
- Área central: solo lectura, comentario `🔴 Crítico` anclado al Bloque 2 visible
- Panel derecho: hilo del comentario con opción de responder o marcar resuelto
- Barra de acciones: `Dejar comentario · Solicitar correcciones · ✓ Aprobar esta sección`

**Con rol Editor de contenido:**
- Sección activa: Tema 1 en revisión
- Área central: solo lectura, puede ver comentarios existentes y añadir los propios
- Barra de acciones: `Dejar comentario · Solicitar revisión adicional`

**Con rol Diseñador instruccional:**
- Sección activa: Tema 1 en revisión
- Área central: solo lectura, puede sugerir enriquecimiento de formato
- Barra de acciones: `Dejar comentario · Sugerir enriquecimiento`

---

### Panel de notificaciones
Modal o panel lateral accesible desde el badge 🔔 en el topbar, desde cualquier pantalla.
Las 3 notificaciones del mockData, con filtros `Todas / Pendiente de mi acción / Informativas`.
Al hacer clic en una notificación → navega a la pantalla y sección correspondiente.

---

## Lo que NO construir

- Llamadas reales a API o IA — todo es simulado con datos fijos
- Autenticación o login
- Persistencia de datos — no usar localStorage
- Pantallas de Titulaciones como paso intermedio — el dashboard lo resuelve todo
- Terminología inventada — solo la del brief (sin "Átomos de Contenido", "Fábrica", "Espacios", etc.)
- Banners de bienvenida genéricos en el dashboard
- Modales de creación — el prototipo no crea contenido desde cero, simula uno ya existente

---

## Criterios de calidad visual

- Referentes: Notion (edición) + Linear (estados y pipeline) + Google Docs (revisión)
- Tipografía: DM Sans para UI, JetBrains Mono para tags y etiquetas técnicas
- Los estados deben ser inmediatamente legibles por color sin necesidad de leer el texto
- El pipeline lateral debe comunicar el flujo de un vistazo — dónde estás, qué está aprobado, qué está bloqueado
- El panel IA debe sentirse como un colaborador presente, no como un chatbot añadido
- La barra de acciones inferior debe ser clara y diferente por rol — es el CTA principal de cada pantalla

---

*Plan preparado para Claude Code — basado en AGC Brief Base44 v5*
*UNIR 2026 · Fase 2 de 4*

# AGC 2.0 — Contexto de sesión
*Última actualización: 2026-03-04*
*Fase 2 completada + Fase 3 en curso: roles diferenciados, notas, autosave*

---

## Qué es este proyecto

Prototipo navegable de alta fidelidad de **AGC 2.0** — plataforma de creación de contenido educativo para UNIR. Stack: React + Vite + Tailwind CSS v4 + lucide-react. Datos hardcodeados en `mockData.js`. Sin router — `pantalla` en App.jsx controla la pantalla activa.

---

## Estado actual del prototipo

### Pantallas

1. **Herramientas** (`src/screens/PantallaHerramientas.jsx`)
   - Grid de 5 tools. Solo "Generación de Asignaturas" es clickeable → navega al Dashboard
   - Chatbar superior con soporte `/generar-asignatura`

2. **Dashboard** (`src/screens/PantallaDashboard.jsx`)
   - Layout 3 columnas: Sidebar titulaciones | Tabla asignaturas | Mis pendientes
   - 4 stat cards (CalidadContenidosCards) clickeables que filtran la tabla
   - **Vista por rol** (ver sección "Roles" abajo)
   - Chatbar superior

3. **Crear asignatura — FLUJO DE 3 PASOS (Componentes separados)**
   
   **Paso 1: Ficha académica** (`src/screens/PantallaCrearAsignatura1.jsx`)
   - Información fija (metadata académica: nombre, titulación, coordinador, especialista, modelo)
   - Solo lectura
   - Botón [Siguiente] → Paso 2
   
   **Paso 2: Descriptor de la memoria + Resultados de aprendizaje** (`src/screens/PantallaCrearAsignatura2.jsx`)
   - Formulario editable: nivel conocimiento previo, nº temas, enfoque, temas obligatorios, opciones encargo, archivos de referencia
   - Botones: [Guardar], [Subir archivos], [Asistente IA]
   - Botón principal: [GENERAR RESUMEN DE LA ASIGNATURA] → Paso 3
   - UI compartida con Paso 1 (mismo estilo y estructura)
   
   **Paso 3: Resumen de la asignatura (Vista previa)** (`src/screens/PantallaCrearAsignatura3.jsx`)
   - Resumen general + descripción de cada tema + estructura de cada tema
   - Botones: [Guardar], [Editar resumen], [Volver a editar ficha], [Dar instrucciones a IA], [GENERAR ÍNDICE]
   - "Volver a editar ficha" regresa a Paso 2 descartando resumen
   - [GENERAR ÍNDICE] → Navega a Canvas sección Índice (Paso 4)

4. **Canvas** (`src/screens/PantallaCanvas.jsx`)
   - Layout: PipelineSidebar (240px) | Contenido (flexible) | Panel IA (320px) | Utilities strip (44px)
   - **Guardado automático** toggle reemplaza "Guardar borrador"
   - **Notas** ancladas a texto seleccionado, separadas de Comentarios
   - Herramientas IA dropdown (Revisar calidad + futuros)
   
   **NUEVAS SECCIONES EN CANVAS (Autor):**
   - **Índice:** Contenido generado por IA, autor puede modificar/reordenar. Botones: [Guardar], [Cambiar orden], [Volver al Resumen], [Enviar a revisión] → marca como Completado
   - **Tema 1 - Indicaciones didácticas:** Setup area (enfoque IA, bibliografía, archivos, notas pedagógicas) + botón [GENERAR RESUMEN DE TEMA]. Si genera > 5s, muestra chain of thought
   - **Tema 1 - Resumen de tema:** Contenido generado (introducción, objetivos, desarrollo). Estados: Generado/En edición/Completado. Botones: [Guardar], [Cambiar indicaciones y regenerar]
   - **Tema 1 - Contenido (Temario):** Contenido completo generado, editable con toolbars existentes. Botones: [Guardar], [Volver a Indicaciones > Resumen], [Enviar a revisión] → marca como Aprobado
   - **A Fondo (Tema 1):** Mantiene toda funcionalidad existente + **NEW: categorías por referencia** (Casos reales | Ampliaciones conceptuales | Tendencias | Lecturas complementarias)

---

## Roles y permisos

### `coordinador`
- Dashboard **completo**: tabla con columnas Titulación | Asignatura | Estado | Responsable | **Filial** | **Obsolescencia** | Última actividad | Fecha objetivo
- Filtros por fecha y filial
- Ve "Mis pendientes"
- Ve y puede usar "Crear nueva asignatura"

### `autor`
- Dashboard **reducido**: tabla con columnas Titulación | Asignatura | Estado | Pendiente de | Última actividad
- **No** ve Mis pendientes
- **No** ve "Crear nueva asignatura"

### `editor` / `disenador`
- Usan vista coordinador por ahora (TBD)

---

## Flujo "Crear nueva asignatura" (3 pasos)

### Paso 1: Ficha Académica (Fixed Metadata)
- Información pre-rellenada del sistema (NO editable):
  - Nombre asignatura
  - Titulación
  - Tipo de estudio
  - Área de conocimiento
  - Créditos (ECTS)
  - Coordinador
  - Especialista
  - Modelo educativo
- Acción: [Siguiente] → Paso 2

### Paso 2: Descriptor de la Memoria + Resultados de Aprendizaje
- Author proporciona contexto educativo:
  - Nivel de conocimiento previo (dropdown: inicial, intermedio, avanzado, experto)
  - Número de temas (1-10, recomendado 8)
  - Enfoque asignatura (dropdown: teórico, práctico, teórico-práctico, basado en casos, basado en proyectos)
  - Temas obligatorios (text area abierto)
  - Opciones encargo (checkboxes: plan de videos, apartado a fondo)
  - Archivos de referencia (upload)
- Botones: [Guardar], [Subir archivos], [Asistente IA]
- Acción principal: [GENERAR RESUMEN DE LA ASIGNATURA] → Paso 3 (genera contenido por IA)

### Paso 3: Resumen de la Asignatura (Vista previa)
- IA genera resumen basado en Paso 1-2:
  - Descripción general / enfoque de contenidos
  - Explicación de cada tema: "En este tema se va a tratar…"
  - Estructura de cada tema (epígrafes, qué se va a destacar, elementos visuales)
- Acciones:
  - [Guardar] — guarda resumen
  - [Editar resumen] — modifica el contenido generado
  - [Volver a editar ficha] — regresa a Paso 2, descarta resumen
  - [Dar instrucciones a IA] — chatbar contextual para refinamiento
  - [GENERAR ÍNDICE] → navega a Canvas sección Índice

**Transición a Canvas:** Una vez acepta el Resumen, navega al Canvas con la sección Índice desbloqueada.

---

## Canvas — Guardado automático

Reemplaza el botón "Guardar borrador":
- Toggle `[● Guardado automático ON]` / `[○ Guardado automático OFF]`
- ON: guarda cambios (simulado), muestra "Guardado" con check verde
- OFF: muestra "Cambios sin guardar" en ámbar
- Estado local: `autosaveOn` (bool, default true)

---

## Canvas — Sección Índice (Nueva)

Tras generar índice en Paso 3 (PantallaCrearAsignatura3), el Author entra al Canvas con esta sección:

**Contenido:**
- IA propone estructura: temas, epígrafes, orden
- Author puede modificar libremente (mantiene funcionalidades existentes)

**Acciones (Author):**
- `[Guardar]` (autosave)
- `[Cambiar orden]` — drag/reorder bloques markdown
- `[Volver al Resumen]` — regresa a Paso 3 para ajustes y regenerar índice completo
- `[Enviar a revisión]` — marca como **Completado** (ilustrativo: auto-aprueba en prototipo)

**State transition:** Una vez Índice está **Completado**, se desbloquean los Temas. Temas aparecen inicialmente como **Pendiente**.

---

## Canvas — Sección Tema 1: Indicaciones Didácticas (Nueva)

### Parte 1: Setup Area (Configuración del tema)

Antes de generar contenido, Author define enfoque específico del tema:

**Inputs (Author):**
- **Enfoque IA** — Input conversacional; enfoque específico para el tema
- **Bibliografía del tema** — Text area
- **Archivos de referencia** — Upload (archivos de apoyo para el tema)
- **Notas pedagógicas e indicaciones** — Text area abierto; guía para IA

**Generación:**
- Botón: `[GENERAR RESUMEN DE TEMA DE ACUERDO A INDICACIONES DIDÁCTICAS]` (UX mejorado)

**Loading behavior:**
- Si IA tarda > 5 segundos, aparece **chain of thought** visualization
- Muestra pasos del razonamiento en tiempo real

### Parte 2: Resumen Amplio de Tema (Post-generación)

Reemplaza Parte 1 una vez que IA genera.

**Contenido (AI-generated):**
- **Introducción** (siempre)
- **Objetivos** (siempre)
- **Desarrollo conceptual de epígrafes** con ideas didácticas para cada epígrafe
  - Ejemplos: ejemplos concretos, tablas, infografías, elementos visuales

**Estados:**
- `Generado` — Acaba de generar
- `En edición` — Author está modificando
- `Completado` — Listo para continuar

**Acciones:**
- `[Guardar]` (autosave)
- `[Cambiar indicaciones y generar resumen completo de nuevo]` — regresa a Parte 1

---

## Canvas — Sección Tema 1: Contenido Temario (Nueva)

**Contenido:** IA genera contenido redactado completo del tema a partir del Resumen.

**Workflow (Author):**
- Edita contenido usando herramientas de edición existentes (sin cambios)
- Usa asistentes IA existentes (toolbar, chat, etc.) — sin cambios
- Puede volver atrás al Resumen del Tema si necesita modificar enfoque y regenerar

**Acciones (Author):**
- `[Guardar]` (autosave)
- `[Volver a Indicaciones didácticas > Resumen]` — regresa a cambiar enfoque, regenera contenido
- `[Enviar a revisión]` — final action para Tema 1

**Illustration behavior:** Una vez que Author da click en `[Enviar a revisión]`, contenido aparece como **Aprobado** (en prototipo, para ilustrar flujo).

**State transition:** Una vez Tema 1 está **Aprobado**, se desbloquea la sección **A Fondo** (Recursos).

---

## Canvas — Sección A Fondo (Recursos) — Enhancement

**Funcionalidad existente:** Se mantiene completamente (sin cambios a las features actuales).

**NEW ENHANCEMENT:** Cada referencia académica ahora puede tener una **etiqueta de categoría:**
- `Casos reales` — Aplicaciones prácticas y casos reales
- `Ampliaciones conceptuales` — Exploración conceptual y teoría avanzada
- `Tendencias` — Desarrollos actuales y tecnología de vanguardia
- `Lecturas complementarias` — Materiales de lectura suplementarios

**Implementación:** Author puede asignar categoría a cada recurso (dropdown/tag). Las categorías ayudan a organizar y contextualizar las referencias.

---

## Canvas — Notas vs Comentarios

### Comentarios (existente)
- Para revisión, colaboración, feedback entre roles
- Tienen gravedad (crítico, importante, sugerencia, nota, alertaNormativa)
- Panel lateral al hacer clic en marcador de bloque

### Notas (nuevo)
- Anotaciones tipo recordatorio personal ("Mañana reviso esto")
- Ancladas a un fragmento de texto seleccionado
- No aparecen en el panel de comentarios
- Panel derecho: toggle tab "Comentarios" | "Notas"
- Marcador sutil en margen (icono lápiz, fondo amarillo suave)
- Editables y eliminables
- Visibles para todo el equipo (no privadas)

### Interacción
- Usuario selecciona texto → aparece mini toolbar contextual con: "Comentar" | "Añadir nota"
- "Añadir nota" → abre input inline en margen → guarda nota anclada

---

## Obsolescencia (Dashboard Coordinador)

Badge values:
- `ok` — verde
- `requiereRevision` — ámbar
- `mantenimiento` — naranja
- `obsoleta` — rojo

---

## Arquitectura de navegación

```
App.jsx
  pantalla: 'herramientas' | 'dashboard' | 'crearAsignatura' | 'canvas'
  rolActivo: 'autor' | 'coordinador' | 'editor' | 'disenador'
  asignaturaActiva: { titulacionId, asignaturaId }
  seccionActiva: string (sección activa en canvas)
  panelIAabierto: bool
  notifAbiertas: bool
  chatHistorial: []
  creacionData: { indice[], resumen{} } | null  ← datos generados antes de navegar a canvas
```

**Nota:** Estructura jerárquica. Cada Tema contiene sus propias subsecciones (Instrucciones > Temario > Recursos > Tests). Los estados de edición/revisión son contextuales por tema, no globales para el canvas.

---

## Sistema de botones por rol (Canvas)

| Rol | Estado | Botones |
|---|---|---|
| autor | borrador/comentarios | [Autosave toggle] · [Herramientas IA ▾] · [Enviar a revisión] |
| autor | revision | Solicitar permiso de edición (amber) |
| autor | aprobado | Solicitar permiso de edición (gray) |
| coordinador | revision/comentarios | Enviar correcciones · Aprobar contenido |
| coordinador | aprobado | Comprobar actualizaciones |
| editor | revision | Enviar correcciones |
| editor | aprobado | Comprobar actualizaciones |
| disenador | aprobado | Solicitar permiso de edición |

---

## Estructura de datos (mockData.js)

### Asignatura
```js
{
  id, nombre, etapaActual, estado,
  pendienteDe: { autor, coordinador, editor, disenador },
  ultimaActividad,
  activa: bool,
  crearAsignatura: bool,  // ← navega a PantallaCrearAsignatura en vez de canvas
  // Coordinator-only fields:
  filial: string,          // "Colombia" | "México" | etc.
  obsolescencia: string,   // "ok" | "requiereRevision" | "mantenimiento" | "obsoleta"
  fechaObjetivo: string,
}
```

### Pipeline
Jerárquico: `tipo: 'seccion'` para Resumen/Índice, `tipo: 'tema'` para Temas 1-6 con `secciones[]` (instrucciones, temario, recursos, tests).

---

## Componentes clave

- `src/App.jsx` — root state + navegación
- `src/screens/PantallaDashboard.jsx` — dashboard diferenciado por rol
- `src/screens/PantallaCanvas.jsx` — canvas principal con autosave + notas
- `src/screens/PantallaCrearAsignatura.jsx` — 3 pasos, solo coordinador
- `src/components/PipelineSidebar.jsx` — navegación jerárquica por temas
- `src/components/PanelIA.jsx` — chat IA contextual (solo en canvas)
- `src/components/PanelMisPendientes.jsx` — panel derecho del dashboard (solo coordinador)
- `src/components/CalidadContenidosCards.jsx` — 4 stat cards filtradoras
- `src/components/Chatbar.jsx` — input conversacional (herramientas + dashboard)

---

## Decisiones de diseño

1. Selector de rol en topbar — cambio instantáneo, reconfigura toda la UI
2. Dashboard = workspace 3 columnas siempre visible
3. Chatbar solo en Herramientas + Dashboard; Canvas usa Panel IA
4. Notas y Comentarios son sistemas separados con panel tab toggle
5. Autosave toggle reemplaza por completo "Guardar borrador"
6. Crear asignatura: solo coordinador, con paso de preview aceptación antes de generar índice

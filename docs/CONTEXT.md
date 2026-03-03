# AGC 2.0 — Contexto de sesión para Cursor
*Última actualización: 2026-03-02*
*Fase 2: Agregando dual input conversacional (chatbar) + workspace rediseñado*

---

## Qué es este proyecto

Prototipo navegable de alta fidelidad de **AGC 2.0** — plataforma de creación de contenido educativo para UNIR. Fase 2 de 4 del producto.

**No es un producto funcional.** Es una demo con datos hardcodeados que simula el flujo real de trabajo de un Autor. Stack: React + Vite + Tailwind CSS v4 + lucide-react.

**CONSTRUCCIÓN:** Directa con Claude Code + Cursor (sin vendor). Estamos agregando capacidades conversacionales (chatbar, dual input) manteniendo TODA la funcionalidad original.

---

## Estado actual del prototipo

### ✅ Funcionalidad ORIGINAL (mantener):

**5 pantallas:**

1. **Herramientas** (`src/screens/PantallaHerramientas.jsx`)
   - Grid de 5 tools. Solo "Generación de Asignaturas" es clickeable → navega al Dashboard
   - Las demás están visualmente desactivadas ("Próximamente")

2. **Dashboard** (`src/screens/PantallaDashboard.jsx`)
   - **Dos vistas con toggle** (estilo Linear):
     - **"Mi trabajo"** — inbox de trabajo priorizado por urgencia. Filas agrupadas: Requieren atención → En progreso → Por comenzar. Cada fila = sección accionable con clic directo al canvas
     - **"Por titulación"** — sidebar con 6 titulaciones (todas navegables). Panel derecho con tabla de asignaturas
   - 3 stat cards clickeables que filtran ambas vistas
   - 6 titulaciones en mockData, todas con asignaturas navegables
   - **Botón "Crear nueva asignatura"** en el sidebar de titulaciones (solo Autor)

3. **Modal de creación de asignatura** (`src/components/ModalCrearAsignatura.jsx`)
   - **Flujo optimizado de 7 pasos progresivos** (basado en "Propuesta nuevo Flujo"):
     1. **Contexto académico:** Seleccionar titulación + Nivel estudio + Público objetivo + Créditos + Temas a tratar
     2. **Definición temática:** Área conocimiento + Tipo asignatura + Enfoque (3 preguntas clave)
     3. **Generación automática:** IA genera Índice provisional de la asignatura
     4. **Resumen preliminar:** IA genera nombre, descripción, objetivos (editable)
     5. **Previsualización Tema 1:** IA genera estructura y contenido del primer tema (preview)
     6. **Confirmación y tags:** Usuario valida/edita resumen + tags sugeridos automáticamente
     7. **Crear asignatura:** Se guarda y abre Canvas en sección Resumen
   - Flujo lineal, sin retrocesos (solo avanza)
   - Cada paso genera contenido automáticamente basado en respuestas anteriores
   - Accesible vía chatbar `/generar-asignatura` O botón "Nueva asignatura"

4. **Canvas — Resumen de asignatura** (primera sección)
   - Primera sección del pipeline cuando se crea una asignatura
   - Contenido editable: nombre, descripción, objetivos de aprendizaje, tags sugeridos
   - Estado: `borrador`
   - Barra de acciones: `Guardar borrador · Enviar a revisión`
   - Panel IA: chat activo para refinamientos

5. **Canvas** (`src/screens/PantallaCanvas.jsx`)
   - Layout 3 columnas: Pipeline (240px) | Contenido (flexible) | Panel IA (320px)
   - **Pipeline izquierdo**: navegación jerárquica guiada por temas. Estructura:
     - Resumen (asignatura global)
     - Índice (asignatura global)
     - Tema 1
       - Instrucciones didácticas
       - Temario
       - Recursos a fondo
       - Tests
     - Tema 2
       - Instrucciones didácticas
       - Temario
       - Recursos a fondo
       - Tests
     - Tema N...
   - **Flujo de creación por tema** (no global):
     - Las Instrucciones didácticas de cada tema se crean/editan primero
     - Una vez aprobadas las Instrucciones, la IA genera automáticamente el Temario de ese tema
     - Después, el autor puede editar el contenido generado
     - Cada tema tiene su propio ciclo independiente
   - **Estados contextuales**: No existe un estado único para todo el canvas. Cada tema (o bloque dentro de un tema) tiene su propio estado de edición/revisión independiente. Ejemplo: Tema 1 > Tests puede estar aprobado, mientras Tema 2 > Temario está en edición y Tema 3 > Instrucciones didácticas está en revisión
   - **Área central**: muestra contenido del tema/bloque seleccionado. Bloques editables o solo lectura según rol y estado contextual. Toolbar inline al seleccionar texto (Mejorar / Expandir / Resumir / Cambiar tono). Marcador rojo en bloque con comentario crítico
   - **Panel IA**: chat funcional con respuestas contextuales al tema/bloque actual. Suggestions rápidas, colapsable. Al colapsarse muestra un botón lateral fino
   - **Panel de comentarios**: se abre al hacer clic en el marcador de comentario. Muestra hilo con gravedad tag, "Marcar como resuelto" y campo de respuesta

**1 panel overlay:**
- **Notificaciones** (`src/components/PanelNotificaciones.jsx`) — accesible desde el 🔔 del topbar desde cualquier pantalla. Panel lateral con backdrop, 3 notificaciones agrupadas por asignatura, filtros funcionales, navegación al hacer clic

**Componentes reutilizables** (`src/components/`):
- `Topbar` — breadcrumb + selector de rol (dropdown) + badge notificaciones + avatar
- `PipelineSidebar` — pipeline con estados, expandible, bloqueados con tooltip
- `PanelIA` — chat con historial, typing indicator, sugerencias rápidas
- `PanelNotificaciones` — overlay lateral con filtros
- `BloqueContenido` — bloque editable con toolbar inline, marcador de comentarios
- `ComentarioHilo` — hilo de comentario con gravedad, respuestas, marcar resuelto
- `EstadoBadge` — badge de color por estado del pipeline
- `GravedadTag` — tag de severidad de comentario (🔴🟠🟡🔵)
- `EtiquetaBloque` — chip de etiqueta temática (índigo)

### ✨ NUEVA FUNCIONALIDAD (AGREGAR):

**Chatbar conversacional** (`src/components/Chatbar.jsx`)
- Input conversacional con soporte para shortcuts (`/comando`)
- Dropdown de sugerencias automáticas al escribir `/`
- Respuestas simuladas para preguntas genéricas
- Historial de chat (opcional, colapsable)
- **Accesible en:** Herramientas + Dashboard (NO en Canvas)

**Pantalla Herramientas rediseñada**
- Agregar Chatbar superior (full width)
- Mantener grid de tools debajo (igual al actual)
- Dual input: usuario puede `/generar-asignatura` en chat OR click en card
- Ambas rutas abren el MISMO modal ModalCrearAsignatura

**Dashboard rediseñada a Workspace**
- Agregar Chatbar superior (persiste en top)
- Agregar barra de acciones rápidas: tags filtrables + CTA "Nueva asignatura"
- Reemplazar toggle "Mi trabajo" vs "Por titulación" con **Layout 3 columnas compacto:**
  - **Izquierda (240px):** Sidebar de titulaciones (todas navegables, click filtra tabla)
  - **Centro (flexible):** Tabla asignaturas (nombre | estado | pendiente de | actividad). Filas clickeables → Canvas
  - **Derecha (280px):** "Mis pendientes" (tareas con gravedad, items clickeables → Canvas en esa sección)
- Interfaz limpia, profesional (Notion + Linear style)
- Mantener funcionalidad de roles (cada rol ve datos diferentes)

**Sistema de Shortcuts conversacionales**
- `/generar-asignatura` → Abre ModalCrearAsignatura
- `/mejora-rúbricas` → Modal/panel mejora (placeholder por ahora)
- `/diseñador-actividades` → Modal/panel diseño (placeholder por ahora)
- `/crear-test` → Modal/panel test (placeholder por ahora)
- `/corregir-actividades` → Modal/panel corrección (placeholder por ahora)

**Respuestas conversacionales simuladas**
- Pool de respuestas en `mockData.respuestasIAChatbar`
- Chatbar detecta mensajes sin `/` → responde con sugerencia contextual
- Ejemplo: "¿Quieres generar una asignatura? Usa `/generar-asignatura`"

**NUEVA: Sección "Calidad de Contenidos" en Dashboard**
- Ubicación: Arriba de la tabla principal (como cards de métricas)
- Indicadores a mostrar:
  - **Alertas normativas:** número (rojo, prominente)
  - **Revisión profunda:** número (naranja)
  - **ISE medio ponderado:** score (amarillo/dorado)
  - **Asignaturas en estado crítico:** número (rojo)
- Cards similares al mockup que compartiste (dark theme con colores by status)
- Click en card → filtra tabla por ese criterio (ej: click "Alertas" → muestra solo asignaturas con alertas)

**NUEVA: "Alertas normativas" como categoría de comentarios**
- Tag obligatorio en comentarios: 🔴 Crítico / 🟠 Importante / 🟡 Sugerencia / 🔵 Nota / 🔺 **Alerta normativa** (NUEVO)
- Alerta normativa = comentario que señala incumplimiento de normas, regulaciones, estándares institucionales
- Ejemplo: "Incumple norma APA en citación" o "Contenido fuera de estándar institucional"
- Alertas normativas bloquean aprobación (como Críticos)
- Visible en Dashboard ("Alertas normativas" card muestra cantidad)

**NUEVA: Función IA "Revisar calidad de contenidos"**
- Botón en Canvas (al lado de "Enviar a revisión" O en Panel IA)
- Acción: IA analiza el bloque/sección contra:
  - Estándares institucionales UNIR
  - Normas de citación (APA, MLA, etc.)
  - Coherencia curricular
  - Completitud de contenido
  - Actualizacion de información
- Genera sugerencias + posibles alertas normativas
- Simula respuesta tipo: "Detecté 2 incumplimientos: Citación incorrecta (APA) y concepto desactualizado en IA"
- Usuario decide si crear alertas normativas basado en hallazgos

---

**ACTUALIZACIÓN: Sistema de comentarios**
- Agregar tag "Alerta normativa" a los gravedad tags existentes
- Alertas normativas = bloquean aprobación
- Visible en Dashboard y Mis Pendientes

---

## Arquitectura de navegación (ACTUALIZADA)

```
App.jsx
  pantalla: 'herramientas' | 'dashboard' | 'crearAsignatura' | 'canvas'
  rolActivo: 'autor' | 'coordinador' | 'editor' | 'disenador'
  asignaturaActiva: { titulacionId, asignaturaId }
  temaActivo: 't1' | 't2' | 't3'... | null (null = Resumen o Índice globales)
  bloqueActivo: bloqueId en tema actual (contextual, no global)
  estadoContextual: { temaId, bloqueId, estado } (edición/revisión por tema, no global)
  panelIAabierto: bool
  notifAbiertas: bool
  chatHistorial: [] (para Herramientas + Dashboard)

Flujo DUAL INPUT:

Vía Chatbar:
  herramientas → chatbar `/generar-asignatura` → ModalCrearAsignatura

Vía Tradicional:
  herramientas → click "Generación" → ModalCrearAsignatura
  dashboard → click "Nueva asignatura" → ModalCrearAsignatura

Canvas — Navegación por tema (flujos paralelos independientes):
  crearAsignatura → (7 pasos) → canvas (Resumen asignatura)
  canvas (Resumen/Índice) → click Tema 1 → Tema 1 > Instrucciones didácticas
  Tema 1 > Instrucciones (aprobadas) → IA genera Tema 1 > Temario automáticamente
  Tema 1 > Temario → autor edita independientemente
  Tema 1 → click Tema 2 → Tema 2 > Instrucciones [flujo paralelo, completamente independiente]
  Cualquier tema → topbar 🔔 → panel notificaciones

Dashboard:
  dashboard → click titulación → filtra tabla
  dashboard → click fila tabla → canvas (Resumen de esa asignatura)
  dashboard → click pendiente → canvas (en tema/bloque específico)
```

**Nota:** Estructura jerárquica. Cada Tema contiene sus propias subsecciones (Instrucciones > Temario > Recursos > Tests). Los estados de edición/revisión son contextuales por tema, no globales para el canvas.

---

## Modelo de creación: Flujos paralelos por tema (CLAVE)

Este es el principio fundamental del canvas:

**La creación es secuencial DENTRO de cada tema, pero independiente ENTRE temas.**

### Ciclo de cada tema (secuencial)

Para cada tema N:

1. **Instrucciones didácticas del tema N** — autor crea/edita primero
2. Autor solicita aprobación del Coordinador
3. Coordinador revisa y aprueba
4. Al aprobarse las Instrucciones → **IA genera automáticamente el Temario del tema N**
5. Autor puede editar el Temario generado
6. Flujo de revisión/aprobación del Temario (igual al anterior)
7. Una vez aprobado el Temario → se desbloquean "Recursos a fondo" y "Tests"
8. Autor completa esas secciones con el mismo flujo

### Independencia entre temas

Mientras el autor está en el paso 5 del Tema 1 (editando Temario), simultáneamente puede:

- Trabajar en Tema 2 > Instrucciones didácticas (paso 1 del ciclo de Tema 2)
- O estar revisando comentarios en Tema 3 > Temario
- O esperando aprobación en Tema 1 > Tests

**No hay un único bloqueante global.** Cada tema progresa a su ritmo.

### Estados contextuales (no globales)

No existe "el estado del canvas". Existe:

- Estado de Tema 1 > Instrucciones: "en edición" (Autor)
- Estado de Tema 1 > Temario: "aprobado"
- Estado de Tema 1 > Tests: "bloqueado" (espera aprobación de Temario)
- Estado de Tema 2 > Instrucciones: "revisión" (Coordinador)
- Estado de Tema 3 > Temario: "en edición" (Autor)

Cada uno es independiente.

### Implicación para la interfaz

El Pipeline sidebar debe reflejar esta jerarquía:

```
Resumen
Índice
┣ Tema 1
┃ ┣ Instrucciones didácticas [aprobado]
┃ ┣ Temario [en edición]
┃ ┣ Recursos a fondo [bloqueado]
┃ ┗ Tests [bloqueado]
┣ Tema 2
┃ ┣ Instrucciones didácticas [revisión]
┃ ┣ Temario [por comenzar]
┃ ┣ Recursos a fondo [bloqueado]
┃ ┗ Tests [bloqueado]
┣ Tema 3
┃ ┣ Instrucciones didácticas [en edición]
...
```

La barra de acciones (botones) debe cambiar según:
- El rol actual
- El tema seleccionado
- El bloque/sección actual dentro del tema
- El estado contextual de esa sección específica

---

**Estructura jerárquica (MANTENER):**
```
titulaciones[]
  ├── id
  ├── nombre
  ├── navegable: true
  └── asignaturas[]
      ├── id
      ├── nombre
      ├── resumen
      ├── objetivos[]
      ├── tags[]
      ├── temas[]
      │   └── bloques[]
      └── preguntas (datos creación)
```

**Entidades existentes (MANTENER TODAS):**
- `currentUser` — Ana Lucía Martínez, rol autor
- `titulaciones` — 6 titulaciones, todas navegables
- `preguntasCreacion` — 11 preguntas del formulario
- `pipeline` — etapas del flujo de contenido
- `bloquesTema2`, `bloquesTema1` — bloques de contenido con comentarios
- `chatHistorialTema2`, `chatHistorialTema1` — mensajes iniciales del panel IA
- `respuestasIA` — respuestas simuladas que rotan
- `notificaciones` — 3 notificaciones
- `estadoConfig` — colores bg/text/border por estado
- `gravedadConfig` — colores por severidad de comentario
- `etiquetasDisponibles`, `tagsSugerenciasPorArea`
- `dashboardStats` — stats por rol
- `roles` — 4 roles con label y description
- `herramientas` — grid de tools

**Entidades nuevas (AGREGAR):**
- `shortcutsComandos` — array de `/comando` con label y descripción
- `respuestasIAChatbar` — pool de respuestas conversacionales
- `misPendientes` — array de tareas para panel derecho dashboard
- `tagsFiltrabledashboard` — tags filtrables en dashboard (Todos / Pendientes / etc.)

---

## Sistema de botones por rol y contexto (NO global)

Los botones visibles dependen de:
1. **Rol actual** (Autor / Coordinador / Editor / Diseñador)
2. **Tema/bloque en foco** (cuál está seleccionado)
3. **Estado contextual** de ese tema/bloque específico (edición, revisión, aprobado, etc.)

**NO existe una barra de acciones única fija para todo el canvas.**

### Sistema de botones por rol y por fase dentro del canvas

La visibilidad de botones depende del rol y del estado del contenido en foco
(tema o bloque en contexto), no de un estado global único del canvas.

+------------------------+------------------------------+----------------------------------------------+
| Rol                    | Estado del contenido en foco | Botones disponibles                          |
+------------------------+------------------------------+----------------------------------------------+
| Autor                  | Editando por autor           | Guardar borrador; Enviar a revisión          |
| Autor                  | Revisando por coordinador    | Solicitar permiso de edición                 |
| Autor                  | Corrigiendo por autor        | Guardar borrador; Enviar a revisión          |
| Autor                  | Aprobado                     | Solicitar permiso de edición                 |
+------------------------+------------------------------+----------------------------------------------+
| Coordinador            | Editando por autor           | —                                            |
| Coordinador            | Revisando por coordinador    | Enviar correcciones; Aprobar contenido       |
| Coordinador            | Corrigiendo por autor        | Enviar correcciones; Aprobar contenido       |
| Coordinador            | Aprobado                     | Comprobar actualizaciones                    |
+------------------------+------------------------------+----------------------------------------------+
| Editor de contenidos   | Editando por autor           | —                                            |
| Editor de contenidos   | Revisando por coordinador    | Enviar correcciones                          |
| Editor de contenidos   | Corrigiendo por autor        | —                                            |
| Editor de contenidos   | Aprobado                     | Comprobar actualizaciones                    |
+------------------------+------------------------------+----------------------------------------------+
| Diseñador instruccional| Editando por autor           | —                                            |
| Diseñador instruccional| Revisando por coordinador    | —                                            |
| Diseñador instruccional| Corrigiendo por autor        | —                                            |
| Diseñador instruccional| Aprobado                     | Solicitar permiso de edición                 |
+------------------------+------------------------------+----------------------------------------------+

### Regla de comportamiento
- Los botones se calculan según el rol del usuario.
- También dependen del estado del bloque o tema que se está visualizando o editando.
- No todos los roles tienen acciones disponibles en todas las fases.
- Esta lógica debe aplicarse de forma contextual por tema o subsección,
  no como una única barra de acciones global para todo el canvas.

---

### Nuevos:
1. **`src/components/Chatbar.jsx`** — input conversacional + suggestions
2. **`src/components/TablaAsignaturas.jsx`** — tabla principal workspace
3. **`src/components/PanelMisPendientes.jsx`** — lista tareas lado derecho
4. **`src/components/SidebarTitulaciones.jsx`** — navegación izquierda
5. **`src/components/BarraAccionesDashboard.jsx`** — tags + CTA "Nueva"
6. **`src/components/ShortcutsDropdown.jsx`** — dropdown inteligente `/`

### Modificar:
1. **`src/App.jsx`** — agregar estados `chatHistorial`, pantalla `crearAsignatura`, rutas
2. **`src/screens/PantallaHerramientas.jsx`** — agregar Chatbar + mantener grid
3. **`src/screens/PantallaDashboard.jsx`** — REDISEÑAR workspace (mantener funcionalidad de roles)
4. **`src/screens/PantallaCanvas.jsx`** — mantener IGUAL (Panel IA es conversacional aquí)
5. **`src/components/Topbar.jsx`** — pequeños ajustes layout (no cambios de lógica)
6. **`src/components/ModalCrearAsignatura.jsx`** — mantener IGUAL (ya existe)

### Reutilizar (NO tocar):
- `PipelineSidebar`, `BloqueContenido`, `PanelIA`, `PanelNotificaciones`, `EstadoBadge`, `GravedadTag`, `EtiquetaBloque`
- Toda la lógica de comentarios, etiquetas, toolbar IA, notificaciones

---

## Lo que falta por construir

### Inmediato (Dual Input + Workspace)
- [ ] **Chatbar** — componente reutilizable (Herramientas + Dashboard)
- [ ] **Herramientas rediseñada** — agregar Chatbar + mantener grid
- [ ] **Dashboard rediseñada** — layout workspace 3 columnas + Chatbar
- [ ] **Sistema de shortcuts** — detectar `/`, dropdown, respuestas
- [ ] **Panel Mis Pendientes** — nueva columna derecha dashboard

### Futuro (ya planeado)
- [ ] Vista del Coordinador — misma pantalla canvas, papel diferente
- [ ] Vista del Editor de contenido
- [ ] Vista del Diseñador instruccional
- [ ] Fase 3 del producto: generación de variantes adaptativas

---

## Decisiones de diseño (CONSOLIDADAS)

1. **Dashboard = workspace, no toggle** — 3 columnas siempre visible, más eficiente
2. **Selector de rol en topbar** — siempre visible, cambio instantáneo, sin navegación
3. **Panel IA como colaborador** — no chatbot añadido. Canvas lo usa. Chatbar es para crear
4. **3 pantallas, no una por rol** — el rol reconfigura: permisos, acciones, barra de acciones cambian; el contenido y pipeline son siempre los mismos
5. **Notificaciones como overlay** — panel lateral desde cualquier pantalla
6. **Dual input complementario** — chat AND botones, usuario elige qué usar
7. **Chatbar solo en Herramientas + Dashboard** — Canvas usa Panel IA (más contextual)
8. **Interfaz conversacional moderna** — estilo Perplexity/Canva, pero complementa (no reemplaza) interfaz tradicional

---

*Documentación de construcción: Fase 2 agrega chatbar + workspace manteniendo TODA la funcionalidad original*
*Construcción: Claude Code + Cursor (desarrollo directo, sin vendor)*

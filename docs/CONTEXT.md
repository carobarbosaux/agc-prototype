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
   - Paso 1: Seleccionar titulación (dropdown de todas las titulaciones)
   - Paso 2: Responder 11 preguntas situacionales en forma de cuestionario
   - Paso 3: IA genera resumen preliminar (editable) con sugerencias de tags
   - Paso 4: Autor aprueba → se crea la asignatura en mockData y navega al Canvas en el Resumen

4. **Canvas — Resumen de asignatura** (primera sección)
   - Primera sección del pipeline cuando se crea una asignatura
   - Contenido editable: nombre, descripción, objetivos de aprendizaje, tags sugeridos
   - Estado: `borrador`
   - Barra de acciones: `Guardar borrador · Enviar a revisión`
   - Panel IA: chat activo para refinamientos

5. **Canvas** (`src/screens/PantallaCanvas.jsx`)
   - Layout 3 columnas: Pipeline (240px) | Contenido (flexible) | Panel IA (320px)
   - **Pipeline izquierdo**: etapas con estados. Resumen > Índice > Instrucciones > Temario (expandible con N temas) > Recursos a fondo > Tests
   - **Área central**: bloques editables (Tema 2) o solo lectura (Tema 1). Toolbar inline al seleccionar texto (Mejorar / Expandir / Resumir / Cambiar tono). Marcador rojo en bloque con comentario crítico
   - **Panel IA**: chat funcional con respuestas simuladas, suggestions rápidas, colapsable. Al colapsarse muestra un botón lateral fino
   - **Panel de comentarios**: se abre al hacer clic en el marcador rojo del bloque, reemplaza el panel IA. Muestra el hilo con gravedad tag, "Marcar como resuelto" y campo de respuesta

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
  seccionActiva: 'resumen' | 't1' | 't2' | 'indice' | 'instrucciones'
  panelIAabierto: bool
  notifAbiertas: bool
  chatHistorial: [] (para Herramientas + Dashboard)

Flujo DUAL INPUT:

Vía Chatbar:
  herramientas → chatbar `/generar-asignatura` → dropdown suggestion → ModalCrearAsignatura

Vía Tradicional:
  herramientas → click "Generación de Asignaturas" → ModalCrearAsignatura
  dashboard → click "Nueva asignatura" → ModalCrearAsignatura

Canvas:
  crearAsignatura → (5 pasos wizard) → canvas (Resumen)
  canvas → canvas (click sección en pipeline)
  topbar 🔔 → panel notificaciones (overlay)
  notificación → canvas o dashboard (click en item)

Dashboard:
  dashboard → (click titulación en sidebar) → filtra tabla
  dashboard → (click fila tabla) → canvas
  dashboard → (click item "Mis pendientes") → canvas en esa sección
```

---

## Datos (src/mockData.js)

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

## Componentes (ACTUALIZAR)

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

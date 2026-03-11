# AGC 2.0 — Plan para Claude Code (Actualizado)
### Prototipo navegable · Fase 2: Plataforma de contenido inteligente
### ✨ Agregando: Dual input conversacional + Workspace rediseñado

---

## Objetivo (ACTUALIZADO)

Construir Fase 2 de AGC con **capacidades conversacionales agregadas** (chatbar + dual input) manteniendo TODA la funcionalidad original del editor inteligente.

El usuario puede crear contenido de DOS formas:
- **Vía interfaz conversacional (NUEVA):** Chatbar con shortcuts (`/generar-asignatura`)
- **Vía interfaz tradicional (ORIGINAL):** Botones, formularios, grid

Ambas llevan al MISMO canvas de edición inteligente.

---

## Stack técnico

- **Framework:** React (Vite)
- **Estilos:** Tailwind CSS v4 — clases utilitarias únicamente
- **Iconos:** lucide-react
- **Estado:** useState / useReducer — sin backend, sin localStorage
- **Datos:** todos hardcodeados en `mockData.js`
- **Routing:** estado interno con useState (sin react-router)

---

## Construcción modular (Dos frentes)

### FRENTE A: Chatbar + Dual Input (AGREGADO)

#### Pantalla 1: Herramientas (AGREGAR Chatbar)

**Cambios:**
- Agregar `Chatbar.jsx` en top (full width)
- Mantener grid de 5 herramientas debajo (igual que ahora)
- Dual input: `/generar-asignatura` en chat OR click en card → ambos abren ModalCrearAsignatura

**Componentes:**
- `Chatbar.jsx` — input + `/` suggestions dropdown + send
- `HerramientasGrid.jsx` — grid (mantener igual)
- `ShortcutsDropdown.jsx` — dropdown inteligente al escribir `/`

**Flujo:**
```
Usuario escribe "/generar" → Dropdown sugiere "/generar-asignatura"
→ Click / Enter → setPantalla('crearAsignatura') → ModalCrearAsignatura abre
```

**O vía tradicional:**
```
Usuario click en card "Generación de Asignaturas" → ModalCrearAsignatura abre
```

#### Pantalla 2: Dashboard → Workspace (REDISEÑAR)

**Cambios principales:**
- Agregar Chatbar superior (same as Herramientas)
- **NUEVA SECCIÓN:** "Calidad de Contenidos" con 4 cards indicadores
- Reemplazar toggle "Mi trabajo" vs "Por titulación" con **Layout 3 columnas:**
  - Izq: Sidebar Titulaciones (click filtra tabla)
  - Centro: Tabla Asignaturas (principal, clickeable → Canvas)
  - Der: "Mis pendientes" (tareas con gravedad, clickeable → Canvas)
- Agregar barra acciones: tags filtrables + CTA "Nueva asignatura"
- Mantener toda la lógica de roles (cada rol ve datos diferentes)

**Layout:**
```
┌──────────────────────────────────────┐
│  Chatbar: "Pregunta qué necesitas..." │  ← Persiste
├──────────────────────────────────────┤
│ [Tags] [Pendientes] [Aprobadas]   [+ Nueva] │
├──────────────────────────────────────┤
│ CALIDAD DE CONTENIDOS (4 cards)     │  ← NUEVO
│ [Alertas] [Revision] [ISE] [Crítico]│
├────────┬────────────────┬──────────────────┤
│        │                │                 │
│ Sidebar│ Tabla Principal│ Mis Pendientes  │
│ (240px)│ (flexible)     │ (280px)         │
│        │                │                 │
└────────┴────────────────┴──────────────────┘
```

**Componentes:**
- `SidebarTitulaciones.jsx` — navegación izquierda
- `CalidadContenidosCards.jsx` — 4 cards indicadores (NUEVO)
- `TablaAsignaturas.jsx` — tabla central (compleja)
- `PanelMisPendientes.jsx` — lista tareas derecha
- `BarraAccionesDashboard.jsx` — tags + CTA
- `Chatbar.jsx` (reutilizar)

**Funcionalidad:**
- Click titulación → highlight + filtra tabla
- Click fila tabla → Canvas con esa asignatura
- Click item pendiente → Canvas en esa sección
- Click "Nueva" OR `/generar-asignatura` → ModalCrearAsignatura
- Tags filtrables → updatean tabla + pendientes

#### Sistema de Shortcuts (AGREGADO)

**Shortcuts disponibles:**
```
/generar-asignatura        → ModalCrearAsignatura
/mejora-rúbricas           → Modal mejora (placeholder)
/diseñador-actividades     → Modal diseño (placeholder)
/crear-test                → Modal test (placeholder)
/corregir-actividades      → Modal corrección (placeholder)
```

**Respuestas conversacionales (AGREGADO):**
- Si usuario escribe sin `/` → respuesta from `mockData.respuestasIAChatbar`
- Ejemplo: "Veo que tienes 2 asignaturas pendientes. ¿Quieres generar una nueva?"
- Historial en estado (no persistente)

---

### FRENTE B: Canvas + Sistema Inteligente + Workflow de Autor (MANTENER + EXPANDIR)

#### Pantalla 3: Crear Asignatura — **NUEVO FLUJO DE 3 PASOS (Componentes separados)**

**Paso 1: Ficha Académica** (`PantallaCrearAsignatura1.jsx`)
- Información fija del sistema (metadata académica, read-only)
- Nombre, titulación, coordinador, especialista, modelo
- Botón: [Siguiente] → Paso 2

**Paso 2: Descriptor de la Memoria + Resultados de aprendizaje** (`PantallaCrearAsignatura2.jsx`)
- Formulario editable (nivel conocimiento previo, nº temas, enfoque, temas obligatorios, opciones, archivos)
- Botones: [Guardar], [Subir archivos], [Asistente IA]
- Botón principal: [GENERAR RESUMEN DE LA ASIGNATURA] → Paso 3
- **Comparte UI con Paso 1** (mismo estilo, layout, estructura)

**Paso 3: Resumen de la Asignatura (Vista previa)** (`PantallaCrearAsignatura3.jsx`)
- Resumen general de asignatura, descripción de temas, estructura de cada tema
- Acciones: [Guardar], [Editar resumen], [Volver a editar ficha], [Dar instrucciones a IA], [GENERAR ÍNDICE]
- [GENERAR ÍNDICE] → Navega a Canvas sección Índice

#### Pantalla 4-6: Canvas (SIN CAMBIOS FUNDAMENTALES — EXPANSIÓN DE SECCIONES)

**Todo se mantiene IGUAL:**
- Pipeline sidebar, bloques editables, toolbar, comentarios, etiquetas, notificaciones, roles

**NUEVAS SECCIONES en Canvas (para Autor):**

1. **Sección Índice (Nueva)**
   - IA propone estructura (temas, epígrafes, orden)
   - Author modifica libremente
   - Acciones: [Guardar], [Cambiar orden], [Volver al Resumen], [Enviar a revisión] → Completado
   - Una vez Completado, desbloquean Temas

2. **Sección Tema 1 - Indicaciones Didácticas (Nueva)**
   - Parte 1: Setup (enfoque IA, bibliografía, archivos, notas)
   - Botón: [GENERAR RESUMEN DE TEMA] — Si > 5s, muestra chain of thought
   - Parte 2: Resumen generado (introducción, objetivos, desarrollo)
   - Acciones: [Guardar], [Cambiar indicaciones y regenerar]

3. **Sección Tema 1 - Contenido/Temario (Nueva)**
   - Contenido completo generado por IA (editable con herramientas existentes)
   - Acciones: [Guardar], [Volver a Indicaciones > Resumen], [Enviar a revisión] → Aprobado
   - Una vez Aprobado, desbloquea A Fondo

4. **Sección A Fondo (Enhancement)**
   - Mantiene toda funcionalidad existente
   - **NEW: Categorías por referencia** (Casos reales, Ampliaciones, Tendencias, Lecturas)
- IA genera estructura del Tema 1: Introducción, Objetivos, Estructura, Extensión
- Preview (solo lectura)
- Mostrar: "Generando contenido del primer tema..." (loading)
- Botón: "Siguiente" → Paso 6 (confirmación)

**Paso 6: Confirmación y tags**
- Mostrar resumen de lo generado
- Tags sugeridos (basados en área conocimiento)
- Usuario puede editar tags (agregar/remover con X)
- Botón: "Crear asignatura" (verde, destacado)

**Paso 7: Crear**
- Guardar en `titulaciones[X].asignaturas[]`
- Navegar a Canvas en sección Resumen
- El Tema 1 generado se guarda en el pipeline

**Características del flujo:**
- Solo 7 preguntas en total (4 en paso 1, 3 en paso 2)
- IA genera 3 cosas automáticamente (Índice, Resumen, Tema 1)
- Flujo lineal, sin retrocesos
- Cada paso muestra loading + generación simulada

#### Pantalla 4-6: Canvas (SIN CAMBIOS)

**Todo se mantiene IGUAL:**

1. **Canvas Resumen** (ya existe)
   - Accesible vía chatbar `/generar-asignatura` O botón "Nueva"

2. **Canvas — Sección Resumen** (ya existe)
   - Editable: nombre, descripción, objetivos, tags
   - Panel IA conversacional
   - Barra acciones por rol

3. **Canvas — Otras secciones**
   - Pipeline con estados + dependencias
   - Bloques editables con toolbar inline
   - Comentarios con gravedad anclados a bloques
   - Etiquetado automático
   - Sistema notificaciones
   - 4 roles diferenciados

#### Funcionalidad Original Completa (MANTENER):

**Pipeline de aprobación rediseñado**
- Estados: Por comenzar / Bloqueado / Borrador / Revisión / Comentarios / Aprobado / Publicado
- Dependencias: cada etapa se desbloquea con aprobación del Coordinador
- Trabajo en paralelo entre temas

**Sistema de comentarios con gravedad**
- Tags: 🔴 Crítico / 🟠 Importante / 🟡 Sugerencia / 🔵 Nota
- Anclados a bloques específicos
- Críticos bloquean aprobación
- Threading + resolución

**IA conversacional y contextual**
- Panel IA: chat persistente por sección
- Recuerda contexto de lo que se edita
- Toolbar inline: Mejorar / Expandir / Resumir / Cambiar tono
- Nunca modifica sin acción explícita

**Sistema etiquetado automático**
- Taxonomía principal: dominio temático
- Taxonomía secundaria: tipo contenido + competencia
- Autor edita inline, Coordinador aprueba

**Revisión de actualidad**
- Botón "↻ Revisar si hay actualizaciones" en contenido aprobado
- Lo ejecutan Coordinador + Especialista
- Detecta cambios contra fuentes actuales
- Propone actualización → flujo de aprobación

**Sistema notificaciones**
- Badge numérico en topbar
- Panel lateral con filtros
- Agrupadas por asignatura
- Clickeable → Canvas

**4 roles diferenciados**
- Autor: único que edita
- Coordinador: único que aprueba
- Editor: comenta
- Diseñador: comenta + sugiere enriquecimiento
- Interfaz reconfigurable por rol (permisos, acciones, barra de acciones cambian)

---

## Componentes Totales

### NUEVOS (Workflow Author + Canvas Sections):

**Crear Asignatura (3 pasos separados):**
1. `PantallaCrearAsignatura1.jsx` — Paso 1: Ficha académica
2. `PantallaCrearAsignatura2.jsx` — Paso 2: Descriptor + contexto
3. `PantallaCrearAsignatura3.jsx` — Paso 3: Resumen de asignatura

**Canvas sections (nuevas, para Autor):**
4. `SectionIndice.jsx` — Sección Índice (IA propone, Author modifica/reordena)
5. `SectionTema1Indicaciones.jsx` — Tema 1: Indicaciones didácticas (setup + summary)
6. `SectionTema1Contenido.jsx` — Tema 1: Contenido temario (full generated content)

**A Fondo enhancement:**
7. Modify `RecursosReferenceCard.jsx` — Add category dropdown/label field

### NUEVOS (Chatbar + Workspace + Calidad):
1. `Chatbar.jsx` — conversacional
2. `ShortcutsDropdown.jsx` — dropdown `/`
3. `SidebarTitulaciones.jsx` — nav izquierda
4. `TablaAsignaturas.jsx` — tabla principal
5. `PanelMisPendientes.jsx` — tareas derecha
6. `BarraAccionesDashboard.jsx` — tags + CTA
7. `CalidadContenidosCards.jsx` — 4 cards indicadores (NUEVO)

### EXISTENTES (Mantener 100%):
- ModalCrearAsignatura
- SectionResumen
- PantallaCanvas (con toda la lógica)
- PipelineSidebar
- BloqueContenido
- ComentarioHilo
- PanelIA
- PanelNotificaciones
- ToolbarIA inline
- Topbar
- EstadoBadge, GravedadTag, EtiquetaBloque
- Toda la lógica de comentarios, etiquetas, notificaciones, roles

### MODIFICAR:
- `PantallaHerramientas.jsx` — agregar Chatbar (mantener grid)
- `PantallaDashboard.jsx` — rediseñar workspace (mantener roles + lógica)
- `App.jsx` — agregar estados chatHistorial, nuevas rutas

---

## mockData Necesario

**NUEVO (específico para Author Workflow):**

Crear archivo separado: `AUTHOR_WORKFLOW_MOCKDATA.md` (JavaScript/JSON structure) con:

```
- asignacionesActuales — Subject assignments (Author entry point)
- metadatosAcademicos — Pre-filled academic metadata (Step 1)
- descriptorMemoriaFormulario / descriptorMemoriaDatos — Form structure + sample (Step 2)
- resumenAsignatura — AI-generated subject summary (Step 3)
- indiceAsignatura — Generated index (Canvas)
- indicacionesDidacticasTema1 — Author-provided instructions (Topic 1)
- resumenTema1 — AI-generated Topic 1 summary
- contenidoTema1 — Full written Topic 1 content
- aFondoTema1 — References WITH NEW category labels
- recursosChainingThoughts — Chain of thought visualization
- cargandoResumenTema1 — Loading messages
- estadosPosibles — State configurations
- validacionesStep2 — Form validation rules
- categoriasRecursos — Category options (Casos reales, Ampliaciones, Tendencias, Lecturas)
```

**MANTENER TODO LO EXISTENTE:**
- `currentUser`, `titulaciones` (estructura jerárquica)
- `preguntasCreacion` (si aplica)
- `pipeline`, `bloques`, `chatHistorial`
- `respuestasIA`, `notificaciones`
- `estadoConfig`, `gravedadConfig`
- `etiquetasDisponibles`
- `dashboardStats`, `roles`, `herramientas`

---

## Orden de Construcción

1. **Chatbar** — componente reutilizable (Herramientas + Dashboard)
2. **Herramientas rediseñada** — agregar Chatbar, mantener grid
3. **Dashboard rediseñada** — workspace 3 columnas, agregar Chatbar
4. **Sistema shortcuts** — detectar `/`, dropdown, respuestas
5. **Validación dual input** — ambas rutas abren ModalCrearAsignatura correctamente
6. **Integración completa** — Herramientas + Dashboard + Canvas + Roles

---

## Flujos Completos (Testing)

### Flujo Chatbar:
```
Herramientas → Chatbar `/generar` → Dropdown sugiere
→ Click / Enter → ModalCrearAsignatura abre (Paso 1)
→ Wizard 5 pasos → Canvas (Resumen)
```

### Flujo Tradicional:
```
Herramientas → Click "Generación" card → ModalCrearAsignatura abre
→ (Mismo wizard 5 pasos) → Canvas (Resumen)
```

### Flujo Dashboard:
```
Dashboard → Chatbar `/generar` → ModalCrearAsignatura
O
Dashboard → Click "Nueva asignatura" → ModalCrearAsignatura
O
Dashboard → Click titulación → filtra tabla
Dashboard → Click fila tabla → Canvas con esa asignatura
Dashboard → Click item pendiente → Canvas en esa sección
```

---

## Cambios NO Breaking

**Importante:** Esta construcción es ADITIVA. No rompe nada:
- Canvas sigue funcionando igual
- Sistema comentarios, etiquetas, IA inline: IGUAL
- Roles y permisos: IGUAL
- Notificaciones: IGUAL
- mockData existente: TODO se mantiene

Solo se AGREGAN:
- Chatbar (nuevo componente)
- Workspace (rediseño Dashboard visual)
- Shortcuts (nueva funcionalidad)
- Dual input (dos formas de crear, mismo resultado)

---

## Validaciones & Quality

- [ ] Chatbar `open y close functionality`, suggestions dropdown, enter/click
- [ ] Shortcuts detectados correctamente (`/` trigger)
- [ ] Respuestas conversacionales pool funcionan
- [ ] Dual input: ambas rutas → ModalCrearAsignatura
- [ ] Dashboard workspace: 3 columnas layout correcto
- [ ] Click titulación filtra tabla
- [ ] Click tabla → Canvas (toda la lógica inteligente sigue igual)
- [ ] Click pendiente → Canvas en sección correcta
- [ ] Cambio rol → Dashboard se reconfigura (datos diferentes)
- [ ] Canvas sin cambios: comentarios, etiquetas, IA, notificaciones funcionan
- [ ] No regresiones en funcionalidad existente

---

## Referencia (NO cambiar)

- **Design Specs:** `docs/DESIGN_SPECS.md` (mantener igual)
- **Global Roadmap:** `docs/ROADMAP.md` (actualizado con construcción)
- **Contexto:** `docs/CONTEXT.md` (actualizado con nuevas funcionalidades)

---

*Plan de construcción: Agregar chatbar + workspace rediseñado*
*Mantener TODA la funcionalidad original del editor inteligente*
*Construcción directa con Claude Code en Cursor*

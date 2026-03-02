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

### FRENTE B: Canvas + Sistema Inteligente (MANTENER TODO)

#### Pantalla 3: Modal Creación Asignatura (OPTIMIZADO)

**Flujo nuevo: 7 pasos progresivos** (basado en "Propuesta nuevo Flujo PEDUCA"):

**Paso 1: Contexto académico**
- Seleccionar titulación (dropdown)
- Nivel de estudio (select)
- Público objetivo (textarea)
- Número de créditos (number)
- Temas a tratar (textarea)
- Botón: "Siguiente" → Paso 2

**Paso 2: Definición temática**
- Área de conocimiento (select) — determina tags sugeridos
- Tipo de asignatura (select: cuantitativa, cualitativa, mixta)
- Enfoque (select: teórico, práctico, etc.)
- Botón: "Siguiente" → Paso 3 (IA genera índice)

**Paso 3: Generación automática (Índice)**
- IA genera índice provisional basado en respuestas
- Mostrar: "Generando índice de temas..." (loading)
- Preview del índice generado (solo lectura)
- Botón: "Siguiente" → Paso 4 (IA genera resumen)

**Paso 4: Resumen preliminar**
- IA genera: nombre, descripción, objetivos
- Todo editable (input nombre, textarea descripción, lista objetivos)
- Botón: "Siguiente" → Paso 5 (IA genera Tema 1)

**Paso 5: Previsualización Tema 1**
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

**NUEVO:**
```js
export const shortcutsComandos = [...]
export const respuestasIAChatbar = [...]
export const misPendientes = [...]
export const tagsFiltrabledashboard = [...]

// Nuevos para Calidad de Contenidos
export const calidadContenidosIndicadores = {
  alertasNormativas: 6,
  revisionProfunda: 21,
  iseMediaPonderado: 3.9,
  asignaturasEstadoCritico: 3,
}

export const alertasNormativasPorAsignatura = {
  'fund-ml': { totalAlertas: 2, alertas: [...] },
  'deep-learning': { totalAlertas: 1, alertas: [...] },
}
```

**MANTENER TODO LO EXISTENTE:**
- `currentUser`, `titulaciones` (estructura jerárquica)
- `preguntasCreacion` (11 preguntas)
- `pipeline`, `bloquesTema2`, `bloquesTema1`
- `chatHistorialTema2`, `chatHistorialTema1`
- `respuestasIA`, `notificaciones`
- `estadoConfig`, `gravedadConfig`
- `etiquetasDisponibles`, `tagsSugerenciasPorArea`
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

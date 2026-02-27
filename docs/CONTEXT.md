# AGC 2.0 — Contexto de sesión para Cursor
*Última actualización: 2026-02-26*

---

## Qué es este proyecto

Prototipo navegable de alta fidelidad de **AGC 2.0** — plataforma de creación de contenido educativo para UNIR. Fase 2 de 4 del producto (ver plan global en `AGC_ClaudeCode_Plan_SecondStage.md`).

**No es un producto funcional.** Es una demo con datos hardcodeados que simula el flujo real de trabajo de un Autor. Stack: React + Vite + Tailwind CSS v4 + lucide-react.

---

## Estado actual del prototipo

### ✅ Construido y funcional

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

3. **Modal de creación de asignatura** (`src/components/ModalCrearAsignatura.jsx`) — NEW
   - Paso 1: Seleccionar titulación (dropdown de todas las titulaciones)
   - Paso 2: Responder 11 preguntas situacionales en forma de cuestionario
   - Paso 3: IA genera resumen preliminar (editable) con sugerencias de tags
   - Paso 4: Autor aprueba → se crea la asignatura en mockData y navega al Canvas en el Resumen

4. **Canvas — Resumen de asignatura** (`src/screens/PantallaCanvas.jsx`) — NEW
   - Primera sección del pipeline cuando se crea una asignatura
   - Contenido editable: nombre, descripción, objetivos de aprendizaje, tags sugeridos
   - Estado: `borrador`
   - Barra de acciones: `Guardar · Enviar a revisión`
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

---

## Arquitectura de navegación

```
App.jsx
  pantalla: 'herramientas' | 'dashboard' | 'crearAsignatura' | 'canvas'
  rolActivo: 'autor' | 'coordinador' | 'editor' | 'disenador'
  asignaturaActiva: { titulacionId, asignaturaId }
  seccionActiva: 'resumen' | 't1' | 't2' | 'indice' | 'instrucciones'
  panelIAabierto: bool
  notifAbiertas: bool

Flujo:
herramientas → dashboard (click "Generación de Asignaturas")
dashboard (sidebar) → crearAsignatura (click "Crear nueva asignatura")
crearAsignatura → canvas (Resumen) (click "Aprobar resumen")
canvas → canvas (click sección en pipeline)
topbar 🔔 → panel notificaciones (overlay)
notificación → canvas o dashboard (click en item)
```

---

## Datos (src/mockData.js)

Todos los datos son hardcodeados. Nunca llamadas a API.

**Estructura jerárquica:**
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
      ├── etapaActual
      ├── estado
      ├── temas[]
      │   ├── id
      │   ├── label
      │   ├── estado
      │   └── bloques[]
      │       ├── id
      │       ├── contenido
      │       ├── etiquetas[]
      │       └── comentarios[]
      └── preguntas (datos de creación)
          ├── tipoEstudio
          ├── areaConocimiento
          ├── nivelEducativo
          ├── creditos
          ├── noBloques
          ├── noTemasExtension
          ├── tipoAsignatura
          ├── enfoque
          ├── competencias
          ├── metodologia
          └── temasObligatorios
```

**Entidades clave:**
- `currentUser` — Ana Lucía Martínez, rol autor
- `titulaciones` — 6 titulaciones, todas navegables
- `preguntasCreacion` — 11 preguntas del formulario con tipos de respuesta
- `miTrabajo` — array plano de secciones pendientes para la vista "Mi trabajo"
- `pipeline` — etapas del flujo de contenido con estados (Resumen > Índice > Instrucciones > Temario > Recursos > Tests)
- `bloquesTema2` — 2 bloques de contenido del Tema 2 (sin comentarios críticos aún)
- `bloquesTema1` — 2 bloques del Tema 1 (bloque 2 tiene comentario 🔴 Crítico del Coordinador)
- `chatHistorialTema2` / `chatHistorialTema1` — mensajes iniciales del panel IA
- `respuestasIA` — array de 5 respuestas simuladas que rotan
- `notificaciones` — 3 notificaciones (1 con acción requerida)
- `estadoConfig` — colores bg/text/border/dot por estado del pipeline
- `gravedadConfig` — colores por severidad de comentario
- `dashboardStats` — stats por rol (autor/coordinador/editor/disenador)
- `roles` — 4 roles con label y description

---

## Tokens de diseño

```js
// Pipeline states
porComenzar:  { bg: '#F8FAFC', text: '#94A3B8', border: '#E2E8F0' }
bloqueado:    { bg: '#F1F5F9', text: '#94A3B8', border: '#CBD5E1' }
borrador:     { bg: '#EFF6FF', text: '#3B82F6', border: '#BFDBFE' }
revision:     { bg: '#FFFBEB', text: '#F59E0B', border: '#FDE68A' }
comentarios:  { bg: '#FFF7ED', text: '#F97316', border: '#FED7AA' }
aprobado:     { bg: '#F0FDF4', text: '#10B981', border: '#A7F3D0' }

// AI layer
primary: #6366F1 (índigo)
light:   #EEF2FF
accent:  #8B5CF6

// Tipografía
UI:    'DM Sans' (300, 400, 500, 600, 700)
Mono:  'JetBrains Mono' (400, 500) — para tags, badges, códigos

// Layout canvas
Topbar: 56px fijo
Pipeline sidebar: 240px
Panel IA: 320px (colapsable)
Action bar: 64px fijo en bottom
```

---

## Lo que falta por construir

### Inmediato (siguiente iteración)
- [ ] **Modal de creación de asignatura** — wizard de 11 preguntas + generación de resumen preliminar
- [ ] **Pantalla Resumen** en Canvas — sección inicial con contenido editable + tags sugeridos
- [ ] **Vista del Coordinador** — misma pantalla canvas, mismo contenido, pero:
  - Área central: solo lectura
  - Barra de acciones: `Dejar comentario · Solicitar correcciones · ✓ Aprobar esta sección`
  - Panel derecho: hilo de comentario editable (el Coordinador crea los comentarios)
  - Dashboard del Coordinador: asignaturas reordenadas por urgencia, "Tema 1 · En revisión · pendiente de ti"

### Futuro
- [ ] Vista del Editor de contenido
- [ ] Vista del Diseñador instruccional
- [ ] Fase 3 del producto: generación de variantes adaptativas

---

## Cómo arrancar

```bash
cd /Users/jccruzb-local/agc-prototype
npm run dev
# → http://localhost:5174/
```

## Repositorio

**GitHub:** https://github.com/carobarbosaux/agc-prototype (privado)

---

## Decisiones de diseño tomadas en sesión

1. **Dashboard = gestor de trabajo** (no solo lista de asignaturas) — modelo Linear: inbox primero, estructura segundo
2. **Selector de rol en topbar** — siempre visible, cambio instantáneo, sin navegación. Es el mecanismo de demo central
3. **Panel IA como colaborador** — no chatbot añadido. Comparte espacio con el panel de comentarios (uno sustituye al otro)
4. **3 pantallas, no una por rol** — el rol reconfigura la misma pantalla: permisos, acciones y barra de acciones cambian; el contenido y pipeline son siempre los mismos
5. **Notificaciones como overlay** — panel lateral desde cualquier pantalla, no pantalla separada
6. **Toggle Mi trabajo / Por titulación** — Linear-style, en topbar del dashboard. Las stat cards filtran ambas vistas

---

*Plan completo del producto: `AGC_ClaudeCode_Plan_SecondStage.md`*

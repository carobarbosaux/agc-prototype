# AGC 2.0 — Contexto de sesión para Cursor
*Última actualización: 2026-02-26*

---

## Qué es este proyecto

Prototipo navegable de alta fidelidad de **AGC 2.0** — plataforma de creación de contenido educativo para UNIR. Fase 2 de 4 del producto (ver plan global en `AGC_ClaudeCode_Plan_SecondStage.md`).

**No es un producto funcional.** Es una demo con datos hardcodeados que simula el flujo real de trabajo de un Autor. Stack: React + Vite + Tailwind CSS v4 + lucide-react.

---

## Estado actual del prototipo

### ✅ Construido y funcional

**3 pantallas:**

1. **Herramientas** (`src/screens/PantallaHerramientas.jsx`)
   - Grid de 5 tools. Solo "Generación de Asignaturas" es clickeable → navega al Dashboard
   - Las demás están visualmente desactivadas ("Próximamente")

2. **Dashboard** (`src/screens/PantallaDashboard.jsx`)
   - **Dos vistas con toggle** (estilo Linear):
     - **"Mi trabajo"** — inbox de trabajo priorizado por urgencia. Filas agrupadas: Requieren atención → En progreso → Por comenzar. Cada fila = sección accionable con clic directo al canvas
     - **"Por titulación"** — sidebar con 6 titulaciones (solo Máster en IA navegable, las demás con candado). Panel derecho con tabla de asignaturas
   - 3 stat cards clickeables que filtran ambas vistas
   - 6 titulaciones en mockData, solo Máster en IA tiene asignaturas navegables

3. **Canvas** (`src/screens/PantallaCanvas.jsx`)
   - Layout 3 columnas: Pipeline (240px) | Contenido (flexible) | Panel IA (320px)
   - **Pipeline izquierdo**: etapas con estados, Temario expandible con 6 temas, progreso al fondo
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
  pantalla: 'herramientas' | 'dashboard' | 'canvas'
  rolActivo: 'autor' | 'coordinador' | 'editor' | 'disenador'
  seccionActiva: 't1' | 't2' | 'indice' | 'instrucciones'
  panelIAabierto: bool
  notifAbiertas: bool

Flujo:
herramientas → dashboard (click "Generación de Asignaturas")
dashboard → canvas (click fila activa en cualquier vista)
canvas → canvas (click sección en pipeline)
topbar 🔔 → panel notificaciones (overlay)
notificación → canvas o dashboard (click en item)
```

---

## Datos (src/mockData.js)

Todos los datos son hardcodeados. Nunca llamadas a API.

**Entidades clave:**
- `currentUser` — Ana Lucía Martínez, rol autor
- `titulaciones` — 6 titulaciones, solo `master-ia` tiene `navegable: true`
- `miTrabajo` — array plano de secciones pendientes para la vista "Mi trabajo"
- `pipeline` — etapas del flujo de contenido con estados
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

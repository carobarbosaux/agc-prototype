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
   - 3 stat cards (CalidadContenidosCards) clickeables que filtran la tabla
   - **Vista por rol** (ver sección "Roles" abajo)
   - Chatbar superior

3. **Crear asignatura** (`src/screens/PantallaCrearAsignatura.jsx`)
   - **Solo accesible para `coordinador`**
   - 3 pasos: Contexto → Temática → **Preview resumen (aceptar/volver)**
   - Tras aceptar → navega al Canvas sección `indice` con spinner de generación

4. **Canvas** (`src/screens/PantallaCanvas.jsx`)
   - Layout: PipelineSidebar (240px) | Contenido (flexible) | Panel IA (320px) | Utilities strip (44px)
   - **Guardado automático** toggle reemplaza "Guardar borrador"
   - **Notas** ancladas a texto seleccionado, separadas de Comentarios
   - Herramientas IA dropdown (Revisar calidad + futuros)

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

1. **Contexto académico** — titulación, nivel, nombre, público, créditos, temas a tratar
2. **Definición temática** — área de conocimiento, tipo, enfoque
3. **Preview resumen** *(nuevo)* — read-only. Muestra lo que la IA generará: título, descripción, objetivos. Solo dos acciones:
   - **Aceptar y continuar** → genera `indice` y `resumen` en memoria → navega a Canvas `indice`
   - **Volver** → regresa al paso 2
   - Sin edición, sin chat

En Canvas `indice`: spinner ~1.4s → muestra índice AI → CTA "Generar resumen" → spinner → navega a Canvas `resumen` con datos prefilled.

---

## Canvas — Guardado automático

Reemplaza el botón "Guardar borrador":
- Toggle `[● Guardado automático ON]` / `[○ Guardado automático OFF]`
- ON: guarda cambios (simulado), muestra "Guardado" con check verde
- OFF: muestra "Cambios sin guardar" en ámbar
- Estado local: `autosaveOn` (bool, default true)

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

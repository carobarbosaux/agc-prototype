# AGC Prototype

High-fidelity navigable prototype of AGC 2.0 — UNIR's educational content creation platform. All data is hardcoded in `src/mockData.js`; no API calls.

## Run

```bash
npm install && npm run dev   # http://localhost:5173
```

No `.env` needed. `npm run build` for production. No test runner.

## Stack

React 19 + Vite 7 + Tailwind CSS v4 (`@tailwindcss/vite`, no config file) + lucide-react. No TypeScript, no router, no state library.

## Architecture

- **No router** — `pantalla` string in `App.jsx` controls which screen renders: `'herramientas' | 'dashboard' | 'canvas' | 'crearAsignatura'`. Call `navigate(destino, params)` to change screens.
- **No store** — all state lives in `App.jsx`, flows via props. Key state: `pantalla`, `rolActivo`, `seccionActiva`, `asignaturaActiva`, `titulaciones`, `creacionData`.
- **`src/mockData.js`** is the only data source (~1600 lines). Key exports: `titulaciones`, `pipeline`, `bloquesTema1..4`, `dlBloquesTema1`, `instruccionesTema1..6`, `estadoConfig`, `gravedadConfig`, `respuestasIA`, `respuestasCalidadIA`.
- **`src/` is the real source.** Root-level `App.jsx`, `mockData.js`, `components/` are unused legacy stubs — Vite entry is `index.html` → `src/main.jsx`.

## Screens (`src/screens/`)

| File | Purpose |
|---|---|
| `PantallaHerramientas.jsx` | Landing / tools hub |
| `PantallaDashboard.jsx` | Content tracking dashboard |
| `PantallaCanvas.jsx` | Main content editor — most complex screen |
| `PantallaCrearAsignatura.jsx` | New subject creation wizard |

## Roles (`rolActivo`)

`autor` · `coordinador` · `editor` · `disenador` — switching roles is the primary demo mechanism; it transforms dashboard columns, Canvas action bar, and editing permissions. `editable = rolActivo === 'autor'`.

## Key domain values

- **`estado`**: `borrador | revision | comentarios | aprobado | bloqueado | porComenzar`
- **`gravedad`**: `critico | importante | sugerencia | nota | alertaNormativa`
- **`obsolescencia`**: `ok | requiereRevision | mantenimiento | obsoleta`
- **Section IDs**: `resumen | indice | instrucciones-t1..t6 | t1..t6 | recursos-t1..t6 | test-t1..t6`
- **Block `tipo`**: `h1 h2 h3 h4 p ul ol blockquote code hr img` — `ul`/`ol` `contenido` may be a string or `string[]`

## Conventions

- **Naming**: Screens `PantallaN`, state/props camelCase Spanish (`seccionActiva`, `rolActivo`), config objects `SCREAMING_SNAKE_CASE` (`SECCION_CONFIG`).
- **Styling**: Tailwind for layout; inline `style={{}}` for colors. Hover effects via `onMouseEnter/Leave` on `e.currentTarget.style` — not Tailwind `hover:`. Design tokens as CSS vars in `src/index.css`.
- **Subcomponents**: Defined in the same file as their parent screen (e.g. `TablaCoordinador` in `PantallaDashboard.jsx`). Only extract if reused across files.
- **`contentEditable`**: `BloqueContenido` syncs `bloque.contenido` → `innerHTML` only on external changes to avoid DOM conflicts. Edits propagate via `onContenidoChange`.
- **AI simulation**: Responses picked from pools (`respuestasCalidadIA`) with `setTimeout` chains for realism.

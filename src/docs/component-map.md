# Component Map — Prodi Design System

Single source of truth linking every Angular component to its Design System origin,
atomic tier, Figma reference, and the CSS token variables it consumes.

**Rules (enforced on every PR):**
- `@source` must be one of: `Figma` | `Storybook` | `Storybook/PrimeNG`
- `@type` must be one of: `atom` | `molecule` | `organism`
- `@figma` must carry a Figma URL or node-id once the design is finalised
- No component may ship with `#RRGGBB` hardcoded in `.ts` / `.html` files

---

## Atoms — `src/app/shared/ui/atoms/`

> Smallest, stateless display pieces. No `AppStateService` access.

| Angular selector        | Source file                    | Source         | Figma node | Key tokens |
|-------------------------|-------------------------------|----------------|------------|-----------|
| `app-estado-badge`      | atoms/estado-badge             | Figma          | TBD        | `--color-primary`, `--color-warning`, `--color-success`, `--color-error` |
| `app-gravedad-tag`      | atoms/gravedad-tag             | Figma          | TBD        | `--color-error`, `--color-warning`, `--color-text-muted` |
| `app-etiqueta-bloque`   | atoms/etiqueta-bloque          | Figma          | TBD        | `--color-primary-500`, `--color-ai-light`, `--color-ai-border` |
| `app-tooltip`           | atoms/tooltip                  | Figma          | TBD        | `--tooltip-bg`, `--tooltip-text`, `--tooltip-radius` |
| `prodi-mark`            | atoms/prodi-logo               | Figma — Brand  | TBD        | `--color-primary` |
| `prodi-wordmark`        | atoms/prodi-logo               | Figma — Brand  | TBD        | `--color-primary` |
| `app-status-indicator`  | atoms/status-indicator         | Figma          | TBD        | `--status-*-bg`, `--status-*-color` |

---

## Molecules — `src/app/shared/ui/molecules/`

> Compositions of atoms with local state. May not inject `AppStateService`.

| Angular selector                | Source file                         | Source  | Figma node | Composed of                       | Key tokens |
|---------------------------------|-------------------------------------|---------|------------|-----------------------------------|-----------|
| `app-comentario-hilo`           | molecules/comentario-hilo           | Figma   | TBD        | `GravedadTag`, `PhIconComponent`  | `--color-error`, `--color-warning`, `--color-border` |
| `app-calidad-contenidos-cards`  | molecules/calidad-contenidos-cards  | Figma   | TBD        | `PhIconComponent`                 | `--color-success`, `--color-error`, `--color-warning` |
| `app-panel-mis-pendientes`      | molecules/panel-mis-pendientes      | Figma   | TBD        | `GravedadTag`, `PhIconComponent`  | `--color-primary`, `--color-error`, `--color-border` |

---

## Organisms — `src/app/shared/ui/organisms/`

> Complex components that may inject `AppStateService` and hold business logic.

| Angular selector           | Source file                     | Source  | Figma node | Composed of                                               | Key tokens |
|----------------------------|---------------------------------|---------|------------|-----------------------------------------------------------|-----------|
| `app-topbar`               | organisms/topbar                | Figma   | TBD        | `ProdiWordmark`, `PhIconComponent`                        | `--color-primary`, `--color-border`, `--color-bg` |
| `app-pipeline-sidebar`     | organisms/pipeline-sidebar      | Figma   | TBD        | `StatusIndicator`, `Tooltip`, `PhIconComponent`           | `--pipeline-item-*` |
| `app-chatbar`              | organisms/chatbar               | Figma   | TBD        | `ProdiMark`, `Tooltip`, `PhIconComponent`                 | `--color-primary`, `--color-ai-light`, `--color-ai-border` |
| `app-panel-ia`             | organisms/panel-ia              | Figma   | TBD        | `ProdiMark`, `PhIconComponent`                            | `--panel-ia-bg`, `--panel-ia-border`, `--panel-ia-header-bg` |
| `app-panel-notificaciones` | organisms/panel-notificaciones  | Figma   | TBD        | `PhIconComponent`                                         | `--color-primary`, `--color-warning`, `--color-border` |
| `app-bloque-contenido`     | organisms/bloque-contenido      | Figma   | TBD        | `PhIconComponent`                                         | `--color-primary`, `--color-border`, `--color-surface` |
| `app-onboarding-prodi`     | organisms/onboarding-prodi      | Figma   | TBD        | `ProdiMark`, `PhIconComponent`                            | `--color-primary`, `--color-ai-light`, `--color-ai-border` |

---

## Icons — `src/app/icons/`

| Selector    | Source file          | Notes |
|-------------|----------------------|-------|
| `ph-icon`   | icons/ph-icon        | Phosphor Icons inline SVG renderer. Not a DS component — utility only. |

---

## Screens — `src/app/screens/`

> Not DS components. Screens compose organisms and call `AppStateService` directly.

| Route          | Component class              | Source file                          |
|----------------|------------------------------|--------------------------------------|
| `/herramientas`| `HerramientasComponent`      | screens/herramientas                 |
| `/dashboard`   | `DashboardComponent`         | screens/dashboard                    |
| `/canvas`      | `CanvasComponent`            | screens/canvas                       |
| `/crear`       | `CrearAsignaturaComponent`   | screens/crear-asignatura             |

---

## Token Files — `src/styles/tokens/`

| File              | Layer     | Purpose |
|-------------------|-----------|---------|
| `_base.css`       | Primitive | Raw colour scales (primary, surface, green, red, gray, neutral, amber) |
| `_semantic.css`   | Semantic  | Usage-intent aliases (`--color-primary`, `--color-error`, `--color-text-*`, etc.) |
| `_component.css`  | Component | Per-component tokens (`--btn-*`, `--input-*`, `--status-*`, `--tooltip-*`, etc.) |

---

*Last updated: 2026-03-27*

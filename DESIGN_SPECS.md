# AGC Design System
> Visual reference inspired by UNIR (unir.net)

---

## Colors

```css
:root {
  /* Brand */
  --color-primary:        #0098CD;
  --color-primary-hover:  #00729A;
  --color-secondary:      #006C8F;
  --color-secondary-dark: #073676;

  /* Neutrals */
  --color-bg:             #F8F9FA;
  --color-surface:        #FFFFFF;
  --color-border:         #E5E7EB;
  --color-text:           #1A1A1A;
  --color-text-muted:     #6B7280;

  /* Semantic */
  --color-success:        #10B981;
  --color-error:          #EF4444;
}
```

---

## Typography

**Font:** `Inter, Arial, sans-serif`

| Token | Size | Weight | Line Height |
|---|---|---|---|
| `--text-display` | 52px | 700 | 1.1 |
| `--text-h1` | 36px | 700 | 1.2 |
| `--text-h2` | 28px | 600 | 1.3 |
| `--text-h3` | 20px | 600 | 1.4 |
| `--text-h4` | 16px | 600 | 1.4 |
| `--text-body` | 16px | 400 | 1.6 |
| `--text-small` | 14px | 400 | 1.5 |
| `--text-xs`   | 12px | 500 | 1.4 |

---

## Spacing

Base unit: **8px**

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 16px |
| `--space-4` | 24px |
| `--space-5` | 32px |
| `--space-6` | 48px |
| `--space-7` | 64px |
| `--space-8` | 96px |

---

## Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | badges, tags |
| `--radius-md` | 8px | inputs, buttons |
| `--radius-lg` | 12px | cards |
| `--radius-xl` | 20px | modals, panels |
| `--radius-full` | 9999px | pills |

---

## Shadows

```css
--shadow-sm:  0 1px 4px rgba(0,0,0,0.06);
--shadow-md:  0 2px 12px rgba(0,0,0,0.08);
--shadow-lg:  0 8px 24px rgba(0,0,0,0.12);
--shadow-brand: 0 4px 16px rgba(0,152,205,0.20);
```

---

## Buttons

### Variants

| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | `#0098CD` | white | — |
| Secondary | `#073676` | white | — |
| Ghost | transparent | `#0098CD` | `2px solid #0098CD` |
| Ghost Dark | transparent | white | `2px solid white` |
| Danger | `#EF4444` | white | — |

### Sizes

| Size | Padding | Font Size |
|---|---|---|
| `sm` | `8px 16px` | 13px |
| `md` | `12px 24px` | 15px |
| `lg` | `16px 32px` | 16px |

### Base styles

```css
button {
  font-weight: 600;
  border-radius: var(--radius-md);
  transition: background 200ms ease;
  cursor: pointer;
  white-space: nowrap;
}
button:hover  { filter: brightness(0.92); }
button:active { transform: scale(0.98); }
```

---

## Inputs & Forms

```css
input, select, textarea {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 15px;
  color: var(--color-text);
  background: var(--color-surface);
  transition: border-color 200ms;
  width: 100%;
}

input:focus, select:focus, textarea:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,152,205,0.15);
}

label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  display: block;
  margin-bottom: 6px;
}
```

---

## Cards

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform 250ms ease, box-shadow 250ms ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

---

## Badges & Tags

```css
.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.badge-primary  { background: #0098CD; color: white; }
.badge-navy     { background: #073676; color: white; }
.badge-outline  { border: 1px solid #0098CD; color: #0098CD; }
.badge-muted    { background: #F3F4F6; color: #6B7280; }
```

---

## Icons

- **Library:** Lucide Icons (MIT)
- **Style:** Outlined, 1.5px stroke
- **Sizes:** 16px (inline) · 20px (nav) · 24px (UI) · 48px (feature)
- **Color:** Inherits `currentColor`

---

## Motion

| Interaction | Duration | Easing |
|---|---|---|
| Button / link hover | 200ms | ease |
| Card hover lift | 250ms | ease |
| Dropdown open | 200ms | ease |
| Carousel slide | 600ms | ease-in-out |
| Page fade | 300ms | ease |

---

## Breakpoints

| Name | Value |
|---|---|
| Mobile | `< 480px` |
| Tablet | `480px – 1024px` |
| Desktop | `> 1024px` |

Max container width: **1280px** · Gutter: **24px**

---

## Focus / Accessibility

```css
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

- Minimum contrast ratio: 4.5:1 (body), 3:1 (large text)
- All interactive elements must have `:focus-visible` styles

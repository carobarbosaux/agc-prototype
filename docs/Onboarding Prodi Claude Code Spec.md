# Prodi Onboarding — Implementation Spec for Cursor / Claude Code

## Goal
Implement a simple, visual, step‑based onboarding for the **Author** role inside **Asistente de Contenidos**. The onboarding introduces **Prodi** as a transversal AI assistant, explains its main capabilities in the editor, and ends with a clear call to action.

This onboarding **is not a hotspot product tour**. It should behave like a **visual getting‑started sequence** made of slides or blocks.

The **specification is written in English**, but the **UI copy must remain in Spanish**.

---

## UX Approach

- Keep the experience **very simple and scannable**.
- Prioritize **short text + visual support**.
- Each slide communicates **one core idea**.
- The tone should feel **modern, product‑driven, and lightweight**.
- Focus on **Prodi's AI capabilities**, not on explaining the full editorial workflow.

---

## Onboarding Structure

The onboarding should appear as a **sequence of slides / blocks**.

Recommended layout:

**Left side**
- onboarding title
- step indicator / list of steps

**Right side**
- active slide content
- supporting visual or animation

Navigation should support:

- Next
- Back (optional)
- Skip / Close

---

# UI Copy (Spanish)

## Slide 1 — Intro

**Title**

Conoce Prodi

**Subtitle**

El nuevo Asistente de Contenidos

**Body**

Tu criterio profesional en el centro.

**Visual suggestion**

Soft zoom into the editor interface.

---

## Slide 2 — Start generating content

**Body text**

Define aspectos de tu asignatura

y comienza a generar contenido.

**Visual suggestion**

Show the start screen + canvas editor.

---

## Slide 3 — Contextual AI tools

**Body text**

Selecciona cualquier fragmento

Aparecen herramientas contextuales

**Visual suggestion**

User selects text → contextual AI menu appears.

---

## Slide 4 — AI actions

**Title**

Mejora tu contenido

**Actions list**

- Corregir redacción
- Expandir o resumir
- Regenerar texto
- Buscar bibliografía
- Deep research

**Visual suggestion**

Show a contextual action applied to a text block.

---

## Slide 5 — Prodi as transversal assistant

**Body text**

Consulta a Prodi en cualquier momento

**Examples**

- Investigar un tema
- Desarrollar ideas

**Visual suggestion**

Show the AI side panel.

---

## Slide 6 — Notes and comments

**Body text**

Añade notas personales

y comentarios para colaborar

**Visual suggestion**

Show notes and comments in the editor.

**Concept clarification**

- **Notas** → personal annotations
- **Comentarios** → collaboration and review with the team

---

## Slide 7 — Final step

**Body text**

Empieza a crear con Prodi

**Primary CTA**

Abrir asistente

---

# Functional Requirements

1. The onboarding appears the **first time the user enters this workspace**.
2. Navigation should allow:

- Next
- Back (optional)
- Skip / Close

3. Final action:

**Abrir asistente**

4. Navigation can be implemented using:

- numbered steps
- progress bar
- side step list

5. Interaction should remain **lightweight and simple**.

6. Real editor hotspots are **not required** in this phase. Visuals can be mockups or simple animations.

---

# Visual Requirements

- Clean, editorial product aesthetic.
- Clear hierarchy between:

  - title
  - subtitle
  - short description
  - visual

Recommended composition:

- centered container
- left progress panel
- right content panel

UI details:

- rounded corners
- generous spacing
- subtle shadows

Animations should remain minimal:

- fade
- slide transitions
- soft zoom

---

# Expected Visual Behaviour

Visuals can be static mockups or simple UI animations.

Slide behaviours:

**Slide 1**

Editor zoom animation.

**Slide 2**

Canvas overview.

**Slide 3**

Text selection → contextual menu appears.

**Slide 4**

Apply one AI action to a text fragment.

**Slide 5**

AI side panel visible.

**Slide 6**

Notes and comments interaction.

**Slide 7**

Final state with CTA.

---

# Implementation Notes

Create a dedicated component:

```
OnboardingProdi.jsx
```

Store slide data separately:

```
onboardingProdiData.js
```

Example slide structure:

```javascript
{
  id: 1,
  title: "Conoce Prodi",
  subtitle: "El nuevo Asistente de Contenidos",
  body: "Tu criterio profesional en el centro.",
  bullets: [],
  cta: null,
  visualType: "editor-zoom"
}
```

AI actions slide example:

```javascript
{
  id: 4,
  title: "Mejora tu contenido",
  bullets: [
    "Corregir redacción",
    "Expandir o resumir",
    "Regenerar texto",
    "Buscar bibliografía",
    "Deep research"
  ],
  visualType: "contextual-actions"
}
```

Final slide example:

```javascript
{
  id: 7,
  title: "Empieza a crear con Prodi",
  cta: "Abrir asistente",
  visualType: "final-state"
}
```

---

# Success Criteria

The onboarding should quickly communicate that:

1. **Prodi** is the new AI assistant inside Asistente de Contenidos.
2. It works **contextually on selected text**.
3. It is also available **transversally through the chat panel**.
4. The editor also includes **personal notes** and **collaborative comments**.
5. The user finishes with a clear action: **Abrir asistente**.

---

# Expected Output

A navigable onboarding component integrated into the prototype, demonstrating the Prodi workflow with simple visuals and Spanish UI copy.


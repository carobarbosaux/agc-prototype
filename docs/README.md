# AGC 2.0 — Plataforma de Generación de Contenido Educativo

**Status:** Phase 2 Development (High-fidelity navigable prototype)  
**Stack:** React + Vite + Tailwind CSS v4 + lucide-react  
**Last Updated:** 2026-02-26

---

## 📋 Quick Navigation

- **[CONTEXT.md](./docs/CONTEXT.md)** — Project overview, current state, architecture
- **[DESIGN_SPECS.md](./docs/DESIGN_SPECS.md)** — Design system, colors, typography, components
- **[AGC_ClaudeCode_Plan_SecondStage.md](./docs/AGC_ClaudeCode_Plan_SecondStage.md)** — Phase 2 implementation plan
- **[mockData.js](./mockData/mockData.js)** — All hardcoded data structures

---

## 🎯 What This Is

A **high-fidelity prototype** simulating the real workflow of **Ana Lucía Martínez**, an Author working on a Master's in AI curriculum. The prototype is **not functional**—it's a demo with hardcoded data demonstrating:

- Author role workflow for content creation
- Dashboard work prioritization (Linear-style)
- Content canvas with inline editing and AI panel
- Coordinator role interface (read-only preview)
- Comments system with threading
- Notifications overlay

---

## 🏗️ Architecture

**3 main screens:**

1. **Herramientas** (Tools) — Grid of 5 tools, only "Subject Generation" is clickable
2. **Dashboard** — Toggle between "Mi trabajo" (inbox) and "Por titulación" (by degree)
3. **Canvas** — 3-column layout: Pipeline | Content | AI Panel

**4 roles (configurable via topbar selector):**
- **Autor** (Author) — Create & edit content, full canvas interaction
- **Coordinador** (Coordinator) — Review content, add comments, approve
- **Editor** — (Future)
- **Diseñador** (Instructional Designer) — (Future)

---

## 📁 Folder Structure

```
agc-platform/
├── README.md (this file)
├── docs/
│   ├── CONTEXT.md              # Session context for Cursor/Claude
│   ├── DESIGN_SPECS.md         # Design system & tokens
│   └── AGC_ClaudeCode_Plan_SecondStage.md
├── mockData/
│   └── mockData.js             # All hardcoded data (users, content, etc)
└── src/ (in your local repo)
    ├── App.jsx
    ├── screens/
    ├── components/
    └── ...
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/carobarbosaux/agc-prototype.git
cd agc-prototype
npm install
npm run dev
# → http://localhost:5174/
```

---

## 📋 What's Built

**Functional screens:**
- ✅ Tools screen (Herramientas) with Chatbar
- ✅ Dashboard with 3-column workspace layout + Chatbar
- ✅ Subject creation (3 steps, separate components) with Chatbar navigation
- ✅ Canvas with enhanced sections:
  - Index (new) — AI-generated structure, author modifiable
  - Topic 1 Instructions (new) — Setup + Generated summary
  - Topic 1 Content (new) — Full editable content
  - A Fondo with **NEW: category labels** (Real cases, Conceptual expansions, Trends, Complementary readings)
- ✅ Inline content editing with toolbar
- ✅ AI panel with chat simulation
- ✅ Comments threading system
- ✅ Notifications overlay
- ✅ Role selector (Topbar)

**Author Workflow (NEW):**
- ✅ 3-step subject creation (PantallaCrearAsignatura1/2/3)
- ✅ Canvas Index section (modify/reorder/send for review)
- ✅ Topic 1 Instructions setup (focus, bibliography, files, pedagogical notes)
- ✅ Topic 1 Summary generation (with chain of thought if > 5s)
- ✅ Topic 1 Content editing (with existing tools)
- ✅ A Fondo resources with category organization

**Responsive:** Desktop-first, Canvas optimized for 1280px+

---

## 🔄 What's Next (Phase 2 Implementation)

- [ ] **Implement 3-step subject creation workflow**
  - [ ] PantallaCrearAsignatura1.jsx (Academic metadata)
  - [ ] PantallaCrearAsignatura2.jsx (Descriptor + context)
  - [ ] PantallaCrearAsignatura3.jsx (Summary preview)

- [ ] **Implement Canvas new sections**
  - [ ] SectionIndice.jsx (Index with modify/reorder)
  - [ ] SectionTema1Indicaciones.jsx (Topic Instructions setup + summary)
  - [ ] SectionTema1Contenido.jsx (Topic full content)

- [ ] **Enhance A Fondo**
  - [ ] Add category dropdown to RecursosReferenceCard.jsx

- [ ] **Coordinator view** — Same canvas, role-based read-only + approval actions
- [ ] Editor role view
- [ ] Instructional Designer role view with enrichment toolkit

---

## 👤 Primary Use Case

**User:** Ana Lucía Martínez  
**Role:** Author  
**Task:** Creating curriculum content for "Master's in Artificial Intelligence"  
**Current Focus:** Theme 2 (Fundamentals of AI) with inline editing and AI assistance

---

## 🎨 Design System

See [DESIGN_SPECS.md](./docs/DESIGN_SPECS.md) for:
- Color palette (primary: #0098CD)
- Typography (Inter)
- Spacing & layout
- Components & patterns
- Accessibility standards

---

## 📞 Need Context?

If you're reviewing this project:

1. **Start with** [CONTEXT.md](./docs/CONTEXT.md) for the big picture
2. **Check** [DESIGN_SPECS.md](./docs/DESIGN_SPECS.md) for visual reference
3. **Review** [AGC_ClaudeCode_Plan_SecondStage.md](./docs/AGC_ClaudeCode_Plan_SecondStage.md) for implementation details
4. **Use** [mockData.js](./mockData/mockData.js) to understand data structures

---

## 🔐 Repository

**Visibility:** Private (personal account)  
**Branch:** main  
**Clone:** `git clone https://github.com/carobarbosaux/agc-prototype.git`

---

*AGC is part of UNIR's content intelligence platform initiative.*

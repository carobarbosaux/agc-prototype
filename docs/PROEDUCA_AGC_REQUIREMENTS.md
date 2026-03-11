# PROEDUCA Ecosystem & AGC Integration Requirements

## Source Information
- **Ecosistema PROEDUCA HTML:** Focus on AGC's role in Canvas and Dashboard screens
- **Proceso Editorial PROEDUCA HTML:** Steps 2, 3, and 5 are relevant to AGC prototype

---

## PROEDUCA Editorial Flow

### Step 1 — Commission (AGeA Layer)
- **Location:** AGeA system (NOT in AGC prototype)
- **What happens:** Commission created, roles assigned, workspace enabled in AGC
- **AGC involvement:** None — just preparation

### Step 2 — Content Creation (AGC Canvas) ⭐ CRITICAL FOR PROTOTYPE

**Prerequisite:** Commission created in AGeA (Step 1) → Subject assigned to Author

**New 4-step workflow in Canvas:**

#### Sub-step 2.1: Author Collects Academic Context (PantallaCrearAsignatura1)
- **Input:** Pre-filled academic metadata from system (name, degree, credits, coordinator, specialist, model)
- **Author action:** Reviews fixed information
- **Output:** Confirmation to proceed to Step 2.2

#### Sub-step 2.2: Author Provides Didactic Context (PantallaCrearAsignatura2)
- **Input:** Author fills form with contextual information:
  - Prior knowledge level
  - Number of topics (1-10, recommended 8)
  - Subject approach (theoretical, practical, theoretical-practical, case-based, project-based)
  - Mandatory topics/concepts
  - Commission options (video plan, in-depth section)
  - Reference files (bibliography, documents, images)
- **AI generates:** Subject summary based on inputs
- **Output:** Navigates to Step 2.3

#### Sub-step 2.3: Author Reviews Subject Summary (PantallaCrearAsignatura3)
- **Input:** AI-generated subject summary (general overview + per-topic descriptions + structure)
- **Author actions:**
  - Edit summary inline
  - Give specific instructions to AI (contextual chatbar)
  - Go back to Step 2.2 to modify approach and regenerate
  - Or accept and generate index
- **Output:** Index generated → Enter Canvas Índice section

#### Sub-step 2.4: Author Works with Index (Canvas Índice section - NEW)
- **Input:** AI-generated index (topics, headings, order)
- **Author actions:**
  - Modify structure freely (add/remove/reorder topics/headings)
  - Return to Step 2.3 summary for adjustments
  - Send for review → marks as **Completed**
- **Prerequisite for next:** Index must be Completed before accessing Topics
- **Output:** Topics become available (initially Pending state)

#### Sub-step 2.5: Author Creates Topic Content (Canvas Tema 1 - NEW)

**Part 1: Topic Didactic Instructions Setup**
- **Input:** Author provides topic-specific context:
  - AI focus input (conversational)
  - Topic bibliography
  - Reference files
  - Pedagogical notes & instructions
- **AI generates:** Topic summary based on instructions
- **If generation > 5 seconds:** Chain of thought visualization
- **Output:** Topic 1 Summary generated

**Part 2: Topic Summary Review**
- **Input:** AI-generated topic summary (introduction, objectives, conceptual development with didactic ideas)
- **Author actions:**
  - Review and approve
  - Edit summary inline
  - Modify instructions and regenerate
  - Or proceed to full content generation
- **Output:** Ready for content generation

#### Sub-step 2.6: Author Edits Generated Content (Canvas Tema 1 - Content - NEW)
- **Input:** AI generates full written content for topic based on summary
- **Author actions:**
  - Edit content using existing tools (blocks, toolbar, AI assistant)
  - Use AI helpers (Expand, Summarize, Improve, etc.)
  - Can return to Topic Instructions to modify approach and regenerate
- **Output:** Content ready for review

#### Sub-step 2.7: Author Sends for Coordinator Review (Canvas Tema 1 - NEW)
- **Author action:** Clicks [Send for review]
- **Illustration behavior:** Content appears as **Approved** (in prototype, for flow demonstration)
- **Real system behavior:** Coordinator reviews, approves or requests corrections
- **Result:** Topic content locked for further editing (in real system)
- **Prerequisite for A Fondo:** Topic must be Approved before accessing In-depth resources

#### Sub-step 2.8: Coordinator Reviews & Approves (Coordinator role - existing)
- `editable=false` in Canvas
- Reviews Author's edits
- Can give feedback via comments
- Approves or requests corrections
- **In prototype:** Auto-approves for illustration purposes

**Workflow Summary:**
```
Step 2.1 (Metadata) 
  ↓ [Next]
Step 2.2 (Descriptor)
  ↓ [Generate Summary]
Step 2.3 (Summary)
  ↓ [Generate Index]
Canvas Índice (Complete → Topics unlock)
  ↓
Canvas Tema 1 Instructions (Setup → Summary generated)
  ↓
Canvas Tema 1 Instructions (Review summary)
  ↓ [Generate Content]
Canvas Tema 1 Content (Edit with tools)
  ↓ [Send for review]
Coordinator Review (Approve/Request corrections)
  ↓ [Approved]
A Fondo (In-depth resources unlocked)
```


---

### Step 3 — Enrichment with Didactic Experiences (AGC Canvas) ⭐ INSTRUCTIONAL DESIGNER ROLE

**Prerequisite:** Content is already approved by coordinator

**Instructional Designer workflow in Canvas:**

- **Access:** Sees approved academic content (read-only, `readMode=true`)
- **Cannot edit:** Academic content is locked — read-only mode
- **Can create:** Parallel enrichment content:
  - Self-study tests
  - Mind maps
  - Summary podcasts
  - Interactive exercises
  
- **Storage:** Enrichments are ADDITIVE
  - NOT stored in academic content
  - Stored as "dynamic layer" linked to official version
  - Never modify official academic version
  
- **Toolbar:** Special "Didactic Experience Generator" (different from academic toolbar)
- **Action bar:** Preview, Save enrichment, Publish experience

---

## AGC Canvas Screen Requirements

### What Matters from Ecosistema PROEDUCA

**Canvas must show:**
1. **3-column layout**
   - Left: Pipeline sidebar (hierarchical by topic, with states)
   - Center: Content blocks (AI-generated, editable by Author)
   - Right: AI Panel (conversational chat contextual to current topic), notes and comments

2. **Per-topic independent workflows**
   - Each topic has its own cycle: Instructions → Summary → Content → Resources → Tests → etc.
   - Topics progress in parallel (not blocked by each other)
   - Contextual states per topic/block (not global)

3. **Role-based interface reconfiguration**
   - Author: `editable=true`, full toolbar, can send for review
   - Coordinator: `editable=false`, can comment, can approve
   - Instructional Designer: `readMode=true`, special enrichment toolbar
   - Each role sees same content but with different capabilities

4. **Clear state visibility**
   - States: Pending / Locked / Draft / Review / With comments / Completed / Approved / Published
   - Dependencies: each stage unlocks with approval
   - Always visible indicator of whose turn it is
   - Section states show in Pipeline sidebar

### New Canvas Sections (Author Workflow)

**Índice (Index)**
- AI proposes structure: topics, headings, order
- Author can modify/reorder freely
- State: Generado → Completado (when sent for review)
- Once Completed, Topics unlock

**Tema N - Indicaciones Didácticas (Topic N Instructions)**
- Part 1: Setup area (Author provides focus, bibliography, files, pedagog ical notes)
- AI generates: Topic summary based on instructions
- Part 2: Review generated summary, can modify or regenerate
- State: Pendiente → Generado → En edición → Completado

**Tema N - Contenido (Topic N Content)**
- AI generates full written content based on Topic summary
- Author edits using existing tools
- State: Generado → En edición → Aprobado (when sent for review)
- Once Approved, A Fondo unlocks

**A Fondo (In-depth Resources)**
- Existing functionality maintained
- **NEW:** Category labels per reference (Casos reales, Ampliaciones, Tendencias, Lecturas)
- State: Generado → En edición → Aprobado

---

## AGC Dashboard Screen Requirements

### What Matters from Ecosistema PROEDUCA

**Dashboard must show:**

1. **Workspace 3-column layout**
   - Left (240px): Degrees sidebar (navigable, filters table)
   - Center (flexible): Subjects table (main workspace, clickable → Canvas)
   - Right (280px): "My pending" (tasks with severity, clickable → Canvas at specific section) this is just for the coordinathor

2. **Chatbar** (conversational input)
   - `/generate-subject` shortcut support
   - Dual input: traditional buttons OR conversational commands
   - Both lead to same subject creation flow

3. **Content Quality section**
   - 4 indicator cards above table
   - Normative alerts, Deep review, ISE average, Critical status
   - Cards are clickable → filter table by criterion

4. **Role-based data filtering**
   - Each role sees different subjects/pending items
   - Data reconfigures on role change
   - Same interface, different visibility rules

---

## Step 2 Canvas Workflow — Detailed Requirements

### Author Role
- **Input:** AI-generated content blocks (from Step 2.1)
- **Actions:**
  - Edit block content (change text, structure)
  - Change block type (formatting)
  - Add comments with severity tags
  - Send for review when satisfied
- **Output:** Modified content ready for Coordinator review

### Coordinator Role  
- **Input:** Author-edited content blocks
- **Actions:**
  - Review changes
  - Add feedback comments
  - Request corrections OR Approve
  - If corrections needed: send back to Author (loops)
  - If approved: content passes to CMS (Step 3-4)
- **Output:** Approved content → CMS Ibexa

### No direct Editor or Instructional Designer role in Step 2
- Step 2 is Author + Coordinator only
- Editor and Instructional Designer appear in Step 3-4 and Step 5

---

## Step 5 Canvas Workflow — Detailed Requirements

### Instructional Designer Role
- **Input:** Approved academic content from CMS (version v3, etc.)
- **Access mode:** `readMode=true` (content is read-only)
- **Actions:**
  - View approved topic content (locked, cannot edit)
  - Select topic/block for enrichment
  - Generate enrichments (tests, mind maps, podcasts, summaries)
  - Edit enrichment previews
  - Save and publish enrichments
- **Output:** Dynamic layer of enrichments (linked to official version, not stored in academic content)

### Key constraints:
- **READ-ONLY:** Cannot modify academic content under any circumstances
- **ADDITIVE:** Enrichments never replace or alter academic blocks
- **SEPARABLE:** Enrichments can be turned on/off in LMS without affecting academic content
- **SPECIAL TOOLBAR:** Different toolbar than academic editing toolbar

---

## Canvas Data Model Impact

### Per-topic structure (each Topic N contains):
```
Topic N
  ├── Didactic instructions
  │   └── state: editing/review/approved
  │   └── editable by: Author
  │   └── approvable by: Coordinator
  │
  ├── Course content (Temario)
  │   └── AI-generated when Instructions approved
  │   └── state: editing/review/approved
  │   └── editable by: Author
  │   └── approvable by: Coordinator
  │
  ├── In-depth resources
  │   └── state: locked until Content approved
  │   └── editable by: Author
  │
  ├── Tests
  │   └── state: locked until Resources approved
  │   └── editable by: Author
  │
  └── Enrichments (Step 5)
      └── created by: Instructional Designer
      └── based on: approved academic content (read-only)
      └── stored separately: dynamic layer
      └── never modifies academic content
```

### Role-block interaction matrix:

| Block | Author | Coordinator | Editor | Instructional Designer |
|-------|--------|-------------|--------|----------------------|
| Instructions | Edit | Approve | Comment | View only |
| Content | Edit | Approve | Comment | View only |
| Resources | Edit | Approve | Comment | View only |
| Tests | Edit | Approve | Comment | View only |
| **Enrichments** | — | — | — | **Create & Edit** |

---

## UI Component Behavior by Role

### Author in Canvas
- Toolbar width: 220px (full)
- Sections: AI Assistant + Interaction + Format
- Can: Edit, format, request review
- Cannot: Approve, publish

### Coordinator in Canvas
- Toolbar width: 180px (reduced)
- Sections: Interaction only (no AI, no format)
- Can: Comment, approve, request corrections
- Cannot: Edit content, format

### Editor in Canvas
- Toolbar width: 180px (reduced)
- Sections: Interaction only
- Can: Comment, suggest
- Cannot: Edit, approve

### Instructional Designer in Canvas (Step 5 only)
- Toolbar: Special "Didactic Experience Generator"
- Can: Create enrichments, edit enrichments, publish experiences
- Cannot: Edit academic content (view-only)
- Mode: `readMode=true` for academic content

---

## Summary of Canvas vs Dashboard Changes

### Canvas Screen (existing, needs enhancements)
- Implement AI-generates-first workflow (Step 2)
- Add per-topic independent states (not global)
- Add role-specific toolbars (Author full, Coordinator reduced, others minimal)
- Add enrichment mode for Instructional Designer (Step 5)
- Maintain all existing comment, tag, notification systems

### Dashboard Screen (existing, redesign)
- Add 3-column workspace layout
- Add Chatbar with `/` shortcuts (conversational dual input)
- Add "Content Quality" indicator cards
- Add "My pending" right panel
- Add topic/role-based filtering
- Maintain all existing role-based data logic

---

## Flow Summary (AGC Prototype Scope)

```
[Step 1: AGeA] — Commission created, workspace enabled
       ↓ (out of scope)
[Step 2: AGC Canvas] — AI generates → Author edits → Coordinator approves
       ↓ (out of scope)
[Step 3-4: CMS] — Editorial review, content published officially
       ↓ (out of scope)
[Step 5: AGC Canvas] — Instructional Designer adds enrichments (read-only academic content)
       ↓
[Step 6+: Publish & LMS] — Content + enrichments delivered to students (out of scope)
```

**AGC Prototype handles:**
- ✅ Step 2 (AI generates → Author edits → Coordinator approves)
- ✅ Step 5 (Instructional Designer enriches)
- ❌ Step 1, 3-4, 6+ (outside prototype scope)

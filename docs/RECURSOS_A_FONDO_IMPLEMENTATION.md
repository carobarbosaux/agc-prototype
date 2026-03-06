# Recursos a Fondo Feature Implementation
## AI-Generated Academic References System

---

## Claude Code Prompt

### Copy this entire prompt into Claude Code in Cursor:

```
You are building the "Recursos a Fondo" feature for AGC 2.0 Canvas.

FEATURE OVERVIEW:
- Section where AI generates 10 academic references (URL/DOI) to enhance learning
- Author can ask AI to regenerate with specific criteria (via contextual chatbar)
- References include: title, author, short description, and URL
- Three distinct screens to implement

REQUIREMENTS:

1) SCREEN 1: AI GENERATION IN PROGRESS
   - Show "Chain of thought" process (step-by-step AI reasoning)
   - Loading state with animated progress
   - Show what AI is considering (searching databases, filtering, ranking)
   - Estimated time to completion
   - "Cancel" button to stop generation
   - Display: Currently analyzing [topic], Found [X] candidates, Ranking by relevance...

2) SCREEN 2: RECURSOS DISPLAY (10 REFERENCES)
   - Grid or list layout showing 10 academic references
   - Each reference card contains:
     * Reference number (1-10)
     * Title (clickable → opens URL in new tab)
     * Author(s)
     * Short description (150-200 chars)
     * URL/DOI (clickable link)
     * Relevance badge (High/Medium/Low)
     * Edit/Delete icons (Author can remove unwanted references)
   - Action buttons:
     * "Regenerate All" (replace all 10)
     * "Add More References" (generate additional 5-10)
     * "Ask AI for Specific Criteria" (open contextual chatbar)
     * "Save to Canvas" (finalize and save)
   - Empty state: Show placeholder if generation failed

3) SCREEN 3: CONTEXTUAL CHATBAR FOR REFINEMENT
   - Appears below the 10 references
   - Author can request:
     * "Only Spanish language sources"
     * "Regenerate, focus on 2020-2025"
     * "Add more on machine learning ethics"
     * "Prefer peer-reviewed journals"
     * "Include video resources"
   - Chat-style interaction with AI
   - Suggestions dropdown with common refinement requests
   - AI responds: explains what will change, shows new references
   - Ability to accept/reject regenerated results

DESIGN SPECIFICATIONS:
- Use Tailwind CSS v4 (utility classes only, no custom CSS)
- lucide-react icons: BookOpen, Link, Trash2, RefreshCw, MessageSquare, Loader, ChevronRight
- Colors: Use existing color palette from AGC (indigo, green, orange, etc.)
- Responsive: Works on desktop (main focus)
- Animations: Smooth fade-in for references, loading spinner for generation

COMPONENT STRUCTURE:
- `RecursosAFondoSection.jsx` (main container, holds all states)
- `RecursosGenerationLoading.jsx` (Screen 1: loading/chain of thought)
- `RecursosReferencesList.jsx` (Screen 2: 10 references display)
- `RecursosReferenceCard.jsx` (individual reference card)
- `RecursosRefinementChatbar.jsx` (Screen 3: contextual chat)
- State management: React useState for current references, generation status, chat history

DATA STRUCTURE:
Each reference object:
{
  id: 1,
  title: "Title of the academic paper",
  authors: ["Author 1", "Author 2"],
  description: "Short description of the content...",
  url: "https://doi.org/10.xxxxx",
  relevance: "high" | "medium" | "low",
  source: "journal" | "book" | "conference" | "article",
  year: 2024,
  language: "en" | "es"
}

WORKFLOW:
1. When user scrolls to "Recursos a Fondo" section → Show loading state (Screen 1)
2. AI generates 10 references (simulated with mockData pool)
3. Display references (Screen 2)
4. Author can interact with chatbar (Screen 3)
   - Type refinement request
   - AI regenerates specific references
   - Author accepts/rejects changes
5. Author clicks "Save to Canvas" → finalizes section

MOCKDATA NEEDED:
- recursosChainingThoughts: Array of thought steps for loading screen
- recursosReferencesPool: 50+ pre-generated references (various topics)
- recursosRefinementSuggestions: Common refinement requests

BUILD PRIORITY:
1. Start with Screen 2 (static references display)
2. Then Screen 1 (loading animation)
3. Then Screen 3 (chatbar refinement)
4. Add state management to switch between screens
5. Connect to mockData for simulated generation

NO breaking changes to existing Canvas. This is ADDITIVE to the "Recursos a fondo" block.
Maintain all existing Canvas functionality (comments, approvals, etc.).
```

---

## ASCII Wireframes

### SCREEN 1: AI Generation in Progress (Chain of Thought)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                     RECURSOS A FONDO                                        │
│              Searching for academic references...                           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🔄 GENERATING ACADEMIC REFERENCES                                  │   │
│  │  Step 1/4: Analyzing topic context...                             │   │
│  │  ════════════════════════════════   [40%]                         │   │
│  │                                                                     │   │
│  │  ✅ Identified key concepts: Machine Learning, AI Ethics         │   │
│  │  ⏳ Searching academic databases...                               │   │
│  │  • PubMed: 245 results found                                      │   │
│  │  • IEEE Xplore: 189 results found                                 │   │
│  │  • JSTOR: 567 results found                                       │   │
│  │                                                                     │   │
│  │  ⏳ Step 2/4: Filtering by relevance...                           │   │
│  │  Applying filters:                                                 │   │
│  │    • Published 2020-2025: 834 results                             │   │
│  │    • Peer-reviewed journals: 567 results                          │   │
│  │    • Language: English/Spanish: 512 results                       │   │
│  │                                                                     │   │
│  │  ⏳ Step 3/4: Ranking by topic relevance...                       │   │
│  │  Computing relevance scores...                                     │   │
│  │                                                                     │   │
│  │  ⏳ Step 4/4: Finalizing top 10 references...                     │   │
│  │                                                                     │   │
│  │  Estimated time remaining: 2 seconds...                           │   │
│  │                                                                     │   │
│  │  [Cancel Generation]                                              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### SCREEN 2: Recursos Display (10 References)

#### Full View:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                     RECURSOS A FONDO                                        │
│         Add 2 to 10 external bibliographic references for students         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Reference 1                                                        ✏️ │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  🗑️  │
│  │  │ Title: Machine Learning Ethics: A Comprehensive Review      │     │  │
│  │  │                                                              │     │  │
│  │  │ Authors: Smith, J., Johnson, M., Williams, K.              │     │  │
│  │  │                                                              │     │  │
│  │  │ Description: Comprehensive analysis of ethical             │     │  │
│  │  │ considerations in machine learning systems. Covers bias,    │     │  │
│  │  │ fairness, transparency, and accountability...              │     │  │
│  │  │                                                              │     │  │
│  │  │ URL: https://doi.org/10.1038/nature.12345                 │     │  │
│  │  │ Relevance: 🔴 HIGH                                          │     │  │
│  │  └──────────────────────────────────────────────────────────────┘     │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Reference 2                                                        ✏️ │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  🗑️  │
│  │  │ Title: Fairness in Algorithmic Decision Making             │     │  │
│  │  │                                                              │     │  │
│  │  │ Authors: Chen, L., Patel, R., Kim, S.                      │     │  │
│  │  │                                                              │     │  │
│  │  │ Description: Explores algorithms and methods to ensure      │     │  │
│  │  │ fairness in ML systems. Practical frameworks for           │     │  │
│  │  │ implementing bias mitigation...                            │     │  │
│  │  │                                                              │     │  │
│  │  │ URL: https://doi.org/10.1109/TNN.2024.5678                │     │  │
│  │  │ Relevance: 🟡 MEDIUM                                        │     │  │
│  │  └──────────────────────────────────────────────────────────────┘     │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Reference 3                                                        ✏️ │  │
│  │  [Similar card structure...]                                       🗑️  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  [Reference 4-10 cards with same structure...]                             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [🔄 Regenerate All] [➕ Add More References] [💬 Ask AI for Criteria]     │
│  [Save to Canvas]                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Compact Reference Card (Alternative):
```
┌─ Ref 1 ──────────────────────────────────────────────────────────────┐
│ Title: Machine Learning Ethics: A Comprehensive Review            ✏️ 🗑️│
│ Authors: Smith, J., Johnson, M., Williams, K.                       │
│ Description: Comprehensive analysis of ethical considerations...    │
│ 🔗 https://doi.org/10.1038/nature.12345    HIGH                     │
└──────────────────────────────────────────────────────────────────────┘
```

---

### SCREEN 3: Contextual Chatbar for Refinement

#### Layout:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                     RECURSOS A FONDO                                        │
│         [10 references displayed as in Screen 2]                           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  REFINE RESOURCES WITH AI                                                  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ 💬 Ask AI to modify these references...                            │  │
│  │                                                                     │  │
│  │ Quick suggestions:                                                 │  │
│  │ [Spanish language only] [2023-2025 only] [Video resources]        │  │
│  │ [Peer-reviewed journals] [Books only] [Add more on ethics]         │  │
│  │                                                                     │  │
│  │ ┌────────────────────────────────────────────────────────────┐   │  │
│  │ │ I want only Spanish language sources...                   │   │  │
│  │ └────────────────────────────────────────────────────────────┘   │  │
│  │                                               [Send] [Clear]       │  │
│  │                                                                     │  │
│  │ ──────────────────────────────────────────────────────────────    │  │
│  │                                                                     │  │
│  │ 🤖 AI Response:                                                    │  │
│  │ "I'll regenerate references focusing on Spanish-language          │  │
│  │  academic sources. This will filter out English-only content      │  │
│  │  and prioritize Spanish journals and publications.                │  │
│  │                                                                     │  │
│  │  Changes:                                                          │  │
│  │  • Ref 2: Replaced with Spanish ethics journal                   │  │
│  │  • Ref 5: Replaced with UNAM AI study                            │  │
│  │  • Ref 8: Replaced with Valencia University paper               │  │
│  │                                                                     │  │
│  │  [Accept Changes] [Try Again] [Cancel]                            │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Chat History Interaction:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  REFINE RESOURCES WITH AI                                                  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  Author: "Only Spanish language sources"                          │  │
│  │  [3 seconds ago] ✏️ Delete                                         │  │
│  │                                                                     │  │
│  │  🤖 AI: "Regenerating with Spanish-language filter applied."     │  │
│  │  [Updated 2 references: Ref 2, Ref 5, Ref 8]                     │  │
│  │  [Accept] [Try Again] [Show Changes]                             │  │
│  │                                                                     │  │
│  │  ───────────────────────────────────────────────────────────────  │  │
│  │                                                                     │  │
│  │  Author: "Can you add more on machine learning ethics?"           │  │
│  │  [2 seconds ago] ✏️ Delete                                         │  │
│  │                                                                     │  │
│  │  🤖 AI: "Will increase focus on ethics content and reduce         │  │
│  │  general ML theory. This affects 5 of the 10 references."         │  │
│  │  [Regenerating...]                                                │  │
│  │                                                                     │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │ "Prefer peer-reviewed journals only"                      │  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  │                                                 [Send] [Clear]     │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### STATE DIAGRAM (Screen Flow)

```
                    ┌──────────────────────┐
                    │   CANVAS LOADED      │
                    │ (User views section) │
                    └──────────────────────┘
                              │
                              ▼
                    ┌──────────────────────┐
        ┌──────────▶│  SCREEN 1: LOADING   │◀────────┐
        │           │ (Chain of thought)   │         │
        │           └──────────────────────┘         │
        │                    │                        │
        │           (Generation completes)            │
        │                    ▼                        │
        │           ┌──────────────────────┐         │
        │           │  SCREEN 2: DISPLAY   │         │
        │           │  (10 references)     │         │
        │           └──────────────────────┘         │
        │                    │                        │
        │        ┌───────────┼──────────┐            │
        │        │           │          │            │
        │        ▼           ▼          ▼            │
        │   [Regenerate] [Add More] [Ask AI]        │
        │        │           │          │            │
        │        └───────────┼──────────┘            │
        │                    │                        │
        │                    ▼                        │
        │           ┌──────────────────────┐         │
        │           │  SCREEN 3: CHATBAR   │         │
        │           │  (Refinement chat)   │         │
        │           └──────────────────────┘         │
        │                    │                        │
        │        ┌───────────┼──────────┐            │
        │        │           │          │            │
        │        ▼           ▼          ▼            │
        │    [Accept]  [Try Again]  [Cancel]        │
        │        │           │          │            │
        │        └───────────┼──────────┘            │
        │                    │                        │
        │          (if "Cancel" → back to Screen 2)  │
        └────────────────────┘ (if "Try Again" → Screen 1 again)
                    │
                    │ (if "Accept" or "Save")
                    ▼
          ┌──────────────────────┐
          │  RESOURCES FINALIZED │
          │  (Saved to Canvas)   │
          └──────────────────────┘
```

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Create `RecursosAFondoSection.jsx` (main container)
- [ ] Create `RecursosReferenceCard.jsx` (individual reference display)
- [ ] Add mock data: `recursosReferencesPool` (50+ references)
- [ ] Create `RecursosReferencesList.jsx` (Grid/List of 10 references)

### Phase 2: Loading State
- [ ] Create `RecursosGenerationLoading.jsx` (Chain of thought animation)
- [ ] Add mock data: `recursosChainingThoughts` (thought steps)
- [ ] Implement loading animation sequence
- [ ] Add progress bar and estimated time

### Phase 3: Refinement Chat
- [ ] Create `RecursosRefinementChatbar.jsx` (Chat interface)
- [ ] Add mock data: `recursosRefinementSuggestions` (common requests)
- [ ] Implement chat message history
- [ ] Add suggestions dropdown

### Phase 4: State Management & Integration
- [ ] Connect screens with useState (loading → display → refine)
- [ ] Implement "Regenerate All" action
- [ ] Implement "Add More References" action
- [ ] Implement "Ask AI" action
- [ ] Add "Save to Canvas" button
- [ ] Ensure no breaking changes to existing Canvas

---

## Key Features

✅ **Chain of thought visualization** — Users see AI's reasoning process
✅ **10 academic references** — Pre-curated from mock pool
✅ **Reference metadata** — Title, authors, description, URL, relevance
✅ **Edit/Delete per reference** — Author can remove unwanted refs
✅ **Contextual refinement** — Ask AI for specific criteria
✅ **Smart suggestions** — Quick-click refinement options
✅ **Accept/Reject changes** — Author controls final output
✅ **Responsive design** — Works across screen sizes
✅ **Smooth animations** — Professional loading and transitions

---

## mockData Structure Example

```javascript
// Thought steps for loading screen
export const recursosChainingThoughts = [
  "Analyzing topic: Machine Learning Ethics",
  "Identified key concepts: fairness, bias, transparency, accountability",
  "Searching academic databases...",
  "PubMed: 245 results | IEEE Xplore: 189 results | JSTOR: 567 results",
  "Filtering by: peer-reviewed, 2020-2025, English/Spanish",
  "Candidates after filtering: 834 results",
  "Computing relevance scores...",
  "Ranking by topic alignment...",
  "Finalizing top 10 references..."
]

// References pool (sample)
export const recursosReferencesPool = [
  {
    id: 1,
    title: "Machine Learning Ethics: A Comprehensive Review",
    authors: ["Smith, J.", "Johnson, M.", "Williams, K."],
    description: "Comprehensive analysis of ethical considerations...",
    url: "https://doi.org/10.1038/nature.12345",
    relevance: "high",
    source: "journal",
    year: 2024,
    language: "en"
  },
  // ... 49 more references
]

// Refinement suggestions
export const recursosRefinementSuggestions = [
  "Spanish language only",
  "2023-2025 only",
  "Peer-reviewed journals",
  "Video resources",
  "Books and monographs",
  "Add more on [topic]",
  "Include case studies"
]
```

---

## Notes for Developer

- Use lucide-react icons: `BookOpen`, `Link`, `Trash2`, `RefreshCw`, `MessageSquare`, `Loader`, `ChevronRight`
- Color palette: Use existing AGC colors (indigo for actions, green for success, red for delete)
- Keep all state local to `RecursosAFondoSection.jsx`
- Simulated generation takes 2-4 seconds (setTimeout in mockData)
- Chat responses are simulated (not real API calls)
- References are editable inline (click edit icon to modify URL/title)
- All changes stay in Canvas until "Save to Canvas" is clicked

---

## Testing Scenarios

1. **Happy path:** User views section → sees loading → references appear → saves
2. **Refinement:** User asks for Spanish sources → AI regenerates → accepts changes
3. **Multiple refinements:** User chains requests (Spanish + ethics + 2024) → each refines
4. **Deletion:** User removes unwanted reference → regenerates → adds another
5. **Cancellation:** User cancels generation → reverts to previous state


# Coordinator Tracking Dashboard
## Content Obsolescence, Versioning & Alarms

---

## Overview

The **Coordinator Tracking Dashboard** is a secondary dashboard exclusively for the Coordinator role. It provides a macro view of content health across all subjects and degrees, enabling proactive maintenance and obsolescence management.

**Coordinator role selector:** When role = "coordinator", users can toggle between:
1. **Main Dashboard** (daily work: pending approvals, task management)
2. **Tracking Dashboard** (strategic monitoring: obsolescence, versioning, alarms)

---

## Dashboard Purpose

| Aspect | Purpose |
|--------|---------|
| **Obsolescence management** | Detect content that is becoming outdated based on theoretical cycles |
| **Version control** | Track version history and branching by filial/institution |
| **Alarm system** | Alert Coordinator to content requiring review or update |
| **Strategic view** | Macro perspective across all degrees, subjects, topics |
| **Proactive maintenance** | Schedule updates before content becomes critically outdated |

---

## Data Structure

### Content Structural Block (Fundamental for all subjects)

Each subject in the system has these core metadata:

```javascript
{
  id: "fund-ml",
  name: "Fundamentals of Machine Learning",
  degree: "Master AI",
  
  // Structural metadata
  lastVersionDate: "2025-09-15",           // Date of last official version in CMS
  subjectType: "technical",                // "regulated" | "technical" | "transversal"
  theoreticalObsolescenceCycle: 5,         // Years: 3 | 5 | 7
  accumulatedVersions: 4,                  // Total version count
  
  // Filial tracking
  filialVersions: {
    "unir-main": { version: "v4.2", date: "2025-09-15", status: "published" },
    "unir-latam": { version: "v4.1", date: "2025-08-20", status: "published" },
    "unir-asia": { version: "v3.9", date: "2025-05-10", status: pending" }
  },
  
  // Calculated obsolescence
  daysOldest: 210,                         // Days since last update
  obsolescenceDaysThreshold: 1825,         // 5 years * 365 days
  obsolescencePercentage: 11.5,            // (210 / 1825) * 100
  
  // Alarm flags
  alarms: [
    { type: "approaching-obsolescence", severity: "warning", daysRemaining: 1615 },
    { type: "version-mismatch", severity: "info", branches: ["unir-asia"] },
    { type: "critical-outdated", severity: "critical", daysOverdue: 0 }
  ]
}
```

---

## Dashboard Sections

### 1. Filter Bar (Top)

**Filters:**
- **Degree:** Dropdown (All | Master AI | MBA | etc.)
- **Subject type:** Multi-select (Regulated, Technical, Transversal)
- **Obsolescence status:** Multi-select (Green/Healthy, Yellow/Approaching, Red/Critical, Overdue)
- **Filials:** Multi-select (UNIR Main, LATAM, Asia, etc.)
- **Sort by:** Dropdown (Last updated date | Obsolescence % | Version count | Alarm count)

---

### 2. Obsolescence Gauge (KPI Cards)

Four primary indicators with visual representation:

#### Card 1: Content Healthy
- **Metric:** Number of subjects within 60% of their obsolescence cycle
- **Color:** 🟢 Green
- **Example:** "47 subjects" (out of 80 total)
- **Click action:** Filter table to show only healthy subjects

#### Card 2: Approaching Obsolescence
- **Metric:** Number of subjects at 60-90% of their obsolescence cycle
- **Color:** 🟡 Yellow
- **Example:** "18 subjects"
- **Alert:** "Review recommended within 3-6 months"
- **Click action:** Filter table to show approaching subjects

#### Card 3: Critical Obsolescence
- **Metric:** Number of subjects at 90%+ of their obsolescence cycle
- **Color:** 🔴 Red
- **Example:** "12 subjects"
- **Alert:** "URGENT: Review required. Content may be outdated."
- **Click action:** Filter table to show critical subjects

#### Card 4: Overdue/Expired
- **Metric:** Number of subjects past their obsolescence cycle (>100%)
- **Color:** 🔴 Red + Icon ⚠️
- **Example:** "3 subjects"
- **Alert:** "CRITICAL: Content is expired. Update immediately."
- **Click action:** Filter table to show expired subjects, sort by days overdue DESC

---

### 3. Main Tracking Table

**Columns:**

| Column | Width | Content | Sortable | Clickable |
|--------|-------|---------|----------|-----------|
| Degree | 120px | Name of degree (Master AI, etc.) | Yes | No |
| Subject | 200px | Subject name (truncated) | Yes | Yes → Canvas |
| Last Updated | 120px | Date (2025-09-15) | Yes DESC | No |
| Days Old | 100px | Numeric (210 days) | Yes | No |
| Subject Type | 110px | technical / regulated / transversal | Yes | No |
| Obsolescence Cycle | 130px | "5 years" | Yes | No |
| Obsolescence % | 120px | Progress bar + number (11.5%) | Yes DESC | No |
| Versions | 80px | Count (v4.2 current, 4 total) | Yes | No |
| Filials | 140px | Branch pills (3 filials, expand) | No | Yes → Details |
| Status | 100px | 🟢 Green / 🟡 Yellow / 🔴 Red | Yes | No |
| Alarms | 100px | Count + severity icons | Yes | Yes → Details |
| Actions | 120px | Buttons: Review / Schedule Update / View History | No | Yes |

---

### 4. Obsolescence Status Legend (Below table)

**Visual reference for progress bars:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% (Expiration date)
                    ↑
                Now (11.5%)
                    
0%────────────────60%────────────90%────────────100%
🟢 Healthy    🟡 Approach    🔴 Critical    ⚠️ Overdue
(0-60%)       (60-90%)       (90-100%)      (>100%)
```

---

## Row Detail Panel

**Click on any table row** → Side panel opens with full details:

### Header
- Subject name (large)
- Degree
- Last updated date
- Current version (v4.2)

### Structural Information Block
```
┌─ STRUCTURAL INFORMATION ─────────────────┐
│ Last version date:        2025-09-15     │
│ Subject type:             Technical      │
│ Obsol. cycle:             5 years        │
│ Total versions:           4              │
│ Days since update:        210 days       │
└────────────────────────────────────────┘
```

### Obsolescence Status Block
```
┌─ OBSOLESCENCE STATUS ────────────────────┐
│ Status:                   🟡 Approaching │
│ Threshold:                1825 days      │
│ Current age:              210 days       │
│ Progress:                 11.5%          │
│ Days remaining:           1615 days      │
│ Review recommended:       Within 3-6 mo. │
└────────────────────────────────────────┘
```

### Filial Versioning Block
```
┌─ FILIAL VERSIONS ────────────────────────┐
│ UNIR Main                                 │
│   Version: v4.2                           │
│   Date: 2025-09-15                        │
│   Status: Published                       │
│                                           │
│ UNIR LATAM                                │
│   Version: v4.1                           │
│   Date: 2025-08-20                        │
│   Status: Published                       │
│   ⚠️ Behind main branch by 1 version      │
│                                           │
│ UNIR Asia                                 │
│   Version: v3.9                           │
│   Date: 2025-05-10                        │
│   Status: Pending publication             │
│   ⚠️ CRITICAL: 2 versions behind          │
└────────────────────────────────────────┘
```

### Alarms Block
```
┌─ ALARMS & RECOMMENDATIONS ───────────────┐
│ ⚠️ [Warning] Version mismatch detected    │
│     Asia filial is 2 versions behind      │
│     Action: Sync versions                 │
│                                           │
│ 📋 [Info] Approaching obsolescence        │
│     Review recommended within 3-6 months  │
│     Action: Schedule update               │
│                                           │
│ [Links]                                   │
│ → View version history                    │
│ → Compare versions                        │
│ → Schedule update review                  │
│ → View in Canvas (edit)                   │
└────────────────────────────────────────┘
```

---

## Alarms System

### Alarm Types

| Alarm Type | Severity | Trigger Condition | Action |
|------------|----------|-------------------|--------|
| **Version Mismatch** | 🟠 Info | Filials have different versions | Coordinator decides: sync or accept divergence |
| **Approaching Obsolescence** | 🟡 Warning | Content at 60-90% of cycle | Schedule review within 3-6 months |
| **Critical Obsolescence** | 🔴 Critical | Content at 90%+ of cycle | Urgent review needed immediately |
| **Expired Content** | 🔴 Critical | Content past obsolescence cycle | STOP using, schedule update now |
| **Filial Behind** | 🟡 Warning | Filial version lag ≥ 2 versions | Sync versioning across branches |
| **Pending Update** | 🔵 Info | Update in review waiting approval | Check Canvas for status |

---

## Action Buttons (Per Row)

### Button 1: Review Content
- Opens Canvas for the subject
- Coordinator can view current version
- Can add comments, suggest updates
- Routes to: Canvas (read-only or comment-mode for Coordinator)

### Button 2: Schedule Update Review
- Opens modal to create a scheduled review task
- Coordinator selects:
  - Review date
  - Assigned reviewer (specialist)
  - Scope (which topics, which filials)
  - Priority level
- Task appears in "My pending" on main dashboard

### Button 3: View Version History
- Side panel shows timeline:
  ```
  v4.2 ───→ 2025-09-15 (published)
  v4.1 ───→ 2025-08-20 (published)
  v4.0 ───→ 2025-06-01 (published)
  v3.9 ───→ 2025-05-10 (archived)
  ```
- Can compare versions
- Can rollback (if permissions allow)

### Button 4: Filial Sync Actions
- Shows which filials are out of sync
- Options:
  - Publish latest version to lagging filials
  - Create synchronization task
  - View filial-specific differences

---

## Data Sources & Calculations

### Automatic Calculations

**Obsolescence Percentage:**
```
% = (Days since last update / Theoretical obsolescence cycle in days) × 100

Example:
Days old: 210
Cycle: 5 years = 1825 days
% = (210 / 1825) × 100 = 11.5%
```

**Status Color:**
```
IF % ≤ 60% → 🟢 Green (Healthy)
ELSE IF % ≤ 90% → 🟡 Yellow (Approaching)
ELSE IF % ≤ 100% → 🔴 Red (Critical)
ELSE IF % > 100% → 🔴 Red + ⚠️ (Overdue/Expired)
```

**Days Remaining:**
```
Days remaining = (Cycle in days) - (Days since update)

Example:
Remaining = 1825 - 210 = 1615 days (≈ 4.4 years)
```

---

## Coordinator Workflow

### Scenario 1: Proactive Update Planning
```
1. Coordinator opens Tracking Dashboard
2. Filters by "Yellow" (Approaching Obsolescence)
3. Reviews "Machine Learning Basics" (210 days old, 11.5%, 5-year cycle)
4. Sees: "Review recommended within 3-6 months"
5. Clicks "Schedule Update Review"
6. Creates task: "ML Basics Q4 2025 curriculum review"
7. Task assigned to AI Specialist
8. Appears in their "My pending" on main dashboard
```

### Scenario 2: Responding to Critical Alert
```
1. Coordinator sees red card: "3 subjects expired"
2. Clicks card → table filtered to overdue content
3. Sees: "Deep Learning Advanced" (890 days old, 127%, 7-year cycle)
4. Opens detail panel → "CRITICAL: Content is expired"
5. Clicks "Review Content" → opens Canvas
6. Sees outdated content (references 2023 models)
7. Clicks "Schedule Update Review" → high priority
8. Content flagged for immediate specialist review
```

### Scenario 3: Managing Filial Versions
```
1. Coordinator sees "Version Mismatch" warning on ML Basics
2. Detail panel shows:
   - UNIR Main: v4.2 (published)
   - LATAM: v4.1 (published) — 1 version behind
   - Asia: v3.9 (pending) — 2 versions behind + NOT published
3. Clicks "Filial Sync Actions"
4. Options:
   - Publish v4.2 to LATAM (sync)
   - Publish v4.2 to Asia (sync)
   - Create "Version alignment task"
5. Coordinator chooses: auto-sync to all filials
6. Task created, confirmation shown
```

---

## Integration with Main Dashboard

| Feature | Main Dashboard | Tracking Dashboard | Purpose |
|---------|----------------|--------------------|---------|
| **Daily tasks** | ✅ My pending, approvals | — | Operational work |
| **Strategic view** | — | ✅ Macro obsolescence | Planning & maintenance |
| **Quick access** | 3-column workspace | Simple table + filters | Different workflows |
| **Role toggle** | N/A | Coordinator role only | Exclusive to Coordinator |
| **Data source** | Task queue + approval flow | Structural metadata + dates | Different focuses |

**Navigation:**
- Main Dashboard: Coordinator clicks "Tasks" tab or default screen
- Tracking Dashboard: Coordinator clicks "Content Health" or "Obsolescence Tracking" tab

---

## Dashboard Layout (Wire-frame View)

```
┌─ COORDINATOR TRACKING DASHBOARD ────────────────────────────────────────┐
│                                                                           │
│ [Degree ▼] [Subject Type ▼] [Status ▼] [Filials ▼] [Sort: Last Updated▼]│
│                                                                           │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ ┌──────────┐ │
│  │  🟢 HEALTHY    │  │🟡 APPROACHING  │  │  🔴 CRITICAL   │ │ ⚠️ OVERDUE│ │
│  │  47 subjects   │  │  18 subjects   │  │  12 subjects   │ │ 3 subjects│ │
│  └────────────────┘  └────────────────┘  └────────────────┘ └──────────┘ │
│                                                                           │
│  Degree     Subject              Last Updated  Days  Type  Cycle  Obsol%  │
│  ─────────────────────────────────────────────────────────────────────── │
│  Master AI  ML Fundamentals      2025-09-15    210   Tech   5y    11.5%  │
│  ───────────────────────────────────────────────────────────────────────   │
│  Master AI  Deep Learning Adv.   2023-06-10    890   Tech   7y   127.0%  │
│            [📋 Review] [🗓️ Schedule] [📊 History] [🔄 Filials]        │
│  ───────────────────────────────────────────────────────────────────────   │
│  Master AI  AI Ethics            2025-02-14    570   Reg.   5y    31.2%  │
│  ───────────────────────────────────────────────────────────────────────   │
│                      [Load more rows or paginate...]                     │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Technical Implementation Notes

### Data needed in mockData.js

```javascript
export const coordinatorTrackingData = [
  {
    id: "fund-ml",
    degree: "Master AI",
    name: "Fundamentals of Machine Learning",
    lastVersionDate: "2025-09-15",
    subjectType: "technical",
    theoreticalObsolescenceCycle: 5,
    accumulatedVersions: 4,
    filialVersions: {
      "main": { version: "4.2", date: "2025-09-15", status: "published" },
      "latam": { version: "4.1", date: "2025-08-20", status: "published" },
      "asia": { version: "3.9", date: "2025-05-10", status: "pending" }
    },
    alarms: ["version-mismatch", "approaching-obsolescence"]
  },
  // ... more subjects
]

export const alarmDefinitions = {
  "version-mismatch": { severity: "info", label: "Version Mismatch" },
  "approaching-obsolescence": { severity: "warning", label: "Approaching Obsolescence" },
  "critical-obsolescence": { severity: "critical", label: "Critical Obsolescence" },
  "expired-content": { severity: "critical", label: "Expired Content" },
  "filial-behind": { severity: "warning", label: "Filial Behind" },
  "pending-update": { severity: "info", label: "Pending Update" }
}
```

### Calculations to implement

- `daysOldest = today - lastVersionDate`
- `obsolescencePercentage = (daysOldest / (cycle * 365)) * 100`
- `statusColor = calculateStatus(obsolescencePercentage)`
- `alarms = detectAlarms(subject, filialVersions, obsolescencePercentage)`

### Role access

- **Visible to:** Coordinator role only
- **Navigation:** Tab or toggle switch on Coordinator dashboard
- **Permissions:** View all subjects, schedule reviews, comment (not edit)
- **Edit restrictions:** Coordinator cannot edit academic content; can only view and schedule reviews

---

## Summary

The **Coordinator Tracking Dashboard** enables proactive content management by:

✅ **Visualizing obsolescence** at a glance (color-coded status cards)
✅ **Tracking versions** across multiple filials/branches
✅ **Triggering alarms** for content requiring attention
✅ **Scheduling updates** before content expires
✅ **Managing versioning** across institutional branches
✅ **Supporting strategic planning** with macro-view insights

It complements the main dashboard (operational/daily) with a strategic/maintenance perspective exclusive to the Coordinator role.

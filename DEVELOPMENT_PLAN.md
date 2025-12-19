# Form Builder V2 - Development Plan

## 🎯 Project Overview

Redesigning the Form Builder inspired by [tancn.dev/form-builder](https://tancn.dev/form-builder) with a modern 3-panel resizable layout, accordion-based field customization, and side-by-side field support.

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              HEADER                                          │
│  ┌─────────────────────────────┐                    ┌─────────────────────┐ │
│  │ Fields │ Template │ Settings│                    │ Zod ▼ │ Toggle │ ⟳ │ 📋│
│  │   AI Generate               │                    │                     │ │
│  └─────────────────────────────┘                    └─────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                           MAIN CONTENT                                       │
│  ┌──────────────┬─────────────────────────────┬────────────────────────┐   │
│  │   FIELDS     │          EDITOR              │       PREVIEW          │   │
│  │   PANEL      │          PANEL               │       PANEL            │   │
│  │  (Resizable) │        (Resizable)           │     (Resizable)        │   │
│  │              │                              │                        │   │
│  │  Field       │  ┌────────────────────────┐ │  Live Form Preview     │   │
│  │  Elements    │  │ Field Row (Accordion)  │ │                        │   │
│  │              │  └────────────────────────┘ │                        │   │
│  │  Display     │  ┌────────────────────────┐ │                        │   │
│  │  Elements    │  │ ┌────────┐ ┌────────┐  │ │                        │   │
│  │              │  │ │ Name   │ │ Email  │  │ │                        │   │
│  │              │  │ └────────┘ └────────┘  │ │                        │   │
│  │              │  └────────────────────────┘ │                        │   │
│  └──────────────┴─────────────────────────────┴────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

Header - Left Nav (Fields, Template, Settings, AI Generate) + Right Controls (Schema Selector, Superforms/Remote Toggle, Reset, Code Modal)
┌─────────────────────────────────────────────────────────────────┐
│  [Zod ▼]  │  [Superforms ◯━━ Remote]  │  [⟳ Reset]  │  [</>Code]│
└─────────────────────────────────────────────────────────────────┘

Inside Code Modal
┌─────────────────────────────────────────────────────────────────────┐
│ Code                                                          [✕]  │
├─────────────────────────────────────────────────────────────────────┤
│ Schema: [Zod] [Valibot] [ArkType]                                   │
│ Mode:   [Superforms ◯━━ Remote]                                     │
├─────────────────────────────────────────────────────────────────────┤
│ ┌─────────┬──────────┬────────────┬─────────┬──────────┐            │
│ │ Client  │  Server  │   Schema   │  JSON   │ Install  │            │
│ └─────────┴──────────┴────────────┴─────────┴──────────┘            │
│                                                                     │
│  // Generated code here...                                          │
│                                                                     │
│                                                      [📋 Copy]      │
└─────────────────────────────────────────────────────────────────────┘

## 📅 1-Week Development Schedule

### Day 1: Foundation & Layout Setup
**Focus: Core Layout Structure**

#### Tasks:
- [ ] Create new route `/v2` for the new form builder
- [ ] Set up 3-panel resizable layout using `paneforge`
- [ ] Create base components structure:
  - `src/lib/components/v2/layout/MainLayout.svelte`
  - `src/lib/components/v2/layout/Header.svelte`
  - `src/lib/components/v2/layout/FieldsPanel.svelte`
  - `src/lib/components/v2/layout/EditorPanel.svelte`
  - `src/lib/components/v2/layout/PreviewPanel.svelte`
- [ ] Implement min/max width constraints for panels

#### Key Icons (@lucide/svelte):
```typescript
import {
  Blocks,           // Fields tab
  LayoutTemplate,   // Template tab
  Settings,         // Settings tab
  Sparkles,         // AI Generate
  RotateCcw,        // Reset
  Code,             // Code modal
} from '@lucide/svelte';
```

---

### Day 2: Header & Navigation
**Focus: Header Controls & Tab Navigation**

#### Tasks:
- [ ] Create Header component with left/right sections
- [ ] Implement tab navigation (Fields, Template, Settings, AI Generate)
- [ ] Create validation library selector (Zod, Valibot, ArkType)
- [ ] Implement Superforms/Remote toggle switch
- [ ] Add Reset button functionality
- [ ] Create Code modal trigger (opens existing code dialog)

#### Component Structure:
```
src/lib/components/v2/header/
├── Header.svelte
├── LeftNav.svelte
├── RightControls.svelte
├── SchemaSelector.svelte
└── CodeModal.svelte
```

---

### Day 3: Fields Panel
**Focus: Field Selection Panel**

#### Tasks:
- [ ] Create Fields panel with categories
- [ ] Implement Field Elements section (existing field types)
- [ ] Implement Display Elements section (Heading, Description, Separator, Legend)
- [ ] Add drag-and-drop source for fields
- [ ] Style field buttons with icons

#### Field Elements:
| Field | Icon |
|-------|------|
| Checkbox | `CheckSquare` |
| Date Picker | `Calendar` |
| Input | `TextCursor` |
| Input OTP | `KeyRound` |
| Multi Select | `ListChecks` |
| Password | `Lock` |
| Radio | `Circle` |
| Select | `ChevronDown` |
| Slider | `SlidersHorizontal` |
| Switch | `ToggleLeft` |
| Textarea | `AlignLeft` |
| Toggle | `Power` |

#### Display Elements:
| Element | Icon |
|---------|------|
| Heading 1 | `Heading1` |
| Heading 2 | `Heading2` |
| Heading 3 | `Heading3` |
| Description | `Text` |
| Legend | `FileText` |
| Separator | `Minus` |

---

### Day 4: Editor Panel - Basic Structure
**Focus: Editor Panel Foundation**

#### Tasks:
- [ ] Create EditorPanel with drag-and-drop zone
- [ ] Implement field row component with accordion
- [ ] Create field row container (supports single or side-by-side)
- [ ] Implement drag handle and reordering
- [ ] Add delete and group (plus) buttons

#### New Data Structures:
```typescript
// Extended InputType for V2
export type InputTypeV2 = InputType & {
  rowId?: string;      // Group identifier for side-by-side
  position?: 'left' | 'right' | 'full';
  expanded?: boolean;  // Accordion state
};

// Row structure for grouping
export type FieldRow = {
  id: string;
  fields: InputTypeV2[];  // 1 or 2 fields
  expanded?: boolean;
};
```

#### Component Structure:
```
src/lib/components/v2/editor/
├── EditorPanel.svelte
├── FieldRow.svelte
├── FieldRowContainer.svelte   # Handles side-by-side
├── FieldCard.svelte
├── FieldActions.svelte        # Delete, Group buttons
└── DragHandle.svelte
```

---

### Day 5: Editor Panel - Accordion Customization
**Focus: Field Customization via Accordion**

#### Tasks:
- [ ] Create accordion-based field customization (replaces modal)
- [ ] Implement field property editor:
  - Label attribute
  - Name attribute
  - Placeholder attribute
  - Description attribute
  - Type selector
  - Required checkbox
  - Disabled checkbox
- [ ] Handle type-specific options (min/max for numbers, etc.)
- [ ] Sync changes with form generator state

#### Component Structure:
```
src/lib/components/v2/editor/customize/
├── FieldCustomizer.svelte     # Main accordion content
├── LabelInput.svelte
├── NameInput.svelte
├── PlaceholderInput.svelte
├── DescriptionInput.svelte
├── TypeSelector.svelte
├── RequiredToggle.svelte
└── DisabledToggle.svelte
```

---

### Day 6: Side-by-Side Fields & Preview
**Focus: Field Grouping & Live Preview**

#### Tasks:
- [ ] Implement "Group" functionality (plus button)
  - Clicking group on field A allows selecting field B
  - Groups them into side-by-side layout
- [ ] Create ungroup functionality
- [ ] Update Preview panel to render side-by-side fields
- [ ] Ensure code generation reflects side-by-side layout
- [ ] Implement responsive behavior in preview

#### Side-by-Side Logic:
```typescript
// When grouping fields:
function groupFields(fieldA: InputTypeV2, fieldB: InputTypeV2): FieldRow {
  return {
    id: generateId(),
    fields: [
      { ...fieldA, position: 'left' },
      { ...fieldB, position: 'right' }
    ]
  };
}

// Preview grid class
// Single field: grid-cols-1
// Side-by-side: grid-cols-2 gap-4
```

---

### Day 7: Templates, Settings & Polish
**Focus: Templates, Settings Panel & Final Integration**

#### Tasks:
- [ ] Create Templates panel with predefined forms:
  - Signup Form
  - Login Form
  - Contact Us
  - Feedback Form
  - Waitlist
  - Survey Form
  - Job Application
  - Event Registration
- [ ] Create Settings panel:
  - Preferred Schema (Zod, Valibot, ArkType)
  - Form options (validation timing, etc.)
- [ ] Polish UI/UX
- [ ] Test all features
- [ ] Ensure backward compatibility with existing code generation

---

## 🗂️ Complete File Structure

```
src/
├── routes/
│   └── v2/
│       └── +page.svelte              # New form builder page
│
├── lib/
│   ├── components/
│   │   └── v2/
│   │       ├── layout/
│   │       │   ├── MainLayout.svelte
│   │       │   ├── Header.svelte
│   │       │   ├── FieldsPanel.svelte
│   │       │   ├── EditorPanel.svelte
│   │       │   └── PreviewPanel.svelte
│   │       │
│   │       ├── header/
│   │       │   ├── LeftNav.svelte
│   │       │   ├── RightControls.svelte
│   │       │   ├── SchemaSelector.svelte
│   │       │   └── CodeModal.svelte
│   │       │
│   │       ├── fields/
│   │       │   ├── FieldsPanel.svelte
│   │       │   ├── FieldCategory.svelte
│   │       │   └── FieldButton.svelte
│   │       │
│   │       ├── editor/
│   │       │   ├── EditorPanel.svelte
│   │       │   ├── FieldRow.svelte
│   │       │   ├── FieldRowContainer.svelte
│   │       │   ├── FieldCard.svelte
│   │       │   ├── FieldActions.svelte
│   │       │   ├── DragHandle.svelte
│   │       │   └── customize/
│   │       │       ├── FieldCustomizer.svelte
│   │       │       ├── LabelInput.svelte
│   │       │       ├── NameInput.svelte
│   │       │       ├── PlaceholderInput.svelte
│   │       │       ├── DescriptionInput.svelte
│   │       │       ├── TypeSelector.svelte
│   │       │       ├── RequiredToggle.svelte
│   │       │       └── DisabledToggle.svelte
│   │       │
│   │       ├── preview/
│   │       │   ├── PreviewPanel.svelte
│   │       │   ├── PreviewForm.svelte
│   │       │   └── PreviewField.svelte
│   │       │
│   │       ├── templates/
│   │       │   ├── TemplatesPanel.svelte
│   │       │   └── TemplateCard.svelte
│   │       │
│   │       └── settings/
│   │           ├── SettingsPanel.svelte
│   │           └── SchemaPreference.svelte
│   │
│   └── form-generator/
│       ├── form-gen.svelte.ts        # Existing (keep)
│       └── form-gen-v2.svelte.ts     # New V2 state management
```

---

## 🔧 Key Technical Decisions

### 1. State Management
Create a new `FormGeneratorV2` class that extends functionality:

```typescript
// form-gen-v2.svelte.ts
class FormGeneratorV2 {
  // Field rows (supports grouping)
  fieldRows: FieldRow[] = $state([]);

  // Active panel (fields, template, settings)
  activePanel: 'fields' | 'template' | 'settings' = $state('fields');

  // Expanded accordion IDs
  expandedFields: Set<string> = $state(new Set());

  // Inherit from existing form_generator for code generation
  // ...
}
```

### 2. Resizable Panels
Use existing `paneforge` integration:

```svelte
<ResizablePaneGroup direction="horizontal">
  <ResizablePane minSize={15} maxSize={25} defaultSize={20}>
    <FieldsPanel />
  </ResizablePane>
  <ResizableHandle />
  <ResizablePane minSize={30} maxSize={50} defaultSize={40}>
    <EditorPanel />
  </ResizablePane>
  <ResizableHandle />
  <ResizablePane minSize={25} maxSize={40} defaultSize={40}>
    <PreviewPanel />
  </ResizablePane>
</ResizablePaneGroup>
```

### 3. Drag & Drop
Use existing `svelte-dnd-action`:

```svelte
<div use:dndzone={{ items: fieldRows, type: 'field-row' }}>
  {#each fieldRows as row (row.id)}
    <FieldRow {row} />
  {/each}
</div>
```

---

## 🎨 UI/UX Guidelines

### Colors & Theming
- Follow existing dark theme
- Accent color: `#EAB308` (amber/gold from tancn)
- Use `bg-background`, `text-foreground`, `border-border`

### Spacing
- Panel padding: `p-4`
- Field gap: `gap-2`
- Section gap: `gap-6`

### Icons (lucide-svelte)
All icons should be 16-20px with `stroke-width={2}`

---

## ✅ Acceptance Criteria

1. **3-Panel Resizable Layout** - All panels resizable with min/max constraints
2. **Header Navigation** - Switch between Fields, Template, Settings
3. **Field Selection** - Click to add fields to editor
4. **Accordion Customization** - Expand field to edit properties (no modal)
5. **Side-by-Side Fields** - Group two fields in one row
6. **Live Preview** - Form updates in real-time
7. **Code Generation** - Existing code generation works with new structure
8. **Schema Selection** - Switch between Zod, Valibot, ArkType

---

## 🚀 Getting Started

```bash
# Day 1 - Create the basic structure
mkdir -p src/lib/components/v2/{layout,header,fields,editor,preview,templates,settings}
mkdir -p src/lib/components/v2/editor/customize
mkdir -p src/routes/v2

# Start with MainLayout.svelte and work down
```

---

## 🎛️ Header Right Controls - Detailed Spec

```
┌─────────────────────────────────────────────────────────────────┐
│  [Zod ▼]  │  [Superforms ◯━━ Remote]  │  [⟳ Reset]  │  [</>Code]│
└─────────────────────────────────────────────────────────────────┘
```

### 1. Validation Library Selector
- **Component:** Select dropdown
- **Options:** Zod, Valibot, ArkType
- **Effect:** Updates schema generation logic

### 2. Superforms ↔ Remote Functions Toggle
- **Superforms:** Traditional approach with `+page.server.ts` form actions
- **Remote Functions:** New SvelteKit 2.27+ feature using `$app/server`
  - Uses `form()`, `command()`, `query()` from `$app/server`
  - Simpler, no need for separate server file
  - Docs: https://svelte.dev/docs/kit/remote-functions

### 3. Reset Button
- **Icon:** `RotateCcw` from @lucide/svelte
- **Action:** Clear all selected fields

### 4. Code Button
- **Icon:** `Code` from @lucide/svelte
- **Action:** Opens Code Modal

---

## 📜 Code Modal - Detailed Spec

### On-Demand Generation (Performance Improvement)
```typescript
// Instead of $derived (recalculates on every change):
// code = $derived(() => generateCode(inputs));

// Use on-demand generation:
function openCodeModal() {
  isGenerating = true;
  generatedCode = generateCode(selectedInputs, options);
  isGenerating = false;
  showModal = true;
}
```

### Modal Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ Generated Code                                                 [✕]  │
├─────────────────────────────────────────────────────────────────────┤
│ Schema: [Zod] [Valibot] [ArkType]                                   │
│ Mode:   [● Superforms] [○ Remote Functions]                        │
├─────────────────────────────────────────────────────────────────────┤
│ ┌─────────┬──────────┬────────────┬─────────┬──────────┐            │
│ │ Client  │  Server  │   Schema   │  JSON   │ Install  │            │
│ └─────────┴──────────┴────────────┴─────────┴──────────┘            │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ // Generated code...                                            │ │
│ │                                                                 │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                       [📋 Copy All] │
└─────────────────────────────────────────────────────────────────────┘
```

### Code Generation Modes

**Superforms Mode:**
| Tab | File | Description |
|-----|------|-------------|
| Client | `+page.svelte` | Form with `superForm` |
| Server | `+page.server.ts` | Form actions, validation |
| Schema | `schema.ts` | Zod/Valibot/ArkType schema |
| JSON | `form.json` | Exportable form structure |
| Install | Commands | Package install commands |

**Remote Functions Mode:**
| Tab | File | Description |
|-----|------|-------------|
| Client | `+page.svelte` | Form using remote `form()` |
| Server | `form.remote.ts` | Remote function definitions |
| Schema | `schema.ts` | Zod/Valibot/ArkType schema |
| JSON | `form.json` | Exportable form structure |
| Install | Commands | Package install commands |

---

## 📦 JSON Import/Export - Future Feature

### JSON Schema Definition
```typescript
interface FormBuilderJSON {
  version: "2.0";
  meta: {
    name: string;
    description?: string;
    schema: "zod" | "valibot" | "arktype";
    mode: "superforms" | "remote";
  };
  rows: {
    id: string;
    fields: {
      id: string;
      type: string;        // "text", "email", "select", etc.
      category: string;
      label: string;
      name: string;        // Form field name (named_id)
      placeholder?: string;
      description?: string;
      required?: boolean;
      disabled?: boolean;
      position: "left" | "right" | "full";
      // Type-specific options
      min?: number;
      max?: number;
      options?: { value: string; label: string }[];
    }[];
  }[];
}
```

### Use Cases
1. **Export:** Save form as JSON for backup/sharing
2. **Import:** Paste JSON to recreate form instantly
3. **Templates:** Pre-built forms stored as JSON
4. **API Integration:** External tools can generate forms
5. **AI Generation:** Generate JSON from natural language descriptions

### Future AI Feature Workflow
```
User: "Create a contact form with name, email, message, and terms checkbox"
        ↓
    AI generates JSON
        ↓
    JSON imported into form builder
        ↓
    User customizes in editor
```

---

## 📝 Notes

- **Keep existing playground working** - V2 is a separate route
- **Reuse existing UI components** - buttons, inputs, accordions, etc.
- **Reuse form-generator logic** - extend, don't replace
- **Test incrementally** - each day should result in working code
- **Remote Functions require SvelteKit 2.27+** - Add version check/warning

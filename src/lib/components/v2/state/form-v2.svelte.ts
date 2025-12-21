// V2 Form Builder State Management
import type { InputType } from '$lib/form-generator/form-gen.svelte';
import { PersistedState } from "runed";
import { globalFormState } from "./global-state.svelte";

// Option type for select, combobox, and radio fields
export type FieldOption = {
  id: string;
  value: string;
  label: string;
};

// Extended input type for V2 with row support
export type InputTypeV2 = InputType & {
  rowId?: string;
  position?: 'left' | 'right' | 'full';
  expanded?: boolean;
  options?: FieldOption[]; // For select, combobox, radio fields
};

// Row structure for side-by-side fields
export type FieldRow = {
  id: string;
  fields: InputTypeV2[];
  // Max 2 fields per row (side-by-side)
};

// Saved Form type for V2
export type SavedFormV2 = {
  id: string;
  name: string;
  schema: {
    rows: FieldRow[];
    schemaType: SchemaType;
    mode: ModeType;
  };
  createdAt: number;
  updatedAt: number;
  meta: {
    fieldCount: number;
    rowCount: number;
    validationLibrary: string;
    version: string;
  };
};

// Persisted array of saved forms using PersistedState
export const savedFormsV2 = new PersistedState<SavedFormV2[]>(
  "form-builder-v2-saved-forms",
  [],
  {
    storage: "local",
    syncTabs: true,
  }
);

export type SchemaType = 'zod' | 'valibot' | 'arktype';
export type ModeType = 'superforms' | 'remote';
export type TabType = 'fields' | 'template' | 'settings';

// V2 Form Generator State
class FormGeneratorV2 {
  // Schema and mode settings
  schema: SchemaType = $state('zod');
  mode: ModeType = $state('superforms');

  // Current active tab
  activeTab: TabType = $state('fields');

  // Rows containing fields (supports side-by-side)
  rows: FieldRow[] = $state([]);

  // Available field types (same as V1)
  availableFields: InputType[] = [
    { name: 'Input', type: 'text', category: 'text', label: 'Username', description: 'Enter text', placeholder: 'Enter value' },
    { name: 'Email', type: 'email', category: 'email', label: 'Email', description: 'Enter email', placeholder: 'Enter email' },
    { name: 'Password', type: 'password', category: 'password', label: 'Password', description: 'Enter password', placeholder: 'Password' },
    { name: 'Number', type: 'number', category: 'number', label: 'Number', description: 'Enter number', placeholder: 'Enter number' },
    { name: 'Textarea', type: 'textarea', category: 'textarea', label: 'Bio', description: 'Enter text', placeholder: 'Enter text' },
    { name: 'Switch', type: 'boolean', category: 'switch', label: 'Toggle', description: 'Toggle option', placeholder: '' },
    { name: 'Checkbox', type: 'boolean', category: 'checkbox', label: 'Agree', description: 'Check option', placeholder: '' },
    { name: 'Select', type: 'select', category: 'select', label: 'Select', description: 'Select option', placeholder: 'Select...' },
    { name: 'Radio Group', type: 'radio', category: 'radio', label: 'Choice', description: 'Select one', placeholder: '' },
    { name: 'Date Picker', type: 'date-picker', category: 'date-picker', label: 'Date', description: 'Pick date', placeholder: 'Select date' },
    { name: 'Slider', type: 'slider', category: 'slider', label: 'Range', description: 'Slide value', placeholder: '', min: 0, max: 100 },
    { name: 'Input OTP', type: 'input-otp', category: 'input-otp', label: 'OTP', description: 'Enter OTP', placeholder: '' },
    { name: 'Phone', type: 'phone', category: 'phone', label: 'Phone', description: 'Phone number', placeholder: 'Enter phone' },
    { name: 'ComboBox', type: 'combobox', category: 'combobox', label: 'Framework', description: 'Select framework', placeholder: 'Search...' },
    { name: 'Tags Input', type: 'tags-input', category: 'tags-input', label: 'Tags', description: 'Add tags', placeholder: 'Add tag' },
    { name: 'File Input', type: 'file', category: 'file', label: 'File', description: 'Upload file', placeholder: '' },
    { name: 'Location Input', type: 'location-input', category: 'location-input', label: 'Location', description: 'Select location', placeholder: 'Select country' },
  ];

  // Display elements (headers, separators, etc.)
  displayElements: InputType[] = [
    { name: 'Heading 1', type: 'h1', category: 'display', label: 'Heading', description: '', placeholder: '' },
    { name: 'Heading 2', type: 'h2', category: 'display', label: 'Subheading', description: '', placeholder: '' },
    { name: 'Heading 3', type: 'h3', category: 'display', label: 'Section', description: '', placeholder: '' },
    { name: 'Description', type: 'desc', category: 'display', label: 'Description text', description: '', placeholder: '' },
    { name: 'Separator', type: 'separator', category: 'display', label: '', description: '', placeholder: '' },
  ];

  // Generate unique ID
  private generateId = () => crypto.randomUUID().slice(0, 8);

  // Generate default options for fields that support them
  // private generateDefaultOptions = (category: string): FieldOption[] | undefined => {
  //   if (category === 'select' || category === 'combobox' || category === 'radio') {
  //     return [
  //       { id: this.generateId(), value: 'option1', label: 'Option 1' },
  //       { id: this.generateId(), value: 'option2', label: 'Option 2' },
  //       { id: this.generateId(), value: 'option3', label: 'Option 3' },
  //     ];
  //   }
  //   return undefined;
  // };

  // Generate default options for fields that need them
  private generateDefaultOptions = (category: string): FieldOption[] => {
    if (category === 'select') {
      return [
        { id: this.generateId(), value: 'option1', label: 'Option 1' },
        { id: this.generateId(), value: 'option2', label: 'Option 2' },
        { id: this.generateId(), value: 'option3', label: 'Option 3' },
      ];
    } else if (category === 'combobox') {
      return [
        { id: this.generateId(), value: 'framework1', label: 'Framework 1' },
        { id: this.generateId(), value: 'framework2', label: 'Framework 2' },
        { id: this.generateId(), value: 'framework3', label: 'Framework 3' },
      ];
    } else if (category === 'radio') {
      return [
        { id: this.generateId(), value: 'choice1', label: 'Choice 1' },
        { id: this.generateId(), value: 'choice2', label: 'Choice 2' },
        { id: this.generateId(), value: 'choice3', label: 'Choice 3' },
      ];
    }
    return [];
  };

  // Add a new field (creates a new row with full-width field)
  addField = (field: InputType) => {
    const newField: InputTypeV2 = {
      ...field,
      id: this.generateId(),
      named_id: this.generateNamedId(field),
      rowId: this.generateId(),
      position: 'full',
      expanded: false,
      required: true,
      options: this.generateDefaultOptions(field.category),
    };

    const newRow: FieldRow = {
      id: newField.rowId!,
      fields: [newField],
    };

    this.rows.push(newRow);
  };

  // Generate a unique named_id for a field
  private generateNamedId = (field: InputType): string => {
    const existingIds = this.rows.flatMap(r => r.fields.map(f => f.named_id));
    const baseId = field.category.replace(/-/g, '');

    if (!existingIds.includes(baseId)) {
      return baseId;
    }

    return `${baseId}_${crypto.randomUUID().slice(0, 2)}`;
  };

  // Add a field to an existing row (side-by-side)
  addFieldToRow = (rowId: string, field?: InputType) => {
    const targetRow = this.rows.find(r => r.id === rowId);
    if (!targetRow || targetRow.fields.length >= 2) return;

    // Use the provided field or default to a text input
    const templateField = field || this.availableFields[0];

    const newField: InputTypeV2 = {
      ...templateField,
      id: this.generateId(),
      named_id: this.generateNamedId(templateField),
      rowId: rowId,
      position: 'right',
      expanded: false,
      required: true,
      options: this.generateDefaultOptions(templateField.category),
    };

    // Update positions
    targetRow.fields[0].position = 'left';
    targetRow.fields.push(newField);

    // Trigger reactivity
    this.rows = [...this.rows];
  };

  // Remove a field by ID
  removeField = (fieldId: string) => {
    this.rows = this.rows.map(row => {
      const filteredFields = row.fields.filter(f => f.id !== fieldId);
      // If only one field left, reset its position to full
      if (filteredFields.length === 1) {
        filteredFields[0].position = 'full';
      }
      return {
        ...row,
        fields: filteredFields
      };
    }).filter(row => row.fields.length > 0);
  };

  // Ungroup side-by-side fields into separate rows
  ungroupRow = (rowId: string) => {
    const targetRow = this.rows.find(r => r.id === rowId);
    if (!targetRow || targetRow.fields.length < 2) return;

    const rowIndex = this.rows.findIndex(r => r.id === rowId);
    const [fieldA, fieldB] = targetRow.fields;

    // Create two separate rows
    const newRowA: FieldRow = {
      id: this.generateId(),
      fields: [{ ...fieldA, position: 'full', rowId: undefined }],
    };
    const newRowB: FieldRow = {
      id: this.generateId(),
      fields: [{ ...fieldB, position: 'full', rowId: undefined }],
    };

    // Replace the original row with two new rows
    this.rows = [
      ...this.rows.slice(0, rowIndex),
      newRowA,
      newRowB,
      ...this.rows.slice(rowIndex + 1),
    ];
  };

  // Toggle field expansion (for accordion)
  toggleFieldExpanded = (fieldId: string) => {
    this.rows = this.rows.map(row => ({
      ...row,
      fields: row.fields.map(f =>
        f.id === fieldId ? { ...f, expanded: !f.expanded } : f
      )
    }));
  };

  // Update field properties
  updateField = (fieldId: string, updates: Partial<InputTypeV2>) => {
    this.rows = this.rows.map(row => ({
      ...row,
      fields: row.fields.map(f =>
        f.id === fieldId ? { ...f, ...updates } : f
      )
    }));
  };

  // Swap fields within a row (for side-by-side reordering)
  swapFieldsInRow = (rowId: string) => {
    this.rows = this.rows.map(row => {
      if (row.id !== rowId || row.fields.length !== 2) return row;

      // Swap the fields and their positions - create new objects for reactivity
      const [first, second] = row.fields;

      return {
        ...row,
        fields: [
          { ...second, position: 'left' as const },
          { ...first, position: 'right' as const }
        ]
      };
    });
  };

  // Reset all fields
  reset = () => {
    this.rows = [];
    this.currentFormId = null;
  };

  // Load a template into the form
  loadTemplate = (templateRows: FieldRow[]) => {
    this.reset();

    // Deep clone and regenerate IDs for the template
    this.rows = templateRows.map((row) => {
      const newRowId = this.generateId();
      return {
        id: newRowId,
        fields: row.fields.map((field) => {
          const newFieldId = this.generateId();
          // Generate unique named_id
          const existingIds = this.rows.flatMap((r) => r.fields.map((f) => f.named_id));
          let namedId = field.category.replace(/-/g, '');
          if (existingIds.includes(namedId)) {
            namedId = `${namedId}_${crypto.randomUUID().slice(0, 2)}`;
          }

          return {
            ...field,
            id: newFieldId,
            named_id: namedId,
            rowId: newRowId,
            // Keep original position, options, and other properties
            options: field.options ? [...field.options] : []
          };
        })
      };
    });
  };

  // Get all fields as flat array
  get allFields(): InputTypeV2[] {
    return this.rows.flatMap(r => r.fields);
  }

  // Drag and Drop handlers for svelte-dnd-action
  handleDndConsider = (e: CustomEvent<{ items: FieldRow[] }>) => {
    this.rows = e.detail.items;
  };

  handleDndFinalize = (e: CustomEvent<{ items: FieldRow[] }>) => {
    this.rows = e.detail.items;
  };

  // Move a row from one index to another
  moveRow = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || fromIndex >= this.rows.length) return;
    if (toIndex < 0 || toIndex >= this.rows.length) return;
    if (fromIndex === toIndex) return;

    const newRows = [...this.rows];
    const [removed] = newRows.splice(fromIndex, 1);
    newRows.splice(toIndex, 0, removed);
    this.rows = newRows;
  };

  // Options management methods

  // Add a new option to a field
  addOption = (fieldId: string) => {
    this.rows = this.rows.map(row => ({
      ...row,
      fields: row.fields.map(f => {
        if (f.id === fieldId) {
          const newOption: FieldOption = {
            id: this.generateId(),
            value: `option${(f.options?.length || 0) + 1}`,
            label: `Option ${(f.options?.length || 0) + 1}`,
          };
          return {
            ...f,
            options: [...(f.options || []), newOption],
          };
        }
        return f;
      })
    }));
  };

  // Update an option
  updateOption = (fieldId: string, optionId: string, updates: Partial<FieldOption>) => {
    this.rows = this.rows.map(row => ({
      ...row,
      fields: row.fields.map(f => {
        if (f.id === fieldId && f.options) {
          return {
            ...f,
            options: f.options.map(opt =>
              opt.id === optionId ? { ...opt, ...updates } : opt
            ),
          };
        }
        return f;
      })
    }));
  };

  // Delete an option
  deleteOption = (fieldId: string, optionId: string) => {
    this.rows = this.rows.map(row => ({
      ...row,
      fields: row.fields.map(f => {
        if (f.id === fieldId && f.options) {
          return {
            ...f,
            options: f.options.filter(opt => opt.id !== optionId),
          };
        }
        return f;
      })
    }));
  };

  // Reorder options (for drag and drop)
  reorderOptions = (fieldId: string, newOptions: FieldOption[]) => {
    this.rows = this.rows.map(row => ({
      ...row,
      fields: row.fields.map(f =>
        f.id === fieldId ? { ...f, options: newOptions } : f
      )
    }));
  };

  // Current loaded form ID
  currentFormId: string | null = $state(null);

  // Save/Load Form Management Methods
  saveForm = (name: string, isNew: boolean = false): string => {
    const now = Date.now();
    const formId = isNew || !this.currentFormId ? crypto.randomUUID() : this.currentFormId;

    const fieldCount = this.rows.reduce((acc, row) => acc + row.fields.length, 0);

    const savedForm: SavedFormV2 = {
      id: formId,
      name: name,
      schema: {
        rows: JSON.parse(JSON.stringify(this.rows)),
        schemaType: globalFormState.schema,
        mode: globalFormState.mode,
      },
      createdAt: isNew || !this.currentFormId ? now : savedFormsV2.current.find((f) => f.id === formId)?.createdAt || now,
      updatedAt: now,
      meta: {
        fieldCount: fieldCount,
        rowCount: this.rows.length,
        validationLibrary: globalFormState.schema,
        version: "2.0",
      },
    };

    const existingIndex = savedFormsV2.current.findIndex((f) => f.id === formId);
    if (existingIndex >= 0) {
      savedFormsV2.current[existingIndex] = savedForm;
    } else {
      savedFormsV2.current = [...savedFormsV2.current, savedForm];
    }

    this.currentFormId = formId;
    return formId;
  };

  loadForm = (formId: string) => {
    const form = savedFormsV2.current.find((f) => f.id === formId);
    if (!form) return;

    this.rows = JSON.parse(JSON.stringify(form.schema.rows));
    this.schema = form.schema.schemaType;
    this.mode = form.schema.mode;

    // Sync globalFormState with loaded form's schema and mode
    globalFormState.setSchema(form.schema.schemaType);
    globalFormState.setMode(form.schema.mode);

    this.currentFormId = formId;
  };

  deleteForm = (formId: string) => {
    savedFormsV2.current = savedFormsV2.current.filter((f) => f.id !== formId);
    if (this.currentFormId === formId) {
      this.currentFormId = null;
    }
  };

  renameForm = (formId: string, newName: string) => {
    const formIndex = savedFormsV2.current.findIndex((f) => f.id === formId);
    if (formIndex >= 0) {
      savedFormsV2.current[formIndex].name = newName;
      savedFormsV2.current[formIndex].updatedAt = Date.now();
      savedFormsV2.current = [...savedFormsV2.current];
    }
  };

  duplicateForm = (formId: string): string => {
    const form = savedFormsV2.current.find((f) => f.id === formId);
    if (!form) return "";

    const newId = crypto.randomUUID();
    const duplicatedForm: SavedFormV2 = {
      ...JSON.parse(JSON.stringify(form)),
      id: newId,
      name: `${form.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    savedFormsV2.current = [...savedFormsV2.current, duplicatedForm];
    return newId;
  };

  hasUnsavedChanges = $derived.by(() => {
    if (!this.currentFormId) return false;
    const savedForm = savedFormsV2.current.find((f) => f.id === this.currentFormId);
    if (!savedForm) return false;
    return (
      JSON.stringify(this.rows) !==
      JSON.stringify(savedForm.schema.rows)
    );
  });
}

// Export singleton instance
export const formV2 = new FormGeneratorV2();


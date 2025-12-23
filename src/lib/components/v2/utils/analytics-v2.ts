/**
 * Analytics module for Svelte Form Builder V2
 * Event-based tracking system with v2 prefix for version isolation
 *
 * Event Naming Convention: v2:action:detail
 * All events are prefixed with 'v2:' for version tracking and future compatibility
 */

import { event } from "onedollarstats";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type SchemaType = 'zod' | 'valibot' | 'arktype';
export type FieldType = 'text' | 'email' | 'password' | 'number' | 'textarea' |
  'switch' | 'checkbox' | 'select' | 'radio' | 'date-picker' | 'slider' |
  'input-otp' | 'phone' | 'combobox' | 'tags-input' | 'file' | 'location-input';
export type TemplateType = string;

// ============================================
// SCHEMA & VALIDATION EVENTS
// ============================================

/**
 * Track when a validation library is selected
 * Events: v2:schema_selected:zod, v2:schema_selected:valibot, v2:schema_selected:arktype
 */
export function trackV2SchemaSelected(schemaType: SchemaType) {
  event(`v2:schema_selected:${schemaType}`);
}

/**
 * Track when schema is generated using AI
 * Event: v2:schema_generated_ai
 */
export function trackV2SchemaGeneratedAI(schemaType: SchemaType, fieldCount: number) {
  event('v2:schema_generated_ai', {
    schema_type: schemaType,
    field_count: String(fieldCount)
  });
}

/**
 * Track when schema is imported from JSON
 * Event: v2:schema_imported_json
 */
export function trackV2SchemaImportedJSON(schemaType: SchemaType, fieldCount: number) {
  event('v2:schema_imported_json', {
    schema_type: schemaType,
    field_count: String(fieldCount)
  });
}

/**
 * Track when validation library is changed
 * Events: v2:validation_library_changed:zod, v2:validation_library_changed:valibot, etc.
 */
export function trackV2ValidationLibraryChanged(fromSchema: SchemaType, toSchema: SchemaType) {
  event(`v2:validation_library_changed`, {
    from: fromSchema,
    to: toSchema
  });
}

// ============================================
// FIELD & LAYOUT EVENTS
// ============================================

/**
 * Track when a field is added to the form
 * Events: v2:field_added:text, v2:field_added:select, v2:field_added:email, etc.
 */
export function trackV2FieldAdded(fieldType: FieldType, position: 'full' | 'left' | 'right' = 'full') {
  event(`v2:field_added:${fieldType}`, {
    position: position
  });
}

/**
 * Track when a field is removed from the form
 * Events: v2:field_removed:text, v2:field_removed:select, etc.
 */
export function trackV2FieldRemoved(fieldType: FieldType, fieldCount: number) {
  event(`v2:field_removed:${fieldType}`, {
    remaining_fields: String(fieldCount)
  });
}

/**
 * Track when a field's properties are updated
 * Event: v2:field_updated
 */
export function trackV2FieldUpdated(fieldType: FieldType, property: string) {
  event('v2:field_updated', {
    field_type: fieldType,
    property: property
  });
}

/**
 * Track when fields are reordered via drag and drop
 * Event: v2:field_reordered
 */
export function trackV2FieldReordered(rowCount: number, fieldCount: number) {
  event('v2:field_reordered', {
    row_count: String(rowCount),
    field_count: String(fieldCount)
  });
}

/**
 * Track when the layout is changed (e.g., row structure modified)
 * Event: v2:layout_changed
 */
export function trackV2LayoutChanged(action: 'group' | 'ungroup' | 'swap', rowCount: number) {
  event('v2:layout_changed', {
    action: action,
    row_count: String(rowCount)
  });
}

/**
 * Track when side-by-side layout is enabled for fields
 * Event: v2:side_by_side_enabled
 */
export function trackV2SideBySideEnabled(rowId: string) {
  event('v2:side_by_side_enabled', {
    row_id: rowId
  });
}

// ============================================
// FORM LIFECYCLE EVENTS
// ============================================

/**
 * Track when a new form is created
 * Event: v2:form_created
 */
export function trackV2FormCreated(fieldCount: number, rowCount: number, schemaType: SchemaType) {
  event('v2:form_created', {
    field_count: String(fieldCount),
    row_count: String(rowCount),
    schema_type: schemaType
  });
}

/**
 * Track when a form is saved
 * Event: v2:form_saved
 */
export function trackV2FormSaved(formId: string, isNew: boolean, fieldCount: number) {
  event('v2:form_saved', {
    form_id: formId,
    is_new: String(isNew),
    field_count: String(fieldCount)
  });
}

/**
 * Track when a form is duplicated
 * Event: v2:form_duplicated
 */
export function trackV2FormDuplicated(originalFormId: string, newFormId: string) {
  event('v2:form_duplicated', {
    original_form_id: originalFormId,
    new_form_id: newFormId
  });
}

/**
 * Track when a form is deleted
 * Event: v2:form_deleted
 */
export function trackV2FormDeleted(formId: string, fieldCount: number) {
  event('v2:form_deleted', {
    form_id: formId,
    field_count: String(fieldCount)
  });
}

/**
 * Track when a form is shared (exported/shared)
 * Event: v2:form_shared
 */
export function trackV2FormShared(formId: string, shareMethod: string) {
  event('v2:form_shared', {
    form_id: formId,
    share_method: shareMethod
  });
}

/**
 * Track when a form is loaded
 * Event: v2:form_loaded
 */
export function trackV2FormLoaded(formId: string, fieldCount: number) {
  event('v2:form_loaded', {
    form_id: formId,
    field_count: String(fieldCount)
  });
}

// ============================================
// CODE GENERATION EVENTS
// ============================================

/**
 * Track when code is generated for superforms
 * Event: v2:code_generated_superforms
 */
export function trackV2CodeGeneratedSuperforms(schemaType: SchemaType, fieldCount: number) {
  event('v2:code_generated_superforms', {
    schema_type: schemaType,
    field_count: String(fieldCount)
  });
}

/**
 * Track when code is generated for remote function
 * Event: v2:code_generated_remote_function
 */
export function trackV2CodeGeneratedRemoteFunction(schemaType: SchemaType, fieldCount: number) {
  event('v2:code_generated_remote_function', {
    schema_type: schemaType,
    field_count: String(fieldCount)
  });
}

/**
 * Track when generated code is copied to clipboard
 * Event: v2:code_copied
 */
export function trackV2CodeCopied(
  codeType: 'schema' | 'client' | 'server' | 'component',
  schemaType: SchemaType,
  mode: 'superforms' | 'remote'
) {
  event(`v2:code_copied:${codeType}`, {
    schema_type: schemaType,
    mode: mode
  });
}

// ============================================
// TEMPLATE EVENTS
// ============================================

/**
 * Track when a template is selected and loaded
 * Events: v2:template_selected:contact, v2:template_selected:registration, etc.
 */
export function trackV2TemplateSelected(templateName: TemplateType, fieldCount: number) {
  event(`v2:template_selected:${templateName}`, {
    field_count: String(fieldCount)
  });
}

/**
 * Track when a template is previewed
 * Events: v2:template_previewed:contact, v2:template_previewed:registration, etc.
 */
export function trackV2TemplatePreviewed(templateName: TemplateType) {
  event(`v2:template_previewed:${templateName}`);
}

// ============================================
// ADDITIONAL V2 SPECIFIC EVENTS
// ============================================

/**
 * Track when user switches between tabs (fields, templates, settings)
 * Event: v2:tab_switched
 */
export function trackV2TabSwitched(fromTab: string, toTab: string) {
  event('v2:tab_switched', {
    from: fromTab,
    to: toTab
  });
}

/**
 * Track when mode is changed (superforms vs remote)
 * Event: v2:mode_changed
 */
export function trackV2ModeChanged(fromMode: 'superforms' | 'remote', toMode: 'superforms' | 'remote') {
  event('v2:mode_changed', {
    from: fromMode,
    to: toMode
  });
}

/**
 * Track when field options are modified (for select, radio, combobox)
 * Event: v2:field_options_modified
 */
export function trackV2FieldOptionsModified(
  fieldType: FieldType,
  action: 'add' | 'update' | 'delete' | 'reorder',
  optionCount: number
) {
  event('v2:field_options_modified', {
    field_type: fieldType,
    action: action,
    option_count: String(optionCount)
  });
}

/**
 * Track when preview panel view changes
 * Event: v2:preview_mode_changed
 */
export function trackV2PreviewModeChanged(mode: 'desktop' | 'tablet' | 'mobile') {
  event('v2:preview_mode_changed', {
    mode: mode
  });
}

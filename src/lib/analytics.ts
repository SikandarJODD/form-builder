/**
 * Analytics module for Svelte Form Builder
 * Uses OneDollarStats for tracking user interactions
 */

import { configure, event } from "onedollarstats";

// Initialize analytics - call this once in the root layout
export function initAnalytics() {
  configure({
    autocollect: true, // automatically tracks pageviews & clicks
    trackLocalhostAs: "svelte-form-builder.vercel.app", // for dev testing
  });
}

// ============================================
// FIELD EVENTS
// ============================================

/**
 * Track when a user adds a field to the form
 */
export function trackFieldAdded(fieldType: string, fieldName: string) {
  event("field_added", {
    field_type: fieldType,
    field_name: fieldName,
  });
}

/**
 * Track when a user removes a field from the form
 */
export function trackFieldRemoved(fieldType: string, fieldName: string) {
  event("field_removed", {
    field_type: fieldType,
    field_name: fieldName,
  });
}

/**
 * Track when a user edits a field's properties
 */
export function trackFieldEdited(fieldType: string, property: string) {
  event("field_edited", {
    field_type: fieldType,
    property: property,
  });
}

/**
 * Track when a user reorders fields via drag and drop
 */
export function trackFieldReordered(fieldCount: number) {
  event("field_reordered", {
    field_count: String(fieldCount),
  });
}

// ============================================
// SCHEMA EVENTS
// ============================================

/**
 * Track when a user selects a validation schema library
 */
export function trackSchemaSelected(schemaType: string) {
  event("schema_selected", {
    schema_type: schemaType,
  });
}

// ============================================
// CODE COPY EVENTS
// ============================================

/**
 * Track when a user copies generated code
 */
export function trackCodeCopied(
  codeType: "schema" | "client" | "server",
  schemaType: string,
  isFormsnap: boolean = false
) {
  event("code_copied", {
    code_type: codeType,
    schema_type: schemaType,
    formsnap: String(isFormsnap),
  });
}

// ============================================
// TAB/VIEW EVENTS
// ============================================

/**
 * Track when a user switches tabs in the preview area
 */
export function trackTabViewed(tabName: string) {
  event("tab_viewed", {
    tab_name: tabName,
  });
}

/**
 * Track when a user switches between client/server code tabs
 */
export function trackCodeTabSwitched(tabName: "client" | "server", isFormsnap: boolean = false) {
  event("code_tab_switched", {
    tab_name: tabName,
    formsnap: String(isFormsnap),
  });
}

// ============================================
// FORMSNAP EVENTS
// ============================================

/**
 * Track when a user toggles FormSnap option
 */
export function trackFormsnapToggled(enabled: boolean) {
  event("formsnap_toggled", {
    enabled: String(enabled),
  });
}

// ============================================
// TEMPLATE EVENTS
// ============================================

/**
 * Track when a user views a template
 */
export function trackTemplateViewed(templateName: string) {
  event("template_viewed", {
    template_name: templateName,
  });
}

/**
 * Track when a user submits a template form
 */
export function trackTemplateFormSubmitted(templateName: string, success: boolean) {
  event("template_form_submitted", {
    template_name: templateName,
    success: String(success),
  });
}


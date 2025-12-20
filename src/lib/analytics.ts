/**
 * Analytics module for Svelte Form Builder
 * Uses OneDollarStats for tracking user interactions
 *
 * Event naming convention: action:specific_detail
 * This allows filtering by specific field types, schemas, etc.
 */

import { configure, event } from 'onedollarstats';

// Initialize analytics - call this once in the root layout
export function initAnalytics() {
	configure({
		autocollect: true, // automatically tracks pageviews & clicks
		trackLocalhostAs: 'svelte-form-builder.vercel.app' // for dev testing
	});
}

// ============================================
// FIELD EVENTS
// ============================================

/**
 * Track when a user adds a field to the form
 * Event: field_added:input, field_added:email, field_added:textarea, etc.
 */
export function trackFieldAdded(fieldType: string, _fieldName?: string) {
	// Use specific event name for each field type
	event(`field_added:${fieldType}`);
}

/**
 * Track when a user removes a field from the form
 * Event: field_removed:input, field_removed:email, etc.
 */
export function trackFieldRemoved(fieldType: string, _fieldName?: string) {
	event(`field_removed:${fieldType}`);
}

/**
 * Track when a user edits a field's properties
 * Event: field_edited:input, field_edited:email, etc.
 */
export function trackFieldEdited(fieldType: string, property: string) {
	event(`field_edited:${fieldType}`, {
		property: property
	});
}

/**
 * Track when a user reorders fields via drag and drop
 */
export function trackFieldReordered(fieldCount: number) {
	event('field_reordered', {
		field_count: String(fieldCount)
	});
}

// ============================================
// SCHEMA EVENTS
// ============================================

/**
 * Track when a user selects a validation schema library
 * Event: schema_selected:zod, schema_selected:valibot, schema_selected:arktype
 */
export function trackSchemaSelected(schemaType: string) {
	event(`schema_selected:${schemaType}`);
}

// ============================================
// CODE COPY EVENTS
// ============================================

/**
 * Track when a user copies generated code
 * Event: code_copied:schema, code_copied:client, code_copied:server
 */
export function trackCodeCopied(
	codeType: 'schema' | 'client' | 'server',
	schemaType: string,
	isFormsnap: boolean = false
) {
	const formsnapSuffix = isFormsnap ? ':formsnap' : '';
	event(`code_copied:${codeType}${formsnapSuffix}`, {
		schema_type: schemaType
	});
}

// ============================================
// TAB/VIEW EVENTS
// ============================================

/**
 * Track when a user switches tabs in the preview area
 * Event: tab_viewed:preview, tab_viewed:code, tab_viewed:schema, tab_viewed:formsnap
 */
export function trackTabViewed(tabName: string) {
	event(`tab_viewed:${tabName}`);
}

/**
 * Track when a user switches between client/server code tabs
 * Event: code_tab:client, code_tab:server, code_tab:client:formsnap, code_tab:server:formsnap
 */
export function trackCodeTabSwitched(tabName: 'client' | 'server', isFormsnap: boolean = false) {
	const formsnapSuffix = isFormsnap ? ':formsnap' : '';
	event(`code_tab:${tabName}${formsnapSuffix}`);
}

// ============================================
// FORMSNAP EVENTS
// ============================================

/**
 * Track when a user toggles FormSnap option
 * Event: formsnap:enabled, formsnap:disabled
 */
export function trackFormsnapToggled(enabled: boolean) {
	event(`formsnap:${enabled ? 'enabled' : 'disabled'}`);
}

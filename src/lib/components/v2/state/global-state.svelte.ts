// Global State Management for V2 Form Builder
// Manages schema selection and mode across all components

import type { SchemaType, ModeType } from './form-v2.svelte';
import * as analyticsV2 from '../utils/analytics-v2';

/**
 * Global state class for managing form configuration
 * Uses Svelte 5 class-based approach with $state runes
 */
class GlobalFormState {
  // Schema type selection (zod, valibot, arktype)
  schema: SchemaType = $state('valibot');

  // Mode selection (superforms, remote)
  mode: ModeType = $state('superforms');

  // Set schema type
  setSchema(newSchema: SchemaType, trackChange: boolean = true) {
    const oldSchema = this.schema;

    // Only track if schema actually changed and tracking is enabled
    if (trackChange && oldSchema !== newSchema) {
      analyticsV2.trackV2ValidationLibraryChanged(oldSchema, newSchema);
      analyticsV2.trackV2SchemaSelected(newSchema);
    }

    this.schema = newSchema;
  }

  // Set mode type
  setMode(newMode: ModeType, trackChange: boolean = true) {
    const oldMode = this.mode;

    // Only track if mode actually changed and tracking is enabled
    if (trackChange && oldMode !== newMode) {
      analyticsV2.trackV2ModeChanged(oldMode, newMode);
    }

    this.mode = newMode;
  }

  // Reset to defaults
  reset() {
    this.schema = 'zod';
    this.mode = 'superforms';
  }
}

// Export singleton instance for global access
export const globalFormState = new GlobalFormState();

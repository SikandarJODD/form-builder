// Global State Management for V2 Form Builder
// Manages schema selection and mode across all components

import type { SchemaType, ModeType } from './form-v2.svelte';

/**
 * Global state class for managing form configuration
 * Uses Svelte 5 class-based approach with $state runes
 */
class GlobalFormState {
  // Schema type selection (zod, valibot, arktype)
  schema: SchemaType = $state('zod');

  // Mode selection (superforms, remote)
  mode: ModeType = $state('superforms');

  // Set schema type
  setSchema(newSchema: SchemaType) {
    this.schema = newSchema;
  }

  // Set mode type
  setMode(newMode: ModeType) {
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

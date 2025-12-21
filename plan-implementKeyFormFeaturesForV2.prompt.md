## Plan: Implement Key Form Features for v2

Add export/import JSON functionality (extending existing export), secure share forms via link, and keyboard shortcuts (Ctrl+S for save, Ctrl+M for code modal) to the v2 form builder at /v2 route. This improves data portability, collaboration, and user efficiency while prioritizing security for shared links.

### Steps
1. Enhance JSON export/import: Extend [src/lib/components/v2/ui/Code.svelte](src/lib/components/v2/ui/Code.svelte) with import tab including textarea/file input for JSON, a dummy template button to populate sample JSON, and 2-3 predefined prompts (e.g., "Basic contact form", "User registration", "Survey form") that generate example schemas; parse input JSON, validate against expected schema, and load into `formV2.rows` via `FormState.loadForm`.
2. Implement secure share via link: Add share button in [src/lib/components/v2/layout/MainLayout.svelte](src/lib/components/v2/layout/MainLayout.svelte) that encodes form JSON as base64 URL param with timestamp for expiration, update [routes/v2/+page.svelte](routes/v2/+page.svelte) to decode and validate on mount, ensuring HTTPS and CSP for security.
3. Add keyboard shortcuts: Implement global listeners in [src/lib/components/v2/layout/MainLayout.svelte](src/lib/components/v2/layout/MainLayout.svelte) for Ctrl+S (trigger save via `FormState.saveForm`) and Ctrl+M (open code modal by setting `codeModalOpen = true`), preventing defaults and avoiding conflicts.
4. Implement real-time form validation preview: Enhance [src/lib/components/v2/ui/PreviewPanel.svelte](src/lib/components/v2/ui/PreviewPanel.svelte) to show live validation feedback (errors, warnings) as users configure fields, with sample data for testing interactions.

### Further Considerations
1. Security for shared links: Use short-lived links (e.g., 24-hour expiration via timestamp), compress data with lz-string to fit URL limits, and validate decoded data to prevent injection attacks.
2. User feedback: Add toast notifications for successful import/share/save, and warnings for invalid JSON or expired links.
3. Accessibility: Ensure shortcuts are configurable and don't interfere with screen readers or other assistive tech.

### Additional UX Improvements (Future)
1. Auto-Save with Visual Indicators: Implement automatic saving to localStorage with status feedback in MainLayout, preventing data loss and reducing manual saves.
2. Undo/Redo Functionality: Add command history in form-state.ts with Ctrl+Z/Ctrl+Y support for safe experimentation.
3. Template Search and Filtering: Enhance TemplatesPanel with search/filter by name/category for better template discovery.
4. Keyboard Shortcuts Panel: Expand shortcuts (save, undo, new field) with a discoverable reference modal for power users.
5. Enhanced Mobile Responsiveness: Optimize 3-panel layout for mobile with collapsible panels and touch gestures.
6. Quick Actions Toolbar: Add floating toolbar for field actions (duplicate, delete, move) to reduce clicks.
7. Form Validation Preview: (Moved to main steps for immediate implementation)
8. Accessibility Enhancements: Add ARIA labels, keyboard navigation, and screen reader support throughout.
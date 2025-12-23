<script lang="ts">
  import DocNavigation from "$lib/components/docs/DocNavigation.svelte";
  import CodeBlock from "$lib/components/docs/CodeBlock.svelte";
  import { Info } from "@lucide/svelte/icons";
</script>

<svelte:head>
  <title>Comprehensive Guide - Svelte Form Builder Documentation</title>
  <meta
    name="description"
    content="Complete guide to Svelte Form Builder covering advanced features, best practices, and detailed tutorials."
  />
</svelte:head>

<div class="prose prose-neutral dark:prose-invert max-w-none">
  <h1 class="text-4xl font-bold tracking-tight">Comprehensive Guide</h1>
  <p class="text-xl text-muted-foreground mt-4">
    Master Svelte Form Builder with this in-depth guide covering all features,
    advanced techniques, and best practices.
  </p>

  <h2 class="mt-12 text-3xl font-bold">Understanding the Interface</h2>
  <p>
    Svelte Form Builder V2 features a modern 3-panel layout designed for maximum
    efficiency:
  </p>

  <h3 class="mt-8 text-2xl font-semibold">Left Panel: Fields & Templates</h3>
  <p>The left panel contains two tabs accessible from the header:</p>
  <ul class="mt-4 space-y-2">
    <li>
      <strong>Fields Tab:</strong> Browse all available field types organized by
      category (Basic, Advanced, Layout, etc.)
    </li>
    <li>
      <strong>Templates Tab:</strong> Access pre-built form templates for common
      use cases like login, signup, contact forms, and more
    </li>
  </ul>

  <h3 class="mt-8 text-2xl font-semibold">Middle Panel: Form Editor</h3>
  <p>The editor panel is where you build and customize your form:</p>
  <ul class="mt-4 space-y-2">
    <li>
      <strong>Drag & Drop:</strong> Reorder fields by dragging them up or down
    </li>
    <li>
      <strong>Accordion Customization:</strong> Click any field to expand its settings
      and customize properties
    </li>
    <li>
      <strong>Side-by-Side Fields:</strong> Arrange two fields horizontally in a
      single row for responsive layouts
    </li>
    <li>
      <strong>Field Actions:</strong> Delete, duplicate, or move fields between positions
    </li>
  </ul>

  <h3 class="mt-8 text-2xl font-semibold">Right Panel: Live Preview</h3>
  <p>The preview panel shows your form in real-time:</p>
  <ul class="mt-4 space-y-2">
    <li>
      <strong>Instant Updates:</strong> See changes immediately as you edit
    </li>
    <li>
      <strong>Interactive Testing:</strong> Test validation rules and field behavior
    </li>
    <li>
      <strong>Responsive View:</strong> Preview how your form looks on different
      screen sizes
    </li>
  </ul>

  <h2 class="mt-12 text-3xl font-bold">Working with Fields</h2>

  <h3 class="mt-8 text-2xl font-semibold">Available Field Types</h3>
  <p>Svelte Form Builder supports a wide range of field types:</p>

  <h4 class="mt-6 text-xl font-semibold">Basic Fields</h4>
  <ul class="mt-4 space-y-2">
    <li><strong>Text:</strong> Single-line text input</li>
    <li><strong>Email:</strong> Email input with validation</li>
    <li><strong>Password:</strong> Password input with show/hide toggle</li>
    <li><strong>Number:</strong> Numeric input with min/max constraints</li>
    <li><strong>Tel:</strong> Telephone number input</li>
    <li><strong>URL:</strong> URL input with validation</li>
    <li><strong>Textarea:</strong> Multi-line text input</li>
  </ul>

  <h4 class="mt-6 text-xl font-semibold">Selection Fields</h4>
  <ul class="mt-4 space-y-2">
    <li><strong>Select:</strong> Dropdown selection</li>
    <li><strong>Combobox:</strong> Searchable dropdown with autocomplete</li>
    <li>
      <strong>Radio Group:</strong> Single selection from multiple options
    </li>
    <li><strong>Checkbox:</strong> Boolean toggle</li>
    <li><strong>Switch:</strong> Toggle switch</li>
  </ul>

  <h4 class="mt-6 text-xl font-semibold">Advanced Fields</h4>
  <ul class="mt-4 space-y-2">
    <li><strong>Date:</strong> Date picker</li>
    <li><strong>Time:</strong> Time picker</li>
    <li><strong>File:</strong> File upload</li>
    <li><strong>Range:</strong> Slider for numeric ranges</li>
  </ul>

  <h4 class="mt-6 text-xl font-semibold">Layout Elements</h4>
  <ul class="mt-4 space-y-2">
    <li><strong>Title:</strong> Section heading</li>
    <li><strong>Description:</strong> Explanatory text</li>
    <li><strong>Separator:</strong> Visual divider</li>
  </ul>

  <h3 class="mt-8 text-2xl font-semibold">Field Configuration</h3>
  <p>Each field can be customized with various properties:</p>

  <h4 class="mt-6 text-xl font-semibold">Common Properties</h4>
  <ul class="mt-4 space-y-2">
    <li><strong>Label:</strong> Display name for the field</li>
    <li>
      <strong>Name:</strong> Form field identifier (used in code generation)
    </li>
    <li><strong>Placeholder:</strong> Hint text shown when field is empty</li>
    <li><strong>Description:</strong> Helper text displayed below the field</li>
    <li><strong>Required:</strong> Whether the field must be filled</li>
    <li><strong>Disabled:</strong> Whether the field is read-only</li>
  </ul>

  <h4 class="mt-6 text-xl font-semibold">Validation Properties</h4>
  <ul class="mt-4 space-y-2">
    <li><strong>Min Length:</strong> Minimum character count (text fields)</li>
    <li><strong>Max Length:</strong> Maximum character count (text fields)</li>
    <li><strong>Min Value:</strong> Minimum numeric value (number fields)</li>
    <li><strong>Max Value:</strong> Maximum numeric value (number fields)</li>
    <li><strong>Pattern:</strong> Regular expression for custom validation</li>
  </ul>

  <h2 class="mt-12 text-3xl font-bold">Validation Libraries</h2>
  <p>
    Svelte Form Builder supports three popular validation libraries. Choose the
    one that best fits your project:
  </p>

  <h3 class="mt-8 text-2xl font-semibold">Zod</h3>
  <p>
    The most popular TypeScript-first schema validation library. Great for
    complex validation logic and type inference.
  </p>

  <CodeBlock
    title="Zod Schema Example"
    lang="typescript"
    code={`import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be 18 or older'),
});`}
  />

  <h3 class="mt-8 text-2xl font-semibold">Valibot</h3>
  <p>
    A lightweight, modular alternative to Zod with excellent tree-shaking
    support. Perfect for bundle size-conscious projects.
  </p>

  <CodeBlock
    title="Valibot Schema Example"
    lang="typescript"
    code={`import * as v from 'valibot';

export const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, 'Name must be at least 2 characters')),
  email: v.pipe(v.string(), v.email('Invalid email address')),
  age: v.pipe(v.number(), v.minValue(18, 'Must be 18 or older')),
});`}
  />

  <h3 class="mt-8 text-2xl font-semibold">ArkType</h3>
  <p>
    The fastest TypeScript validation library with a unique syntax. Ideal for
    performance-critical applications.
  </p>

  <CodeBlock
    title="ArkType Schema Example"
    lang="typescript"
    code={`import { type } from 'arktype';

export const schema = type({
  name: 'string>=2',
  email: 'string.email',
  age: 'number>=18',
});`}
  />

  <h2 class="mt-12 text-3xl font-bold">Advanced Features</h2>

  <h3 class="mt-8 text-2xl font-semibold">Side-by-Side Fields</h3>
  <p>
    Create responsive layouts by placing two fields side-by-side in a single
    row:
  </p>
  <ol class="mt-4 space-y-2">
    <li>Add a field to your form</li>
    <li>Click the "Add to Right" button in the field's settings</li>
    <li>Select another field to place on the right side</li>
    <li>
      Both fields will appear horizontally on larger screens and stack on mobile
    </li>
  </ol>

  <div
    class="not-prose my-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950"
  >
    <div class="flex gap-3">
      <Info class="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
      <div class="text-sm text-blue-900 dark:text-blue-100">
        <p class="font-semibold mb-1">Tip</p>
        <p>
          Use side-by-side layouts for related fields like "First Name" and
          "Last Name" or "City" and "Postal Code" to create more compact,
          professional-looking forms.
        </p>
      </div>
    </div>
  </div>

  <h3 class="mt-8 text-2xl font-semibold">Form Templates</h3>
  <p>Save time by starting with pre-built templates:</p>
  <ul class="mt-4 space-y-2">
    <li><strong>Login Form:</strong> Email and password fields</li>
    <li><strong>Signup Form:</strong> Registration with email verification</li>
    <li><strong>Contact Form:</strong> Name, email, and message fields</li>
    <li><strong>Feedback Form:</strong> Rating and comments</li>
    <li><strong>Profile Form:</strong> User profile information</li>
    <li><strong>Reset Password:</strong> Password reset flow</li>
  </ul>

  <h3 class="mt-8 text-2xl font-semibold">Saving & Loading Forms</h3>
  <p>Never lose your work with the built-in save feature:</p>
  <ol class="mt-4 space-y-2">
    <li>Click the "Save" button in the header</li>
    <li>Give your form a descriptive name</li>
    <li>Your form is saved to browser local storage</li>
    <li>Load it later from the saved forms list</li>
    <li>Edit, duplicate, or delete saved forms as needed</li>
  </ol>

  <h3 class="mt-8 text-2xl font-semibold">Sharing Forms</h3>
  <p>Share your forms with team members or across devices:</p>
  <ol class="mt-4 space-y-2">
    <li>Click the "Share" button in the header</li>
    <li>Copy the generated share link</li>
    <li>Anyone with the link can view and edit the form</li>
    <li>The form data is encoded in the URL (no server storage)</li>
  </ol>

  <h2 class="mt-12 text-3xl font-bold">Code Generation</h2>

  <h3 class="mt-8 text-2xl font-semibold">Understanding Generated Code</h3>
  <p>When you click "View Code", the builder generates five essential files:</p>

  <h4 class="mt-6 text-xl font-semibold">1. Client Code (+page.svelte)</h4>
  <p>The Svelte component that renders your form. Includes:</p>
  <ul class="mt-4 space-y-2">
    <li>Form markup with all fields</li>
    <li>Superforms integration</li>
    <li>Error handling and display</li>
    <li>Success message handling</li>
  </ul>

  <h4 class="mt-6 text-xl font-semibold">2. Server Code (+page.server.ts)</h4>
  <p>The SvelteKit server-side code that handles form submission:</p>
  <ul class="mt-4 space-y-2">
    <li>Load function to initialize the form</li>
    <li>Form action to process submissions</li>
    <li>Server-side validation</li>
    <li>Error handling</li>
  </ul>

  <h4 class="mt-6 text-xl font-semibold">3. Schema (schema.ts)</h4>
  <p>The validation schema using your chosen library:</p>
  <ul class="mt-4 space-y-2">
    <li>Type-safe field definitions</li>
    <li>Validation rules</li>
    <li>Error messages</li>
  </ul>

  <h4 class="mt-6 text-xl font-semibold">4. JSON Export</h4>
  <p>A JSON representation of your form structure:</p>
  <ul class="mt-4 space-y-2">
    <li>Import/export form configurations</li>
    <li>Version control friendly</li>
    <li>Share with AI tools for modifications</li>
  </ul>

  <h4 class="mt-6 text-xl font-semibold">5. Installation Commands</h4>
  <p>Package manager commands to install required dependencies:</p>
  <ul class="mt-4 space-y-2">
    <li>Supports npm, pnpm, yarn, and bun</li>
    <li>Includes all necessary packages</li>
    <li>shadcn-svelte component installation</li>
  </ul>

  <h2 class="mt-12 text-3xl font-bold">Best Practices</h2>

  <h3 class="mt-8 text-2xl font-semibold">Form Design</h3>
  <ul class="mt-4 space-y-3">
    <li>
      <strong>Keep it Simple:</strong> Only ask for information you truly need
    </li>
    <li>
      <strong>Logical Flow:</strong> Order fields in a natural, logical sequence
    </li>
    <li>
      <strong>Clear Labels:</strong> Use descriptive, concise labels
    </li>
    <li>
      <strong>Helpful Descriptions:</strong> Provide context with field descriptions
    </li>
    <li>
      <strong>Group Related Fields:</strong> Use side-by-side layouts for related
      information
    </li>
  </ul>

  <h3 class="mt-8 text-2xl font-semibold">Validation</h3>
  <ul class="mt-4 space-y-3">
    <li>
      <strong>Client & Server:</strong> Always validate on both sides
    </li>
    <li>
      <strong>Clear Error Messages:</strong> Tell users exactly what's wrong and
      how to fix it
    </li>
    <li>
      <strong>Real-time Feedback:</strong> Show validation errors as users type
    </li>
    <li>
      <strong>Reasonable Constraints:</strong> Don't make validation too strict
    </li>
  </ul>

  <h3 class="mt-8 text-2xl font-semibold">Accessibility</h3>
  <ul class="mt-4 space-y-3">
    <li>
      <strong>Proper Labels:</strong> Every field should have a clear label
    </li>
    <li>
      <strong>Error Association:</strong> Link error messages to their fields
    </li>
    <li>
      <strong>Keyboard Navigation:</strong> Ensure forms work without a mouse
    </li>
    <li>
      <strong>Focus Management:</strong> Guide users through the form logically
    </li>
  </ul>

  <h2 class="mt-12 text-3xl font-bold">Troubleshooting</h2>

  <h3 class="mt-8 text-2xl font-semibold">Common Issues</h3>

  <h4 class="mt-6 text-xl font-semibold">Validation Not Working</h4>
  <p>If validation isn't working as expected:</p>
  <ul class="mt-4 space-y-2">
    <li>Ensure you've installed the correct validation library</li>
    <li>Check that the schema is imported correctly</li>
    <li>Verify the adapter matches your validation library</li>
    <li>Make sure field names match between schema and form</li>
  </ul>

  <h4 class="mt-6 text-xl font-semibold">Components Not Found</h4>
  <p>If you get import errors for UI components:</p>
  <ul class="mt-4 space-y-2">
    <li>Install missing shadcn-svelte components</li>
    <li>Check component import paths</li>
    <li>Ensure shadcn-svelte is properly configured</li>
  </ul>

  <h4 class="mt-6 text-xl font-semibold">Form Not Submitting</h4>
  <p>If your form doesn't submit:</p>
  <ul class="mt-4 space-y-2">
    <li>Check that the form action is defined in +page.server.ts</li>
    <li>Verify the enhance directive is applied to the form</li>
    <li>Look for JavaScript errors in the browser console</li>
    <li>Ensure all required fields are filled</li>
  </ul>

  <h2 class="mt-12 text-3xl font-bold">Next Steps</h2>
  <p>
    Now that you've mastered Svelte Form Builder, here are some ways to take
    your forms to the next level:
  </p>
  <ul class="mt-4 space-y-3">
    <li>
      Explore the <a href="/templates" class="text-primary hover:underline">
        Templates Gallery
      </a> for inspiration
    </li>
    <li>
      Try the <a href="/v2" class="text-primary hover:underline">
        V2 Builder
      </a> to create your first form
    </li>
    <li>
      Check out <a
        href="https://superforms.rocks"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary hover:underline"
      >
        SvelteKit Superforms documentation
      </a> for advanced features
    </li>
    <li>
      Join the community on <a
        href="https://github.com/SikandarJODD/form-builder"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary hover:underline"
      >
        GitHub
      </a>
    </li>
  </ul>
</div>

<DocNavigation prev={{ title: "Usage", url: "/docs/usage" }} />

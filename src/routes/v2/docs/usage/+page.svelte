<script lang="ts">
  import Heading from "$lib/components/v2/docs/Heading.svelte";
  import Subheading from "$lib/components/v2/docs/Subheading.svelte";
</script>

<svelte:head>
  <title>Usage - Form Builder V2</title>
  <meta
    name="description"
    content="How to use Form Builder V2 to create SvelteKit forms."
  />
</svelte:head>

<div class="mx-auto max-w-4xl px-6 py-8 pb-16">
  <Heading>Usage</Heading>
  <Subheading>How to build forms with Form Builder V2.</Subheading>

  <div class="mt-12">
    <h2 class="text-xl font-semibold mb-6">Quick Start</h2>
    <ol class="space-y-4 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary font-semibold">1.</span>
        <div>
          <strong class="text-foreground">Add Fields</strong>
          <p class="mt-1">
            Click field types from the left panel to add them to your form.
          </p>
        </div>
      </li>
      <li class="flex gap-3">
        <span class="text-primary font-semibold">2.</span>
        <div>
          <strong class="text-foreground">Customize</strong>
          <p class="mt-1">
            Click any field to expand and edit its settings (label, placeholder,
            validation).
          </p>
        </div>
      </li>
      <li class="flex gap-3">
        <span class="text-primary font-semibold">3.</span>
        <div>
          <strong class="text-foreground">Preview</strong>
          <p class="mt-1">
            See your form update in real-time on the right panel.
          </p>
        </div>
      </li>
      <li class="flex gap-3">
        <span class="text-primary font-semibold">4.</span>
        <div>
          <strong class="text-foreground">Generate Code</strong>
          <p class="mt-1">
            Press <kbd
              class="rounded border bg-muted px-2 py-0.5 font-mono text-xs"
              >Ctrl+M</kbd
            > or click the code button to generate files.
          </p>
        </div>
      </li>
    </ol>
  </div>

  <div class="mt-16">
    <h2 class="text-xl font-semibold mb-6">Panels</h2>
    <ul class="space-y-4 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <div>
          <strong class="text-foreground">Fields (Left)</strong>
          <p class="mt-1">
            All available field types. Click to add or use templates.
          </p>
        </div>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <div>
          <strong class="text-foreground">Editor (Center)</strong>
          <p class="mt-1">
            Your form with accordion controls. Drag to reorder fields.
          </p>
        </div>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <div>
          <strong class="text-foreground">Preview (Right)</strong>
          <p class="mt-1">Live preview with validation feedback.</p>
        </div>
      </li>
    </ul>
  </div>

  <div class="mt-16">
    <h2 class="text-xl font-semibold mb-6">Field Options</h2>
    <ul class="space-y-2 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary">•</span><span
          >Label and placeholder text</span
        >
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>Required/optional field</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>Min/max length validation</span
        >
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span
          >Pattern validation (regex)</span
        >
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>Custom error messages</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>Side-by-side layouts</span>
      </li>
    </ul>
  </div>

  <div class="mt-16">
    <h2 class="text-xl font-semibold mb-6">Keyboard Shortcuts</h2>
    <div class="space-y-3">
      <div class="flex items-center gap-4">
        <kbd
          class="rounded border bg-muted px-3 py-1.5 font-mono text-sm min-w-32"
          >Ctrl+S</kbd
        >
        <span class="text-muted-foreground">Save form</span>
      </div>
      <div class="flex items-center gap-4">
        <kbd
          class="rounded border bg-muted px-3 py-1.5 font-mono text-sm min-w-32"
          >Ctrl+M</kbd
        >
        <span class="text-muted-foreground">Open code modal</span>
      </div>
    </div>
  </div>

  <div class="mt-16">
    <h2 class="text-xl font-semibold mb-6">Generating Code</h2>
    <ol class="space-y-3 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary font-semibold">1.</span>
        <span
          >Press <kbd
            class="rounded border bg-muted px-2 py-0.5 font-mono text-xs"
            >Ctrl+M</kbd
          > or click the code button in the header</span
        >
      </li>
      <li class="flex gap-3">
        <span class="text-primary font-semibold">2.</span>
        <span>Choose your validation library (Zod, Valibot, or ArkType)</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary font-semibold">3.</span>
        <span>Copy the client code (+page.svelte)</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary font-semibold">4.</span>
        <span>Copy the server code (+page.server.ts)</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary font-semibold">5.</span>
        <span>Copy the schema (schema.ts)</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary font-semibold">6.</span>
        <span>Paste into your SvelteKit project</span>
      </li>
    </ol>
  </div>

  <div class="mt-16 rounded-lg border bg-muted/30 p-6">
    <h2 class="text-lg font-semibold mb-3">Need Help?</h2>
    <p class="text-muted-foreground leading-relaxed">
      Check the <a href="/v2/docs/features" class="text-primary hover:underline"
        >features page</a
      >
      for a complete list of capabilities, or visit the
      <a href="/docs" class="text-primary hover:underline">main docs</a> for detailed
      guides.
    </p>
  </div>
</div>

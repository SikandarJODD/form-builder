<script lang="ts">
  import Heading from "$lib/components/v2/docs/Heading.svelte";
  import Subheading from "$lib/components/v2/docs/Subheading.svelte";
</script>

<svelte:head>
  <title>Features - Form Builder V2</title>
  <meta
    name="description"
    content="Key features and improvements in Form Builder V2."
  />
</svelte:head>

<div class="mx-auto max-w-4xl px-6 py-8 pb-16">
  <Heading>Features</Heading>
  <Subheading>New features and improvements in V2.</Subheading>

  <div class="mt-12">
    <h2 class="text-xl font-semibold mb-6">What's New</h2>
    <ul class="space-y-4 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <div>
          <strong class="text-foreground">Accordion-Based Editor</strong>
          <p class="mt-1">
            Customize fields inline without modal dialogs. Expand any field to
            edit labels, placeholders, and validation.
          </p>
        </div>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <div>
          <strong class="text-foreground">3-Panel Layout</strong>
          <p class="mt-1">
            Fields, editor, and preview side-by-side. Resizable panels for your
            workflow.
          </p>
        </div>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <div>
          <strong class="text-foreground">Real-Time Preview</strong>
          <p class="mt-1">
            Form preview updates instantly with accurate styling and validation.
          </p>
        </div>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <div>
          <strong class="text-foreground">Keyboard Shortcuts</strong>
          <p class="mt-1">
            <kbd class="rounded border bg-muted px-2 py-0.5 font-mono text-xs"
              >Ctrl+S</kbd
            >
            to save forms,
            <kbd class="rounded border bg-muted px-2 py-0.5 font-mono text-xs"
              >Ctrl+M</kbd
            > to open code modal.
          </p>
        </div>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <div>
          <strong class="text-foreground">Better Templates</strong>
          <p class="mt-1">More templates with improved field configurations.</p>
        </div>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <div>
          <strong class="text-foreground">Dark Mode</strong>
          <p class="mt-1">Proper contrast and readable colors in dark mode.</p>
        </div>
      </li>
    </ul>
  </div>

  <div class="mt-16">
    <h2 class="text-xl font-semibold mb-6">Field Types</h2>
    <ul class="space-y-2 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary">•</span><span
          >Text, Email, Password, URL</span
        >
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>Number, Tel, Date, Time</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>Select, Multi-Select</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>Checkbox, Radio</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>Textarea, File Upload</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>Switch, Slider</span>
      </li>
    </ul>
  </div>

  <div class="mt-16">
    <h2 class="text-xl font-semibold mb-6">Validation Libraries</h2>
    <ul class="space-y-2 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary">•</span><span
          >Zod with TypeScript support</span
        >
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span
          >Valibot for smaller bundle size</span
        >
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span
          >ArkType for runtime validation</span
        >
      </li>
    </ul>
  </div>

  <div class="mt-16">
    <h2 class="text-xl font-semibold mb-6">Code Generation</h2>
    <ul class="space-y-2 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary">•</span><span
          >Client component (+page.svelte)</span
        >
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span
          >Server actions (+page.server.ts)</span
        >
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span
          >Validation schema (schema.ts)</span
        >
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span
          >SvelteKit Superforms integration</span
        >
      </li>
    </ul>
  </div>

  <div class="mt-16">
    <h2 class="text-xl font-semibold mb-6">Requirements</h2>
    <ul class="space-y-2 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>SvelteKit 2.0+</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>Svelte 5 (runes syntax)</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span><span>Node.js 18+</span>
      </li>
    </ul>
  </div>
</div>

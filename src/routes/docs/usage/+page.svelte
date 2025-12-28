<script lang="ts">
  import DocNavigation from "$lib/components/docs/DocNavigation.svelte";
  import CodeBlock from "$lib/components/docs/CodeBlock.svelte";
  import { MousePointerClick, Settings, Eye, Code } from "@lucide/svelte/icons";
</script>

<svelte:head>
  <title>Usage - Svelte Form Builder Documentation</title>
  <meta
    name="description"
    content="Learn how to use Svelte Form Builder to create forms quickly and efficiently. Step-by-step guide with examples."
  />
</svelte:head>

<div class="mx-auto max-w-4xl px-6 py-8 pb-16">
  <div class="prose prose-neutral dark:prose-invert max-w-none">
    <h1 class="text-4xl font-bold tracking-tight">Usage</h1>
    <p class="text-xl text-muted-foreground mt-4">
      Create validated forms quickly using Svelte Form Builder's intuitive
      interface.
    </p>
  </div>

  <div class="mt-12">
    <h2 class="text-2xl font-semibold mb-2">Quick Start</h2>
    <p class="text-muted-foreground mb-8 leading-relaxed">
      Follow these steps to create your first form:
    </p>
  </div>

  <div class="not-prose space-y-6">
    <div class="flex gap-4">
      <div
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold"
      >
        1
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
          <MousePointerClick class="h-5 w-5" />
          Add Fields
        </h3>
        <p class="text-muted-foreground leading-relaxed">
          Click any field type from the left panel to add it to your form—text,
          email, select, checkbox, date, and more.
        </p>
      </div>
    </div>

    <div class="flex gap-4">
      <div
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold"
      >
        2
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
          <Settings class="h-5 w-5" />
          Customize
        </h3>
        <p class="text-muted-foreground leading-relaxed">
          Expand any field in the editor to customize labels, placeholders,
          validation rules, and arrange fields side-by-side.
        </p>
      </div>
    </div>

    <div class="flex gap-4">
      <div
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold"
      >
        3
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
          <Eye class="h-5 w-5" />
          Preview
        </h3>
        <p class="text-muted-foreground leading-relaxed">
          Watch your form update instantly in the preview panel with accurate
          styling and validation.
        </p>
      </div>
    </div>

    <div class="flex gap-4">
      <div
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold"
      >
        4
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
          <Code class="h-5 w-5" />
          Generate Code
        </h3>
        <p class="text-muted-foreground leading-relaxed">
          Click the code button to generate client, server, and schema files.
          Copy to your SvelteKit project.
        </p>
      </div>
    </div>
  </div>

  <div class="prose prose-neutral dark:prose-invert max-w-none mt-16">
    <h2 class="text-2xl font-semibold">Interface Panels</h2>

    <div class="not-prose mt-6 space-y-4">
      <div class="rounded-lg border bg-card p-5">
        <h3 class="font-semibold mb-2">Fields Panel (Left)</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Browse and add field types. Search for specific fields or use
          templates for quick setup.
        </p>
      </div>

      <div class="rounded-lg border bg-card p-5">
        <h3 class="font-semibold mb-2">Editor Panel (Center)</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Customize fields with accordion controls. Drag to reorder and create
          side-by-side layouts.
        </p>
      </div>

      <div class="rounded-lg border bg-card p-5">
        <h3 class="font-semibold mb-2">Preview Panel (Right)</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Live preview with accurate styling and validation feedback.
        </p>
      </div>
    </div>

    <h2 class="mt-16 text-2xl font-semibold">Best Practices</h2>
    <ul class="mt-6 space-y-3 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Use templates to start quickly with common form patterns</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Test validation in the preview panel before generating code</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Group related fields side-by-side for better UX</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Save complex forms to local storage for later editing</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Add clear labels and helpful placeholder text</span>
      </li>
    </ul>
  </div>
</div>

<DocNavigation
  prev={{ title: "Installation", url: "/docs/installation" }}
  next={{ title: "Comprehensive Guide", url: "/docs/guide" }}
/>

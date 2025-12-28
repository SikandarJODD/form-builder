<script lang="ts">
  import DocNavigation from "$lib/components/docs/DocNavigation.svelte";
  import {
    Zap,
    Shield,
    Code,
    Palette,
    Boxes,
    Sparkles,
  } from "@lucide/svelte/icons";
</script>

<svelte:head>
  <title>Introduction - Svelte Form Builder Documentation</title>
  <meta
    name="description"
    content="Comprehensive documentation for Svelte Form Builder - A powerful, easy-to-use form builder for SvelteKit with built-in validation support."
  />
</svelte:head>

<div class="mx-auto max-w-4xl px-6 py-8 pb-16">
  <div class="prose prose-neutral dark:prose-invert max-w-none">
    <h1 class="text-4xl font-bold tracking-tight">Introduction</h1>
    <p class="text-xl text-muted-foreground mt-4">
      A powerful form builder for SvelteKit with built-in validation, code
      generation, and modern UI components.
    </p>
  </div>

  <div class="not-prose mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Zap class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Lightning Fast</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Build forms quickly with an intuitive interface and pre-built templates.
      </p>
    </div>

    <div class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Shield class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Type-Safe Validation</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Built-in support for Zod, Valibot, and ArkType with full TypeScript
        integration.
      </p>
    </div>

    <div class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Code class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Code Generation</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Generate client and server code with SvelteKit Superforms integration.
      </p>
    </div>

    <div class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Palette class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Modern Design</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Built with shadcn-svelte for accessible, customizable components.
      </p>
    </div>

    <div class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Boxes class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">3-Panel Workspace</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Efficient side-by-side layout with fields, editor, and preview panels.
      </p>
    </div>

    <div class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Sparkles class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Form Templates</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Start quickly with templates for authentication, contact forms, and more.
      </p>
    </div>
  </div>

  <div class="prose prose-neutral dark:prose-invert max-w-none mt-16">
    <h2 class="text-2xl font-semibold">What is Svelte Form Builder?</h2>
    <p class="leading-relaxed">
      A visual form builder for SvelteKit that generates production-ready code
      with validation. Create forms visually and export complete implementations.
    </p>

    <h3 class="text-xl font-semibold mt-8">Key Features</h3>
    <ul class="mt-4 space-y-2 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>15+ field types with comprehensive validation options</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Zod, Valibot, and ArkType schema support</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>SvelteKit Superforms integration</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Side-by-side field layouts for responsive forms</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Save, export, and share form configurations</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>shadcn-svelte components for modern UI</span>
      </li>
    </ul>

    <div class="mt-12 rounded-lg border bg-muted/30 p-6">
      <h3 class="text-lg font-semibold mb-3">Ready to Start?</h3>
      <p class="text-muted-foreground mb-6 leading-relaxed">
        Install dependencies and start building forms with the visual editor.
      </p>
      <div class="flex gap-4">
        <a
          href="/docs/installation"
          class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Installation Guide
        </a>
        <a
          href="/v2"
          class="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Open Builder
        </a>
      </div>
    </div>
  </div>
</div>

<DocNavigation next={{ title: "Installation", url: "/docs/installation" }} />

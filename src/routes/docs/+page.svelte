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

<div class="prose prose-neutral dark:prose-invert max-w-none">
  <h1 class="text-4xl font-bold tracking-tight">Introduction</h1>
  <p class="text-xl text-muted-foreground mt-4">
    Welcome to Svelte Form Builder - A powerful, intuitive form builder for
    SvelteKit applications with built-in validation and modern UI components.
  </p>

  <div class="not-prose mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-lg border bg-card p-6">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Zap class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Lightning Fast</h3>
      <p class="text-sm text-muted-foreground">
        Build forms in minutes with our intuitive drag-and-drop interface and
        pre-built templates.
      </p>
    </div>

    <div class="rounded-lg border bg-card p-6">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Shield class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Type-Safe Validation</h3>
      <p class="text-sm text-muted-foreground">
        Built-in support for Zod, Valibot, and ArkType schemas with full
        TypeScript support.
      </p>
    </div>

    <div class="rounded-lg border bg-card p-6">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Code class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Code Generation</h3>
      <p class="text-sm text-muted-foreground">
        Automatically generate client and server code with SvelteKit Superforms
        integration.
      </p>
    </div>

    <div class="rounded-lg border bg-card p-6">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Palette class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Beautiful UI</h3>
      <p class="text-sm text-muted-foreground">
        Built with shadcn-svelte components for a modern, accessible, and
        customizable design.
      </p>
    </div>

    <div class="rounded-lg border bg-card p-6">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Boxes class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">3-Panel Layout</h3>
      <p class="text-sm text-muted-foreground">
        Efficient workspace with fields panel, live editor, and real-time
        preview side-by-side.
      </p>
    </div>

    <div class="rounded-lg border bg-card p-6">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Sparkles class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Pre-built Templates</h3>
      <p class="text-sm text-muted-foreground">
        Start quickly with ready-to-use templates for login, signup, contact
        forms, and more.
      </p>
    </div>
  </div>

  <h2 class="mt-12 text-3xl font-bold">What is Svelte Form Builder?</h2>
  <p>
    Svelte Form Builder is a comprehensive form-building tool designed
    specifically for SvelteKit applications. It provides an intuitive visual
    interface for creating complex forms with validation, while automatically
    generating production-ready code.
  </p>

  <h3 class="mt-8 text-2xl font-semibold">Key Features</h3>
  <ul class="mt-4 space-y-2">
    <li>
      <strong>Visual Form Builder:</strong> Drag-and-drop interface with live preview
      and real-time updates
    </li>
    <li>
      <strong>Multiple Validation Libraries:</strong> Support for Zod, Valibot, and
      ArkType schemas
    </li>
    <li>
      <strong>SvelteKit Superforms Integration:</strong> Seamless integration with
      the most popular SvelteKit form library
    </li>
    <li>
      <strong>Code Generation:</strong> Automatically generate client-side components,
      server-side actions, and validation schemas
    </li>
    <li>
      <strong>Side-by-Side Fields:</strong> Create responsive layouts with fields
      arranged horizontally
    </li>
    <li>
      <strong>Form Management:</strong> Save, load, edit, and share your forms with
      ease
    </li>
    <li>
      <strong>Pre-built Templates:</strong> Start with templates for common use cases
      like authentication, contact forms, and more
    </li>
    <li>
      <strong>Customizable Components:</strong> Built on shadcn-svelte for easy theming
      and customization
    </li>
  </ul>

  <h3 class="mt-8 text-2xl font-semibold">Why Choose Svelte Form Builder?</h3>
  <p>
    Building forms in SvelteKit can be time-consuming and repetitive. Svelte
    Form Builder streamlines this process by:
  </p>
  <ul class="mt-4 space-y-2">
    <li>
      Eliminating boilerplate code - generate complete form implementations in
      seconds
    </li>
    <li>
      Ensuring type safety - all generated code is fully typed with TypeScript
    </li>
    <li>
      Providing best practices - follows SvelteKit and Superforms conventions
    </li>
    <li>
      Saving development time - focus on your application logic, not form
      implementation
    </li>
  </ul>

  <h3 class="mt-8 text-2xl font-semibold">Who is this for?</h3>
  <p>Svelte Form Builder is perfect for:</p>
  <ul class="mt-4 space-y-2">
    <li>
      <strong>SvelteKit Developers:</strong> Anyone building applications with SvelteKit
      who needs forms
    </li>
    <li>
      <strong>Teams:</strong> Development teams looking to standardize form implementation
    </li>
    <li>
      <strong>Rapid Prototyping:</strong> Quickly create functional forms for MVPs
      and prototypes
    </li>
    <li>
      <strong>Learning:</strong> Developers learning SvelteKit and form validation
      best practices
    </li>
  </ul>
</div>

<DocNavigation next={{ title: "Installation", url: "/docs/installation" }} />

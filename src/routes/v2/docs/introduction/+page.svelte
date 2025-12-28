<script lang="ts">
  import Heading from "$lib/components/v2/docs/Heading.svelte";
  import Subheading from "$lib/components/v2/docs/Subheading.svelte";
  import Zap from "@lucide/svelte/icons/zap";
  import Shield from "@lucide/svelte/icons/shield";
  import Code from "@lucide/svelte/icons/code";
  import Palette from "@lucide/svelte/icons/palette";
  import Boxes from "@lucide/svelte/icons/boxes";
  import Sparkles from "@lucide/svelte/icons/sparkles";
</script>

<svelte:head>
  <title>Introduction - Form Builder V2</title>
  <meta
    name="description"
    content="Introducing Form Builder V2 - Enhanced interface, improved workflow, and powerful features for building SvelteKit forms."
  />
</svelte:head>

<div class="mx-auto max-w-4xl px-6 py-8 pb-16">
  <Heading>Introduction</Heading>
  <Subheading>
    Build SvelteKit forms with validation and generate production-ready code.
  </Subheading>

  <div class="mt-12 grid gap-6 sm:grid-cols-2">
    <div
      class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Zap class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Fast</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Add fields, customize, and generate code in minutes.
      </p>
    </div>

    <div
      class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Shield class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Type-Safe</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Zod, Valibot, and ArkType support with TypeScript.
      </p>
    </div>

    <div
      class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Code class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Code Generation</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Generate client, server, and schema code with Superforms.
      </p>
    </div>

    <div
      class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Palette class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Modern UI</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Built with shadcn-svelte components.
      </p>
    </div>

    <div
      class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Boxes class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">3-Panel Layout</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Fields, editor, and preview side-by-side.
      </p>
    </div>

    <div
      class="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
      >
        <Sparkles class="h-6 w-6 text-primary" />
      </div>
      <h3 class="mb-2 text-lg font-semibold">Templates</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Pre-built forms for authentication, contact, and more.
      </p>
    </div>
  </div>

  <div class="mt-16">
    <h2 class="text-2xl font-semibold">Features</h2>
    <ul class="mt-6 space-y-3 text-muted-foreground">
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>15+ field types (text, email, select, checkbox, radio, date, etc.)</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Side-by-side field layouts</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Validation with instant preview</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Export and import forms</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Save to local storage</span>
      </li>
      <li class="flex gap-3">
        <span class="text-primary">•</span>
        <span>Dark mode</span>
      </li>
    </ul>
  </div>

  <div class="mt-16 rounded-lg border bg-muted/30 p-6">
    <h2 class="text-xl font-semibold mb-4">Get Started</h2>
    <p class="text-muted-foreground mb-6 leading-relaxed">
      Install dependencies or jump directly to the builder.
    </p>
    <div class="flex flex-wrap gap-4">
      <a
        href="/v2/docs/installation"
        class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Installation
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

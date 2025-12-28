<script lang="ts">
  import DocNavigation from "$lib/components/docs/DocNavigation.svelte";
  import { PMCommand } from "$lib/components/ui/pm-command";
  import { AlertCircle } from "@lucide/svelte/icons";
</script>

<svelte:head>
  <title>Installation - Svelte Form Builder Documentation</title>
  <meta
    name="description"
    content="Step-by-step installation guide for Svelte Form Builder. Learn how to set up and configure the form builder in your SvelteKit project."
  />
</svelte:head>

<div class="mx-auto max-w-4xl px-6 py-8 pb-16">
  <div class="prose prose-neutral dark:prose-invert max-w-none">
    <h1 class="text-4xl font-bold tracking-tight">Installation</h1>
    <p class="text-xl text-muted-foreground mt-4">
      Get started with Svelte Form Builder in minutes. This guide walks you
      through installing dependencies for your SvelteKit project.
    </p>

  <h2 class="mt-12 text-3xl font-bold">Prerequisites</h2>
  <p>Before you begin, make sure you have the following installed:</p>
  <ul class="mt-4 space-y-2">
    <li>
      <strong>Node.js:</strong> Version 18.0 or higher
    </li>
    <li>
      <strong>SvelteKit:</strong> Version 2.0 or higher
    </li>
    <li>
      <strong>Package Manager:</strong> npm, pnpm, yarn, or bun
    </li>
  </ul>

  <div class="not-prose my-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
    <div class="flex gap-3">
      <AlertCircle class="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
      <div class="text-sm text-blue-900 dark:text-blue-100">
        <p class="font-semibold mb-1">Note</p>
        <p>
          Svelte Form Builder is a web-based tool. You don't need to install it
          in your project. Simply visit the builder, create your form, and copy
          the generated code.
        </p>
      </div>
    </div>
  </div>

  <h2 class="mt-12 text-3xl font-bold">Using the Form Builder</h2>
  <p>
    Svelte Form Builder is available online at <a
      href="https://svelte-form-builder.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary hover:underline"
    >
      svelte-form-builder.vercel.app
    </a>. No installation required!
  </p>

  <h3 class="mt-8 text-2xl font-semibold">Quick Start</h3>
  <ol class="mt-4 space-y-3">
    <li>
      Visit <a
        href="https://svelte-form-builder.vercel.app/v2"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary hover:underline"
      >
        the V2 Builder
      </a>
    </li>
    <li>Design your form using the visual interface</li>
    <li>Generate your code (client, server, and schema)</li>
    <li>Copy the generated code to your SvelteKit project</li>
  </ol>

  <h2 class="mt-12 text-3xl font-bold">Installing Dependencies</h2>
  <p>
    After generating your form code, you'll need to install the required
    dependencies in your SvelteKit project.
  </p>

  <h3 class="mt-8 text-2xl font-semibold">Core Dependencies</h3>
  <p class="mb-6">Install SvelteKit Superforms and your chosen validation library:</p>

  <div class="not-prose space-y-4">
    <div>
      <p class="text-sm font-semibold mb-2">Using Zod</p>
      <PMCommand command="add" args={["sveltekit-superforms", "zod"]} />
    </div>

    <div>
      <p class="text-sm font-semibold mb-2">Using Valibot</p>
      <PMCommand command="add" args={["sveltekit-superforms", "valibot"]} />
    </div>

    <div>
      <p class="text-sm font-semibold mb-2">Using ArkType</p>
      <PMCommand command="add" args={["sveltekit-superforms", "arktype"]} />
    </div>
  </div>

  <h3 class="mt-8 text-2xl font-semibold">UI Components</h3>
  <p class="mb-6">
    The generated code uses shadcn-svelte components. Install base components:
  </p>

  <div class="not-prose mb-6">
    <PMCommand command="run" args={["shadcn-svelte@next", "add", "button", "label", "input"]} />
  </div>

  <p class="mt-6 mb-4">
    Install additional components based on your form fields:
  </p>

  <div class="not-prose space-y-3">
    <div>
      <p class="text-sm font-medium mb-2">Select, Checkbox, Radio</p>
      <PMCommand command="run" args={["shadcn-svelte@next", "add", "select", "checkbox", "radio-group"]} />
    </div>

    <div>
      <p class="text-sm font-medium mb-2">Textarea</p>
      <PMCommand command="run" args={["shadcn-svelte@next", "add", "textarea"]} />
    </div>

    <div>
      <p class="text-sm font-medium mb-2">Date Picker</p>
      <PMCommand command="run" args={["shadcn-svelte@next", "add", "calendar", "popover"]} />
    </div>

    <div>
      <p class="text-sm font-medium mb-2">Switch</p>
      <PMCommand command="run" args={["shadcn-svelte@next", "add", "switch"]} />
    </div>
  </div>

  <h3 class="mt-8 text-2xl font-semibold">Optional: Formsnap</h3>
  <p class="mb-4">
    For enhanced form handling with better TypeScript support:
  </p>

  <div class="not-prose">
    <PMCommand command="add" args={["formsnap"]} />
  </div>

  <h2 class="mt-12 text-3xl font-bold">Next Steps</h2>
  <p>
    After installing dependencies, visit the <a
      href="/v2"
      class="text-primary hover:underline"
    >
      Form Builder
    </a> to create your form and generate code.
  </p>
  </div>

  <DocNavigation
    prev={{ title: "Introduction", url: "/docs" }}
    next={{ title: "Usage", url: "/docs/usage" }}
  />
</div>


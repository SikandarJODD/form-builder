<script lang="ts">
  import DocNavigation from "$lib/components/docs/DocNavigation.svelte";
  import CodeBlock from "$lib/components/docs/CodeBlock.svelte";
  import { AlertCircle } from "@lucide/svelte/icons";
</script>

<svelte:head>
  <title>Installation - Svelte Form Builder Documentation</title>
  <meta
    name="description"
    content="Step-by-step installation guide for Svelte Form Builder. Learn how to set up and configure the form builder in your SvelteKit project."
  />
</svelte:head>

<div class="prose prose-neutral dark:prose-invert max-w-none">
  <h1 class="text-4xl font-bold tracking-tight">Installation</h1>
  <p class="text-xl text-muted-foreground mt-4">
    Get started with Svelte Form Builder in minutes. This guide will walk you
    through the installation and setup process.
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
      <AlertCircle class="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
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
  <p>Install SvelteKit Superforms and your chosen validation library:</p>

  <CodeBlock
    title="Using Zod"
    lang="bash"
    code={`npm install sveltekit-superforms zod`}
  />

  <CodeBlock
    title="Using Valibot"
    lang="bash"
    code={`npm install sveltekit-superforms valibot`}
  />

  <CodeBlock
    title="Using ArkType"
    lang="bash"
    code={`npm install sveltekit-superforms arktype`}
  />

  <h3 class="mt-8 text-2xl font-semibold">UI Components</h3>
  <p>
    The generated code uses shadcn-svelte components. Install the required
    components:
  </p>

  <CodeBlock
    title="Install shadcn-svelte components"
    lang="bash"
    code={`npx shadcn-svelte@next add button label input`}
  />

  <p class="mt-4">
    Depending on your form fields, you may need additional components:
  </p>

  <CodeBlock
    lang="bash"
    code={`# For select fields
npx shadcn-svelte@next add select

# For checkbox fields
npx shadcn-svelte@next add checkbox

# For radio buttons
npx shadcn-svelte@next add radio-group

# For textarea
npx shadcn-svelte@next add textarea

# For date picker
npx shadcn-svelte@next add calendar popover

# For switch
npx shadcn-svelte@next add switch`}
  />

  <h3 class="mt-8 text-2xl font-semibold">Optional: Formsnap</h3>
  <p>
    For enhanced form handling with better TypeScript support and cleaner code:
  </p>

  <CodeBlock
    lang="bash"
    code={`npm install formsnap`}
  />

  <h2 class="mt-12 text-3xl font-bold">Verification</h2>
  <p>
    To verify your installation, create a simple test form and ensure all
    dependencies are properly installed.
  </p>
</div>

<DocNavigation
  prev={{ title: "Introduction", url: "/docs" }}
  next={{ title: "Usage", url: "/docs/usage" }}
/>


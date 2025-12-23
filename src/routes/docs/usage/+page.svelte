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

<div class="prose prose-neutral dark:prose-invert max-w-none">
  <h1 class="text-4xl font-bold tracking-tight">Usage</h1>
  <p class="text-xl text-muted-foreground mt-4">
    Learn how to create beautiful, validated forms in minutes using Svelte Form
    Builder's intuitive interface.
  </p>

  <h2 class="mt-12 text-3xl font-bold">Quick Start Guide</h2>
  <p>
    Follow these simple steps to create your first form with Svelte Form
    Builder:
  </p>

  <div class="not-prose mt-8 space-y-6">
    <div class="flex gap-4">
      <div
        class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold"
      >
        1
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
          <MousePointerClick class="h-5 w-5" />
          Select Fields
        </h3>
        <p class="text-muted-foreground">
          Browse the fields panel on the left and click on any field type to add
          it to your form. You can add text inputs, email fields, checkboxes,
          select dropdowns, and more.
        </p>
      </div>
    </div>

    <div class="flex gap-4">
      <div
        class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold"
      >
        2
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
          <Settings class="h-5 w-5" />
          Customize Fields
        </h3>
        <p class="text-muted-foreground">
          Click on any field in the editor panel to expand its settings.
          Customize labels, placeholders, validation rules, and more. You can
          also arrange fields side-by-side for responsive layouts.
        </p>
      </div>
    </div>

    <div class="flex gap-4">
      <div
        class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold"
      >
        3
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
          <Eye class="h-5 w-5" />
          Preview in Real-Time
        </h3>
        <p class="text-muted-foreground">
          Watch your form come to life in the preview panel on the right. Every
          change you make is instantly reflected, so you can see exactly how
          your form will look and behave.
        </p>
      </div>
    </div>

    <div class="flex gap-4">
      <div
        class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold"
      >
        4
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
          <Code class="h-5 w-5" />
          Generate & Copy Code
        </h3>
        <p class="text-muted-foreground">
          Click the "View Code" button to generate your form code. Choose your
          validation library (Zod, Valibot, or ArkType) and copy the client,
          server, and schema code to your project.
        </p>
      </div>
    </div>
  </div>

  <h2 class="mt-12 text-3xl font-bold">Basic Example</h2>
  <p>Here's a simple example of creating a contact form:</p>

  <h3 class="mt-8 text-2xl font-semibold">1. Add Fields</h3>
  <p>Add the following fields to your form:</p>
  <ul class="mt-4 space-y-2">
    <li>Text input for "Name"</li>
    <li>Email input for "Email"</li>
    <li>Textarea for "Message"</li>
    <li>Checkbox for "Subscribe to newsletter"</li>
  </ul>

  <h3 class="mt-8 text-2xl font-semibold">2. Configure Validation</h3>
  <p>For each field, set up validation rules:</p>
  <ul class="mt-4 space-y-2">
    <li><strong>Name:</strong> Required, minimum 2 characters</li>
    <li><strong>Email:</strong> Required, valid email format</li>
    <li><strong>Message:</strong> Required, minimum 10 characters</li>
    <li><strong>Subscribe:</strong> Optional boolean</li>
  </ul>

  <h3 class="mt-8 text-2xl font-semibold">3. Generate Code</h3>
  <p>
    Click "View Code" and select your preferred validation library. The builder
    will generate three files:
  </p>

  <CodeBlock
    title="+page.svelte (Client)"
    lang="svelte"
    code={`\<script lang="ts"\>
  import { superForm } from 'sveltekit-superforms';
  import type { PageData } from './$types';
  import Label from '$lib/components/ui/label/label.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  let { data }: { data: PageData } = $props();

  const { form, errors, enhance, message } = superForm(data.form);
\<\/script>

<form method="post" use:enhance>
  <div>
    <Label for="name">Name</Label>
    <Input id="name" name="name" bind:value={$form.name} />
    {#if $errors.name}
      <p class="text-destructive">{$errors.name}</p>
    {/if}
  </div>

  <!-- More fields... -->

  <Button type="submit">Submit</Button>
</form>`}
  />

  <CodeBlock
    title="+page.server.ts (Server)"
    lang="typescript"
    code={`import type { Actions, PageServerLoad } from './$types';
import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';

export const load: PageServerLoad = async () => {
  return { form: await superValidate(zod(schema)) };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    // Process form data here

    return message(form, 'Form submitted successfully!');
  }
};`}
  />

  <h2 class="mt-12 text-3xl font-bold">Tips & Best Practices</h2>
  <ul class="mt-4 space-y-3">
    <li>
      <strong>Use Templates:</strong> Start with a pre-built template and customize
      it to save time
    </li>
    <li>
      <strong>Save Your Work:</strong> Use the save feature to store your forms and
      load them later
    </li>
    <li>
      <strong>Test Validation:</strong> Use the preview panel to test your validation
      rules before copying code
    </li>
    <li>
      <strong>Organize Fields:</strong> Use drag-and-drop to reorder fields and create
      logical form flow
    </li>
    <li>
      <strong>Side-by-Side Layouts:</strong> Group related fields horizontally for
      better UX on larger screens
    </li>
  </ul>
</div>

<DocNavigation
  prev={{ title: "Installation", url: "/docs/installation" }}
  next={{ title: "Comprehensive Guide", url: "/docs/guide" }}
/>

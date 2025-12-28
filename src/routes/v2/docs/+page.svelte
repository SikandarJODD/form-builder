<script lang="ts">
  import Heading from "$lib/components/v2/docs/Heading.svelte";
  import Subheading from "$lib/components/v2/docs/Subheading.svelte";
  import BookOpen from "@lucide/svelte/icons/book-open";
  import Download from "@lucide/svelte/icons/download";
  import Rocket from "@lucide/svelte/icons/rocket";
  import Heart from "@lucide/svelte/icons/heart";
  import Code2 from "@lucide/svelte/icons/code-2";
  import Sparkles from "@lucide/svelte/icons/sparkles";
</script>

<svelte:head>
  <title>Form Builder V2 Documentation</title>
  <meta
    name="description"
    content="Form Builder V2 documentation - Learn how to create validated SvelteKit forms with the enhanced interface."
  />
</svelte:head>

<div class="mx-auto max-w-4xl px-6 py-8 pb-16">
  <Heading>Form Builder V2 Documentation</Heading>
  <Subheading>
    Everything you need to know about building forms with the enhanced V2
    interface.
  </Subheading>

  <!-- Quick Links -->
  <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <a
      href="/v2/docs/introduction"
      class="group rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
      >
        <BookOpen class="h-6 w-6 text-primary" />
      </div>
      <h3 class="text-lg font-semibold mb-2">Introduction</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Learn about V2 features, improvements, and what makes it powerful for
        form creation.
      </p>
    </a>

    <a
      href="/v2/docs/features"
      class="group rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
      >
        <Sparkles class="h-6 w-6 text-primary" />
      </div>
      <h3 class="text-lg font-semibold mb-2">Features</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Explore all the new features and enhancements in Form Builder V2.
      </p>
    </a>

    <a
      href="/v2/docs/installation"
      class="group rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
      >
        <Download class="h-6 w-6 text-primary" />
      </div>
      <h3 class="text-lg font-semibold mb-2">Installation</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Set up dependencies and get started with Form Builder V2 in your
        project.
      </p>
    </a>

    <a
      href="/v2/docs/usage"
      class="group rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
      >
        <Code2 class="h-6 w-6 text-primary" />
      </div>
      <h3 class="text-lg font-semibold mb-2">Usage Guide</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Learn how to use the interface, customize fields, and generate code.
      </p>
    </a>

    <a
      href="/v2"
      class="group rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
      >
        <Rocket class="h-6 w-6 text-primary" />
      </div>
      <h3 class="text-lg font-semibold mb-2">Open Builder</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Jump directly to the Form Builder and start creating forms now.
      </p>
    </a>

    <a
      href="https://github.com/sponsors/SikandarJODD"
      target="_blank"
      rel="noopener noreferrer"
      class="group rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-pink-500"
    >
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors"
      >
        <Heart class="h-6 w-6 text-pink-500" />
      </div>
      <h3 class="text-lg font-semibold mb-2">Support</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Support the project through GitHub Sponsors and help keep it maintained.
      </p>
    </a>
  </div>

  <!-- Getting Started Section -->
  <div class="mt-16">
    <h2 class="text-2xl font-semibold mb-6">Getting Started</h2>
    <div class="space-y-4">
      <div class="rounded-lg border-l-4 border-primary bg-card/50 p-5">
        <h3 class="font-semibold mb-2">1. Check the Introduction</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Start by reading the <a
            href="/v2/docs/introduction"
            class="text-primary hover:underline">introduction</a
          > to understand what V2 offers and the key features available.
        </p>
      </div>

      <div class="rounded-lg border-l-4 border-primary bg-card/50 p-5">
        <h3 class="font-semibold mb-2">2. Install Dependencies</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Follow the <a
            href="/v2/docs/installation"
            class="text-primary hover:underline">installation guide</a
          > to set up SvelteKit Superforms, validation libraries, and UI components.
        </p>
      </div>

      <div class="rounded-lg border-l-4 border-primary bg-card/50 p-5">
        <h3 class="font-semibold mb-2">3. Learn the Interface</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Read the <a href="/v2/docs/usage" class="text-primary hover:underline"
            >usage guide</a
          > to learn about the 3-panel workspace, keyboard shortcuts, and best practices.
        </p>
      </div>

      <div class="rounded-lg border-l-4 border-primary bg-card/50 p-5">
        <h3 class="font-semibold mb-2">4. Start Building</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Open the <a href="/v2" class="text-primary hover:underline"
            >Form Builder</a
          > and start creating your forms with the enhanced interface.
        </p>
      </div>
    </div>
  </div>

  <!-- Support Card -->
  <div
    class="mt-16 rounded-lg border border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 dark:border-pink-900 p-8"
  >
    <div class="flex gap-4 items-start">
      <div
        class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-pink-500/20"
      >
        <Heart class="h-8 w-8 text-pink-500" />
      </div>
      <div class="flex-1">
        <h2 class="text-2xl font-semibold mb-3">Support This Project</h2>
        <p class="text-muted-foreground leading-relaxed mb-6">
          Form Builder is free and open source. If you find it useful, consider
          supporting its development through GitHub Sponsors. Your support helps
          maintain the project, add new features, and keep the documentation
          up-to-date.
        </p>
        <div class="flex flex-wrap gap-4">
          <a
            href="https://github.com/sponsors/SikandarJODD"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 justify-center rounded-md bg-pink-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-pink-600 transition-colors"
          >
            <Heart class="h-4 w-4" />
            Sponsor on GitHub
          </a>
          <a
            href="https://github.com/SikandarJODD/form-builder"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

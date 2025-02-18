<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  import Separator from "$lib/components/ui/separator/separator.svelte";
</script>

<h2 class="text-2xl font-semibold">Usage</h2>
<p class="text-muted-foreground">
  you can simply follow the steps to build forms.
</p>
<Separator class="mt-2" />

<div class="mt-4 text-muted-foreground">
  <ul class="space-y-1">
    <li>1. Select input fields from the list of available fields.</li>
    <li>2. Edit input parameters like <code>min, max, required, type</code></li>
    <li>3. Re-order list based on your needs. (Drag and Drop)</li>
    <li>4. Select <code>Schema</code> and Copy Code. (Zod | Valibot)</li>
    <li>
      5. Copy <code>+page.svelte (Client)</code> and
      <code>+page.server.ts (Server)</code> Code
    </li>
    <li>6. Paste the code in your project.</li>
  </ul>
  <Separator class="my-4" />
  <p>
    Enjoy, If you found any issue you can raise issue on <a
      class="text-primary"
      target="_blank"
      href="https://github.com/SikandarJODD/form-builder/issues">Github</a
    >
    or ping me on
    <a target="_blank" class="text-primary" href="https://x.com/Sikandar_Bhide"
      >Twitter</a
    >
  </p>
  <p>
    Build with ❤️ by
    <a
      href="https://twitter.com/iamshadmirza"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary hover:underline">Bhide Svelte</a
    >
  </p>
</div>

<style>
  ul li > code {
    @apply bg-zinc-900 px-2 py-1 rounded-[2px] text-primary;
  }
</style>

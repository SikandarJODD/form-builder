<script lang="ts">
  import Separator from "$lib/components/ui/separator/separator.svelte";
</script>

<h2 class="text-2xl font-semibold">Usage</h2>
<p class="text-muted-foreground">
  you can simply follow the steps to build forms.
</p>
<Separator class="mt-2" />

<div class="mt-4 text-pretty">
  <ul class="space-y-1">
    <li>1. Select input fields from the list of available fields.</li>
    <li>2. Edit input parameters like min, max, required...</li>
    <li>3. Re-order list based on your needs. (Drag and Drop)</li>
    <li>4. Select Schema and Copy Code. (Zod | Valibot)</li>
    <li>5. Copy +page.svelte (Client) and +page.server.ts (Server) Code</li>
    <li>6. Paste the code in your project.</li>
  </ul>
  <Separator class="my-4" />

  <p class='text-center text-muted-foreground'>
    Build with ❤️ by
    <a
      href="https://twitter.com/iamshadmirza"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary underline underline-offset-2">Bhide Svelte</a
    >
  </p>
</div>



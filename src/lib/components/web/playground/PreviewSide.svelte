<script lang="ts">
  import InputsDragCode from "./InputsDragCode.svelte";
  import PreviewAndCode from "./PreviewAndCode.svelte";
</script>

<div class="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
  <div class="size-full">
    <div class="mb-6 max-w-5xl space-y-3">
      <h1 class="text-2xl font-bold">Playground</h1>
      <p class="text-muted-foreground">
        After successfully installing Shadcn-Svelte, you can simply copy and
        paste the generated form components to get started. Some components may
        have additional dependencies, so make sure to review their documentation
        in the <a href="/">README</a> for further instructions.
      </p>
    </div>
    <div class="grid grid-cols-5 gap-10 max-w-7xl">
      <InputsDragCode />
      <PreviewAndCode />
    </div>
  </div>
</div>

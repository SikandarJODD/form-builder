<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
</script>

<div
  class="border-b border-accent px-4 py-10 sm:px-6 lg:pl-8 xl:w-48 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6 min-h-[90vh]"
>
  <div class="space-y-2 flex flex-col items-start">
    {#each form_generator.inputs as item, index}
      <Button
        onclick={() => form_generator.add_input(item)}
        class="rounded-full font-normal"
        size="sm"
        variant="outline"
      >
        {item.name}
      </Button>
    {/each}
  </div>
</div>

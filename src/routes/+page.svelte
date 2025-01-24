<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { flip } from "svelte/animate";
  import { dragHandleZone, dragHandle } from "svelte-dnd-action";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
  import EditSelectedInputs from "$lib/form-generator/comps/EditSelectedInputs.svelte";

  let flipDurationMs = 300;
</script>

<div class="p-20 space-y-2">
  <div class="space-x-2">
    {#each form_generator.inputs as item, index}
      <Button onclick={() => form_generator.add_input(item)} variant="outline">
        {item.name}
      </Button>
    {/each}
  </div>
  <div
    class="w-fit space-y-2 border min-w-96 p-2"
    use:dragHandleZone={{
      items: form_generator.selected_inputs,
      flipDurationMs,
    }}
    onconsider={form_generator.handleDndConsider}
    onfinalize={form_generator.handleDndFinalize}
  >
    {#each form_generator.selected_inputs as item (item.id)}
      <div
        class="flex items-center gap-2"
        animate:flip={{ duration: flipDurationMs }}
      >
        <button
          class="handle"
          use:dragHandle
          aria-label="drag-handle for {item.name}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-grip-vertical"
            ><circle cx="9" cy="12" r="1" /><circle
              cx="9"
              cy="5"
              r="1"
            /><circle cx="9" cy="19" r="1" /><circle
              cx="15"
              cy="12"
              r="1"
            /><circle cx="15" cy="5" r="1" /><circle
              cx="15"
              cy="19"
              r="1"
            /></svg
          >
        </button>
        <div
          class="border rounded-md px-1 py-1 flex items-center justify-between min-w-40"
        >
          <span class="capitalize pl-1">{item.type}</span>
          <div>
            <EditSelectedInputs bind:item />
            <Button variant="secondary" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-trash-2"
                ><path d="M3 6h18" /><path
                  d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
                /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line
                  x1="10"
                  x2="10"
                  y1="11"
                  y2="17"
                /><line x1="14" x2="14" y1="11" y2="17" /></svg
              >
            </Button>
          </div>
        </div>
      </div>
    {:else}
      No Selected Inputs
    {/each}
  </div>
  <div class="whitespace-pre-wrap mt-2">
    {form_generator.zodSchema}
  </div>
</div>

<style>
</style>

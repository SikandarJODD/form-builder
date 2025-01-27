<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { flip } from "svelte/animate";
  import { dragHandleZone, dragHandle } from "svelte-dnd-action";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
  import EditSelectedInputs from "$lib/form-generator/comps/EditSelectedInputs.svelte";
  import { fade, fly, scale } from "svelte/transition";
  import GripVertical from "lucide-svelte/icons/grip-vertical";
  let flipDurationMs = 300;
  let delete_selected_input = (id: string | undefined) => {
    if (id) {
      form_generator.remove_input(id);
    }
  };
</script>

<div
  class="w-fit space-y-2 p-2"
  use:dragHandleZone={{
    items: form_generator.selected_inputs,
    flipDurationMs,
  }}
  onconsider={form_generator.handleDndConsider}
  onfinalize={form_generator.handleDndConsider}
>
  {#each form_generator.selected_inputs as item (item.id)}
    <div
      animate:flip={{ duration: flipDurationMs }}
      in:fly={{ y: 20 }}
      class="flex items-center gap-1 handle"
    >
      <button
        use:dragHandle
        aria-label="drag-handle for {item.id}"
        class="handle"
      >
        <GripVertical strokeWidth={1.4} />
      </button>
      <div
        class="border rounded-lg px-1 py-1 flex items-center justify-between min-w-56"
      >
        <span class="capitalize pl-1">{item.name}</span>
        <div>
          <EditSelectedInputs {item} />
          <!-- Delete Button -->
          <Button
            onclick={() => delete_selected_input(item.id)}
            variant="secondary"
            size="icon"
          >
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
    <span class="text-muted-foreground">
      Add new Inputs for Creating Forms
    </span>
  {/each}
</div>

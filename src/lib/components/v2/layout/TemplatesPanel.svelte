<script lang="ts">
  import { formV2 } from "../state/form-v2.svelte";
  import { templates } from "../utils/templates";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { savedFormsV2 } from "../state/form-v2.svelte";
  import FileText from "@lucide/svelte/icons/file-text";
  import Heart from "@lucide/svelte/icons/heart";
  import SavedFormItem from "../ui/SavedFormItem.svelte";

  const handleTemplateClick = (templateIndex: number) => {
    const template = templates[templateIndex];
    formV2.loadTemplate(template.rows);
    // Stay on templates tab so user can see all templates
  };
</script>

<div class="flex h-full flex-col bg-background">
  <!-- Header -->
  <div class="border-b p-4">
    <h3 class="font-semibold text-sm">Templates</h3>
    <p class="text-xs text-muted-foreground">Saved forms & templates</p>
  </div>

  <ScrollArea class="flex-1" scrollbarYClasses="hidden">
    <!-- Saved Forms Section -->
    {#if savedFormsV2.current.length > 0}
      <div class="px-4 pt-4 pb-2">
        <h3
          class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          <Heart class="h-3.5 w-3.5" />
          Saved Forms
        </h3>
      </div>
      <div class="px-2 pb-4">
        {#each savedFormsV2.current as form}
          <SavedFormItem {form} />
        {/each}
      </div>

      <!-- Separator -->
      <div class="mx-4 mb-4 border-t"></div>
    {/if}

    <!-- Templates Section -->
    <div class="px-4 pt-2 pb-2">
      <h3
        class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        <FileText class="h-3.5 w-3.5" strokeWidth={1.6} />
        Templates
      </h3>
    </div>
    <div class="px-2 pb-4">
      {#each templates as template, index}
        <button
          onclick={() => handleTemplateClick(index)}
          class="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-accent"
        >
          <!-- Template Icon -->
          <div class="shrink-0 rounded-md bg-muted p-1.5">
            <FileText class="h-4 w-4 text-muted-foreground" strokeWidth={1.6} />
          </div>

          <!-- Template Info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">{template.name}</p>
            <p class="text-xs text-muted-foreground mt-0.5">
              {template.rows.reduce(
                (count, row) => count + row.fields.length,
                0
              )} fields
            </p>
          </div>
        </button>
      {/each}
    </div>
  </ScrollArea>
</div>

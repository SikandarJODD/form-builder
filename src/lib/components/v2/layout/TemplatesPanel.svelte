<script lang="ts">
  import { formV2 } from "../state/form-v2.svelte";
  import { templates } from "../utils/templates";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import FileText from "@lucide/svelte/icons/file-text";

  const handleTemplateClick = (templateIndex: number) => {
    const template = templates[templateIndex];
    formV2.loadTemplate(template.rows);
    // Stay on templates tab so user can see all templates
  };
</script>

<div class="flex h-full flex-col bg-background">
  <!-- Header -->
  <div class="border-b p-4">
    <h2 class="text-lg font-semibold">Template</h2>
    <p class="text-sm text-muted-foreground">Predefined Template's</p>
  </div>

  <!-- Templates Section Header -->
  <div class="border-b px-4 py-3">
    <h3 class="text-sm font-medium">Templates</h3>
  </div>

  <!-- Templates List -->
  <ScrollArea class="flex-1">
    <div class="flex flex-col">
      {#each templates as template, index}
        <button
          onclick={() => handleTemplateClick(index)}
          class="flex items-center gap-3 border-b px-4 py-3 text-left transition-colors hover:bg-accent"
        >
          <!-- Template Icon -->
          <div class="shrink-0">
            <FileText class="h-5 w-5 text-muted-foreground" />
          </div>

          <!-- Template Info -->
          <div class="flex-1">
            <p class="text-sm font-medium">{template.name}</p>
          </div>
        </button>
      {/each}
    </div>
  </ScrollArea>
</div>

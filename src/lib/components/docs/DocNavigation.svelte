<script lang="ts">
  import { ChevronLeft, ChevronRight } from "@lucide/svelte/icons";
  import Button from "$lib/components/ui/button/button.svelte";

  interface NavItem {
    title: string;
    url: string;
  }

  interface Props {
    prev?: NavItem;
    next?: NavItem;
  }

  let { prev, next }: Props = $props();
</script>

<div class="mt-12 flex items-center justify-between border-t pt-8">
  <div class="flex-1">
    {#if prev}
      <a href={prev.url} class="group block">
        <Button
          variant="ghost"
          class="h-auto flex-col items-start gap-1 p-4 hover:bg-accent"
        >
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <ChevronLeft class="h-4 w-4" />
            <span>Previous</span>
          </div>
          <span
            class="text-base font-medium group-hover:text-primary transition-colors"
          >
            {prev.title}
          </span>
        </Button>
      </a>
    {/if}
  </div>

  <div class="flex-1 text-right">
    {#if next}
      <a href={next.url} class="group block">
        <Button
          variant="ghost"
          class="h-auto flex-col items-end gap-1 p-4 hover:bg-accent"
        >
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Next</span>
            <ChevronRight class="h-4 w-4" />
          </div>
          <span
            class="text-base font-medium group-hover:text-primary transition-colors"
          >
            {next.title}
          </span>
        </Button>
      </a>
    {/if}
  </div>
</div>


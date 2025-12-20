<!--
	jsrepo 1.29.1
	Installed from github/ieedan/shadcn-svelte-extras
	30-1-2025
-->

<script lang="ts">
  import X from "@lucide/svelte/icons/x";

  type Props = {
    value: string;
    disabled: boolean;
    active: boolean;
    onDelete: (value: string) => void;
  };

  let { value, disabled, onDelete, active }: Props = $props();
</script>

<div
  class="flex place-items-center gap-2 rounded-md bg-secondary px-1.5 py-1 ring-offset-background transition-all hover:cursor-default hover:bg-secondary/90 aria-selected:bg-secondary/90 aria-selected:ring-2 aria-selected:ring-ring aria-selected:ring-offset-2 text-sm"
  aria-selected={active}
>
  <span>
    {value}
  </span>
  <button type="button" {disabled} onclick={() => onDelete(value)}>
    <X class="size-4" />
  </button>
</div>

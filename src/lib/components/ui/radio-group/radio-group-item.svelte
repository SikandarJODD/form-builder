<script lang="ts">
  import {
    RadioGroup as RadioGroupPrimitive,
    type WithoutChildrenOrChild,
  } from "bits-ui";
  import { cn } from "$lib/utils.js";
  import { Check, CheckCircle } from "lucide-svelte";
  import { draw, fade, scale } from "svelte/transition";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> & {
    value: string;
  } = $props();
</script>

<RadioGroupPrimitive.Item
  bind:ref
  class={cn(
    "border-primary text-primary focus-visible:ring-ring aspect-square size-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    <div class="flex items-center justify-center">
      {#if checked}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-3"><path d="M20 6 9 17l-5-5" /></svg
        >
      {/if}
    </div>
  {/snippet}
</RadioGroupPrimitive.Item>

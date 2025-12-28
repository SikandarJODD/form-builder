<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { onMount } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLAttributes<HTMLHeadingElement>, "id"> {
    class?: string;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();

  let ref = $state<HTMLHeadingElement>();
  let id = $state<string>();

  onMount(() => {
    id = ref?.innerText.split(" ").join("-").toLowerCase();
  });
</script>

<p
  bind:this={ref}
  {id}
  class={cn("mt-2 scroll-m-20 pb-1 text-base text-muted-foreground", className)}
  {...rest}
>
  {@render children?.()}
</p>

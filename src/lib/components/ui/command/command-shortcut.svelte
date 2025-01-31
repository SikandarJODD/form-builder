<!--
	jsrepo 1.29.1
	Installed from github/ieedan/shadcn-svelte-extras
	31-1-2025
-->

<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '../utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
	bind:this={ref}
	class={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
	{...restProps}
>
	{@render children?.()}
</span>

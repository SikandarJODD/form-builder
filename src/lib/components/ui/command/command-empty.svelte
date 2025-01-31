<!--
	jsrepo 1.29.1
	Installed from github/ieedan/shadcn-svelte-extras
	31-1-2025
-->

<script lang="ts">
	import { Command as CommandPrimitive } from 'bits-ui';
	import { cn } from '../utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CommandPrimitive.EmptyProps = $props();
</script>

<CommandPrimitive.Empty class={cn('py-6 text-center text-sm', className)} {...restProps} />

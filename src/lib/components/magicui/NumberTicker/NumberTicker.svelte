<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { cn } from '$lib/utils';
	import { watch } from 'runed';

	let { class: className = '', value = 10, initial = 0, duration = 2800, ...rest } = $props();
	let num = new Tween(value, {
		duration: duration,
		easing: cubicOut
	});
	watch(
		() => value,
		() => {
			num.set(value);
		}
	);
</script>

<div class={cn('inline-block  tracking-normal text-black dark:text-white', className)} {...rest}>
	{num.current.toFixed(0)}
</div>

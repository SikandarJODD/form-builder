<script lang="ts">
	let { children, class: className = '', shimmerWidth = 100 } = $props();
</script>

<p
	style:--shimmer-width="{shimmerWidth}px"
	class={[
		'mx-auto max-w-md text-neutral-600/50 dark:text-neutral-400/50 ',

		// Shimmer effect
		'animate-shimmer bg-size-[var(--shimmer-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',

		// Shimmer gradient
		'bg-linear-to-r from-transparent via-black/80 via-50% to-transparent  dark:via-white/80',

		className
	]}
>
	{#if children}{@render children()}{:else}Shimmer Animation{/if}
</p>

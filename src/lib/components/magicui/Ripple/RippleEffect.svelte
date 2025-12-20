<script lang="ts">
	let { mainCircleSize = 210, mainCircleOpacity = 0.24, numCircles = 8, class: _class } = $props();
</script>

<div
	class={[
		'absolute inset-0 flex items-center justify-center bg-white/5 mask-[linear-gradient(to_bottom,white,transparent)]',
		_class
	]}
>
	{#each { length: numCircles } as _, i}
		<div
			class="animate-ripple absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 rounded-full border bg-foreground/30 shadow-xl [--i:{i}]"
			style="width: {mainCircleSize + i * 70}px;
         height: {mainCircleSize + i * 70}px;
         opacity: {mainCircleOpacity - i * 0.03};
         animation-delay: {i * 0.08}s;
         border-style:{i === numCircles - 1 ? 'dashed' : 'solid'};
         border-width: 1px;
         border-color: rgba(var(--foreground-rgb), {(5 + i * 5) / 100});
        "
		></div>
	{/each}
</div>

<!--

 -->

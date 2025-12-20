<script>
	import FlickeringGrid from '$lib/components/magicui/FlickeringGrid/FlickeringGrid.svelte';
	import SafariMock from '$lib/components/magicui/SafariMock/SafariMock.svelte';
	import Img3 from '$lib/images/img3.png';
</script>

<FlickeringGrid
	class="absolute inset-0 z-0 [mask:radial-gradient(circle_at_center,#fff_400px,transparent_0)]"
	squareSize={4}
	gridGap={6}
	color="#000"
	maxOpacity={0.1}
	flickerChance={0.1}
	height={800}
	width={800}
/>
<SafariMock
	imageSrc={Img3}
	class="mt-16 -mb-48 ml-12 h-full px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 select-none group-hover:translate-x-[-10px]"
/>

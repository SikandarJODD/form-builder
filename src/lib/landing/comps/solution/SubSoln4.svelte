<script>
	import RippleEffect from '$lib/components/magicui/Ripple/RippleEffect.svelte';
	import SafariMock from '$lib/components/magicui/SafariMock/SafariMock.svelte';
	import Img4 from '$lib/images/img4.png';
</script>

<RippleEffect class="absolute -bottom-full" />
<SafariMock
	imageSrc={Img4}
	url="https://acme.ai"
	class="mt-4 -mb-32 max-h-64 w-full px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 select-none group-hover:translate-y-[-10px]"
/>

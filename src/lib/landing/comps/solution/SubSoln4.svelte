<script>
  import RippleEffect from "$lib/components/magicui/Ripple/RippleEffect.svelte";
  import SafariMock from "$lib/components/magicui/SafariMock/SafariMock.svelte";
  import Img4 from "$lib/images/img4.png";
</script>

<RippleEffect class="absolute -bottom-full" />
<SafariMock
  imageSrc={Img4}
  url="https://acme.ai"
  class="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
/>




<script>
	import LocationSelector from '$lib/components/templates/comps/LocationSelector.svelte';
	import LocationSelectorCode from '$lib/components/templates/comps/LocationSelector.svelte?raw';
  import CopyCode from "$lib/components/web/playground/code/CopyCode.svelte";

  let rawcode = LocationSelectorCode;
</script>

<h2 class="text-2xl font-semibold">Location Input</h2>

<p class="text-muted-foreground">
  A dropdown components which contains all countries and their states.
</p>
<div class="w-full max-w-2xl mt-4 relative overflow-hidden scrollbar ">
  <CopyCode code={rawcode} lang="svelte" class="h-[400px]" />
</div>
<h3 class="text-xl font-semibold mt-6">Preview</h3>
<div
  class="mt-2 border border-dashed border-muted-foreground p-4 w-full min-h-64 flex justify-center items-center"
>
  <div class="w-fit mx-auto">
    <LocationSelector />
  </div>
</div>

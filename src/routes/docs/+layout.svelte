<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Sidebar from '$lib/components/docs/comps/Sidebar.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="mx-auto max-w-5xl py-4">
	<Sidebar>
		{@render children()}
	</Sidebar>
</div>

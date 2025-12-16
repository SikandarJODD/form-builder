<!--
	jsrepo 1.29.1
	Installed from github/ieedan/shadcn-svelte-extras
	31-1-2025
-->

<script lang="ts">
	import type { Country } from 'svelte-tel-input/types';

	interface Props {
		country?: Country | null;
	}

	let { country = null }: Props = $props();
</script>

<span class="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
	{#if country}
		<span
			aria-label="{country.name} flag."
			class="flag flag-{country.iso2.toLowerCase()} mr-3 shrink-0"
		></span>
	{/if}
</span>

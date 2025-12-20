<script lang="ts">
	// add your own path
	import type { PageData } from './$types';
	import CopyCode from '$lib/components/web/playground/code/CopyCode.svelte';
	import ForgotPassword from '$lib/components/templates/forms/ForgotPassword.svelte';
	import ForgotPasswordCode from '$lib/components/templates/forms/ForgotPassword.svelte?raw';
	import { pageServerCode } from '../../serverCopyCode';
	import TemplatesTabs from '$lib/components/templates/comps/TemplatesTabs.svelte';

	let tab_value = $state('preview');
	let {
		data
	}: {
		data: PageData;
	} = $props();

	let schemaCode = `import { z } from 'zod';
export let schema = z.object({
  email: z.string().email(),
})`;
	let pageSvelteCode = ForgotPasswordCode;
</script>

<div class="mb-4 w-full">
	<h2 class="text-2xl font-semibold">Forgot Password</h2>
	<p class="text-muted-foreground">
		This form includes special component,add the component in your directory.
	</p>
	<div class="mt-1 flex w-full flex-col justify-end gap-2 sm:flex-row sm:items-center">
		<TemplatesTabs bind:tab_value />
	</div>
</div>
{#if tab_value === 'preview'}
	<div class="flex justify-center">
		<ForgotPassword {data} />
	</div>
{:else if tab_value === 'schema'}
	<div class="flex max-h-[420px]">
		<CopyCode code={schemaCode} />
	</div>
{:else if tab_value === 'client'}
	<div class="flex max-h-[420px]">
		<CopyCode lang="svelte" code={pageSvelteCode} />
	</div>
{:else if tab_value === 'server'}
	<div class="flex max-h-[420px]">
		<CopyCode code={pageServerCode} />
	</div>
{/if}

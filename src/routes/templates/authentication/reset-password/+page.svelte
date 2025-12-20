<script lang="ts">
	import type { PageData } from './$types';
	import CopyCode from '$lib/components/web/playground/code/CopyCode.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index';
	import ResetPassword from '$lib/components/templates/forms/ResetPassword.svelte';
	import ResetPasswordCode from '$lib/components/templates/forms/ResetPassword.svelte?raw';
	import { pageServerCode } from '../../serverCopyCode';
	import TemplatesTabs from '$lib/components/templates/comps/TemplatesTabs.svelte';

	let spl_comps = [
		{
			name: 'Password Input',
			url: '/docs/components/password-input'
		}
	];
	let tab_value = $state('preview');
	let {
		data
	}: {
		data: PageData;
	} = $props();

	let schemaCode = `import { z } from 'zod';
export let schema = z.object({
  new_password: z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  path: ['confirm_password'],
  message: 'Passwords do not match',
})`;

	let pageSvelteCode = ResetPasswordCode;
</script>

<div class="mb-4 w-full">
	<h2 class="text-2xl font-semibold">Reset Password</h2>
	<p class="text-muted-foreground">
		This form includes special component,add the component in your directory.
	</p>
	<div class="mt-1 flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
		<div>
			<ul>
				{#each spl_comps as item, index}
					<li>
						<a href={item.url} class="text-sm">{item.name}</a>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<TemplatesTabs bind:tab_value />
		</div>
	</div>
</div>
{#if tab_value === 'preview'}
	<div class="flex justify-center">
		<ResetPassword {data} />
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

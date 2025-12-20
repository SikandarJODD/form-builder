<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { form_generator } from '$lib/form-generator/form-gen.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import { codeToHtml } from 'shiki';
	import { onMount } from 'svelte';
	import { watch } from 'runed';
	import { trackCodeCopied, trackSchemaSelected } from '$lib/analytics';

	let codeContent = $derived(form_generator.zodSchema); // input code
	let valibotContent = $derived(form_generator.valibotSchema); // input code
	let arkTypeContent = $derived(form_generator.arkTypeSchema); // input code
	let htmlCode = $state(''); // highlighted html code

	let value = $derived(form_generator.adapter);
	let getCode = async () => {
		if (value === 'zod') {
			htmlCode = await codeToHtml(form_generator.zodSchema, {
				lang: 'typescript',
				theme: 'vesper'
			});
		} else if (value === 'valibot') {
			htmlCode = await codeToHtml(form_generator.valibotSchema, {
				lang: 'typescript',
				theme: 'vesper'
			});
		} else if (value === 'arktype') {
			htmlCode = await codeToHtml(form_generator.arkTypeSchema, {
				lang: 'typescript',
				theme: 'vesper'
			});
		}
	};

	onMount(async () => await getCode());
	watch(
		() => form_generator.zodSchema,
		() => {
			getCode();
		}
	);
	watch(
		() => form_generator.adapter,
		() => {
			getCode();
		}
	);

	let copied = $state(false);

	function handleCopy() {
		copied = true;
		if (value === 'zod') {
			navigator.clipboard.writeText(codeContent);
		} else if (value === 'valibot') {
			navigator.clipboard.writeText(valibotContent);
		} else if (value === 'arktype') {
			navigator.clipboard.writeText(arkTypeContent);
		}
		trackCodeCopied('schema', value, false);
		setTimeout(() => (copied = false), 1500);
	}

	let all_schema = [
		{ value: 'zod', label: 'Zod' },
		{ value: 'valibot', label: 'Valibot' },
		{ value: 'arktype', label: 'ArkType' }
	];
	let schemavalue = $state('zod');

	let triggerContent = $derived(all_schema.find((f) => f.value === schemavalue)?.label ?? 'Schema');
	let updateAdapter = () => {
		form_generator.adapter = schemavalue;
		trackSchemaSelected(schemavalue);
	};
</script>

<div
	class="scrollbar relative w-full overflow-scroll rounded-lg border bg-zinc-900 pr-1 pl-4 dark:bg-transparent"
>
	<div class="sticky top-2 left-0 flex justify-end gap-1.5">
		<div>
			<Select.Root
				name="schema"
				type="single"
				bind:value={schemavalue}
				onValueChange={updateAdapter}
			>
				<Select.Trigger class="h-8 w-[110px] text-xs focus:ring-0">
					{triggerContent}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each all_schema as schema}
							<Select.Item class="text-xs" value={schema.value} label={schema.label} />
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
		<div>
			<Button variant="outline" size="icon" onclick={handleCopy}>
				<div class={['transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0']}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="none"
						aria-hidden="true"
					>
						<path
							fill="#10B981"
							d="M14.548 3.488a.75.75 0 0 1-.036 1.06l-8.572 8a.75.75 0 0 1-1.023 0l-3.429-3.2a.75.75 0 0 1 1.024-1.096l2.917 2.722 8.06-7.522a.75.75 0 0 1 1.06.036Z"
						/>
					</svg>
				</div>
				<div
					class={[
						'absolute transition-all',
						copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
					]}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
						><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
							d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
						/></svg
					>
				</div>
			</Button>
		</div>
	</div>
	<div class="-mt-5 text-sm">
		<span>{@html htmlCode}</span>
	</div>
</div>

<style>
	/* :global(.shiki) {
    background-color: transparent;
  } */
</style>

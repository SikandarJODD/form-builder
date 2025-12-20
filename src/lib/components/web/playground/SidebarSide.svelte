<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { form_generator } from '$lib/form-generator/form-gen.svelte';

	import * as Select from '$lib/components/ui/select/index';
	import Label from '$lib/components/ui/label/label.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { trackFieldAdded, trackSchemaSelected } from '$lib/analytics';

	let all_schema = [
		{ value: 'zod', label: 'Zod' },
		{ value: 'valibot', label: 'Valibot' },
		{ value: 'arktype', label: 'ArkType' }
	];
	let value = $state('zod');

	let triggerContent = $derived(all_schema.find((f) => f.value === value)?.label ?? 'Schema');
	let updateAdapter = () => {
		form_generator.adapter = value;
		trackSchemaSelected(value);
	};
	// Title and Description
	let headerfeauture = [
		{
			name: 'Title',
			type: 'title',
			category: 'title',
			label: 'Create Account',
			description: '',
			placeholder: '',
			min: 0,
			max: 0
		},
		{
			name: 'Desc',
			type: 'desc',
			category: 'desc',
			label: 'Please fill out the form below to create an account.',
			description: '',
			placeholder: '',
			min: 0,
			max: 0
		}
	];

	let titlecheck = $state(false);
	let addTitle = () => {
		if (titlecheck) {
			form_generator.add_input(headerfeauture[1], true);
			form_generator.add_input(headerfeauture[0], true);
		} else {
			let titleid = form_generator.selected_inputs.find((f) => f.category === 'title');
			let descid = form_generator.selected_inputs.find((f) => f.category === 'desc');
			if (titleid?.id) {
				form_generator.remove_input(titleid.id);
			}
			if (descid?.id) {
				form_generator.remove_input(descid.id);
			}
		}
	};
</script>

<div
	class="border-b border-accent px-4 py-2 sm:min-h-[92vh] sm:w-56 sm:border-r sm:border-b-0 sm:pb-5 xl:shrink-0"
>
	<div class="flex flex-wrap items-start space-y-2 sm:flex-col sm:flex-nowrap">
		<div class="block w-full">
			<Select.Root name="schema" type="single" bind:value onValueChange={updateAdapter}>
				<Select.Trigger class="w-[150px] rounded-full border-dashed border-primary/35">
					{triggerContent}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each all_schema as schema}
							<Select.Item value={schema.value} label={schema.label} />
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
		<div
			class="flex items-center justify-start space-x-2 rounded-lg border p-2 sm:w-full sm:justify-between"
		>
			<div class="flex items-center space-x-2">
				<Checkbox
					bind:checked={titlecheck}
					id="title"
					aria-labelledby="title"
					onCheckedChange={addTitle}
				/>
				<Label
					id="title"
					for="title"
					class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Title & Desc
				</Label>
			</div>
			<!-- <div class="flex items-center space-x-2">
        <Checkbox
          bind:checked={desccheck}
          id="desc"
          aria-labelledby="desc"
          onCheckedChange={addDesc}
        />
        <Label
          id="desc"
          for="desc"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Description
        </Label>
      </div> -->
		</div>
		<div
			class="scrollbar flex w-full flex-row flex-wrap items-center gap-2 overflow-scroll sm:flex-col sm:flex-nowrap sm:gap-0 sm:space-y-2 lg:h-[74vh]"
		>
			{#each form_generator.inputs as item}
				<div class="flex w-fit items-center space-x-2 sm:w-full">
					<Button
						onclick={() => {
							form_generator.add_input(item);
							trackFieldAdded(item.type, item.name);
						}}
						class="rounded-full font-normal"
						size="sm"
						variant="outline"
					>
						{item.name}
					</Button>
					{#if item.isNew}
						<span
							class="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-normal text-green-400 ring-1 ring-green-500/20 ring-inset"
							>New</span
						>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

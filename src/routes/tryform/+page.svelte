<script lang="ts">
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import Button from '$lib/components/ui/button/button.svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	let {
		data
	}: {
		data: PageData;
	} = $props();
	let { form, enhance } = superForm(data.form, {
		validators: zodClient(schema)
	});
</script>

<!-- <Label class="text-sm font-medium">Gender</Label> -->
<div class="flex min-h-[80vh] items-center justify-center">
	<form method="POST" use:enhance class="min-w-96 space-y-2">
		<div class="space-y-3">
			<Label class="text-sm font-medium" for="pricing">Set Price Range * {$form.slider}</Label>
			<Slider type="single" bind:value={$form.slider} max={100} step={1} />
			<input type="hidden" name="slider" id="slider" bind:value={$form.slider} />
			<p class="text-sm text-muted-foreground">
				Adjust the price by sliding. Selected value is 5, minimun valus is 0, maximim values is 100,
				step size is 1
			</p>
		</div>
		<div>
			<Button size="sm" type="submit">Submit</Button>
		</div>
	</form>
</div>

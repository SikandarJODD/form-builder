<script lang="ts">
	import { form_generator } from '$lib/form-generator/form-gen.svelte';
	import InputsDragCode from './InputsDragCode.svelte';
	import PreviewAndCode from './PreviewAndCode.svelte';
	import OC_Thinking from '$lib/images/oc-thinking.svg';
	import { fade, fly } from 'svelte/transition';
</script>

<div class="px-4 py-6 sm:px-4 lg:px-6 lg:pl-8 xl:flex-1 xl:pl-8">
	<div class="size-full">
		<div class="mb-4 max-w-5xl space-y-3">
			<h1 class="text-2xl font-bold">Playground</h1>
			<p class="text-muted-foreground">
				After successfully installing Shadcn-Svelte, you can simply copy and paste the generated
				form components to get started. Some components may have additional dependencies, so make
				sure to review their documentation in the <a
					href="https://github.com/SikandarJODD/form-builder?tab=readme-ov-file#svelte-form-builder"
					target="_blank"
					class="font-medium text-primary underline">README</a
				> for further instructions.
			</p>
		</div>
		{#if form_generator.selected_inputs.length > 0}
			<div
				class="grid max-w-7xl grid-cols-1 space-y-10 sm:gap-10 sm:space-y-0 lg:grid-cols-5 xl:mx-auto"
			>
				<InputsDragCode />
				<PreviewAndCode />
			</div>
		{:else}
			<div
				in:fly={{ x: 20, duration: 300 }}
				class="flex h-[450px] w-full items-center justify-center"
			>
				<div class="flex items-center justify-center dark:invert">
					<img src={OC_Thinking} alt="thinking" class="" />
				</div>
			</div>
		{/if}
	</div>
</div>

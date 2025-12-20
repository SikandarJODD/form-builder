<script lang="ts">
	import LocationSelector from '$lib/components/templates/comps/location-input/LocationSelector.svelte';
	import LocationTypesCode from '$lib/components/templates/comps/location-input/types.ts?raw';
	import LocationSelectorCode from '$lib/components/templates/comps/location-input/LocationSelector.svelte?raw';
	import CopyCode from '$lib/components/web/playground/code/CopyCode.svelte';

	let rawcode = LocationSelectorCode;

	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip/index.js';
	import { cn } from '$lib/utils.js';
	import Button from '$lib/components/ui/button/button.svelte';

	let copied = $state(false);

	function handleCopy(text: string = '') {
		copied = true;
		navigator.clipboard.writeText(text);
		setTimeout(() => (copied = false), 1500);
	}
</script>

<svelte:head>
	<title>Location Input - Form Builder</title>
	<meta
		name="description"
		content="A dropdown component that includes a comprehensive list of countries along with their respective states."
	/>
	<meta
		name="keywords"
		content="location input, location input svelte, svelte, sveltekit, form-builder, location input, country, state"
	/>

	<meta property="og:title" content="Location Input - Form Builder" />
	<meta
		property="og:description"
		content="A dropdown component that includes a comprehensive list of countries along with their respective states."
	/>
	<meta
		property="og:image"
		content="https://i.pinimg.com/736x/0d/22/63/0d2263fb3a30077c8e8f0def7187095f.jpg"
	/>
	<meta property="og:image:width" content="600" />
	<meta property="og:image:height" content="315" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Svelte Form Builder" />

	<!-- Twitter -->
	<meta property="og:url" content="https://svelte-form-builder.vercel.app" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Svelte Form Builder" />
	<meta name="twitter:description" content="Build forms with ease using Svelte Form Builder." />
	<meta
		name="twitter:image"
		content="https://i.pinimg.com/736x/0d/22/63/0d2263fb3a30077c8e8f0def7187095f.jpg"
	/>
	<meta name="twitter:site" content="@Sikandar_Bhide" />
</svelte:head>

<h2 class="text-2xl font-semibold">Location Input</h2>

<p class="text-muted-foreground">
	A dropdown component that includes a comprehensive list of countries along with their respective
	states.
</p>
<p class="text-muted-foreground">
	You can download the State and Country JSON file from <a
		class="text-primary"
		href="https://github.com/SikandarJODD/form-builder/tree/master/src/lib/data"
		target="_blank">Github</a
	>
</p>
{@render npmcode('jsrepo add github/sikandarjodd/form-builder/comps/location-input', handleCopy)}
{@render CodeSnippet('LocationSelector.svelte', rawcode)}
{@render CodeSnippet('types.ts', LocationTypesCode)}
<h3 class="mt-4 text-xl font-semibold">Preview</h3>
<div
	class="mt-2 flex min-h-64 w-full items-center justify-center border border-dashed border-muted-foreground/50 p-4"
>
	<div class="mx-auto w-fit">
		<LocationSelector />
	</div>
</div>

{#snippet CodeSnippet(filename: string, code: string)}
	<div class="mt-4">
		<div
			class="ml-1 flex w-fit items-center gap-1.5 rounded-t-lg border border-b-0 bg-accent/80 p-2"
		>
			{#if filename.split('.').pop() === 'svelte'}
				<svg
					viewBox="0 0 256 308"
					width="18"
					height="18"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid"
					><path
						d="M239.682 40.707C211.113-.182 154.69-12.301 113.895 13.69L42.247 59.356a82.198 82.198 0 0 0-37.135 55.056 86.566 86.566 0 0 0 8.536 55.576 82.425 82.425 0 0 0-12.296 30.719 87.596 87.596 0 0 0 14.964 66.244c28.574 40.893 84.997 53.007 125.787 27.016l71.648-45.664a82.182 82.182 0 0 0 37.135-55.057 86.601 86.601 0 0 0-8.53-55.577 82.409 82.409 0 0 0 12.29-30.718 87.573 87.573 0 0 0-14.963-66.244"
						fill="#FF3E00"
					/><path
						d="M106.889 270.841c-23.102 6.007-47.497-3.036-61.103-22.648a52.685 52.685 0 0 1-9.003-39.85 49.978 49.978 0 0 1 1.713-6.693l1.35-4.115 3.671 2.697a92.447 92.447 0 0 0 28.036 14.007l2.663.808-.245 2.659a16.067 16.067 0 0 0 2.89 10.656 17.143 17.143 0 0 0 18.397 6.828 15.786 15.786 0 0 0 4.403-1.935l71.67-45.672a14.922 14.922 0 0 0 6.734-9.977 15.923 15.923 0 0 0-2.713-12.011 17.156 17.156 0 0 0-18.404-6.832 15.78 15.78 0 0 0-4.396 1.933l-27.35 17.434a52.298 52.298 0 0 1-14.553 6.391c-23.101 6.007-47.497-3.036-61.101-22.649a52.681 52.681 0 0 1-9.004-39.849 49.428 49.428 0 0 1 22.34-33.114l71.664-45.677a52.218 52.218 0 0 1 14.563-6.398c23.101-6.007 47.497 3.036 61.101 22.648a52.685 52.685 0 0 1 9.004 39.85 50.559 50.559 0 0 1-1.713 6.692l-1.35 4.116-3.67-2.693a92.373 92.373 0 0 0-28.037-14.013l-2.664-.809.246-2.658a16.099 16.099 0 0 0-2.89-10.656 17.143 17.143 0 0 0-18.398-6.828 15.786 15.786 0 0 0-4.402 1.935l-71.67 45.674a14.898 14.898 0 0 0-6.73 9.975 15.9 15.9 0 0 0 2.709 12.012 17.156 17.156 0 0 0 18.404 6.832 15.841 15.841 0 0 0 4.402-1.935l27.345-17.427a52.147 52.147 0 0 1 14.552-6.397c23.101-6.006 47.497 3.037 61.102 22.65a52.681 52.681 0 0 1 9.003 39.848 49.453 49.453 0 0 1-22.34 33.12l-71.664 45.673a52.218 52.218 0 0 1-14.563 6.398"
						fill="#FFF"
					/></svg
				>
			{/if}
			{#if filename.split('.').pop() === 'ts'}
				<svg
					viewBox="0 0 256 256"
					width="16"
					height="16"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid"
					><path
						d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
						fill="#3178C6"
					/><path
						d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
						fill="#FFF"
					/></svg
				>
			{/if}
			<h3 class="text-sm">{filename}</h3>
		</div>
		<div class="scrollbar relative w-full max-w-2xl overflow-hidden">
			<CopyCode {code} lang="svelte" class="h-[400px]" />
		</div>
	</div>
{/snippet}

{#snippet npmcode(text: string, handleCopy: (text: string) => void)}
	<div
		class="mt-2 flex w-fit min-w-64 items-center justify-between gap-x-5 rounded-lg bg-secondary py-1 pr-2 pl-4"
	>
		<span class="font-mono text-sm">{text}</span>
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					class="disabled:opacity-100"
					onclick={() => handleCopy(text)}
					aria-label={copied ? 'Copied' : 'Copy component source'}
					disabled={copied}
				>
					{#snippet child({ props })}
						<Button variant="secondary" size="icon" {...props}>
							<div
								class={cn('transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}
							>
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
								class={cn(
									'absolute transition-all',
									copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
								)}
							>
								<svg
									class="fill-current"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="none"
									aria-hidden="true"
								>
									<path
										d="M3 2.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5ZM10 1H3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm3 5.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5v-1H5v1a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1v1.5Z"
									/>
								</svg>
							</div>
						</Button>
					{/snippet}
				</TooltipTrigger>
				<TooltipContent
					class="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground"
				>
					Click to copy
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	</div>
{/snippet}

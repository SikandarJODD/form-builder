<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { codeToHtml } from 'shiki';

	interface Props {
		code: string;
		lang?: string;
		class?: string;
		codeclass?: string;
	}
	let { code, lang = 'ts', class: _class = '', codeclass = '' }: Props = $props();

	let htmlCode = $state(''); // highlighted html code
	let copied = $state(false);

	// Re-highlight code whenever the code prop changes
	$effect(() => {
		const currentCode = code;
		const currentLang = lang;
		codeToHtml(currentCode, {
			lang: currentLang,
			theme: 'vesper'
		}).then((html) => {
			htmlCode = html;
		});
	});

	function handleCopy() {
		copied = true;
		navigator.clipboard.writeText(code);
		setTimeout(() => (copied = false), 1500);
	}
</script>

<div
	class={[
		'scrollbar relative w-full overflow-auto rounded-lg border bg-zinc-900 py-2 pr-2 pl-4 dark:bg-transparent',
		_class
	]}
>
	<div class="sticky top-0 z-40 flex justify-end">
		<Button variant="outline" size="icon" class="z-50" onclick={handleCopy}>
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
				class={['absolute transition-all', copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100']}
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
	</div>
	<div class="-mt-6">
		<span class={codeclass}>{@html htmlCode}</span>
	</div>
</div>

<style>
	:global(.shiki) {
		background-color: transparent !important;
	}
</style>

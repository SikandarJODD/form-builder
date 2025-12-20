<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SectionProps {
		id?: string;
		title?: string;
		subtitle?: string;
		description?: string;
		children?: Snippet;
		class?: string;
	}
	let { id, title, subtitle, description, children, class: _class }: SectionProps = $props();
</script>

<section>
	<div class={_class}>
		<div class="relative container mx-auto max-w-7xl px-4 pt-16 md:pb-16">
			<div class="mx-auto space-y-4 pb-6 text-center">
				<h2 class="font-mono text-sm font-medium tracking-wider text-primary uppercase">
					{title}
				</h2>
				<h3
					class="mx-auto mt-4 max-w-xs text-2xl font-semibold sm:max-w-none sm:text-4xl md:text-5xl"
				>
					{subtitle}
				</h3>
				<p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
					{description}
				</p>
			</div>
			{@render children?.()}
		</div>
	</div>
</section>

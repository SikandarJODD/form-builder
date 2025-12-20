<script>
	import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';

	let NAVIGATE = [
		{
			name: 'Playground',
			slug: '/playground'
		}
	];
</script>

<footer
	class="relative z-10 overflow-hidden border-t border-border bg-background dark:border-[#262626]/50"
>
	{@render blur()}
	<div class="relative mx-auto w-full max-w-7xl px-8 py-16 md:px-3">
		<div class="flex gap-10 max-md:flex-col md:justify-between">
			<div class="flex flex-col gap-1">
				<div>Svelte Form Builder</div>
				<div class="flex flex-col gap-1">
					<p class="text-sm text-black/60 dark:text-white/60">
						<a
							href="https://x.com/Sikandar_Bhide"
							target="_blank"
							rel="noopener noreferrer"
							class="duration-200 hover:text-neutral-600 dark:hover:text-neutral-200"
						>
							Bhide Svelte
						</a>{' '}
						&#169; {new Date().getFullYear()}
					</p>
				</div>
			</div>
			<div class="flex items-start gap-10 max-sm:flex-col sm:gap-36">
				<div class="space-y-4">
					<div class="flex flex-col gap-4 text-sm">
						<h3 class="font-medium text-primary">Explore</h3>
						{#each NAVIGATE as { name, slug }, idx}
							<a
								href={slug}
								class="group flex w-fit items-center gap-1 text-muted-foreground duration-200 hover:text-primary"
							>
								{name}
							</a>
						{/each}
					</div>
				</div>
				<div class="space-y-4">
					<div class="flex flex-col gap-4 text-sm">
						<h3 class="font-medium text-primary">Connect</h3>
						<a
							href="https://github.com/SikandarJODD/form-builder"
							target="_blank"
							rel="noopener noreferrer"
							class="group flex w-fit items-center gap-1 text-muted-foreground duration-200 hover:text-primary"
						>
							GitHub
							{@render arrowGlitch()}
						</a>
						<a
							href="https://x.com/Sikandar_Bhide"
							target="_blank"
							rel="noopener noreferrer"
							class="group flex w-fit items-center gap-1 text-muted-foreground duration-200 hover:text-primary"
						>
							Twitter
							{@render arrowGlitch()}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>

{#snippet blur()}
	<div
		aria-hidden="true"
		class="pointer-events-none absolute -top-1 left-1/2 h-50 w-full max-w-100 -translate-x-1/2 -translate-y-1/2"
		style="
      background:
        conic-gradient(from 90deg at 50% 50%, #00000000 50%, #0a0a0a 50%),radial-gradient(rgba(134, 134, 134, 0.1) 0%, transparent 80%)"
	></div>
{/snippet}
{#snippet arrowGlitch()}
	<div class="group relative overflow-hidden font-medium">
		<span class="invisible">
			<ArrowUpRightIcon size={10} />
		</span>
		<span
			class="absolute top-0 left-0 text-neutral-400 transition-transform duration-500 ease-in-out group-hover:translate-x-full group-hover:-translate-y-full hover:duration-300"
		>
			<ArrowUpRightIcon size={10} />
		</span>
		<span
			class="absolute top-0 left-0 -translate-x-full translate-y-full text-primary transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 hover:duration-300"
		>
			<ArrowUpRightIcon size={10} />
		</span>
	</div>
{/snippet}

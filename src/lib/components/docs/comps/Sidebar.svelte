<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';

	let { children } = $props();
	let templates = [
		// {
		//   name: "Guide",
		//   sub: [
		//     {
		//       name: "Usage",
		//       url: "/docs/usage",
		//     },
		//     {
		//       name: "Sponsors",
		//       url: "/docs/sponsors",
		//     },
		//   ],
		// },
		{
			name: 'Components',
			sub: [
				{
					name: 'Password Input',
					url: '/docs/components/password-input'
				},
				{
					name: 'Location Input',
					url: '/docs/components/location-input'
				}
			]
		}
	];
	let isActive = (url: string) => {
		return page.url.pathname === url;
	};
</script>

<div class="mx-auto max-w-5xl px-6 sm:px-0">
	<div class="flex flex-col gap-6 sm:flex-row">
		<div class="top-20 h-fit min-w-52 rounded-lg bg-accent/60 p-4 sm:sticky">
			{#each templates as item}
				<div>
					<div class="flex items-center justify-between">
						<h2 class="text-md font-semibold">{item.name}</h2>
						<Button size="icon" class="size-6 text-xs" variant="secondary">
							{item.sub.length}
						</Button>
					</div>
					<div class="my-1 ml-1 border-l pl-1">
						{#each item.sub as subItem}
							<a
								href={subItem.url}
								class={[
									'block rounded-sm px-2 py-1 text-sm text-muted-foreground transition-all duration-150 hover:text-primary',
									isActive(subItem.url) && 'bg-primary/5 text-primary'
								]}>{subItem.name}</a
							>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div>
			{@render children()}
		</div>
	</div>
</div>

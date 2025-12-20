<script lang="ts">
	import { page } from '$app/state';
	import Button from '../ui/button/button.svelte';

	let { children } = $props();
	let templates = [
		{
			name: 'Authentication',
			sub: [
				{
					name: 'Login',
					url: '/templates/authentication/login'
				},
				{
					name: 'Register',
					url: '/templates/authentication/register'
				},
				{
					name: 'Forgot Password',
					url: '/templates/authentication/forgot-password'
				},
				{
					name: 'Reset Password',
					url: '/templates/authentication/reset-password'
				}
			]
		},
		{
			name: 'Contact',
			sub: [
				{
					name: 'Contact',
					url: '/templates/contact/contact'
				}
			]
		}
	];
	let isActive = (url: string) => {
		return page.url.pathname === url;
	};
</script>

<div class="mx-auto max-w-5xl space-y-2 px-4 py-4">
	<h1 class="text-3xl font-semibold">Templates</h1>
	<p class="text-muted-foreground">
		Minimalist templates for building your next product. Built with Svelte, Sveltekit, TailwindCSS,
		ZOD, Superforms-Sveltekit and Typescript.
	</p>
</div>
<div class="mx-auto max-w-5xl px-4">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-9">
		<div class="top-20 h-fit rounded-lg bg-accent/50 p-4 sm:sticky sm:col-span-2">
			{#each templates as item}
				<div>
					<div class="flex items-center justify-between">
						<h2 class="text-md font-semibold">{item.name}</h2>
						<Button size="icon" class="size-6 text-xs" variant="secondary">
							{item.sub.length}
						</Button>
					</div>
					<div class="my-1 ml-1 border-l pl-2">
						{#each item.sub as subItem}
							<a
								href={subItem.url}
								class={[
									'block rounded-md py-1 pl-2 text-sm text-muted-foreground transition-all duration-150 hover:text-primary',
									isActive(subItem.url) && 'bg-primary/5 text-primary'
								]}>{subItem.name}</a
							>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="sm:col-span-7">
			{@render children()}
		</div>
	</div>
</div>

<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { schema } from '../../../../routes/templates/authentication/login/schema';
	import type { PageData } from '../../../../routes/templates/authentication/login/$types';
	import PasswordInput from '../comps/PasswordInput.svelte';
	import { untrack } from 'svelte';

	let {
		data
	}: {
		data: PageData;
	} = $props();

	let { form, message, errors, enhance } = superForm(
		untrack(() => data.form),
		{
			validators: zod4Client(schema)
		}
	);
</script>

<Card.Root class="h-fit w-full md:w-96">
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email and password to login to your account.</Card.Description>
	</Card.Header>
	<form method="post" use:enhance>
		<Card.Content class="grid space-y-3 pt-2">
			<div class="space-y-1">
				<Label for="email" class={$errors.email && 'text-destructive'}>Email</Label>
				<Input
					type="email"
					id="email"
					name="email"
					placeholder="john@example.com"
					bind:value={$form.email}
				/>
				{#if $errors.email}
					<p class="text-sm text-destructive">{$errors.email}</p>
				{/if}
			</div>
			<div>
				<PasswordInput
					error={$errors.password}
					id="password"
					bind:value={$form.password}
					name="password"
				/>
				{#if $errors.password}
					<p class="text-sm text-destructive">{$errors.password}</p>
				{/if}
			</div>
			<Button type="submit">Login</Button>
			<Button variant="outline">Login with Google</Button>
			<p class="text-center text-muted-foreground">
				Don't have an account? <a href="#" class="text-primary underline">Sign up</a>
			</p>
		</Card.Content>
	</form>
</Card.Root>

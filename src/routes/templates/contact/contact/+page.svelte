<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
    // add your own path
	import type { PageData } from './$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
   import Input from '$lib/components/ui/input/input.svelte';
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { zod } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';

	let {
		data
	}: {
		data: PageData;
	} = $props();
      let { form, message, errors, enhance } = superForm(data.form, {
		    validators: zod(schema)
	    });</script>
<div class="flex min-h-[60vh] flex-col items-center justify-center">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Label for="name" class={$errors.name && "text-destructive"}>Name</Label>
      <Input type="text" id="name" name="name" placeholder="John Doe" bind:value={$form.name} />
      {#if $errors.name}
        <p class="text-sm text-destructive">{$errors.name}</p>
      {/if}
    </div>

    <div>
      <Label for="email" class={$errors.email && "text-destructive"}>Email</Label>
      <Input type="email" id="email" name="email" placeholder="Enter your email" bind:value={$form.email} />
      {#if $errors.email}
        <p class="text-sm text-destructive">{$errors.email}</p>
      {/if}
    </div>

    <div>
      <Label for="bio" class={$errors.bio && "text-destructive"}>Message</Label>
      <Textarea
        placeholder="Tell us a little bit about yourself"
        class="resize-none"
        id="bio"
        name="bio"
        bind:value={$form.bio}
      />
      <p class="text-xs text-muted-foreground">

      </p>
      {#if $errors.bio}
        <p class="text-sm text-destructive">{$errors.bio}</p>
      {/if}
    </div>

    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>

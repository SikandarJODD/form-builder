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
      <Label for="name_ce816" class={$errors.name_ce816 && "text-destructive"}>Username</Label>
      <Input type="text" id="name_ce816" name="name_ce816" placeholder="Enter your username" bind:value={$form.name_ce816} />
      {#if $errors.name_ce816}
        <p class="text-sm text-destructive">{$errors.name_ce816}</p>
      {/if}
    </div>

    <div>
      <Label for="bio" class={$errors.bio && "text-destructive"}>Bio</Label>
      <Textarea
        placeholder="Tell us a little bit about yourself"
        class="resize-none"
        id="bio"
        name="bio"
        bind:value={$form.bio}
      />
      <p class="text-xs text-muted-foreground">
        Tell us about yourself
      </p>
      {#if $errors.bio}
        <p class="text-sm text-destructive">{$errors.bio}</p>
      {/if}
    </div>

    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>

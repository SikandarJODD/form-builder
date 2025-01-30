<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
    // add your own path
	import type { PageData } from './$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
   import Input from '$lib/components/ui/input/input.svelte';
    import { TagsInput } from "$lib/components/ui/tags-input";
    import { zod } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';

	let {
		data
	}: {
		data: PageData;
	} = $props();
  let { form, message, errors, enhance } = superForm(data.form, {
    validators: zod(schema),
    onUpdated(event) {
      if (event.form.valid) {
        tagsvalue = [];
      }
    },
  });
  let tagsvalue = $state([]);
  $effect(() => {
    $form.name_ec6cc = tagsvalue;
  });</script>
<div class="flex min-h-[60vh] flex-col items-center justify-center">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Label for="name_1130c">Username</Label>
      <Input type="text" id="name_1130c" name="name_1130c" placeholder="Enter your username" bind:value={$form.name_1130c} />
      {#if $errors.name_1130c}
        <p class="text-sm text-red-500">{$errors.name_1130c}</p>
      {/if}
    </div>

    <div>
      <Label for="name_ec6cc">Enter your tech stack.</Label>
      <TagsInput bind:value={tagsvalue} placeholder="Add Tech Stack" />
      {#each $form.name_ec6cc as item, i}
        <input type="hidden" bind:value={$form.name_ec6cc[i]} name="name_ec6cc" id="name_ec6cc" />
      {/each}
      <p class="text-xs text-muted-foreground">
        Add tags.
      </p>
      {#if $errors.name_ec6cc}
        <p class="text-sm text-red-500">{$errors.name_ec6cc?._errors}</p>
      {/if}
    </div>
    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>

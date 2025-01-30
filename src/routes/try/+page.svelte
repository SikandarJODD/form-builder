<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
    // add your own path
	import type { PageData } from './$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import * as InputOTP from "$lib/components/ui/input-otp/index";
  import { zod } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';

	let {
		data
	}: {
		data: PageData;
	} = $props();
	let { form, message, errors, enhance } = superForm(data.form, {
		validators: zod(schema)
	});
</script>
<div class="flex min-h-[60vh] flex-col items-center justify-center">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Label for="name_8eebb">Username</Label>
      <Input type="text" id="name_8eebb" name="name_8eebb" placeholder="Enter your username" bind:value={$form.name_8eebb} />
      {#if $errors.name_8eebb}
        <p class="text-sm text-red-500">{$errors.name_8eebb}</p>
      {/if}
    </div>

    <div>
      <Label for="name_2d140">One-Time Password</Label>
      <InputOTP.Root
        maxlength={6}
        name="name_2d140"
        id="name_2d140"
        bind:value={$form.name_2d140}
      >
        {#snippet children({ cells })}
          <InputOTP.Group>
            {#each cells.slice(0, 3) as cell}
              <InputOTP.Slot {cell} />
            {/each}
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            {#each cells.slice(3, 6) as cell}
              <InputOTP.Slot {cell} />
            {/each}
          </InputOTP.Group>
        {/snippet}
      </InputOTP.Root>
      <p class="text-xs text-muted-foreground">
          Please enter the one-time password sent to your phone.
      </p>
      {#if $errors.name_2d140}
          <p class="text-sm text-red-500">{$errors.name_2d140}</p>
      {/if}
    </div>
    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>

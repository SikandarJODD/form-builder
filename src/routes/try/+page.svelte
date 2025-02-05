<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
    // add your own path
	import type { PageData } from './$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
    import Input from '$lib/components/ui/input/input.svelte';
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import PasswordInput from "$lib/components/templates/comps/PasswordInput.svelte";
    import * as Select from "$lib/components/ui/select/index";
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
      <Label for="name_f8817" class={$errors.name_f8817 && "text-destructive"}>Username</Label>
      <Input type="text" id="name_f8817" name="name_f8817" placeholder="Enter your username" bind:value={$form.name_f8817} />
      {#if $errors.name_f8817}
        <p class="text-sm text-destructive">{$errors.name_f8817}</p>
      {/if}
    </div>

    <div>
      <Label for="name_beb97" class={$errors.name_beb97 && "text-destructive"}>Email</Label>
      <Input type="email" id="name_beb97" name="name_beb97" placeholder="Enter your email" bind:value={$form.name_beb97} />
      {#if $errors.name_beb97}
        <p class="text-sm text-destructive">{$errors.name_beb97}</p>
      {/if}
    </div>

    <div>
      <Label for="name_0196f" class={$errors.name_0196f && "text-destructive"}>Bio</Label>
      <Textarea
        placeholder="Tell us a little bit about yourself"
        class="resize-none"
        id="name_0196f"
        name="name_0196f"
        bind:value={$form.name_0196f}
      />
      <p class="text-xs text-muted-foreground">
        Tell us about yourself
      </p>
      {#if $errors.name_0196f}
        <p class="text-sm text-destructive">{$errors.name_0196f}</p>
      {/if}
    </div>

    <div>
      <PasswordInput
        error={$errors.name_be332}
        id="name_be332"
        bind:value={$form.name_be332}
        name="name_be332"
        placeholder="password"
        desc="Enter your password"
      />
      {#if $errors.name_be332}
        <p class="text-sm text-destructive">{$errors.name_be332}</p>
      {/if}
    </div>

    <div>
      <Label for="name_1a3ed" class={$errors.name_1a3ed && "text-destructive"}>Email</Label>
      <Select.Root type="single"  bind:value={$form.name_1a3ed}
          name="name_1a3ed">
          <Select.Trigger id="name_1a3ed">
              {$form.name_1a3ed
              ? $form.name_1a3ed
              : "Placeholder"}
          </Select.Trigger>
         <Select.Content>
           <!-- Add your select items here -->
            <Select.Item value="m@example.com" label="m@example.com" />
            <Select.Item value="m@google.com" label="m@google.com" />
            <Select.Item value="m@support.com" label="m@support.com" />
          </Select.Content>
      </Select.Root>
      <p class="text-xs text-muted-foreground">
        You can manage email addresses in your email settings.
      </p>
      {#if $errors.name_1a3ed}
          <p class="text-sm text-destructive">{$errors.name_1a3ed}</p>
      {/if}
    </div>

    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>

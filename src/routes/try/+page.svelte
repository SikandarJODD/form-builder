<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
  // add your own path
	import type { PageData } from './$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
    import * as Select from "$lib/components/ui/select/index";
    import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
    import Switch from "$lib/components/ui/switch/switch.svelte";
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
	});
</script>
<div class="flex min-h-[60vh] flex-col items-center justify-center">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Label for="name_370b4">Email</Label>
      <Select.Root type="single"  bind:value={$form.name_370b4}
          name="name_370b4">
          <Select.Trigger id="name_370b4">
              {$form.name_370b4
              ? $form.name_370b4
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
      {#if $errors.name_370b4}
          <p class="text-sm text-red-500">{$errors.name_370b4}</p>
      {/if}
    </div>

    <div class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
      <Checkbox id="name_68c94" name="name_68c94" bind:checked={$form.name_68c94} />
      <div class="space-y-1 leading-none">
        <Label for="name_68c94" >Use different settings for my mobile devices</Label>
        <p class="text-sm text-muted-foreground">
          You can manage your mobile notifications in the mobile settings page.
        </p>
      </div>
            <!-- add input for copy code -->
      <input name="name_68c94"  value={$form.name_68c94} type="hidden" />
      {#if $errors.name_68c94}
        <p class="text-sm text-red-500">{$errors.name_68c94}</p>
      {/if}
    </div>

    <div class="flex flex-row items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
            <Label for="name_cb182">
              Marketing Email
            </Label>
            <p class="text-sm text-muted-foreground">
              Receive emails about new products, features, and more.
            </p>
        </div>
        <Switch bind:checked={$form.name_cb182} id="name_cb182" name="name_cb182"/>
        {#if $errors.name_cb182}
          <p class="text-sm text-red-500">{$errors.name_cb182}</p>
        {/if}
    </div>
    <div>
      <Label for="name_13e2d">Age</Label>
      <Input type="number" id="name_13e2d" name="name_13e2d" placeholder="Enter your age" bind:value={$form.name_13e2d} />
      {#if $errors.name_13e2d}
        <p class="text-sm text-red-500">{$errors.name_13e2d}</p>
      {/if}
    </div>

    <div>
      <Label for="name_d97ac">Password</Label>
      <Input type="password" id="name_d97ac" name="name_d97ac" placeholder="password" bind:value={$form.name_d97ac} />
      {#if $errors.name_d97ac}
        <p class="text-sm text-red-500">{$errors.name_d97ac}</p>
      {/if}
    </div>

    <div>
      <Label for="name_83799">Bio</Label>
      <Textarea
        placeholder="Tell us a little bit about yourself"
        class="resize-none"
        id="name_83799"
        name="name_83799"
        bind:value={$form.name_83799}
      />
      <p class="text-xs text-muted-foreground">
        Tell us about yourself
      </p>
      {#if $errors.name_83799}
        <p class="text-sm text-red-500">{$errors.name_83799}</p>
      {/if}
    </div>

    <div>
      <Label for="name_c8c52">Username</Label>
      <Input type="text" id="name_c8c52" name="name_c8c52" placeholder="Enter your username" bind:value={$form.name_c8c52} />
      {#if $errors.name_c8c52}
        <p class="text-sm text-red-500">{$errors.name_c8c52}</p>
      {/if}
    </div>

    <Button type="submit">Submit</Button>
  </form>
</div>

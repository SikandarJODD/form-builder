<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  // add your own path
  import type { PageData } from "./$types";
  import Label from "$lib/components/ui/label/label.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import { zod } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";

  let {
    data,
  }: {
    data: PageData;
  } = $props();
  let { form, message, errors, enhance } = superForm(data.form, {
    validators: zod(schema),
  });
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center">
  {#if $message}
    <p class="text-emerald-400">{$message}</p>
  {/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Label for="username">Username</Label>
      <Input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your username"
        bind:value={$form.username}
      />
      {#if $errors.username}
        <p class="text-sm text-red-500">{$errors.username}</p>
      {/if}
    </div>

    <div>
      <Label for="password">Password</Label>
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="password"
        bind:value={$form.password}
      />
      {#if $errors.password}
        <p class="text-sm text-red-500">{$errors.password}</p>
      {/if}
    </div>

    <div
      class="flex flex-row items-center justify-between rounded-lg border p-4"
    >
      <div class="space-y-0.5">
        <Label for="switch">Marketing Email</Label>
        <p class="text-sm text-muted-foreground">
          Receive emails about new products, features, and more.
        </p>
      </div>
      <Switch bind:checked={$form.switch} id="switch" name="switch" />
    </div>
    <div
      class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
    >
      <Checkbox id="check" name="check" bind:checked={$form.check} />
      <div class="space-y-1 leading-none">
        <Label>Use different settings for my mobile devices</Label>
        <p class="text-sm text-muted-foreground">
          You can manage your mobile notifications in the
          <a href="/examples/forms">mobile settings</a> page.
        </p>
      </div>
      <!-- add input for copy code -->
      <input name="check" id="check" value={$form.check} type="hidden" />
    </div>

    <Button type="submit">Submit</Button>
  </form>
</div>

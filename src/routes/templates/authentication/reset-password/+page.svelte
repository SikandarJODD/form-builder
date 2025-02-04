<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  // add your own path
  import type { PageData } from "./$types";
  import Label from "$lib/components/ui/label/label.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
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
      <Label
        for="new_password"
        class={$errors.new_password && "text-destructive"}>New Password</Label
      >
      <Input
        type="password"
        id="new_password"
        name="new_password"
        placeholder="password"
        bind:value={$form.new_password}
      />
      {#if $errors.new_password}
        <p class="text-sm text-destructive">{$errors.new_password}</p>
      {/if}
    </div>

    <div>
      <Label
        for="confirm_password"
        class={$errors.confirm_password && "text-destructive"}
        >Confirm Password</Label
      >
      <Input
        type="password"
        id="confirm_password"
        name="confirm_password"
        placeholder="password"
        bind:value={$form.confirm_password}
      />
      {#if $errors.confirm_password}
        <p class="text-sm text-destructive">{$errors.confirm_password}</p>
      {/if}
    </div>

    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>

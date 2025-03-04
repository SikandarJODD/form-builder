<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  // add your own path
  import type { PageData } from "./$types";
  import Label from "$lib/components/ui/label/label.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import PasswordInput from "$lib/components/templates/comps/PasswordInput.svelte";
  // Form Validation & Schema
  import { valibot } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";

  let {
    data,
  }: {
    data: PageData;
  } = $props();

  let { form, message, errors, enhance } = superForm(data.form, {
    validators: valibot(schema),
  });
</script>

<div class="flex min-h-[80vh] flex-col items-center justify-center">
  {#if $message}
    <p class="text-emerald-400">{$message}</p>
  {/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <!-- Add Password Input Component from : https://github.com/SikandarJODD/form-builder/blob/master/src/lib/components/templates/comps/PasswordInput.svelte -->
      <PasswordInput
        error={$errors.password}
        id="password"
        bind:value={$form.password}
        name="password"
        placeholder="password"
        desc="Enter your password"
      />
      {#if $errors.password}
        <p class="text-sm text-destructive">{$errors.password}</p>
      {/if}
    </div>

    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>

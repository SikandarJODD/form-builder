<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  // add your own path
  import Label from "$lib/components/ui/label/label.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";

  import { zod, zodClient } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";
  import type { PageData } from "./$types";

  let {
    data,
  }: {
    data: PageData;
  } = $props();
  let { form, message, errors, enhance, constraints } = superForm(data.form, {
    validators: zodClient(schema),
  });
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center">
  {#if $message}
    <p class="text-emerald-400">{$message}</p>
  {/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Label for="name_ed8ee" class={$errors.name_ed8ee && "text-destructive"}
        >Username</Label
      >
      <Input
        type="text"
        id="name_ed8ee"
        name="name_ed8ee"
        placeholder="Enter your username"
        bind:value={$form.name_ed8ee}
        {...$constraints.name_ed8ee}
        aria-invalid={$errors.name_d2ffa ? "true" : undefined}
      />
      {#if $errors.name_ed8ee}
        <p class="text-sm text-destructive">{$errors.name_ed8ee}</p>
      {/if}
    </div>

    <div>
      <Label for="name_d2ffa" class={$errors.name_d2ffa && "text-destructive"}
        >Bio</Label
      >
      <Textarea
        placeholder="Tell us a little bit about yourself"
        class="resize-none"
        id="name_d2ffa"
        name="name_d2ffa"
        bind:value={$form.name_d2ffa}
        {...$constraints.name_d2ffa}
        aria-invalid={$errors.name_d2ffa ? "true" : undefined}
      />
      <p class="text-xs text-muted-foreground">Tell us about yourself</p>
      {#if $errors.name_d2ffa}
        <p class="text-sm text-destructive">{$errors.name_d2ffa}</p>
      {/if}
    </div>

    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>

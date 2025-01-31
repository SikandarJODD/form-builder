<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  // add your own path
  import type { PageData } from "./$types";
  import Label from "$lib/components/ui/label/label.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import PhoneInput from "$lib/components/ui/phone-input/phone-input.svelte";
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
      <Label for="phone">Phone number</Label>
      <PhoneInput
        country="IN"
        name="phone"
        placeholder="Enter a phone number"
        bind:value={$form.phone}
      />
      <p class="text-xs text-muted-foreground">Enter your phone number</p>
      {#if $errors.phone}
        <p class="text-sm text-red-500">{$errors.phone}</p>
      {/if}
    </div>
    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>

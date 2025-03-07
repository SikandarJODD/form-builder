<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  // add your own path
  import type { PageData } from "./$types";
  import Label from "$lib/components/ui/label/label.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  // Location Input
  let selectedCountry_loc = $state(null);
  let selectedState_loc = $state(null);

  // Form Validation & Schema
  import { zod } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";
  import LocationSelector from "$lib/components/templates/comps/location-input/LocationSelector.svelte";

  let {
    data,
  }: {
    data: PageData;
  } = $props();

  let { form, message, errors, enhance } = superForm(data.form, {
    validators: zod(schema),
    dataType: "json",
    onUpdated(event) {
      if (event.form.valid) {
        selectedCountry_loc = null;
        selectedState_loc = null;
      }
    },
  });
</script>

<div class="flex min-h-[80vh] flex-col items-center justify-center">
  {#if $message}
    <p class="text-emerald-400 mb-2">{$message}</p>
  {/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Label for="text" class={$errors.text && "text-destructive"}
        >Username</Label
      >
      <Input
        type="text"
        id="text"
        name="text"
        placeholder="Enter your username"
        bind:value={$form.text}
      />
      {#if $errors.text}
        <p class="text-sm text-destructive">{$errors.text}</p>
      {/if}
      <p class="text-xs text-muted-foreground">
        This is your public display name
      </p>
    </div>

    <div class="min-w-full">
      <Label for="loc">Location</Label>
      <LocationSelector
        bind:selectedCountry={selectedCountry_loc}
        bind:selectedState={selectedState_loc}
        onCountryChange={(country) => {
          $form.loc.country = country?.name ?? "";
        }}
        onStateChange={(state) => {
          $form.loc.state = state?.name ?? "";
        }}
      />
      <p class="text-sm text-muted-foreground">
        Select your country and state from the dropdown.
      </p>
      <input type="hidden" name="country" bind:value={$form.loc.country} />
      <input type="hidden" name="state" bind:value={$form.loc.state} />
    </div>

    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>

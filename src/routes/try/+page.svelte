<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import {  zodClient } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { schema } from "./schema";
  // FormSnap
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  // Components
  import Button from "$lib/components/ui/button/button.svelte";
  import Slider from "$lib/components/ui/slider/slider.svelte";
	let {
		data
	}: {
		data: PageData;
	} = $props();

  let form = superForm(data.form, {
      validators: zodClient(schema)
  });

  let { form: formData, enhance, message } = form;
</script>

<div class="flex min-h-[80vh] flex-col items-center justify-center">
  {#if $message}
    <span class="text-emerald-400 mb-2">
      {$message}
    </span>
  {/if}
  <form method="post"  use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div class="space-y-2">
      <Field {form} name="slider">
        <Control>
          {#snippet children({ props })}
            <Label class="text-sm font-medium">Set Price Range *</Label>
            <input
              {...props}
              type="hidden"
              name="slider"
              id="slider"
              bind:value={$formData.slider}
            />
            <Slider
              type="single"
              bind:value={$formData.slider}
              max={100}
              min={50}
              step={1}
            />
          {/snippet}
        </Control>
        <Description class="text-muted-foreground text-sm">
          Life is cool when you do write Svelte Code
        </Description>
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>
    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>
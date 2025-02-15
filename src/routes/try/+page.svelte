
<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { schema } from "./schema";
  // FormSnap
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  // Components
  import Button from "$lib/components/ui/button/button.svelte";
  import PhoneInput from "$lib/components/ui/phone-input/phone-input.svelte";

  let {
    data,
  }: {
    data: PageData;
  } = $props();
  let form = superForm(data.form, {
    validators: zodClient(schema),
  });
  let { form: formData, enhance, message } = form;
  </script>

<div class="flex min-h-[60vh] flex-col items-center justify-center">
  {#if $message}
    <span class="text-emerald-400">
      {$message}
    </span>
  {/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Field {form} name="phone">
        <Control>
          {#snippet children({ props })}
            <!-- Add Phone Input Component from Shadcn Extra : https://www.shadcn-svelte-extras.com/components/phone-input -->
            <Label>Phone number</Label>
            <PhoneInput
              {...props}
              country="IN"
              name="phone"
              placeholder="Enter your phone number"
              bind:value={$formData.phone}
            />
          {/snippet}
        </Control>
        <Description class="text-xs text-muted-foreground">
          Enter your phone number
        </Description>
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>
    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>
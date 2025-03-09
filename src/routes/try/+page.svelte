<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { schema } from "./schema";
  // FormSnap
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  // Components
  import Button from "$lib/components/ui/button/button.svelte";
  import * as RadioGroup from "$lib/components/ui/radio-group/index";
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

<div class="flex min-h-[80vh] flex-col items-center justify-center">
  {#if $message}
    <span class="text-emerald-400 mb-2">
      {$message}
    </span>
  {/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div class="space-y-2">
      <Field {form} name="radio">
        <legend>Gender</legend>
        <RadioGroup.Root
          bind:value={$formData.radio}
          name="radio"
          class="gap-0"
        >
          {#each [["male", "Male"], ["female", "Female"], ["other", "Other"]] as gender}
            <div class="flex items-center space-x-2">
              <Control>
                {#snippet children({ props })}
                  <RadioGroup.Item value={gender[0]} {...props} />
                  <Label class="font-normal">{gender[1]}</Label>
                {/snippet}
              </Control>
            </div>
          {/each}
        </RadioGroup.Root>
        <Description class="text-sm text-muted-foreground">
          Select your gender
        </Description>
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>
    <div class="space-y-2">
      <Field {form} name="radio_f8">
        <legend>Gender</legend>
        <RadioGroup.Root
          bind:value={$formData.radio_f8}
          name="radio_f8"
          class="gap-0"
        >
          {#each [["male", "Male"], ["female", "Female"], ["other", "Other"]] as gender}
            <div class="flex items-center space-x-2">
              <Control>
                {#snippet children({ props })}
                  <RadioGroup.Item value={gender[0]} {...props} />
                  <Label class="font-normal">{gender[1]}</Label>
                {/snippet}
              </Control>
            </div>
          {/each}
        </RadioGroup.Root>
        <Description class="text-sm text-muted-foreground">
          Select your gender
        </Description>
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>
    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>

<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group/index";
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms";
  import Button from "$lib/components/ui/button/button.svelte";

  let {
    data,
  }: {
    data: PageData;
  } = $props();
  let form = superForm(data.form, {
    validators: zodClient(schema),
  });
  let { form: formData, enhance } = form;
</script>

<!-- <Label class="text-sm font-medium">Gender</Label> -->
<div class="flex justify-center items-center min-h-[80vh]">
  <form method="POST" use:enhance class="space-y-2 min-w-96">
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
        <Description class="text-sm text-muted-foreground"
          >Select your gender</Description
        >
        <FieldErrors />
      </Field>
    </div>
    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>

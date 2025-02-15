
<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { schema } from "./schema";
  // FormSnap
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  // Components
  import Button from "$lib/components/ui/button/button.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import TagsInput from "$lib/components/ui/tags-input/tags-input.svelte";

  let {
    data,
  }: {
    data: PageData;
  } = $props();
  let form = superForm(data.form, {
    validators: zodClient(schema),
    onUpdated(event) {
      if (event.form.valid) {
        tagsvalue = [];
      }
    },
  });
  let { form: formData, enhance, message } = form;
  let tagsvalue = $state([]);
  $effect(() => {
    $formData.tagsinput_71 = tagsvalue;
  });
  </script>

<div class="flex min-h-[60vh] flex-col items-center justify-center">
  {#if $message}
    <span class="text-emerald-400">
      {$message}
    </span>
  {/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
      <div
        class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
      >
      <Field {form} name="boolean_bd">
        <Control>
          {#snippet children({ props })}
            <Checkbox {...props} bind:checked={$formData.boolean_bd} />
            <div class="space-y-1 leading-none">
              <Label class="font-medium">
                Use different settings for my mobile devices
              </Label>
              <Description class="text-muted-foreground text-sm">
                You can manage your mobile notifications in the mobile settings page.
              </Description>
            </div>
            <input name={props.name} value={$formData.boolean_bd} hidden />
          {/snippet}
        </Control>
      </Field>
    </div>
      <fieldset>
        <!-- <legend class="mb-4 text-lg font-medium"> Email Notifications </legend> -->
      <div class="space-y-4 flex flex-row items-center justify-between rounded-lg border p-4">
        <Field
          {form}
          name="boolean_a9"
          >
          <Control>
            {#snippet children({ props })}
              <div class="space-y-0.5">
                <Label class='font-medium'> Marketing Email </Label>
                <Description class='text-muted-foreground text-sm'>
                  Receive emails about new products, features, and more.
                </Description>
              </div>
              <Switch {...props} bind:checked={$formData.boolean_a9} />
            {/snippet}
          </Control>
        </Field>
      </div>
    </fieldset>
       <!-- Add Tags Input Component from : https://www.shadcn-svelte-extras.com/components/tags-input -->
    <div>
      <Field {form} name="tagsinput_71">
        <Control>
          {#snippet children({ props })}
            <Label>Enter your tech stack.</Label>
            <TagsInput bind:value={tagsvalue} placeholder="Enter your tags" />
            {#each $formData.tagsinput_71 as item, i}
              <input
                {...props}
                type="hidden"
                bind:value={$formData.tagsinput_71[i]}
                name="tagsinput_71"
              />
            {/each}
          {/snippet}
        </Control>
        <Description class="text-sm text-muted-foreground">Add tags.</Description
        >
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>
    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>
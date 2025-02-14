
<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { schema } from "./schema";
  // FormSnap
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  // Components
  import Button from "$lib/components/ui/button/button.svelte";
  import { Input } from "$lib/components/ui/input";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import * as Select from "$lib/components/ui/select/index";

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
      <Field {form} name="text_cc">
        <Control>
          {#snippet children({ props })}
            <Label class='font-medium'>Username</Label>
            <Input
              {...props}
              type="text"
              placeholder="Enter your username"
              bind:value={$formData.text_cc}
            />
            <Description class="text-muted-foreground text-xs">
              This is your public display name
            </Description>
          {/snippet}
        </Control>
        <FieldErrors class='text-sm text-destructive' />
      </Field>
    </div>
      <fieldset>
        <!-- <legend class="mb-4 text-lg font-medium"> Email Notifications </legend> -->
      <div class="space-y-4 flex flex-row items-center justify-between rounded-lg border p-4">
        <Field
          {form}
          name="boolean_de"
          >
          <Control>
            {#snippet children({ props })}
              <div class="space-y-0.5">
                <Label class='font-medium'> Marketing Email </Label>
                <Description class='text-muted-foreground text-sm'>
                  Receive emails about new products, features, and more.
                </Description>
              </div>
              <Switch {...props} bind:checked={$formData.boolean_de} />
            {/snippet}
          </Control>
        </Field>
      </div>
    </fieldset>
      <div>
        <Field {form} name="select_5c">
          <Control>
            {#snippet children({ props })}
              <Label class='font-medium'>
                Framework
              </Label>
              <Select.Root
                type="single"
                bind:value={$formData.select_5c}
                name={props.name}
              >
                <Select.Trigger {...props}>
                  {$formData.select_5c
                    ? $formData.select_5c
                    : "Select a framework"}
                </Select.Trigger>
                <Select.Content>
                  <!-- Change Items based on your need -->
                  <Select.Item value="svelte" label="Svelte" />
                  <Select.Item value="vue" label="Vue" />
                  <Select.Item value="react" label="React" />
                  <Select.Item value="angular" disabled label="Angular" />
                </Select.Content>
              </Select.Root>
            {/snippet}
          </Control>
          <Description class="text-muted-foreground text-sm">
            Select your favorite framework
          </Description>
          <FieldErrors class='text-sm text-destructive' />
        </Field>
      </div>
    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>
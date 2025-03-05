<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import {  zod } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { schema } from "./schema";
  // FormSnap
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  // Components
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
	let {
		data
	}: {
		data: PageData;
	} = $props();

  let form = superForm(data.form, {
      validators: zod(schema)
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
        <h2 class="text-2xl font-semibold leading-none tracking-tight">
          Create Account
        </h2>
        <p class="text-sm text-muted-foreground">
          Please fill out the form below to create an account.
        </p>
    <div>
      <Field {form} name="text">
        <Control>
          {#snippet children({ props })}
            <Label class='font-medium'>Username</Label>
            <Input
              {...props}
              type="text"
              placeholder="Enter your username"
              bind:value={$formData.text}
            />
            <Description class="text-muted-foreground text-xs">
              This is your public display name
            </Description>
          {/snippet}
        </Control>
        <FieldErrors class='text-sm text-destructive' />
      </Field>
    </div>
    <div>
      <Field {form} name="email">
        <Control>
          {#snippet children({ props })}
            <Label class='font-medium'>Email</Label>
            <Input
              {...props}
              type="email"
              placeholder="Enter your email"
              bind:value={$formData.email}
            />
            <Description class="text-muted-foreground text-xs">
              Enter your email address
            </Description>
          {/snippet}
        </Control>
        <FieldErrors class='text-sm text-destructive' />
      </Field>
    </div>
    <div>
      <Field {form} name="textarea">
        <Control>
          {#snippet children({ props })}
            <Label class='font-medium'>Bio</Label>
            <Textarea
              {...props}
              name="textarea"
              id="textarea"
              placeholder="Enter your bio"
              bind:value={$formData.textarea}
            />
            <Description class="text-muted-foreground text-xs">
              Tell us about yourself
            </Description>
          {/snippet}
        </Control>
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>
    <div>
      <Field {form} name="number">
        <Control>
          {#snippet children({ props })}
            <Label class='font-medium'>Age</Label>
            <Input
              {...props}
              type="number"
              placeholder="Enter your age"
              bind:value={$formData.number}
            />
            <Description class="text-muted-foreground text-xs">
              This is your age
            </Description>
          {/snippet}
        </Control>
        <FieldErrors class='text-sm text-destructive' />
      </Field>
    </div>

    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>
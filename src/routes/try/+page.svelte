<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import {  zod } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { schema } from "./schema";
  // FormSnap
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  // Components
  import Button from "$lib/components/ui/button/button.svelte";
  import { Input } from "$lib/components/ui/input";

  let {
    data,
  }: {
    data: PageData;
  } = $props();
  let form = superForm(data.form, {
    validators: zod(schema),
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
      <Field {form} name="password">
        <Control>
          {#snippet children({ props })}
            <Label class='font-medium'>Password</Label>
            <Input
              {...props}
              type="password"
              placeholder="password"
              bind:value={$formData.password}
            />
            <Description class="text-muted-foreground text-xs">
              Enter your password
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

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
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";

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
      <Field {form} name="username">
        <Control>
          {#snippet children({ props })}
            <Label>Username</Label>
            <Input
              {...props}
              type="text"
              placeholder="Enter your username"
              bind:value={$formData.username}
            />
          {/snippet}
        </Control>
        <FieldErrors class='text-sm text-destructive' />
      </Field>
    </div>
    <div>
      <Field {form} name="bio">
        <Control>
          {#snippet children({ props })}
            <Label>Bio</Label>
            <Textarea
              {...props}
              name="bio"
              id="bio"
              placeholder="Enter your bio"
              bind:value={$formData.bio}
            />
          {/snippet}
        </Control>
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>
    <div>
      <Field {form} name="name">
        <Control>
          {#snippet children({ props })}
            <Label>Username</Label>
            <Input
              {...props}
              type="text"
              placeholder="Enter your username"
              bind:value={$formData.name}
            />
          {/snippet}
        </Control>
        <FieldErrors class='text-sm text-destructive' />
      </Field>
    </div>
    <div>
      <Field {form} name="age">
        <Control>
          {#snippet children({ props })}
            <Label>Age</Label>
            <Input
              {...props}
              type="number"
              placeholder="Enter your age"
              bind:value={$formData.age}
            />
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
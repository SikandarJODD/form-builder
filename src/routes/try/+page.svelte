<script lang="ts">
  import { superForm  } from "sveltekit-superforms";
  import {  zod } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { schema } from "./schema";
  // FormSnap
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  // Components
  import Button from "$lib/components/ui/button/button.svelte";
  import TagsInput from "$lib/components/ui/tags-input/tags-input.svelte";
  import * as InputOTP from "$lib/components/ui/input-otp/index";
  import { REGEXP_ONLY_DIGITS } from "bits-ui";
	let {
		data
	}: {
		data: PageData;
	} = $props();

  let form = superForm(data.form, {
      validators: zod(schema),
        onUpdated(event) {
          if (event.form.valid) {
            tagsinput_value = [];
          }
        }
    });

let { form: formData, enhance, message } = form;
    let tagsinput_value = $state([]);
    $effect(() => {
      $formData.tagsinput = tagsinput_value;
    });
  </script>

<div class="flex min-h-[60vh] flex-col items-center justify-center">
  {#if $message}
    <span class="text-emerald-400">
      {$message}
    </span>
  {/if}
  <form method="post"  use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
       <!-- Add Tags Input Component from : https://www.shadcn-svelte-extras.com/components/tags-input -->
    <div>
      <Field {form} name="tagsinput">
        <Control>
          {#snippet children({ props })}
            <Label>Enter your tech stack.</Label>
            <TagsInput bind:value={tagsinput_value} placeholder="Enter your tags" />
            {#each $formData.tagsinput as item, i}
              <input
                {...props}
                type="hidden"
                bind:value={$formData.tagsinput[i]}
                name="tagsinput"
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
        <Field {form} name="inputotp">
          <Control>
            {#snippet children({ props })}
              <Label class="font-medium text-sm">One-Time Password</Label>
              <InputOTP.Root maxlength={6} {...props} bind:value={$formData.inputotp} pattern={REGEXP_ONLY_DIGITS}>
                {#snippet children({ cells })}
                  <InputOTP.Group>
                    {#each cells.slice(0, 3) as cell}
                      <InputOTP.Slot {cell} />
                    {/each}
                  </InputOTP.Group>
                  <InputOTP.Separator />
                  <InputOTP.Group>
                    {#each cells.slice(3, 6) as cell}
                      <InputOTP.Slot {cell} />
                    {/each}
                  </InputOTP.Group>
                {/snippet}
              </InputOTP.Root>
            {/snippet}
          </Control>
          <Description class="text-muted-foreground text-xs">
            Please enter the one-time password sent to your phone.
          </Description>
          <FieldErrors class="text-xs text-destructive" />
        </Field>
      </div>
    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>
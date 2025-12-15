<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Button } from "$lib/components/ui/button";

  import { superForm } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  // schema and PageData will be according to your file location
  import { schema } from "../../../../routes/templates/authentication/reset-password/schema";
  import type { PageData } from "../../../../routes/templates/authentication/reset-password/$types";
  import PasswordInput from "../comps/PasswordInput.svelte";
  import { untrack } from "svelte";

  let {
    data,
  }: {
    data: PageData;
  } = $props();

  let { form, message, errors, enhance } = superForm(
    untrack(() => data.form),
    {
      validators: zod4Client(schema),
    }
  );
</script>

<Card.Root class="h-fit w-full md:w-96">
  <Card.Header class="space-y-1">
    <Card.Title class="text-2xl">Reset Password</Card.Title>
    <Card.Description
      >Enter your new password to reset your password.</Card.Description
    >
  </Card.Header>
  <form method="post" use:enhance>
    <Card.Content class="grid space-y-3 pt-2">
      <div>
        <PasswordInput
          id="new_password"
          name="new_password"
          bind:value={$form.new_password}
          error={$errors.new_password}
          label="New Password"
        />
        {#if $errors.new_password}
          <p class="text-sm text-destructive">{$errors.new_password}</p>
        {/if}
      </div>

      <div>
        <PasswordInput
          id="confirm_password"
          name="confirm_password"
          bind:value={$form.confirm_password}
          error={$errors.confirm_password}
          label="Confirm Password"
        />
        {#if $errors.confirm_password}
          <p class="text-sm text-destructive">{$errors.confirm_password}</p>
        {/if}
      </div>
      <Button type="submit">Reset Password</Button>
    </Card.Content>
  </form>
</Card.Root>

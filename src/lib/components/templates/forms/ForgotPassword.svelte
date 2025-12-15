<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Button } from "$lib/components/ui/button";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";

  import { superForm } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  // schema and PageData will be according to your file location
  import { schema } from "../../../../routes/templates/authentication/forgot-password/schema";
  import type { PageData } from "../../../../routes/templates/authentication/forgot-password/$types";
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
    <Card.Title class="text-2xl">Forgot Password</Card.Title>
    <Card.Description
      >Enter your email address to receive a password reset link.</Card.Description
    >
  </Card.Header>
  <form method="post" use:enhance>
    <Card.Content class="grid space-y-3 pt-2">
      <div>
        <Label for="email" class={$errors.email && "text-destructive"}
          >Email</Label
        >
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="johndoe@gmail.com"
          bind:value={$form.email}
        />
        {#if $errors.email}
          <p class="text-sm text-destructive">{$errors.email}</p>
        {/if}
      </div>
      <Button type="submit" size="sm">Send Reset Link</Button>
    </Card.Content>
  </form>
</Card.Root>

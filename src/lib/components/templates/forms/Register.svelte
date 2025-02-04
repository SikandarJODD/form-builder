<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Button } from "$lib/components/ui/button";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import PhoneInput from "$lib/components/ui/phone-input/phone-input.svelte";

  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import { schema } from "../../../../routes/templates/authentication/register/schema";
  import type { PageData } from "../../../../routes/templates/authentication/register/$types";
  import PasswordInput from "../comps/PasswordInput.svelte";
  let {
    data,
  }: {
    data: PageData;
  } = $props();
  let { form, message, errors, enhance } = superForm(data.form, {
    validators: zod(schema),
  });
</script>

<Card.Root class="h-fit w-full md:w-96">
  <Card.Header class="space-y-1">
    <Card.Title class="text-2xl">Register</Card.Title>
    <Card.Description
      >Create a new account by filling out the form below.</Card.Description
    >
  </Card.Header>
  <form method="post" use:enhance>
    <Card.Content class="grid space-y-3 pt-2">
      <div>
        <Label for="full_name" class={$errors.full_name && "text-destructive"}
          >Full Name</Label
        >
        <Input
          type="text"
          id="full_name"
          name="full_name"
          placeholder="John doe"
          bind:value={$form.full_name}
        />
        {#if $errors.full_name}
          <p class="text-sm text-destructive">{$errors.full_name}</p>
        {/if}
      </div>
      <div>
        <Label for="email" class={$errors.email && "text-destructive"}
          >Email</Label
        >
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          bind:value={$form.email}
        />
        {#if $errors.email}
          <p class="text-sm text-destructive">{$errors.email}</p>
        {/if}
      </div>
      <div>
        <Label for="phone" class={$errors.phone && "text-destructive"}
          >Phone number</Label
        >
        <PhoneInput
          country="IN"
          name="phone"
          placeholder="Enter a phone number"
          bind:value={$form.phone}
        />
        <p class="text-xs text-muted-foreground"></p>
        {#if $errors.phone}
          <p class="text-sm text-destructive">{$errors.phone}</p>
        {/if}
      </div>
      <div>
        <PasswordInput
          error={$errors.password}
          id="password"
          bind:value={$form.password}
          name="password"
          label="Password"
        />
        {#if $errors.password}
          <p class="text-sm text-destructive">{$errors.password}</p>
        {/if}
      </div>
      <div>
        <PasswordInput
          error={$errors.confirm_password}
          id="confirm_password"
          bind:value={$form.confirm_password}
          name="confirm_password"
          label="Confirm Password"
        />
        {#if $errors.confirm_password}
          <p class="text-sm text-destructive">{$errors.confirm_password}</p>
        {/if}
      </div>
      <Button type="submit" size="sm">Submit</Button>
      <Button variant="outline">Login with Google</Button>
      <p class="text-center text-muted-foreground">
        Already have an account? <a href="#" class="underline text-primary"
          >Login</a
        >
      </p>
    </Card.Content>
  </form>
</Card.Root>

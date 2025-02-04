<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Button } from "$lib/components/ui/button";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";

  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import { schema } from "../../../../routes/templates/contact/contact/schema";
  import type { PageData } from "../../../../routes/templates/contact/contact/$types";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  let {
    data,
  }: {
    data: PageData;
  } = $props();
  let { form, message, errors, enhance } = superForm(data.form, {
    validators: zod(schema),
  });
</script>

<Card.Root class="h-fit w-full md:w-[460px]">
  <Card.Header class="space-y-1">
    <Card.Title class="text-2xl">Contact Us</Card.Title>
    <Card.Description
      >Please fill out the form below and we will get back to you shortly.</Card.Description
    >
  </Card.Header>
  <form method="post" use:enhance>
    <Card.Content class="grid space-y-3 pt-2">
      <div class='space-y-1'>
        <Label for="name" class={$errors.name && "text-destructive"}>Name</Label
        >
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          bind:value={$form.name}
        />
        {#if $errors.name}
          <p class="text-sm text-destructive">{$errors.name}</p>
        {/if}
      </div>
      <div class='space-y-1'>
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
      <div class='space-y-1'>
        <Label for="bio" class={$errors.bio && "text-destructive"}
          >Message</Label
        >
        <Textarea
          placeholder="Tell us a little bit about yourself"
          class="resize-none"
          id="bio"
          name="bio"
          bind:value={$form.bio}
        />
        <p class="text-xs text-muted-foreground"></p>
        {#if $errors.bio}
          <p class="text-sm text-destructive">{$errors.bio}</p>
        {/if}
      </div>
      <Button type="submit" size="sm">Send Message</Button>
    </Card.Content>
  </form>
</Card.Root>

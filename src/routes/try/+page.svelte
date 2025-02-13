<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  // add your own path
  import type { PageData } from "./$types";
  import Label from "$lib/components/ui/label/label.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import { valibot } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";

  let {
    data,
  }: {
    data: PageData;
  } = $props();
  let { form, message, errors, enhance } = superForm(data.form, {
    validators: valibot(schema),
  });
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center">
  {#if $message}
    <p class="text-emerald-400">{$message}</p>
  {/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Label for="text_b0" class={$errors.text_b0 && "text-destructive"}
        >Username</Label
      >
      <Input
        type="text"
        id="text_b0"
        name="text_b0"
        placeholder="Enter your username"
        bind:value={$form.text_b0}
      />
      {#if $errors.text_b0}
        <p class="text-sm text-destructive">{$errors.text_b0}</p>
      {/if}
      <p class="text-xs text-muted-foreground">
        This is your public display name
      </p>
    </div>

    <div>
      <Label for="email_d4" class={$errors.email_d4 && "text-destructive"}
        >Email</Label
      >
      <Input
        type="email"
        id="email_d4"
        name="email_d4"
        placeholder="Enter your email"
        bind:value={$form.email_d4}
      />
      {#if $errors.email_d4}
        <p class="text-sm text-destructive">{$errors.email_d4}</p>
      {/if}
      <p class="text-xs text-muted-foreground">Enter your email address</p>
    </div>

    <div>
      <Label for="textarea_3a" class={$errors.textarea_3a && "text-destructive"}
        >Bio</Label
      >
      <Textarea
        placeholder="Tell us a little bit about yourself"
        class="resize-none"
        id="textarea_3a"
        name="textarea_3a"
        bind:value={$form.textarea_3a}
      />
      <p class="text-xs text-muted-foreground">Tell us about yourself</p>
      {#if $errors.textarea_3a}
        <p class="text-xs text-destructive">{$errors.textarea_3a}</p>
      {/if}
    </div>

    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>

<script lang="ts">
  import Login from "$lib/components/templates/forms/Login.svelte";
  import type { PageData } from "./$types";
  import * as Tabs from "$lib/components/ui/tabs/index";
  import CopyCode from "$lib/components/web/playground/code/CopyCode.svelte";

  let { data }: { data: PageData } = $props();
  let spl_comps = [
    {
      name: "Password Input",
      url: "",
    },
  ];
  let tab_value = $state("preview");
  let schemaCode = `
  import { z } from 'zod';
  export let schema = z.object({
   email: z.string().email(),
   password: z.string().min(3),
  })
  `;
  let pageServerCode = `
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

// add your own schema path here
import { schema } from './schema';

export const load: PageServerLoad = async ({ request }) => {
    return { form: await superValidate(zod(schema)) }
};

export const actions: Actions = {
    default: async ({ request }) => {
        let form = await superValidate(request, zod(schema));
        console.log(form,'form');
        if (!form.valid) {
            return fail(400, { form });
        }
        return message(form, 'Form Posted Successfully!');
    }
};
  `;
  let pageSvelteCode =
    `
  <script lang="ts">` +
    `
  import * as Card from "$lib/components/ui/card/index";
  import { Button } from "$lib/components/ui/button";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import PasswordInput from "../comps/PasswordInput.svelte";

  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";
  import type { PageData } from "./$types";
  let {
    data,
  }: {
    data: PageData;
  } = $props();
  let { form, message, errors, enhance } = superForm(data.form, {
    validators: zod(schema),
  });</` +
    `script>

<Card.Root class="h-fit w-full md:w-96">
  <Card.Header class="space-y-1">
    <Card.Title class="text-2xl">Login</Card.Title>
    <Card.Description
      >Enter your email and password to login to your account.</Card.Description
    >
  </Card.Header>
  <form method="post" use:enhance>
    <Card.Content class="grid space-y-3 pt-2">
      <div class="space-y-1">
        <Label for="email" class={$errors.email && "text-destructive"}
          >Email</Label
        >
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="john@example.com"
          bind:value={$form.email}
        />
        {#if $errors.email}
          <p class="text-sm text-destructive">{$errors.email}</p>
        {/if}
      </div>
      <div>
        <PasswordInput
          error={$errors.password}
          id="password"
          bind:value={$form.password}
          name="password"
        />
        {#if $errors.password}
          <p class="text-sm text-destructive">{$errors.password}</p>
        {/if}
      </div>
      <Button type="submit">Login</Button>
      <Button variant="outline">Login with Google</Button>
      <p class="text-center text-muted-foreground">
        Don't have an account? <a href="#" class="underline text-primary"
          >Sign up</a
        >
      </p>
    </Card.Content>
  </form>
</Card.Root>`;
</script>

<div class="mb-4 w-full">
  <h2 class="text-2xl font-semibold">Login Form</h2>
  <p class="text-muted-foreground">
    This form includes special component,add the component in your directory.
  </p>
  <div class="flex items-center w-full justify-between mt-1">
    <div>
      <ul>
        {#each spl_comps as item, index}
          <li>
            <a href={item.url} class="text-sm">{item.name}</a>
          </li>
        {/each}
      </ul>
    </div>
    <div>
      <Tabs.Root bind:value={tab_value}>
        <Tabs.List>
          <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
          <Tabs.Trigger value="schema">Schema</Tabs.Trigger>
          <Tabs.Trigger value="client">Client</Tabs.Trigger>
          <Tabs.Trigger value="server">Server</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </div>
  </div>
</div>
{#if tab_value === "preview"}
  <div class="flex justify-center">
    <Login {data} />
  </div>
{:else if tab_value === "schema"}
  <div class="flex">
    <CopyCode code={schemaCode} />
  </div>
{:else if tab_value === "client"}
  <div class="flex">
    <CopyCode code={pageSvelteCode} />
  </div>
{:else if tab_value === "server"}
  <div class="flex">
    <CopyCode code={pageServerCode} />
  </div>
{/if}

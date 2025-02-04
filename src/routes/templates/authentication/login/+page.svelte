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
</script>

<div class="mb-4 w-full">
  <h2 class="text-2xl font-semibold">Login Form</h2>
  <p class="text-muted-foreground">
    This form includes special component,add the component in your directory.
  </p>
  <div class="flex items-center w-full justify-between">
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
          <Tabs.Trigger value="code">Code</Tabs.Trigger>
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
{:else if tab_value === "code"}
  coding is fun
{/if}

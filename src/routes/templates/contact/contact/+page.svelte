<script lang="ts">
  import type { PageData } from "./$types";
  import ContactForm from "$lib/components/templates/forms/ContactForm.svelte";
  import ContactFormCode from "$lib/components/templates/forms/ContactForm.svelte?raw";

  import CopyCode from "$lib/components/web/playground/code/CopyCode.svelte";
  import * as Tabs from "$lib/components/ui/tabs/index";
  import { pageServerCode } from "../../serverCopyCode";
  import TemplatesTabs from "$lib/components/templates/comps/TemplatesTabs.svelte";
  let spl_comps = [
    {
      name: "Password Input",
      url: "/docs/components/password-input",
    },
  ];
  let tab_value = $state("preview");
  let {
    data,
  }: {
    data: PageData;
  } = $props();

  let schemaCode = `import { z } from 'zod';
export let schema = z.object({
  name: z.string(),
  email: z.string().email(),
  bio: z.string().min(10),
})`;
  let pageSvelteCode = ContactFormCode;
</script>

<div class="mb-4 w-full">
  <h2 class="text-2xl font-semibold">Contact Form</h2>
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
      <TemplatesTabs bind:tab_value />
    </div>
  </div>
</div>
{#if tab_value === "preview"}
  <div class="flex justify-center">
    <ContactForm {data} />
  </div>
{:else if tab_value === "schema"}
  <div class="flex max-h-[420px]">
    <CopyCode code={schemaCode} />
  </div>
{:else if tab_value === "client"}
  <div class="flex max-h-[420px]">
    <CopyCode lang="svelte" code={pageSvelteCode} />
  </div>
{:else if tab_value === "server"}
  <div class="flex max-h-[420px]">
    <CopyCode code={pageServerCode} />
  </div>
{/if}

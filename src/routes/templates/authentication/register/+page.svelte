<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  // add your own path
  import type { PageData } from "./$types";
  import { zod } from "sveltekit-superforms/adapters";
  import CopyCode from "$lib/components/web/playground/code/CopyCode.svelte";
  import { schema } from "./schema";
  import Register from "$lib/components/templates/forms/Register.svelte";
  import RegisterCode from "$lib/components/templates/forms/Register.svelte?raw";
  import TemplatesTabs from "$lib/components/templates/comps/TemplatesTabs.svelte";

  let {
    data,
  }: {
    data: PageData;
  } = $props();
  let { form, message, errors, enhance } = superForm(data.form, {
    validators: zod(schema),
  });

  let spl_comps = [
    {
      name: "Password Input",
      url: "/docs/components/password-input",
    },
  ];
  let tab_value = $state("preview");

  let schemaCode = `import { z } from 'zod';
export let schema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  path: ['confirm_password'],
  message: 'Passwords do not match',
})
`;
  let pageSvelteCode = RegisterCode;
  let pageServerCode = `import type { Actions } from '@sveltejs/kit';
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
};`;
</script>

<div class="mb-4 w-full">
  <h2 class="text-2xl font-semibold">Register Form</h2>
  <p class="text-muted-foreground">
    This form includes special component,add the component in your directory.
  </p>
  <div class="flex items-center w-full justify-between mt-2 mb-4">
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
  {#if tab_value === "preview"}
    <div class="flex justify-center">
      <Register {data} />
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
</div>

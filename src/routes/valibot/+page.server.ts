import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { schema } from './schema';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  let form = await superValidate(valibot(schema));
  return { form };
};


export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, valibot(schema));
    console.log(form);

    if (!form.valid) {
      // Return { form } and things will just work.
      return fail(400, { form });
    }

    // TODO: Do something with the validated form.data

    // Return the form with a status message
    return message(form, 'Form posted successfully!');
  }
};
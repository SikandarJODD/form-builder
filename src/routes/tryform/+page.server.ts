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
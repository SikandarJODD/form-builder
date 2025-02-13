import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const actions: Actions = {
    default: async ({ request }) => {
        let form = await request.formData();
    }
};
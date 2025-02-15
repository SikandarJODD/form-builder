import type { PageServerLoad } from "./$types";

import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

// Schema
import { schema } from "./schema";
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return { form: await superValidate(zod(schema)) }
};

export const actions: Actions = {
    default: async ({ request }) => {
        let formData = await superValidate(request, zod(schema));
        console.log('form', formData);
        if (!formData.valid) {
            fail(400, { formData });
        }

        return message(formData, 'User details saved successfully');
    }
};
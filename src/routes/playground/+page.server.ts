import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		let form = await request.formData();
		console.log('form: ', form);
		// Convert FormData to a plain object
		const formObject: any = {};
		for (let [key, value] of form.entries()) {
			formObject[key] = value;
		}

		return {
			success: true,
			form: formObject // Returning a serializable object
		};
	}
};

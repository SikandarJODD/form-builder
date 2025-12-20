import * as z from 'zod';
export let schema = z.object({
	email: z.email({ error: 'Please enter a valid email address.' }),
	password: z
		.string({ error: 'Please enter your password.' })
		.min(3, { error: 'Password must be at least 3 characters long.' })
});

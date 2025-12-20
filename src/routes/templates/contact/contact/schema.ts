import { z } from 'zod';
export let schema = z.object({
	name: z.string({ error: 'Please enter your name.' }),
	email: z.email({ error: 'Please enter a valid email address.' }),
	bio: z
		.string({ error: 'Please enter your message.' })
		.min(10, { error: 'Message must be at least 10 characters long.' })
});

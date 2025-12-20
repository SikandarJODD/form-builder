import { z } from 'zod';
export let schema = z.object({
	slider: z.number().min(0).max(100)
});

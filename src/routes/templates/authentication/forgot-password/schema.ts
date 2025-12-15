import { z } from 'zod';
export let schema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
})
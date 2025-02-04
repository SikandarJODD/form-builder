import { z } from 'zod';
export let schema = z.object({
  email: z.string().email(),
})
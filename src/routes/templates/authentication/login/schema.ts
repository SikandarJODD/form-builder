import { z } from 'zod';
export let schema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})
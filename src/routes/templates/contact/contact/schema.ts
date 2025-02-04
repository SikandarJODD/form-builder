import { z } from 'zod';
export let schema = z.object({
  name: z.string(),
  email: z.string().email(),
  bio: z.string().min(10),
})
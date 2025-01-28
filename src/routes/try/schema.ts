import { z } from 'zod';
export let schema = z.object({
  bio: z.string().min(14),
})
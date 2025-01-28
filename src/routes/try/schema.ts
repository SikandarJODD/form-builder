import { z } from 'zod';
export let schema = z.object({
  username: z.string(),
  password: z.string().min(3).max(8),
  switch: z.boolean().default(false),
  check: z.boolean().default(false),
})
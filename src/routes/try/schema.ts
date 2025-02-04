import { z } from 'zod';
export let schema = z.object({
  name_ce816: z.string(),
  bio: z.string().min(10),
})
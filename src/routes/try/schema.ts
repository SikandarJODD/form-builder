import { z } from 'zod';
export let schema = z.object({
  name_1130c: z.string(),
  name_ec6cc: z.string().array().min(4),
})
import { z } from 'zod';
export let schema = z.object({
  slider: z.number().min(49).max(83),
})
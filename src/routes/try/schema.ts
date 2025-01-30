import { z } from 'zod';
export let schema = z.object({
  name_8eebb: z.string(),
  name_2d140: z.string().min(6, {
      message: "Your one-time password must be at least 6 characters."
  }),
})
import { z } from 'zod';
export let schema = z.object({
  new_password: z.string(),
  confirm_password: z.string(),
})
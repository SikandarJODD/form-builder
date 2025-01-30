import { z } from 'zod';
export let schema = z.object({
  name_809aa: z.string(),
  name_a8e75: z.string().refine((v) => v,
 { message: "A date of birth is required." }),
})
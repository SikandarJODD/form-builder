import { z } from 'zod';
export let schema = z.object({
  datepicker: z.string().refine((v) => v,
 { message: "A date of birth is required." }),
  datepick: z.string().refine((v) => v,
 { message: "A date of birth is required." }),
})
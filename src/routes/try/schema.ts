import { z } from 'zod';
export let schema = z.object({
  text: z.string().nonempty(),
  email: z.string().email(),
  textarea: z.string().nonempty(),
  number: z.number().int(),
})
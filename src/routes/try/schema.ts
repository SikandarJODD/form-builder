import { z } from 'zod';
export let schema = z.object({
  text: z.string().nonempty(),
  loc: z.object({
    country: z.string().nonempty(),
    state: z.string().nonempty(),
  }),
})
import { z } from 'zod';
export let schema = z.object({
  text_cc: z.string().nonempty(),
  boolean_de: z.boolean().default(false),
  select_5c: z.string().nonempty(),
})
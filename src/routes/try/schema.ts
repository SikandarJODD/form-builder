import { z } from 'zod';
export let schema = z.object({
  combobox: z.string().nonempty(),
  frame: z.string().nonempty(),
})
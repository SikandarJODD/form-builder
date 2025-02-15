import { z } from 'zod';
export let schema = z.object({
  tagsinput_c9: z.string().array()
   .min(1, { message: 'Please enter at least one tag' }),
  combobox_e7: z.string().nonempty(),
})
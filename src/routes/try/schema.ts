import { z } from 'zod';
export let schema = z.object({
  tagsinput: z.string().array()
   .min(1, { message: 'Please enter at least one tag' }),
  tagsinput_f6: z.string().array()
   .min(1, { message: 'Please enter at least one tag' }),
  combobox: z.string().nonempty(),
  tagsinput_eb: z.string().array()
   .min(1, { message: 'Please enter at least one tag' }),
})
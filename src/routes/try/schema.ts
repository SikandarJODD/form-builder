import { z } from 'zod';
export let schema = z.object({
  name_ed8ee: z.string({
    message: 'Name is required'
  }),
  name_d2ffa: z.string({
    message: 'Name is required'
  }),
})
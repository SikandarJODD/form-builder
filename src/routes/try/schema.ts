import { z } from 'zod';
export let schema = z.object({
  tagsinput: z.string().array()
   .min(1, { message: 'Please enter at least one tag' }),
  inputotp: z.string().min(6, {
      message: "Your one-time password must be at least 6 characters."
  }),
})
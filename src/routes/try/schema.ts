import { z } from 'zod';
export let schema = z.object({
  radio: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a radio option',
  })
})
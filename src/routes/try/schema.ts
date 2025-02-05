import { z } from 'zod';
export let schema = z.object({
  name_f8817: z.string().min(2),
  name_beb97: z.string().email(),
  name_0196f: z.string().nonempty(),
  name_be332: z.string().nonempty(),
  name_1a3ed: z.string().nonempty(),
})
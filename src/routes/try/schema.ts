import { z } from 'zod';
export let schema = z.object({
  username: z.string().nonempty(),
  bio: z.string().nonempty(),
  name: z.string().nonempty(),
  age: z.number().int().min(5),
})
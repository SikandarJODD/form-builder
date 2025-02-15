import { z } from 'zod';
export let schema = z.object({
    boolean_bd: z.boolean().default(false),
    boolean_a9: z.boolean().default(false),
    tagsinput_71: z.string().array().min(1, { message: 'Please enter at least one tag' }),
})
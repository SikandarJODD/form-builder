import { z } from 'zod';
export let schema = z.object({
    phone: z.string().nonempty(),
});
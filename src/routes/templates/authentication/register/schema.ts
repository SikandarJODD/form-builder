import { z } from 'zod';
export let schema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  path: ['confirm_password'],
  message: 'Passwords do not match',
})

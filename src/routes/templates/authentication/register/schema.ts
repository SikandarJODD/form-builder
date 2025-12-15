import { z } from 'zod';
export let schema = z.object({
  full_name: z.string({ error: "Please enter your full name." }),
  email: z.email({ error: "Please enter a valid email address." }),
  phone: z.string({ error: "Please enter your phone number." }),
  password: z
    .string({ error: "Please enter your password." })
    .min(6, { error: 'Password must be at least 6 characters long.' })
    .regex(/[a-zA-Z0-9]/, { error: 'Password must be alphanumeric.' }),
  confirm_password: z.string({ error: "Please confirm your password." }),
}).refine((data) => data.password === data.confirm_password, {
  path: ['confirm_password'],
  error: 'Passwords do not match.',
})

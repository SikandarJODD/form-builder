import * as v from 'valibot';
export const schema = v.object({
  email: v.pipe(
    v.string(), v.email('Please enter a valid email address.')
  ),
  password: v.pipe(
    v.string(),
    v.minLength(6, 'The string must be 6 or more characters long.'),
    v.maxLength(10, 'The string must not exceed 10 characters.')
  ),
  bio: v.pipe(
    v.string(),
    v.minLength(7, 'The string must be 7 or more characters long.')
  ),
})
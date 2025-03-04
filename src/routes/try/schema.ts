import * as v from 'valibot';
export const schema = v.object({
  password: v.pipe(
    v.string(),
    v.minLength(6, 'Please enter at least 6 characters.')
  ),
})
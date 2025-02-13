import * as v from 'valibot';
export const schema = v.object({
  text_b0: v.pipe(
    v.string(),
    v.nonEmpty('Please enter your username.')
  ),
  email_d4: v.pipe(
    v.string(), v.email('Please enter a valid email address.')
  ),
  textarea_3a: v.pipe(
    v.string(),
    v.nonEmpty('Please enter your bio.')
  ),
})
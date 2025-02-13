import { object, string, email, optional, pipe, minLength } from 'valibot';

export const schema = object({
  name: pipe(optional(string(), 'Hello world!'), minLength(2)),
  email: pipe(string(), email())
});
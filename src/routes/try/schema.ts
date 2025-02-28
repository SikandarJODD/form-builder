import { z } from 'zod';
export const KILOBYTE = 1024;
export const MEGABYTE = 1024 * KILOBYTE;
export let schema = z.object({
  file: z.array(z.instanceof(File, {
        message: "Please select an image file.",
      }).refine((file) => file.size <= (MEGABYTE*2) , {
        message:"The image is too large.",
      })),
  file2: z.array(z.instanceof(File, {
        message: "Please select an image file.",
      }).refine((file) => file.size <= (MEGABYTE*2) , {
        message:"The image is too large.",
      })),
})
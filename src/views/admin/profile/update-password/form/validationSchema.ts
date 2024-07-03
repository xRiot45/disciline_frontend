import { z } from 'zod';

export const validationSchema = z.object({
  password: z.string().min(8, 'Password harus memiliki minimal 8 karakter!'),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

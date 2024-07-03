import { z } from 'zod';

export const validationSchema = z.object({
  username: z.string().min(1, 'Username harus diisi'),
  password: z.string().min(1, 'Password harus diisi'),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

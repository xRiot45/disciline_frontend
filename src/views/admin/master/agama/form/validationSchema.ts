import { z } from 'zod'

export const validationSchema = z.object({
  nama_agama: z.string().min(2, 'Form agama harus diisi!'),
})

export type ValidationSchema = z.infer<typeof validationSchema>

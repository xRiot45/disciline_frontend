import { z } from 'zod'

export const validationSchema = z.object({
  nama_jabatan: z.string().min(2, 'Form jabatan harus diisi!'),
})

export type ValidationSchema = z.infer<typeof validationSchema>

import { z } from 'zod'

export const validationSchema = z.object({
  nama_pendidikan: z.string().min(2, 'Form pendidikan harus diisi!'),
})

export type ValidationSchema = z.infer<typeof validationSchema>

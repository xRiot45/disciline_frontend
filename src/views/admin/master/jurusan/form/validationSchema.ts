import { z } from 'zod'

export const validationSchema = z.object({
  nama_jurusan: z.string().min(2, 'Form jurusan harus diisi!'),
})

export type ValidationSchema = z.infer<typeof validationSchema>

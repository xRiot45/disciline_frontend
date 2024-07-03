import { z } from 'zod'

export const validationSchema = z.object({
  nama_golongan: z.string().min(2, 'Form golongan harus diisi!'),
})

export type ValidationSchema = z.infer<typeof validationSchema>

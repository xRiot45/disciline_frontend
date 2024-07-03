import { z } from 'zod'

export const validationSchema = z.object({
  nama_status: z.string().min(2, 'Form status harus diisi!'),
})

export type ValidationSchema = z.infer<typeof validationSchema>

import { z } from 'zod'

export const validationSchema = z.object({
  nama_tipe_pelanggaran: z
    .string()
    .min(2, 'Form tipe pelanggaran harus diisi!'),
})

export type ValidationSchema = z.infer<typeof validationSchema>

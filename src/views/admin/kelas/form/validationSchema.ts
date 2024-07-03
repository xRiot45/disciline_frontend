import { z } from 'zod'

export const validationSchema = z.object({
  nama_kelas: z.string().min(2, 'Form nama kelas harus diisi!'),
  jurusanId: z.string().min(2, 'Form jurusan harus dipilih!'),
  guruId: z.string().min(2, 'Form guru harus dipilih!'),
})

export type ValidationSchema = z.infer<typeof validationSchema>

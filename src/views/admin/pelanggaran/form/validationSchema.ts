import { z } from 'zod'

export const validationSchema = z.object({
  tipePelanggaranId: z.string().min(2, 'Form tipe pelanggaran harus dipilih!'),
  siswaId: z.string().min(2, 'Form siswa harus dipilih!'),
  keterangan: z.string().min(2, 'Form keterangan harus diisi!'),
})

export type ValidationSchema = z.infer<typeof validationSchema>

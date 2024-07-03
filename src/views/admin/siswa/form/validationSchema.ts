import { z } from 'zod'

export const validationSchema = z.object({
  nama_lengkap: z.string().min(2, 'Form nama lengkap siswa harus diisi!'),
  nis: z.string().min(2, 'Form nis siswa harus diisi!'),
  nisn: z.string().min(2, 'Form nisn siswa harus diisi!'),
  tanggal_lahir: z
    .date()
    .max(new Date(), { message: 'Form tanggal lahir siswa harus diisi!' }),
  tempat_lahir: z.string().min(2, 'Form tempat lahir siswa harus diisi!'),
  jenis_kelamin: z.string().min(2, 'Form jenis kelamin siswa harus dipilih!'),
  agamaId: z.string().min(2, 'Form agama harus dipilih!'),
  kelasId: z.string().min(2, 'Form kelas harus dipilih!'),
  nama_wali: z.string().min(2, 'Form nama wali siswa harus diisi!'),
  no_telp_wali: z.string().min(2, 'Form no telp wali siswa harus diisi!'),
  alamat: z.string().min(2, 'Form alamat siswa harus diisi!'),
})

export type ValidationSchema = z.infer<typeof validationSchema>

import { z } from 'zod';

export const validationSchema = z.object({
  nama_lengkap: z.string().min(2, 'Form nama lengkap harus diisi!'),
  nip: z.string().min(2, 'Form nip harus diisi!'),
  statusId: z.string().min(2, 'Form status harus dipilih!'),
  jabatanId: z.string().min(2, 'Form jabatan harus dipilih!'),
  golonganId: z.string().min(2, 'Form golongan harus dipilih!'),
  agamaId: z.string().min(2, 'Form agama harus dipilih!'),
  jenis_kelamin: z.string().min(2, 'Form jenis kelamin harus dipilih!'),
  no_telp: z.string().min(2, 'Form no telp harus diisi!'),
  alamat: z.string().min(2, 'Form alamat harus diisi!'),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

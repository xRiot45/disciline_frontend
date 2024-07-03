export interface DATA_GURU {
  id: string;
  nama_lengkap: string;
  nip: string;
  status: {
    id: string;
    nama_status: string;
  };
  jabatan: {
    id: string;
    nama_jabatan: string;
  };
  golongan: {
    id: string;
    nama_golongan: string;
  };
  agama: {
    id: string;
    nama_agama: string;
  };
  jenis_kelamin: string;
  no_telp: string;
  alamat: string;
}

export interface DATA_GURU_FORM {
  nama_lengkap: string;
  nip: string;
  statusId: string;
  golonganId: string;
  jabatanId: string;
  agamaId: string;
  jenis_kelamin: string;
  no_telp: string;
  alamat: string;
}

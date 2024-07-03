export interface DATA_KELAS {
  id: string;
  nama_kelas: string;
  jurusan: {
    id: string;
    nama_jurusan: string;
  };
  guru: {
    id: string;
    nama_guru: string;
    no_telp: string;
  };
}

export interface DATA_KELAS_FORM {
  nama_kelas: string;
  jurusanId: string;
  guruId: string;
}

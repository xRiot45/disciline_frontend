export interface DATA_PELANGGARAN {
  id: string;
  tipe_pelanggaran: {
    id: string;
    nama_tipe_pelanggaran: string;
  };
  siswa: {
    id: string;
    nama_lengkap: string;
    kelas: {
      nama_kelas: string;
    };

    nama_wali: string;
    no_telp_wali: string;
    alamat: string;
  };
  keterangan: string;
}

export interface DATA_PELANGGARAN_FORM {
  tipePelanggaranId: string;
  siswaId: string;
  keterangan: string;
}

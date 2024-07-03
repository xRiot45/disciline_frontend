import { Input } from 'rizzui';
import { DATA_TIPE_PELANGGARAN_FORM } from '@/types/master/tipe-pelanggaran/type';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface PropTypes {
  register: UseFormRegister<DATA_TIPE_PELANGGARAN_FORM>;
  errors: FieldErrors<DATA_TIPE_PELANGGARAN_FORM>;
}

export default function FormLayout(props: PropTypes) {
  const { register, errors } = props;
  return (
    <>
      <Input
        type="text"
        size="lg"
        label="Nama Tipe Pelanggaran"
        placeholder="Masukkan tipe pelanggaran..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('nama_tipe_pelanggaran')}
        error={errors.nama_tipe_pelanggaran?.message}
      />
    </>
  );
}

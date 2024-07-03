import { Input } from 'rizzui';
import { DATA_JURUSAN_FORM } from '@/types/master/jurusan/type';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface PropTypes {
  register: UseFormRegister<DATA_JURUSAN_FORM>;
  errors: FieldErrors<DATA_JURUSAN_FORM>;
}

export default function FormLayout(props: PropTypes) {
  const { register, errors } = props;
  return (
    <>
      <Input
        type="text"
        size="lg"
        label="Nama Jurusan"
        placeholder="Masukkan jurusan..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('nama_jurusan')}
        error={errors.nama_jurusan?.message}
      />
    </>
  );
}

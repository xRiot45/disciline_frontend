import { Input } from 'rizzui';
import { DATA_AGAMA_FORM } from '@/types/master/agama/type';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface PropTypes {
  register: UseFormRegister<DATA_AGAMA_FORM>;
  errors: FieldErrors<DATA_AGAMA_FORM>;
}

export default function FormLayout(props: PropTypes) {
  const { register, errors } = props;
  return (
    <>
      <Input
        type="text"
        size="lg"
        label="Nama Agama"
        placeholder="Masukkan agama..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('nama_agama')}
        error={errors.nama_agama?.message}
      />
    </>
  );
}

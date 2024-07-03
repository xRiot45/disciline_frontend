import GuruSelect from '@/utils/guruSelect';
import JurusanSelect from '@/utils/jurusanSelect';
import { Input } from 'rizzui';
import { DATA_KELAS_FORM } from '@/types/kelas/type';
import { ValidationSchema } from './validationSchema';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

interface PropTypes {
  register: UseFormRegister<DATA_KELAS_FORM>;
  errors: FieldErrors<DATA_KELAS_FORM>;
  control: Control<ValidationSchema>;
}

export default function FormLayout(props: PropTypes) {
  const { register, errors, control } = props;
  return (
    <>
      <Input
        type="text"
        size="lg"
        label="Nama Kelas"
        placeholder="Masukkan nama kelas..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('nama_kelas')}
        error={errors.nama_kelas?.message}
      />

      <JurusanSelect control={control} error={errors.jurusanId?.message} />
      <GuruSelect control={control} error={errors.guruId?.message} />
    </>
  );
}

import { Input } from 'rizzui';
import { FormValues } from '@/types/master/golongan/type';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Proptypes {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

export default function FormLayout(props: Proptypes) {
  const { register, errors } = props;
  return (
    <>
      <Input
        type="text"
        size="lg"
        label="Nama Golongan"
        placeholder="Masukkan golongan..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('nama_golongan')}
        error={errors.nama_golongan?.message}
      />
    </>
  );
}

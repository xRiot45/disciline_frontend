import { Input } from 'rizzui';
import { DATA_STATUS_FORM } from '@/types/master/status/type';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Proptypes {
  register: UseFormRegister<DATA_STATUS_FORM>;
  errors: FieldErrors<DATA_STATUS_FORM>;
}

export default function FormLayout(props: Proptypes) {
  const { register, errors } = props;
  return (
    <>
      <Input
        type="text"
        size="lg"
        label="Nama Status"
        placeholder="Masukkan status..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('nama_status')}
        error={errors.nama_status?.message}
      />
    </>
  );
}

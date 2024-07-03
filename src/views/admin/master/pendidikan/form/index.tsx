import { Input } from 'rizzui';
import { DATA_PENDIDIKAN_FORM } from '@/types/master/pendidikan/type';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Proptypes {
  register: UseFormRegister<DATA_PENDIDIKAN_FORM>;
  errors: FieldErrors<DATA_PENDIDIKAN_FORM>;
}

export default function FormLayout(props: Proptypes) {
  const { register, errors } = props;
  return (
    <>
      <Input
        type="text"
        size="lg"
        label="Nama Pendidikan"
        placeholder="Masukkan pendidikan..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('nama_pendidikan')}
        error={errors.nama_pendidikan?.message}
      />
    </>
  );
}

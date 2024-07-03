import { Input } from 'rizzui';
import { DATA_JABATAN_FORM } from '@/types/master/jabatan/type';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Proptypes {
  register: UseFormRegister<DATA_JABATAN_FORM>;
  errors: FieldErrors<DATA_JABATAN_FORM>;
}

export default function FormLayout(props: Proptypes) {
  const { register, errors } = props;
  return (
    <>
      <Input
        type="text"
        size="lg"
        label="Nama Jabatan"
        placeholder="Masukkan jabatan..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('nama_jabatan')}
        error={errors.nama_jabatan?.message}
      />
    </>
  );
}

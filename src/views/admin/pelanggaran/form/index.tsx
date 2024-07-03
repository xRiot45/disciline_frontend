import SiswaSelect from '@/utils/siswaSelect';
import TipePelanggaranSelect from '@/utils/tipePelanggaranSelect';
import { Textarea } from 'rizzui';
import { ValidationSchema } from './validationSchema';
import { DATA_PELANGGARAN_FORM } from '@/types/pelanggaran/type';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

interface PropTypes {
  register: UseFormRegister<DATA_PELANGGARAN_FORM>;
  errors: FieldErrors<DATA_PELANGGARAN_FORM>;
  control: Control<ValidationSchema>;
}

export default function FormLayout(props: PropTypes) {
  const { register, errors, control } = props;
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <TipePelanggaranSelect
          control={control}
          error={errors.tipePelanggaranId?.message}
        />

        <SiswaSelect control={control} error={errors.siswaId?.message} />
      </div>

      <Textarea
        label="Keterangan"
        {...register('keterangan')}
        error={errors.keterangan?.message}
      />
    </>
  );
}

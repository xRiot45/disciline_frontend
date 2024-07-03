import AgamaSelect from '@/utils/agamaSelect';
import KelasSelect from '@/utils/kelasSelect';
import JenisKelaminSelect from '@/utils/jenisKelaminSelect';
import { DatePicker } from '@/components/ui/datepicker';
import { Input, Textarea } from 'rizzui';
import { DATA_SISWA_FORM } from '@/types/siswa/type';
import { ValidationSchema } from './validationSchema';
import { handleNumericChange } from '@/helpers/numericChange';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

interface Proptypes {
  register: UseFormRegister<DATA_SISWA_FORM>;
  errors: FieldErrors<DATA_SISWA_FORM>;
  control: Control<ValidationSchema>;
}

export default function FormLayout(props: Proptypes) {
  const { register, errors, control } = props;
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          type="text"
          size="lg"
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap..."
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('nama_lengkap')}
          error={errors.nama_lengkap?.message}
        />

        <Input
          type="text"
          size="lg"
          label="NIS"
          placeholder="Masukkan NIS..."
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('nis')}
          error={errors.nis?.message}
          onChange={handleNumericChange}
        />

        <Input
          type="text"
          size="lg"
          label="NISN"
          placeholder="Masukkan NISN..."
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('nisn')}
          error={errors.nisn?.message}
          onChange={handleNumericChange}
        />

        <Controller
          name="tanggal_lahir"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <DatePicker
              inputProps={{ label: 'Tanggal Lahir' }}
              placeholderText="Pilih tanggal lahir..."
              dateFormat="dd/MM/yyyy"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
            />
          )}
        />

        <Input
          type="text"
          size="lg"
          label="Tempat Lahir"
          placeholder="Masukkan tempat lahir..."
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('tempat_lahir')}
          error={errors.tempat_lahir?.message}
        />

        <JenisKelaminSelect
          control={control}
          error={errors.jenis_kelamin?.message}
        />
        <AgamaSelect control={control} error={errors.agamaId?.message} />
        <KelasSelect control={control} error={errors.kelasId?.message} />

        <Input
          type="text"
          size="lg"
          label="Nama Wali"
          placeholder="Masukkan nama wali..."
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('nama_wali')}
          error={errors.nama_wali?.message}
        />

        <Input
          type="text"
          size="lg"
          label="No Telp Wali"
          placeholder="Masukkan no telp wali..."
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('no_telp_wali')}
          error={errors.no_telp_wali?.message}
          onChange={handleNumericChange}
        />
      </div>

      <Textarea
        label="Alamat"
        {...register('alamat')}
        error={errors.alamat?.message}
      />
    </>
  );
}

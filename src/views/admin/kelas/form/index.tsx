import GuruSelect from '@/utils/guruSelect'
import JurusanSelect from '@/utils/jurusanSelect'
import { Input } from 'rizzui'

interface Proptypes {
  control: any
  register: any
  errors: any
}

export default function FormLayout(props: Proptypes) {
  const { register, errors, control } = props
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

      <JurusanSelect control={control} error={errors.statusId?.message} />
      <GuruSelect control={control} error={errors.golonganId?.message} />
    </>
  )
}

import { Input } from 'rizzui'

interface Proptypes {
  register: any
  errors: any
}

export default function FormLayout(props: Proptypes) {
  const { register, errors } = props
  return (
    <>
      <Input
        type="text"
        size="lg"
        label="Nama Tipe Pelanggaran"
        placeholder="Masukkan tipe pelanggaran..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('nama_tipe_pelanggaran')}
        error={errors.nama_tipe_pelanggaran?.message}
      />
    </>
  )
}

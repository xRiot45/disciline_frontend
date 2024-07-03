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
        label="Nama Status"
        placeholder="Masukkan status..."
        className="[&>label>span]:font-medium"
        inputClassName="text-sm"
        {...register('nama_status')}
        error={errors.nama_status?.message}
      />
    </>
  )
}

import SiswaSelect from '@/utils/siswaSelect'
import TipePelanggaranSelect from '@/utils/tipePelanggaranSelect'
import { Textarea } from 'rizzui'

interface Proptypes {
  control: any
  register: any
  errors: any
}

export default function FormLayout(props: Proptypes) {
  const { register, errors, control } = props
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <TipePelanggaranSelect
          control={control}
          error={errors.tipe_pelanggaranId?.message}
        />

        <SiswaSelect control={control} error={errors.siswaId?.message} />
      </div>

      <Textarea
        label="Keterangan"
        {...register('keterangan')}
        error={errors.keterangan?.message}
      />
    </>
  )
}

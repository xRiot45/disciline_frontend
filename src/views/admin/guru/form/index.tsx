import AgamaSelect from '@/utils/agamaSelect'
import GolonganSelect from '@/utils/golonganSelect'
import JabatanSelect from '@/utils/jabatanSelect'
import JenisKelaminSelect from '@/utils/jenisKelaminSelect'
import StatusSelect from '@/utils/statusSelect'
import { Input, Textarea } from 'rizzui'

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
          label="NIP"
          placeholder="Masukkan nip..."
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('nip')}
          error={errors.nip?.message}
        />

        <StatusSelect control={control} error={errors.statusId?.message} />
        <GolonganSelect control={control} error={errors.golonganId?.message} />
        <JabatanSelect control={control} error={errors.jabatanId?.message} />
        <AgamaSelect control={control} error={errors.agamaId?.message} />
        <JenisKelaminSelect
          control={control}
          error={errors.jenis_kelamin?.message}
        />

        <Input
          type="text"
          size="lg"
          label="No Telp"
          placeholder="Masukkan no telp..."
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          {...register('no_telp')}
          error={errors.no_telp?.message}
        />
      </div>
      <Textarea
        label="Alamat"
        {...register('alamat')}
        error={errors.alamat?.message}
      />
    </>
  )
}

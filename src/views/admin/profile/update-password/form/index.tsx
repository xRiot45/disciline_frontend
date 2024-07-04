import Link from 'next/link';
import HorizontalFormBlockWrapper from '@/shared/account-settings/horiozontal-block';
import { Form } from '@/components/ui/form';
import { Controller } from 'react-hook-form';
import { Button, Password } from 'rizzui';
import { ValidationSchema, validationSchema } from './validationSchema';

interface PropTypes {
  submit: (values: ValidationSchema) => void;
}

export default function FormLayout(props: PropTypes) {
  const { submit } = props;

  return (
    <>
      <Form<ValidationSchema>
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ control, formState: { errors } }) => {
          return (
            <>
              <div className="mx-auto w-full">
                <HorizontalFormBlockWrapper
                  title="Password Baru"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange } }) => (
                      <Password
                        size="lg"
                        placeholder="Masukkan password baru anda"
                        onChange={onChange}
                        error={errors.password?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <div className="mt-6 flex w-auto items-center justify-end gap-3">
                  <Button type="submit" variant="solid">
                    Update Password
                  </Button>
                  <Link href="/admin/dashboard">
                    <Button
                      type="button"
                      variant="text"
                      className="bg-red-500 text-white hover:bg-red-700 hover:text-white"
                    >
                      Batalkan
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}

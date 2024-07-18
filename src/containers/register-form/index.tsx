'use client'

import React from 'react'
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikProvider,
  useFormik
} from 'formik'
import * as Yup from 'yup'
import { Input, Link, Button } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useRegiserUserMutation } from '@/hooks/api/users'
import { toastErrorMessages } from '@/lib/types/toast-messages'
import { useToast } from '@/components/ui/use-toast'

const RegisterForm = ({
  setSelected
}: {
  setSelected: (value: string) => void
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const { mutate, isLoading } = useRegiserUserMutation({
    config: {
      onSuccess: async (data: any) => {
        const { access, refresh, username } = data

        try {
          const result = await signIn('tokens', {
            redirect: false,
            accessToken: access,
            refreshToken: refresh,
            username: username
          })

          if (result?.error || !result) {
            toast(toastErrorMessages.loginAfterRegisterError)
          } else {
            router.push('/dashboard')
          }
        } catch (error) {
          toast(toastErrorMessages.loginAfterRegisterError)
        }
      },
      onError: () => {
        toast(toastErrorMessages.registerError)
      }
    }
  })

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={(values) => {
        mutate(values)
      }}
      validationSchema={Yup.object({
        username: Yup.string().required('Requerido'),
        email: Yup.string().email('Email inválido').required('Requerido'),
        password: Yup.string()
          .required('Requerido')
          .min(6, 'La contraseña debe tener al menos 6 caracteres'),
        confirmPassword: Yup.string()
          .required('Requerido')
          .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
      })}
    >
      {({ errors, touched }) => {
        return (
          <Form className='flex flex-col gap-4'>
            <Field
              as={Input}
              isRequired
              label='Nomvre de Usuario'
              type='text'
              name='username'
            />
            <Field
              as={Input}
              isRequired
              label='Email'
              type='email'
              name='email'
            />
            <Field
              as={Input}
              isRequired
              label='Contraseña'
              type='password'
              name='password'
            />
            <Field
              as={Input}
              isRequired
              label='Confirma tu Contraseña'
              type='password'
              name='confirmPassword'
              isInvalid={!!errors.confirmPassword && !!touched.confirmPassword}
              errorMessage='Las contraseñas no coinciden'
            />
            <p className='text-center text-small'>
              ¿Ya tienes una cuenta?{' '}
              <Link size='sm' onPress={() => setSelected('login')}>
                Iniciar Sesión
              </Link>
            </p>
            <div className='flex gap-2 justify-end'>
              <Button
                fullWidth
                color='primary'
                type='submit'
                isLoading={isLoading}
              >
                Registrarse
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegisterForm

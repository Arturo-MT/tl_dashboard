'use client'

import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input, Link, Button } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { toastErrorMessages } from '@/lib/toast-messages'
import { useRouter } from 'next/navigation'

const LoginForm = ({ setSelected }: { setSelected: (value: any) => void }) => {
  const router = useRouter()
  const { toast } = useToast()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      const { username, password } = values
      try {
        const result = await signIn('credentials', {
          redirect: false,
          username,
          password
        })

        if (result?.error) {
          handleError(result.error)
        } else {
          router.push('/dashboard')
        }
      } catch (error) {
        handleError('unknownError')
      }
    }
  })

  const handleError = (errorType: string) => {
    switch (errorType) {
      case 'CredentialsSignin':
        toast(toastErrorMessages.loginError)
        break
      case 'NetworkError':
        toast(toastErrorMessages.networkError)
        break
      default:
        toast(toastErrorMessages.unknownError)
        break
    }
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
      <Input
        isRequired
        label='Usuario'
        placeholder='Nombre de usuario'
        type='text'
        {...formik.getFieldProps('username')}
      />
      <Input
        isRequired
        label='Contraseña'
        placeholder='Contraseña'
        type='password'
        {...formik.getFieldProps('password')}
      />
      <p className='text-center text-small'>
        ¿Necesitas crear una cuenta?{' '}
        <Link size='sm' onPress={() => setSelected('sign-up')}>
          Registrarse
        </Link>
      </p>
      <div className='flex gap-2 justify-end'>
        <Button fullWidth color='primary' type='submit'>
          Acceder
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
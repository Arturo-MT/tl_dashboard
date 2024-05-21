'use client'

import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input, Link, Button } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useRegiserUserMutation } from '@/hooks/api/users'
import { toastErrorMessages } from '@/lib/toast-messages'
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

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: (values) => {
      const { username, email, password } = values
      mutate({ username, email, password })
    }
  })

  return (
    <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
      <Input
        isRequired
        label='Username'
        placeholder='Enter your username'
        type='text'
        {...formik.getFieldProps('username')}
      />
      <Input
        isRequired
        label='Email'
        placeholder='Enter your email'
        type='email'
        {...formik.getFieldProps('email')}
      />
      <Input
        isRequired
        label='Password'
        placeholder='Enter your password'
        type='password'
        {...formik.getFieldProps('password')}
      />
      <Input
        isRequired
        label='Confirm Password'
        placeholder='Confirm your password'
        type='password'
        {...formik.getFieldProps('confirmPassword')}
      />
      <p className='text-center text-small'>
        ¿Ya tienes una cuenta?{' '}
        <Link size='sm' onPress={() => setSelected('login')}>
          Iniciar Sesión
        </Link>
      </p>
      <div className='flex gap-2 justify-end'>
        <Button fullWidth color='primary' type='submit' isLoading={isLoading}>
          Registrarse
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm

import React from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { toastErrorMessages } from '@/lib/toast-messages'
import FormCreator from '@/components/form-creator'
import { useRegiserUserMutation } from '@/hooks/api/users'
import * as Yup from 'yup'
import { AxiosError } from 'axios'

interface RegisterFormProps {
  setSelected: (value: string) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setSelected }) => {
  const { toast } = useToast()
  const router = useRouter()
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
      onError: (error: AxiosError) => {
        handleError(error.response?.status)
      }
    }
  })

  const handleError = (errorType: number | undefined) => {
    console.log(errorType)
    switch (errorType) {
      case 400:
        return toast(toastErrorMessages.registerError)
      default:
        return toast(toastErrorMessages.unknownError)
    }
  }

  const formConfig = {
    fields: [
      {
        name: 'username',
        label: 'Username',
        placeholder: 'Enter your username',
        type: 'text',
        isRequired: true,
        validation: Yup.string().required('Username is required')
      },
      {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        type: 'email',
        isRequired: true,
        validation: Yup.string()
          .email('Invalid email address')
          .required('Email is required')
      },
      {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
        isRequired: true,
        validation: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required')
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        placeholder: 'Confirm your password',
        type: 'password',
        isRequired: true,
        validation: Yup.string()
          .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
          .required('Confirm Password is required')
      }
    ],
    additionalLinks: [
      {
        text: '¿Ya tienes una cuenta?',
        label: 'Iniciar Sesión',
        onPress: () => setSelected('login')
      }
    ],
    submitButtonLabel: 'Registrarse'
  }

  const handleSubmit = async (values: Record<string, any>) => {
    mutate(values)
  }

  return (
    <FormCreator
      config={formConfig}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}

export default RegisterForm

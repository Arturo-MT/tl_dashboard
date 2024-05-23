import React from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import FormCreator from '@/components/form-creator'
import * as Yup from 'yup'
import { toastErrorMessages } from '@/lib/toast-messages'

interface LoginFormProps {
  setSelected: (value: string) => void
}

interface FormValues {
  username: string
  password: string
}

const LoginForm: React.FC<LoginFormProps> = ({ setSelected }) => {
  const router = useRouter()

  const formConfig = {
    fields: [
      {
        name: 'username',
        label: 'Usuario',
        placeholder: 'Nombre de usuario',
        type: 'text',
        isRequired: true,
        validation: Yup.string().required('Required')
      },
      {
        name: 'password',
        label: 'Contraseña',
        placeholder: 'Contraseña',
        type: 'password',
        isRequired: true,
        validation: Yup.string().required('Required')
      }
    ],
    errorMessages: {
      CredentialsSignin: 'Login error',
      NetworkError: 'Network error',
      unknownError: 'Unknown error'
    },
    additionalLinks: [
      {
        text: '¿Necesitas crear una cuenta?',
        label: 'Registrarse',
        onPress: () => setSelected('sign-up')
      }
    ],
    submitButtonLabel: 'Acceder'
  }

  const handleSubmit = async (values: Record<string, any>) => {
    const { username, password } = values as FormValues
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    })
    if (result?.error) {
      throw new Error(result.error)
    } else {
      router.push('/dashboard')
    }
  }

  return <FormCreator config={formConfig} onSubmit={handleSubmit} />
}

export default LoginForm

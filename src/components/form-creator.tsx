import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input, Button, Link } from '@nextui-org/react'
import { useToast } from '@/components/ui/use-toast'
import { toastErrorMessages } from '@/lib/toast-messages'
import { FormCreatorProps } from '@/types/form-creator'

const FormCreator: React.FC<FormCreatorProps> = ({
  config,
  onSubmit,
  isLoading
}) => {
  const { toast } = useToast()

  const validationSchema = Yup.object(
    config.fields.reduce((schema, field) => {
      schema[field.name] = field.validation
      return schema
    }, {} as Record<string, Yup.StringSchema<string | undefined>>)
  )

  const formik = useFormik({
    initialValues: config.fields.reduce((values, field) => {
      values[field.name] = field.initialValue || ''
      return values
    }, {} as Record<string, string>),
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        await onSubmit(values)
      } catch (error) {
        handleError((error as Error).message)
      }
    }
  })

  const handleError = (errorType: string) => {
    switch (errorType) {
      case 'CredentialsSignin':
        return toast(toastErrorMessages.loginError)
      case 'NetworkError':
        return toast(toastErrorMessages.networkError)
      default:
        return toast(toastErrorMessages.unknownError)
    }
  }

  const additionalLinks = config.additionalLinks || []

  return (
    <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
      {config.fields.map((field) => (
        <Input
          key={field.name}
          isRequired={field.isRequired}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          {...formik.getFieldProps(field.name)}
          errorMessage={
            formik.errors[field.name] && formik.touched[field.name]
              ? formik.errors[field.name]
              : ''
          }
        />
      ))}
      {additionalLinks && additionalLinks.length > 0 && (
        <p className='text-center text-small'>
          {additionalLinks.map((link, index) => (
            <React.Fragment key={index}>
              {link.text}{' '}
              <Link size='sm' onPress={link.onPress}>
                {link.label}
              </Link>
              {index < additionalLinks.length - 1 && ' | '}
            </React.Fragment>
          ))}
        </p>
      )}
      <div className='flex gap-2 justify-end'>
        <Button fullWidth color='primary' type='submit' isLoading={isLoading}>
          {config.submitButtonLabel || 'Submit'}
        </Button>
      </div>
    </form>
  )
}

export default FormCreator

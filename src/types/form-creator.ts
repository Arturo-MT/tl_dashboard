import * as Yup from 'yup'

export interface FieldConfig {
  name: string
  label: string
  placeholder: string
  type: string
  isRequired: boolean
  validation: Yup.StringSchema<string | undefined>
  initialValue?: string
}

export interface LinkConfig {
  text: string
  label: string
  onPress: () => void
}

export interface FormConfig {
  fields: FieldConfig[]
  errorMessages?: Record<string, string>
  additionalLinks?: LinkConfig[]
  submitButtonLabel?: string
}

export interface FormCreatorProps {
  config: FormConfig
  onSubmit: (values: Record<string, any>) => Promise<void>
  isLoading?: boolean
}

import { RegisterUserValues } from '@/lib/types'
import { AxiosInstance } from 'axios'

export const registerUserMutation = async ({
  client,
  values
}: {
  client: AxiosInstance
  values: RegisterUserValues
}) => {
  const { data } = await client.post('users/create/', {
    ...values
  })
  return data
}

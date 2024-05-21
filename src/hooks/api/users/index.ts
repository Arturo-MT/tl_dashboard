import { useMutation, useQuery, useQueryClient } from 'react-query'
import { registerUserMutation } from './mutations'
import { useAxios } from '@/context/auth'
import { RegisterUserValues } from '@/lib/types'

export const useRegiserUserMutation = (props: { config?: any } = {}) => {
  const { config } = props
  const { publicAxiosClient } = useAxios()

  return useMutation(
    (values: RegisterUserValues) =>
      registerUserMutation({ client: publicAxiosClient, values }),
    config
  )
}

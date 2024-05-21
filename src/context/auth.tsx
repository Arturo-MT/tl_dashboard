import React, { createContext, useContext, useEffect } from 'react'
import axios, { AxiosInstance } from 'axios'
import { useSession, signIn } from 'next-auth/react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/lib/utils'

interface AxiosContextProps {
  authAxiosClient: AxiosInstance
  publicAxiosClient: AxiosInstance
}

const AxiosContext = createContext<AxiosContextProps | undefined>(undefined)

const publicAxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const AxiosProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { data: session } = useSession()

  const authAxiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
  })

  authAxiosClient.interceptors.request.use(
    (config) => {
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  authAxiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
            {
              refresh: session?.refreshToken
            }
          )
          return axios(originalRequest)
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError)
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )

  return (
    <AxiosContext.Provider value={{ authAxiosClient, publicAxiosClient }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AxiosContext.Provider>
  )
}

export const useAxios = (): AxiosContextProps => {
  const context = useContext(AxiosContext)
  if (context === undefined) {
    throw new Error('useAxios must be used within an AxiosProvider')
  }
  return context
}

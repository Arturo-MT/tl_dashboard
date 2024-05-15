import React, { createContext, useContext } from 'react'
import axios, { AxiosInstance } from 'axios'
import { useSession, signOut } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { queryClient } from '@/lib/utils'

interface AxiosContextProps {
  authAxios: AxiosInstance
  publicAxios: AxiosInstance
}

const AxiosContext = createContext<AxiosContextProps | undefined>(undefined)

const publicAxios = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

export const AxiosProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { data: session } = useSession()

  const authAxios = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  })

  return (
    <AxiosContext.Provider value={{ authAxios, publicAxios }}>
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

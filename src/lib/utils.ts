import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { QueryClient } from 'react-query'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const queryClient = new QueryClient()

export { cn, queryClient }

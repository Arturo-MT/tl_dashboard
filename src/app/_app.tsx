import { AxiosProvider } from '@/context/auth'
import { NextUIProvider } from '@nextui-org/react'

export default function App({
  Component
}: Readonly<{
  Component: React.ComponentType
}>) {
  return (
    <NextUIProvider>
      <Component />
    </NextUIProvider>
  )
}

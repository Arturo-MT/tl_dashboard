'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CircularProgress } from '@nextui-org/progress'
import { NavBar } from '@/components/nav-bar'
import DashboardSidebar from './dashboard-sidebar'

const AuthWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const { data: session, status } = useSession()
    const router = useRouter()
    React.useEffect(() => {
      if (!session && status !== 'loading') {
        router.push('/')
      }
    }, [session, router, status])

    if (status === 'loading' || !session) {
      return (
        <div className='h-screen flex items-center justify-center'>
          <CircularProgress label='Cargando...' size='lg' />
        </div>
      )
    }

    return (
      <>
        <NavBar />
        <div className='flex flex-row'>
          <DashboardSidebar />
          <WrappedComponent {...props} />
        </div>
      </>
    )
  }
  return Wrapper
}

export default AuthWrapper

'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import { CircularProgress } from '@nextui-org/progress'
import { NavBar } from '@/components/nav-bar'

const PublicWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const { status } = useSession()

    if (status === 'loading') {
      return (
        <div className='h-screen flex items-center justify-center'>
          <CircularProgress label='Loading...' size='lg' />
        </div>
      )
    }

    return (
      <>
        <NavBar />
        <WrappedComponent {...props} />
      </>
    )
  }
  return Wrapper
}

export default PublicWrapper

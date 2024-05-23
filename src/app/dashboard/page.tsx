'use client'

import * as React from 'react'
import AuthWrapper from '@/containers/auth-wrapper'

function Dashbooard() {
  return (
    <div className='py-6 px-48 flex flex-col items-center gap-16'>
      <h1>Dashboard</h1>
    </div>
  )
}

export default AuthWrapper(Dashbooard)

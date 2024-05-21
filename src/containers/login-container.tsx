'use client'

import React from 'react'
import { Tabs, Tab, Input, Link, Button } from '@nextui-org/react'
import LoginForm from '@/containers/login-form'
import RegisterForm from './register-form'

export default function LoginContainer() {
  const [selected, setSelected] = React.useState<string>('login')

  return (
    <div className='flex flex-col w-full'>
      <Tabs
        fullWidth
        size='md'
        aria-label='Tabs form'
        selectedKey={selected}
        onSelectionChange={(key: any) => setSelected(key)}
      >
        <Tab key='login' title='Acceder'>
          <LoginForm setSelected={setSelected} />
        </Tab>
        <Tab key='sign-up' title='Registrarse'>
          <RegisterForm setSelected={setSelected} />
        </Tab>
      </Tabs>
    </div>
  )
}

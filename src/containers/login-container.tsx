'use client'

import React from 'react'
import { Tabs, Tab, Input, Link, Button } from '@nextui-org/react'
import LoginForm from '@/containers/login-form'

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
          <form className='flex flex-col gap-4 h-[300px]'>
            <Input
              isRequired
              label='Name'
              placeholder='Enter your name'
              type='password'
            />
            <Input
              isRequired
              label='Email'
              placeholder='Enter your email'
              type='email'
            />
            <Input
              isRequired
              label='Password'
              placeholder='Enter your password'
              type='password'
            />
            <p className='text-center text-small'>
              ¿Ya tienes una cuenta?{' '}
              <Link size='sm' onPress={() => setSelected('login')}>
                Acceder
              </Link>
            </p>
            <div className='flex gap-2 justify-end'>
              <Button fullWidth color='primary'>
                Registrarse
              </Button>
            </div>
          </form>
        </Tab>
      </Tabs>
    </div>
  )
}

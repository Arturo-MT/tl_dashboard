import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'
import { LoginSheet } from '@/containers/login-sheet'

export function NavBar() {
  return (
    <Navbar shouldHideOnScroll maxWidth='full'>
      <Link href='/'>
        <NavbarBrand>
          <h1 className='font-bold text-lg'>TL Dashboard</h1>
        </NavbarBrand>
      </Link>
      <NavbarContent justify='end'>
        <NavbarItem>
          <LoginSheet />
        </NavbarItem>
        <NavbarItem>
          <ModeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

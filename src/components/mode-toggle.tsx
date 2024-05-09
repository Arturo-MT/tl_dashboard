'use client'

import * as React from 'react'
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { useTheme } from 'next-themes'

import { Button } from '@nextui-org/button'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      isIconOnly
      color={theme === 'dark' ? 'warning' : 'primary'}
      radius='sm'
      variant='faded'
    >
      {theme === 'dark' ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
    </Button>
  )
}

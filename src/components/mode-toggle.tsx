'use client'

import * as React from 'react'
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/button'

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (mounted) {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }
  }

  return (
    <Button
      onClick={toggleTheme}
      isIconOnly
      color={mounted && resolvedTheme === 'dark' ? 'warning' : 'primary'}
      radius='sm'
      variant='faded'
    >
      {mounted && resolvedTheme === 'dark' ? (
        <BsFillSunFill />
      ) : (
        <BsFillMoonStarsFill />
      )}
    </Button>
  )
}

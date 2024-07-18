import { Button } from '@nextui-org/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import LoginContainer from '../login-container'
import { signOut, useSession } from 'next-auth/react'

export function LoginSheet() {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <Button
        variant='faded'
        radius='sm'
        color='primary'
        onPress={() =>
          signOut({
            callbackUrl: '/',
            redirect: true
          })
        }
      >
        Cerrar sesión
      </Button>
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='faded' radius='sm' color='primary'>
          Accede
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className='flex flex-col gap-8'>
          <SheetHeader>
            <SheetTitle>Accede a tu panel de control</SheetTitle>
            <SheetDescription>
              Inicia sesión o registra una cuenta.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <LoginContainer />
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

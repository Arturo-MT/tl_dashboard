import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@nextui-org/button'
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from 'react-icons/md'

// Componente Sidebar principal
const Sidebar = ({
  isExpanded,
  toggleExpand,
  children
}: {
  isExpanded: boolean
  toggleExpand: (isExpanded: boolean) => void
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'fixed top-12 left-0 h-[calc(100%-3rem)] gap-4 bg-background shadow-lg border-r p-4 transition-all duration-300 flex flex-col z-50',
        isExpanded ? 'w-64' : 'w-16'
      )}
    >
      <Button
        onClick={() => toggleExpand(!isExpanded)}
        isIconOnly={!isExpanded}
        radius='sm'
        variant='faded'
        color='primary'
      >
        {isExpanded ? (
          <>
            <MdKeyboardDoubleArrowLeft /> Contraer
          </>
        ) : (
          <MdKeyboardDoubleArrowRight />
        )}
      </Button>
      {children}
    </div>
  )
}

// Subcomponente SidebarHeader
const SidebarHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className='mb-4'>{children}</div>
}

// Subcomponente SidebarTitle
const SidebarTitle = ({ children }: { children: React.ReactNode }) => {
  return <h1 className='text-xl mb-2'>{children}</h1>
}

// Subcomponente SidebarDescription
const SidebarDescription = ({ children }: { children: React.ReactNode }) => {
  return <p className='text-sm  mb-4'>{children}</p>
}

// Subcomponente SidebarContent
const SidebarContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mb-4 flex flex-col justify-between h-screen'>
      {children}
    </div>
  )
}

// Subcomponente SidebarFooter
const SidebarFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className='mt-auto'>{children}</div>
}

// Exportar todos los componentes juntos
export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTitle,
  SidebarDescription,
  SidebarFooter
}

'use client'

import * as React from 'react'

import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { NavBar } from '@/components/nav-bar'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <NavBar />
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

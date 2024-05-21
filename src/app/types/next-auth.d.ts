import NextAuth, { DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    error?: string
    refreshToken?: string
  }

  interface User extends DefaultUser {
    access: string
    refresh: string
    expires_in: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string
  }
}

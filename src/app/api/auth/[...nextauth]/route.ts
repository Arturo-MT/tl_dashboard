import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { JWT } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

const authHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        try {
          const response = await axios.post(
            'http://localhost:8000/api/v1/token/',
            {
              username: credentials?.username,
              password: credentials?.password
            }
          )

          const user = response.data

          if (user) {
            // Ensure 'id' is always a string
            return {
              id: credentials!.username, // Use username as a unique identifier
              access: user.access,
              refresh: user.refresh,
              expires_in: user.expires_in
            }
          } else {
            return null
          }
        } catch (error) {
          console.error('Login error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access
        token.refreshToken = user.refresh
        token.accessTokenExpires = Date.now() + user.expires_in * 1000 // Assuming expires_in is in seconds
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.error = token.error
      return session
    }
  },
  pages: {
    signIn: '/'
  }
})

async function refreshAccessToken(token: JWT) {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/v1/token/refresh/',
      {
        refresh: token.refreshToken
      }
    )

    const refreshedTokens = response.data

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh ?? token.refreshToken
    }
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  authHandler(req, res)

export { handler as GET, handler as POST }

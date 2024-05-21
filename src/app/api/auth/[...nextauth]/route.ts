import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        console.log('Credentials', credentials)
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
            return {
              id: user.id,
              name: user.username,
              access: user.access,
              refresh: user.refresh,
              expires_in: user.expires_in
            }
          } else {
            return null
          }
        } catch (error: any) {
          if (error.response) {
            if (error.response.status === 401) {
              throw new Error('CredentialsSignin')
            } else {
              throw new Error('NetworkError')
            }
          } else {
            throw new Error('UnknownError')
          }
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.accessToken = user.access
        token.refreshToken = user.refresh
        token.accessTokenExpires = Date.now() + user.expires_in * 1000
        token.user = {
          id: user.id,
          name: user.name
        }
      }

      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      return refreshAccessToken(token)
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken
      session.error = token.error
      session.user = token.user
      return session
    }
  },
  pages: {
    signIn: '/'
  },
  debug: true
}

async function refreshAccessToken(token: any) {
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

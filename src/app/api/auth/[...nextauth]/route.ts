import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'tokens',
      name: 'Tokens',
      credentials: {
        accessToken: { label: 'Access Token', type: 'text' },
        refreshToken: { label: 'Refresh Token', type: 'text' },
        username: { label: 'Username', type: 'text' }
      },
      authorize: async (credentials, req) => {
        const { accessToken, refreshToken, username } = credentials ?? {}

        if (accessToken && refreshToken && username) {
          return {
            id: username,
            name: username,
            access: accessToken,
            refresh: refreshToken,
            expires_in: 300
          }
        } else {
          return null
        }
      }
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/token/`,
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
    async jwt({ token, user }: any) {
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
    async session({ session, token }: any) {
      session.accessToken = token.accessToken
      session.error = token.error
      session.user = token.user
      return session
    }
  },
  pages: {
    signIn: '/'
  },
  debug: false
}

async function refreshAccessToken(token: any) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
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

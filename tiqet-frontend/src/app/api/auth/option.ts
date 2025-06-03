import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getDictionary } from '@/locales/dictionary'
import serverFetch from '@/utils/server-fetch'
import { genSalt, hash } from 'bcrypt'

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        return { ...token, user: { ...user as User } }
      }

      return token
    },
    async session({ session, token }) {
      return { ...session, user: token.user }
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: 'string' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }
        const { username, password } = credentials

        const authResp = await serverFetch(`${process.env.BACKEND_URL}/auth`, {
          method: 'POST', 
          body: JSON.stringify({ username: username, password: password})
        })

        const dict = await getDictionary()

        if (authResp.status == 404) {
          throw new Error(dict.login.message.auth_failed)
        }
	      else if (authResp.status != 200) {
	        throw new Error("Something went wrong with the backend!")
	      }

        const userData = await authResp.json()
        return userData.data
      },
    }),
  ],
}

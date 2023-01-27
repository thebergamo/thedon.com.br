import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import prisma from '../../../lib/prisma'

const adminUsers = ['thebergamo']

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          roles: adminUsers.includes(profile.login) ? ['admin'] : ['user'],
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user.id
      session.user.roles = user.roles

      return session
    },
  },
  debug: process.env.NODE_ENV !== 'production',
}

export default NextAuth(authOptions)

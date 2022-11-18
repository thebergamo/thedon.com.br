import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 1.8 * 60 * 60, // 1h50m
  // },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  // pages: {
  //   signIn: '/auth/sign-in',
  //   newUser: '/auth/sign-up',
  // },
  // callbacks: {
  //   session: ({ session, user, token }) => {
  //     // session.expires =
  //     console.log('session', { session, user, token })
  //     /* @ts-ignore */
  //     session.expires = token.expires
  //     /* @ts-ignore */
  //     session.jwt = token.jwt
  //     /* @ts-ignore */
  //     session.user = token.user

  //     return session
  //   },
  //   jwt: ({ token, account, isNewUser, profile, user }) => {
  //     console.log('jwt', { token, account, isNewUser, profile, user })
  //     if (user) {
  //       /* @ts-ignore */
  //       token.user = user.user
  //       /* @ts-ignore */
  //       token.id = user.user.id
  //       /* @ts-ignore */
  //       token.jwt = user.jwt
  //       /* @ts-ignore */
  //       token.exp = user.expiration
  //       /* @ts-ignore */
  //       token.expires = user.expiration
  //     }

  //     return token
  //   },
  // },
  debug: process.env.NODE_ENV !== 'production',
}

export default NextAuth(authOptions)

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type Credentials = Record<'email' | 'password', string>;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 1.8 * 60 * 60 // 1h50m
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email', placeholder: 'mark@cms.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (!credentials) {
          return null;
        }

        const { email, password }: Credentials = credentials;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/members/login`,
          {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
          }
        );
        const body = await res.json();

        console.log('authorize', { body, ok: res.ok, status: res.status });

        // If no error and we have user data, return it
        if (res.ok && body) {
          console.log('auth', { body });
          return { user: body.user, jwt: body.token, expiration: body.exp };
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/sign-up'
  },
  callbacks: {
    session: ({ session, user, token }) => {
      // session.expires =
      console.log('session', { session, user, token });
      session.expires = token.expires;
      session.jwt = token.jwt;
      session.user = token.user;

      return session;
    },
    jwt: ({ token, account, isNewUser, profile, user }) => {
      console.log('jwt', { token, account, isNewUser, profile, user });
      if (user) {
        token.user = user.user;
        token.id = user.user.id;
        token.jwt = user.jwt;
        token.exp = user.expiration;
        token.expires = user.expiration;
      }

      return token;
    }
  },
  debug: process.env.NODE_ENV !== 'production'
};

export default NextAuth(authOptions);

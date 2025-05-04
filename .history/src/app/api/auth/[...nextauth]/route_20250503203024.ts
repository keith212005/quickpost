import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import { prisma } from '@/lib/db';
import { env } from '@/lib/env';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Missing credentials');
        }
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error('Invalid credentials');
        }

        // ✅ update last login time
        await prisma.user.update({
          where: { email },
          data: { lastLogin: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    /**
     * Adds the user id to the session from the token
     * @param session current session
     * @param token token from the authentication provider
     * @param user user from the database
     * @returns the updated session
     */
    async session({ session: Session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

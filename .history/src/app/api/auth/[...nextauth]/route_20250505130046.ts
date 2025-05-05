import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import NextAuth, { Account, Profile, Session, User } from 'next-auth';
// import { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import { prisma } from '@/lib/db';
import { env } from '@/lib/env';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
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
    async signIn({
      user,
    }: {
      user: AdapterUser | User;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }) {
      console.log('signIn>>>>>>>', { user });
      try {
        if (!user?.email) return false;

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          const rawPassword = randomBytes(12).toString('base64');
          const password = await bcrypt.hash(rawPassword, 10);
          await prisma.user.create({
            data: {
              id: user.id,
              email: user.email,
              name: user.name ?? 'GitHub User',
              isOAuth: true,
              password,
              lastLogin: new Date(),
              emailVerified: new Date(),
            },
          });
        }

        return true;
      } catch (error) {
        console.error('SignIn Error >>>>', error);
        return false;
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as AdapterUser).id = token.sub as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

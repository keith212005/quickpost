import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import NextAuth, { Account, Profile, Session, User } from 'next-auth';
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
          isActive: user.isActive,
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

        if (existingUser) {
          (user as AdapterUser).role = existingUser.role; // 👈 add this
        }

        if (!existingUser) {
          const rawPassword = randomBytes(12).toString('base64');
          const password = await bcrypt.hash(rawPassword, 10);
          const newUser = await prisma.user.create({
            data: {
              id: user.id,
              email: user.email,
              name: user.name ?? 'GitHub User',
              isOAuth: true,
              role: 'user',
              password,
              lastLogin: new Date(),
              emailVerified: new Date(),
            },
          });
          (user as AdapterUser).role = newUser.role;
        }

        return true;
      } catch (error) {
        console.error('SignIn Error >>>>', error);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user: AdapterUser | User }) {
      console.log('jwt>>>>>>>', { token, user });

      // If it's a new login (user is passed)
      if (user) {
        token.role = user.role;
        token.sub = user.id;

        // Always fetch latest isActive status
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { isActive: true },
        });

        token.isActive = dbUser?.isActive ?? true;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as AdapterUser).id = token.sub as string;
        // Add role if available
        const user = await prisma.user.findUnique({
          where: { id: token.sub as string },
          select: { role: true },
        });
        if (user) {
          (session.user as AdapterUser).role = user.role;
          (session.user as AdapterUser).isActive = token.isActive as boolean;
        }
      }
      console.log('session>>>>>>>', session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

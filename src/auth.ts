import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from './lib/db';

const providers: Provider[] = [
  GitHub({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  }),
  GoogleProvider({
    clientId: process.env.AUTH_GOOGLE_ID!,
    clientSecret: process.env.AUTH_GOOGLE_SECRET!,
  }),
  Credentials({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'text' },
      password: { label: 'Password', type: 'password' },
      firstName: { label: 'First Name', type: 'text' },
      lastName: { label: 'Last Name', type: 'text' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('Missing credentials');
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email as string },
      });

      if (!user || !user.password) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(
        credentials.password as string,
        user.password as string,
      );
      if (!isPasswordValid) {
        return null;
      }

      // update last login time
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      return {
        id: user.id,
        name: user.name,
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      };
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== 'credentials');

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 10, // 10 minutes
    updateAge: 300, // refresh every 5 minutes
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user && !token.id) {
        // console.log('First time user login:', user);
        token.id = user.id;
        token.role = user.role;
        // Split user.name into firstName and lastName
        const fullName = user.name ?? '';
        const [firstName, ...rest] = fullName.trim().split(' ');
        const lastName = rest.join(' ') || null;
        token.firstName = firstName;
        token.lastName = lastName;
        token.email = user.email;
        token.image = user.image;
        token.isActive = user.isActive;
        await prisma.user.update({
          where: { id: user.id },
          data: {
            lastLogin: new Date(),
            firstName,
            lastName,
          },
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.isActive = token.isActive as boolean;
      }
      return session;
    },
  },
});

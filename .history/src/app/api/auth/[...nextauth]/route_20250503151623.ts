import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { env } from '@/lib/env';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
};

const handler = NextAuth({});

export { handler as GET, handler as POST };

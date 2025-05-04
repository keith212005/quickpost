import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

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
        const { email, password } = credentials;

        // 1. Fetch user from DB
        // const user = await db.user.findUnique({ where: { email } });

        // if (!user) throw new Error('No user found');

        // 2. Compare passwords (you should hash them in production!)
        // const isValid = await compare(password, user.password); // using bcrypt
        // if (!isValid) throw new Error('Invalid credentials');

        // return {
        //   id: user.id,
        //   email: user.email,
        //   name: user.name,
        //   role: user.role,
        // };

        if (email !== 'kj@gmail.com') throw new Error('No user found');
        if (password !== '123') throw new Error('Invalid credentials');

        return {
          id: '1',
          email: 'kj@gmail.com',
          name: 'John Doe',
          role: 'admin',
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

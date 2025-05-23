// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      isActive: boolean;
    };
  }
  interface User {
    firstName?: string;
    lastName?: string;
    role: string;
    isActive: boolean;
  }
}

import * as z from 'zod';

const envSchema = z.object({
  AUTH_URL: z.string().url(),
  AUTH_SECRET: z.string(),
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse({
  AUTH_URL: process.env.NEXTAUTH_URL,
  AUTH_SECRET: process.env.NEXTAUTH_SECRET,
  AUTH_GITHUB_ID: process.env.GITHUB_ID,
  AUTH_GITHUB_SECRET: process.env.GITHUB_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
});

import * as z from 'zod';

const envSchema = z.object({
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().url(),
  GITHUB_ID: z.string().url(),
  GITHUB_SECRET: z.string(),
});

export const env = envSchema.parse({
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  COURSE_URL: process.env.VITE_COURSE_URL,
  COSDEN_SOLUTIONS_URL: process.env.VITE_COSDEN_SOLUTIONS_URL,
  DB_KEY: process.env.VITE_DB_KEY,
  DISCORD_URL: process.env.VITE_DISCORD_URL,
  USE_AUTH: process.env.VITE_USE_AUTH,
});

NEXTAUTH_URL = 'http://localhost:3000';
NEXTAUTH_SECRET = 'ygcRCHblm98F+XzHEtR3kKttq8dGJN5I48yHvthyh0A=';

GITHUB_ID = 'Iv23li5Dkz7Y9msoZKBk';
GITHUB_SECRET = '5eb7acf9a1d15eecf6dc531c76efda65e828e8e2';

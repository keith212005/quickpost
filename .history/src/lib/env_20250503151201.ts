import * as z from 'zod';

const envSchema = z.object({
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().url(),
  COSDEN_SOLUTIONS_URL: z.string().url(),
  DB_KEY: z.string(),
  DISCORD_URL: z.string().url(),
  USE_AUTH: z.string().transform((value) => value === 'true'),
});

export const env = envSchema.parse({
  BASE_URL: process.env.VITE_BASE_URL,
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

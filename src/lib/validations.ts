import * as z from 'zod';

// used in RegisterForm
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(10, { message: 'Password must not exceed 10 characters' }),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

// used in LoginForm
export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(10, { message: 'Password must not exceed 10 characters' }),
});
export type LoginSchema = z.infer<typeof loginSchema>;

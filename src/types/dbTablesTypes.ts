import { z } from 'zod';

// Post schema (define first if it's used inside likeSchema)
export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(), // since your original used string instead of Date
  author: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
    })
    .optional(),
  likes: z.array(z.any()).optional(),
});
export type TPostSchema = z.infer<typeof postSchema>;

// User schema (define with lazy where needed)
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  isOAuth: z.boolean(),
  createdAt: z.date(),
  lastLogin: z.date().nullable(),
  emailVerified: z.date().nullable(),
});
export type TUserSchema = z.infer<typeof userSchema>;

// Like schema (references user and post lazily)
export const likeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  postId: z.string(),
  createdAt: z.date(),
  user: z.lazy(() => userSchema),
  post: z.lazy(() => postSchema),
});
export type TLikeSchema = z.infer<typeof likeSchema>;

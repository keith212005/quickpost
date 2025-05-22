import { UserRole } from '@prisma/client/edge';
import { z } from 'zod';

// Post schema (define first if it's used inside likeSchema)
export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
  author: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      image: z.string().nullable(),
    })
    .nullable(),
  tags: z.array(z.string()).optional(),
  likes: z.array(z.any()).optional(),
  flags: z.array(z.any()).optional(),
  comments: z.array(z.lazy(() => commentSchema)).optional(),
});
export type TPostSchema = z.infer<typeof postSchema>;

// User schema (define with lazy where needed)
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  image: z.string().nullable(),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  isActive: z.boolean(),
  isOAuth: z.boolean(),
  createdAt: z.date(),
  lastLogin: z.date().nullable(),
  emailVerified: z.date().nullable(),
  posts: z.array(z.any()).optional(),
  likes: z.array(z.any()).optional(),
  flags: z.array(z.any()).optional(),
  comments: z.array(z.any()).optional(),
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

interface FlagSchema {
  id: string;
  reason: string;
  postId: string;
  userId: string;
  createdAt: Date;
  post: TPostSchema;
  user: TUserSchema;
}
export const flagSchema: z.ZodType<FlagSchema> = z.object({
  id: z.string(),
  reason: z.string(),
  postId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  post: z.lazy(() => postSchema),
  user: z.lazy(() => userSchema),
});
export type TFlagSchema = z.infer<typeof flagSchema>;

interface CommentSchema {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  postId: string;
  authorId: string;
  parentId: string | null;
  post: TPostSchema;
  author: TUserSchema;
  replies: CommentSchema[] | null;
}
export const commentSchema: z.ZodType<CommentSchema> = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isEdited: z.boolean(),
  postId: z.string(),
  authorId: z.string(),
  parentId: z.string().nullable(),
  post: z.lazy(() => postSchema),
  author: z.lazy(() => userSchema),
  replies: z.array(z.lazy(() => commentSchema)),
});
export type TCommentSchema = z.infer<typeof commentSchema>;

export const postFormSchema = postSchema.omit({
  id: true,
  createdAt: true,
  author: true,
});

export type TPostFormSchema = z.infer<typeof postFormSchema>;

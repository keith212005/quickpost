import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(2, { message: 'Title is required' }),
  content: z
    .string()
    .min(5, { message: 'Content must be at least 5 characters' }),
});

export type PostSchemaType = z.infer<typeof PostSchema>;

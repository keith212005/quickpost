'use server';

import type { Post } from '@prisma/client';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { TPostFormSchema } from '@/types/dbTablesTypes';

type CreatePostResult =
  | { success: true; post: Post }
  | { success: false; error: string };

export async function createPost(
  formData: TPostFormSchema,
): Promise<CreatePostResult> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: 'Unauthorized' };
  }

  const { title, content, tags } = formData;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        tags,
        authorId: session.user.id,
      },
    });
    return { success: true, post };
  } catch (error) {
    console.error('CREATE failed:', error);
    return {
      success: false,
      error: 'An error occurred while creating the post. Please try again.',
    };
  }
}

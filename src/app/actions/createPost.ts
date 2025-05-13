'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { PostSchemaType } from '@/schemas/postSchema';

export async function createPost(formData: PostSchemaType) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
  const { title, content } = formData;
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      authorId: session.user?.id,
    },
  });
  return newPost;
}

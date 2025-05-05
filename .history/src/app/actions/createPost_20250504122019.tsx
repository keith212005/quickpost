'use server';

import { prisma } from '@/lib/db';

export async function createPost(title: string, content: string) {
  await prisma.post.create({
    data: {
      title,
      content,
    },
  });
}

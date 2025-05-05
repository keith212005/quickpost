import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.post.delete({
      where: { id: params.id },
    });

    await prisma.$accelerate.invalidate({ tags: ['my_posts'] });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE failed:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

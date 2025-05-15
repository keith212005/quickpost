import { subDays } from 'date-fns';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const oneWeekAgo = subDays(new Date(), 7);

    const topUsers = await prisma.post.groupBy({
      by: ['authorId'],
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
      _count: { _all: true },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 5,
    });

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: topUsers
            .map((entry) => entry.authorId)
            .filter((id) => id !== null),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const userMap = Object.fromEntries(
      users.map((u) => [u.id, u.name || 'Unknown']),
    );

    const result = topUsers.map((entry) => ({
      name: userMap[entry.authorId ?? 'Unknown'] || 'Unknown',
      posts: entry._count._all,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch top users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

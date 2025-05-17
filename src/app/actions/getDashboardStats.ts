'use server';

import { prisma } from '@/lib/db';

type DashboardStatsResult =
  | {
      totalPosts: number;
      totalUsers: number;
      postsThisMonth: number;
      activeUsers: number;
      error?: undefined;
    }
  | {
      totalPosts: number;
      totalUsers: number;
      postsThisMonth: number;
      activeUsers: number;
      error: string;
    };

export async function getDashboardStats(): Promise<DashboardStatsResult> {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalPosts, totalUsers, postsThisMonth, activeUsers] =
      await Promise.all([
        prisma.post.count(),
        prisma.user.count(),
        prisma.post.count({
          where: {
            createdAt: {
              gte: firstDayOfMonth,
            },
          },
        }),
        prisma.user.count({
          where: {
            isActive: true,
          },
        }),
      ]);

    return {
      totalPosts,
      totalUsers,
      postsThisMonth,
      activeUsers,
    };
  } catch (error) {
    console.error('Failed to load dashboard stats:', error);
    return {
      totalPosts: 0,
      totalUsers: 0,
      postsThisMonth: 0,
      activeUsers: 0,
      error: 'Failed to fetch dashboard statistics.',
    };
  }
}

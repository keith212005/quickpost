'use server';

import { prisma } from '@/lib/db';

export const getDashboardStats = async () => {
  try {
    const [totalPosts, totalUsers, postsThisMonth, activeUsers] =
      await Promise.all([
        prisma.post.count(),
        prisma.user.count(),
        prisma.post.count({
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }),
        prisma.user.count({
          where: {
            isActive: true,
          },
        }),
      ]);

    return { totalPosts, totalUsers, postsThisMonth, activeUsers };
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
};

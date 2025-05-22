// prisma/seed.ts
import { faker } from '@faker-js/faker';
import { PrismaClient as BasePrismaClient, UserRole } from '@prisma/client';
// import { PrismaClient, UserRole } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const isAccelerate = process.env.DATABASE_URL?.startsWith('prisma+');

const prisma = isAccelerate
  ? new BasePrismaClient().$extends(withAccelerate())
  : new BasePrismaClient();

import { TPostSchema } from '@/types/dbTablesTypes';
// const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');
  console.log('Using DB:', process.env.DATABASE_URL);

  // 1. Create Users
  const userCount = 10;
  const users = await Promise.all(
    Array.from({ length: userCount }).map(() =>
      prisma.user.create({
        data: {
          name: faker.internet.username(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          isOAuth: false,
          isActive: true,
          image: faker.image.avatar(),
          emailVerified: faker.datatype.boolean() ? faker.date.recent() : null,
          lastLogin: faker.date.recent(),
          role: faker.helpers.arrayElement([UserRole.user, UserRole.admin]),
        },
      }),
    ),
  );

  // 2. Create Posts
  const posts: TPostSchema[] = [];
  for (const user of users) {
    const postCount = faker.number.int({ min: 1, max: 2 });

    for (let i = 0; i < postCount; i++) {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(1),
          published: true,
          authorId: user.id,
          tags: Array.from(
            { length: faker.number.int({ min: 1, max: 3 }) },
            () => faker.hacker.noun().toLowerCase(),
          ),
        },
      });

      posts.push({
        ...post,
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      });
    }
  }

  // 3. Create Likes
  for (const post of posts) {
    const numLikes = faker.number.int({ min: 0, max: 2 });
    const likedBy = faker.helpers.arrayElements(users, numLikes);

    for (const user of likedBy) {
      try {
        await prisma.like.create({
          data: {
            userId: user.id,
            postId: post.id,
          },
        });
      } catch (e) {
        // Avoid unique constraint errors
        console.log(e);
      }
    }
  }

  // 4. Create Flags
  for (const post of posts) {
    const shouldFlag = faker.datatype.boolean();
    if (shouldFlag) {
      const flagger = faker.helpers.arrayElement(users);
      try {
        await prisma.flag.create({
          data: {
            postId: post.id,
            userId: flagger.id,
            reason: faker.lorem.sentence(),
          },
        });
      } catch (e) {
        console.log('Flag creation error:', e);
      }
    }
  }

  // 5. Create Comments
  for (const post of posts) {
    const commentCount = faker.number.int({ min: 20, max: 30 });
    const commentingUsers = faker.helpers.arrayElements(users, commentCount);

    for (const user of commentingUsers) {
      try {
        await prisma.comment.create({
          data: {
            content: faker.lorem.sentences({ min: 1, max: 3 }),
            postId: post.id,
            authorId: user.id,
            isEdited: faker.datatype.boolean(),
            createdAt: faker.date.recent(),
          },
        });
      } catch (e) {
        console.log('Comment creation error:', e);
      }
    }
  }

  console.log('✅ Done seeding!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

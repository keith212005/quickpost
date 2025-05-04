import { bycrypt } from 'bcryptjs';

import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    console.log('Received body:', body);

    const hashedPassword = await bycrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log('User created:', user);
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Signup error:', error);
    return new NextResponse('Error creating user', { status: 500 });
  }
}

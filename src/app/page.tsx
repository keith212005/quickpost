import Image from 'next/image';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  if (session) {
    // Redirect based on role
    if (session.user?.role === 'admin') {
      redirect('/admin/dashboard/overview');
    } else if (session.user?.role === 'user' && session.user?.isActive) {
      redirect('/user/feed');
    }
  }

  return (
    <div className='bg-background text-foreground min-h-screen font-sans'>
      <header className='w-full bg-gradient-to-br from-indigo-500 to-purple-600 py-20 text-center text-white'>
        <h1 className='text-5xl font-bold tracking-tight sm:text-6xl'>
          Welcome to QuickPost
        </h1>
        <p className='mx-auto mt-4 max-w-2xl text-lg text-white/90 sm:text-xl'>
          Your modern platform to express thoughts, connect with others, and
          share content in real time.
        </p>
        <div className='mt-8'>
          <a
            href='/signin'
            className='inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-indigo-600 shadow-sm transition hover:bg-gray-100'
          >
            Explore Posts
          </a>
        </div>
      </header>

      <main className='mx-auto max-w-6xl px-6 py-16 sm:px-12'>
        <section className='grid grid-cols-1 items-center gap-10 sm:grid-cols-2'>
          <div>
            <h2 className='mb-4 text-3xl font-semibold'>
              Why Choose QuickPost?
            </h2>
            <p className='text-muted-foreground mb-6'>
              Built with the latest technologies like Next.js, Tailwind CSS, and
              Prisma, QuickPost gives you a seamless and elegant experience to
              interact, share, and grow your digital presence.
            </p>
            <ul className='text-muted-foreground space-y-3 text-base'>
              <li>✅ Real-time interactions</li>
              <li>✅ Auth & role-based access</li>
              <li>✅ Elegant dark/light UI support</li>
              <li>✅ Markdown & rich content support</li>
            </ul>
          </div>
          <div className='flex justify-center'>
            <Image
              src='/preview.png'
              alt='App preview'
              width={600}
              height={600}
              className='ring-muted rounded-xl shadow-md ring-1'
            />
          </div>
        </section>

        <section className='mt-24 text-center'>
          <h2 className='mb-4 text-3xl font-semibold'>What Can You Do?</h2>
          <p className='text-muted-foreground mx-auto mb-12 max-w-2xl'>
            QuickPost is your space for ideas—create posts, share updates, or
            follow other creators. It&apos;s fast, intuitive, and built for
            modern creators.
          </p>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
            <div className='bg-card rounded-lg border p-6 shadow transition hover:shadow-lg'>
              <h3 className='mb-2 text-xl font-bold'>Create & Share</h3>
              <p className='text-muted-foreground'>
                Post rich content with markdown, images, and more.
              </p>
            </div>
            <div className='bg-card rounded-lg border p-6 shadow transition hover:shadow-lg'>
              <h3 className='mb-2 text-xl font-bold'>Engage in Real Time</h3>
              <p className='text-muted-foreground'>
                Like, comment, and interact instantly.
              </p>
            </div>
            <div className='bg-card rounded-lg border p-6 shadow transition hover:shadow-lg'>
              <h3 className='mb-2 text-xl font-bold'>Manage with Ease</h3>
              <p className='text-muted-foreground'>
                Use role-based dashboards and admin tools.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className='text-muted-foreground py-10 text-center text-sm'>
        &copy; {new Date().getFullYear()} QuickPost.
      </footer>
    </div>
  );
}

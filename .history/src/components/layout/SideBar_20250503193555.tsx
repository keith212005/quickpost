'use client';

import { Home, LogOut, MessageSquareText, Settings, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import SideBarLink from '../ui/SideBarLink';
import ThemedIcon from '../ui/ThemedIcon';

export default function Sidebar() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  console.log(session);

  return (
    <aside className='hidden h-screen w-64 flex-col border-r bg-white px-6 py-8 shadow-lg md:flex dark:bg-black'>
      <div className='mb-10'>
        <h1 className='text-2xl font-extrabold text-blue-700 dark:text-white'>
          QuickPost
        </h1>
        <span className='text-sm text-gray-500 dark:text-gray-400'>v1.0</span>
      </div>
      <nav className='flex flex-col space-y-3 text-[15px] font-medium text-gray-800'>
        <SideBarLink href='/feed' label='Feed'>
          <ThemedIcon Icon={Home} />
        </SideBarLink>

        <SideBarLink href='/profile' label='My Posts'>
          <ThemedIcon Icon={MessageSquareText} />
        </SideBarLink>

        <SideBarLink href='/settings' label='Settings'>
          <ThemedIcon Icon={User} />
        </SideBarLink>

        <SideBarLink href='/settings' label='Settings'>
          <ThemedIcon Icon={Settings} />
        </SideBarLink>

        {session && (
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className='flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-gray-200 dark:text-white hover:dark:bg-gray-700'
          >
            <ThemedIcon Icon={LogOut} />
            Logout
          </button>
        )}
      </nav>
    </aside>
  );
}

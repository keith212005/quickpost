import React from 'react';
import { Home, MessageSquareText, Settings, User } from 'lucide-react';

import { SignOutButton } from './SingoutButton';
import { SideBarLink } from './ui/SideBarLink';
import ThemedIcon from './ui/ThemedIcon';

export const AdminResponsiveSidebar = () => {
  return (
    <>
      <SideBarLink href='/admin/dashboard/overview' label='Dashboard'>
        <ThemedIcon Icon={Home} />
      </SideBarLink>

      <SideBarLink href='/admin/users' label='Users'>
        <ThemedIcon Icon={User} />
      </SideBarLink>

      <SideBarLink href='/admin/posts' label='All Posts'>
        <ThemedIcon Icon={MessageSquareText} />
      </SideBarLink>

      <SideBarLink href='/settings' label='Settings'>
        <ThemedIcon Icon={Settings} />
      </SideBarLink>

      <SignOutButton />
    </>
  );
};

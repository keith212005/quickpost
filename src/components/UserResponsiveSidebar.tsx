import React from 'react';
import { Home, MessageSquareText, Settings, User } from 'lucide-react';

import { SignOutButton } from './SingoutButton';
import { SideBarLink } from './ui/SideBarLink';
import ThemedIcon from './ui/ThemedIcon';

export const UserResponsiveSidebar = () => {
  return (
    <>
      <SideBarLink href='/user/feed' label='Feed'>
        <ThemedIcon Icon={Home} />
      </SideBarLink>
      <SideBarLink href='/user/myposts' label='My Posts'>
        <ThemedIcon Icon={MessageSquareText} />
      </SideBarLink>
      <SideBarLink href='/user/profile' label='Profile'>
        <ThemedIcon Icon={User} />
      </SideBarLink>
      <SideBarLink href='/user/settings' label='Settings'>
        <ThemedIcon Icon={Settings} />
      </SideBarLink>
      <SignOutButton />
    </>
  );
};

import React from 'react';
import { Home, MessageSquareText, Settings, User } from 'lucide-react';

import { SignOutButton } from './SingoutButton';
import { SideBarLink } from './ui/SideBarLink';
import ThemedIcon from './ui/ThemedIcon';

type Props = {
  onItemSelect?: () => void;
};

export const AdminResponsiveSidebar = ({ onItemSelect }: Props) => {
  return (
    <>
      <SideBarLink
        href='/admin/dashboard/overview'
        label='Dashboard'
        onClick={onItemSelect}
      >
        <ThemedIcon Icon={Home} />
      </SideBarLink>

      <SideBarLink href='/admin/users' label='Users' onClick={onItemSelect}>
        <ThemedIcon Icon={User} />
      </SideBarLink>

      <SideBarLink href='/admin/posts' label='All Posts' onClick={onItemSelect}>
        <ThemedIcon Icon={MessageSquareText} />
      </SideBarLink>

      <SideBarLink href='/settings' label='Settings' onClick={onItemSelect}>
        <ThemedIcon Icon={Settings} />
      </SideBarLink>

      <SignOutButton onClick={onItemSelect} />
    </>
  );
};

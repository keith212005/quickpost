import React from 'react';
import { Home, MessageSquareText, Settings, User } from 'lucide-react';

import { SignOutButton } from './SingoutButton';
import { SideBarLink } from './ui/SideBarLink';
import ThemedIcon from './ui/ThemedIcon';

type Props = {
  onItemSelect?: () => void;
};

export const UserResponsiveSidebar = ({ onItemSelect }: Props) => {
  return (
    <>
      <SideBarLink href='/user/feed' label='Feed' onClick={onItemSelect}>
        <ThemedIcon Icon={Home} />
      </SideBarLink>
      <SideBarLink href='/user/myposts' label='My Posts' onClick={onItemSelect}>
        <ThemedIcon Icon={MessageSquareText} />
      </SideBarLink>
      <SideBarLink href='/user/profile' label='Profile' onClick={onItemSelect}>
        <ThemedIcon Icon={User} />
      </SideBarLink>
      <SideBarLink
        href='/user/settings'
        label='Settings'
        onClick={onItemSelect}
      >
        <ThemedIcon Icon={Settings} />
      </SideBarLink>
      <SignOutButton onClick={onItemSelect} />
    </>
  );
};

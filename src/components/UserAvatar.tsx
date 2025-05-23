import React from 'react';
import { useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const UserAvatar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!session) {
    return null;
  }

  return (
    <Avatar>
      <AvatarImage
        src={user?.image ?? ''}
        alt={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
      />
      <AvatarFallback>
        {`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

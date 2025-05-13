import React from 'react';
import { useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const UserAvatar = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Avatar>
      <AvatarImage src={session?.user?.image ?? ''} alt='@shadcn' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

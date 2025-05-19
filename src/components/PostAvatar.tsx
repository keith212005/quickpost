import React from 'react';

import { hashCode, intToRGB } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type PostAvatarProps = {
  name: string;
  image: string;
};

export const PostAvatar = ({ name, image }: PostAvatarProps) => {
  return (
    <Avatar className='h-8 w-8'>
      <AvatarImage
        src={image || ''}
        alt={name || ''}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <AvatarFallback
        style={{
          backgroundColor: `#${intToRGB(hashCode(name || 'U'))}`,
        }}
      >
        {name
          ?.split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || 'U'}
      </AvatarFallback>
    </Avatar>
  );
};

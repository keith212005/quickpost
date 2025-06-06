import React from 'react';
import { LucideIcon } from 'lucide-react';

type ThemedIconProps = {
  Icon: LucideIcon;
};

const ThemedIcon = ({ Icon }: ThemedIconProps) => {
  return (
    <Icon className='h-5 w-5 text-black dark:text-white dark:hover:text-gray-300' />
  );
};

export default ThemedIcon;

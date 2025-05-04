import { LucideIcon } from 'lucide-react';
import React from 'react';

type ThemedIconProps = {
  Icon: LucideIcon;
};

const ThemedIcon = ({ Icon }: ThemedIconProps) => {
  return <Icon className='h-5 w-5 hover:text-black dark:text-white' />;
};

export default ThemedIcon;

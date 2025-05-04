import { LucideIcon } from 'lucide-react';
import React from 'react';

type ThemedIconProps = {
  Icon: LucideIcon;
};

const ThemedIcon = ({ Icon }: ThemedIconProps) => {
  return <Icon className='ho h-5 w-5 dark:text-white hover:dark:text-black' />;
};

export default ThemedIcon;

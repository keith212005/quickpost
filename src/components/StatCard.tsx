import React from 'react';
import { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type StatCardProps = {
  title: string;
  value: number;
  icon?: LucideIcon;
  variant?: 'default' | 'success' | 'danger' | 'info' | 'purple';
};

export const StatCard = ({
  title,
  value,
  icon: Icon,
  variant = 'default',
}: StatCardProps) => {
  let colorClass = '';

  switch (variant) {
    case 'success':
      colorClass =
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      break;
    case 'danger':
      colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      break;
    case 'info':
      colorClass =
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      break;
    case 'purple':
      colorClass =
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      break;
    default:
      colorClass =
        'bg-muted text-foreground dark:bg-muted dark:text-foreground';
  }

  return (
    <Card
      className={`shadow-sm transition-shadow duration-300 hover:shadow-md ${colorClass}`}
    >
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {Icon && <Icon className='h-5 w-5 opacity-70' />}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-muted-foreground text-xs'>Compared to last period</p>
      </CardContent>
    </Card>
  );
};

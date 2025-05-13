'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';

import { useThemeToggle } from '@/hooks/useThemeToggle';

export const ToggleThemeButton = () => {
  const { mounted, theme, toggleTheme } = useThemeToggle();
  return (
    <button
      onClick={toggleTheme}
      className='ml-4 rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-400'
      aria-label='Toggle Theme'
    >
      {mounted ? (
        theme === 'dark' ? (
          <Sun className='h-5 w-5 text-white' />
        ) : (
          <Moon className='h-5 w-5 text-black' />
        )
      ) : (
        <Moon className='h-5 w-5 text-black' />
      )}
    </button>
  );
};

import React from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from './ui/button';
type OAuthButtonProps = {
  label: string;
  provider: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  onClick?: (provider: string) => void;
};

export const OAuthButton = ({
  label,
  provider,
  icon,
  isLoading = false,
  onClick,
}: OAuthButtonProps) => (
  <Button
    type='button'
    variant='outline'
    disabled={isLoading}
    onClick={() => onClick?.(provider)}
    className='flex flex-1 items-center justify-center gap-2'
  >
    {isLoading && <Loader2 className='animate-spin' />}
    {icon ?? <span>G</span>}
    <span>{label}</span>
  </Button>
);

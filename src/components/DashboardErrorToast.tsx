'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

type Props = {
  error?: string;
};

export const DashboardErrorToast = ({ error }: Props) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return null; // No UI needed
};

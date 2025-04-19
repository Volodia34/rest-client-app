'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useRouterSafe = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? router : null;
};

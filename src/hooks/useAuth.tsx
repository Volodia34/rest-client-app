'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user && (pathname === '/signin' || pathname === '/signup')) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router, pathname]);

  const logout = async () => {
    await signOut(auth);
    router.push('/signin');
  };

  return { user, logout };
};

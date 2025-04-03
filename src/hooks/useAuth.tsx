'use client';

import { useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const decodedToken = await user.getIdTokenResult();
          const expirationTime = new Date(
            decodedToken.expirationTime
          ).getTime();
          const currentTime = new Date().getTime();
          console.warn(
            `Token expires: ${new Date(decodedToken.expirationTime)}`
          );
          if (expirationTime <= currentTime) {
            console.warn('Token expired');
            await logout();
            return;
          }
          setUser(user);
          if (user && (pathname === '/signin' || pathname === '/signup')) {
            router.push('/');
          }
        } catch (error) {
          console.error('Error getting token:', error);
          await logout();
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [router, pathname, logout]);

  return { user, logout };
};

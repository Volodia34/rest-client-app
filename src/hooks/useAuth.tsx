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

  const checkToken = useCallback(
    async (currentUser: User) => {
      try {
        const decodedToken = await currentUser.getIdTokenResult();
        const expirationTime = new Date(decodedToken.expirationTime).getTime();
        const currentTime = new Date().getTime();

        if (expirationTime <= currentTime) {
          console.warn('Token expired');
          await logout();
          return false;
        }
        return true;
      } catch (error) {
        console.error('Error checking token:', error);
        await logout();
        return false;
      }
    },
    [logout]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isValid = await checkToken(user);
        if (isValid) {
          setUser(user);
          if (pathname === '/signin' || pathname === '/signup') {
            router.push('/');
          }
        }
      } else {
        setUser(null);
      }
    });

    const tokenCheckInterval = setInterval(async () => {
      if (auth.currentUser) {
        await checkToken(auth.currentUser);
        clearInterval(tokenCheckInterval);
      }
    }, 60_000);
    return () => unsubscribe();
  }, [router, pathname, logout, checkToken]);

  return { user, logout };
};

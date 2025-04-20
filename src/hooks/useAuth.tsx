'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import {
  onAuthStateChanged,
  signOut,
  User,
  getIdTokenResult,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const wasAuthenticated = useRef(false);
  const tokenExpirationTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      if (tokenExpirationTimeout.current) {
        clearTimeout(tokenExpirationTimeout.current);
      }
      await signOut(auth);
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        wasAuthenticated.current = true;

        try {
          const tokenResult = await getIdTokenResult(currentUser);
          const expirationTime = new Date(tokenResult.expirationTime).getTime();
          const currentTime = Date.now();
          const timeUntilExpiration = expirationTime - currentTime;

          if (tokenExpirationTimeout.current) {
            clearTimeout(tokenExpirationTimeout.current);
          }

          tokenExpirationTimeout.current = setTimeout(() => {
            console.log('🔴 Token expired. Redirecting to Main page.');
            logout();
          }, timeUntilExpiration);

          console.log(
            '⏳ Token expires at:',
            new Date(tokenResult.expirationTime)
          );
        } catch (err) {
          console.error('Failed to get token info:', err);
        }
      } else {
        if (wasAuthenticated.current) {
          console.log('🔴 User is logged out or token expired');
          setUser(null);
          router.push('/');
        }
      }

      setLoading(false);
    });

    return () => {
      if (tokenExpirationTimeout.current) {
        clearTimeout(tokenExpirationTimeout.current);
      }
      unsubscribe();
    };
  }, [logout, router]);

  return { user, logout, loading };
};

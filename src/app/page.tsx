'use client';

import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/UI/buttons/Button';
import { useRouter } from 'next/navigation';
import './globals.scss';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <ErrorBoundary>
      <div className="main-page">
        <main className="main-content">
          {user ? (
            <>
              <h1>Welcome Back, {user.displayName}!</h1>
              <div className="links">
                <Button text="REST Client" onClick={() => {}} />
                <Button text="History" onClick={() => {}} />
                <Button text="Variables" onClick={() => {}} />
              </div>
            </>
          ) : (
            <>
              <h1>Welcome!</h1>
              <div className="auth-buttons">
                <Button text="Sign In" onClick={() => router.push('/signin')} />
                <Button text="Sign Up" onClick={() => router.push('/signup')} />
              </div>
            </>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

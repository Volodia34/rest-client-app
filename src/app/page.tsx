'use client';

import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/UI/buttons/Button';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/Header';
import RestClient from '@/components/restClient/RestClient';
import ResponseBlock from '@/components/restClient/response/ResponseBlock';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import './globals.scss';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Header />
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
        <RestClient />
        <ResponseBlock />
      </Provider>
    </ErrorBoundary>
  );
}

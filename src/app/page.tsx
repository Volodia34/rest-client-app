'use client';

import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import MainPage from '@/components/main/MainPage';

export default function Home() {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
}

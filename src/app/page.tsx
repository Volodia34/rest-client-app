import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import Header from '@/header/Header';

export default function Home() {
  return (
    <ErrorBoundary>
      <Header />
    </ErrorBoundary>
  );
}

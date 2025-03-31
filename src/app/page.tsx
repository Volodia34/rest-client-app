import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import Header from '@/components/header/Header';

export default function Home() {
  return (
    <ErrorBoundary>
      <Header />
    </ErrorBoundary>
  );
}

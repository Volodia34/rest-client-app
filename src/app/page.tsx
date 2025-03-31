import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import Header from '@/components/header/Header';
import RestClient from '@/components/restClient/RestClient';

export default function Home() {
  return (
    <ErrorBoundary>
      <Header />
      <RestClient />
    </ErrorBoundary>
  );
}

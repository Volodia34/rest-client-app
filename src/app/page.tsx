import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import Header from '@/components/header/Header';
import RestClient from '@/components/restClient/RestClient';
import ResponseBlock from '@/components/restClient/response/ResponseBlock';

export default function Home() {
  return (
    <ErrorBoundary>
      <Header />
      <RestClient />
      <ResponseBlock />
    </ErrorBoundary>
  );
}

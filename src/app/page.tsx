import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import Header from '@/components/header/Header';
import RestClient from '@/components/restClient/RestClient';
import ResponseBlock from '@/components/restClient/response/ResponseBlock';
import Footer from '@/components/footer/Footer';

export default function Home() {
  return (
    <ErrorBoundary>
      <Header />
      <RestClient />
      <ResponseBlock />
      <Footer />
    </ErrorBoundary>
  );
}

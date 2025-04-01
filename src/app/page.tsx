import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import Header from '@/components/header/Header';

// import ResponseBlock from '@/components/restClient/response/ResponseBlock';
import Footer from '@/components/footer/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import MainPage from '@/components/header/main/MainPage';

export default function Home() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Header />
        {/* <ResponseBlock /> */}
        <MainPage />
        <Footer />
      </LanguageProvider>
    </ErrorBoundary>
  );
}

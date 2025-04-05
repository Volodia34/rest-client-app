'use client';

import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import Header from '@/components/header/Header';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Footer from '@/components/footer/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import MainPage from '@/components/main/MainPage';

export default function Home() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <LanguageProvider>
          <Header />
          <MainPage />
          <Footer />
        </LanguageProvider>
      </Provider>
    </ErrorBoundary>
  );
}

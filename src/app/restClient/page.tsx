'use client';
import RestClient from '@/components/restClient/RestClient';
import { LanguageProvider } from '@/context/LanguageContext';
import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
export default function RestClientPage() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <LanguageProvider>
          <RestClient />
        </LanguageProvider>
      </Provider>
    </ErrorBoundary>
  );
}

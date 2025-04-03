'use client';

import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import Header from '@/components/header/Header';
import RestClient from '@/components/restClient/RestClient';
import ResponseBlock from '@/components/restClient/response/ResponseBlock';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function Home() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Header />
        <RestClient />
        <ResponseBlock />
      </Provider>
    </ErrorBoundary>
  );
}

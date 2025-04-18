'use client';
import { store } from '@/store/store';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';

const RestClient = dynamic(() => import('@/components/restClient/RestClient'), {
  ssr: true,
});

export default function RestClientPage() {
  return (
    <Provider store={store}>
      <RestClient />
    </Provider>
  );
}

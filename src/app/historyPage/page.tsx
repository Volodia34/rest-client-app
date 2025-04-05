'use client';
import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/context/LanguageContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const HistoryContent = dynamic(
  () => import('@/components/history/historyContent'),
  {
    ssr: true,
  }
);

export default function HistoryPage() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <HistoryContent />;
      </LanguageProvider>
    </Provider>
  );
}

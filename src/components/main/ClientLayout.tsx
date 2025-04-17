'use client';
import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
import Header from '@/components/header/Header';
import { LanguageProvider } from '@/context/LanguageContext';
import Footer from '@/components/footer/Footer';
import { AuthProvider } from '@/context/useAuthContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Provider store={store}>
          <Header />
          <AuthProvider>{children}</AuthProvider>
          <Footer />
        </Provider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

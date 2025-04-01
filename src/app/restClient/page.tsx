import RestClient from '@/components/restClient/RestClient';
import { LanguageProvider } from '@/context/LanguageContext';
import ErrorBoundary from '@/errorsHandlers/ErrorBoundary';
export default function RestClientPage() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <RestClient />
      </LanguageProvider>
    </ErrorBoundary>
  );
}

import { useLanguageContext } from '@/context/LanguageContext';
import { HeaderRest } from '@/types/restClient';

type TranslateFunction = ReturnType<typeof useLanguageContext>['t'];

export const validateRequestFields = (
  t: TranslateFunction,
  language: string,
  baseUrl: string,
  method: string,
  headers: HeaderRest[],
  body: string | null
): string | null => {
  switch (true) {
    case !language:
      return t('restClient.validation.language') as string;
    case !baseUrl:
      return t('restClient.validation.url') as string;
    case !method:
      return t('restClient.validation.method') as string;
    case !headers || headers.length === 0 || !headers[0].key:
      return t('restClient.validation.headers') as string;
    case !body && ['POST', 'PUT', 'PATCH'].includes(method):
      return t('restClient.validation.body') as string;
    default:
      return null;
  }
};

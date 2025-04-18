import { HeaderRest } from '@/types/restClient';

export const validateRequestFields = (
  language: string,
  baseUrl: string,
  method: string,
  headers: HeaderRest[],
  body: string | null
): string | null => {
  switch (true) {
    case !language:
      return 'You need the language code.';
    case !baseUrl:
      return 'You need the main URL.';
    case !method:
      return 'You need the method.';
    case !headers || headers.length === 0 || !headers[0].key:
      return 'You need the headers.';
    case !body && ['POST', 'PUT', 'PATCH'].includes(method):
      return 'You need the body.';
    default:
      return null;
  }
};

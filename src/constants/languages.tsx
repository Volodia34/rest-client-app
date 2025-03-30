export const LANGUAGES = {
  EN: 'en',
  RU: 'ru',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

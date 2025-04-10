export const LANGUAGES = {
  EN: 'EN',
  RU: 'RU',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

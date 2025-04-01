import { Language } from '@/constants/languages';

export interface Translations {
  header: {
    login: string;
    signup: string;
    language: string;
  };
  main: {
    welcome: string;
  };
}

export type TranslationKey =
  | keyof Translations
  | `${keyof Translations}.${string}`;

export type LanguageContextType = {
  currentLang: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => unknown;
};

import { Language } from '@/constants/languages';

export interface Translations {
  header: {
    login: string;
    signup: string;
    logout: string;
    language: string;
  };
  main: {
    welcome: string;
    welcomeBack: string;
    restClient: string;
    history: string;
    variables: string;
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

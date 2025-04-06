import { Language } from '@/constants/languages';

export interface Translations {
  header: {
    login: string;
    signup: string;
    logout: string;
    mainpage: string;
    language: string;
  };
  history: {
    title: string;
    empty: string;
    tryOptions: string;
    goToClient: string;
    clearHistory: string;
    method: string;
    url: string;
    time: string;
    status: string;
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

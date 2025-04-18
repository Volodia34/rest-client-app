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
  auth: {
    username: string;
    email: string;
    password: string;
    signup: string;
    signin: string;
  };
  variables: {
    title: string;
    empty: string;
    tryOptions: string;
    goToClient: string;
    clearVariables: string;
    key: string;
    value: string;
    enterKey: string;
    enterValue: string;
    add: string;
    delete: string;
  };
  restClient: {
    generatedCodeTitle: string;
    generatedCodeMessageText: string;
    generatedCodeBodyTitle: string;
    generatedCodeRestTitle: string;
    generatedCodeRestCode: string;
    headerTitle: string;
    headerAddButtonText: string;
    restBodyTitle: string;
    restBodyButtonText: string;
    restBodyPlaceholder: string;
    httpMethodURLErrorUrl: string;
    httpMethodURLSendButton: string;
    headersInputButtonUpdate: string;
    headersInputButtonAdd: string;
    headersInputButtonRemove: string;
    validation: {
      language: string;
      url: string;
      method: string;
      headers: string;
      body: string;
    };
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

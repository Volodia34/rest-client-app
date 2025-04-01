import { LANGUAGES, Language } from '@/constants/languages';
import { Translations } from '@/types/translations';

export const translations: Record<Language, Translations> = {
  [LANGUAGES.EN]: {
    header: {
      login: 'Login',
      signup: 'Sign Up',
      language: 'Language',
    },
    main: {
      welcome: 'Welcome to the REST Client App!',
    },
  },
  [LANGUAGES.RU]: {
    header: {
      login: 'Войти',
      signup: 'Регистрация',
      language: 'Язык',
    },
    main: {
      welcome: 'Добро пожаловать в REST Client App!',
    },
  },
} as const;

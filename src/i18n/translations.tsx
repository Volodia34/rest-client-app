import { LANGUAGES, Language } from '@/constants/languages';
import { Translations } from '@/types/translations';

export const translations: Record<Language, Translations> = {
  [LANGUAGES.EN]: {
    header: {
      login: 'Login',
      signup: 'Sign Up',
      language: 'Language',
      logout: 'Logout',
    },
  },
  [LANGUAGES.RU]: {
    header: {
      login: 'Войти',
      signup: 'Регистрация',
      language: 'Язык',
      logout: 'Выйти',
    },
  },
} as const;

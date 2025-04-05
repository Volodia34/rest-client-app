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
    history: {
      empty: "You haven't executed any requests yet",
      tryOptions: "It's empty here. Try those options:",
      goToClient: 'Go to REST Client',
    },
  },
  [LANGUAGES.RU]: {
    header: {
      login: 'Войти',
      signup: 'Регистрация',
      language: 'Язык',
      logout: 'Выйти',
    },
    history: {
      empty: 'Вы еще не выполнили ни одного запроса',
      tryOptions: 'Здесь пусто. Попробуйте эти варианты:',
      goToClient: 'Перейти в REST Client',
    },
  },
} as const;

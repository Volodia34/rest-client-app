import { LANGUAGES, Language } from '@/constants/languages';
import { Translations } from '@/types/translations';

export const translations: Record<Language, Translations> = {
  [LANGUAGES.EN]: {
    header: {
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      mainpage: 'Main',
      language: 'Language',
    },
    main: {
      welcome: 'Welcome to the REST Client App!',
      welcomeBack: 'Welcome back, %username% to the REST Client App!',
      restClient: 'REST Client',
      history: 'History',
      variables: 'Variables',
    },
  },
  [LANGUAGES.RU]: {
    header: {
      login: 'Войти',
      signup: 'Регистрация',
      logout: 'Выйти',
      mainpage: 'Главная',
      language: 'Язык',
    },
    main: {
      welcome: 'Добро пожаловать в REST Client App!',
      welcomeBack: '%username% рады снова видеть вас в REST Client App!',
      restClient: 'REST Клиент',
      history: 'История',
      variables: 'Переменные',
    },
  },
} as const;

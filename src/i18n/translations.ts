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
    history: {
      empty: "You haven't executed any requests yet",
      tryOptions: "It's empty here. Make your first request via Rest Client:",
      goToClient: 'Go to REST Client',
      clearHistory: 'Clear History',
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
    history: {
      empty: 'Вы еще не выполняли запросы',
      tryOptions: 'Здесь пусто. Сделайте свой первый запрос через REST Клиент:',
      goToClient: 'Перейти к REST Клиенту',
      clearHistory: 'Очистить историю',
    },
  },
} as const;

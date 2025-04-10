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
      title: 'Your request History',
      empty: "You haven't executed any requests yet",
      tryOptions: "It's empty here. Make your first request via Rest Client:",
      goToClient: 'Go to REST Client',
      clearHistory: 'Clear History',
      method: 'Method',
      url: 'URL',
      time: 'Date/Time',
      status: 'Status',
    },
    auth: {
      username: 'Username',
      email: 'Email',
      password: 'Password',
      signup: 'Sign Up',
      signin: 'Sign In',
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
      title: 'Ваша история запросов',
      empty: 'Вы еще не выполняли запросы',
      tryOptions: 'Здесь пусто. Сделайте свой первый запрос через REST Клиент:',
      goToClient: 'Перейти к REST Клиенту',
      clearHistory: 'Очистить историю',
      method: 'Метод',
      url: 'URL',
      time: 'Дата/Время',
      status: 'Статус',
    },
    auth: {
      username: 'Имя пользователя',
      email: 'Электронная почта',
      password: 'Пароль',
      signup: 'Зарегистрироваться',
      signin: 'Войти',
    },
  },
} as const;

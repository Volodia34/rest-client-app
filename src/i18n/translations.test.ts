import { translations } from './translations';
import { LANGUAGES } from '@/constants/languages';

describe('translations', () => {
  it('should return correct translations for all defined keys in English', () => {
    const enTranslations = translations[LANGUAGES.EN];

    expect(enTranslations.header.login).toBe('Login');
    expect(enTranslations.header.signup).toBe('Sign Up');
    expect(enTranslations.header.logout).toBe('Logout');
    expect(enTranslations.header.mainpage).toBe('Main');
    expect(enTranslations.header.language).toBe('Language');

    expect(enTranslations.main.welcome).toBe('Welcome to the REST Client App!');
    expect(enTranslations.main.welcomeBack).toBe(
      'Welcome back, %username% to the REST Client App!'
    );
    expect(enTranslations.main.restClient).toBe('REST Client');
    expect(enTranslations.main.history).toBe('History');
    expect(enTranslations.main.variables).toBe('Variables');

    expect(enTranslations.history.empty).toBe(
      "You haven't executed any requests yet"
    );
    expect(enTranslations.history.tryOptions).toBe(
      "It's empty here. Make your first request via Rest Client:"
    );
    expect(enTranslations.history.goToClient).toBe('Go to REST Client');
    expect(enTranslations.history.clearHistory).toBe('Clear History');
  });

  it('should return correct translations for all defined keys in Russian', () => {
    const ruTranslations = translations[LANGUAGES.RU];

    expect(ruTranslations.header.login).toBe('Войти');
    expect(ruTranslations.header.signup).toBe('Регистрация');
    expect(ruTranslations.header.logout).toBe('Выйти');
    expect(ruTranslations.header.mainpage).toBe('Главная');
    expect(ruTranslations.header.language).toBe('Язык');

    expect(ruTranslations.main.welcome).toBe(
      'Добро пожаловать в REST Client App!'
    );
    expect(ruTranslations.main.welcomeBack).toBe(
      '%username% рады снова видеть вас в REST Client App!'
    );
    expect(ruTranslations.main.restClient).toBe('REST Клиент');
    expect(ruTranslations.main.history).toBe('История');
    expect(ruTranslations.main.variables).toBe('Переменные');

    expect(ruTranslations.history.empty).toBe('Вы еще не выполняли запросы');
    expect(ruTranslations.history.tryOptions).toBe(
      'Здесь пусто. Сделайте свой первый запрос через REST Клиент:'
    );
    expect(ruTranslations.history.goToClient).toBe('Перейти к REST Клиенту');
    expect(ruTranslations.history.clearHistory).toBe('Очистить историю');
  });

  it('should handle special characters and formatting in translation strings correctly', () => {
    const enTranslations = translations[LANGUAGES.EN];
    const ruTranslations = translations[LANGUAGES.RU];

    expect(enTranslations.main.welcomeBack).toBe(
      'Welcome back, %username% to the REST Client App!'
    );
    expect(enTranslations.history.empty).toBe(
      "You haven't executed any requests yet"
    );
    expect(ruTranslations.main.welcomeBack).toBe(
      '%username% рады снова видеть вас в REST Client App!'
    );
    expect(ruTranslations.history.tryOptions).toBe(
      'Здесь пусто. Сделайте свой первый запрос через REST Клиент:'
    );
  });
  it('should return the correct type (string) for all translation values', () => {
    const languages = Object.values(LANGUAGES);

    languages.forEach((lang) => {
      const langTranslations = translations[lang];

      Object.values(langTranslations).forEach((section) => {
        Object.values(section).forEach((value) => {
          expect(typeof value).toBe('string');
        });
      });
    });
  });
});

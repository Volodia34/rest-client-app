import { LANGUAGES } from '@/constants/languages';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useLanguage } from './useLanguage';
import { TranslationKey } from '@/types/translations';

it('should initialize with English as the default language', () => {
  const { result } = renderHook(() => useLanguage());
  expect(result.current.currentLang).toBe(LANGUAGES.EN);
});

it('should handle non-existent translation key', () => {
  const { result } = renderHook(() => useLanguage());

  const nonExistentKey = 'non.existent.key' as TranslationKey;
  const translatedValue = result.current.t(nonExistentKey);

  expect(translatedValue).toBeUndefined();
});

jest.mock('@/i18n/translations', () => ({
  translations: {
    [LANGUAGES.EN]: {
      common: {
        greeting: 'Hello',
      },
    },
    [LANGUAGES.RU]: {
      common: {
        greeting: 'Привет',
      },
    },
  },
}));

it('should maintain consistent language state across multiple toggles', () => {
  const { result } = renderHook(() => useLanguage());

  expect(result.current.currentLang).toBe(LANGUAGES.EN);

  act(() => {
    result.current.toggleLanguage();
  });
  expect(result.current.currentLang).toBe(LANGUAGES.RU);
});

jest.mock('@/i18n/translations', () => ({
  translations: {
    [LANGUAGES.EN]: {
      nested: {
        key: {
          deep: 'Nested Value',
        },
      },
    },
    [LANGUAGES.RU]: {
      nested: {
        key: {
          deep: 'Вложенное значение',
        },
      },
    },
  },
}));

it('should handle nested translation keys correctly', () => {
  const { result } = renderHook(() => useLanguage());
  const nestedKey = 'nested.key.deep' as TranslationKey;
  const translatedValue = result.current.t(nestedKey);

  expect(translatedValue).toBe('Nested Value');
});

it('should return undefined for an invalid translation key', () => {
  const { result } = renderHook(() => useLanguage());

  const invalidKey = 'invalid.key.that.does.not.exist' as TranslationKey;
  const translatedValue = result.current.t(invalidKey);

  expect(translatedValue).toBeUndefined();
});

it('should toggle language from English to Russian', () => {
  const { result } = renderHook(() => useLanguage());

  expect(result.current.currentLang).toBe(LANGUAGES.EN);

  act(() => {
    result.current.toggleLanguage();
  });

  expect(result.current.currentLang).toBe(LANGUAGES.RU);
});

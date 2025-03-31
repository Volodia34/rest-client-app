import { LANGUAGES, Language } from '@/constants/languages';
import { translations } from '@/i18n/translations';
import { Translations, TranslationKey } from '@/types/translations';
import { useState, useCallback } from 'react';

export function useLanguage() {
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES.EN);

  const toggleLanguage = useCallback(() => {
    setCurrentLang((prev) =>
      prev === LANGUAGES.EN ? LANGUAGES.RU : LANGUAGES.EN
    );
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      const keys = key.split('.') as Array<keyof Translations>;
      let value: unknown = translations[currentLang];

      for (const key of keys) {
        value =
          value && typeof value === 'object'
            ? value[key as keyof typeof value]
            : undefined;
      }

      return value;
    },
    [currentLang]
  );

  return { currentLang, toggleLanguage, t };
}

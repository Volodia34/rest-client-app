export interface Translations {
  header: {
    login: string;
    signup: string;
    language: string;
  };
}

export type TranslationKey =
  | keyof Translations
  | `${keyof Translations}.${string}`;

export interface Translations {
  header: {
    login: string;
    signup: string;
    logout: string;
    language: string;
  };
}

export type TranslationKey =
  | keyof Translations
  | `${keyof Translations}.${string}`;

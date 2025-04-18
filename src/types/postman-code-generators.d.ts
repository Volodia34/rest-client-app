// types/postman-code-generators.d.ts
declare module 'postman-code-generators' {
  export function getLanguageList(): {
    key: string;
    label: string;
    variant: { key: string }[];
  }[];
  export function getOptions(
    language: string,
    variant: string,
    callback: (
      error: unknown,
      options: {
        name: string;
        id: string;
        type: string;
        default: unknown;
        description: string;
      }[]
    ) => void
  ): void;
  export function convert(
    language: string,
    variant: string,
    request: unknown,
    options: unknown,
    callback: (error: unknown, snippet: string) => void
  ): void;
}

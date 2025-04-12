import { Header, Request } from 'postman-collection';
import * as codegen from 'postman-code-generators';
import { HeaderRest } from '@/types/restClient';

export const postmanCodeGen = async (
  url: string,
  method: string,
  headers: HeaderRest[],
  body: string | null,
  language: string,
  variant: string
) => {
  const postmanHeaders = headers.map(
    (header) =>
      new Header({
        key: header.key,
        value: header.value,
      })
  );

  const request = new Request({
    url,
    method,
    header: postmanHeaders,
    body: body ? { mode: 'raw', raw: body } : undefined,
  });

  const options = {
    indentCount: 2,
    indentType: 'Space',
  };

  return new Promise<string>((resolve, reject) => {
    codegen.convert(language, variant, request, options, (error, snippet) => {
      if (error) {
        reject(error);
      } else {
        resolve(snippet);
      }
    });
  });
};

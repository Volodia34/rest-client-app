import { useEffect, useState } from 'react';
import { postmanCodeGen } from '@/helpers/postmanCodeGen';
import { HeaderRest } from '@/types/restClient';
import { validateRequestFields } from '@/helpers/validateRequestFields';
import { useLanguageContext } from '@/context/LanguageContext';

export const useGeneratedCode = (
  language: string,
  method: string,
  headers: HeaderRest[],
  baseUrl: string,
  endpoint: string,
  params: string,
  body: string | null
) => {
  const { t } = useLanguageContext();
  const [generatedSnippet, setGeneratedSnippet] = useState<string | null>(null);
  const [warningMessages, setWarningMessages] = useState<string | null>(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const url = `${baseUrl}${endpoint}?${params}`;
    const warning = validateRequestFields(
      t,
      language,
      baseUrl,
      method,
      headers,
      body
    );
    setWarningMessages(warning);

    if (!warning) {
      const fetchGeneratedCode = async () => {
        try {
          const [languagePostman, variantPostman] = language.split('-');
          const snippet = await postmanCodeGen(
            url,
            method,
            headers,
            body,
            languagePostman,
            variantPostman
          );
          setGeneratedSnippet(snippet);
        } catch (error) {
          console.error('Error generating code snippet:', error);
        }
      };

      fetchGeneratedCode();
    }

    setRender((prev) => !prev);
  }, [language, method, headers, baseUrl, endpoint, params, body]);

  return { generatedSnippet, warningMessages, render };
};

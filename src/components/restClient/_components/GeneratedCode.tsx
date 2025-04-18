import { FC, useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setLanguage } from '@/store/slices/bodySlice';
import RequestSection from './RequestSection';
import SelectInput from '@/UI/inputs/SelectInput';
import { generatedCode } from '@/constants/mockData';
import { useGeneratedCode } from '@/hooks/useGeneratedCode';
import CodeHighlighter from './generatedComponents/CodeHighlighter';
import { useLanguageContext } from '@/context/LanguageContext';

const GeneratedCode: FC<{ title: string }> = ({ title }) => {
  const { t } = useLanguageContext();
  const dispatch = useDispatch();
  const { baseUrl, endpoint, params } = useSelector(
    (state: RootState) => state.urlSlice
  );
  const { headers } = useSelector((state: RootState) => state.headerSlice);
  const { body, language, method } = useSelector(
    (state: RootState) => state.bodySlice
  );
  const [filterCode, setFilterCode] = useState<string[]>(generatedCode);

  const handleSelect = (e: MouseEvent<HTMLElement>) => {
    dispatch(setLanguage(e.currentTarget.id));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): string[] | undefined => {
    const codeSelect = e.target.value.toUpperCase();
    const filtered = generatedCode.filter((el) =>
      el.toUpperCase().includes(codeSelect)
    );
    setFilterCode(filtered);
    if (generatedCode.includes(codeSelect)) {
      dispatch(setLanguage(codeSelect));
    }
    return filtered;
  };

  const { generatedSnippet, warningMessages, render } = useGeneratedCode(
    language,
    method,
    headers,
    baseUrl,
    endpoint,
    params,
    body
  );

  return (
    <RequestSection key={`${render}`} title={title} buttonText={language}>
      {warningMessages && <p className="warning-messages">{warningMessages}</p>}
      <SelectInput
        data-testid="headers-key"
        value={language}
        forInput="headers-key"
        type="text"
        options={filterCode}
        customStyle="generated-code-select"
        onChange={handleChange}
        onSelect={handleSelect}
      />
      {generatedSnippet ? (
        <CodeHighlighter code={generatedSnippet} />
      ) : (
        <p>{t('restClient.generatedCodeMessageText') as string}</p>
      )}
    </RequestSection>
  );
};

export default GeneratedCode;

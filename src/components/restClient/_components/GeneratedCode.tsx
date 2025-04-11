import { FC, useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setLanguage } from '@/store/slices/restSlice';
import RequestSection from './RequestSection';
import SelectInput from '@/UI/inputs/SelectInput';
import { generatedCode } from '@/constants/mockData';
import { useGeneratedCode } from '@/hooks/useGeneratedCode';
import CodeHighlighter from './generatedComponents/CodeHighlighter';

const messageText = 'There will be a generated code here...';

const GeneratedCode: FC<{ title: string }> = ({ title }) => {
  const dispatch = useDispatch();
  const { language, method, headers, baseUrl, endpoint, params, body } =
    useSelector((state: RootState) => state.rest);
  const [filterCode, setFilterCode] = useState<string[]>(generatedCode);

  const handleSelect = (e: MouseEvent<HTMLElement>) => {
    dispatch(setLanguage(e.currentTarget.id));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const codeSelect = e.target.value.toUpperCase();
    const filtered = generatedCode.filter((el) =>
      el.toUpperCase().includes(codeSelect)
    );
    setFilterCode(filtered);
    if (generatedCode.includes(codeSelect)) {
      dispatch(setLanguage(codeSelect));
    }
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
    <RequestSection key={`${render}`} title={title}>
      <p className="warning-messages">{warningMessages}</p>
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
        <p>{messageText}</p>
      )}
    </RequestSection>
  );
};

export default GeneratedCode;

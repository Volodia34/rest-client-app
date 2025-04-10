import { FC } from 'react';
import RequestSection from './RequestSection';
import { GeneratedCodeType } from '@/types/restClient';
import SelectInput from '@/UI/inputs/SelectInput';
import { generatedCode } from '@/constants/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { MouseEvent, ChangeEvent, useState, useEffect } from 'react';
import { setLanguage } from '@/store/slices/restSlice';
import { generateCode } from '@/helpers/generateCode';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';

const GeneratedCode: FC<GeneratedCodeType> = ({ title }) => {
  const dispatch = useDispatch();
  const { language, method, headers, baseUrl, endpoint, params, body } =
    useSelector((state: RootState) => state.rest);
  const [filterCode, setFilterCode] = useState<string[]>(generatedCode);
  const [render, setRender] = useState(false);

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

  useEffect(() => {
    setRender((prev) => !prev);
  }, [language]);

  return (
    <RequestSection key={`${render}`} title={title}>
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
      {
        <SyntaxHighlighter
          language="javascript"
          style={ghcolors}
          showLineNumbers
          wrapLines
          customStyle={{
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
          }}
        >
          {generateCode(
            language,
            method,
            `${baseUrl}${endpoint}?${params}`,
            headers,
            body
          )}
        </SyntaxHighlighter>
      }
    </RequestSection>
  );
};

export default GeneratedCode;

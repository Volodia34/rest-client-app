import { FC } from 'react';
import RequestSection from './RequestSection';
import { GeneratedCodeType } from '@/types/restClient';
import SelectInput from '@/UI/inputs/SelectInput';
import { generatedCode } from '@/constants/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { MouseEvent, ChangeEvent, useState, useEffect } from 'react';
import { setGeneratedCodeType } from '@/store/slices/restSlice';

const GeneratedCode: FC<GeneratedCodeType> = ({ title, code, buttonText }) => {
  const dispatch = useDispatch();
  const { generatedCodeType } = useSelector((state: RootState) => state.rest);
  const [filterCode, setFilterCode] = useState<string[]>(generatedCode);
  const [render, setRender] = useState(false);

  const handleSelect = (e: MouseEvent<HTMLElement>) => {
    dispatch(setGeneratedCodeType(e.currentTarget.id));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const codeSelect = e.target.value.toUpperCase();
    const filtered = generatedCode.filter((el) => el.toUpperCase().includes(codeSelect));
    setFilterCode(filtered);
    if (generatedCode.includes(codeSelect)) {
      dispatch(setGeneratedCodeType(codeSelect));
    }
  };

  useEffect(() => {
    setRender(!render);
  }, [generatedCodeType]);

  return (
    <RequestSection key={`${render}`} title={title} buttonText={buttonText}>
      <SelectInput
        data-testid="headers-key"
        value={generatedCodeType}
        forInput="headers-key"
        type="text"
        options={filterCode}
        customStyle="generated-code-select"
        onChange={handleChange}
        onSelect={handleSelect}
      />
      <pre className="whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </RequestSection>
  );
};

export default GeneratedCode;

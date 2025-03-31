import { FC } from 'react';
import RequestSection from './RequestSection';
import { GeneratedCodeType } from '@/types/restClient';

const GeneratedCode: FC<GeneratedCodeType> = ({ title, code, buttonText }) => {
  return (
    <RequestSection title={title} buttonText={buttonText}>
      <pre className="whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </RequestSection>
  );
};

export default GeneratedCode;

import { FC } from 'react';
import RequestSection from './RequestSection';

interface GeneratedCodeType {
  title: string;
  code: string;
  buttonText?: string;
}

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

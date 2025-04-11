import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeHighlighterProps {
  code: string;
}

const CodeHighlighter: FC<CodeHighlighterProps> = ({ code }) => (
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
    {code}
  </SyntaxHighlighter>
);

export default CodeHighlighter;

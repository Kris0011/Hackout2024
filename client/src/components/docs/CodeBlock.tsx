import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  return (
    <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '5px' }}>
      <code>{code}</code>
    </pre>
  );
};

export default CodeBlock;

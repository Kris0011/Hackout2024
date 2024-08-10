import React from 'react';

interface DocSectionProps {
  title: string;
  children: React.ReactNode;
}

const DocSection: React.FC<DocSectionProps> = ({ title, children }) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default DocSection;

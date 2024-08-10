import React from 'react';

interface DocTitleProps {
  title: string;
}

const DocTitle: React.FC<DocTitleProps> = ({ title }) => {
  return <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{title}</h1>;
};

export default DocTitle;

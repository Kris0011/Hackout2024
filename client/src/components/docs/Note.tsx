import React from 'react';

interface NoteProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'error';
}

const Note: React.FC<NoteProps> = ({ children, type = 'info' }) => {
  const colors = {
    info: '#blue',
    warning: '#ffa500',
    error: '#ff0000',
  };

  return (
    <div style={{ background: colors[type], padding: '1rem', borderRadius: '5px', color: '#fff' }}>
      {children}
    </div>
  );
};

export default Note;

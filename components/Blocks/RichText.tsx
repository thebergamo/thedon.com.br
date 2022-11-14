import React from 'react';
import serialize from 'utils/serializeRichText';

const RichText: React.FC<{ className?: string; content: any }> = ({
  className,
  content
}) => {
  if (!content) {
    return null;
  }

  return (
    <div className={['mb-4', className].filter(Boolean).join(' ')}>
      {serialize(content)}
    </div>
  );
};

export default RichText;

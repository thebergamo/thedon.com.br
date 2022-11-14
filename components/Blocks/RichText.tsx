import React from 'react'

const RichText: React.FC<{ className?: string; content: any }> = ({
  className,
  content,
}) => {
  if (!content) {
    return null
  }

  return (
    <div className={['mb-4', className].filter(Boolean).join(' ')}>
      {content}
    </div>
  )
}

export default RichText

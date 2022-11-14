import Media from 'components/Media/Media'
import React from 'react'

export type Props = {
  blockType: 'media'
  blockName?: string
  media: MediaType
  caption?: any
  type: 'normal' | 'wide' | 'fullscreen'
}

const MediaBlock: React.FC<Props> = (props) => {
  const { media, type } = props

  if (typeof media === 'object') {
    if (type === 'fullscreen') {
      const parallaxDistance = 100

      return (
        <div className="h-screen relative overflow-hidden">
          <Media className="b-22 h-content relative" {...media} />
        </div>
      )
    }

    if (type === 'wide') {
      return (
        <div className="container">
          <Media className="w-full flex justify-center" {...media} />
        </div>
      )
    }

    return (
      <div className="container">
        <Media {...media} />
      </div>
    )
  }

  return null
}

export default MediaBlock

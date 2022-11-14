import { Download } from 'components/Icons/Download';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = MediaType & {
  className?: string;
  preferredSize?: Size;
  width: number;
  height: number;
};

const customSizes = {
  card: {
    width: 640,
    height: 480
  },
  portrait: {
    width: 768,
    height: 1024
  },
  square: {
    width: 1200,
    height: 1200
  },
  feature: {
    width: 1024,
    height: 576
  }
};

const Media: React.FC<Props> = ({
  className,
  mimeType,
  filename,
  filesize,
  alt,
  preferredSize = 'card',
  sizes,
  width,
  height
}) => {
  if (mimeType.includes('video')) {
    return (
      <div className={className}>
        <video
          autoPlay
          muted
          loop
          controls={false}
          className="w-full w-max-full"
        >
          <source
            src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/media/${filename}`}
          />
        </video>
      </div>
    );
  }

  if (mimeType.includes('image')) {
    return (
      <div className={className}>
        <Image
          src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/media/${
            sizes?.[preferredSize]?.filename || filename
          }`}
          width={width}
          height={height}
          alt={alt}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <Link
        href={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/media/${filename}`}
        download
      >
        <div className="bg-gray-500 dark:bg-gray-200 text-gray-200 dark:text-gray-600 p-4 rounded-lg flex">
          <div className="flex self-center">
            <Download />
          </div>
          <div className="ml-4">
            <p>{alt}</p>
            <p>
              <strong>{filename} </strong>({filesize} kb)
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Media;

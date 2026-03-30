'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface NewsThumbnailProps extends Omit<ImageProps, 'src'> {
  src: string;
}

export default function NewsThumbnail({ src, alt, ...props }: NewsThumbnailProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div className="absolute inset-0 bg-gray-200" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      onError={() => setHasError(true)}
    />
  );
}
'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface BackgroundImageProps extends Omit<ImageProps, 'src'> {
  src: string;
}

export default function BackgroundImage({ src, alt, ...props }: BackgroundImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      {...props}
      onError={() => setImgSrc('/images/placeholder-bg.svg')}
    />
  );
}
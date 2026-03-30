'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface PartnerLogoProps extends Omit<ImageProps, 'src'> {
  src: string;
  partnerName: string;
}

export default function PartnerLogo({ src, partnerName, alt, ...props }: PartnerLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <span className="text-sm font-semibold text-gray-500">{partnerName}</span>;
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
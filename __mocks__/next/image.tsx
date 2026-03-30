import React from 'react';

// Plain img stub for tests — avoids Next.js Image optimization in jsdom
const Image = (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean; sizes?: string }) => {
  const { fill: _fill, priority: _priority, sizes: _sizes, ...rest } = props;
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return React.createElement('img', rest);
};

export default Image;

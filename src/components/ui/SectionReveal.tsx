'use client';

import { useEffect, useRef, useState } from 'react';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export default function SectionReveal({
  children,
  className = '',
  threshold = 0.18,
  rootMargin = '0px 0px -18% 0px',
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible, threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`section-animate ${visible ? 'section-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

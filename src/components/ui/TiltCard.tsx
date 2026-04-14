'use client';

import { useRef, useState, type ReactNode, type CSSProperties, type PointerEvent } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
  });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    const rotateX = py * 7;
    const rotateY = px * 7;

    setStyle({
      transform: `perspective(900px) rotateX(${ -rotateX }deg) rotateY(${ rotateY }deg) scale3d(1.02,1.02,1.02)`,
    });
  };

  const reset = () => {
    setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)' });
  };

  return (
    <div
      ref={cardRef}
      className={`will-change-transform transition-transform duration-300 ${className}`}
      style={style}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerEnter={reset}
    >
      {children}
    </div>
  );
}

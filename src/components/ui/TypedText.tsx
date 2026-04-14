'use client';

import { useEffect, useState } from 'react';

interface TypedTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypedText({ text, speed = 55, className = '' }: TypedTextProps) {
  const [typed, setTyped] = useState('');

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!text) {
      setTyped('');
      setCompleted(false);
      return;
    }

    setCompleted(false);
    const timeoutIds: Array<number> = [];

    for (let i = 0; i <= text.length; i++) {
      const timeoutId = window.setTimeout(() => {
        setTyped(text.slice(0, i));
        if (i === text.length) {
          setCompleted(true);
        }
      }, i * speed);
      timeoutIds.push(timeoutId);
    }

    return () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [text, speed]);

  if (!text) return null;

  return <span className={`typed-text ${completed ? 'typed-completed' : ''} ${className}`}>{typed}</span>;
}

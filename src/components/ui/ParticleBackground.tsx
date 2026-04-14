'use client';

import { useEffect, useState } from 'react';

const PARTICLE_COUNT = 14;

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: string;
    top: string;
    size: number;
    opacity: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const size = 2 + Math.round(Math.random() * 4);
      return {
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size,
        opacity: 0.18 + Math.random() * 0.3,
        duration: 10 + Math.random() * 12,
        delay: Math.random() * 4,
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle-dot"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

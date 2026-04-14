'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import BackgroundImage from '@/components/ui/BackgroundImage';
import ScrollButton from '@/components/ui/ScrollButton';
import SectionReveal from '@/components/ui/SectionReveal';
import TypedText from '@/components/ui/TypedText';
import ParticleBackground from '@/components/ui/ParticleBackground';

export default function HeroSection() {
  const t = useTranslations('hero');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(Math.min(window.scrollY * 0.14, 90));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background image — priority=true for LCP */}
      <BackgroundImage
        src="/images/hero-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
        style={{ transform: `translateY(${offset}px)` }}
      />
      <ParticleBackground />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0a1628]/75" />

      <SectionReveal className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          <TypedText text={t('tagline')} />
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10">
          {t('subtitle')}
        </p>
        <ScrollButton
          targetId="about"
          label={t('cta')}
          className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-primary-light transition-colors"
        />
      </SectionReveal>
    </section>
  );
}

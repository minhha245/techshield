import { useTranslations } from 'next-intl';
import BackgroundImage from '@/components/ui/BackgroundImage';
import ScrollButton from '@/components/ui/ScrollButton';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-white">
      {/* Background image — priority=true for LCP */}
      <BackgroundImage
        src="/images/hero-bg.svg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/80" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {t('tagline')}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10">
          {t('subtitle')}
        </p>
        <ScrollButton
          targetId="about"
          label={t('cta')}
          className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-primary-light transition-colors"
        />
      </div>
    </section>
  );
}

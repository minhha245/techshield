import { useTranslations } from 'next-intl';
import SectionReveal from '@/components/ui/SectionReveal';

export default function CtaSection() {
  const t = useTranslations('cta');

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#152238] text-white">
      <SectionReveal className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('heading')}</h2>
        <p className="text-white/90 max-w-xl mx-auto mb-8">{t('description')}</p>
        <a
          href="tel:0348070196"
          aria-label="Gọi điện cho SysT"
          className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-primary-light transition-colors"
        >
          {t('button')}
        </a>
      </SectionReveal>
    </section>
  );
}

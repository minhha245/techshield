import { useTranslations } from 'next-intl';
import ScrollButton from '@/components/ui/ScrollButton';

export default function CtaSection() {
  const t = useTranslations('cta');

  return (
    <section id="contact" className="py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('heading')}</h2>
        <p className="text-white/90 max-w-xl mx-auto mb-8">{t('description')}</p>
        <ScrollButton
          targetId="contact"
          label={t('button')}
          className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-primary-light transition-colors"
        />
      </div>
    </section>
  );
}

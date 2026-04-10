import { useTranslations } from 'next-intl';

export default function NewsSection() {
  const t = useTranslations('news');

  return (
    <section id="news" className="py-16 md:py-24 bg-[#152238]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">{t('heading')}</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto">{t('subheading')}</p>
      </div>
    </section>
  );
}

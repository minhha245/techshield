import { useTranslations } from 'next-intl';
import { NEWS_ITEMS } from '@/lib/data';
import NewsThumbnail from '@/components/ui/NewsThumbnail';

export default function NewsSection() {
  const t = useTranslations('news');

  return (
    <section id="news" className="py-16 md:py-24 bg-[#152238]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">{t('heading')}</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">{t('subheading')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ITEMS.map((item) => {
            const itemKey = item.id as 'news1' | 'news2' | 'news3';
            return (
              <article
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <div className="relative h-48">
                  <NewsThumbnail
                    src={item.thumbnail}
                    alt={t(`items.${itemKey}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
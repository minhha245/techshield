import { useTranslations } from 'next-intl';
import { NEWS_ITEMS } from '@/lib/data';
import NewsThumbnail from '@/components/ui/NewsThumbnail';

export default function NewsSection() {
  const t = useTranslations('news');

  return (
    <section id="news" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">{t('heading')}</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">{t('subheading')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ITEMS.map((item) => {
            const itemKey = item.id as 'news1' | 'news2' | 'news3';
            return (
              <article
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Thumbnail — fill + sizes for responsive grid */}
                <div className="relative h-48">
                  <NewsThumbnail
                    src={item.thumbnail}
                    alt={t(`items.${itemKey}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <time className="text-xs text-gray-400 mb-2 block">{item.date}</time>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {t(`items.${itemKey}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {t(`items.${itemKey}.excerpt`)}
                  </p>
                  <span className="text-sm text-primary font-medium">
                    {t('readMore')} →
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
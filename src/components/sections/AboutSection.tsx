import { useTranslations } from 'next-intl';
import { HIGHLIGHTS } from '@/lib/data';

const ICONS: Record<string, string> = {
  Clock: '10+',
  Layers: '360',
  Headphones: '24/7',
  Award: 'ISO',
};

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-16 md:py-24 bg-[#152238]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">{t('heading')}</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">{t('intro')}</p>

        {/* 4 highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={item.id}
              className="text-center p-6 rounded-xl border border-white/10 shadow-sm hover:shadow-md transition-shadow bg-white/5"
            >
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-sm">{ICONS[item.icon]}</span>
              </div>
              <h3 className="font-semibold text-white mb-2">
                {t(`highlights.${['experience', 'solutions', 'support', 'certifications'][index]}`)}
              </h3>
              <p className="text-sm text-gray-400">
                {t(`highlights.${['experienceDesc', 'solutionsDesc', 'supportDesc', 'certificationsDesc'][index]}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

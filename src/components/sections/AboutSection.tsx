import { useTranslations } from 'next-intl';
import { HIGHLIGHTS } from '@/lib/data';
import SectionReveal from '@/components/ui/SectionReveal';
import Counter from '@/components/ui/Counter';

const NUMBERS = [
  { value: 3, suffix: '+' },
  { value: 360, suffix: '' },
  { value: 24, suffix: '/7' },
  { label: 'ISO' },
];

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-16 md:py-24 bg-[#152238]">
      <SectionReveal className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">{t('heading')}</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">{t('intro')}</p>

        {/* 4 highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={item.id}
              className="group card-gradient-hover overflow-hidden rounded-3xl"
            >
              <div className="h-full rounded-3xl bg-[#152238] p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_80px_-40px_rgba(56,189,248,0.85)]">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-bold" style={{ color: '#0052cc' }}>
                  {NUMBERS[index]?.value ? (
                    <Counter target={NUMBERS[index].value} suffix={NUMBERS[index].suffix} className="" />
                  ) : (
                    <span>{NUMBERS[index].label}</span>
                  )}
                </div>
                <h3 className="font-semibold text-white mb-2">
                  {t(`highlights.${['experience', 'solutions', 'support', 'certifications'][index]}`)}
                </h3>
                <p className="text-sm text-gray-400">
                  {t(`highlights.${['experienceDesc', 'solutionsDesc', 'supportDesc', 'certificationsDesc'][index]}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}

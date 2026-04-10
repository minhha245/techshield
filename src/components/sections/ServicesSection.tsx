import { useTranslations } from 'next-intl';
import { SERVICES } from '@/lib/data';

const ICON_SVG: Record<string, React.ReactNode> = {
  Shield: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Server: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
    </svg>
  ),
  ShoppingCart: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Cpu: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H7a2 2 0 00-2 2v2M9 3h6M9 3v2m6-2h2a2 2 0 012 2v2m0 0V7m0 0h-2M3 9v6m0 0v2a2 2 0 002 2h2m0 0h6m0 0h2a2 2 0 002-2v-2m0 0V9" />
    </svg>
  ),
};

export default function ServicesSection() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-16 md:py-24 bg-[#152238]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">{t('heading')}</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">{t('subheading')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const itemKey = service.id as 'consulting' | 'infrastructure' | 'equipment' | 'hardware_software';
            return (
              <div
                key={service.id}
                className="bg-white/5 border border-white/10 p-6 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-primary mb-4">
                  {ICON_SVG[service.icon]}
                </div>
                <h3 className="font-semibold text-white mb-2">
                  {t(`items.${itemKey}.title`)}
                </h3>
                <p className="text-sm text-gray-400">
                  {t(`items.${itemKey}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

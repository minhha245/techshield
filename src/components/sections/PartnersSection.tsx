import { useTranslations } from 'next-intl';
import { PARTNERS } from '@/lib/data';
import PartnerLogo from '@/components/ui/PartnerLogo';

export default function PartnersSection() {
  const t = useTranslations('partners');

  return (
    <section id="partners" className="py-16 md:py-24 bg-[#152238]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">{t('heading')}</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">{t('subheading')}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {PARTNERS.map((partner) => {
            const altKey = partner.id as 'microsoft' | 'cisco' | 'vmware' | 'dell' | 'hpe' | 'fortinet';
            return (
              <div key={partner.id} className="flex items-center justify-center p-4 bg-white rounded-xl h-48">
                <div className="relative w-full h-full">
                  <PartnerLogo
                    src={partner.logo}
                    alt={t(`alt.${altKey}`)}
                    fill
                    sizes="160px"
                    style={{ objectFit: 'contain' }}
                    partnerName={partner.name}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
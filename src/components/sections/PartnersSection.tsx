'use client';

import { useTranslations } from 'next-intl';
import { PARTNERS } from '@/lib/data';
import PartnerLogo from '@/components/ui/PartnerLogo';
import SectionReveal from '@/components/ui/SectionReveal';
import TiltCard from '@/components/ui/TiltCard';

export default function PartnersSection() {
  const t = useTranslations('partners');

  return (
    <section id="partners" className="py-16 md:py-24 bg-[#152238]">
      <SectionReveal className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">{t('heading')}</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">{t('subheading')}</p>

        <div className="overflow-hidden rounded-3xl bg-[#0f1b34]/80 p-4 shadow-xl shadow-black/20">
          <div className="flex min-w-full items-center gap-6 animate-marquee">
            {[...PARTNERS, ...PARTNERS].map((partner, index) => {
              const altKey = partner.id as 'microsoft' | 'cisco' | 'vmware' | 'dell' | 'hpe' | 'fortinet';
              return (
                <TiltCard
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-56 h-48 rounded-3xl p-1 transition-all duration-300"
                >
                  <div className="h-full w-full rounded-3xl bg-white p-4 flex items-center justify-center border border-transparent bg-gradient-to-br from-white/90 via-white/80 to-white/90">
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
                </TiltCard>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const NAV_LINKS = [
  { key: 'home',     href: '/' },
  { key: 'about',    href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'partners', href: '/partners' },
  { key: 'news',     href: '/news' },
  { key: 'contact',  href: '/contact' },
] as const;

const SERVICE_LINKS = [
  'consulting',
  'infrastructure',
  'equipment',
  'hardware_software',
] as const;

function LocaleLink({ href, children }: { href: string; children: React.ReactNode }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const localizedHref = href === '/'
    ? `/${locale}`
    : pathname.replace(`/${locale}`, `/${locale}${href}`);

  return (
    <a href={localizedHref} className="hover:text-white transition-colors">
      {children}
    </a>
  );
}

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="text-white font-bold text-xl block mb-3">TechShield</span>
            <p className="text-sm leading-relaxed text-gray-400">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('nav.home')}</h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <LocaleLink href={href}>
                    {t(`nav.${key}`)}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + address */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm mb-6">
              {SERVICE_LINKS.map((key) => (
                <li key={key}>
                  <span className="text-gray-400">{t(`footer.serviceLinks.${key}`)}</span>
                </li>
              ))}
            </ul>
            <address className="not-italic text-sm text-gray-400 leading-relaxed">
              {t('footer.address')}
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          {t('footer.copyright', { year })}
        </div>
      </div>
    </footer>
  );
}

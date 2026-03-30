'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Replace current locale prefix in pathname
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPath);
  };

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => switchLocale('vi')}
        className={locale === 'vi' ? 'text-primary font-bold' : 'text-gray-500 hover:text-primary'}
        aria-label="Switch to Vietnamese"
      >
        VI
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => switchLocale('en')}
        className={locale === 'en' ? 'text-primary font-bold' : 'text-gray-500 hover:text-primary'}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}

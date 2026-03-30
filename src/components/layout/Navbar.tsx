'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_LINKS = [
  { key: 'home',     href: '/' },
  { key: 'about',    href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'partners', href: '/partners' },
  { key: 'news',     href: '/news' },
  { key: 'contact',  href: '/contact' },
] as const;

function Logo() {
  return (
    <Image
      src="/images/logo.svg"
      alt="TechShield"
      width={140}
      height={36}
      priority
    />
  );
}

function LocaleLink({ href, children }: { href: string; children: React.ReactNode }) {
  const locale = useLocale();

  // Always prepend locale to href
  const localizedHref = href === '/' 
    ? `/${locale}` 
    : `/${locale}${href}`;

  return (
    <a href={localizedHref} className="text-gray-700 hover:text-primary transition-colors">
      {children}
    </a>
  );
}

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <LocaleLink href="/">
          <Logo />
        </LocaleLink>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <LocaleLink href={href}>
                {t(key)}
              </LocaleLink>
            </li>
          ))}
        </ul>

        {/* Language switcher + mobile toggle */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <LocaleLink href={href}>
                {t(key)}
              </LocaleLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

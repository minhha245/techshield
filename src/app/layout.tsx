import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ui/ScrollProgress';

// Good: import font once at root layout, use CSS variable
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SysT',
    template: '%s',
  },
  description: 'Giai phap CNTT va an toan thong tin toan dien',
  icons: {
    icon: '/images/logo.jpg',
    shortcut: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.variable}>
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

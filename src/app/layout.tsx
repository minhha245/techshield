import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Good: import font once at root layout, use CSS variable
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TechShield',
    template: '%s | TechShield',
  },
  description: 'Giai phap CNTT va an toan thong tin toan dien',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

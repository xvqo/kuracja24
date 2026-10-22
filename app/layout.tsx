import type { Metadata, Viewport } from 'next';
import { Figtree } from 'next/font/google';
import { SmoothScroll } from '@/components/SmoothScroll';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kuracja – przychodnia specjalistyczna i fizjoterapia w Radzyniu Podlaskim',
  description:
    'Lekarze dziewięciu specjalności i centrum rehabilitacji pod jednym dachem. Część wizyt i zabiegów w ramach umowy z NFZ. ul. Warszawska 17, Radzyń Podlaski.',
  metadataBase: new URL('https://kuracja24.pl'),
  openGraph: {
    locale: 'pl_PL',
    siteName: 'Kuracja24.pl',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B1630',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: rozszerzenia (np. LanguageTool) dopisują atrybuty do <html> przed hydratacją
    <html lang="pl" className={figtree.variable} suppressHydrationWarning>
      <body>
        <noscript>
          <style>{'[data-reveal] { opacity: 1 !important; }'}</style>
        </noscript>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

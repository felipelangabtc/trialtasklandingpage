import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CookieConsent } from '@/components/cookie-consent';
import { BackToTop } from '@/components/back-to-top';
import { env } from '@/lib/env';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: 'Microburbs - Street-Level Property Intelligence',
    template: '%s | Microburbs',
  },
  description:
    'See street-level risks before you buy. Hyper-local property analysis for buyers agents and investors. Pocket-level data that suburb averages miss.',
  keywords: [
    'property analysis',
    'buyers agent tools',
    'property investment',
    'street-level data',
    'pocket analysis',
    'property risk assessment',
    'Australian property',
  ],
  authors: [{ name: 'Microburbs' }],
  creator: 'Microburbs',
  publisher: 'Microburbs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: env.NEXT_PUBLIC_APP_URL,
    title: 'Microburbs - Street-Level Property Intelligence',
    description:
      'See street-level risks before you buy. Hyper-local property analysis for buyers agents and investors.',
    siteName: 'Microburbs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microburbs - Street-Level Property Intelligence',
    description:
      'See street-level risks before you buy. Hyper-local property analysis for buyers agents and investors.',
    creator: '@microburbs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CookieConsent />
          <BackToTop />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}

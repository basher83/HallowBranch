import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';

import CookieConsent from '@/components/Cookies';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PRODUCTNAME ?? 'HallowBranch',
  description: 'Private family genealogy platform for preserving your heritage.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  let theme = process.env.NEXT_PUBLIC_THEME;
  if (!theme) {
    theme = 'theme-sass3';
  }
  const gaID = process.env.NEXT_PUBLIC_GOOGLE_TAG;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={theme}>
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
          <CookieConsent />
          {gaID && <GoogleAnalytics gaId={gaID} />}
        </Providers>
      </body>
    </html>
  );
}

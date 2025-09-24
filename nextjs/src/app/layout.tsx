import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';

import CookieConsent from '@/components/Cookies';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PRODUCTNAME || 'HallowBranch',
  description: 'Private family genealogy platform for preserving your heritage.',
};

/**
 * Root application layout that wraps pages with global providers, theme, and analytics.
 *
 * Reads NEXT_PUBLIC_THEME to set the <body> class (defaults to "theme-sass3" when unset)
 * and NEXT_PUBLIC_GOOGLE_TAG to conditionally render the GoogleAnalytics component.
 * Renders Providers around the page content and includes Vercel Analytics, Speed Insights,
 * and a CookieConsent component.
 *
 * @returns The root HTML structure for the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

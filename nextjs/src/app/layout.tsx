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

/**
 * Root layout component that wraps the entire application with essential providers and analytics.
 *
 * This component serves as the foundational layout for the HallowBranch genealogy platform,
 * providing:
 * - Theme configuration from environment variables with fallback to 'theme-sass3'
 * - Analytics integration (Vercel Analytics, Speed Insights, and Google Analytics)
 * - Cookie consent management
 * - Application-wide providers (theme, authentication, etc.)
 * - Hydration warning suppression for theme consistency
 *
 * Environment Variables:
 * - NEXT_PUBLIC_THEME: Custom theme name (defaults to 'theme-sass3')
 * - NEXT_PUBLIC_GOOGLE_TAG: Google Analytics measurement ID (optional)
 * - NEXT_PUBLIC_PRODUCTNAME: Application title (defaults to 'HallowBranch')
 *
 * @param props - The component props
 * @param props.children - The child components/pages to render within the layout
 * @returns The root HTML structure with theme, analytics, and provider setup
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  // Simplified theme selection with nullish coalescing operator
  const theme = process.env.NEXT_PUBLIC_THEME ?? 'theme-sass3';
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

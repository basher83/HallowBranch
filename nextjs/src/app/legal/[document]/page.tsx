import type { ReactElement } from 'react';
import { notFound } from 'next/navigation';

import LegalDocument from '@/components/LegalDocument';

const legalDocuments = {
  privacy: {
    title: 'Privacy Notice',
    path: '/terms/privacy-notice.md',
  },
  terms: {
    title: 'Terms of Service',
    path: '/terms/terms-of-service.md',
  },
  refund: {
    title: 'Refund Policy',
    path: '/terms/refund-policy.md',
  },
} as const;

type DocumentKey = keyof typeof legalDocuments;

interface LegalPageProps {
  document: string;
}

interface LegalPageParams {
  params: Promise<LegalPageProps>;
}

/**
 * Page component that renders a legal document (privacy, terms, refund) based on route params.
 *
 * Validates the `document` route parameter against the internal `legalDocuments` map and
 * triggers a 404 (via `notFound()`) if the key is not recognized.
 *
 * Note: In Next.js 15, dynamic route params are passed as a Promise and must be awaited.
 *
 * @param params - Route params object containing:
 *   - `document`: the document key (e.g., "privacy", "terms", "refund")
 * @returns The page's JSX element rendering the requested legal document.
 */
export default async function LegalPage({ params }: LegalPageParams): Promise<ReactElement> {
  const { document } = await params;

  if (!(document in legalDocuments)) {
    notFound();
  }

  const { title, path } = legalDocuments[document as DocumentKey];

  return (
    <div className="container mx-auto px-4 py-8">
      <LegalDocument title={title} filePath={path} />
    </div>
  );
}
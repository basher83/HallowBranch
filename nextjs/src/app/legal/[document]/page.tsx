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
  document: DocumentKey;
  lng: string;
}

interface LegalPageParams {
  params: LegalPageProps;
}

/**
 * Page component that renders a legal document (privacy, terms, refund) based on route params.
 *
 * Validates the `document` route parameter against the internal `legalDocuments` map and
 * triggers a 404 (via `notFound()`) if the key is not recognized.
 *
 * @param params - Route params object containing:
 *   - `document`: the document key (e.g., "privacy", "terms", "refund")
 *   - `lng`: locale string (passed through but not used by this component)
 * @returns The page's JSX element rendering the requested legal document.
 */
export default function LegalPage({ params }: LegalPageParams) {
  const { document } = params;

  if (!legalDocuments[document]) {
    notFound();
  }

  const { title, path } = legalDocuments[document];

  return (
    <div className="container mx-auto px-4 py-8">
      <LegalDocument title={title} filePath={path} />
    </div>
  );
}
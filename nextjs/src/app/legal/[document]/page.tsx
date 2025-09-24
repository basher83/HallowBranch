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
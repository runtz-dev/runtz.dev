'use client';

import { useParams } from 'next/navigation';
import { parseLocale } from '@/lib/i18n';
import { newsletterCopy } from '@/lib/newsletter-copy';

export default function Loading() {
  const copy = newsletterCopy[parseLocale(useParams().lang)];
  return <main className="nl-container nl-loading" aria-busy="true" aria-label={copy.loading}>
    <div className="nl-skeleton nl-skeleton-title" /><div className="nl-skeleton nl-skeleton-toolbar" />
    <div className="nl-grid">{[0, 1, 2, 3].map(i => <div key={i} className="nl-skeleton nl-skeleton-card" />)}</div>
  </main>;
}

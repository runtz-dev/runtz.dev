'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { localizedPath, parseLocale } from '@/lib/i18n';
import { newsletterCopy } from '@/lib/newsletter-copy';

export default function NotFound() {
  const locale = parseLocale(useParams().lang);
  const copy = newsletterCopy[locale];
  return <main className="nl-container"><section className="nl-empty"><p className="nl-eyebrow">404</p><h1>{copy.notFound}</h1><p>{copy.notFoundBody}</p><Link href={localizedPath(locale, '/newsletter')} className="nl-button nl-button-primary">{copy.back}</Link></section></main>;
}

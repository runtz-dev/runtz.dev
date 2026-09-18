'use client';
import { useParams } from 'next/navigation';
import { parseLocale } from '@/lib/i18n';
import { newsletterCopy } from '@/lib/newsletter-copy';

export default function Error({ reset }: { reset: () => void }) {
  const copy = newsletterCopy[parseLocale(useParams().lang)];
  return <main className="nl-container"><section className="nl-empty" role="alert"><h1>{copy.unavailable}</h1><p>{copy.unavailableBody}</p><button className="nl-button nl-button-primary" onClick={reset}>{copy.retry}</button></section></main>;
}

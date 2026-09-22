import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { NewsletterPost } from '@/lib/newsletter-types';
import { articlePath } from '@/lib/newsletter';
import { newsletterCopy, topicLabels } from '@/lib/newsletter-copy';
import { NewsletterCover } from './cover';

export function dateLabel(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
}

export function NewsletterCard({ post, locale, priority = false }: { post: NewsletterPost; locale: Locale; priority?: boolean }) {
  const copy = newsletterCopy[locale];
  return <article className="nl-card">
    <Link href={articlePath(post, locale)} className="nl-card-link" aria-label={`${copy.read}: ${post.title}`}>
      <div className="nl-card-image">
        <NewsletterCover post={post} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) calc((100vw - 96px) / 2), 568px" priority={priority} lazy={!priority} />
        <span className="nl-card-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
      </div>
      <div className="nl-card-body">
        <div className="nl-card-topline"><span>{topicLabels[locale][post.tags[0]] ?? post.tags[0]}</span><span>{post.readingMinutes} min{locale !== post.locale ? ` · ${post.locale.toUpperCase()}` : ''}</span></div>
        <h2 lang={post.locale}>{post.title}</h2><p lang={post.locale}>{post.excerpt}</p>
        <div className="nl-card-bottom"><time dateTime={post.publishedAt}>{dateLabel(post.publishedAt, locale)}</time></div>
      </div>
    </Link>
  </article>;
}

import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { parseLocale, localizedPath, localeAlternates } from '@/lib/i18n';
import { getNewsletterPosts, getNewsletterTags, newsletterFeedPath, newsletterRobots } from '@/lib/newsletter';
import { newsletterCopy, topicLabels } from '@/lib/newsletter-copy';
import { NewsletterCard } from '../_components/card';
import { NewsletterSignup } from '../_components/signup';

type Props = { params: Promise<{ lang: string }>; searchParams: Promise<{ page?: string | string[]; tag?: string | string[] }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const locale = parseLocale((await params).lang);
  const { tag, page } = await searchParams;
  return {
    title: newsletterCopy[locale].title, description: newsletterCopy[locale].description,
    alternates: { ...localeAlternates(locale, '/newsletter'), types: { 'application/rss+xml': newsletterFeedPath(locale) } },
    robots: newsletterRobots.index && (tag || (page && page !== '1')) ? { index: false, follow: true } : newsletterRobots,
  };
}

export default async function NewsletterIndex({ params, searchParams }: Props) {
  const locale = parseLocale((await params).lang);
  const copy = newsletterCopy[locale];
  const topics = topicLabels[locale];
  const query = await searchParams;
  const page = Number(query.page ?? 1);
  const tag = typeof query.tag === 'string' && /^[a-z0-9-]{1,64}$/.test(query.tag) ? query.tag : '';
  const base = localizedPath(locale, '/newsletter');
  if (!Number.isInteger(page) || page < 1 || page > 100000) redirect(base);
  const href = (number: number, topic = tag) => {
    const query = new URLSearchParams();
    if (topic) query.set('tag', topic);
    if (number > 1) query.set('page', String(number));
    return `${base}${query.size ? `?${query}` : ''}`;
  };
  const [postsResult, tagsResult] = await Promise.allSettled([getNewsletterPosts(locale, page, tag), getNewsletterTags(locale)]);
  const posts = postsResult.status === 'fulfilled' ? postsResult.value : null;
  const tags = tagsResult.status === 'fulfilled' ? tagsResult.value : [];
  if (posts && page > Math.max(1, posts.totalPages)) notFound();

  return <main className="nl-container">
    <header className="nl-header">
      <h1><span>Newsletter</span></h1>
    </header>

    <div className="nl-toolbar">
      <details className="nl-filter" key={tag}>
        <summary aria-label={copy.filter}><SlidersHorizontal size={16} aria-hidden="true" /><span>{tag ? topics[tag] ?? tag : copy.all}</span><ChevronDown size={15} aria-hidden="true" /></summary>
        <nav className="nl-filter-menu" aria-label={copy.filter}>
          <Link href={href(1, '')} aria-current={!tag ? 'page' : undefined}>{copy.all}{!tag && <Check size={15} aria-hidden="true" />}</Link>
          {tags.map(topic => <Link key={topic.slug} href={href(1, topic.slug)} aria-current={tag === topic.slug ? 'page' : undefined}><span>{topics[topic.slug] ?? topic.slug}</span><span className="nl-topic-count">{topic.count}</span>{tag === topic.slug && <Check size={15} aria-hidden="true" />}</Link>)}
        </nav>
      </details>
      <NewsletterSignup locale={locale} />
    </div>

    <div className="nl-section-caption"><h2>{copy.latest}</h2><span>{posts ? String(posts.total).padStart(2, '0') : '—'} / {copy.articles}</span></div>

    {!posts ? <section className="nl-empty" role="status"><h2>{copy.unavailable}</h2><p>{copy.unavailableBody}</p><a className="nl-button nl-button-secondary" href={href(page)}>{copy.retry}<ArrowRight size={16} aria-hidden="true" /></a></section>
      : posts.items.length === 0 ? <section className="nl-empty"><h2>{copy.empty}</h2><p>{copy.emptyBody}</p><Link className="nl-button nl-button-secondary" href={base}>{copy.all}<ArrowRight size={16} aria-hidden="true" /></Link></section>
      : <div className="nl-grid">{posts.items.map((post, index) => <NewsletterCard key={post.id} post={post} locale={locale} priority={index === 0} />)}</div>}

    {posts && posts.totalPages > 1 && <nav className="nl-pagination" aria-label={copy.page}>
      {page > 1 ? <Link className="nl-page-link" href={href(page - 1)} rel="prev"><ArrowLeft size={16} aria-hidden="true" />{copy.previous}</Link> : <span className="nl-page-link" aria-disabled="true"><ArrowLeft size={16} aria-hidden="true" />{copy.previous}</span>}
      <span className="nl-page-position">{copy.page} <strong>{page}</strong> {copy.of} {posts.totalPages}</span>
      {page < posts.totalPages ? <Link className="nl-page-link" href={href(page + 1)} rel="next">{copy.next}<ArrowRight size={16} aria-hidden="true" /></Link> : <span className="nl-page-link" aria-disabled="true">{copy.next}<ArrowRight size={16} aria-hidden="true" /></span>}
    </nav>}
  </main>;
}

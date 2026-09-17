import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react';
import { localizedPath, parseLocale, localeDetails } from '@/lib/i18n';
import { siteUrl } from '@/lib/shared';
import { articlePath, articleURL, coverURL, getNewsletterArticle, getNewsletterPosts, newsletterRobots } from '@/lib/newsletter';
import { newsletterCopy, topicLabels } from '@/lib/newsletter-copy';
import { dateLabel, NewsletterCard } from '../_components/card';
import { ArticleBody } from '../_components/article-body';
import { NewsletterSignup } from '../_components/signup';

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getNewsletterArticle(slug, parseLocale(lang));
  if (!post) return { title: 'Article not found', robots: { index: false } };
  const url = articleURL(post);
  const images = [{ url: siteUrl(`/newsletter/media/${post.cover}`), width: 1600, height: 900, alt: post.coverAlt }];
  return {
    title: post.title, description: post.excerpt, robots: newsletterRobots,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, url, images, publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: [post.author], locale: localeDetails[post.locale].ogLocale },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images },
  };
}

export default async function NewsletterArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = parseLocale(lang);
  const post = await getNewsletterArticle(slug, locale);
  if (!post) notFound();
  if (locale !== post.locale) permanentRedirect(articlePath(post));
  const copy = newsletterCopy[locale];
  const relatedResult = await getNewsletterPosts(1, '', 100).catch(() => null);
  const related = (relatedResult?.items ?? []).filter(item => item.id !== post.id).sort((a, b) => Number(b.tags.some(tag => post.tags.includes(tag))) - Number(a.tags.some(tag => post.tags.includes(tag)))).slice(0, 2);
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt,
    image: siteUrl(`/newsletter/media/${post.cover}`), datePublished: post.publishedAt, dateModified: post.updatedAt,
    inLanguage: post.locale, author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'Runtz', url: siteUrl('') }, mainEntityOfPage: articleURL(post),
  };

  return <main className="nl-container nl-article-page" lang={post.locale}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <nav aria-label="Breadcrumb" className="nl-breadcrumb"><Link href={localizedPath(locale, '/newsletter')}><ArrowLeft size={15} aria-hidden="true" />{copy.back}</Link></nav>
    <article>
      <header className="nl-article-header">
        <div className="nl-article-tags">{post.tags.map(tag => <Link key={tag} href={`${localizedPath(locale, '/newsletter')}?tag=${tag}`}>{topicLabels[tag] ?? tag}<ArrowUpRight size={12} aria-hidden="true" /></Link>)}</div>
        <h1>{post.title}</h1><p className="nl-article-excerpt">{post.excerpt}</p>
        <div className="nl-author-line"><span className="nl-author-mark" aria-hidden="true">r.</span><span><strong>{post.author}</strong><time dateTime={post.publishedAt}>{dateLabel(post.publishedAt, locale)}</time></span><span className="nl-reading"><Clock3 size={14} aria-hidden="true" />{post.readingMinutes} min</span></div>
      </header>
      <div className="nl-article-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverURL(post.cover)} srcSet={`${coverURL(post.cover.replace('.webp', '-640.webp'))} 640w, ${coverURL(post.cover)} 1600w`} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) calc(100vw - 96px), 1136px" alt={post.coverAlt} width={1600} height={900} fetchPriority="high" />
      </div>
      <div className="nl-reading-layout">
        {post.headings.length >= 3 && <aside className="nl-toc"><nav aria-label={copy.toc}><p>{copy.toc}</p>{post.headings.map(heading => <a className={heading.level === 3 ? 'nl-toc-sub' : undefined} key={heading.id} href={`#${heading.id}`}>{heading.text}</a>)}</nav></aside>}
        <div className="nl-reading-content"><ArticleBody html={post.html} locale={locale} />{post.updatedAt !== post.publishedAt && <p className="nl-updated">{copy.updated} {dateLabel(post.updatedAt, locale)}</p>}</div>
      </div>
    </article>
    <NewsletterSignup locale={locale} panel />
    {related.length > 0 && <section className="nl-related"><div className="nl-section-caption"><h2>{copy.related}</h2><Link href={localizedPath(locale, '/newsletter')}>{copy.all}<ArrowRightIcon /></Link></div><div className="nl-grid">{related.map(item => <NewsletterCard key={item.id} post={item} locale={locale} />)}</div></section>}
  </main>;
}

function ArrowRightIcon() { return <ArrowUpRight size={14} aria-hidden="true" />; }

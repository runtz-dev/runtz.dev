import 'server-only';
import { cache } from 'react';
import { localeDetails, localizedPath, type Locale } from './i18n';
import { sitePath, siteUrl } from './shared';
import type { NewsletterArticle, NewsletterPage, NewsletterPost, NewsletterTag } from './newsletter-types';

export class NewsletterUnavailable extends Error {
  constructor() { super('Newsletter is temporarily unavailable'); }
}

export const newsletterRobots = process.env.NEWSLETTER_ENVIRONMENT === 'dev'
  ? { index: false, follow: false }
  : { index: true, follow: true };

// Only this server module knows the service address or its optional credential.
export async function newsletterFetch(path: string, init: RequestInit = {}) {
  const origin = process.env.NEWSLETTER_INTERNAL_URL || 'http://127.0.0.1:8080';
  const headers = new Headers(init.headers);
  if (process.env.NEWSLETTER_SERVICE_TOKEN) {
    headers.set('Authorization', `Bearer ${process.env.NEWSLETTER_SERVICE_TOKEN}`);
  }
  try {
    return await fetch(`${origin.replace(/\/$/, '')}${path}`, {
      ...init,
      headers,
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(6000),
    });
  } catch { throw new NewsletterUnavailable(); }
}

async function json<T>(path: string): Promise<T> {
  const response = await newsletterFetch(path);
  if (!response.ok) throw new NewsletterUnavailable();
  return response.json() as Promise<T>;
}

export const getNewsletterPosts = cache((locale: Locale, page = 1, tag = '', pageSize = 4) => {
  const query = new URLSearchParams({ page: String(page), pageSize: String(pageSize), locale });
  if (tag) query.set('tag', tag);
  return json<NewsletterPage>(`/v1/posts?${query}`);
});

export const getNewsletterTags = cache(async (locale: Locale) =>
  (await json<{ items: NewsletterTag[] }>(`/v1/tags?locale=${locale}`)).items,
);

export const getNewsletterArticle = cache(async (slug: string, locale: Locale): Promise<NewsletterArticle | null> => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const path = `/v1/posts/${encodeURIComponent(slug)}`;
  const response = await newsletterFetch(`${path}?locale=${locale}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new NewsletterUnavailable();
  return response.json() as Promise<NewsletterArticle>;
});

export function articlePath(post: Pick<NewsletterPost, 'locale' | 'slug'>, locale: Locale = post.locale) {
  return localizedPath(locale, `/newsletter/${post.slug}`);
}

export function coverURL(filename: string) {
  return sitePath(`/newsletter/media/${encodeURIComponent(filename)}`);
}

export function articleURL(post: Pick<NewsletterPost, 'locale' | 'slug'>) {
  return siteUrl(articlePath(post));
}

export function newsletterFeedPath(locale: Locale) {
  return sitePath(`/newsletter/feed.xml${locale === 'en' ? '' : `?locale=${locale}`}`);
}

export function articleAlternates(post: NewsletterArticle) {
  const languages: Record<string, string> = {};
  // Only advertise translations that are published and visible now.
  const available = post.availableLocales ?? [post.locale];
  for (const locale of available) {
    languages[localeDetails[locale].htmlLang] = siteUrl(articlePath(post, locale));
  }
  if (available.includes('en')) languages['x-default'] = siteUrl(articlePath(post, 'en'));
  return { canonical: articleURL(post), languages };
}

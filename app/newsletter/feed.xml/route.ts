import { articleURL, getNewsletterPosts, newsletterFeedPath } from '@/lib/newsletter';
import { isLocale, localeDetails, localizedPath } from '@/lib/i18n';
import { newsletterCopy } from '@/lib/newsletter-copy';
import { siteUrl } from '@/lib/shared';

export const dynamic = 'force-dynamic';
const escape = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get('locale') || 'en';
  if (!isLocale(locale)) return new Response('Unsupported locale', { status: 400 });
  try {
    const posts = await getNewsletterPosts(locale, 1, '', 50);
    const feedURL = new URL(newsletterFeedPath(locale), siteUrl('')).toString();
    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Runtz Newsletter</title><link>${escape(siteUrl(localizedPath(locale, '/newsletter')))}</link><description>${escape(newsletterCopy[locale].description)}</description><language>${localeDetails[locale].htmlLang}</language><atom:link href="${escape(feedURL)}" rel="self" type="application/rss+xml"/>${posts.items.map(post => `<item><title>${escape(post.title)}</title><link>${escape(articleURL(post))}</link><guid isPermaLink="true">${escape(articleURL(post))}</guid><description>${escape(post.excerpt)}</description><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>${post.tags.map(tag => `<category>${escape(tag)}</category>`).join('')}</item>`).join('')}</channel></rss>`;
    return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'no-cache', 'X-Robots-Tag': 'noindex' } });
  } catch { return new Response('Newsletter temporarily unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}

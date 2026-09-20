import { articleURL, getNewsletterPosts } from '@/lib/newsletter';
import { localeDetails, locales, localizedPath } from '@/lib/i18n';
import type { NewsletterPost } from '@/lib/newsletter-types';
import { siteUrl } from '@/lib/shared';

export const dynamic = 'force-dynamic';
const escape = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);

export async function GET() {
  try {
    const editions = await Promise.all(locales.map(async locale => {
      const first = await getNewsletterPosts(locale, 1, '', 100);
      const posts = [...first.items];
      // Fail visibly instead of silently truncating a growing publication.
      if (first.totalPages > 500) throw new Error('Sitemap index required');
      for (let page = 2; page <= first.totalPages; page++) posts.push(...(await getNewsletterPosts(locale, page, '', 100)).items);
      return posts;
    }));
    const posts = editions.flat();
    if (posts.length + locales.length > 50000) throw new Error('Sitemap index required');
    const translations = new Map<string, NewsletterPost[]>();
    for (const post of posts) translations.set(post.id, [...(translations.get(post.id) ?? []), post]);
    const alternate = (language: string, url: string) => `<xhtml:link rel="alternate" hreflang="${language}" href="${escape(url)}"/>`;
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${locales.map(locale => `<url><loc>${escape(siteUrl(localizedPath(locale, '/newsletter')))}</loc></url>`).join('')}${posts.map(post => {
      const variants = translations.get(post.id)!;
      const english = variants.find(variant => variant.locale === 'en');
      const links = variants.map(variant => alternate(localeDetails[variant.locale].htmlLang, articleURL(variant))).join('');
      return `<url><loc>${escape(articleURL(post))}</loc><lastmod>${post.updatedAt}</lastmod>${links}${english ? alternate('x-default', articleURL(english)) : ''}</url>`;
    }).join('')}</urlset>`;
    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'no-cache', 'X-Robots-Tag': 'noindex' } });
  } catch { return new Response('Newsletter temporarily unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}

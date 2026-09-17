import { articleURL, getNewsletterPosts } from '@/lib/newsletter';
import { siteUrl } from '@/lib/shared';

export const dynamic = 'force-dynamic';
const escape = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);

export async function GET() {
  try {
    const posts = await getNewsletterPosts(1, '', 50);
    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Runtz Newsletter</title><link>${escape(siteUrl('/newsletter'))}</link><description>Engineering, security and infrastructure in practice.</description><language>en</language><atom:link href="${escape(siteUrl('/newsletter/feed.xml'))}" rel="self" type="application/rss+xml"/>${posts.items.map(post => `<item><title>${escape(post.title)}</title><link>${escape(articleURL(post))}</link><guid isPermaLink="true">${escape(articleURL(post))}</guid><description>${escape(post.excerpt)}</description><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>${post.tags.map(tag => `<category>${escape(tag)}</category>`).join('')}</item>`).join('')}</channel></rss>`;
    return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'no-cache', 'X-Robots-Tag': 'noindex' } });
  } catch { return new Response('Newsletter temporarily unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}

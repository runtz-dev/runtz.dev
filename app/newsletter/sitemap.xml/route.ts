import { articleURL, getNewsletterPosts } from '@/lib/newsletter';
import { siteUrl } from '@/lib/shared';

export const dynamic = 'force-dynamic';
const escape = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);

export async function GET() {
  try {
    const first = await getNewsletterPosts(1, '', 100);
    const posts = [...first.items];
    // Fail visibly instead of silently truncating a growing publication.
    if (first.totalPages > 500) throw new Error('Sitemap index required');
    for (let page = 2; page <= first.totalPages; page++) posts.push(...(await getNewsletterPosts(page, '', 100)).items);
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(siteUrl('/newsletter'))}</loc></url>${posts.map(post => `<url><loc>${escape(articleURL(post))}</loc><lastmod>${post.updatedAt}</lastmod></url>`).join('')}</urlset>`;
    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'no-cache', 'X-Robots-Tag': 'noindex' } });
  } catch { return new Response('Newsletter temporarily unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}

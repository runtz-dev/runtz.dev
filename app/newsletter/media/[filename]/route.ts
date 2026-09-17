import { newsletterFetch } from '@/lib/newsletter';

export const runtime = 'nodejs';

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!/^[a-z0-9][a-z0-9-]*\.(webp|png|jpg)$/.test(filename)) return new Response(null, { status: 404 });
  const headers = new Headers();
  const etag = request.headers.get('if-none-match');
  if (etag) headers.set('If-None-Match', etag);
  try {
    const upstream = await newsletterFetch(`/v1/media/${encodeURIComponent(filename)}`, { headers });
    if (upstream.status === 404) return new Response(null, { status: 404 });
    if (!upstream.ok && upstream.status !== 304) return new Response(null, { status: 503 });
    const output = new Headers({ 'X-Content-Type-Options': 'nosniff' });
    for (const header of ['content-type', 'etag', 'cache-control', 'content-length']) {
      const value = upstream.headers.get(header); if (value) output.set(header, value);
    }
    return new Response(upstream.status === 304 ? null : upstream.body, { status: upstream.status, headers: output });
  } catch { return new Response(null, { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}

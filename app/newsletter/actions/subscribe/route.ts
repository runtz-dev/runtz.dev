import { newsletterFetch } from '@/lib/newsletter';
import { siteUrl } from '@/lib/shared';

export const runtime = 'nodejs';

function result(status: number, error?: string) {
  return Response.json(error ? { error } : { status: 'registered' }, { status, headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '3600' } : {}) } });
}

export async function POST(request: Request) {
  const allowedOrigin = new URL(process.env.NEWSLETTER_PUBLIC_ORIGIN || siteUrl('')).origin;
  if (request.headers.get('origin') !== allowedOrigin) return result(403, 'invalid_origin');
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return result(415, 'json_required');
  if (Number(request.headers.get('content-length')) > 2048) return result(413, 'body_too_large');
  const reader = request.body?.getReader();
  if (!reader) return result(400, 'invalid_body');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2048) { await reader.cancel(); return result(413, 'body_too_large'); }
      chunks.push(value);
    }
    const body = Buffer.concat(chunks);
    const response = await newsletterFetch('/v1/subscriptions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    if (response.status === 202) return result(202);
    if ([400, 413, 415, 422, 429].includes(response.status)) return result(response.status, response.status === 429 ? 'too_many_requests' : 'invalid_subscription');
    return result(503, 'subscriptions_unavailable');
  } catch { return result(503, 'subscriptions_unavailable'); }
  finally { reader.releaseLock(); }
}

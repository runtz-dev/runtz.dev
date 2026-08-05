import { source } from '@/lib/source';
import { siteUrl } from '@/lib/shared';
import { llms } from 'fumadocs-core/source';

export const revalidate = false;

// fumadocs emits page-tree links as bare routes ("/docs/scans/host"). This file
// is fetched from the domain root (see proxy.ts), and llms.txt consumers are
// crawlers with no page context, so every link has to be a fully qualified URL
// pointing at the real, basePath-prefixed location.
function absoluteLinks(markdown: string) {
  return markdown.replace(/\]\((\/[^)]*)\)/g, (_match, route: string) => `](${siteUrl(route)})`);
}

export function GET() {
  return new Response(absoluteLinks(llms(source).index()), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

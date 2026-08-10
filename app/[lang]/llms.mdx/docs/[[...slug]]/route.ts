import { getLLMText, getPageMarkdownUrl, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { locales, parseLocale } from '@/lib/i18n';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/[lang]/llms.mdx/docs/[[...slug]]'>,
) {
  const { lang, slug } = await params;
  const locale = parseLocale(lang);
  const page = source.getPage(slug?.slice(0, -1), locale);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    source.getPages(locale).map((page) => ({
      lang: locale,
      slug: getPageMarkdownUrl(page, locale).segments,
    })),
  );
}

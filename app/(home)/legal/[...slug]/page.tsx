import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { AccentPill, MarketingPage } from '../../_components/marketing';
import { getMDXComponents } from '@/components/mdx';
import { legalSource } from '@/lib/legal';

export default async function Page(props: PageProps<'/legal/[...slug]'>) {
  const params = await props.params;
  const page = legalSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <MarketingPage>
      <main className="mx-auto w-full max-w-[860px] px-6 pb-24 pt-16 md:px-12">
        <Link
          href="/legal"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#53657d] transition hover:text-[#2f7eff] dark:text-[#7f96b3] dark:hover:text-[#6db5ff]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Legal documents
        </Link>
        <div className="mt-4">
          <AccentPill muted>legal</AccentPill>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          {page.data.title}
        </h1>
        <DocsBody className="mt-8">
          <MDX components={getMDXComponents()} />
        </DocsBody>
      </main>
    </MarketingPage>
  );
}

export function generateStaticParams() {
  return legalSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/legal/[...slug]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = legalSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

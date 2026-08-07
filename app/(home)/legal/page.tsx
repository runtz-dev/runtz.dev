import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ScrollText } from 'lucide-react';
import { MarketingPage, PageIntro } from '../_components/marketing';
import { legalSource } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Legal',
  description: 'Legal documents for the Runtz platform and services.',
};

export default function LegalPage() {
  const pages = legalSource.getPages();

  return (
    <MarketingPage>
      <main className="mx-auto w-full max-w-[860px] px-6 pb-24 pt-16 md:px-12 lg:pt-24">
        <PageIntro
          eyebrow="legal"
          title="Legal documents"
          body="The documents that govern the use of the Runtz platform and how we handle data."
        />

        <div className="mt-10 flex flex-col gap-4">
          {pages.map((page) => (
            <Link
              key={page.url}
              href={page.url}
              className="group flex items-start justify-between gap-4 rounded-[20px] border border-[#071222]/10 bg-[#f7fbff]/70 px-5 py-5 transition hover:-translate-y-0.5 hover:border-[#2f7eff]/40 dark:border-[#213047] dark:bg-[#0d1420] dark:hover:border-[#6db5ff]/50"
            >
              <div className="flex items-start gap-3">
                <ScrollText className="mt-0.5 h-5 w-5 text-[#2f7eff] dark:text-[#6db5ff]" />
                <div>
                  <p className="text-sm font-semibold">{page.data.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#53657d] dark:text-[#7f96b3]">
                    {page.data.description}
                  </p>
                </div>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#53657d] transition group-hover:translate-x-0.5 group-hover:text-[#2f7eff] dark:text-[#7f96b3] dark:group-hover:text-[#6db5ff]" />
            </Link>
          ))}
        </div>

        <p className="mt-10 text-xs leading-5 text-[#53657d] dark:text-[#7f96b3]">
          Questions? Contact{' '}
          <a href="mailto:legal@runtz.dev" className="underline underline-offset-2">
            legal@runtz.dev
          </a>
          .
        </p>
      </main>
    </MarketingPage>
  );
}

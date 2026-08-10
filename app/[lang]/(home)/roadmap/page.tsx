import type { Metadata } from 'next';
import { MarketingPage, PageIntro } from '../_components/marketing';
import { RoadmapTimeline } from './roadmap-timeline';
import { localeAlternates, parseLocale } from '@/lib/i18n';
import { roadmapCopy } from '@/lib/roadmap-copy';

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/roadmap'>): Promise<Metadata> {
  const { lang } = await params;
  const locale = parseLocale(lang);
  return {
    ...roadmapCopy[locale].metadata,
    alternates: localeAlternates(locale, '/roadmap'),
  };
}

export default async function RoadmapPage({
  params,
}: PageProps<'/[lang]/roadmap'>) {
  const { lang } = await params;
  const copy = roadmapCopy[parseLocale(lang)];

  return (
    <MarketingPage>
      <main className="rz-roadmap mx-auto w-full max-w-5xl px-6 pb-20 pt-16 md:px-10 md:pb-24 lg:pt-24">
        <PageIntro
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
        />

        <div className="mt-8 md:mt-10">
          <RoadmapTimeline copy={copy} />
        </div>
      </main>
    </MarketingPage>
  );
}

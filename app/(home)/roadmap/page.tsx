import type { Metadata } from 'next';
import { MarketingPage } from '../_components/marketing';
import { RoadmapTimeline } from './roadmap-timeline';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'The product roadmap toward runtz 1.0.0 and beyond.',
};

export default function RoadmapPage() {
  return (
    <MarketingPage>
      <main className="rz-roadmap mx-auto w-full max-w-5xl px-6 pb-20 pt-8 md:px-10 md:pb-24 md:pt-12">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#2f7eff] dark:text-[#6db5ff]">
            Building in public
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">Roadmap</h1>
          <p className="mt-4 text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4] md:text-base">
            The path from our first release candidate to Runtz 1.0.0 and what comes next.
          </p>
        </header>

        <div className="mt-8 md:mt-10">
          <RoadmapTimeline />
        </div>
      </main>
    </MarketingPage>
  );
}

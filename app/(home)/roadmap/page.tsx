import type { Metadata } from 'next';
import { MarketingPage } from '../_components/marketing';
import { RoadmapTimeline } from './roadmap-timeline';

export const metadata: Metadata = {
  title: 'Our Roadmap',
  description:
    'Start using runtz today to strengthen your security workflow and stay ahead as every new capability ships.',
};

export default function RoadmapPage() {
  return (
    <MarketingPage>
      <main className="rz-roadmap mx-auto w-full max-w-5xl px-6 pb-20 pt-8 md:px-10 md:pb-24 md:pt-12">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">Our Roadmap</h1>
          <p className="mt-4 text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4] md:text-base">
            Start using runtz today to strengthen your security workflow—and stay ahead as every
            new capability ships.
          </p>
        </header>

        <div className="mt-8 md:mt-10">
          <RoadmapTimeline />
        </div>
      </main>
    </MarketingPage>
  );
}

import type { Metadata } from 'next';
import { MarketingPage, PageIntro } from '../_components/marketing';
import { RoadmapTimeline } from './roadmap-timeline';

export const metadata: Metadata = {
  title: 'Our Roadmap',
  description:
    'Start using runtz today to strengthen your security workflow and stay ahead as every new capability ships.',
};

export default function RoadmapPage() {
  return (
    <MarketingPage>
      <main className="rz-roadmap mx-auto w-full max-w-5xl px-6 pb-20 pt-16 md:px-10 md:pb-24 lg:pt-24">
        <PageIntro
          eyebrow="1.0.0 - JAN 2027"
          title="Our Roadmap"
          body="Start using runtz today to strengthen your security workflow—and stay ahead as every new capability ships."
        />

        <div className="mt-8 md:mt-10">
          <RoadmapTimeline />
        </div>
      </main>
    </MarketingPage>
  );
}

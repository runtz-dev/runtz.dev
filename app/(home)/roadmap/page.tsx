import type { Metadata } from 'next';
import { MarketingPage } from '../_components/marketing';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'The product roadmap toward runtz 1.0.0 and beyond.',
};

const milestones = [
  {
    date: null,
    title: 'Release candidate',
    body: "We're developing runtz toward 1.0.0.",
    active: true,
  },
  {
    date: 'Jan 2027',
    title: '1.0.0',
    body: null,
    active: false,
  },
] as const;

export default function RoadmapPage() {
  return (
    <MarketingPage>
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col justify-center px-6 py-16 md:px-10 md:py-24">
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">Roadmap</h1>

        <ol className="mt-12 md:mt-16">
          {milestones.map((milestone, index) => {
            const isLast = index === milestones.length - 1;

            return (
              <li key={milestone.title} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="relative mt-1.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                    {milestone.active && (
                      <span className="absolute h-full w-full animate-ping rounded-full bg-[#2f7eff]/40 dark:bg-[#6db5ff]/40" />
                    )}
                    <span
                      className={`relative h-3.5 w-3.5 rounded-full border-2 ${
                        milestone.active
                          ? 'border-[#2f7eff] bg-[#2f7eff] dark:border-[#6db5ff] dark:bg-[#6db5ff]'
                          : 'border-[#071222]/25 bg-transparent dark:border-[#3a4b64]'
                      }`}
                    />
                  </span>
                  {!isLast && (
                    <span className="mt-1 w-px flex-1 bg-[#071222]/10 dark:bg-[#213047]" />
                  )}
                </div>

                <div className={isLast ? 'pb-1' : 'pb-12'}>
                  {milestone.date && (
                    <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
                      {milestone.date}
                    </p>
                  )}
                  <h2 className={`text-2xl font-semibold ${milestone.date ? 'mt-1' : ''}`}>
                    {milestone.title}
                  </h2>
                  {milestone.body && (
                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4]">
                      {milestone.body}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </main>
    </MarketingPage>
  );
}

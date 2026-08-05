import type { Metadata } from 'next';
import { CalendarDays, CheckCircle2, Radar } from 'lucide-react';
import { AccentPill, MarketingPage } from '../_components/marketing';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'The product roadmap toward runtz 1.0.0 and beyond.',
};

const releaseScans = [
  ['SCA', 'Dependencies'],
  ['SAST', 'Source code'],
  ['Container scanning', 'Container images'],
  ['Host scanning', 'Host packages'],
  ['Kubernetes scanning', 'Cluster posture'],
];

export default function RoadmapPage() {
  return (
    <MarketingPage>
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[1080px] flex-col justify-center px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-2xl">
          <AccentPill muted>product roadmap</AccentPill>
          <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
            The path to runtz 1.0.0.
          </h1>
          <p className="mt-4 text-base leading-7 text-[#53657d] dark:text-[#b8cbe4]">
            runtz 1.0.0 is planned for January 2027.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[28px] border border-[#071222]/10 bg-[#f7fbff]/70 p-6 rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420] md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2f7eff]/20 bg-[#2f7eff]/10 text-[#2f7eff] dark:border-[#6db5ff]/20 dark:bg-[#6db5ff]/10 dark:text-[#6db5ff]">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
                  by 1.0.0
                </p>
                <h2 className="mt-1 text-2xl font-semibold">Five scan families</h2>
                <p className="mt-2 text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4]">
                  Complete and refine the five scans already available in the platform.
                </p>
              </div>
            </div>

            <ul className="mt-7 divide-y divide-[#071222]/10 border-y border-[#071222]/10 dark:divide-[#213047] dark:border-[#213047]">
              {releaseScans.map(([name, scope]) => (
                <li key={name} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="flex items-center gap-3 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-[#2f7eff] dark:text-[#6db5ff]" />
                    {name}
                  </span>
                  <span className="text-right text-xs text-[#53657d] dark:text-[#7f96b3]">
                    {scope}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col rounded-[28px] border border-[#213047] bg-[#0d1420] p-6 text-[#eaf4ff] rz-soft-shadow md:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#6db5ff]/20 bg-[#6db5ff]/10 text-[#6db5ff]">
              <Radar className="h-5 w-5" />
            </div>
            <p className="mt-8 font-mono text-xs font-semibold uppercase text-[#6db5ff]">
              after 1.0.0
            </p>
            <h2 className="mt-2 text-3xl font-semibold">DAST</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#b8cbe4]">
              Runtime application scanning is planned for the next phase after the
              1.0.0 release.
            </p>
            <p className="mt-auto pt-10 font-mono text-xs uppercase text-[#7f96b3]">
              Planned
            </p>
          </section>
        </div>
      </main>
    </MarketingPage>
  );
}

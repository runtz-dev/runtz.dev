import type { Metadata } from 'next';
import {
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import {
  MarketingPage,
  PageIntro,
  PrimaryLink,
  SecondaryLink,
} from '../_components/marketing';
import { AssistantShowcase } from '../_components/assistant-showcase';
import { docsRoute, platformUrl } from '@/lib/shared';
import { aiCopy } from '@/lib/ai-copy';
import { localeAlternates, localizedPath, parseLocale } from '@/lib/i18n';

const githubSkillsUrl = 'https://github.com/runtz-dev/runtz-skills';

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/ai'>): Promise<Metadata> {
  const { lang } = await params;
  const locale = parseLocale(lang);
  return {
    ...aiCopy[locale].metadata,
    alternates: localeAlternates(locale, '/ai'),
  };
}

export default async function AIPage({ params }: PageProps<'/[lang]/ai'>) {
  const { lang } = await params;
  const locale = parseLocale(lang);
  const copy = aiCopy[locale];

  return (
    <MarketingPage>
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <PageIntro
          eyebrow={copy.intro.eyebrow}
          title={copy.intro.title}
          body={copy.intro.body}
        />
      </section>

      <section className="mx-auto grid w-full max-w-[1400px] gap-12 px-6 pb-16 pt-8 md:px-12 md:pb-20 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
            {copy.mcp.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            {copy.mcp.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[#53657d] dark:text-[#cfe0f5]">
            {copy.mcp.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href={localizedPath(locale, docsRoute + '/mcp')}>
              {copy.mcp.setup}
            </PrimaryLink>
            <SecondaryLink accent href={platformUrl}>{copy.mcp.token}</SecondaryLink>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="mb-3 flex items-center justify-between gap-4 px-1">
            <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
              {copy.mcp.configLabel}
            </p>
            <div className="hidden items-center gap-2 text-xs text-[#53657d] dark:text-[#7f96b3] sm:flex">
              <span>{copy.mcp.yourAi}</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-semibold text-[#071222] dark:text-[#eaf4ff]">runtz MCP</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>{copy.mcp.scans}</span>
            </div>
          </div>
          <AssistantShowcase variant="config" copy={copy.showcase} />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1400px] gap-12 px-6 pb-20 pt-10 md:px-12 md:pb-24 md:pt-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-16">
        <div className="max-w-xl lg:order-2">
          <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
            {copy.skills.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            {copy.skills.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[#53657d] dark:text-[#cfe0f5]">
            {copy.skills.body}
          </p>
          <a
            href={githubSkillsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6db5ff] px-6 text-sm font-bold text-[#071222] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#9fd6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6db5ff]"
          >
            {copy.skills.github}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="min-w-0 lg:order-1">
          <div className="mb-3 flex items-center justify-between gap-4 px-1">
            <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
              {copy.skills.showcaseLabel}
            </p>
            <span className="hidden text-xs text-[#53657d] dark:text-[#7f96b3] sm:block">
              Claude · Codex · Gemini
            </span>
          </div>
          <AssistantShowcase variant="skills" copy={copy.showcase} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-12 md:pb-20">
        <div className="rounded-[28px] border border-[#071222]/10 bg-[#f7fbff]/70 p-8 rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420] md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                {copy.final.title}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#53657d] dark:text-[#b8cbe4]">
                {copy.final.body}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <PrimaryLink href={localizedPath(locale, docsRoute + '/mcp')}>
                {copy.final.setup}
              </PrimaryLink>
              <SecondaryLink accent href={platformUrl}>
                {copy.final.token}
              </SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}

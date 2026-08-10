import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle2, GitBranch } from 'lucide-react';
import {
  AccentPill,
  FeatureCard,
  MarketingPage,
  PrimaryLink,
  SecondaryLink,
  TerminalPanel,
} from '../../_components/marketing';
import {
  getPlatformPage,
  getStackParts,
  platformPages,
  platformUiCopy,
} from '@/lib/platform-content';
import { platformUrl } from '@/lib/shared';
import { localeAlternates, localizedPath, parseLocale } from '@/lib/i18n';

export function generateStaticParams() {
  return platformPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata(
  props: PageProps<'/[lang]/platform/[slug]'>,
): Promise<Metadata> {
  const params = await props.params;
  const locale = parseLocale(params.lang);
  const page = getPlatformPage(locale, params.slug);
  if (!page) notFound();
  const copy = platformUiCopy[locale];

  return {
    title: `${page.label} - ${copy.metadataSuffix}`,
    description: page.summary,
    alternates: localeAlternates(locale, `/platform/${params.slug}`),
  };
}

export default async function PlatformPage(props: PageProps<'/[lang]/platform/[slug]'>) {
  const params = await props.params;
  const locale = parseLocale(params.lang);
  const page = getPlatformPage(locale, params.slug);
  if (!page) notFound();

  const Icon = page.icon;
  const copy = platformUiCopy[locale];
  const localizedStackParts = getStackParts(locale);

  return (
    <MarketingPage>
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <AccentPill>{page.eyebrow}</AccentPill>
            <h1 className="mt-6 text-5xl font-bold leading-[1.02] md:text-7xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#53657d] dark:text-[#b8cbe4]">
              {page.summary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href={platformUrl}>{copy.start}</PrimaryLink>
              <SecondaryLink href={localizedPath(locale, '/pricing')}>
                {copy.viewPricing}
              </SecondaryLink>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-[#213047] bg-[#0d1420] p-5 text-[#eaf4ff] rz-soft-shadow">
            <div className="rz-noise-panel absolute inset-0 opacity-70" />
            <div className="relative rounded-3xl border border-[#223149] bg-[#0d1420]/90 p-6 backdrop-blur md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6db5ff] text-[#15140d]">
                  <Icon className="h-8 w-8" />
                </div>
                <AccentPill muted>{page.status}</AccentPill>
              </div>
              <h2 className="mt-8 text-3xl font-bold">{page.label}</h2>
              <div className="mt-6 grid gap-3">
                {page.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 rounded-2xl border border-[#223149] bg-[#090f18] p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#6db5ff]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {page.details.map((detail) => (
            <FeatureCard
              key={detail.title}
              icon={Icon}
              title={detail.title}
              body={detail.body}
            />
          ))}
        </div>
      </section>

      <section className="px-6 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <AccentPill>{copy.workflowEyebrow}</AccentPill>
            <h2 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              {copy.workflowTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#53657d] dark:text-[#b8cbe4]">
              {copy.workflowBody}
            </p>
          </div>
          <TerminalPanel
            command={page.command}
            title={`${page.label} ${copy.command}`}
            copyLabel={copy.copyCommand}
            copiedLabel={copy.copied}
          />
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-[#213047] bg-[#0d1420] p-6 text-[#eaf4ff] rz-soft-shadow md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <GitBranch className="h-10 w-10 text-[#6db5ff]" />
              <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
                {copy.stackTitle}
              </h2>
              <p className="mt-5 leading-7 text-[#b8cbe4]">
                {copy.stackBody}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {localizedStackParts.map((part) => {
                const PartIcon = part.icon;

                return (
                  <div
                    key={part.label}
                    className="rounded-2xl border border-[#223149] bg-[#142036] p-5"
                  >
                    <PartIcon className="h-5 w-5 text-[#6db5ff]" />
                    <h3 className="mt-4 font-semibold">{part.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#b8cbe4]">
                      {part.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href={platformUrl}>{copy.start}</PrimaryLink>
            <SecondaryLink href={localizedPath(locale, '/docs')}>
              {copy.readDocs}
            </SecondaryLink>
            <SecondaryLink href={localizedPath(locale, '/pricing')}>
              {copy.pricing}
            </SecondaryLink>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}

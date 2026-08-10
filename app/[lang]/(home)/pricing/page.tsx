import type { Metadata } from 'next';
import {
  MarketingPage,
  PageIntro,
  PrimaryLink,
  SecondaryLink,
} from '../_components/marketing';
import { platformUrl } from '@/lib/shared';
import { PricingModeSections } from './pricing-mode-sections';
import { pricingCopy } from '@/lib/pricing-copy';
import { localeAlternates, localizedPath, parseLocale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/pricing'>): Promise<Metadata> {
  const { lang } = await params;
  const locale = parseLocale(lang);
  return {
    ...pricingCopy[locale].metadata,
    alternates: localeAlternates(locale, '/pricing'),
  };
}

export default async function PricingPage({
  params,
}: PageProps<'/[lang]/pricing'>) {
  const { lang } = await params;
  const locale = parseLocale(lang);
  const copy = pricingCopy[locale];

  return (
    <MarketingPage>
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <PageIntro
          eyebrow={copy.intro.eyebrow}
          title={copy.intro.title}
          body={copy.intro.body}
        />
        <PricingModeSections locale={locale} copy={copy} />
      </section>

      <section className="px-6 pb-16 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
              {copy.faqs.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              {copy.faqs.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-x-8 md:grid-cols-2">
            {copy.faqs.items.map((faq) => (
              <article
                key={faq.question}
                className="border-t border-[#071222]/10 py-6 dark:border-[#6db5ff]/12"
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4]">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 rounded-[28px] border border-[#071222]/10 bg-[#f7fbff]/70 p-6 text-[#071222] rz-soft-shadow md:flex-row md:items-center md:p-8 dark:border-[#213047] dark:bg-[#0d1420] dark:text-[#eaf4ff]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
              {copy.final.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold">{copy.final.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4]">
              {copy.final.body}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <PrimaryLink href={platformUrl}>{copy.final.action}</PrimaryLink>
            <SecondaryLink href={localizedPath(locale, '/docs')}>
              {copy.final.docs}
            </SecondaryLink>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}

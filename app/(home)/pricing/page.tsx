import type { Metadata } from 'next';
import {
  MarketingPage,
  PageIntro,
  PrimaryLink,
  SecondaryLink,
} from '../_components/marketing';
import { platformUrl } from '@/lib/shared';
import { PricingModeSections } from './pricing-mode-sections';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Start free in the cloud or self-host runtz. Upgrade for team workspaces, alerts, reports, and stronger authentication.',
};

const faqs = [
  {
    question: 'Which plan should I start with?',
    answer:
      "We recommend starting with Free Cloud — you'll have security scans running in minutes, with no infrastructure to set up. Choose Self-hosted Free instead if your scan data needs to stay inside your own infrastructure from day one.",
  },
  {
    question: 'Can I cancel or downgrade anytime?',
    answer:
      'Yes. Change plans or cancel whenever you need to, right from your workspace — no long-term contract, no penalties.',
  },
  {
    question: 'Can I keep all data inside my infrastructure?',
    answer:
      'Yes. Self-hosted plans run entirely in your own environment, so your data stays fully under your control.',
  },
  {
    question: 'Do I need a security team to use runtz?',
    answer:
      "No. runtz is built so any developer can run a scan and act on the results — you don't need in-house security expertise to get value from day one.",
  },
  {
    question: 'Does self-hosted support Google and GitHub authentication?',
    answer:
      "Google authentication is included on every self-hosted plan, including Free. GitHub authentication is cloud-only and isn't available for self-hosted deployments.",
  },
];

export default function PricingPage() {
  return (
    <MarketingPage>
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <PageIntro
          eyebrow="pricing"
          title="Get started with runtz"
          body="Security that scales from solo developers to companies of every size."
        />
        <PricingModeSections />
      </section>

      <section className="px-6 pb-16 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
              faq
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Clear answers before you choose.
            </h2>
          </div>

          <div className="mt-8 grid gap-x-8 md:grid-cols-2">
            {faqs.map((faq) => (
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
              start now
            </p>
            <h2 className="mt-3 text-3xl font-bold">Start scanning today.</h2>
            <p className="mt-2 text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4]">
              Secure your environment with runtz.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <PrimaryLink href={platformUrl}>Start for free</PrimaryLink>
            <SecondaryLink href="/docs">Docs</SecondaryLink>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}

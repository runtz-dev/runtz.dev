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
      'Start with Free Cloud when you want security scans running immediately. Choose Self-hosted Free when scan data must stay in your own infrastructure.',
  },
  {
    question: 'What changes when I upgrade to Pro?',
    answer:
      'Pro adds Google and GitHub authentication for self-hosted deployments, smart email reports, smart alerts, and the AI Alert Agent for Slack threads.',
  },
  {
    question: 'What is the AI Alert Agent?',
    answer:
      'When someone replies in a Slack thread asking about a Smart Alert sent by runtz, the agent answers in that thread with context, impact, and next steps.',
  },
  {
    question: 'Can I keep all data inside my infrastructure?',
    answer:
      'Yes. Self-hosted plans run in your environment, so scans, findings, reports, and environment details stay under your control.',
  },
  {
    question: 'Does self-hosted support Google and GitHub authentication?',
    answer:
      'Yes. Self-hosted Pro and Enterprise include Google and GitHub authentication. Self-hosted Free keeps setup simple with manual user creation.',
  },
  {
    question: 'When should I choose Enterprise?',
    answer:
      'Choose Enterprise when you need multiple workspaces across teams, products, clients, or environments, plus dedicated Slack support.',
  },
];

export default function PricingPage() {
  return (
    <MarketingPage>
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <PageIntro
          eyebrow="pricing"
          title="Get started with runtz"
          body="Security scanning for every project and team."
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
              Create a free cloud workspace or follow the docs to run runtz in your own infrastructure.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <PrimaryLink href={platformUrl}>Start for free</PrimaryLink>
            <SecondaryLink href="/docs/docker-compose">Self-host docs</SecondaryLink>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}

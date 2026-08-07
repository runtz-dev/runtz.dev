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

const githubSkillsUrl = 'https://github.com/runtz-dev/runtz-skills';

export const metadata: Metadata = {
  title: 'AI',
  description:
    'Plug runtz into your favorite AI. Give Claude, Codex, or Gemini the tools and context to run security scans directly from your workflow.',
};

export default function AIPage() {
  return (
    <MarketingPage>
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <PageIntro
          eyebrow="runtz for AI agents"
          title="Plug runtz into your favorite AI."
          body="Connect runtz to Claude, Codex, or Gemini and bring security scans directly into the AI workflow you already use."
        />
      </section>

      <section className="mx-auto grid w-full max-w-[1400px] gap-12 px-6 pb-16 pt-8 md:px-12 md:pb-20 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
            runtz MCP server
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            Use the runtz MCP server.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#53657d] dark:text-[#cfe0f5]">
            Connect once and give your AI direct access to runtz scans and offline
            documentation. The MCP server keeps every tool available from the chat,
            without adding credentials to your prompts.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href={docsRoute + '/mcp'}>Set up runtz MCP</PrimaryLink>
            <SecondaryLink accent href={platformUrl}>Get a token</SecondaryLink>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="mb-3 flex items-center justify-between gap-4 px-1">
            <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
              One config block. Every scan.
            </p>
            <div className="hidden items-center gap-2 text-xs text-[#53657d] dark:text-[#7f96b3] sm:flex">
              <span>Your AI</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-semibold text-[#071222] dark:text-[#eaf4ff]">runtz MCP</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>secure scans</span>
            </div>
          </div>
          <AssistantShowcase variant="config" />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1400px] gap-12 px-6 pb-20 pt-10 md:px-12 md:pb-24 md:pt-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-16">
        <div className="max-w-xl lg:order-2">
          <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
            runtz skills
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            There&apos;s a runtz skill for your AI.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#53657d] dark:text-[#cfe0f5]">
            Use Claude, Codex, or Gemini? Add the matching skill and teach your
            assistant when to scan, which runtz tool to run, and how to return the
            results.
          </p>
          <a
            href={githubSkillsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6db5ff] px-6 text-sm font-bold text-[#071222] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#9fd6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6db5ff]"
          >
            Browse skills on GitHub
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="min-w-0 lg:order-1">
          <div className="mb-3 flex items-center justify-between gap-4 px-1">
            <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
              Native to every assistant
            </p>
            <span className="hidden text-xs text-[#53657d] dark:text-[#7f96b3] sm:block">
              Claude · Codex · Gemini
            </span>
          </div>
          <AssistantShowcase variant="skills" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-12 md:pb-20">
        <div className="rounded-[28px] border border-[#071222]/10 bg-[#f7fbff]/70 p-8 rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420] md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                Give your agent the keys to runtz.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#53657d] dark:text-[#b8cbe4]">
                Build the MCP server, add it to your assistant&apos;s config, and
                install the matching skill. The full setup lives in the docs.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <PrimaryLink href={docsRoute + '/mcp'}>MCP setup</PrimaryLink>
              <SecondaryLink accent href={platformUrl}>
                Get a token
              </SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}

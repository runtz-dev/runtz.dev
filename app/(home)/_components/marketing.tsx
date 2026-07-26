import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Play,
  Terminal,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CopyCommandButton } from './copy-command-button';
import { WarpField } from './shaders';
export { ProductConsole } from './product-console';

export function MarketingPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#eef6ff] text-[#071222] dark:bg-[#050912] dark:text-[#eaf4ff]">
      {children}
    </div>
  );
}

export function AccentPill({
  children,
  muted = false,
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-semibold ${
        muted
          ? 'border-[#2f7eff]/20 bg-[#2f7eff]/10 text-[#1d5fc7] dark:border-[#2b3d58] dark:bg-[#101827] dark:text-[#6db5ff]'
          : 'border-[#2f7eff] bg-[#6db5ff] text-[#071222] shadow-sm dark:border-[#6db5ff]/40'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#6db5ff] px-6 text-sm font-bold text-[#15140d] shadow-lg shadow-[#000000]/15 transition hover:-translate-y-0.5 hover:bg-[#9fd6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6db5ff]"
    >
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  );
}

export function SecondaryLink({
  href,
  children,
  accent = false,
}: {
  href: string;
  children: ReactNode;
  accent?: boolean;
}) {
  if (accent) {
    return (
      <Link
        href={href}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#2f7eff]/45 bg-[#2f7eff]/10 px-6 text-sm font-bold text-[#1d5fc7] ring-1 ring-inset ring-[#2f7eff]/15 transition hover:-translate-y-0.5 hover:border-[#2f7eff]/70 hover:bg-[#2f7eff]/16 dark:border-[#6db5ff]/45 dark:bg-[#6db5ff]/12 dark:text-[#9fd6ff] dark:ring-[#6db5ff]/20 dark:hover:border-[#6db5ff]/70 dark:hover:bg-[#6db5ff]/18"
      >
        <Play className="h-3.5 w-3.5 fill-current" />
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#2c2c22]/15 bg-[#071222]/8 px-6 text-sm font-semibold text-[#071222] transition hover:-translate-y-0.5 hover:bg-[#071222]/12 dark:border-[#6db5ff]/20 dark:bg-white/8 dark:text-[#eaf4ff] dark:hover:bg-white/12"
    >
      {children}
    </Link>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
      <p className="mt-5 text-base leading-7 text-[#53657d] dark:text-[#b8cbe4]">{body}</p>
    </div>
  );
}

export function TerminalPanel({
  command,
  title = 'Terminal',
}: {
  command: string;
  title?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#213047] bg-[#111b2b] p-3 text-[#ece7cf] rz-soft-shadow">
      <div className="flex items-center justify-between rounded-xl border border-[#35362a] bg-[#22231d] px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-[#b8cbe4]">
          <Terminal className="h-4 w-4 text-[#6db5ff]" />
          {title}
        </div>
        <CopyCommandButton value={command} />
      </div>
      <pre className="overflow-x-auto px-3 py-5 font-mono text-sm leading-7">
        <code>
          <span className="text-[#6db5ff]">$ </span>
          {command}
        </code>
      </pre>
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  body,
  index = 0,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  index?: number;
}) {
  // Pan each card into a different slice of the same warp pattern, so the field
  // reads as one continuous effect across the grid while staying clipped inside
  // each box (the article's overflow-hidden never lets it bleed into the gaps).
  const col = index % 3;
  const row = Math.floor(index / 3);

  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#071222]/10 bg-[#f7fbff]/55 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-[#f7fbff] dark:border-[#6db5ff]/12 dark:bg-[#101827] dark:hover:bg-[#142036]">
      <WarpField
        speed={0.5}
        offsetX={col * 2.4}
        offsetY={row * 2.4}
        className="mask-[radial-gradient(135%_130%_at_50%_0%,#000_42%,transparent_86%)]"
      />
      <div className="relative z-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#4f8dff] bg-[#6db5ff] text-[#101827]">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-5 text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4]">
          {body}
        </p>
      </div>
    </article>
  );
}

export function PageShell({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <MarketingPage>
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <AccentPill>{eyebrow}</AccentPill>
            <h1 className="mt-6 text-5xl font-bold leading-[1.02] md:text-7xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#53657d] dark:text-[#b8cbe4]">
              {body}
            </p>
          </div>
          {children}
        </div>
      </section>
    </MarketingPage>
  );
}

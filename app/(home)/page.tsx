import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Code,
  Container,
  CreditCard,
  FileText,
  HeartHandshake,
  LogIn,
  Play,
  ScanLine,
  Server,
  ShipWheel,
} from 'lucide-react';
import {
  AccentPill,
  FeatureCard,
  MarketingPage,
  PrimaryLink,
  ProductConsole,
  SecondaryLink,
  SectionIntro,
} from './_components/marketing';
import { InstallMethodTabs } from './_components/install-method-tabs';
import { HeroBackdrop, WarpField } from './_components/shaders';
import { installOptions } from '@/lib/platform-content';
import { docsRoute, platformUrl, playgroundUrl } from '@/lib/shared';

const platformCards = [
  {
    icon: Boxes,
    title: 'SCA',
    body: 'Track vulnerable dependencies and keep package risk visible across every project.',
  },
  {
    icon: Container,
    title: 'Container scanning',
    body: 'Inspect images before release and see the vulnerable packages inside your containers.',
  },
  {
    icon: Server,
    title: 'Host scanning',
    body: 'Audit Linux hosts and root filesystems so infrastructure risk stays in view.',
  },
  {
    icon: Code,
    title: 'SAST',
    body: 'Find security issues in source code and route findings into one triage workflow.',
  },
  {
    icon: ScanLine,
    title: 'DAST',
    body: 'Test running applications for exposed behavior before attackers can rely on it.',
  },
  {
    icon: ShipWheel,
    title: 'Kubernetes scanning',
    body: 'Review clusters, workloads, exposure, and RBAC posture from the same workspace.',
  },
];

const githubUrl = 'https://github.com/runtz-dev/runtz';
const githubPath =
  'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12';

// Placeholder social links — update the handles when the accounts exist.
const socialLinks = [
  { label: 'GitHub', href: githubUrl, path: githubPath },
  {
    label: 'X',
    href: 'https://x.com/runtz',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@runtz',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/runtz',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

const footerLinkTitle =
  'text-sm font-semibold transition group-hover:text-[#2f7eff] dark:group-hover:text-[#6db5ff]';

export default function HomePage() {
  return (
    <MarketingPage>
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-4 pb-10 sm:px-6 md:px-0 md:pb-12">
        <div className="w-full overflow-hidden rounded-[28px] border border-[#071222]/10 bg-[#f7fbff] text-[#071222] rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420] dark:text-[#eaf4ff]">
          <div className="relative min-h-[640px] overflow-hidden px-6 py-12 sm:px-8 md:p-12">
            <HeroBackdrop />

            <div className="relative grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <div className="max-w-3xl">
                <AccentPill muted>open source security scans platform</AccentPill>
                <h1 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                  Security scans made easy
                  <span className="text-[#6db5ff]"> for AI-era developers.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#53657d] dark:text-[#d9e9ff]">
                  Everything developers need to keep code and environments secure end
                  to end. Gain clear visibility across your stack, avoid exposure to
                  known CVEs and already-fixed issues, and build more securely in the AI era.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PrimaryLink href={platformUrl}>Start for free</PrimaryLink>
                  <SecondaryLink accent href={playgroundUrl}>
                    Playground
                  </SecondaryLink>
                </div>
              </div>

              <div className="lg:pt-24">
                <ProductConsole />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-12">
        <SectionIntro
          eyebrow="platform"
          title="Complete visibility from code to environment."
          body="Run security scans across your applications, infrastructure, and runtime surface from one open source workspace."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {platformCards.map((card, index) => (
            <FeatureCard key={card.title} index={index} {...card} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <div>
            <AccentPill>cloud or self-hosted</AccentPill>
            <h2 className="mt-6 text-3xl font-semibold leading-tight md:text-4xl">
              Start now in the cloud, or run it in your own infrastructure.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#53657d] dark:text-[#b8cbe4]">
              Get started with a managed workspace and bring security visibility to
              your team in minutes. For stricter data requirements, self-host the
              platform and keep every scan, finding, and environment detail inside
              your own infrastructure.
            </p>
          </div>
          <InstallMethodTabs options={installOptions} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-12">
        <h2 className="text-center text-3xl font-semibold text-[#2f7eff] dark:text-[#6db5ff] md:text-4xl">
          Open source by design.
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {/* left: open source story */}
          <div className="relative flex flex-col overflow-hidden rounded-[28px] border border-[#071222]/10 bg-[#f7fbff]/70 p-8 text-[#071222] rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420] dark:text-[#eaf4ff]">
            <WarpField
              speed={0.5}
              className="mask-[radial-gradient(120%_120%_at_92%_0%,#000,transparent_72%)]"
            />
            <div className="relative z-10 flex flex-1 flex-col">
              <HeartHandshake className="h-9 w-9 text-[#2f7eff] dark:text-[#6db5ff]" />
              <h3 className="mt-6 text-2xl font-semibold">Security scanning standards.</h3>
              <p className="mt-4 max-w-md leading-7 text-[#53657d] dark:text-[#c9dbf2]">
                runtz is an open source platform, so you can inspect it, extend it, and run
                it in your own environment when privacy, compliance, or internal policy
                requires it. Keep scans, findings, and reports under your control with
                no vendor lock-in.
              </p>
              <a
                href="https://github.com/runtz-dev/runtz"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-[#2f7eff]/25 bg-[#2f7eff]/10 px-4 py-2 text-sm font-semibold text-[#1d5fc7] transition hover:-translate-y-0.5 hover:bg-[#2f7eff]/16 dark:border-[#6db5ff]/30 dark:bg-[#6db5ff]/10 dark:text-[#9fd6ff] dark:hover:bg-[#6db5ff]/16"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                View source on GitHub
              </a>
            </div>
          </div>

          {/* right: docs CTA — split in half, whole card links to the docs */}
          <Link
            href={docsRoute}
            className="group relative flex flex-col overflow-hidden rounded-[28px] border border-[#071222]/10 bg-[#f7fbff]/70 text-[#071222] rz-soft-shadow transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7eff] dark:border-[#213047] dark:bg-[#0d1420] dark:text-[#eaf4ff] dark:focus-visible:outline-[#6db5ff]"
          >
            <div className="p-8 text-center">
              <h3 className="font-mono text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                Read the docs
              </h3>
              <p className="mt-3 font-mono text-xs uppercase tracking-wide text-[#53657d] dark:text-[#7f96b3]">
                Follow the docs and start scanning in minutes.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2f7eff] dark:text-[#6db5ff]">
                Open documentation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>

            <div className="relative mt-auto h-[230px] overflow-hidden border-t border-[#071222]/8 bg-gradient-to-b from-[#d6e8fc] to-[#c9e0fa] dark:border-[#6db5ff]/10 dark:from-[#1c3c72] dark:to-[#14305c]">
              <div className="absolute inset-x-0 top-9 mx-auto w-[78%] max-w-sm rounded-t-2xl border border-[#2f7eff]/20 bg-[#f7fbff] p-5 shadow-2xl shadow-[#0a1f3d]/20 transition duration-500 group-hover:-translate-y-2 dark:border-[#6db5ff]/20 dark:bg-[#111b2b]">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#2f7eff] dark:text-[#6db5ff]" />
                  <div className="h-2 w-28 rounded-full bg-[#2f7eff]/40 dark:bg-[#6db5ff]/40" />
                </div>
                <div className="mt-4 space-y-2.5">
                  <div className="h-2 w-full rounded-full bg-[#53657d]/20 dark:bg-white/10" />
                  <div className="h-2 w-11/12 rounded-full bg-[#53657d]/20 dark:bg-white/10" />
                  <div className="h-2 w-2/3 rounded-full bg-[#53657d]/20 dark:bg-white/10" />
                </div>
                <div className="mt-4 rounded-lg bg-[#0d1420] p-3 dark:bg-[#070f1c]">
                  <div className="h-2 w-1/2 rounded-full bg-[#6db5ff]/70" />
                  <div className="mt-2 h-2 w-3/4 rounded-full bg-[#6db5ff]/30" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-[1400px] px-6 pb-12 pt-4 md:px-12">
        <div className="rounded-[28px] border border-[#071222]/10 bg-[#f7fbff]/70 px-5 py-6 text-[#071222] rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420] dark:text-[#eaf4ff] md:px-7 md:py-7">
          <div className="flex flex-col items-start gap-5">
            <div className="flex w-full flex-col gap-3 sm:w-72">
              <a
                href={platformUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group block"
              >
                <div className="flex items-center gap-2">
                  <LogIn className="h-4 w-4 text-[#071222] dark:text-white" />
                  <p className={footerLinkTitle}>Login</p>
                </div>
                <p className="mt-0.5 text-xs leading-5 text-[#53657d] dark:text-[#7f96b3]">
                  Sign in to your cloud workspace.
                </p>
              </a>
              <Link href={docsRoute} className="group block">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#071222] dark:text-white" />
                  <p className={footerLinkTitle}>Read Docs</p>
                </div>
                <p className="mt-0.5 text-xs leading-5 text-[#53657d] dark:text-[#7f96b3]">
                  Guides to deploy, scan, and triage.
                </p>
              </Link>
              <a
                href={playgroundUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group block"
              >
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-[#071222] dark:text-white" />
                  <p className={footerLinkTitle}>Playground</p>
                </div>
                <p className="mt-0.5 text-xs leading-5 text-[#53657d] dark:text-[#7f96b3]">
                  Try runtz in a live sandbox.
                </p>
              </a>
              <Link href="/pricing" className="group block">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-[#071222] dark:text-white" />
                  <p className={footerLinkTitle}>Compare Plans</p>
                </div>
                <p className="mt-0.5 text-xs leading-5 text-[#53657d] dark:text-[#7f96b3]">
                  Free, self-hosted, and team tiers.
                </p>
              </Link>
            </div>

            <div className="flex flex-col items-start gap-4">
              <a
                href="https://status.runtz.dev"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#53657d] transition hover:text-[#0f7a52] dark:text-[#7f96b3] dark:hover:text-[#6ee7b7]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34d399]" />
                </span>
                All systems operational
              </a>

              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#071222]/10 text-[#53657d] transition hover:-translate-y-0.5 hover:border-[#2f7eff]/40 hover:text-[#2f7eff] dark:border-[#6db5ff]/15 dark:text-[#9fb8d7] dark:hover:border-[#6db5ff]/50 dark:hover:text-[#6db5ff]"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 border-t border-[#071222]/10 pt-4 text-xs text-[#53657d] sm:flex-row sm:items-center sm:justify-between dark:border-[#213047] dark:text-[#7f96b3]">
              <p>© 2026 Runtz · RAW DEVOPS LTDA</p>
              <div className="flex items-center gap-4">
                <Link href="/legal/terms" className="transition hover:text-[#2f7eff] dark:hover:text-[#6db5ff]">
                  Terms of Service
                </Link>
                <Link href="/legal/privacypolicy" className="transition hover:text-[#2f7eff] dark:hover:text-[#6db5ff]">
                  Privacy Policy
                </Link>
                <Link href="/legal" className="transition hover:text-[#2f7eff] dark:hover:text-[#6db5ff]">
                  Legal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </MarketingPage>
  );
}

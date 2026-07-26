'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Building2,
  Check,
  Cloud,
  Server,
  UsersRound,
} from 'lucide-react';
import { platformCheckoutUrl, platformUrl } from '@/lib/shared';
import {
  HostingModeToggle,
  PlanComparison,
  type HostingMode,
} from './plan-comparison';
import { WarpField } from '../_components/shaders';

type Plan = {
  name: string;
  planKey: 'free' | 'pro' | 'enterprise';
  eyebrow: string;
  description: string;
  price: string;
  cadence: string;
  originalPrice?: string;
  icon: LucideIcon;
  features: string[];
  action: string;
  href: string;
  secondary?: boolean;
  featured?: boolean;
};

type CurrentPlan = Plan['planKey'];

type MeResponse = {
  entitlement?: {
    plan?: CurrentPlan;
  };
};

function planRank(plan: CurrentPlan) {
  if (plan === 'enterprise') {
    return 3;
  }
  if (plan === 'pro') {
    return 2;
  }
  return 1;
}

const plansByMode: Record<HostingMode, Plan[]> = {
  cloud: [
    {
      name: 'Free',
      planKey: 'free',
      eyebrow: 'personal',
      description: 'A hosted workspace for developers who want to start scanning now.',
      price: '$0',
      cadence: 'forever',
      icon: Cloud,
      features: [
        '1 private cloud workspace',
        'No infrastructure to run',
        'Google, GitHub, passwordless email',
        'Core security dashboards and reports',
      ],
      action: 'Start for free',
      href: platformUrl,
    },
    {
      name: 'Pro',
      planKey: 'pro',
      eyebrow: 'team',
      description: 'A hosted team workspace for small teams shipping software together.',
      price: '$20',
      cadence: '/month',
      icon: UsersRound,
      features: [
        '1 shared cloud workspace',
        'Google, GitHub, passwordless email',
        'Smart email reports',
        'Smart alerts',
        'AI Alert Agent for Slack threads',
        'Dedicated Slack support',
      ],
      action: 'Choose Pro',
      href: platformUrl,
    },
    {
      name: 'Enterprise',
      planKey: 'enterprise',
      eyebrow: 'launch offer',
      description: 'Hosted workspaces for organizations with multiple teams, products, or environments.',
      price: '$99',
      cadence: '/month',
      originalPrice: '$199/month',
      icon: Building2,
      features: [
        'Multiple cloud workspaces',
        'Organization workspace management',
        'Google, GitHub, passwordless email',
        'Smart email reports',
        'Smart alerts',
        'AI Alert Agent for Slack threads',
      ],
      action: 'Choose Enterprise',
      href: platformUrl,
      featured: true,
    },
  ],
  'self-hosted': [
    {
      name: 'Free',
      planKey: 'free',
      eyebrow: 'open source',
      description: 'Run runtz in your own infrastructure and keep scan data under your control.',
      price: '$0',
      cadence: 'forever',
      icon: Server,
      features: [
        '1 shared workspace',
        'Runs in your infrastructure',
        'Manual user creation',
        'Core security dashboards and reports',
      ],
      action: 'Self-host runtz',
      href: '/docs/docker-compose',
      secondary: true,
    },
    {
      name: 'Pro',
      planKey: 'pro',
      eyebrow: 'team',
      description: 'Team security workflows inside your own runtz deployment.',
      price: '$20',
      cadence: '/month',
      icon: UsersRound,
      features: [
        '1 shared workspace',
        'Google and GitHub authentication',
        'Smart email reports',
        'Smart alerts',
        'AI Alert Agent for Slack threads',
        'Dedicated Slack support',
      ],
      action: 'Choose Pro',
      href: platformUrl,
    },
    {
      name: 'Enterprise',
      planKey: 'enterprise',
      eyebrow: 'launch offer',
      description: 'Multiple workspaces for self-hosted organizations, teams, and environments.',
      price: '$99',
      cadence: '/month',
      originalPrice: '$199/month',
      icon: Building2,
      features: [
        'Multiple shared workspaces',
        'Data stays in your infrastructure',
        'Google and GitHub authentication',
        'Smart email reports',
        'Smart alerts',
        'AI Alert Agent for Slack threads',
      ],
      action: 'Choose Enterprise',
      href: platformUrl,
      featured: true,
    },
  ],
};

export function PricingModeSections() {
  const [mode, setMode] = useState<HostingMode>('cloud');
  const [landingOrigin, setLandingOrigin] = useState('');
  const [currentPlan, setCurrentPlan] = useState<CurrentPlan | null>(null);
  const plans = plansByMode[mode];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'self-hosted') {
      setMode('self-hosted');
    }
    setLandingOrigin(window.location.origin);

    const token = window.localStorage.getItem('runtz_token');
    if (!token) {
      return;
    }

    const apiURL = process.env.NEXT_PUBLIC_RUNTZ_API_URL ?? '';
    fetch(`${apiURL}/api/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }
        return (await response.json().catch(() => null)) as MeResponse | null;
      })
      .then((payload) => {
        const plan = payload?.entitlement?.plan;
        if (plan === 'free' || plan === 'pro' || plan === 'enterprise') {
          setCurrentPlan(plan);
        }
      })
      .catch(() => {
        setCurrentPlan(null);
      });
  }, []);

  return (
    <>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center gap-4 text-center">
        <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
          Deployment model
        </p>
        <div className="flex w-full justify-center">
          <HostingModeToggle
            mode={mode}
            onModeChange={setMode}
            ariaLabel="Choose pricing card hosting model"
          />
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            index={index}
            mode={mode}
            landingOrigin={landingOrigin}
            currentPlan={currentPlan}
          />
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-7xl">
        <PlanComparison mode={mode} />
      </div>
    </>
  );
}

// Per-column opacity so the warp field is faint on the left card and strongest
// on the right, making the top-right glow "grow" across the row. Full literal
// strings so Tailwind's scanner keeps them.
const fieldOpacityByCol = ['opacity-35', 'opacity-60', 'opacity-95'];

function PlanCard({
  plan,
  index,
  mode,
  landingOrigin,
  currentPlan,
}: {
  plan: Plan;
  index: number;
  mode: HostingMode;
  landingOrigin: string;
  currentPlan: CurrentPlan | null;
}) {
  const Icon = plan.icon;
  // Each card clips its own slice of the same warp pattern (overflow-hidden +
  // matching offsetX per column), so the effect stays inside the cards and never
  // bleeds into the gaps, yet still reads as one continuous field across the row.
  const col = index % 3;
  const row = Math.floor(index / 3);

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 shadow-sm ${
        plan.featured
          ? 'border-[#2f7eff]/35 bg-[#f7fbff]/70 text-[#071222] rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420] dark:text-[#eaf4ff]'
          : 'border-[#071222]/10 bg-[#f7fbff]/70 dark:border-[#6db5ff]/12 dark:bg-[#101827]'
      }`}
    >
      <WarpField
        speed={0.5}
        offsetX={col * 2.4}
        offsetY={row * 2.4}
        className={`${fieldOpacityByCol[col] ?? 'opacity-60'} mask-[radial-gradient(150%_140%_at_100%_0%,#000,transparent_78%)]`}
      />
      <div className="relative z-10 flex flex-1 flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
            {plan.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold">{plan.name}</h2>
        </div>
        <Icon className="h-6 w-6 shrink-0 text-[#2f7eff] dark:text-[#6db5ff]" />
      </div>

      <p
        className={`mt-3 min-h-18 text-sm leading-6 ${
          plan.featured
            ? 'text-[#53657d] dark:text-[#c9dbf2]'
            : 'text-[#53657d] dark:text-[#b8cbe4]'
        }`}
      >
        {plan.description}
      </p>

      <div className="mt-6">
        {plan.originalPrice ? (
          <p className="mb-2 text-sm text-[#53657d] dark:text-[#9fb4cf]">
            <span className="line-through">{plan.originalPrice}</span>
            <span className="ml-2 rounded-full bg-[#6db5ff] px-2 py-1 font-mono text-[10px] font-bold uppercase text-[#071222]">
              50% off launch
            </span>
          </p>
        ) : null}
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold">{plan.price}</span>
          <span
            className={`pb-1 text-sm ${
              plan.featured
                ? 'text-[#53657d] dark:text-[#c9dbf2]'
                : 'text-[#53657d] dark:text-[#b8cbe4]'
            }`}
          >
            {plan.cadence}
          </span>
        </div>
      </div>

      <ul className="mt-7 grid gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2 text-sm leading-6">
            <Check className="mt-1 h-4 w-4 shrink-0 text-[#2f7eff] dark:text-[#6db5ff]" />
            {feature}
          </li>
        ))}
      </ul>

        <div className="mt-auto pt-8">
          <PlanAction
            plan={plan}
            mode={mode}
            landingOrigin={landingOrigin}
            currentPlan={currentPlan}
          />
        </div>
      </div>
    </article>
  );
}

function PlanAction({
  plan,
  mode,
  landingOrigin,
  currentPlan,
}: {
  plan: Plan;
  mode: HostingMode;
  landingOrigin: string;
  currentPlan: CurrentPlan | null;
}) {
  if (plan.secondary) {
    return (
      <Link
        href={plan.href}
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#2c2c22]/15 bg-[#071222]/8 px-6 text-sm font-semibold text-[#071222] transition hover:-translate-y-0.5 hover:bg-[#071222]/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7eff] dark:border-[#6db5ff]/20 dark:bg-white/8 dark:text-[#eaf4ff] dark:hover:bg-white/12 dark:focus-visible:outline-[#6db5ff]"
      >
        {plan.action}
      </Link>
    );
  }

  const showsCloudEntitlement = mode === 'cloud' && currentPlan !== null;
  const isCurrent = showsCloudEntitlement && currentPlan === plan.planKey;
  const isIncluded =
    showsCloudEntitlement && planRank(currentPlan) > planRank(plan.planKey);

  if (isCurrent || isIncluded) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-full bg-[#2a3446] px-6 text-sm font-bold text-[#8da4c0] opacity-80 shadow-none dark:bg-[#1b2333] dark:text-[#7f93ad]"
      >
        {isCurrent ? 'Your current plan' : 'Included in your plan'}
      </button>
    );
  }

  const checkoutHref = platformCheckoutUrl(
    plan.planKey,
    mode,
    landingOrigin
      ? {
          successUrl: `${landingOrigin}/home/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${landingOrigin}/home/pricing`,
        }
      : undefined,
  );

  return (
    <Link
      href={checkoutHref}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#6db5ff] px-6 text-sm font-bold text-[#15140d] shadow-lg shadow-[#000000]/15 transition hover:-translate-y-0.5 hover:bg-[#9fd6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6db5ff]"
    >
      {plan.action}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  );
}

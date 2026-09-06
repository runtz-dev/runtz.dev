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
import { platformCheckoutUrl, platformUrl, sitePath } from '@/lib/shared';
import {
  HostingModeToggle,
  PlanComparison,
  type HostingMode,
} from './plan-comparison';
import { WarpField } from '../_components/shaders';
import type { PricingCopy, PricingPlanCopy } from '@/lib/pricing-copy';
import { localizedPath, type Locale } from '@/lib/i18n';

type Plan = {
  name: string;
  planKey: 'free' | 'pro' | 'enterprise';
  eyebrow: string;
  description: string;
  price: string;
  cadence: string;
  icon: LucideIcon;
  /** Name of the lower plan this one inherits from, e.g. "Free" on Pro. Renders an "Everything from X, plus:" label above `features`, which then only needs to list what's new. */
  includesFrom?: string;
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

const planKeys = ['free', 'pro', 'enterprise'] as const;
const planIcons = [Cloud, UsersRound, Building2] as const;

function decoratePlans(
  plans: PricingPlanCopy[],
  locale: Locale,
  mode: HostingMode,
): Plan[] {
  return plans.map((plan, index) => ({
    ...plan,
    planKey: planKeys[index] ?? 'free',
    icon: mode === 'self-hosted' && index === 0 ? Server : planIcons[index] ?? Cloud,
    href:
      mode === 'self-hosted' && index === 0
        ? localizedPath(locale, '/docs/docker-compose')
        : platformUrl,
    secondary: mode === 'self-hosted' && index === 0,
    featured: index === 2,
  }));
}

export function PricingModeSections({
  locale,
  copy,
}: {
  locale: Locale;
  copy: PricingCopy;
}) {
  const [mode, setMode] = useState<HostingMode>('cloud');
  const [landingOrigin, setLandingOrigin] = useState('');
  const [currentPlan, setCurrentPlan] = useState<CurrentPlan | null>(null);
  const plans = decoratePlans(
    mode === 'cloud' ? copy.plans.cloud : copy.plans.selfHosted,
    locale,
    mode,
  );

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
        <div className="flex w-full justify-center">
          <HostingModeToggle
            mode={mode}
            onModeChange={setMode}
            ariaLabel={copy.modeAriaLabel}
            labels={copy.modeLabels}
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
            locale={locale}
            copy={copy}
          />
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-7xl">
        <PlanComparison mode={mode} copy={copy.comparison} />
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
  locale,
  copy,
}: {
  plan: Plan;
  index: number;
  mode: HostingMode;
  landingOrigin: string;
  currentPlan: CurrentPlan | null;
  locale: Locale;
  copy: PricingCopy;
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

      {plan.includesFrom ? (
        <p className="mt-7 text-sm font-semibold">
          {copy.everythingFrom.replace('{plan}', plan.includesFrom)}
        </p>
      ) : null}

      <ul className={`grid gap-3 ${plan.includesFrom ? 'mt-3' : 'mt-7'}`}>
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
            locale={locale}
            copy={copy}
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
  locale,
  copy,
}: {
  plan: Plan;
  mode: HostingMode;
  landingOrigin: string;
  currentPlan: CurrentPlan | null;
  locale: Locale;
  copy: PricingCopy;
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
        {isCurrent ? copy.currentPlan : copy.includedInPlan}
      </button>
    );
  }

  const checkoutHref = platformCheckoutUrl(
    plan.planKey,
    mode,
    landingOrigin
      ? {
          successUrl: `${landingOrigin}${sitePath(
            localizedPath(locale, '/pricing/success'),
          )}?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${landingOrigin}${sitePath(localizedPath(locale, '/pricing'))}`,
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

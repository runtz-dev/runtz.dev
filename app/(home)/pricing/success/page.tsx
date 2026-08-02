'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import {
  MarketingPage,
  PrimaryLink,
  SecondaryLink,
} from '../../_components/marketing';
import { platformUrl } from '@/lib/shared';

type CheckoutStatus = {
  plan: 'free' | 'pro' | 'enterprise';
  deploymentMode: 'cloud' | 'self-hosted';
  status: string;
  currentPeriodEnd?: string;
  licenseKey?: string;
  licenseKeyPrefix?: string;
  licenseKeyAvailable?: boolean;
};

export default function PricingSuccessPage() {
  const [status, setStatus] = useState<CheckoutStatus | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sessionID = new URLSearchParams(window.location.search).get('session_id') ?? '';
    if (!sessionID) {
      setError('Missing checkout session.');
      return;
    }

    const apiURL = process.env.NEXT_PUBLIC_RUNTZ_API_URL ?? '';
    fetch(`${apiURL}/api/v1/billing/checkout-session/${encodeURIComponent(sessionID)}`)
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(typeof payload.error === 'string' ? payload.error : 'Unable to load checkout.');
        }
        setStatus(payload as CheckoutStatus);
      })
      .catch((error) => setError(error instanceof Error ? error.message : 'Unable to load checkout.'));
  }, []);

  async function copyLicense() {
    if (!status?.licenseKey) {
      return;
    }
    await navigator.clipboard.writeText(status.licenseKey);
    setCopied(true);
  }

  return (
    <MarketingPage>
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-[#071222]/10 bg-[#f7fbff]/75 p-6 rz-soft-shadow md:p-8 dark:border-[#213047] dark:bg-[#0d1420]">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#6db5ff] text-[#071222]">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <p className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
                checkout complete
              </p>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">
                Your runtz plan is ready.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4]">
                Stripe confirmed the subscription. Cloud plans are available after login with the
                same billing email. Self-hosted purchases started inside your installation activate
                automatically; public-site purchases can use the fallback key below.
              </p>
            </div>
          </div>

          {error ? (
            <div className="mt-8 rounded-2xl border border-[#ff6b6b]/30 bg-[#ff6b6b]/10 p-4 text-sm text-[#7f1d1d] dark:text-[#ffc9c9]">
              {error}
            </div>
          ) : null}

          {!status && !error ? (
            <div className="mt-8 rounded-2xl border border-[#071222]/10 bg-white/45 p-4 text-sm text-[#53657d] dark:border-[#6db5ff]/12 dark:bg-white/5 dark:text-[#b8cbe4]">
              Loading checkout status...
            </div>
          ) : null}

          {status ? (
            <div className="mt-8 grid gap-5">
              <div className="grid gap-3 rounded-2xl border border-[#071222]/10 bg-white/45 p-4 text-sm dark:border-[#6db5ff]/12 dark:bg-white/5">
                <div className="flex justify-between gap-4">
                  <span className="text-[#53657d] dark:text-[#9fb4cf]">Plan</span>
                  <span className="font-semibold capitalize">{status.plan}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#53657d] dark:text-[#9fb4cf]">Deployment</span>
                  <span className="font-semibold">{status.deploymentMode}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#53657d] dark:text-[#9fb4cf]">Status</span>
                  <span className="font-semibold">{status.status}</span>
                </div>
              </div>

              {status.deploymentMode === 'self-hosted' ? (
                <div className="rounded-2xl border border-[#2f7eff]/25 bg-[#eaf4ff] p-4 dark:border-[#6db5ff]/20 dark:bg-[#101827]">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 size-5 shrink-0 text-[#2f7eff] dark:text-[#6db5ff]" />
                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold">Self-hosted fallback key</h2>
                      {status.licenseKey ? (
                        <>
                          <code className="mt-3 block overflow-x-auto rounded-xl bg-[#071222] p-3 text-xs text-[#eaf4ff]">
                            {status.licenseKey}
                          </code>
                          <button
                            type="button"
                            onClick={copyLicense}
                            className="mt-3 inline-flex min-h-10 items-center rounded-full bg-[#6db5ff] px-4 text-sm font-bold text-[#071222]"
                          >
                            <Copy className="mr-2 size-4" />
                            {copied ? 'Copied' : 'Copy key'}
                          </button>
                        </>
                      ) : (
                        <p className="mt-2 text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4]">
                          This key was already issued. Use the key you copied after checkout or contact support with prefix{' '}
                          <span className="font-mono">{status.licenseKeyPrefix ?? 'unknown'}</span>.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <PrimaryLink href={platformUrl}>
                  Open runtz app
                  <ExternalLink className="ml-2 size-4" />
                </PrimaryLink>
                <SecondaryLink href="/docs/docker-compose#self-hosted-pro-and-enterprise-activation">Activation docs</SecondaryLink>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </MarketingPage>
  );
}

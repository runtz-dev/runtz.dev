export const appName = 'runtz';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';
// Host of the platform this build links to. The landing app is served under
// /home on the same host as the platform, so dev must point at
// runtz-dev.runtz.dev and prod at runtz.dev — otherwise "Login" on the dev site
// sends people to production (and to a different localStorage, so they have to
// sign in again). Baked at build time from the pipeline (see Dockerfile).
export const platformBaseUrl = (
  process.env.NEXT_PUBLIC_PLATFORM_BASE_URL || 'https://runtz.dev'
).replace(/\/$/, '');
export const platformUrl = `${platformBaseUrl}/login`;
export const playgroundUrl = `${platformBaseUrl}/playground`;

export type PlatformCheckoutPlan = 'free' | 'pro' | 'enterprise';
export type PlatformDeploymentMode = 'cloud' | 'self-hosted';

export function platformCheckoutUrl(
  plan: PlatformCheckoutPlan,
  deploymentMode: PlatformDeploymentMode,
  returnUrls?: {
    successUrl: string;
    cancelUrl: string;
  },
) {
  const params = new URLSearchParams({
    plan,
    deploymentMode,
  });

  if (returnUrls) {
    params.set('successUrl', returnUrls.successUrl);
    params.set('cancelUrl', returnUrls.cancelUrl);
  }

  return `${platformBaseUrl}/checkout?${params.toString()}`;
}

export const gitConfig = {
  user: 'runtz-dev',
  repo: 'runtz.dev',
  branch: 'main',
};

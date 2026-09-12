export const appName = 'runtz';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';
// The whole app is served under this basePath (see next.config.mjs) — empty
// by default now that the site lives at the domain root. Next prefixes it
// automatically for <Link>, <Image> and fetches it controls, but NOT for URLs
// we hand out ourselves as plain strings — the "View as Markdown" link, the
// copy-markdown fetch, the OG image in metadata, the links inside llms.txt.
// Those must be built with `sitePath()` / `siteUrl()` below, so they keep
// working if this ever needs a basePath again (e.g. local dev under a proxy).
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
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

/** Absolute path on this host for an app route (identity unless basePath is set). */
export function sitePath(route: string) {
  return `${basePath}${route}`;
}

/** Fully qualified URL for an app route, for llms.txt and other crawler output. */
export function siteUrl(route: string) {
  return `${platformBaseUrl}${sitePath(route)}`;
}

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

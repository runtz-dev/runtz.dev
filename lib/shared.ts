export const appName = 'runtz';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';
export const platformBaseUrl = 'https://runtz.dev';
export const platformUrl = `${platformBaseUrl}/login`;
export const playgroundUrl = 'https://runtz.dev/playground';

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

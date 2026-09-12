import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
// Static assets (`_next/*`) get their own namespace, independent of basePath.
// Both `runtz-landing` and the platform frontend live at the domain root now,
// and both are Next.js apps that default to serving chunks at `/_next/*` — an
// explicit assetPrefix here is what keeps the two from colliding. See
// secrets-helm/ingress-*.yaml for the matching Ingress rule.
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '/_landing';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  ...(basePath ? { basePath } : {}),
  assetPrefix,
  // Compatibility for every link already published under the old /home
  // prefix (docs, READMEs, bookmarks, search engines). Kept indefinitely —
  // cheap, and the ingress still has to route /home* here for these to fire.
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/home/:path*', destination: '/:path*', permanent: true },
    ];
  },
};

export default withMDX(config);

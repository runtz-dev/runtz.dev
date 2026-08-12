import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { basePath, docsContentRoute, docsRoute } from '@/lib/shared';
import { i18n, pathLocale } from '@/lib/i18n';

const handleI18n = createI18nMiddleware(i18n);

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

// runtz.dev/install.sh installs the CLI (curl -fsSL https://runtz.dev/install.sh
// | bash). The canonical install.sh lives in the platform repository; the
// platform ingress routes this exact path to this app, and every request is
// redirected there (curl -fsSL follows redirects).
const installScriptUrl =
  'https://raw.githubusercontent.com/runtz-dev/runtz-cli/main/install.sh';

// runtz.dev/install.ps1 installs the CLI on Windows (irm https://runtz.dev/
// install.ps1 | iex). Independent from install.sh above — separate script,
// separate command, own doc page — served the same way: redirected straight
// to the canonical file in the CLI repository.
const installPs1ScriptUrl =
  'https://raw.githubusercontent.com/runtz-dev/runtz-cli/main/install.ps1';

// Files that llmstxt.org expects at the domain root. The ingress routes these
// exact paths to this app; they remain English/default-locale entry points.
const rootLlmsFiles = new Set(['/llms.txt', '/llms-full.txt']);

// `request.nextUrl.pathname` has the basePath stripped, and NextResponse.rewrite
// does not add it back. Internal rewrites therefore restore `/home` manually.
function rewriteToApp(request: NextRequest, pathname: string) {
  return NextResponse.rewrite(new URL(`${basePath}${pathname}`, request.url));
}

function localizedInternalPath(pathname: string, locale: string) {
  return `/${locale}${pathname === '/' ? '' : pathname}`;
}

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  if (pathname === '/install.sh') {
    return NextResponse.redirect(installScriptUrl, 302);
  }

  if (pathname === '/install.ps1') {
    return NextResponse.redirect(installPs1ScriptUrl, 302);
  }

  // `/legal` is also exposed without the app basePath by the existing ingress.
  // Keep that compatibility URL tied to the default English locale.
  if (pathname === '/legal' || pathname.startsWith('/legal/')) {
    return rewriteToApp(request, localizedInternalPath(pathname, 'en'));
  }

  if (rootLlmsFiles.has(pathname)) {
    return rewriteToApp(request, pathname);
  }

  const localized = pathLocale(pathname);
  const suffixResult = rewriteSuffix(localized.pathname);

  if (suffixResult) {
    return rewriteToApp(
      request,
      localizedInternalPath(suffixResult, localized.locale),
    );
  }

  if (isMarkdownPreferred(request)) {
    const markdownResult = rewriteDocs(localized.pathname);

    if (markdownResult) {
      return rewriteToApp(
        request,
        localizedInternalPath(markdownResult, localized.locale),
      );
    }
  }

  // Public files, Next.js internals and route handlers do not belong to the
  // locale tree and must never receive a language prefix.
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  return handleI18n(request, event);
}

import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { basePath, docsContentRoute, docsRoute } from '@/lib/shared';

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

// Files that llmstxt.org (and every crawler implementing it) expects at the
// domain root, not under the /home basePath. The ingress routes these two exact
// paths to this app; here they are rewritten onto the real routes.
const rootLlmsFiles = new Set(['/llms.txt', '/llms-full.txt']);

// `request.nextUrl.pathname` has the basePath stripped, and NextResponse.rewrite
// does not add it back — so every internal rewrite target must be prefixed by
// hand or it lands on the platform frontend's 404.
function rewriteToApp(request: NextRequest, pathname: string) {
  return NextResponse.rewrite(new URL(`${basePath}${pathname}`, request.url));
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/install.sh') {
    return NextResponse.redirect(installScriptUrl, 302);
  }

  // Serve the legal pages at runtz.dev/legal/* (without the /home basePath):
  // the ingress routes /legal to this app and the request is rewritten to the
  // basePath-prefixed route.
  if (pathname === '/legal' || pathname.startsWith('/legal/')) {
    return rewriteToApp(request, pathname);
  }

  if (rootLlmsFiles.has(pathname)) {
    return rewriteToApp(request, pathname);
  }

  const result = rewriteSuffix(pathname);
  if (result) {
    return rewriteToApp(request, result);
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(pathname);

    if (result) {
      return rewriteToApp(request, result);
    }
  }

  return NextResponse.next();
}

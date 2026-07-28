import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute, docsRoute } from '@/lib/shared';

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

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/install.sh') {
    return NextResponse.redirect(installScriptUrl, 302);
  }

  // Serve the legal pages at runtz.dev/legal/* (without the /home basePath):
  // the ingress routes /legal to this app and the request is rewritten to the
  // basePath-prefixed route.
  if (pathname === '/legal' || pathname.startsWith('/legal/')) {
    return NextResponse.rewrite(new URL(`/home${pathname}`, request.url));
  }

  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  return NextResponse.next();
}

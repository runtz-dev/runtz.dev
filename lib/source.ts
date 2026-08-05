import { docs } from 'collections/server';
import type * as PageTree from 'fumadocs-core/page-tree';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import {
  Anchor,
  BookOpen,
  Bot,
  Boxes,
  Code2,
  Container,
  GitBranch,
  PackageCheck,
  Plug,
  Radar,
  Server,
  ShipWheel,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import { createElement } from 'react';
import { docsContentRoute, docsImageRoute, docsRoute, sitePath, siteUrl } from './shared';

const sidebarIconByUrl: Record<string, LucideIcon> = {
  '/docs': BookOpen,
  '/docs/install-cli': Terminal,
  '/docs/docker-compose': Boxes,
  '/docs/helm': Anchor,
  '/docs/architecture': GitBranch,
  '/docs/mcp': Plug,
  '/docs/skills': Bot,
  '/docs/scans/sca': PackageCheck,
  '/docs/scans/sast': Code2,
  '/docs/scans/host': Server,
  '/docs/scans/container': Container,
  '/docs/scans/kubernetes': ShipWheel,
};

function sidebarIcon(Icon: LucideIcon) {
  return createElement(Icon, { 'aria-hidden': true, className: 'rz-sidebar-icon' });
}

const sidebarIconTransformer = {
  file(node: PageTree.Item) {
    const Icon = sidebarIconByUrl[node.url];

    if (Icon) {
      node.icon = sidebarIcon(Icon);
    }

    return node;
  },
  folder(node: PageTree.Folder, folderPath: string) {
    if (folderPath === 'scans') {
      node.icon = sidebarIcon(Radar);
    }

    return node;
  },
};

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  pageTree: {
    transformers: [sidebarIconTransformer],
  },
  plugins: [lucideIconsPlugin()],
});

// `segments` feed generateStaticParams (route params, no basePath); `url` is
// handed to the browser as a plain string, so it must carry the basePath.
export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: sitePath(`${docsImageRoute}/${segments.join('/')}`),
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: sitePath(`${docsContentRoute}/${segments.join('/')}`),
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${siteUrl(page.url)})

${processed}`;
}

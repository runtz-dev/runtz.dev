import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  Container,
  HeartHandshake,
  LogIn,
  PackageCheck,
  Radar,
  Server,
  ShipWheel,
} from 'lucide-react';
import { platformUrl, playgroundUrl } from './shared';
import { githubUrl } from './platform-content';
import { RuntzWordmark } from '@/components/runtz-logo';

const platformMenuCardClassName = 'rz-platform-menu-card';
const plannedTopNavMenusEnabled = false;

const brandTitle = <RuntzWordmark className="text-[17px]" />;

function menuCard(Icon: LucideIcon, title: string, description: string) {
  return {
    type: 'custom' as const,
    children: (
      <div
        aria-disabled="true"
        className={`${platformMenuCardClassName} flex cursor-default flex-col gap-2 md:rounded-lg md:border md:p-3`}
      >
        <div className="hidden w-fit rounded-md border p-1 md:block">
          <Icon className="size-4" />
        </div>
        <p className="text-base font-medium">{title}</p>
        <p className="hidden text-sm md:block">{description}</p>
      </div>
    ),
  };
}

type LayoutLink = NonNullable<BaseLayoutProps['links']>[number];

const platformNavMenu = {
  type: 'menu',
  text: (
    <span className="inline-flex items-center gap-1">
      Platform
      <ChevronDown className="h-3.5 w-3.5" />
    </span>
  ),
  items: [
    menuCard(PackageCheck, 'SCA', 'Dependency advisories for npm projects and package manifests.'),
    menuCard(Code2, 'SAST', 'Static source findings from local CLI scans.'),
    menuCard(Radar, 'DAST', 'Runtime web checks planned for application surfaces.'),
    menuCard(Container, 'Container scanning', 'Inventory dpkg, rpm, apk and pacman packages inside images.'),
    menuCard(ShipWheel, 'Kubernetes scanning', 'Manifest posture findings for workloads and RBAC.'),
    menuCard(Server, 'Host scanning', 'Package CVEs on Debian, RPM, Alpine and Arch family hosts.'),
    menuCard(HeartHandshake, 'Open Source', 'Local-first DevSecOps components you can inspect and extend.'),
  ],
} satisfies LayoutLink;

const aiNavLink = {
  type: 'main',
  text: 'AI',
  url: '/ai',
  active: 'nested-url',
} satisfies LayoutLink;

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: brandTitle,
      url: '/',
      transparentMode: 'top',
      children: <div className="hidden flex-1 lg:block" />,
    },
    links: [
      ...(plannedTopNavMenusEnabled ? [platformNavMenu] : []),
      {
        type: 'custom',
        children: (
          <Link
            href={playgroundUrl}
            className="group inline-flex h-9 items-center rounded-full px-2 text-sm font-semibold text-[#6db5ff] transition hover:text-[#9fd6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6db5ff]"
          >
            <span className="border-b border-[#6db5ff]/35 pb-0.5 transition group-hover:border-[#9fd6ff]">
              Playground
            </span>
          </Link>
        ),
      },
      {
        type: 'main',
        text: 'Pricing',
        url: '/pricing',
        active: 'url',
      },
      aiNavLink,
      {
        type: 'main',
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
      {
        type: 'custom',
        secondary: true,
        children: (
          <Link
            href={platformUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-9 items-center rounded-full border border-[#2f7eff]/30 bg-[#2f7eff]/10 px-3.5 text-sm font-semibold text-[#1d5fc7] transition hover:-translate-y-px hover:border-[#2f7eff]/60 hover:bg-[#6db5ff] hover:text-[#071222] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7eff] dark:border-[#6db5ff]/30 dark:bg-[#6db5ff]/10 dark:text-[#d9e9ff] dark:hover:border-[#6db5ff]/60 dark:focus-visible:outline-[#6db5ff]"
          >
            Login
          </Link>
        ),
      },
    ],
    githubUrl,
    searchToggle: {
      enabled: false,
    },
  };
}

export function docsOptions(): BaseLayoutProps {
  return {
    nav: {
      title: brandTitle,
      url: '/',
      transparentMode: 'none',
    },
    links: [
      {
        type: 'custom',
        children: (
          <Link
            href={platformUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="rz-docs-login"
          >
            <span className="rz-docs-login-icon">
              <LogIn aria-hidden="true" />
            </span>
            <span className="rz-docs-login-copy">
              <span>Login</span>
              <span className="rz-docs-login-caption">Open platform</span>
            </span>
            <ArrowUpRight aria-hidden="true" className="rz-docs-login-arrow" />
          </Link>
        ),
      },
    ],
    searchToggle: {
      enabled: false,
    },
  };
}

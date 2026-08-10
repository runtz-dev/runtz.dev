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
import {
  RuntzLanguageSelect,
  RuntzLanguageSelectText,
} from '@/components/runtz-language-select';
import { RuntzWordmark } from '@/components/runtz-logo';
import { localizedPath, type Locale } from './i18n';

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

const layoutCopy = {
  en: {
    platform: 'Platform',
    playground: 'Playground',
    pricing: 'Pricing',
    ai: 'AI',
    docs: 'Docs',
    login: 'Login',
    openPlatform: 'Open platform',
    platformCards: [
      ['SCA', 'Dependency advisories for npm projects and package manifests.'],
      ['SAST', 'Static source findings from local CLI scans.'],
      ['DAST', 'Runtime web checks planned for application surfaces.'],
      ['Container scanning', 'Inventory dpkg, rpm, apk and pacman packages inside images.'],
      ['Kubernetes scanning', 'Manifest posture findings for workloads and RBAC.'],
      ['Host scanning', 'Package CVEs on Debian, RPM, Alpine and Arch family hosts.'],
      ['Open Source', 'Local-first DevSecOps components you can inspect and extend.'],
    ],
  },
  'pt-br': {
    platform: 'Plataforma',
    playground: 'Playground',
    pricing: 'Preços',
    ai: 'IA',
    docs: 'Docs',
    login: 'Entrar',
    openPlatform: 'Abrir plataforma',
    platformCards: [
      ['SCA', 'Alertas de dependências para projetos npm e manifestos de pacotes.'],
      ['SAST', 'Achados estáticos no código-fonte por meio de scans locais da CLI.'],
      ['DAST', 'Verificações web em runtime planejadas para superfícies de aplicações.'],
      ['Scan de containers', 'Inventário de pacotes dpkg, rpm, apk e pacman em imagens.'],
      ['Scan de Kubernetes', 'Achados de postura em manifests, workloads e RBAC.'],
      ['Scan de hosts', 'CVEs de pacotes em hosts Debian, RPM, Alpine e Arch.'],
      ['Open source', 'Componentes DevSecOps local-first que você pode inspecionar e ampliar.'],
    ],
  },
  es: {
    platform: 'Plataforma',
    playground: 'Playground',
    pricing: 'Precios',
    ai: 'IA',
    docs: 'Docs',
    login: 'Ingresar',
    openPlatform: 'Abrir plataforma',
    platformCards: [
      ['SCA', 'Alertas de dependencias para proyectos npm y manifiestos de paquetes.'],
      ['SAST', 'Hallazgos estáticos en el código fuente mediante escaneos locales de la CLI.'],
      ['DAST', 'Pruebas web en tiempo de ejecución planificadas para aplicaciones.'],
      ['Escaneo de contenedores', 'Inventario de paquetes dpkg, rpm, apk y pacman en imágenes.'],
      ['Escaneo de Kubernetes', 'Hallazgos de postura en manifiestos, workloads y RBAC.'],
      ['Escaneo de hosts', 'CVEs de paquetes en hosts Debian, RPM, Alpine y Arch.'],
      ['Código abierto', 'Componentes DevSecOps local-first que puedes inspeccionar y ampliar.'],
    ],
  },
} satisfies Record<
  Locale,
  {
    platform: string;
    playground: string;
    pricing: string;
    ai: string;
    docs: string;
    login: string;
    openPlatform: string;
    platformCards: readonly (readonly [string, string])[];
  }
>;

const platformCardIcons = [
  PackageCheck,
  Code2,
  Radar,
  Container,
  ShipWheel,
  Server,
  HeartHandshake,
] as const;

function platformNavMenu(locale: Locale): LayoutLink {
  const copy = layoutCopy[locale];

  return {
    type: 'menu',
    text: (
      <span className="inline-flex items-center gap-1">
        {copy.platform}
        <ChevronDown className="h-3.5 w-3.5" />
      </span>
    ),
    items: copy.platformCards.map(([title, description], index) =>
      menuCard(platformCardIcons[index] ?? PackageCheck, title, description),
    ),
  };
}

const languageSelectSlot = {
  root: RuntzLanguageSelect,
  text: RuntzLanguageSelectText,
};

export function baseOptions(locale: Locale): BaseLayoutProps {
  const copy = layoutCopy[locale];

  return {
    nav: {
      title: brandTitle,
      url: localizedPath(locale, '/'),
      transparentMode: 'top',
      children: <div className="hidden flex-1 lg:block" />,
    },
    slots: {
      languageSelect: languageSelectSlot,
    },
    links: [
      ...(plannedTopNavMenusEnabled ? [platformNavMenu(locale)] : []),
      {
        type: 'custom',
        children: (
          <Link
            href={playgroundUrl}
            className="group inline-flex h-9 items-center rounded-full px-2 text-sm font-semibold text-[#6db5ff] transition hover:text-[#9fd6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6db5ff]"
          >
            <span className="border-b border-[#6db5ff]/35 pb-0.5 transition group-hover:border-[#9fd6ff]">
              {copy.playground}
            </span>
          </Link>
        ),
      },
      {
        type: 'main',
        text: copy.pricing,
        url: localizedPath(locale, '/pricing'),
        active: 'url',
      },
      {
        type: 'main',
        text: copy.ai,
        url: localizedPath(locale, '/ai'),
        active: 'nested-url',
      },
      {
        type: 'main',
        text: copy.docs,
        url: localizedPath(locale, '/docs'),
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
            {copy.login}
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

export function docsOptions(locale: Locale): BaseLayoutProps {
  const copy = layoutCopy[locale];

  return {
    nav: {
      title: brandTitle,
      url: localizedPath(locale, '/'),
      transparentMode: 'none',
    },
    slots: {
      languageSelect: languageSelectSlot,
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
              <span>{copy.login}</span>
              <span className="rz-docs-login-caption">{copy.openPlatform}</span>
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

import { RootProvider } from 'fumadocs-ui/provider/next';
import { i18nProvider } from 'fumadocs-ui/i18n';
import '../global.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import {
  fumadocsTranslations,
  localeDetails,
  locales,
  parseLocale,
} from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
});

// Brand wordmark font (official lockup: JetBrains Mono 700).
const brandMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-brand',
});

const metadataCopy = {
  en: {
    title: 'runtz — Open source DevSecOps scans',
    description:
      'Open source DevSecOps platform: SCA, SAST, host, container and Kubernetes scans from a single Go CLI, with dashboards you can use in the cloud or self-host.',
  },
  'pt-br': {
    title: 'runtz — Scans DevSecOps open source',
    description:
      'Plataforma DevSecOps open source: scans SCA, SAST, de hosts, containers e Kubernetes por uma única CLI em Go, com dashboards na nuvem ou self-hosted.',
  },
  es: {
    title: 'runtz — Análisis DevSecOps open source',
    description:
      'Plataforma DevSecOps open source: análisis SCA, SAST, de hosts, contenedores y Kubernetes desde una única CLI en Go, con dashboards cloud o self-hosted.',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = parseLocale(lang);
  const copy = metadataCopy[locale];

  return {
    metadataBase: new URL('https://runtz.dev'),
    applicationName: 'runtz',
    title: {
      default: copy.title,
      template: '%s — runtz',
    },
    description: copy.description,
    keywords: [
      'DevSecOps',
      'SCA',
      'SAST',
      'dependency scanning',
      'container scanning',
      'Kubernetes security',
      'vulnerability scanning',
      'CVE',
      'open source security',
      'security platform',
    ],
    authors: [{ name: 'RAW DevOps', url: 'https://runtz.dev' }],
    creator: 'RAW DevOps',
    publisher: 'RAW DevOps',
    category: 'technology',
    openGraph: {
      type: 'website',
      siteName: 'runtz',
      locale: localeDetails[locale].ogLocale,
      alternateLocale: ['en_US', 'pt_BR', 'es_419'].filter(
        (candidate) => candidate !== localeDetails[locale].ogLocale,
      ),
      title: copy.title,
      description: copy.description,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@runtz',
      creator: '@runtz',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef6ff' },
    { media: '(prefers-color-scheme: dark)', color: '#050912' },
  ],
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Layout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const locale = parseLocale(lang);

  return (
    <html
      lang={localeDetails[locale].htmlLang}
      className={`${inter.className} ${brandMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider i18n={i18nProvider(fumadocsTranslations, locale)}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}

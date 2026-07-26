import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

// Brand wordmark font (official lockup: JetBrains Mono 700).
const brandMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-brand',
});

const siteDescription =
  'Open source DevSecOps platform: SCA, SAST, host, container and Kubernetes scans from a single Go CLI, with dashboards you can use in the cloud or self-host.';

export const metadata: Metadata = {
  metadataBase: new URL('https://runtz.dev'),
  applicationName: 'runtz',
  title: {
    default: 'runtz — Open source DevSecOps scans',
    template: '%s — runtz',
  },
  description: siteDescription,
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
    locale: 'en_US',
    title: 'runtz — Open source DevSecOps scans',
    description: siteDescription,
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef6ff' },
    { media: '(prefers-color-scheme: dark)', color: '#050912' },
  ],
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${brandMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

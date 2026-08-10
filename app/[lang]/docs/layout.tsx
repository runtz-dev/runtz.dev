import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsOptions } from '@/lib/layout.shared';
import { parseLocale } from '@/lib/i18n';

export default async function Layout({
  children,
  params,
}: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params;
  const locale = parseLocale(lang);

  return (
    <DocsLayout
      tree={source.getPageTree(locale)}
      containerProps={{ className: 'rz-docs-layout' }}
      {...docsOptions(locale)}
    >
      {children}
    </DocsLayout>
  );
}

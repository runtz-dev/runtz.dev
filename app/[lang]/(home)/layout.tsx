import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { parseLocale } from '@/lib/i18n';

export default async function Layout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  return <HomeLayout {...baseOptions(parseLocale(lang))}>{children}</HomeLayout>;
}

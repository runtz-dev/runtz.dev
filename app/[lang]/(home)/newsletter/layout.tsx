import './newsletter.css';

export const dynamic = 'force-dynamic';

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return <div className="nl-root">{children}</div>;
}

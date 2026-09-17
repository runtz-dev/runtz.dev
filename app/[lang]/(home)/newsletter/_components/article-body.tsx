'use client';

import { useEffect, useRef } from 'react';
import type { Locale } from '@/lib/i18n';
import { newsletterCopy } from '@/lib/newsletter-copy';

export function ArticleBody({ html, locale }: { html: string; locale: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  const copy = newsletterCopy[locale];
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const buttons: HTMLButtonElement[] = [];
    for (const pre of root.current?.querySelectorAll('pre') ?? []) {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'nl-copy-code'; button.textContent = copy.copy;
      button.onclick = async () => {
        try { await navigator.clipboard.writeText(pre.querySelector('code')?.textContent ?? ''); button.textContent = copy.copied; }
        catch { button.textContent = copy.copyFailed; }
        timers.push(setTimeout(() => { button.textContent = copy.copy; }, 2200));
      };
      pre.append(button); buttons.push(button);
    }
    return () => { timers.forEach(clearTimeout); buttons.forEach(button => button.remove()); };
  }, [copy, html]);
  // The Go service renders Markdown without raw HTML and sanitizes the result.
  return <div ref={root} className="nl-prose" dangerouslySetInnerHTML={{ __html: html }} />;
}

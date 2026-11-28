'use client';

import Link from 'next/link';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import type { LandingCopy } from '@/lib/landing-copy';
import { localizedPath, type Locale } from '@/lib/i18n';
import { docsRoute } from '@/lib/shared';
import { CopyCommandButton } from './copy-command-button';

const targets = [
  { id: 'unix', label: 'Linux & macOS' },
  { id: 'windows', label: 'Windows' },
] as const;

const words = {
  en: {
    title: 'Your workflow. Your choice.',
    body: 'Scan through the web interface, use the Go CLI, or automate scans in your CI/CD pipelines. Choose the workflow that fits your team.',
    install: 'Get started with the CLI',
    docs: 'Installation guide',
  },
  'pt-br': {
    title: 'Seu fluxo. Sua escolha.',
    body: 'Execute scans pela interface web, use a CLI em Go ou automatize seus pipelines de CI/CD. Escolha o fluxo que funciona para sua equipe.',
    install: 'Comece pela CLI',
    docs: 'Guia de instalação',
  },
  es: {
    title: 'Tu flujo. Tu elección.',
    body: 'Ejecuta análisis desde la interfaz web, usa la CLI en Go o automatízalos en tus pipelines de CI/CD. Elige el flujo que funciona para tu equipo.',
    install: 'Empieza con la CLI',
    docs: 'Guía de instalación',
  },
};

export function InstallJourney({ labels, locale }: {
  labels: LandingCopy['developerWorkflow'];
  locale: Locale;
}) {
  const [target, setTarget] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const copy = words[locale];
  const selected = targets[target];
  const command = selected.id === 'windows'
    ? 'irm https://runtz.dev/install.ps1 | iex'
    : 'curl -fsSL https://runtz.dev/install.sh | bash';

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % targets.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + targets.length) % targets.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = targets.length - 1;
    else return;
    event.preventDefault();
    setTarget(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid gap-8 text-[#071222] dark:text-[#f4f4f5] lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className="max-w-xl">
        <h2 className="text-3xl leading-tight font-semibold sm:text-4xl lg:text-[42px]">{copy.title}</h2>
        <p className="mt-5 text-base leading-7 text-[#53657d] dark:text-[#a8b5c6]">{copy.body}</p>
      </div>

      <div className="min-w-0">
        <h3 className="text-xl leading-7 font-medium">{copy.install}</h3>
        <div className="mt-4 mb-3">
          <div role="tablist" aria-label={labels.installMethodLabel} className="flex gap-2">
            {targets.map((item, index) => {
              return (
                <button
                  key={item.id}
                  ref={node => { tabs.current[index] = node; }}
                  type="button"
                  role="tab"
                  id={`${id}-${item.id}`}
                  aria-controls={`${id}-command`}
                  aria-selected={target === index}
                  tabIndex={target === index ? 0 : -1}
                  onClick={() => setTarget(index)}
                  onKeyDown={event => navigate(event, index)}
                  className={`inline-flex min-h-10 items-center rounded-sm border-b px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7eff] ${target === index ? 'border-current font-medium text-[#071222] dark:text-[#eaf4ff]' : 'border-transparent text-[#53657d] hover:text-[#071222] dark:text-[#8f9bab] dark:hover:text-white'}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div role="tabpanel" id={`${id}-command`} aria-labelledby={`${id}-${selected.id}`} tabIndex={0} className="flex min-h-16 items-center gap-3 rounded-lg border border-white/15 bg-black px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7eff] sm:px-5">
          <pre className="min-w-0 flex-1 whitespace-pre-wrap break-all font-mono text-sm leading-6 text-[#ededed]"><code><span aria-hidden="true" className="select-none text-[#7d8793]">{selected.id === 'windows' ? '> ' : '$ '}</span>{command}</code></pre>
          <CopyCommandButton key={selected.id} value={command} label={labels.copyCommand} copiedLabel={labels.copied} className="!text-[#a8b5c6]" />
        </div>
        <p className="mt-4 text-sm leading-6 text-[#53657d] dark:text-[#8f9bab]">
          <Link className="rounded-sm underline-offset-4 transition-colors hover:text-[#071222] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7eff] dark:hover:text-[#eaf4ff]" href={localizedPath(locale, docsRoute + '/install-cli')}>{copy.docs}</Link>
        </p>
      </div>
    </div>
  );
}

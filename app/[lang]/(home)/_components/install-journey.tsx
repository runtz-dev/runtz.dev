'use client';

import Link from 'next/link';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { Check, Download, KeyRound, ScanLine, Terminal, Upload } from 'lucide-react';
import type { LandingCopy } from '@/lib/landing-copy';
import type { InstallJourneyCopy } from '@/lib/landing-workflow-copy';
import { localizedPath, type Locale } from '@/lib/i18n';
import { docsRoute } from '@/lib/shared';
import { CopyCommandButton } from './copy-command-button';

const commands = {
  unix: 'curl -fsSL https://runtz.dev/install.sh | bash',
  windows: 'irm https://runtz.dev/install.ps1 | iex',
};
const stepIcons = [Download, KeyRound, ScanLine, Upload];
export const INSTALL_INTRO_MS = 3600;

export function InstallJourney({ copy, labels, locale, elapsed, phase, playing }: {
  copy: InstallJourneyCopy;
  labels: LandingCopy['developerWorkflow'];
  locale: Locale;
  elapsed: number;
  phase: 'scanning' | 'sending' | 'received';
  playing: boolean;
}) {
  const [target, setTarget] = useState<'unix' | 'windows'>('unix');
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const installed = elapsed >= 1500;
  const connected = elapsed >= INSTALL_INTRO_MS;
  const step = !installed ? 0 : !connected ? 1 : phase === 'received' || phase === 'sending' ? 3 : 2;
  const command = commands[target];
  const characters = installed ? command.length : Math.max(0, Math.floor((elapsed - 250) / 23));

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index;
    setTarget(next === 0 ? 'unix' : 'windows');
    tabs.current[next]?.focus();
  }

  return <div className="rz-install-journey relative border-b border-[#071222]/10 bg-white/35 dark:border-[#2c415c] dark:bg-[#0a111c]/65">
    <div className="grid items-center gap-7 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-9">
      <div>
        <p className="flex items-center gap-2 font-mono text-xs font-medium text-[#1d5fc7] dark:text-[#6db5ff]"><Terminal className="size-4" />{copy.eyebrow}</p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">{copy.title}</h3>
        <p className="mt-3 max-w-md text-base leading-7 text-[#53657d] dark:text-[#b8cbe4]">{copy.body}</p>
      </div>
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" aria-label={labels.installMethodLabel} className="inline-flex max-w-full gap-1 rounded-lg border border-[#071222]/10 bg-[#e5f0fb] p-1 dark:border-[#2c415c] dark:bg-[#0a111c]">
            {([['unix', labels.unixLabel], ['windows', labels.windowsLabel]] as const).map(([key, label], index) => <button
              key={key} ref={node => { tabs.current[index] = node; }} type="button" role="tab"
              id={`${id}-${key}`} aria-label={label} aria-controls={`${id}-command`} aria-selected={target === key} tabIndex={target === key ? 0 : -1}
              onClick={() => setTarget(key)} onKeyDown={event => navigate(event, index)}
              className={`min-h-9 rounded-md px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7eff] ${target === key ? 'bg-white text-[#1456b8] shadow-sm dark:bg-[#20334d] dark:text-[#d9edff]' : 'text-[#53657d] hover:text-[#1456b8] dark:text-[#9fb8d7] dark:hover:text-white'}`}><span className="sm:hidden">{key === 'windows' ? 'Windows' : label}</span><span className="hidden sm:inline">{label}</span></button>)}
          </div>
          <span aria-hidden="true" className={`flex items-center gap-1.5 text-xs text-[#16724e] transition-opacity dark:text-[#73dfac] ${installed ? 'opacity-100' : 'opacity-0'}`}><Check className="size-3.5" />{connected ? copy.connected : copy.ready}</span>
        </div>
        <div role="tabpanel" id={`${id}-command`} aria-labelledby={`${id}-${target}`} className="flex min-h-[76px] items-center gap-3 rounded-xl border border-[#33445d] bg-[#0b111c] px-4 py-4 text-[#f3f7ff] sm:px-5">
          <pre className="min-w-0 flex-1 whitespace-pre-wrap break-all font-mono text-xs leading-6 sm:text-sm"><code className="relative block"><span aria-hidden="true" className="invisible">$ {command}</span><span className="sr-only">$ {command}</span><span aria-hidden="true" className="absolute inset-0"><span className="select-none text-[#73dfac]">$ </span><span>{command.slice(0, characters)}</span>{!installed && <span className="rz-terminal-cursor ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-0.5 bg-[#d8e7fa]" style={{ animationPlayState: playing ? 'running' : 'paused' }} />}</span></code></pre>
          <CopyCommandButton value={command} label={labels.copyCommand} copiedLabel={labels.copied} className="!text-[#9fb8d7]" />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs leading-5 text-[#53657d] dark:text-[#9fb8d7]">
          <span>{copy.login} <code className="ml-1 text-[#1d5fc7] dark:text-[#b8d9ff]">runtz login</code></span>
          <Link className="underline decoration-[#6db5ff]/40 underline-offset-4 transition hover:text-[#2f7eff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7eff] dark:hover:text-[#9fd6ff]" href={localizedPath(locale, docsRoute + '/install-cli')}>{copy.docs}</Link>
        </div>
      </div>
    </div>
    <ol aria-label={copy.demo} className="grid grid-cols-4 border-t border-[#071222]/8 px-3 py-4 dark:border-white/6 sm:px-8 lg:px-9">
      {copy.steps.map((label, index) => {
        const done = index < step || index === 3 && phase === 'received';
        const active = index === step && !done;
        const Icon = done ? Check : stepIcons[index];
        return <li key={label} aria-current={active ? 'step' : undefined} className={`relative flex flex-col items-center gap-2 text-xs font-medium transition-colors sm:flex-row sm:gap-3 sm:text-sm ${done ? 'text-[#16724e] dark:text-[#73dfac]' : active ? 'text-[#1456b8] dark:text-[#b8d9ff]' : 'text-[#6c7c90] dark:text-[#7f96b3]'}`}>
          <span className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border bg-[#f1f7fe] transition-colors dark:bg-[#101b2b] ${done ? 'border-[#2ca577]/35' : active ? 'border-[#2f7eff]/60 dark:border-[#6db5ff]/65' : 'border-[#071222]/15 dark:border-[#2c415c]'}`}><Icon className="size-3.5" /></span>
          <span className="relative z-10 bg-[#f1f7fe] px-1 dark:bg-[#0c1522]">{label}</span>
          {index < 3 && <span aria-hidden="true" className="absolute top-4 right-0 left-[calc(50%+1.25rem)] h-px overflow-hidden bg-[#071222]/10 dark:bg-[#2c415c] sm:left-10"><span className={`block h-full origin-left bg-[#2f7eff] transition-transform duration-700 dark:bg-[#6db5ff] ${done ? 'scale-x-100' : 'scale-x-0'}`} /></span>}
        </li>;
      })}
    </ol>
  </div>;
}

'use client';

import { useState } from 'react';
import {
  Braces,
  ChevronDown,
  FileJson,
  Files,
  Folder,
  GitBranch,
  Search,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import type { LandingCopy } from '@/lib/landing-copy';
import { sitePath } from '@/lib/shared';
import { CopyCommandButton } from './copy-command-button';
import { WarpField } from './shaders';

const installCommands = {
  unix: 'curl -fsSL https://runtz.dev/install.sh | bash',
  windows: 'irm https://runtz.dev/install.ps1 | iex',
} as const;

type InstallTarget = keyof typeof installCommands;

function CliPanel({ copy }: { copy: LandingCopy['developerWorkflow'] }) {
  const [target, setTarget] = useState<InstallTarget>('unix');
  const command = installCommands[target];

  return (
    <article className="relative flex min-h-[430px] min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#071222]/10 bg-[#f7fbff]/88 p-6 text-[#071222] rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420]/90 dark:text-[#eaf4ff] sm:p-8">
      <WarpField
        speed={0.5}
        className="mask-[radial-gradient(120%_120%_at_92%_0%,#000,transparent_72%)]"
      />
      <div className="relative z-10 flex flex-1 flex-col">
        <h2 className="max-w-xl text-2xl font-semibold">
          {copy.cliTitle}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4] sm:text-base sm:leading-7">
          {copy.cliBody}
        </p>

        <div className="mt-6">
          <div
            role="tablist"
            aria-label={copy.installMethodLabel}
            className="inline-flex w-fit max-w-full gap-1 rounded-full border border-[#071222]/10 bg-[#e5f0fb] p-1 dark:border-[#223149] dark:bg-[#05070b]"
          >
            {([
              ['unix', copy.unixLabel],
              ['windows', copy.windowsLabel],
            ] as const).map(([id, label]) => {
              const active = target === id;

              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTarget(id)}
                  className={`min-h-10 rounded-full px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6db5ff] sm:px-6 ${
                    active
                      ? 'bg-[#6db5ff] text-[#071222] shadow-sm'
                      : 'text-[#53657d] hover:bg-white/70 hover:text-[#071222] dark:text-[#b8cbe4] dark:hover:bg-white/8 dark:hover:text-[#eaf4ff]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            className="mt-4 flex min-h-[142px] min-w-0 max-w-full items-start gap-4 rounded-xl border border-[#071222]/10 bg-[#f7fbff]/95 p-5 text-[#071222] shadow-sm dark:border-[#1c2a3f] dark:bg-black dark:text-[#ece7cf] sm:p-6"
          >
            <pre className="min-w-0 flex-1 whitespace-pre-wrap break-all font-mono text-xs leading-7 sm:overflow-x-auto sm:whitespace-pre sm:break-normal sm:text-sm">
              <code>
                <span className="select-none text-[#1d5fc7] dark:text-[#6db5ff]">$ </span>
                {command}
              </code>
            </pre>
            <CopyCommandButton
              value={command}
              label={copy.copyCommand}
              copiedLabel={copy.copied}
              className="!text-[#53657d] hover:!bg-[#2f7eff]/10 hover:!text-[#1d5fc7] dark:!text-[#9c9680] dark:hover:!bg-[#6db5ff]/10 dark:hover:!text-[#d9e9ff]"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function VsCodeMockup({ copy }: { copy: LandingCopy['developerWorkflow'] }) {
  return (
    <div
      className="relative mt-6 min-h-[276px] min-w-0 max-w-full flex-1 overflow-hidden rounded-2xl border border-white/15 bg-[#181818] text-[#cccccc] shadow-2xl shadow-[#071222]/35"
      aria-hidden="true"
    >
      <div className="flex h-9 items-center border-b border-[#2b2b2b] bg-[#202020] px-3 text-[10px] text-[#9d9d9d]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6f7d]" />
        <span className="ml-1.5 h-2.5 w-2.5 rounded-full bg-[#ffd269]" />
        <span className="ml-1.5 h-2.5 w-2.5 rounded-full bg-[#80d673]" />
        <span className="mx-auto pr-10">acme-api — Visual Studio Code</span>
      </div>

      <div className="grid h-[237px] grid-cols-[38px_126px_minmax(0,1fr)] sm:grid-cols-[42px_156px_minmax(0,1fr)]">
        <div className="flex flex-col items-center gap-4 border-r border-[#2b2b2b] bg-[#181818] py-3 text-[#858585]">
          <Files className="h-5 w-5 text-white" />
          <Search className="h-5 w-5" />
          <GitBranch className="h-5 w-5" />
          <div className="relative h-5 w-5">
            <span
              className="block h-5 w-5 bg-[#858585]"
              style={{
                WebkitMaskImage: `url(${sitePath('/brand/runtz-activitybar.svg')})`,
                WebkitMaskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskImage: `url(${sitePath('/brand/runtz-activitybar.svg')})`,
                maskPosition: 'center',
                maskRepeat: 'no-repeat',
                maskSize: 'contain',
              }}
            />
            <span className="absolute -right-1.5 -bottom-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full border border-[#181818] bg-[#464a55] px-0.5 font-sans text-[8px] font-semibold leading-none text-white">
              1
            </span>
          </div>
          <Settings className="mt-auto h-5 w-5" />
        </div>

        <div className="border-r border-[#2b2b2b] bg-[#181818] py-2 text-[10px] sm:text-[11px]">
          <div className="px-3 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-[#bbbbbb]">
            {copy.explorerLabel}
          </div>
          <div className="mt-1 flex items-center gap-1 px-2 py-1 font-semibold text-[#d4d4d4]">
            <ChevronDown className="h-3 w-3" />
            ACME-API
          </div>
          <div className="flex items-center gap-1.5 py-1 pl-6 pr-2 text-[#b7b7b7]">
            <Folder className="h-3.5 w-3.5 text-[#dcb67a]" />
            src
          </div>
          <div className="flex items-center gap-1.5 bg-[#37373d] py-1.5 pl-6 pr-2 text-white">
            <FileJson className="h-3.5 w-3.5 shrink-0 text-[#ffd269]" />
            <span>package.json</span>
          </div>
          <div className="flex items-center gap-1.5 py-1 pl-6 pr-2 text-[#b7b7b7]">
            <Braces className="h-3.5 w-3.5 text-[#6db5ff]" />
            tsconfig.json
          </div>
        </div>

        <div className="min-w-0 bg-[#1e1e1e] font-mono text-[9px] sm:text-[10px]">
          <div className="flex h-9 w-fit items-center gap-2 border-t border-t-[#6db5ff] bg-[#1e1e1e] px-3 text-[#d4d4d4]">
            <FileJson className="h-3.5 w-3.5 text-[#ffd269]" />
            package.json
          </div>
          <div className="space-y-1 px-4 py-4 text-[#d4d4d4]">
            <div><span className="mr-3 text-[#858585]">1</span>{'{'}</div>
            <div><span className="mr-3 text-[#858585]">2</span><span className="text-[#9cdcfe]">&quot;name&quot;</span>: <span className="text-[#ce9178]">&quot;acme-api&quot;</span>,</div>
            <div><span className="mr-3 text-[#858585]">3</span><span className="text-[#9cdcfe]">&quot;scripts&quot;</span>: {'{'}</div>
            <div className="pl-3"><span className="mr-3 text-[#858585]">4</span><span className="text-[#9cdcfe]">&quot;dev&quot;</span>: <span className="text-[#ce9178]">&quot;next dev&quot;</span></div>
            <div><span className="mr-3 text-[#858585]">5</span>{'}'},</div>
            <div><span className="mr-3 text-[#858585]">6</span><span className="text-[#9cdcfe]">&quot;dependencies&quot;</span>: {'{'}</div>
            <div className="pl-3"><span className="mr-3 text-[#858585]">7</span><span className="text-[#9cdcfe]">&quot;next&quot;</span>: <span className="text-[#ce9178]">&quot;16.2.6&quot;</span></div>
            <div><span className="mr-3 text-[#858585]">8</span>{'}'}</div>
            <div><span className="mr-3 text-[#858585]">9</span>{'}'}</div>
          </div>
        </div>
      </div>

      <div className="absolute left-[24%] top-[38%] w-[205px] overflow-hidden rounded-md border border-[#454545] bg-[#252526] py-1 text-[11px] text-[#d7d7d7] shadow-[0_16px_42px_rgba(0,0,0,0.55)] sm:left-[29%] sm:w-[230px]">
        <div className="flex items-center justify-between px-3 py-1.5">
          <span>{copy.contextMenu.open}</span>
          <span className="text-[9px] text-[#858585]">Enter</span>
        </div>
        <div className="px-3 py-1.5">{copy.contextMenu.openToSide}</div>
        <div className="px-3 py-1.5">{copy.contextMenu.copyPath}</div>
        <div className="my-1 border-t border-[#454545]" />
        <div className="mx-1 flex items-center gap-2 rounded-sm bg-[#094771] px-2 py-2 text-white">
          <ShieldCheck className="h-4 w-4 text-[#9fd6ff]" />
          <span className="font-medium">{copy.contextMenu.scan}</span>
        </div>
      </div>
    </div>
  );
}

function VsCodePanel({ copy }: { copy: LandingCopy['developerWorkflow'] }) {
  return (
    <article className="relative flex min-h-[430px] min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#071222]/10 bg-[#f7fbff]/88 p-6 text-[#071222] rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420]/90 dark:text-[#eaf4ff] sm:p-8">
      <WarpField
        speed={0.5}
        className="mask-[radial-gradient(120%_120%_at_92%_0%,#000,transparent_72%)]"
      />
      <div className="relative z-10 flex flex-1 flex-col">
        <h2 className="max-w-xl text-2xl font-semibold">
          {copy.vscodeTitle}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#53657d] dark:text-[#b8cbe4] sm:text-base sm:leading-7">
          {copy.vscodeBody}
        </p>
        <VsCodeMockup copy={copy} />
      </div>
    </article>
  );
}

export function DeveloperWorkflow({
  copy,
}: {
  copy: LandingCopy['developerWorkflow'];
}) {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-12">
      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
        <CliPanel copy={copy} />
        <VsCodePanel copy={copy} />
      </div>
    </section>
  );
}

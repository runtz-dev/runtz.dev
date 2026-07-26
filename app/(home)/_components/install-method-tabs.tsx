'use client';

import { useMemo, useState } from 'react';
import type { InstallOption } from '@/lib/platform-content';
import { CopyCommandButton } from './copy-command-button';
import { WarpField } from './shaders';

export function InstallMethodTabs({ options }: { options: InstallOption[] }) {
  const [selectedId, setSelectedId] = useState(options[0]?.id);
  const selected = useMemo(
    () => options.find((option) => option.id === selectedId) ?? options[0],
    [options, selectedId],
  );

  if (!selected) {
    return null;
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#071222]/10 bg-[#f7fbff]/70 p-4 text-[#071222] rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420] dark:text-[#ece7cf]">
      <WarpField
        speed={0.5}
        className="mask-[radial-gradient(130%_130%_at_88%_-5%,#000_18%,transparent_78%)]"
      />
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex justify-start">
          <div
            role="tablist"
            aria-label="Install method"
            className="inline-flex w-fit gap-1 rounded-full border border-[#071222]/10 bg-[#e5f0fb] p-1 dark:border-[#223149] dark:bg-[#05070b]"
          >
            {options.map((option) => {
              const active = option.id === selected.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedId(option.id)}
                  className={`min-h-10 rounded-full px-7 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6db5ff] ${
                    active
                      ? 'bg-[#6db5ff] text-[#071222] shadow-sm'
                      : 'text-[#53657d] hover:bg-white/70 hover:text-[#071222] dark:text-[#b8cbe4] dark:hover:bg-white/8 dark:hover:text-[#eaf4ff]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex-1 min-h-[200px] rounded-xl border border-[#071222]/10 bg-[#f7fbff]/95 p-4 text-[#071222] shadow-sm dark:border-[#1c2a3f] dark:bg-black dark:text-[#ece7cf]">
          <div className="flex items-start justify-between gap-4">
            <pre className="min-w-0 overflow-x-auto font-mono text-sm leading-7">
              <code>
                <span className="text-[#1d5fc7] dark:text-[#6db5ff]">$ </span>
                {selected.command}
              </code>
            </pre>
            <CopyCommandButton
              value={selected.command}
              className="!text-[#53657d] hover:!bg-[#2f7eff]/10 hover:!text-[#1d5fc7] dark:!text-[#9c9680] dark:hover:!bg-[#6db5ff]/10 dark:hover:!text-[#d9e9ff]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

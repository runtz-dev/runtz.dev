'use client';

import { Check, Cloud, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type HostingMode = 'cloud' | 'self-hosted';

type ComparisonColumn = {
  name: string;
};

type ComparisonRow = {
  feature: string;
  values: ComparisonCell[];
};

type ComparisonCell = {
  state: 'included' | 'not-included';
  label: string;
};

type ComparisonPreset = {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
};

const comparisonByMode: Record<HostingMode, ComparisonPreset> = {
  cloud: {
    columns: [{ name: 'Free' }, { name: 'Pro' }, { name: 'Enterprise' }],
    rows: [
      {
        feature: 'Security scans',
        values: [
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Cloud workspace',
        values: [
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Core dashboards',
        values: [
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Google and GitHub authentication',
        values: [
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Shared workspace',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Smart email reports',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Smart alerts',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'AI Alert Agent in Slack threads',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Multiple workspaces',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Dedicated Slack support',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
        ],
      },
    ],
  },
  'self-hosted': {
    columns: [{ name: 'Free' }, { name: 'Pro' }, { name: 'Enterprise' }],
    rows: [
      {
        feature: 'Security scans',
        values: [
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Self-hosted deployment',
        values: [
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Data stays in your infrastructure',
        values: [
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Core dashboards',
        values: [
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Shared workspace',
        values: [
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Google and GitHub authentication',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Smart email reports',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Smart alerts',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'AI Alert Agent in Slack threads',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Multiple workspaces',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
        ],
      },
      {
        feature: 'Dedicated Slack support',
        values: [
          { state: 'not-included', label: 'Not included' },
          { state: 'not-included', label: 'Not included' },
          { state: 'included', label: 'Included' },
        ],
      },
    ],
  },
};

const modeOptions = [
  { value: 'cloud', label: 'Cloud', icon: Cloud },
  { value: 'self-hosted', label: 'Self-hosted', icon: Server },
] satisfies { value: HostingMode; label: string; icon: LucideIcon }[];

export function HostingModeToggle({
  mode,
  onModeChange,
  ariaLabel = 'Choose hosting model',
}: {
  mode: HostingMode;
  onModeChange: (mode: HostingMode) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      role="group"
      className="inline-flex w-full rounded-full border border-[#071222]/10 bg-[#f7fbff]/70 p-1 shadow-sm dark:border-[#6db5ff]/15 dark:bg-[#101827] sm:w-auto"
      aria-label={ariaLabel}
    >
      {modeOptions.map((option) => {
        const Icon = option.icon;
        const isActive = mode === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onModeChange(option.value)}
            className={`inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7eff] dark:focus-visible:outline-[#6db5ff] sm:flex-none ${
              isActive
                ? 'bg-[#6db5ff] text-[#071222] shadow-sm shadow-[#071222]/10'
                : 'text-[#53657d] hover:bg-[#2f7eff]/10 hover:text-[#1d5fc7] dark:text-[#b8cbe4] dark:hover:bg-[#6db5ff]/10 dark:hover:text-[#eaf4ff]'
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function PlanComparison({
  mode,
}: {
  mode: HostingMode;
}) {
  const comparison = comparisonByMode[mode];

  return (
    <div>
      <div className="text-center">
        <h2 className="font-mono text-xs font-semibold uppercase text-[#2f7eff] dark:text-[#6db5ff]">
          Plan comparison
        </h2>
      </div>

      <div className="mt-8 hidden border-t border-[#071222]/10 dark:border-[#6db5ff]/12 lg:block">
        <div className="grid grid-cols-[minmax(180px,0.8fr)_repeat(3,minmax(0,1fr))]">
          <div className="py-5 pr-5" aria-hidden="true" />
          {comparison.columns.map((column) => (
            <div key={column.name} className="px-5 py-5 text-center">
              <p className="text-sm font-bold">{column.name}</p>
            </div>
          ))}
        </div>

        {comparison.rows.map((row) => (
          <div
            key={`${mode}-${row.feature}`}
            className="grid grid-cols-[minmax(180px,0.8fr)_repeat(3,minmax(0,1fr))] border-t border-[#071222]/10 dark:border-[#6db5ff]/12"
          >
            <div className="py-5 pr-5 text-sm font-semibold">{row.feature}</div>
            {row.values.map((cell, index) => (
              <div
                key={`${row.feature}-${comparison.columns[index]?.name ?? index}`}
                className="flex justify-center px-5 py-5"
              >
                <ComparisonCellStatus cell={cell} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-[#071222]/10 dark:border-[#6db5ff]/12 lg:hidden">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#071222]/10 dark:border-[#6db5ff]/12">
              <th
                scope="col"
                className="w-[46%] px-4 py-4 text-left font-mono text-[11px] font-semibold uppercase text-[#53657d] dark:text-[#7f96b3]"
              >
                Feature
              </th>
              {comparison.columns.map((column) => (
                <th key={column.name} scope="col" className="px-4 py-4 text-center font-bold">
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr
                key={`${mode}-${row.feature}`}
                className="border-b border-[#071222]/10 last:border-b-0 dark:border-[#6db5ff]/12"
              >
                <th
                  scope="row"
                  className="px-4 py-4 text-left font-mono text-[11px] font-semibold uppercase text-[#53657d] dark:text-[#7f96b3]"
                >
                  {row.feature}
                </th>
                {row.values.map((cell, index) => (
                  <td
                    key={`${row.feature}-${comparison.columns[index]?.name ?? index}`}
                    className="px-4 py-4 text-center"
                  >
                    <ComparisonCellStatus cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ComparisonCellStatus({ cell }: { cell: ComparisonCell }) {
  if (cell.state === 'not-included') {
    return (
      <div
        className="flex items-center justify-center text-sm leading-6 text-[#7f96b3]"
        title={cell.label}
        aria-label={cell.label}
      >
        <span className="font-mono text-xl leading-none">-</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center text-sm leading-6"
      title={cell.label}
      aria-label={cell.label}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[#35d07f]">
        <Check className="h-4 w-4 stroke-[2.4]" />
      </span>
    </div>
  );
}

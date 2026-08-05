'use client';

import { useEffect, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Box,
  Boxes,
  ChartNoAxesCombined,
  ChevronRight,
  Code,
  Container,
  ScanLine,
  Server,
  Shield,
  ShipWheel,
} from 'lucide-react';

const screens = [
  { id: 'overview', label: 'Overview' },
  { id: 'sca', label: 'Scan type' },
  { id: 'detail', label: 'Details' },
] as const;

type ScreenId = (typeof screens)[number]['id'];

const severityColors = {
  critical: '#ff6f7d',
  high: '#ff9a68',
  medium: '#ffd269',
  low: '#6db5ff',
};

const apps = [
  ['payments-api', '5', '0', '0', '4', '1'],
  ['auth-service', '6', '0', '4', '2', '0'],
  ['data-pipeline', '8', '0', '1', '6', '1'],
  ['mobile-bff', '10', '1', '2', '5', '2'],
] as const;

const findings = [
  ['axios', 'CVE-2025-27152', 'critical', '1.7.4', '1.8.2'],
  ['path-to-regexp', 'CVE-2024-45296', 'high', '0.1.7', '0.1.10'],
  ['semver', 'CVE-2023-26115', 'medium', '7.5.2', '7.5.4'],
  ['vite', 'CVE-2024-45812', 'low', '5.x', '5.4.15'],
] as const;

function SeverityStrip({
  values,
  compact = false,
}: {
  values: readonly string[];
  compact?: boolean;
}) {
  const total = values.reduce((sum, value) => sum + Number(value), 0);

  return (
    <div className={compact ? 'w-28 sm:w-36' : 'w-full'}>
      <div className="rz-console-track flex h-2 overflow-hidden rounded-full">
        {values.map((value, index) => (
          <span
            key={`${value}-${index}`}
            style={{
              width: total ? `${(Number(value) / total) * 100}%` : '0%',
              backgroundColor: Object.values(severityColors)[index],
            }}
          />
        ))}
      </div>
      {!compact && (
        <div className="mt-2 grid grid-cols-4 gap-1 font-mono text-[8px]">
          {values.map((value, index) => (
            <span
              key={`${value}-label-${index}`}
              style={{ color: Object.values(severityColors)[index] }}
            >
              {value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ConsoleSidebar({ active }: { active: ScreenId }) {
  return (
    <aside className="rz-console-sidebar hidden w-[118px] shrink-0 border-r p-3 sm:block">
      <div className="rz-console-title flex items-center gap-2 text-[10px] font-bold">
        <span className="rz-console-accent flex h-5 w-5 items-center justify-center rounded bg-[#071222]">
          ▲
        </span>
        runtz
      </div>
      <p className="rz-console-muted mt-1 pl-7 text-[8px]">DevSecOps Platform</p>

      <div className="rz-console-muted mt-6 space-y-1 text-[9px]">
        <div
          className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
            active === 'overview' ? 'rz-console-active' : ''
          }`}
        >
          <Shield className="h-3 w-3" />
          Overview
        </div>
        <p className="rz-console-subtle px-2 pt-3 font-mono text-[8px] uppercase">Code</p>
        <div
          className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
            active !== 'overview' ? 'rz-console-active' : ''
          }`}
        >
          <Boxes className="h-3 w-3" />
          SCA
        </div>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Code className="h-3 w-3" />
          SAST
        </div>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <ScanLine className="h-3 w-3" />
          DAST
        </div>
        <p className="rz-console-subtle px-2 pt-3 font-mono text-[8px] uppercase">Hosts</p>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Container className="h-3 w-3" />
          Containers
        </div>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Server className="h-3 w-3" />
          Hosts
        </div>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <ShipWheel className="h-3 w-3" />
          Kubernetes
        </div>
      </div>
    </aside>
  );
}

function ConsoleHeader() {
  return (
    <div className="rz-console-header flex h-9 shrink-0 items-center gap-1.5 border-b px-3">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff6f5e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#6db5ff]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#80d673]" />
      <span className="rz-console-muted ml-auto font-mono text-[9px]">
        workspace/default
      </span>
    </div>
  );
}

function MiniAreaChart({ overview = false }: { overview?: boolean }) {
  return (
    <svg
      viewBox="0 0 440 124"
      className="mt-2 h-[86px] w-full"
      aria-label={overview ? 'Vulnerability trend' : 'Scans per day'}
      role="img"
      preserveAspectRatio="none"
    >
      <path className="rz-console-chart-grid" d="M0 26H440M0 62H440M0 98H440" strokeWidth="1" />
      {overview ? (
        <>
          <path
            d="M0 94L35 75L70 83L105 48L140 61L175 42L210 68L245 52L280 58L315 36L350 50L385 28L420 43L440 39V124H0Z"
            fill="#ffd269"
            fillOpacity=".18"
          />
          <path
            d="M0 58L35 41L70 52L105 20L140 36L175 26L210 47L245 34L280 41L315 20L350 34L385 13L420 27L440 24"
            fill="none"
            stroke="#ff6f7d"
            strokeWidth="2"
          />
          <path
            d="M0 94L35 75L70 83L105 48L140 61L175 42L210 68L245 52L280 58L315 36L350 50L385 28L420 43L440 39"
            fill="none"
            stroke="#ffd269"
            strokeWidth="2"
          />
          <path
            d="M0 111L35 101L70 109L105 94L140 104L175 91L210 106L245 97L280 102L315 86L350 93L385 82L420 97L440 91"
            fill="none"
            stroke="#6db5ff"
            strokeWidth="2"
          />
        </>
      ) : (
        <>
          <path
            d="M0 95L55 95L55 55L110 55L110 71L165 71L165 44L220 44L220 60L275 60L275 37L330 37L330 52L385 52L385 25L440 25V124H0Z"
            fill="#6db5ff"
            fillOpacity=".2"
          />
          <path
            d="M0 95L55 95L55 55L110 55L110 71L165 71L165 44L220 44L220 60L275 60L275 37L330 37L330 52L385 52L385 25L440 25"
            fill="none"
            stroke="#6db5ff"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}

function ScreenTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="rz-console-accent font-mono text-[8px] uppercase tracking-[0.18em]">
        {eyebrow}
      </p>
      <h3 className="rz-console-title mt-1 text-sm font-semibold sm:text-base">{title}</h3>
      <p className="rz-console-muted mt-0.5 text-[9px]">{description}</p>
    </div>
  );
}

function OverviewScreen() {
  const stats = [
    ['33', 'Assets'],
    ['150', 'Scans'],
    ['158', 'Vulnerabilities'],
    ['39', 'Critical/High'],
  ];

  return (
    <div className="h-full overflow-hidden px-3 pb-16 pt-3 sm:px-4">
      <ScreenTitle
        eyebrow="Platform / Overview"
        title="Overview"
        description="Scans and vulnerabilities across all assets."
      />
      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label} className="rz-console-card rounded-lg border p-2.5">
            <p className="rz-console-title text-lg font-semibold">{value}</p>
            <p className="rz-console-muted text-[8px]">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 grid gap-2 lg:grid-cols-[1.45fr_0.55fr]">
        <div className="rz-console-card rounded-lg border p-2.5">
          <div className="rz-console-title flex items-center gap-1.5 text-[10px] font-semibold">
            <Activity className="rz-console-accent h-3.5 w-3.5" />
            Vulnerability trend
          </div>
          <MiniAreaChart overview />
        </div>
        <div className="rz-console-card hidden rounded-lg border p-2.5 lg:block">
          <p className="rz-console-title text-[10px] font-semibold">Severities</p>
          <p className="rz-console-muted mt-1 text-[8px]">Latest scans</p>
          <div className="mt-6">
            <SeverityStrip values={['14', '25', '97', '22']} />
          </div>
        </div>
      </div>
      <div className="mt-2 hidden grid-cols-3 gap-2 lg:grid">
        {[
          [Shield, 'SCA', '14 assets'],
          [Box, 'Container scanning', '14 assets'],
          [Server, 'Host scanning', '5 assets'],
        ].map(([Icon, label, meta]) => (
          <div
            key={label as string}
            className="rz-console-card flex items-center gap-2 rounded-lg border p-2"
          >
            <Icon className="rz-console-accent h-3.5 w-3.5" />
            <div>
              <p className="rz-console-title text-[9px] font-semibold">{label as string}</p>
              <p className="rz-console-muted text-[8px]">{meta as string}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScanTypeScreen() {
  return (
    <div className="h-full overflow-hidden px-3 pb-16 pt-3 sm:px-4">
      <div className="flex items-start justify-between gap-3">
        <ScreenTitle
          eyebrow="Code / SCA"
          title="Apps"
          description="Application dependencies per workspace."
        />
        <span className="rz-console-badge rounded-full border px-2 py-1 font-mono text-[8px]">
          14 assets
        </span>
      </div>
      <div className="rz-console-card mt-3 overflow-hidden rounded-lg border">
        <div className="rz-console-divider rz-console-subtle grid grid-cols-[1fr_auto] gap-3 border-b px-3 py-2 text-[8px] font-semibold uppercase tracking-wide">
          <span>App</span>
          <span>Vulnerabilities</span>
        </div>
        {apps.map(([name, total, critical, high, medium, low]) => (
          <div
            key={name}
            className={`rz-console-divider grid grid-cols-[1fr_auto] items-center gap-3 border-b px-3 py-2 last:border-none ${
              name === 'mobile-bff' ? 'rz-console-active' : ''
            }`}
          >
            <div className="min-w-0">
              <div className="rz-console-accent flex items-center gap-1 text-[10px] font-semibold">
                <span className="truncate">{name}</span>
                <ChevronRight className="h-3 w-3 shrink-0" />
              </div>
              <p className="rz-console-muted mt-1 text-[8px]">Runtz Playground · {total} vulns</p>
            </div>
            <div>
              <SeverityStrip values={[critical, high, medium, low]} compact />
              <div className="rz-console-muted mt-1 grid grid-cols-4 text-center font-mono text-[7px]">
                <span>{critical}</span>
                <span>{high}</span>
                <span>{medium}</span>
                <span>{low}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailScreen() {
  return (
    <div className="h-full overflow-hidden px-3 pb-16 pt-3 sm:px-4">
      <div className="flex items-start justify-between gap-3">
        <ScreenTitle
          eyebrow="SCA / Apps"
          title="mobile-bff"
          description="Latest scan on May 29, 2026, 5:18 AM"
        />
        <span className="rz-console-badge rounded-full border px-2 py-1 font-mono text-[8px]">
          scan received
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ['5', 'dependencies'],
          ['10', 'vulnerabilities'],
          ['4', 'scans'],
        ].map(([value, label]) => (
          <div key={label} className="rz-console-card rounded-lg border p-2">
            <p className="rz-console-title text-base font-semibold">{value}</p>
            <p className="rz-console-muted text-[8px]">{label}</p>
          </div>
        ))}
      </div>
      <div className="rz-console-card mt-2 overflow-hidden rounded-lg border">
        <div className="rz-console-divider flex items-center justify-between border-b px-3 py-2">
          <p className="rz-console-title text-[10px] font-semibold">CVEs found</p>
          <ChartNoAxesCombined className="rz-console-accent h-3.5 w-3.5" />
        </div>
        <div className="rz-console-divider rz-console-subtle grid grid-cols-[1fr_auto] gap-3 border-b px-3 py-1.5 text-[8px] uppercase tracking-wide">
          <span>Package / ID</span>
          <span>Fix</span>
        </div>
        {findings.map(([pkg, id, severity, version, fix]) => (
          <div
            key={id}
            className="rz-console-divider grid grid-cols-[1fr_auto] items-center gap-3 border-b px-3 py-1.5 last:border-none"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="rz-console-title truncate text-[9px] font-semibold">{pkg}</p>
                <span
                  className="rounded-full border px-1.5 py-0.5 font-mono text-[7px]"
                  style={{
                    borderColor: severityColors[severity as keyof typeof severityColors],
                    color: severityColors[severity as keyof typeof severityColors],
                  }}
                >
                  {severity}
                </span>
              </div>
              <p className="rz-console-accent mt-0.5 truncate font-mono text-[8px]">{id}</p>
            </div>
            <p className="rz-console-muted font-mono text-[8px]">
              {version} <ArrowUpRight className="rz-console-accent inline h-2.5 w-2.5" /> {fix}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardScreen({ active }: { active: ScreenId }) {
  if (active === 'sca') return <ScanTypeScreen />;
  if (active === 'detail') return <DetailScreen />;

  return <OverviewScreen />;
}

export function ProductConsole() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = screens[activeIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (paused || reducedMotion.matches) return;

    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % screens.length);
      setCycleKey((key) => key + 1);
    }, 6000);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, cycleKey, paused]);

  function selectScreen(index: number) {
    setActiveIndex(index);
    setCycleKey((key) => key + 1);
  }

  return (
    <div
      className="relative h-[430px] overflow-hidden rounded-[22px] border border-[#071222]/10 bg-[#d9e9ff] p-1.5 rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420] sm:h-[460px] sm:p-2 lg:h-[500px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="rz-console relative flex h-full overflow-hidden rounded-[17px] border shadow-2xl shadow-[#071222]/20 dark:shadow-[#071222]/30">
        <ConsoleSidebar active={active.id} />
        <div className="min-w-0 flex-1">
          <ConsoleHeader />
          <div key={`${active.id}-${cycleKey}`} className="rz-console-screen h-[calc(100%-2.25rem)]">
            <DashboardScreen active={active.id} />
          </div>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Dashboard levels"
        className="absolute bottom-5 left-1/2 z-20 flex w-[calc(100%-2.5rem)] max-w-[430px] -translate-x-1/2 gap-1 rounded-full border border-white/15 bg-[#eef6ff] p-1 shadow-xl shadow-[#050912]/30"
      >
        {screens.map((screen, index) => {
          const selected = screen.id === active.id;

          return (
            <button
              key={screen.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectScreen(index)}
              className={`relative min-h-9 flex-1 overflow-hidden rounded-full px-2 text-[11px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6db5ff] sm:text-xs ${
                selected
                  ? 'bg-[#2f7eff] text-white shadow-sm'
                  : 'text-[#53657d] hover:bg-[#d9e9ff] hover:text-[#102238]'
              }`}
            >
              <span className="relative z-10">{screen.label}</span>
              {selected && (
                <span
                  key={`${screen.id}-progress-${cycleKey}`}
                  aria-hidden="true"
                  className={`rz-console-progress absolute inset-x-2 bottom-1 h-0.5 origin-left rounded-full bg-white/70 ${
                    paused ? '[animation-play-state:paused]' : ''
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

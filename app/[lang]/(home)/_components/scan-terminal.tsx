'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { useDemoClock } from './use-demo-clock';

export type ScanPhase = 'scanning' | 'sending' | 'received';

type OutputLine = {
  text: string;
  tone?: 'muted' | 'warning' | 'success';
  after: number;
};

type TerminalDemo = {
  title: string;
  command: string;
  output: OutputLine[];
};

function cloudDemo(provider: 'gcp' | 'aws' | 'azure', cloud: string, checks: number, findings: number): TerminalDemo {
  return {
    title: cloud,
    command: `runtz ${provider}`,
    output: [
      { text: 'Running private checks on Runtz Security...', tone: 'muted', after: 250 },
      { text: `Cloud: ${cloud}`, after: 850 },
      { text: `Checks: ${checks}`, after: 1500 },
      { text: `Findings: ${findings}`, tone: 'warning', after: 1750 },
      { text: 'Sending findings and coverage to Runtz...', tone: 'muted', after: 2150 },
      { text: `✓ ${provider.toUpperCase()} scan completed and sent.`, tone: 'success', after: 2850 },
    ],
  };
}

export const cloudDemos = [
  cloudDemo('gcp', 'Google Cloud', 32, 4),
  cloudDemo('aws', 'Amazon Web Services', 18, 6),
  cloudDemo('azure', 'Microsoft Azure', 14, 3),
];

// Illustrative output uses supported CLI commands and the fields they report.
// DAST deliberately has no demo while its CLI command is unavailable.
export const scanDemos: (TerminalDemo | null)[] = [
  {
    title: 'dependencies',
    command: 'runtz sca ./',
    output: [
      { text: 'Reading dependency manifests...', tone: 'muted', after: 250 },
      { text: 'Analyzing dependency vulnerabilities...', tone: 'muted', after: 850 },
      { text: 'Project: acme-api', after: 1500 },
      { text: 'Manifests: 3 · Dependencies: 124', after: 1750 },
      { text: 'Vulnerabilities: 18', tone: 'warning', after: 2150 },
      { text: '✓ SCA scan completed and sent.', tone: 'success', after: 2850 },
    ],
  },
  {
    title: 'container image',
    command: 'runtz container nginx:1.25-alpine',
    output: [
      { text: 'Reading image layers...', tone: 'muted', after: 250 },
      { text: 'Analyzing package vulnerabilities...', tone: 'muted', after: 850 },
      { text: 'Image: nginx:1.25-alpine', after: 1500 },
      { text: 'Packages: 46', after: 1750 },
      { text: 'Vulnerabilities: 8', tone: 'warning', after: 2150 },
      { text: '✓ Container scan completed and sent.', tone: 'success', after: 2850 },
    ],
  },
  {
    title: 'host packages',
    command: 'runtz host',
    output: [
      { text: 'Reading installed packages...', tone: 'muted', after: 250 },
      { text: 'Analyzing package vulnerabilities...', tone: 'muted', after: 850 },
      { text: 'Hostname: api-01', after: 1500 },
      { text: 'OS: Ubuntu 22.04 · Packages: 182', after: 1750 },
      { text: 'Vulnerabilities: 12', tone: 'warning', after: 2150 },
      { text: '✓ Host scan completed and sent.', tone: 'success', after: 2850 },
    ],
  },
  {
    title: 'source code',
    command: 'runtz sast ./',
    output: [
      { text: 'Scanning source files...', tone: 'muted', after: 250 },
      { text: 'Evaluating source security rules...', tone: 'muted', after: 850 },
      { text: 'Project: acme-api', after: 1500 },
      { text: 'Files: 284', after: 1750 },
      { text: 'Findings: 6', tone: 'warning', after: 2150 },
      { text: '✓ SAST scan completed and sent.', tone: 'success', after: 2850 },
    ],
  },
  null,
  {
    title: 'kubernetes cluster',
    command: 'runtz k8s',
    output: [
      { text: 'Reading cluster resources...', tone: 'muted', after: 250 },
      { text: 'Checking workloads and pod security...', tone: 'muted', after: 850 },
      { text: 'Target: current cluster', after: 1500 },
      { text: 'Resources: 28', after: 1750 },
      { text: 'Findings: 9', tone: 'warning', after: 2150 },
      { text: '✓ Kubernetes scan completed and sent.', tone: 'success', after: 2850 },
    ],
  },
  cloudDemos[0],
];

export const SCAN_ROTATION_MS = 8500;

const terminalCopy = {
  en: { demo: 'CLI example', description: 'Illustrative command and scan results' },
  'pt-br': { demo: 'Exemplo CLI', description: 'Exemplo de comando e resultados de um scan' },
  es: { demo: 'Ejemplo CLI', description: 'Ejemplo de comando y resultados de un scan' },
};

const tones = {
  muted: 'text-[#93a4bc]',
  warning: 'text-[#f5c76c]',
  success: 'text-[#73dfac]',
};

export function ScanTerminal({
  demo,
  locale,
  playing,
  reducedMotion,
  onPhaseChange,
}: {
  demo: TerminalDemo;
  locale: Locale;
  playing: boolean;
  reducedMotion: boolean;
  onPhaseChange?: (phase: ScanPhase) => void;
}) {
  const typingStart = 250;
  const typingEnd = typingStart + demo.command.length * 35;
  const completeAt = typingEnd + demo.output.at(-1)!.after;
  const time = useDemoClock({ duration: completeAt, playing, reducedMotion });
  const complete = time >= completeAt;
  const characters = Math.max(0, Math.floor((time - typingStart) / 35));
  const copy = terminalCopy[locale];
  const phase: ScanPhase = complete ? 'received' : time >= completeAt - 650 ? 'sending' : 'scanning';
  const output = demo.output.some(line => line.text.startsWith('Sending')) ? demo.output : [
    ...demo.output.slice(0, -1),
    { text: 'Sending results to runtz...', tone: 'muted' as const, after: demo.output.at(-1)!.after - 650 },
    demo.output.at(-1)!,
  ];

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  return (
    <figure className="rz-scan-terminal rz-scan-content min-w-0 w-full overflow-hidden rounded-xl border border-[#33445d] bg-[#0b111c] text-[#eaf4ff] shadow-[0_16px_48px_-24px_rgba(0,0,0,0.65)]">
      <figcaption className="flex min-h-10 items-center gap-3 border-b border-white/8 bg-white/[0.035] px-4">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="size-1.5 rounded-full bg-[#526178]" />
          <span className="size-1.5 rounded-full bg-[#526178]" />
          <span className="size-1.5 rounded-full bg-[#526178]" />
        </span>
        <span className="truncate font-mono text-[10px] text-[#9db0cc]">{demo.title}</span>
        <span className="ml-auto shrink-0 text-[10px] text-[#9db0cc]">{copy.demo}</span>
      </figcaption>
      {/* Static equivalent avoids announcing every typed character and output line. */}
      <pre className="sr-only">{copy.description}{'\n$ '}{demo.command}{'\n'}{output.map(line => line.text).join('\n')}</pre>
      <div aria-hidden="true" className="h-[352px] overflow-y-auto px-4 py-5 font-mono text-xs leading-[22px] sm:h-[300px] sm:px-5 lg:h-[268px] lg:px-6 lg:py-4 lg:leading-5">
        <div className="mb-4 flex items-start gap-2 text-[#f3f7ff] lg:mb-3">
          <span className="select-none text-[#73dfac]">$</span>
          <div className="min-w-0 flex-1 break-words [overflow-wrap:anywhere]">
            <span>{demo.command.slice(0, characters)}</span>
            {time < typingEnd && <span className="rz-terminal-cursor ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-0.5 bg-[#d8e7fa]" style={{ animationPlayState: playing ? 'running' : 'paused' }} />}
          </div>
        </div>
        <div className="space-y-1.5 lg:space-y-1">
          {output.map(line => {
            const shown = time >= typingEnd + line.after;
            return (
              <p key={line.text} className={`${line.tone ? tones[line.tone] : 'text-[#d3deee]'} break-words transition-[opacity,transform] duration-200 motion-reduce:transition-none ${shown ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}>
                {line.text}
              </p>
            );
          })}
        </div>
        <div className={`mt-4 flex items-center gap-2 transition-opacity duration-200 motion-reduce:transition-none lg:mt-3 ${complete ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-[#73dfac]">$</span>
          <span className="inline-block h-[1em] w-[0.5em] bg-[#d8e7fa]" />
        </div>
      </div>
    </figure>
  );
}

// Keep cloud examples moving while the visitor hovers or reads the panel.
// Advance the main selector only after Azure finishes and rotation is allowed.
export function CloudScanTerminal({
  locale,
  playing,
  reducedMotion,
  onCycleComplete,
  onPhaseChange,
}: {
  locale: Locale;
  playing: boolean;
  reducedMotion: boolean;
  onCycleComplete: () => boolean;
  onPhaseChange?: (phase: ScanPhase) => void;
}) {
  const [providerIndex, setProviderIndex] = useState(0);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = setTimeout(() => {
      if (providerIndex === cloudDemos.length - 1 && onCycleComplete()) return;
      setProviderIndex(index => (index + 1) % cloudDemos.length);
    }, SCAN_ROTATION_MS);
    return () => clearTimeout(timer);
  }, [providerIndex, playing, reducedMotion, onCycleComplete]);

  return <ScanTerminal key={providerIndex} demo={cloudDemos[providerIndex]} locale={locale} playing={playing} reducedMotion={reducedMotion} onPhaseChange={onPhaseChange} />;
}

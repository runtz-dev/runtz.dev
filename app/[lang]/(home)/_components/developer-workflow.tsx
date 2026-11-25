'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  Braces,
  ChevronDown,
  FileJson,
  Files,
  Folder,
  GitBranch,
  MousePointer2,
  Search,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import type { LandingCopy } from '@/lib/landing-copy';
import type { Locale } from '@/lib/i18n';
import { sitePath } from '@/lib/shared';
import { AiWorkflowPanel } from './ai-workflow-panel';
import { WarpField } from './shaders';

function VsCodeMockup({ copy, enabled }: { copy: LandingCopy['developerWorkflow']; enabled: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const manifest = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const scan = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<CSSProperties>();
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    // Measure the actual targets so the pointer still lands correctly on mobile
    // and when translated menu labels change the menu's dimensions.
    function measure() {
      if (!element || !manifest.current || !menu.current || !scan.current) return;
      const bounds = element.getBoundingClientRect();
      const fileBounds = manifest.current.getBoundingClientRect();
      const menuBounds = menu.current.getBoundingClientRect();
      const scanBounds = scan.current.getBoundingClientRect();
      const fileX = fileBounds.left - bounds.left - element.clientLeft + fileBounds.width * 0.6;
      const fileY = fileBounds.top - bounds.top - element.clientTop + fileBounds.height / 2;
      const menuX = Math.max(8, Math.min(fileX + 4, element.clientWidth - menuBounds.width - 8));
      const menuY = Math.max(8, Math.min(fileY + 4, element.clientHeight - menuBounds.height - 8));
      setGeometry({
        '--rz-vscode-start-x': `${element.clientWidth - 48}px`,
        '--rz-vscode-start-y': '68px',
        '--rz-vscode-file-x': `${fileX}px`,
        '--rz-vscode-file-y': `${fileY}px`,
        '--rz-vscode-menu-x': `${menuX}px`,
        '--rz-vscode-menu-y': `${menuY}px`,
        '--rz-vscode-scan-x': `${menuX + scanBounds.left - menuBounds.left + scanBounds.width * 0.65}px`,
        '--rz-vscode-scan-y': `${menuY + scanBounds.top - menuBounds.top + scanBounds.height / 2}px`,
      } as CSSProperties);
    }

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    if (menu.current) resize.observe(menu.current);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(element);
    const updateHidden = () => setHidden(document.hidden);
    updateHidden();
    document.addEventListener('visibilitychange', updateHidden);
    return () => {
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateHidden);
    };
  }, []);

  return (
    <div
      ref={root}
      style={geometry}
      data-playing={enabled && visible && !hidden && !!geometry}
      className="rz-vscode-demo pointer-events-none relative mt-6 min-h-[300px] min-w-0 max-w-full flex-1 overflow-hidden rounded-2xl border border-white/15 bg-[#181818] text-[#cccccc] shadow-2xl shadow-[#071222]/35"
      aria-hidden="true"
    >
      <div className="rz-vscode-canvas absolute inset-0 flex min-h-0 flex-col">
        <div className="flex h-9 shrink-0 items-center border-b border-[#2b2b2b] bg-[#202020] px-3 text-[10px] text-[#9d9d9d]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6f7d]" />
          <span className="ml-1.5 h-2.5 w-2.5 rounded-full bg-[#ffd269]" />
          <span className="ml-1.5 h-2.5 w-2.5 rounded-full bg-[#80d673]" />
          <span className="mx-auto pr-10">acme-api — Visual Studio Code</span>
        </div>

        <div className="rz-vscode-workspace grid min-h-0 flex-1 grid-cols-[38px_126px_minmax(0,1fr)] sm:grid-cols-[42px_156px_minmax(0,1fr)]">
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
            <div ref={manifest} className="rz-vscode-manifest flex items-center gap-1.5 py-1.5 pl-6 pr-2 text-white">
              <FileJson className="h-3.5 w-3.5 shrink-0 text-[#ffd269]" />
              <span>package.json</span>
            </div>
            <div className="flex items-center gap-1.5 py-1 pl-6 pr-2 text-[#b7b7b7]">
              <Braces className="h-3.5 w-3.5 text-[#6db5ff]" />
              tsconfig.json
            </div>
          </div>

          <div className="min-h-0 min-w-0 overflow-hidden bg-[#1e1e1e] font-mono text-[9px] sm:text-[10px]">
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
              <div className="pl-3"><span className="mr-3 text-[#858585]">7</span><span className="text-[#9cdcfe]">&quot;next&quot;</span>: <span className="text-[#ce9178]">&quot;16.2.6&quot;</span>,</div>
              <div className="pl-3"><span className="mr-3 text-[#858585]">8</span><span className="text-[#9cdcfe]">&quot;axios&quot;</span>: <span className="text-[#ce9178]">&quot;1.7.4&quot;</span></div>
              <div><span className="mr-3 text-[#858585]">9</span>{'}'}</div>
              <div><span className="mr-3 text-[#858585]">10</span>{'}'}</div>
            </div>
          </div>
        </div>

        <div ref={menu} className="rz-vscode-menu absolute z-10 w-[205px] max-w-[calc(100%-16px)] overflow-hidden rounded-md border border-[#454545] bg-[#252526] py-1 text-[11px] text-[#d7d7d7] shadow-[0_16px_42px_rgba(0,0,0,0.55)] sm:w-[230px]">
          <div className="flex items-center justify-between px-3 py-1.5">
            <span>{copy.contextMenu.open}</span>
            <span className="text-[9px] text-[#858585]">Enter</span>
          </div>
          <div className="px-3 py-1.5">{copy.contextMenu.openToSide}</div>
          <div className="px-3 py-1.5">{copy.contextMenu.copyPath}</div>
          <div className="my-1 border-t border-[#454545]" />
          <div ref={scan} className="rz-vscode-scan-action mx-1 flex items-center gap-2 rounded-sm px-2 py-2 text-white">
            <ShieldCheck className="h-4 w-4 text-[#9fd6ff]" />
            <span className="font-medium">{copy.contextMenu.scan}</span>
          </div>
        </div>
        <span className="rz-vscode-click rz-vscode-file-click absolute z-20 size-7 rounded-full border-2 border-[#9fd6ff] bg-[#6db5ff]/15" />
        <span className="rz-vscode-click rz-vscode-scan-click absolute z-20 size-7 rounded-full border-2 border-[#9fd6ff] bg-[#6db5ff]/15" />
        <MousePointer2 className="rz-vscode-pointer absolute top-0 left-0 z-30 size-6 fill-white text-[#101827] drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]" strokeWidth={1.4} />
        <div className="rz-vscode-notification absolute right-3 bottom-3 z-10 flex max-w-[calc(100%-24px)] items-center gap-2.5 rounded-md border border-[#73dfac]/30 bg-[#182824] px-3 py-2.5 text-xs text-[#b8f2d5] shadow-lg">
          <ShieldCheck className="size-4 shrink-0 text-[#73dfac]" />
          <div className="min-w-0"><p className="font-medium">{copy.scanSent}</p><p className="mt-0.5 font-mono text-[10px] text-[#a7bcb3]">package.json</p></div>
        </div>
      </div>
    </div>
  );
}

function VsCodePanel({ copy, autoStart }: { copy: LandingCopy['developerWorkflow']; autoStart: boolean }) {
  const [replayKey, setReplayKey] = useState(0);
  const [manualStart, setManualStart] = useState(false);

  function replay() {
    setManualStart(true);
    setReplayKey(value => value + 1);
  }

  return (
    <a
      href="https://marketplace.visualstudio.com/items?itemName=Runtz.runtz-security"
      target="_blank"
      rel="noreferrer noopener"
      onPointerEnter={event => { if (event.pointerType === 'mouse') replay(); }}
      onFocus={replay}
      className="rz-vscode-card relative flex min-h-[430px] min-w-0 cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#071222]/10 bg-[#f7fbff]/88 p-6 text-[#071222] rz-soft-shadow transition-[border-color,box-shadow] duration-300 hover:border-[#2f7eff]/45 hover:shadow-[0_18px_48px_-24px_rgba(47,126,255,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7eff] dark:border-[#213047] dark:bg-[#0d1420]/90 dark:text-[#eaf4ff] dark:hover:border-[#6db5ff]/45 dark:focus-visible:outline-[#6db5ff] sm:p-8"
    >
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
        <VsCodeMockup key={replayKey} copy={copy} enabled={autoStart || manualStart} />
      </div>
    </a>
  );
}

export function DeveloperWorkflow({
  copy,
  locale,
}: {
  copy: LandingCopy['developerWorkflow'];
  locale: Locale;
}) {
  const [assistantFinished, setAssistantFinished] = useState(false);
  const finishAssistant = useCallback(() => setAssistantFinished(true), []);

  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-12">
      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
        <AiWorkflowPanel locale={locale} onDemoComplete={finishAssistant} />
        <VsCodePanel copy={copy} autoStart={assistantFinished} />
      </div>
    </section>
  );
}

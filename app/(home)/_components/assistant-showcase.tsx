'use client';

import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  FileCode2,
  FolderTree,
  Sparkles,
  SquareTerminal,
  Wand2,
} from 'lucide-react';

type AssistantId = 'claude' | 'codex' | 'gemini';

type Assistant = {
  id: AssistantId;
  label: string;
  icon: LucideIcon;
  // config variant
  configFile: string;
  configCode: string;
  // skills variant
  convention: string;
  location: string;
  tagline: string;
  points: string[];
};

const assistants: Assistant[] = [
  {
    id: 'claude',
    label: 'Claude',
    icon: Bot,
    configFile: 'claude · .mcp.json',
    configCode: `{
  "mcpServers": {
    "runtz": {
      "command": "runtz-mcp",
      "env": {
        "RUNTZ_ENDPOINT": "https://engine.runtz.dev",
        "RUNTZ_TOKEN": "rtz_live_..."
      }
    }
  }
}`,
    convention: 'SKILL.md',
    location: '~/.claude/skills/runtz-security-scans/',
    tagline: 'A Claude Code & Desktop skill that activates the moment you ask for a security scan.',
    points: [
      'Ships a full CLI reference alongside SKILL.md',
      'Routes each request to the right scan automatically',
      'Prefers the MCP tools, falls back to the CLI',
    ],
  },
  {
    id: 'codex',
    label: 'Codex',
    icon: SquareTerminal,
    configFile: 'codex · ~/.codex/config.toml',
    configCode: `[mcp_servers.runtz]
command = "runtz-mcp"

[mcp_servers.runtz.env]
RUNTZ_ENDPOINT = "https://engine.runtz.dev"
RUNTZ_TOKEN = "rtz_live_..."`,
    convention: 'AGENTS.md',
    location: 'project root',
    tagline: 'An AGENTS.md skill that drops into any repo and teaches Codex which scan fits the task.',
    points: [
      'Zero config — just commit AGENTS.md',
      'Confirms the target before scanning',
      'Summarizes findings with concrete fixes',
    ],
  },
  {
    id: 'gemini',
    label: 'Gemini',
    icon: Sparkles,
    configFile: 'gemini · ~/.gemini/settings.json',
    configCode: `{
  "mcpServers": {
    "runtz": {
      "command": "runtz-mcp",
      "env": {
        "RUNTZ_ENDPOINT": "https://engine.runtz.dev",
        "RUNTZ_TOKEN": "rtz_live_..."
      }
    }
  }
}`,
    convention: 'GEMINI.md',
    location: 'project root or ~/.gemini/',
    tagline: 'A GEMINI.md skill the Gemini CLI loads as context and runs against the MCP tools.',
    points: [
      'Works as project or global context',
      'Keeps the token out of every prompt',
      'Reads the docs when it is unsure',
    ],
  },
];

const ROTATE_MS = 7000;

export function AssistantShowcase({ variant }: { variant: 'config' | 'skills' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = assistants[activeIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (paused || reducedMotion.matches) return;

    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % assistants.length);
      setCycleKey((key) => key + 1);
    }, ROTATE_MS);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, cycleKey, paused]);

  function select(index: number) {
    setActiveIndex(index);
    setCycleKey((key) => key + 1);
  }

  return (
    <div
      className="relative overflow-hidden rounded-[22px] border border-[#071222]/10 bg-[#f7fbff]/70 p-2 rz-soft-shadow dark:border-[#213047] dark:bg-[#0d1420] sm:p-2.5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      {/* tab bar */}
      <div
        role="tablist"
        aria-label="AI assistant"
        className="flex gap-1 rounded-full border border-[#071222]/10 bg-[#e5f0fb] p-1 dark:border-[#223149] dark:bg-[#05070b]"
      >
        {assistants.map((assistant, index) => {
          const selected = assistant.id === active.id;
          const Icon = assistant.icon;

          return (
            <button
              key={assistant.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => select(index)}
              className={`relative flex min-h-10 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6db5ff] ${
                selected
                  ? 'bg-[#6db5ff] text-[#071222] shadow-sm'
                  : 'text-[#53657d] hover:bg-white/70 hover:text-[#071222] dark:text-[#b8cbe4] dark:hover:bg-white/8 dark:hover:text-[#eaf4ff]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="relative z-10">{assistant.label}</span>
              {selected && (
                <span
                  key={`progress-${cycleKey}`}
                  aria-hidden="true"
                  className={`rz-console-progress absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-[#071222]/40 ${
                    paused ? '[animation-play-state:paused]' : ''
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* panel */}
      <div key={`${active.id}-${variant}`} className="rz-console-screen mt-2">
        {variant === 'config' ? (
          <ConfigPanel assistant={active} />
        ) : (
          <SkillPanel assistant={active} />
        )}
      </div>
    </div>
  );
}

function ConfigPanel({ assistant }: { assistant: Assistant }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1c2a3f] bg-[#070f1c]">
      <div className="flex items-center gap-2 border-b border-[#223149] bg-[#0d1420] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4f8dff]/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#6db5ff]/70" />
        <span className="ml-2 font-mono text-xs text-[#7f96b3]">{assistant.configFile}</span>
      </div>
      <pre className="min-h-[220px] overflow-x-auto px-5 py-4 font-mono text-[13px] leading-6 text-[#cfe3ff]">
        <code>{assistant.configCode}</code>
      </pre>
    </div>
  );
}

function SkillPanel({ assistant }: { assistant: Assistant }) {
  const Icon = assistant.icon;

  return (
    <div className="min-h-[220px] rounded-2xl border border-[#071222]/10 bg-[#f7fbff]/95 p-5 text-[#071222] dark:border-[#1c2a3f] dark:bg-[#0b1422] dark:text-[#eaf4ff] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#4f8dff] bg-[#6db5ff] text-[#101827]">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-semibold">{assistant.label}</p>
            <p className="flex items-center gap-1.5 font-mono text-xs text-[#53657d] dark:text-[#7f96b3]">
              <FileCode2 className="h-3.5 w-3.5" /> {assistant.convention}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2f7eff]/20 bg-[#2f7eff]/10 px-3 py-1 font-mono text-[11px] font-semibold text-[#1d5fc7] dark:border-[#6db5ff]/25 dark:bg-[#6db5ff]/10 dark:text-[#9fd6ff]">
          <FolderTree className="h-3.5 w-3.5" /> {assistant.location}
        </span>
      </div>

      <p className="mt-4 text-base leading-7 text-[#53657d] dark:text-[#b8cbe4]">
        {assistant.tagline}
      </p>

      <ul className="mt-4 grid gap-2">
        {assistant.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm leading-6">
            <Wand2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2f7eff] dark:text-[#6db5ff]" />
            <span className="text-[#53657d] dark:text-[#cfe0f5]">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

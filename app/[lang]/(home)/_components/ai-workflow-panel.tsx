'use client';

import Link from 'next/link';
import { useState } from 'react';
import { localizedPath, type Locale } from '@/lib/i18n';
import { aiAssistantDemoCopy, landingWorkflowCopy } from '@/lib/landing-workflow-copy';
import { docsRoute } from '@/lib/shared';
import { AiAssistantDemo } from './ai-assistant-demo';
import { WarpField } from './shaders';

export function AiWorkflowPanel({ locale, onDemoComplete }: { locale: Locale; onDemoComplete: () => void }) {
  const copy = landingWorkflowCopy[locale].ai;
  const [replayKey, setReplayKey] = useState(0);
  const [paused, setPaused] = useState(false);

  return (
    <article onPointerEnter={event => { if (event.pointerType === 'mouse' && !paused) setReplayKey(value => value + 1); }} className="rz-ai-panel relative flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#071222]/10 bg-[#f7fbff] p-6 text-[#071222] rz-soft-shadow dark:border-[#2c415c] dark:bg-[#0d1420] dark:text-[#eaf4ff] sm:p-8">
      <WarpField
        speed={0.25}
        className="opacity-35 mask-[radial-gradient(100%_70%_at_100%_0%,#000,transparent_85%)] dark:opacity-45"
      />
      <div className="relative z-10 flex flex-1 flex-col">
        <h2 className="text-3xl font-semibold leading-[1.15] xl:text-[34px]">
          <Link
            href={localizedPath(locale, `${docsRoute}/mcp`)}
            className="rounded-sm transition-colors hover:text-[#3978ba] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#69b5ff] dark:hover:text-[#69b5ff]"
          >
            {copy.title}
            <span className="block text-[#63758e] dark:text-[#8da7c8]">
              {copy.titleAccent}
            </span>
          </Link>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-[#53657d] dark:text-[#b8cbe4]">
          {copy.body}
        </p>
        <AiAssistantDemo key={replayKey} copy={aiAssistantDemoCopy[locale]} paused={paused} onPauseChange={setPaused} onComplete={onDemoComplete} />
      </div>
    </article>
  );
}

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

  return (
    <article onPointerEnter={event => { if (event.pointerType === 'mouse') setReplayKey(value => value + 1); }} className="rz-ai-panel relative flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#071222]/10 bg-[#f7fbff] p-6 text-[#071222] rz-soft-shadow transition-[border-color,box-shadow] duration-300 hover:border-[#2f7eff]/45 hover:shadow-[0_18px_48px_-24px_rgba(47,126,255,0.35)] motion-reduce:transition-none dark:border-[#2c415c] dark:bg-[#0d1420] dark:text-[#eaf4ff] dark:hover:border-[#6db5ff]/45 sm:p-8">
      <WarpField
        speed={0.25}
        className="opacity-35 mask-[radial-gradient(100%_70%_at_100%_0%,#000,transparent_85%)] dark:opacity-45"
      />
      <div className="relative z-10 flex flex-1 flex-col">
        <h2 className="max-w-xl text-3xl font-semibold leading-[1.15] xl:text-[34px]">
          <Link
            href={localizedPath(locale, `${docsRoute}/mcp`)}
            className="group/title inline-block max-w-full rounded-sm no-underline transition-colors duration-300 hover:text-[#245f9d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7eff] motion-reduce:transition-none dark:hover:text-[#c9e3ff] dark:focus-visible:outline-[#6db5ff]"
          >
            {copy.title}{' '}
            <span className="block text-[#63758e] transition-colors duration-300 group-hover/title:text-[#3978ba] motion-reduce:transition-none dark:text-[#8da7c8] dark:group-hover/title:text-[#b8d9ff]">
              {copy.titleAccent}
            </span>
          </Link>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-[#53657d] dark:text-[#b8cbe4]">
          {copy.body}
        </p>
        <AiAssistantDemo key={replayKey} copy={aiAssistantDemoCopy[locale]} onComplete={onDemoComplete} />
      </div>
    </article>
  );
}

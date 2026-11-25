'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, LoaderCircle } from 'lucide-react';
import type { AiAssistantDemoCopy } from '@/lib/landing-workflow-copy';
import { useDemoClock } from './use-demo-clock';

const ANSWER_START = 3500;
const steps = [
  { name: 'runtz_get_vulnerabilities', detail: 'app=payments-api severity=critical', start: 1550, done: 2200 },
  { name: 'runtz_suggest_fix', detail: 'axios 1.7.4 → 1.8.2', start: 2500, done: 3150 },
];

export function AiAssistantDemo({ copy, onComplete }: {
  copy: AiAssistantDemoCopy;
  onComplete: () => void;
}) {
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const duration = ANSWER_START + copy.answer.length * 18 + 700;
  const playing = visible && !hidden;
  const time = useDemoClock({ duration, playing, reducedMotion: reduced });
  const finished = time >= duration;
  const question = copy.question.slice(0, Math.max(0, Math.floor((time - 180) / 23)));
  const answer = copy.answer.slice(0, Math.max(0, Math.floor((time - ANSWER_START) / 18)));
  const questionComplete = question.length === copy.question.length;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(media.matches);
    const updateHidden = () => setHidden(document.hidden);
    updateMotion(); updateHidden();
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(element);
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateHidden);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateHidden);
    };
  }, []);

  useEffect(() => {
    if (finished) onComplete();
  }, [finished, onComplete]);

  return (
    <figure ref={root} className="rz-ai-conversation mt-auto min-w-0 pt-6">
      <figcaption className="sr-only">{copy.label} {copy.question} {copy.answer}</figcaption>
      <div className="relative overflow-hidden rounded-xl border border-[#33445d] bg-[#0b111c] text-[#d9e5f6] shadow-[0_12px_32px_-24px_rgba(0,0,0,0.6)]">
        <div className="rz-ai-window-bar flex min-h-9 items-center border-b border-white/7 bg-white/[0.025] px-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-1.5 rounded-full bg-[#b56665]" />
            <span className="size-1.5 rounded-full bg-[#5d8ab9]" />
            <span className="size-1.5 rounded-full bg-[#55a58c]" />
          </span>
        </div>

        {/* Fixed text reserves the final layout; only the overlay is typed. */}
        <div aria-hidden="true" className="space-y-3 p-4 text-[13px] leading-5">
          <div>
            <div className="ml-auto w-fit max-w-full rounded-lg border border-[#6db5ff]/15 bg-[#6db5ff]/7 px-3 py-2">
              <p className="relative"><span className="invisible">{copy.question}</span><span className="absolute inset-0">{question}{!questionComplete && <span className="rz-terminal-cursor ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-[#6db5ff]" style={{ animationPlayState: playing ? 'running' : 'paused' }} />}</span></p>
            </div>
          </div>

          <div className="space-y-2">
            {steps.map(step => {
              const shown = time >= step.start;
              const done = time >= step.done;
              return <div key={step.name} className={`flex min-h-9 flex-wrap items-center gap-x-2 gap-y-0.5 rounded-md border border-white/5 bg-white/[0.02] px-3 py-1.5 font-mono leading-5 transition-[opacity,transform] duration-300 motion-reduce:transition-none ${shown ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}>
                {done ? <Check className="size-3.5 shrink-0 text-[#73dfac]" /> : <LoaderCircle className="size-3.5 shrink-0 animate-spin text-[#7f96b3] motion-reduce:animate-none" style={{ animationPlayState: playing ? 'running' : 'paused' }} />}
                <span className="min-w-0 break-all text-xs text-[#88bcff]">{step.name}</span>
                <span className="ml-auto hidden text-[11px] text-[#7f96b3] xl:block">{step.detail}</span>
              </div>;
            })}
          </div>

          <div className={`rounded-lg border border-white/6 bg-white/[0.035] px-3 py-2 text-[#d3deee] transition-opacity duration-300 motion-reduce:transition-none ${time >= ANSWER_START ? 'opacity-100' : 'opacity-0'}`}>
            <p className="relative"><span className="invisible">{copy.answer}</span><span className="absolute inset-0">{answer}</span></p>
          </div>
        </div>
      </div>
    </figure>
  );
}

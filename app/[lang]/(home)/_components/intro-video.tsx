'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { ArrowUpRight, Play, X } from 'lucide-react';
import type { LandingCopy } from '@/lib/landing-copy';
import type { Locale } from '@/lib/i18n';
import poster from './intro-poster.png';

const videoId = 'UBifJ-7UXkU';

export function IntroVideo({
  copy,
  locale,
}: {
  copy: LandingCopy['introVideo'];
  locale: Locale;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const playerLanguage = locale === 'pt-br' ? 'pt-BR' : locale;

  return (
    <section
      id="intro-video"
      aria-label={copy.playLabel}
      className="mx-auto w-full max-w-[1400px] scroll-mt-24 px-4 py-6 sm:px-6 md:px-0 md:py-8"
    >
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger
          aria-label={copy.playLabel}
          className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-[#2f7eff]/25 bg-[#050912] shadow-2xl shadow-[#071222]/15 transition-shadow hover:shadow-[#2f7eff]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6db5ff] dark:border-[#6db5ff]/20 dark:shadow-black/30"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 48px), (max-width: 1400px) 100vw, 1400px"
            className="object-contain"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-[#050912]/10 transition-colors group-hover:bg-transparent">
            <span className="flex size-12 items-center justify-center rounded-full bg-[#6db5ff] text-[#071222] shadow-[0_8px_40px_rgba(0,0,0,0.45)] ring-4 ring-[#6db5ff]/15 transition group-hover:bg-[#9fd6ff] group-focus-visible:bg-[#9fd6ff] motion-safe:group-hover:scale-110 md:size-14">
              <Play aria-hidden="true" className="ml-0.5 size-5 fill-current md:size-6" />
            </span>
          </span>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-[100] bg-[#030711]/80 backdrop-blur-md transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none" />
          <Dialog.Viewport className="fixed inset-0 z-[101] flex items-center justify-center overflow-y-auto overscroll-contain p-4">
            <Dialog.Popup
              initialFocus={closeRef}
              className="relative w-[min(1200px,calc(100vw-32px),calc((100dvh-112px)*16/9))] shrink-0 rounded-xl border border-[#6db5ff]/20 bg-[#0d1420] p-2 pt-0 text-[#eaf4ff] shadow-2xl shadow-black/50 outline-none transition-[opacity,scale] duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 motion-reduce:transition-none sm:p-3 sm:pt-0"
            >
              <Dialog.Title className="sr-only">{copy.playLabel}</Dialog.Title>
              <div className="flex min-h-14 items-center justify-between gap-3">
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-sm px-2 text-xs text-[#b8cbe4] transition-colors hover:text-[#6db5ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6db5ff]"
                >
                  {copy.youtubeLabel}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
                <Dialog.Close
                  ref={closeRef}
                  aria-label={copy.closeLabel}
                  className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#6db5ff] transition-colors hover:bg-[#6db5ff]/15 hover:text-[#9fd6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6db5ff]"
                >
                  <X aria-hidden="true" className="size-5" />
                </Dialog.Close>
              </div>
              <div className="relative aspect-video min-h-[200px] w-full overflow-hidden rounded-md bg-black">
                {isOpen && (
                  <iframe
                    title={copy.playLabel}
                    // Mount on click for audible autoplay; unmount on close to stop playback.
                    // YouTube controls playback quality; its quality-setting API is no longer supported.
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&playsinline=1&rel=0&hl=${playerLanguage}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                )}
              </div>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

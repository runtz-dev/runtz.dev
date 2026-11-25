'use client';

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Boxes, Check, ChevronRight, Cloud, Code, Container, Pause, Play, ScanLine, Server, ShipWheel, Upload } from 'lucide-react';
import type { LandingCopy } from '@/lib/landing-copy';
import type { Locale } from '@/lib/i18n';
import { landingWorkflowCopy } from '@/lib/landing-workflow-copy';
import { sitePath } from '@/lib/shared';
import { WarpField } from './shaders';
import { AWSIcon, AzureIcon, GCPIcon } from './cloud-provider-icons';
import { CloudScanTerminal, SCAN_ROTATION_MS, ScanTerminal, scanDemos, type ScanPhase } from './scan-terminal';
import { InstallJourney, INSTALL_INTRO_MS } from './install-journey';
import { useDemoClock } from './use-demo-clock';

const icons = [Boxes, Container, Server, Code, ScanLine, ShipWheel, Cloud];
const CLOUD_SCAN_INDEX = icons.length - 1;
const words = {
  en: { modules: 'scanning modules', pause: 'Pause workflow animation', play: 'Resume workflow animation', soon: 'Coming soon', headlines: ["Know what’s in your code.", 'See inside every image.', 'Bring host risk into view.', 'Catch issues at the source.', 'Test your running surface.', 'Understand your cluster posture.', 'One view across your clouds.'] },
  'pt-br': { modules: 'módulos de scanning', pause: 'Pausar animação do fluxo', play: 'Retomar animação do fluxo', soon: 'Em breve', headlines: ['Saiba o que existe no seu código.', 'Enxergue dentro de cada imagem.', 'Veja os riscos dos seus hosts.', 'Encontre falhas na origem.', 'Teste suas aplicações em execução.', 'Entenda a postura do seu cluster.', 'Uma visão de todas as suas clouds.'] },
  es: { modules: 'módulos de scanning', pause: 'Pausar animación del flujo', play: 'Reanudar animación del flujo', soon: 'Próximamente', headlines: ['Conoce lo que hay en tu código.', 'Mira dentro de cada imagen.', 'Visualiza el riesgo de tus hosts.', 'Encuentra problemas en el origen.', 'Prueba tus aplicaciones en ejecución.', 'Entiende la postura de tu clúster.', 'Una vista de todas tus nubes.'] },
};

export function ScanShowcase({ cards, installCopy, locale }: { cards: LandingCopy['platform']['cards']; installCopy: LandingCopy['developerWorkflow']; locale: Locale }) {
  const [active, setActive] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [phase, setPhase] = useState<ScanPhase>('scanning');
  const [skipIntro, setSkipIntro] = useState(false);
  const [scanCycle, setScanCycle] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const copy = words[locale];
  const journey = landingWorkflowCopy[locale].install;
  const playing = visible && !hidden && !manualPause;
  const introTime = useDemoClock({ duration: INSTALL_INTRO_MS, playing, reducedMotion: reduced });
  const introElapsed = skipIntro ? INSTALL_INTRO_MS : introTime;
  const connected = introElapsed >= INSTALL_INTRO_MS;
  const paused = manualPause || hover || focused || reduced || hidden || !visible;
  const selectActive = useCallback((index: number) => {
    setPhase('scanning');
    setActive(index);
    setScanCycle(value => value + 1);
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(media.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion(); updateVisibility();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    if (root.current) observer.observe(root.current);
    return () => { media.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (paused || !connected || active === CLOUD_SCAN_INDEX) return;
    const timer = setTimeout(() => selectActive((active + 1) % cards.length), SCAN_ROTATION_MS);
    return () => clearTimeout(timer);
  }, [active, paused, connected, cards.length, selectActive]);
  const advanceFromCloud = useCallback(() => {
    if (paused) return false;
    selectActive((active + 1) % cards.length);
    return true;
  }, [paused, active, cards.length, selectActive]);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % cards.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + cards.length) % cards.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = cards.length - 1;
    else return;
    event.preventDefault(); setSkipIntro(true); selectActive(next); buttons.current[next]?.focus();
  }
  const Icon = icons[active];
  const demo = scanDemos[active];
  return <div ref={root} onPointerEnter={e => { if (e.pointerType === 'mouse') setHover(true); }} onPointerLeave={() => setHover(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }} className="relative isolate mt-10 overflow-hidden rounded-[24px] border border-[#071222]/15 bg-[#f1f7fe] text-[#071222] rz-soft-shadow dark:border-[#2c415c] dark:bg-[#0d1420] dark:text-[#eaf4ff]">
    <WarpField speed={manualPause ? 0 : 0.3} size={2} className="opacity-25 dark:opacity-35" />
    <InstallJourney copy={journey} labels={installCopy} locale={locale} elapsed={introElapsed} phase={phase} playing={playing} />
    <div className="relative grid bg-[#f7fbff]/65 dark:bg-[#0d1420]/60 md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[310px_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col border-b border-[#071222]/10 dark:border-[#2c415c] md:border-r md:border-b-0">
        <div role="tablist" aria-label={copy.modules} className="flex min-w-0 gap-1 overflow-x-auto p-3 md:flex-col md:gap-0 md:p-0 md:py-4 xl:flex-1">
          {cards.map((card, index) => {
            const ItemIcon = icons[index];
            return <button ref={node => { buttons.current[index] = node; }} key={card.title} role="tab" type="button" id={`${id}-tab-${index}`} aria-selected={active === index} aria-controls={`${id}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => { setSkipIntro(true); selectActive(index); }} onKeyDown={event => navigate(event, index)} className={`group relative flex shrink-0 items-center gap-3 overflow-hidden rounded-lg border px-4 py-4 text-left text-sm font-medium transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#2f7eff] md:min-h-[65px] md:rounded-none md:border-x-0 md:px-6 lg:gap-4 lg:px-7 xl:flex-1 ${active === index ? 'border-[#2f7eff]/20 bg-[#2f7eff]/10 text-[#1456b8] dark:border-[#6db5ff]/20 dark:bg-[#6db5ff]/10 dark:text-[#d9edff]' : 'border-transparent text-[#53657d] hover:bg-[#2f7eff]/5 hover:text-[#071222] dark:text-[#b8cbe4] dark:hover:text-white'}`}>
              {active === index && <span className="absolute inset-y-3 left-0 w-[3px] rounded-r bg-[#2f7eff] dark:bg-[#6db5ff]" />}
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#071222] dark:bg-transparent"><ItemIcon className="size-5 text-white" strokeWidth={1.6} /></span><span>{card.title}</span><ChevronRight className={`ml-auto hidden size-4 shrink-0 text-[#071222] dark:text-white md:block ${active === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
            </button>;
          })}
        </div>
      </div>
      <div className="relative min-w-0 p-6 sm:p-8 md:min-h-[560px] lg:p-9">
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className="flex min-w-0 flex-col gap-6 outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#2f7eff] sm:gap-7">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#071222]/15 bg-[#071222] dark:border-white/15 dark:bg-white/5"><Icon className="size-6 text-white" strokeWidth={1.5} /></div>
              {active === CLOUD_SCAN_INDEX && <div className="flex items-center gap-2 text-white sm:gap-4">
                <span role="img" aria-label="Google Cloud" title="Google Cloud" className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#071222]/15 bg-[#071222] dark:border-white/15 dark:bg-white/5 sm:size-12"><GCPIcon colored className="size-7" /></span>
                <span role="img" aria-label="Amazon Web Services" title="Amazon Web Services" className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#071222]/15 bg-[#071222] dark:border-white/15 dark:bg-white/5 sm:size-12"><AWSIcon colored className="h-6 w-8 sm:h-7 sm:w-9" /></span>
                <span role="img" aria-label="Microsoft Azure" title="Microsoft Azure" className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#071222]/15 bg-[#071222] dark:border-white/15 dark:bg-white/5 sm:size-12"><AzureIcon colored className="size-7" /></span>
              </div>}
              <button type="button" onClick={() => setManualPause(value => !value)} aria-pressed={manualPause} aria-label={manualPause ? copy.play : copy.pause} title={manualPause ? copy.play : copy.pause} className="ml-auto flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#071222]/10 bg-white/30 text-[#53657d] transition hover:bg-[#2f7eff]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7eff] dark:border-[#6db5ff]/15 dark:bg-white/3 dark:text-[#b8cbe4] dark:hover:bg-[#6db5ff]/10">{manualPause ? <Play className="size-4" /> : <Pause className="size-4" />}</button>
            </div>
            <div className="grid">
              {cards.map((card, index) => (
                <div key={card.title} aria-hidden={index !== active} inert={index !== active} className={`min-w-0 [grid-area:1/1] ${index === active ? 'rz-scan-content' : 'invisible'}`}>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <p className="text-xs font-semibold text-[#2f7eff] dark:text-[#6db5ff]">{card.title}</p>
                    {index === 4 && <span className="rounded-full border border-[#2f7eff]/20 px-2 py-0.5 text-[10px] text-[#53657d] dark:text-[#b8cbe4]">{copy.soon}</span>}
                  </div>
                  <h3 className="mt-2.5 max-w-3xl text-3xl leading-[1.15] font-semibold sm:text-4xl xl:text-[40px]">{copy.headlines[index]}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[#435b78] dark:text-[#c2d5ed] sm:text-base">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="min-h-[394px] min-w-0 sm:min-h-[342px] lg:min-h-[310px]" aria-hidden={demo ? undefined : true}>
            {active === CLOUD_SCAN_INDEX
              ? <CloudScanTerminal key={`${active}-${scanCycle}`} locale={locale} playing={playing && connected} reducedMotion={reduced} onCycleComplete={advanceFromCloud} onPhaseChange={setPhase} />
              : demo && <ScanTerminal key={`${active}-${scanCycle}`} demo={demo} locale={locale} playing={playing && connected} reducedMotion={reduced} onPhaseChange={setPhase} />}
          </div>
          <div aria-hidden={!demo || undefined} className={`rz-scan-receipt relative flex min-h-[78px] items-center gap-3 overflow-hidden border-t border-[#071222]/10 pt-5 dark:border-[#6db5ff]/12 ${!demo ? 'invisible' : ''} ${phase === 'sending' ? 'rz-scan-receipt-sending' : ''}`} data-playing={playing}>
            <span aria-hidden="true" className={`relative flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-500 ${phase === 'received' ? 'border-[#2ca577]/35 bg-[#2ca577]/8 dark:border-[#73dfac]/30 dark:bg-[#73dfac]/8' : 'border-[#2f7eff]/20 bg-[#2f7eff]/5 dark:border-[#6db5ff]/20 dark:bg-[#6db5ff]/5'}`}><span className={`size-6 transition-colors ${phase === 'received' ? 'bg-[#16724e] dark:bg-[#73dfac]' : 'bg-[#2f7eff] dark:bg-[#6db5ff]'}`} style={{ mask: `url(${sitePath('/brand/runtz-activitybar.svg')}) center / contain no-repeat` }} /></span>
            <div className="min-w-0 flex-1"><p className={`min-h-10 text-sm font-semibold transition-colors sm:min-h-5 ${phase === 'received' ? 'text-[#16724e] dark:text-[#73dfac]' : 'text-[#53657d] dark:text-[#b8cbe4]'}`}>{!connected ? journey.waiting : phase === 'received' ? journey.receipt : phase === 'sending' ? journey.sending : journey.scanning}</p><p className={`mt-1 text-xs leading-5 text-[#53657d] transition-opacity dark:text-[#9fb8d7] ${phase === 'received' ? 'opacity-100' : 'opacity-0'}`}>{journey.receiptBody}</p></div>
            <span aria-hidden="true" className="shrink-0 text-[#16724e] dark:text-[#73dfac]">{phase === 'received' ? <Check className="size-5" /> : <Upload className="size-4 text-[#7f96b3]" />}</span>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

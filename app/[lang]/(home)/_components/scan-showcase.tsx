'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Boxes, Cloud, Code, Container, ScanLine, Server, ShipWheel } from 'lucide-react';
import type { LandingCopy } from '@/lib/landing-copy';
import { localizedPath, type Locale } from '@/lib/i18n';
import { AWSIcon, AzureIcon, GCPIcon } from './cloud-provider-icons';
import { SCAN_ROTATION_MS, ScanTerminal, cloudDemos, scanDemos } from './scan-terminal';
import { useDemoClock } from './use-demo-clock';

const icons = [Boxes, Container, Server, Code, ScanLine, ShipWheel, Cloud];
const CLOUD_SCAN_INDEX = icons.length - 1;
const providers = [
  { name: 'Google Cloud', shortName: 'GCP', Icon: GCPIcon },
  { name: 'Amazon Web Services', shortName: 'AWS', Icon: AWSIcon },
  { name: 'Microsoft Azure', shortName: 'Azure', Icon: AzureIcon },
];

const words = {
  en: {
    title: 'Every scan you need. All in one place.',
    body: 'Scan code, dependencies, containers, hosts, Kubernetes, and cloud configuration. Bring every finding into one workspace.',
    modules: 'Security scan types', providers: 'Cloud providers',
    next: 'Next example in {seconds}s', paused: 'Automatic transition paused',
    soon: 'Coming soon', roadmap: 'View the roadmap',
    labels: ['SCA', 'Images', 'Hosts', 'SAST', 'DAST', 'Kubernetes', 'Cloud'],
    headlines: ['Know what your code depends on.', 'Look inside every image.', 'Bring host risk into view.', 'Catch issues at the source.', 'A new angle on runtime risk.', 'See your cluster’s security posture.', 'One view across your clouds.'],
    dastPreview: 'Runtime scanning is up next.',
  },
  'pt-br': {
    title: 'Todos os scans de que você precisa. Em um só lugar.',
    body: 'Analise código, dependências, containers, hosts, Kubernetes e configurações de cloud. Reúna todos os achados em um só workspace.',
    modules: 'Tipos de scan de segurança', providers: 'Provedores de cloud',
    next: 'Próximo exemplo em {seconds}s', paused: 'Transição automática pausada',
    soon: 'Em breve', roadmap: 'Ver o roadmap',
    labels: ['SCA', 'Imagens', 'Hosts', 'SAST', 'DAST', 'Kubernetes', 'Cloud'],
    headlines: ['Saiba do que seu código depende.', 'Enxergue dentro de cada imagem.', 'Veja os riscos dos seus hosts.', 'Encontre falhas na origem.', 'Um novo olhar sobre riscos em runtime.', 'Veja a postura de segurança do cluster.', 'Uma visão de todas as suas clouds.'],
    dastPreview: 'Scans de runtime vêm a seguir.',
  },
  es: {
    title: 'Todos los análisis que necesitas. En un solo lugar.',
    body: 'Analiza código, dependencias, contenedores, hosts, Kubernetes y configuraciones cloud. Reúne todos los hallazgos en un solo espacio.',
    modules: 'Tipos de análisis de seguridad', providers: 'Proveedores cloud',
    next: 'Próximo ejemplo en {seconds}s', paused: 'Transición automática en pausa',
    soon: 'Próximamente', roadmap: 'Ver el roadmap',
    labels: ['SCA', 'Imágenes', 'Hosts', 'SAST', 'DAST', 'Kubernetes', 'Cloud'],
    headlines: ['Conoce de qué depende tu código.', 'Mira dentro de cada imagen.', 'Visualiza el riesgo de tus hosts.', 'Encuentra problemas en el origen.', 'Una nueva visión del riesgo en runtime.', 'Conoce la postura de seguridad del clúster.', 'Una vista de todas tus nubes.'],
    dastPreview: 'El análisis de runtime es lo siguiente.',
  },
};

function ScanAutoTransition({ playing, reducedMotion, locale, onComplete }: {
  playing: boolean;
  reducedMotion: boolean;
  locale: Locale;
  onComplete: () => void;
}) {
  const elapsed = useDemoClock({ duration: SCAN_ROTATION_MS, playing, reducedMotion });
  const completed = useRef(false);
  const copy = words[locale];
  const remaining = Math.max(0, Math.ceil((SCAN_ROTATION_MS - elapsed) / 1000));

  useEffect(() => {
    if (!playing || reducedMotion || elapsed < SCAN_ROTATION_MS || completed.current) return;
    completed.current = true;
    onComplete();
  }, [playing, reducedMotion, elapsed, onComplete]);

  if (reducedMotion) return null;
  const label = playing ? copy.next.replace('{seconds}', String(remaining)) : copy.paused;
  return <span role="timer" aria-live="off" aria-label={label} title={label} className="flex shrink-0 items-center gap-2 font-mono text-xs tabular-nums text-[#8f969f]">
    <span aria-hidden="true" className="h-px w-10 overflow-hidden bg-white/15"><span className="block h-full origin-left bg-[#a1a1aa]" style={{ transform: `scaleX(${Math.max(0, 1 - elapsed / SCAN_ROTATION_MS)})` }} /></span>
    <span aria-hidden="true" className="w-5 text-right">{remaining}s</span>
  </span>;
}

export function ScanShowcase({ cards, locale }: { cards: LandingCopy['platform']['cards']; locale: Locale }) {
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scanCycle, setScanCycle] = useState(0);
  const [provider, setProvider] = useState(0);
  const terminal = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const providerButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const providerToFocus = useRef<number | null>(null);
  const id = useId();
  const copy = words[locale];
  const playing = visible && !hidden;
  const selectActive = useCallback((index: number) => {
    setProvider(0);
    setActive(index);
    setScanCycle(value => value + 1);
  }, []);
  const advance = useCallback(() => {
    if (active === CLOUD_SCAN_INDEX && provider < cloudDemos.length - 1) {
      setProvider(value => value + 1);
      setScanCycle(value => value + 1);
    } else {
      selectActive((active + 1) % cards.length);
    }
  }, [active, provider, cards.length, selectActive]);

  useEffect(() => {
    if (providerToFocus.current === null) return;
    const index = providerToFocus.current;
    providerToFocus.current = null;
    providerButtons.current[index]?.focus();
  }, [scanCycle]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(media.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    if (terminal.current) observer.observe(terminal.current);
    return () => {
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
      observer.disconnect();
    };
  }, []);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % cards.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + cards.length) % cards.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = cards.length - 1;
    else return;
    event.preventDefault();
    selectActive(next);
    buttons.current[next]?.focus();
  }

  const demo = active === CLOUD_SCAN_INDEX ? cloudDemos[provider] : scanDemos[active];
  const timer = <ScanAutoTransition key={scanCycle} locale={locale} playing={playing && !focused && !reduced} reducedMotion={reduced} onComplete={advance} />;
  const providerSelector = <div role="group" aria-label={copy.providers} className="flex min-w-0 items-center gap-0.5">
    {providers.map(({ name, shortName, Icon }, index) => <button
      key={name} ref={node => { providerButtons.current[index] = node; }} type="button" aria-label={name} aria-pressed={provider === index}
      onClick={event => {
        if (event.detail > 0) setFocused(false);
        else providerToFocus.current = index;
        setProvider(index);
        setScanCycle(value => value + 1);
      }}
      className={`inline-flex min-h-8 items-center gap-2 rounded-md px-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6db5ff] sm:text-sm ${provider === index ? 'bg-white/10 text-white' : 'text-[#a1a1aa] hover:bg-white/5 hover:text-white'}`}
    ><Icon colored className="hidden size-4 sm:block" /><span>{shortName}</span></button>)}
  </div>;

  return <div
    onFocusCapture={event => setFocused(event.target.matches(':focus-visible'))}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    className="text-[#071222] dark:text-[#f4f4f5]"
  >
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-3xl leading-tight font-semibold sm:text-4xl lg:text-[42px]">{copy.title}</h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#53657d] dark:text-[#a1a9b7]">{copy.body}</p>
    </div>

    <div role="tablist" aria-label={copy.modules} className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-x-4 gap-y-5 sm:mt-10 sm:gap-x-3 lg:gap-x-5">
      {cards.map((card, index) => {
        const ItemIcon = icons[index];
        const selected = active === index;
        return <button
          ref={node => { buttons.current[index] = node; }} key={card.title}
          role="tab" type="button" id={`${id}-tab-${index}`} aria-label={card.title}
          aria-selected={selected} aria-controls={`${id}-panel`} tabIndex={selected ? 0 : -1}
          onClick={event => { if (event.detail > 0) setFocused(false); selectActive(index); }} onKeyDown={event => navigate(event, index)}
          className={`group flex w-16 flex-col items-center gap-3 rounded-lg py-1 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7eff] sm:w-20 lg:w-24 ${selected ? 'text-[#071222] dark:text-white' : 'text-[#617085] hover:text-[#071222] dark:text-[#939baa] dark:hover:text-white'}`}
        >
          <span className={`flex size-14 items-center justify-center rounded-xl border transition-colors sm:size-16 ${selected ? 'border-[#071222]/40 bg-[#071222]/5 dark:border-white/45 dark:bg-white/6' : 'border-[#071222]/12 group-hover:border-[#071222]/30 dark:border-white/12 dark:group-hover:border-white/30'}`}>
            <ItemIcon aria-hidden="true" className="size-6" strokeWidth={1.5} />
          </span>
          <span className="whitespace-nowrap">{index === 5 ? <><span className="sm:hidden">K8s</span><span className="hidden sm:inline">{copy.labels[index]}</span></> : copy.labels[index]}</span>
        </button>;
      })}
    </div>

    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className="mx-auto mt-9 max-w-5xl rounded-xl outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7eff] sm:mt-10">
      <div className="mx-auto grid max-w-2xl text-center">
        {cards.map((card, index) => <div key={card.title} aria-hidden={index !== active} inert={index !== active} className={`min-w-0 [grid-area:1/1] ${index === active ? 'rz-scan-content' : 'invisible'}`}>
          <h3 className="text-xl leading-7 font-medium">{copy.headlines[index]}</h3>
        </div>)}
      </div>

      <div ref={terminal} className="mt-6 overflow-hidden rounded-xl border border-black/20 bg-black dark:border-white/12 sm:mt-7">
        {demo
          ? <ScanTerminal key={`${active}-${provider}-${scanCycle}`} demo={demo} locale={locale} playing={playing} reducedMotion={reduced} header={active === CLOUD_SCAN_INDEX ? providerSelector : undefined} timer={timer} />
          : <div>
            <div className="flex min-h-12 items-center justify-between gap-3 border-b border-white/10 px-5 sm:px-6"><span className="font-mono text-[13px] text-[#aeb5c0]">DAST</span>{timer}</div>
            <div className="flex h-[340px] flex-col items-center justify-center px-6 py-10 text-center sm:h-[320px]">
              <ScanLine aria-hidden="true" className="size-8 text-[#71717a]" strokeWidth={1.25} />
              <p className="mt-5 text-base font-medium text-[#f4f4f5]">{copy.dastPreview}</p>
              <p className="mt-2 text-sm text-[#a1a1aa]">{copy.soon}</p>
              <Link href={localizedPath(locale, '/roadmap')} className="mt-5 rounded-sm text-sm text-[#a1a1aa] underline decoration-white/20 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6db5ff]">{copy.roadmap}</Link>
            </div>
          </div>}
      </div>
    </div>
  </div>;
}

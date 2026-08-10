'use client';

import { type RefObject, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/cn';

// WebGL shaders are client-only and a bit heavy, so load them lazily.
const Dithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Dithering),
  { ssr: false },
);

// A single shared observer keeps off-screen shaders paused (speed -> 0) so the
// GPU only works on what the visitor can actually see.
let observer: IntersectionObserver | undefined;
const observerTargets = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>();

function useIsVisible(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    observer ??= new IntersectionObserver((entries) => {
      for (const entry of entries) observerTargets.get(entry.target)?.(entry);
    });

    const element = ref.current;
    if (!element) return;
    observerTargets.set(element, (entry) => setVisible(entry.isIntersecting));
    observer.observe(element);

    return () => {
      observer?.unobserve(element);
      observerTargets.delete(element);
    };
  }, [ref]);

  return visible;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

// Mount shaders a beat after hydration. On slower devices, rendering them
// immediately can error with "uniform images not fully loaded".
function useDelayedMount(delay = 400) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return ready;
}

/**
 * The hero showpiece: a slow animated Dithering "warp" field drifting across the
 * panel, tuned to the runtz blue palette and masked to keep the heading clean.
 */
export function HeroBackdrop() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useIsVisible(ref);
  const reduced = usePrefersReducedMotion();
  const mounted = useDelayedMount();
  const dark = resolvedTheme === 'dark';
  const animate = visible && !reduced;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {mounted && (
        <Dithering
          className="absolute inset-0 size-full animate-fd-fade-in [animation-duration:1200ms] mask-[linear-gradient(105deg,transparent_0%,transparent_28%,#000_72%)]"
          colorBack="#00000000"
          colorFront={dark ? '#2f7eff' : '#6db5ff'}
          shape="warp"
          type="4x4"
          size={2}
          speed={animate ? 0.5 : 0}
          minPixelRatio={1}
        />
      )}
    </div>
  );
}

/**
 * A reusable animated "warp" dithering field for secondary surfaces. It fills
 * its positioned parent; pass `className` for the mask / opacity and
 * `speed` / `size` to tune intensity per surface. Used as a single continuous
 * field behind a whole card grid, so the pattern reads as one shader.
 */
export function WarpField({
  className,
  speed = 0.4,
  size = 2,
  offsetX = 0,
  offsetY = 0,
}: {
  className?: string;
  speed?: number;
  size?: number;
  offsetX?: number;
  offsetY?: number;
}) {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useIsVisible(ref);
  const reduced = usePrefersReducedMotion();
  const mounted = useDelayedMount();
  const dark = resolvedTheme === 'dark';

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {mounted && (
        <Dithering
          colorBack="#00000000"
          shape="warp"
          colorFront={dark ? '#2f7eff' : '#6db5ff'}
          type="4x4"
          size={size}
          offsetX={offsetX}
          offsetY={offsetY}
          speed={visible && !reduced ? speed : 0}
          className="size-full animate-fd-fade-in [animation-duration:900ms]"
          minPixelRatio={1}
        />
      )}
    </div>
  );
}

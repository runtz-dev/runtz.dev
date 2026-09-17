'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, LoaderCircle, Mail } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import { sitePath } from '@/lib/shared';
import { newsletterCopy } from '@/lib/newsletter-copy';

export function NewsletterSignup({ locale, panel = false }: { locale: Locale; panel?: boolean }) {
  const copy = newsletterCopy[locale];
  const id = useId();
  const confirmation = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (state === 'success') confirmation.current?.focus();
  }, [state]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'pending') return;
    const data = new FormData(event.currentTarget);
    setState('pending');
    setMessage('');
    try {
      const response = await fetch(sitePath('/newsletter/actions/subscribe'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          consent: data.get('consent') === 'on',
          locale,
          website: data.get('website'),
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) {
        setMessage(response.status === 429 ? copy.rateLimit : response.status === 422 ? copy.invalid : copy.error);
        setState('error');
        return;
      }
      setState('success');
    } catch {
      setMessage(copy.error);
      setState('error');
    }
  }

  const signup = (
    <div className="nl-signup-inline">
      {state === 'success' ? (
        <div ref={confirmation} className="nl-signup-confirmation" role="status" tabIndex={-1}>
          <Check size={20} aria-hidden="true" />
          <div><strong>{copy.success}</strong><p>{copy.successBody}</p></div>
        </div>
      ) : (
        <form onSubmit={submit} aria-label={copy.subscribe} aria-busy={state === 'pending'}>
          <div className="nl-signup-entry">
            <label className="sr-only" htmlFor={`${id}-email`}>{copy.email}</label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={254}
              placeholder={copy.email}
              className="nl-signup-input"
              aria-describedby={message ? `${id}-error` : undefined}
              aria-invalid={state === 'error' && message === copy.invalid ? true : undefined}
              disabled={state === 'pending'}
            />
            <button type="submit" className="nl-button nl-button-primary nl-signup-submit" disabled={state === 'pending'}>
              {state === 'pending' ? <><LoaderCircle size={16} className="animate-spin" aria-hidden="true" />{copy.sending}</> : <>{copy.subscribe}<ArrowUpRight size={15} aria-hidden="true" /></>}
            </button>
          </div>
          <div className="nl-honeypot" aria-hidden="true">
            <label htmlFor={`${id}-website`}>Website</label>
            <input id={`${id}-website`} name="website" autoComplete="off" tabIndex={-1} />
          </div>
          <div className="nl-signup-consent">
            <input id={`${id}-consent`} name="consent" type="checkbox" required disabled={state === 'pending'} />
            <p>
              <label htmlFor={`${id}-consent`}>{copy.consent}</label>{' '}
              <a className="nl-privacy" href={sitePath(localizedPath(locale, '/legal/privacypolicy'))}>{copy.privacy}</a>
            </p>
          </div>
          {message && <p id={`${id}-error`} className="nl-form-error" role="alert">{message}</p>}
        </form>
      )}
    </div>
  );

  if (!panel) return signup;

  return (
    <section className="nl-signup-panel" aria-labelledby={`${id}-panel-title`}>
      <div className="nl-signup-symbol"><Mail size={25} strokeWidth={1.5} aria-hidden="true" /></div>
      <div className="nl-signup-copy"><h2 id={`${id}-panel-title`}>{copy.signupTitle}</h2><p>{copy.signupBody}</p></div>
      {signup}
    </section>
  );
}

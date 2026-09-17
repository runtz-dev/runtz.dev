'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, LoaderCircle, Mail, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import { sitePath } from '@/lib/shared';
import { newsletterCopy } from '@/lib/newsletter-copy';

export function NewsletterSignup({ locale, panel = false }: { locale: Locale; panel?: boolean }) {
  const copy = newsletterCopy[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [state, setState] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'pending') return;
    const data = new FormData(event.currentTarget);
    setState('pending');
    setMessage('');
    try {
      const response = await fetch(sitePath('/newsletter/actions/subscribe'), {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.get('email'), consent: data.get('consent') === 'on', locale, website: data.get('website') }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) {
        setMessage(response.status === 429 ? copy.rateLimit : response.status === 422 ? copy.invalid : copy.error);
        setState('error');
        return;
      }
      setState('success');
    } catch { setMessage(copy.error); setState('error'); }
  }

  return <>
    {panel ? <section className="nl-signup-panel" aria-labelledby={`${id}-panel-title`}>
      <div className="nl-signup-symbol"><Mail size={25} strokeWidth={1.5} aria-hidden="true" /></div>
      <div className="nl-signup-copy"><h2 id={`${id}-panel-title`}>{copy.signupTitle}</h2><p>{copy.signupBody}</p></div>
      <button className="nl-button nl-button-primary" onClick={() => dialog.current?.showModal()}>{copy.subscribe}<ArrowUpRight size={16} aria-hidden="true" /></button>
    </section> : <button className="nl-button nl-button-primary" onClick={() => dialog.current?.showModal()}><Mail size={16} aria-hidden="true" />{copy.subscribe}<ArrowUpRight size={16} aria-hidden="true" /></button>}

    <dialog ref={dialog} className="nl-dialog" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="nl-dialog-content">
        <button className="nl-dialog-close" aria-label={copy.close} onClick={() => dialog.current?.close()}><X size={20} /></button>
        {state === 'success' ? <div className="nl-success" role="status">
          <span className="nl-success-mark"><Check size={24} aria-hidden="true" /></span>
          <h2 id={`${id}-title`}>{copy.success}</h2><p id={`${id}-description`}>{copy.successBody}</p>
          <button className="nl-button nl-button-secondary" onClick={() => dialog.current?.close()}>{copy.close}</button>
        </div> : <>
          <Mail className="nl-accent" size={25} aria-hidden="true" />
          <h2 id={`${id}-title`}>{copy.signupTitle}</h2><p id={`${id}-description`}>{copy.signupBody}</p>
          <form onSubmit={submit}>
            <label className="nl-field-label" htmlFor={`${id}-email`}>{copy.email}</label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254} placeholder={copy.placeholder} className="nl-input" aria-describedby={message ? `${id}-error` : undefined} disabled={state === 'pending'} />
            <div className="nl-honeypot" aria-hidden="true"><label htmlFor={`${id}-website`}>Website</label><input id={`${id}-website`} name="website" autoComplete="off" tabIndex={-1} /></div>
            <label className="nl-consent"><input name="consent" type="checkbox" required disabled={state === 'pending'} /><span>{copy.consent}</span></label>
            <a className="nl-privacy" href={sitePath(localizedPath(locale, '/legal/privacypolicy'))}>{copy.privacy}</a>
            {message && <p id={`${id}-error`} className="nl-form-error" role="alert">{message}</p>}
            <button type="submit" className="nl-button nl-button-primary nl-submit" disabled={state === 'pending'}>{state === 'pending' ? <><LoaderCircle size={16} className="animate-spin" aria-hidden="true" />{copy.sending}</> : <>{copy.submit}<ArrowUpRight size={16} aria-hidden="true" /></>}</button>
          </form>
        </>}
      </div>
    </dialog>
  </>;
}

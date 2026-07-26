'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyCommandButton({
  value,
  label = 'Copy command',
  className = '',
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1600);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
    }
  }

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      aria-label={copied ? 'Copied' : label}
      title={copied ? 'Copied' : label}
      onClick={copyToClipboard}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#9c9680] transition hover:bg-[#6db5ff]/10 hover:text-[#d9e9ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6db5ff] ${className}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

'use client';

import type {
  LanguageSelectProps,
  LanguageSelectTextProps,
} from 'fumadocs-ui/layouts/shared/slots/language-select';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from 'fumadocs-ui/components/ui/popover';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { Check } from 'lucide-react';
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/cn';
import { isLocale, localeDetails, parseLocale } from '@/lib/i18n';

export function RuntzLanguageSelect({
  className,
  children: _children,
  variant: _variant,
  onPointerEnter,
  onPointerLeave,
  ...props
}: LanguageSelectProps) {
  const context = useI18n();
  const locale = parseLocale(context.locale);
  const current = localeDetails[locale];
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openOnHover = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const closeAfterPointerLeaves = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  const handleTriggerPointerEnter = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    onPointerEnter?.(event);
    if (!event.defaultPrevented && event.pointerType === 'mouse') {
      openOnHover();
    }
  };

  const handleTriggerPointerLeave = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    onPointerLeave?.(event);
    if (!event.defaultPrevented && event.pointerType === 'mouse') {
      closeAfterPointerLeaves();
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        cancelClose();
        setOpen(nextOpen);
      }}
    >
      <PopoverTrigger
        {...props}
        aria-label={current.languageLabel}
        className={cn('rz-language-trigger', className)}
        onPointerEnter={handleTriggerPointerEnter}
        onPointerLeave={handleTriggerPointerLeave}
      >
        {current.code}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={10}
        className="rz-language-menu"
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') openOnHover();
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') closeAfterPointerLeaves();
        }}
      >
        {context.locales?.map((item) => {
          const itemLocale = isLocale(item.locale) ? item.locale : 'en';
          const details = localeDetails[itemLocale];
          const selected = itemLocale === locale;

          return (
            <PopoverClose asChild key={item.locale}>
              <button
                type="button"
                className="rz-language-option"
                data-active={selected || undefined}
                lang={details.htmlLang}
                onClick={() => context.onChange?.(item.locale)}
              >
                <span>{details.displayName}</span>
                <span className="rz-language-option-code">{details.code}</span>
                <Check aria-hidden="true" className="rz-language-check" />
              </button>
            </PopoverClose>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

export function RuntzLanguageSelectText({
  className,
  ...props
}: LanguageSelectTextProps) {
  const { locale } = useI18n();
  const details = localeDetails[parseLocale(locale)];

  return (
    <span {...props} className={cn('rz-language-text', className)}>
      {details.code}
    </span>
  );
}

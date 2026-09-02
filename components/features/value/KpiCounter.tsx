'use client';

import { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface KpiCounterProps {
  label: string;
  value: string;
  description: string;
  icon?: string;
}

const DURATION_MS = 1500;

function parseNumeric(value: string): { prefix: string; target: number; suffix: string } | null {
  const match = value.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const target = Number(numStr);
  if (Number.isNaN(target)) return null;
  return { prefix: prefix ?? '', target, suffix: suffix ?? '' };
}

function formatNumber(n: number, hasComma: boolean): string {
  if (!hasComma) return Math.round(n).toString();
  return Math.round(n).toLocaleString('en-US');
}

export function KpiCounter({ label, value, description, icon }: KpiCounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const parsed = parseNumeric(value);
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState<string>(
    prefersReducedMotion || !parsed ? value : `${parsed.prefix}0${parsed.suffix}`
  );
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!parsed) return;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      setHasAnimated(true);
      return;
    }
    if (hasAnimated) return;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setDisplayValue(value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasAnimated) return;

        const start = performance.now();
        const hasComma = value.includes(',');
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = parsed.target * eased;
          setDisplayValue(`${parsed.prefix}${formatNumber(current, hasComma)}${parsed.suffix}`);
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplayValue(value);
            setHasAnimated(true);
          }
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [parsed, prefersReducedMotion, hasAnimated, value]);

  return (
    <article
      ref={ref}
      className="rounded-lg border border-slate-border bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue">
          {label}
        </p>
        {icon && (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md bg-navy text-white text-[10px] font-bold"
            aria-hidden="true"
          >
            {icon.slice(0, 2)}
          </span>
        )}
      </div>
      <p
        className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy tabular-nums"
        aria-label={value}
      >
        <span aria-hidden="true">{displayValue}</span>
      </p>
      <p className="mt-2 text-sm text-slate">{description}</p>
    </article>
  );
}
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { TermExplanation } from '@/api/newsApi';

interface TooltipState {
  term: TermExplanation;
  top: number;
  left: number;
}

interface TermButtonProps {
  term: TermExplanation;
  onActivate: (term: TermExplanation, rect: DOMRect) => void;
}

function TermButton({ term, onActivate }: TermButtonProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (ref.current) onActivate(term, ref.current.getBoundingClientRect()); }}
      className={`relative cursor-pointer font-medium text-primary transition-colors ${hovered ? 'bg-primary/10' : ''}`}>
      {term.term}
    </button>
  );
}

function splitWithTerms(
  text: string,
  terms: TermExplanation[],
  onActivate: (term: TermExplanation, rect: DOMRect) => void,
): React.ReactNode[] {
  if (terms.length === 0) return [text];

  const sorted = [...terms]
    .filter((t) => t.term.trim().length > 0)
    .sort((a, b) => b.term.length - a.term.length);
  const pattern = new RegExp(
    `(${sorted.map((t) => t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'g',
  );

  return text.split(pattern).map((part, i) => {
    const matched = sorted.find((t) => t.term === part);
    return matched ? <TermButton key={i} term={matched} onActivate={onActivate} /> : part;
  });
}

interface Props {
  text: string;
  terms: TermExplanation[];
  className?: string;
}

export default function TermHighlightText({ text, terms, className }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleActivate = useCallback((term: TermExplanation, rect: DOMRect) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    setTooltip({
      term,
      top: rect.top - containerRect.top - 8,
      left: rect.left - containerRect.left + rect.width / 2,
    });

    timerRef.current = setTimeout(() => setTooltip(null), 3000);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <span ref={containerRef} className={`relative ${className ?? ''}`}>
      {splitWithTerms(text, terms, handleActivate)}
      {tooltip && (
        <span
          className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full"
          style={{ top: tooltip.top, left: tooltip.left }}>
          <span className="block w-64 rounded-xl bg-gray-100 px-14pxr py-10pxr shadow-xl">
            <span className="fonts-body mb-4pxr block font-semibold text-primary">{tooltip.term.term}</span>
            <span className="fonts-body block leading-relaxed text-gray-900">{tooltip.term.explanation}</span>
          </span>
        </span>
      )}
    </span>
  );
}

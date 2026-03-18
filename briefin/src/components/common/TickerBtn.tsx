'use client';

interface TickerBtnProps {
  isActive: boolean;
  text: string;
  onClick: () => void;
}

export default function TickerBtn({ isActive, text, onClick }: TickerBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`fonts-label inline-flex items-center justify-center gap-10pxr whitespace-nowrap rounded-pill border px-17pxr py-8pxr transition-colors ${
        isActive
          ? 'border-primary bg-primary text-white'
          : 'border-surface-border bg-surface-white text-text-secondary hover:border-primary hover:text-primary'
      }`}>
      {text}
    </button>
  );
}

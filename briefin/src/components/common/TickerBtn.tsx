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
      className={`fonts-cardTitle inline-flex items-center justify-center gap-10pxr whitespace-nowrap rounded-pill px-17pxr py-8pxr outline-1 transition ${
        isActive ? 'bg-primary text-white outline-primary' : 'bg-white text-text-secondary outline-surface-border'
      }`}>
      {text}
    </button>
  );
}

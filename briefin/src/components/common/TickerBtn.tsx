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
      className={`fonts-cardTitle inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-pill px-4 py-2 outline-1 transition ${
        isActive ? 'bg-primary text-white outline-primary' : 'bg-white text-text-secondary outline-surface-border'
      }`}>
      {text}
    </button>
  );
}

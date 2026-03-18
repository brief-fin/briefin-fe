'use client';

import { CategoryButtonProps } from '@/types/news';

export function CategoryButton({ label, isSelected = false, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fonts-label rounded-pill border px-16pxr py-7pxr transition-colors ${
        isSelected
          ? 'border-primary bg-primary text-white'
          : 'border-surface-border bg-surface-white text-text-secondary hover:border-primary hover:text-primary'
      }`}>
      {label}
    </button>
  );
}

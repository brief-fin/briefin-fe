"use client";

interface CategoryButtonProps {
    label: string;
    isSelected?: boolean;
    onClick?: () => void;
  }
  
  export function CategoryButton({ label, isSelected = false, onClick }: CategoryButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`px-16pxr py-7pxr rounded-pill fonts-label border transition-colors
          ${isSelected 
            ? 'bg-primary text-white border-primary' 
            : 'bg-surface-white text-text-secondary border-surface-border hover:border-primary hover:text-primary'
          }`}
      >
        {label}
      </button>
    );
  }
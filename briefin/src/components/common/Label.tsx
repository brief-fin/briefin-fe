import { LabelProps } from '@/types/common';

export default function Label({ text, variant }: LabelProps) {
  return (
    <div
      className={`fonts-label inline-flex ${
        variant === 'company'
          ? 'rounded-badge bg-primary-light px-8pxr py-2pxr text-primary-dark'
          : 'text-text-secondary'
      }`}>
      {text}
    </div>
  );
}

import { LabelProps } from '@/types/common';

export default function Label({ text, variant }: LabelProps) {
  return (
    <div
      className={`fonts-label inline-flex rounded-badge px-8pxr py-2pxr ${
        variant === 'company' ? 'bg-primary-light text-primary-dark' : 'bg-surface-muted text-text-secondary'
      }`}>
      {text}
    </div>
  );
}

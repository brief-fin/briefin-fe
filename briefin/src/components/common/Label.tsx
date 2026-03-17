interface LabelProps {
  text: string;
  variant: 'category' | 'company';
}

export default function Label({ text, variant }: LabelProps) {
  return (
    <div
      className={`fonts-label inline-flex rounded-badge px-2 py-0.5 ${
        variant === 'category' ? 'bg-primary-light text-primary-dark' : 'bg-surface-muted text-text-secondary'
      }`}>
      {text}
    </div>
  );
}

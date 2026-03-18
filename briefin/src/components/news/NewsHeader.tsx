import { NewsHeaderProps } from '@/types/news';

export default function NewsHeader({ data: { category, publishedAt, source, title } }: NewsHeaderProps) {
  return (
    <header className="space-y-12pxr">
      <div className="flex flex-wrap items-center gap-8pxr">
        <span className="rounded-badge bg-primary-light px-10pxr py-4pxr text-[11px] font-bold text-primary-dark">
          {category}
        </span>
        <div className="fonts-caption flex flex-wrap items-center gap-16pxr text-text-muted">
          {source && <span>{source}</span>}
          <span>{publishedAt}</span>
        </div>
      </div>
      <h1 className="fonts-heading3 text-text-primary">{title}</h1>
    </header>
  );
}

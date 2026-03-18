import Link from 'next/link';
import type { DisclosureListItem } from '@/types/disclosure';

interface DisclosureListProps {
  items: DisclosureListItem[];
  sourceLabel?: string;
}

function CategoryBadge({ category }: { category: string }) {
  const isHighlight = category === '공급계약';
  return (
    <span
      className={`shrink-0 rounded-badge px-10pxr py-4pxr text-[12px] font-bold ${
        isHighlight ? 'bg-primary-light text-primary-dark' : 'bg-surface-muted text-text-secondary'
      }`}>
      {category}
    </span>
  );
}

export default function DisclosureList({ items, sourceLabel = 'DART 공시' }: DisclosureListProps) {
  return (
    <div className="overflow-hidden rounded-card border border-surface-border bg-surface-white shadow-hero-card">
      <ul className="divide-y divide-surface-border">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/disclosure/${item.id}`}
              className="flex items-center gap-12pxr px-22pxr py-20pxr transition-colors hover:bg-surface-bg">
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-[14px] font-bold text-text-primary">{item.title}</p>
                <p className="fonts-caption mt-4pxr">
                  {item.date} · {sourceLabel}
                </p>
              </div>
              <CategoryBadge category={item.category} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

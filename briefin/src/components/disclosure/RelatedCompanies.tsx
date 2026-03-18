import Link from 'next/link';
import { RelatedCompaniesProps } from '@/types/disclosure';

export default function RelatedCompanies({ relatedCompanyNames }: RelatedCompaniesProps) {
  if (relatedCompanyNames.length === 0) return null;

  return (
    <div className="mt-24pxr">
      <p className="fonts-caption mb-8pxr font-bold text-text-muted">관련 기업</p>
      <div className="flex flex-wrap gap-8pxr">
        {relatedCompanyNames.map((name) => (
          <Link
            key={name}
            href="/companies"
            className="rounded-badge bg-surface-muted px-14pxr py-8pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-border">
            📱 {name}
          </Link>
        ))}
      </div>
    </div>
  );
}

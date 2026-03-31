import Link from 'next/link';
import { NewsRelatedCompaniesProps } from '@/types/news';

export default function NewsRelatedCompanies({ relatedCompanies }: NewsRelatedCompaniesProps) {
  if (!relatedCompanies || relatedCompanies.length === 0) return null;

  return (
    <div className="mt-20pxr border-t border-surface-border pt-20pxr">
      <p className="mb-10pxr text-[11px] font-black uppercase tracking-[1.5px] text-text-muted">관련 기업</p>
      <div className="flex flex-wrap gap-8pxr">
        {relatedCompanies.map((company) => (
          <Link
            key={company.id}
            href={`/companies/${company.id}`}
            className="inline-flex items-center gap-6pxr rounded-badge border border-primary-mid bg-primary-subtle px-14pxr py-8pxr text-[13px] font-bold text-primary transition-colors hover:bg-primary-light">
            {company.emoji} {company.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

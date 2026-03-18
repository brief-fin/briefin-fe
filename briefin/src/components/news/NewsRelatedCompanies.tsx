import Link from 'next/link';

interface Company {
  id: string;
  name: string;
  emoji: string;
}

interface NewsRelatedCompaniesProps {
  relatedCompanies: Company[];
}

export default function NewsRelatedCompanies({ relatedCompanies }: NewsRelatedCompaniesProps) {
  if (!relatedCompanies || relatedCompanies.length === 0) return null;

  return (
    <div className="mt-24pxr">
      <p className="fonts-caption mb-8pxr font-bold text-text-muted">관련 기업</p>
      <div className="flex flex-wrap gap-8pxr">
        {relatedCompanies.map((company) => (
          <Link
            key={company.id}
            href={`/companies/${company.id}`}
            className="rounded-badge border border-surface-border bg-surface-white px-14pxr py-8pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg"
          >
            {company.emoji} {company.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
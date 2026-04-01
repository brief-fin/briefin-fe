'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { NewsRelatedCompaniesProps, Company } from '@/types/news';

function getLogoUrl(company: Company): string | null {
  if (company.ticker) {
    return `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${company.ticker}.png`;
  }
  return company.logoUrl ?? null;
}

function CompanyLogo({ company }: { company: Company }) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = getLogoUrl(company);

  if (logoUrl && !imgError) {
    return (
      <Image
        src={logoUrl}
        alt={company.name}
        width={20}
        height={20}
        className="object-cover"
        unoptimized
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <span className="text-[11px] font-black text-primary">
      {company.name.charAt(0)}
    </span>
  );
}

export default function NewsRelatedCompanies({ relatedCompanies }: NewsRelatedCompaniesProps) {
  if (!relatedCompanies || relatedCompanies.length === 0) return null;

  return (
    <div className="mt-20pxr border-t border-surface-border pt-20pxr">
      <p className="mb-12pxr text-[11px] font-black uppercase tracking-[1.5px] text-text-muted">관련 기업</p>
      <div className="flex flex-wrap gap-8pxr">
        {relatedCompanies.map((company) => (
          <Link
            key={company.id}
            href={`/companies/${company.id}`}
            className="inline-flex items-center gap-8pxr rounded-badge border border-primary-mid bg-primary-subtle px-12pxr py-7pxr text-[13px] font-bold text-primary transition-colors hover:bg-primary-light">
            <span className="flex h-20pxr w-20pxr shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary-mid bg-surface-white">
              <CompanyLogo company={company} />
            </span>
            {company.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

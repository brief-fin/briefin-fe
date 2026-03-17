// src/components/companies/CompanyCard.tsx
"use client";

import { Company } from "@/mocks/mockCompanyData";

export function CompanyCard({ company }: { company: Company }) {
  const isPositive = company.changeRate >= 0;

  return (
    <div className="flex items-center gap-16pxr bg-surface-white rounded-card px-20pxr py-16pxr border border-surface-border hover:shadow-news-hover transition-shadow cursor-pointer">
      <div className="w-48pxr h-48pxr rounded-nav bg-primary-light flex items-center justify-center text-24pxr flex-shrink-0">
        {company.emoji}
      </div>
      <div className="flex flex-col gap-4pxr">
        <div className="fonts-cardTitle">{company.name}</div>
        <div className="fonts-caption">{company.category}</div>
        <div className={`fonts-subTitle ${isPositive ? "text-semantic-red" : "text-semantic-blue"}`}>
          {isPositive ? "+" : ""}{company.changeRate}%
        </div>
      </div>
    </div>
  );
}
'use client';

import { SearchComponent } from '@/components/common/SearchComponent';
import { CompanyCard } from '@/components/companies/CompanyCard';
import { mockCompanyData } from '@/mocks/mockCompanyData';

export default function page() {
  return (
    <main className="relative flex h-full w-full flex-col px-40pxr pt-30pxr">
      <div className="fonts-heading3 mb-16pxr">기업</div>
      <div className="mb-20pxr">
      <SearchComponent searchPath="/companies/result" placeholder="기업명, 티커를 입력하세요" />
      </div>
      <div className="fonts-label mb-20pxr text-text-secondary">인기기업</div>

      <div className="grid grid-cols-1 gap-12pxr sm:grid-cols-2 lg:grid-cols-3 mb-20pxr">
        {mockCompanyData.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      <div className="fonts-label mb-20pxr">최근 본 기업</div>
      <div>
        <div className="grid grid-cols-1 gap-12pxr sm:grid-cols-2 lg:grid-cols-3 mb-20pxr">
          {mockCompanyData.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </main>
  );
}

import { SearchComponent } from '@/components/common/SearchComponent';
import { CompanyCard } from '@/components/companies/CompanyCard';
import { mockCompanyData } from '@/mocks/mockCompanyData';
import { SearchPageProps } from '@/types/company';

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  const filtered = query
    ? mockCompanyData.filter((company) => company.name.includes(query) || company.category.includes(query))
    : mockCompanyData;

  return (
    <main className="relative flex h-full w-full flex-col py-36pxr">
      <div className="fonts-heading3 mb-16pxr">기업</div>

      <SearchComponent searchPath="/companies/result" placeholder="기업명, 종목코드를 입력하세요" />

      <div className="fonts-caption mb-20pxr mt-20pxr text-text-muted">
        {query
          ? `"${query}" 검색 결과 ${filtered.length > 0 ? `${filtered.length}건` : '없음'}`
          : `전체 기업 ${filtered.length}건`}
      </div>

      {filtered.length > 0 ? (
        <div className="mb-20pxr grid grid-cols-1 gap-12pxr sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-16pxr py-120pxr">
          <span className="text-60pxr">🏢</span>
          <div className="fonts-cardTitle text-text-primary">검색 결과가 없어요</div>
          <div className="fonts-body text-text-muted">기업명이나 종목코드를 다시 확인해 보세요.</div>
        </div>
      )}
    </main>
  );
}

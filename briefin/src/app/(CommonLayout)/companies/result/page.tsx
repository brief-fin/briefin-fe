'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchComponent } from '@/components/common/SearchComponent';
import { apiClient, type ApiResponse } from '@/api/client';
import { CompanyCard } from '@/components/companies/CompanyCard';

interface CompanyItem {
  id: number;
  name: string;
  sector: string | null;
  logoUrl: string | null;
  changeRate: number | null;
}

interface CompanyPage {
  content: CompanyItem[];
  totalElements: number;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q')?.trim() ?? '';

  const [results, setResults] = useState<CompanyItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get<ApiResponse<CompanyPage>>(
          `/companies/search?q=${encodeURIComponent(query)}&size=20`,
        );
        setResults(res.result.content);
        setTotalCount(res.result.totalElements);
      } catch (error) {
        console.error('기업 데이터 로드 실패:', error);
        setResults([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <main className="relative mx-auto flex h-full w-full max-w-screen-xl flex-col px-20pxr py-36pxr">
      <div className="mb-40pxr text-center">
        <h1 className="fonts-heading2 mb-20pxr text-text-primary">기업 찾기</h1>
        <SearchComponent
          searchPath="/companies/result"
          placeholder="기업명, 티커를 입력하세요"
        />
      </div>

      <div className="fonts-caption mb-20pxr mt-24pxr border-b border-surface-border pb-12pxr text-text-muted">
        {query
          ? `"${query}" 검색 결과 ${totalCount > 0 ? `${totalCount}건` : '없음'}`
          : `전체 기업 ${totalCount}건`}
      </div>

      {loading ? (
        <div className="fonts-body py-100pxr text-center">데이터를 불러오는 중...</div>
      ) : results.length > 0 ? (
        <div className="mb-40pxr grid grid-cols-1 gap-16pxr sm:grid-cols-2 lg:grid-cols-3">
          {results.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="mt-10pxr flex flex-col items-center justify-center gap-16pxr rounded-summary bg-surface-white py-120pxr shadow-sm">
          <span className="text-60pxr">🏢</span>
          <div className="fonts-cardTitle text-text-primary">검색 결과가 없어요</div>
          <div className="fonts-body text-center text-text-muted">
            {query ? (
              <>
                검색어 <span className="font-bold">"{query}"</span>와 일치하는 기업이 없습니다.
                <br />
                기업명이나 종목코드를 다시 확인해 보세요.
              </>
            ) : (
              <>검색어를 입력해 주세요.</>
            )}
          </div>
          <button
            onClick={() => router.push('/companies/result')}
            className="text-primary-main fonts-label mt-10pxr hover:underline"
          >
            전체 목록 보기
          </button>
        </div>
      )}
    </main>
  );
}
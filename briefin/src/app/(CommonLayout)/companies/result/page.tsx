'use client';

import { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchComponent } from '@/components/common/SearchComponent';
import { CompanyCard } from '@/components/companies/CompanyCard';
import { searchCompanies } from '@/api/companyApi';

const PAGE_SIZE = 20;

interface CompanyItem {
  id: number;
  name: string;
  sector: string | null;
  logoUrl: string | null;
  changeRate: number | null;
}

function SkeletonCard() {
  return (
    <div className="flex items-center gap-16pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr">
      <div className="h-48pxr w-48pxr shrink-0 rounded-nav bg-gray-200" />
      <div className="flex flex-col gap-8pxr">
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="h-3 w-20 rounded bg-gray-200" />
        <div className="h-3 w-12 rounded bg-gray-200" />
      </div>
    </div>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q')?.trim() ?? '';

  const [results, setResults] = useState<CompanyItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const pageRef = useRef(0);
  const isFetchingRef = useRef(false);
  const hasMoreRef = useRef(false);
  const currentQueryRef = useRef(query);

  // sentinel은 항상 DOM에 존재해야 observer가 감지할 수 있음
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchPage = useCallback(async (q: string, page: number, replace: boolean) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    if (page === 0) setInitialLoading(true);
    else setLoadingMore(true);
    try {
      const data = await searchCompanies(q, page, PAGE_SIZE);
      if (currentQueryRef.current !== q) return; // stale 응답 무시
      const items = data.content as CompanyItem[];
      setResults((prev) => (replace ? items : [...prev, ...items]));
      setTotalCount(data.totalElements);
      pageRef.current = page;
      hasMoreRef.current = (page + 1) * PAGE_SIZE < data.totalElements;
    } catch {
      if (page === 0) setResults([]);
    } finally {
      isFetchingRef.current = false;
      if (page === 0) setInitialLoading(false);
      else setLoadingMore(false);
    }
  }, []);

  // 쿼리 변경 시 초기화 후 첫 페이지 로드
  useEffect(() => {
    currentQueryRef.current = query;
    pageRef.current = 0;
    isFetchingRef.current = false;
    hasMoreRef.current = false;
    setResults([]);
    setTotalCount(0);
    fetchPage(query, 0, true);
  }, [query, fetchPage]);

  // sentinel이 뷰포트에 진입하면 다음 페이지 로드
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreRef.current && !isFetchingRef.current) {
          fetchPage(currentQueryRef.current, pageRef.current + 1, false);
        }
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchPage]);

  return (
    <main className="relative mx-auto flex h-full w-full max-w-7xl flex-col px-20pxr py-36pxr">
      <div className="mb-40pxr text-center">
        <h1 className="fonts-heading2 mb-20pxr text-text-primary">기업 찾기</h1>
        <SearchComponent
          searchPath="/companies/result"
          placeholder="기업명, 티커를 입력하세요"
          defaultValue={query}
        />
      </div>

      <div className="fonts-caption mb-20pxr mt-24pxr border-b border-surface-border pb-12pxr text-text-muted">
        {query
          ? `"${query}" 검색 결과 ${totalCount > 0 ? `${totalCount}건` : '없음'}`
          : `전체 기업 ${totalCount}건`}
      </div>

      {initialLoading ? (
        <div className="mb-40pxr grid animate-pulse grid-cols-1 gap-16pxr sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="mb-16pxr grid grid-cols-1 gap-16pxr sm:grid-cols-2 lg:grid-cols-3">
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

      {loadingMore && (
        <div className="mb-16pxr grid animate-pulse grid-cols-1 gap-16pxr sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* sentinel: 항상 DOM에 존재해야 IntersectionObserver가 감지 가능 */}
      <div ref={sentinelRef} className="h-1" />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  );
}

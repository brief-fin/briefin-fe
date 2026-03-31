'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SearchComponent } from '@/components/common/SearchComponent';

interface PopularCompany {
  id: number;
  name: string;
  ticker: string;
  sector: string;
  logoUrl: string;
  changeRate: number;
}

const TABS = [
  { label: '시가총액', endpoint: '/companies/popular/market-cap' },
  { label: '거래대금', endpoint: '/companies/popular/value' },
  { label: '거래량', endpoint: '/companies/popular/volume' },
  { label: '상승', endpoint: '/companies/popular/diff' },
];

function PopularCompanyCard({ company, rank }: { company: PopularCompany; rank: number }) {
  const router = useRouter();
  const isRise = company.changeRate > 0;
  const isFall = company.changeRate < 0;

  return (
    <div
      onClick={() => router.push(`/companies/${company.id}`)}
      className="flex cursor-pointer items-center gap-16pxr px-24pxr py-16pxr transition-colors hover:bg-surface-bg">
      <span className={`w-24pxr shrink-0 text-[14px] font-black ${rank <= 3 ? 'text-primary-dark' : 'text-text-tertiary'}`}>
        {rank}
      </span>
      <div className="relative h-40pxr w-40pxr shrink-0 overflow-hidden rounded-full border border-surface-border bg-surface-bg">
        <Image
          src={company.logoUrl}
          alt={company.name}
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-bold text-text-primary">{company.name}</p>
        <p className="text-[12px] text-text-secondary">{company.sector ?? '기타'}</p>
      </div>
      <p className={`shrink-0 text-[14px] font-bold ${
        isRise ? 'text-semantic-red' : isFall ? 'text-semantic-blue' : 'text-text-secondary'
      }`}>
        {isRise ? '+' : ''}{company.changeRate.toFixed(2)}%
      </p>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [companies, setCompanies] = useState<PopularCompany[]>([]);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setLoading(true);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${TABS[activeTab].endpoint}`)
      .then(res => res.text())
      .then(text => {
        if (!text) return;
        try {
          const data = JSON.parse(text);
          setCompanies(data.result ?? []);
        } catch {
          // HTML 에러 페이지 등 JSON이 아닌 응답 무시
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeTab]);

  return (
    <main className="relative flex h-full w-full flex-col py-36pxr">

      {/* 검색 헤더 */}
      <div className="mb-40pxr text-center">
        <h1 className="fonts-heading2 mb-20pxr text-text-primary">기업 찾기</h1>
        <SearchComponent searchPath="/companies/result" placeholder="기업명, 티커를 입력하세요" />
      </div>

      {/* 인기 기업 */}
      <div className="overflow-hidden rounded-card border border-surface-border bg-surface-white">
        
        {/* 탭 헤더 */}
        <div className="flex border-b border-surface-border">
          {TABS.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => handleTabChange(index)}
              className={`flex-1 py-14pxr text-[13px] font-bold transition-colors ${
                activeTab === index
                  ? 'border-b-2 border-primary-dark text-primary-dark'
                  : 'text-text-secondary hover:bg-surface-bg hover:text-text-primary'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* 목록 */}
        {loading ? (
          <div className="py-60pxr text-center text-[14px] text-text-secondary">로딩중...</div>
        ) : companies.length === 0 ? (
          <div className="py-60pxr text-center text-[14px] text-text-secondary">데이터가 없어요.</div>
        ) : (
          <div className="divide-y divide-surface-border">
            {companies.map((company, index) => (
              <PopularCompanyCard key={company.id} company={company} rank={index + 1} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
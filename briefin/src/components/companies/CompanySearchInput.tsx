'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { apiClient, type ApiResponse } from '@/api/client';

interface CompanyItem {
  id: number;
  name: string;
  sector: string | null;
  logoUrl: string | null;
  changeRate: number | null;
  ticker?: string;
}

interface CompanyPage {
  content: CompanyItem[];
  totalElements: number;
}

const RECENT_SEARCHES_KEY = 'company_recent_searches';
const MAX_RECENT = 6;

function saveRecentSearch(query: string) {
  try {
    const prev: string[] = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) ?? '[]');
    const next = [query, ...prev.filter((q) => q !== query)].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  } catch {}
}

export default function CompanySearchInput({ onSearch }: { onSearch?: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CompanyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setOpen(true);
      try {
        const res = await apiClient.get<ApiResponse<CompanyPage>>(
          `/companies/search?q=${encodeURIComponent(query.trim())}&size=8`,
        );
        setResults(res.result.content ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (company: CompanyItem) => {
    setOpen(false);
    setQuery('');
    router.push(`/companies/${company.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && query.trim()) {
      saveRecentSearch(query.trim());
      onSearch?.();
      setOpen(false);
      router.push(`/companies/result?q=${encodeURIComponent(query.trim())}`);
    }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 입력창 */}
      <div className="flex w-full items-center gap-8pxr rounded-input border border-surface-border bg-surface-white px-16pxr py-12pxr shadow-sm">
        <input
          className="w-full bg-transparent p-5pxr text-text-primary placeholder:text-text-muted focus:outline-none"
          type="text"
          placeholder="기업명, 티커를 입력하세요"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => { if (query.trim() && results.length > 0) setOpen(true); }}
          onKeyDown={handleKeyDown}
        />
        {query ? (
          <button onClick={() => { setQuery(''); setOpen(false); }} className="shrink-0 text-text-muted hover:text-text-primary">
            <svg width="14" height="14" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="9" y2="9" /><line x1="9" y1="1" x2="1" y2="9" />
            </svg>
          </button>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        )}
      </div>

      {/* 드롭다운 */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-4pxr overflow-hidden rounded-card border border-surface-border bg-surface-white shadow-lg">
          {loading ? (
            <p className="py-16pxr text-center text-[13px] text-text-muted">검색 중...</p>
          ) : results.length === 0 ? (
            <p className="py-16pxr text-center text-[13px] text-text-muted">검색 결과가 없어요.</p>
          ) : (
            <>
              <ul className="scrollbar-hide divide-y divide-surface-border overflow-y-auto" style={{ maxHeight: 52 * 6.5 }}>
                {results.map((company) => {
                  const isRise = (company.changeRate ?? 0) > 0;
                  const isFall = (company.changeRate ?? 0) < 0;
                  const logoSrc = !imgErrors[company.id] && company.logoUrl ? company.logoUrl : '/default-company.png';
                  return (
                    <li key={company.id}>
                      <button
                        onClick={() => handleSelect(company)}
                        className="flex w-full items-center gap-12pxr px-16pxr py-10pxr text-left transition-colors hover:bg-surface-bg">
                        <div className="relative h-32pxr w-32pxr shrink-0 overflow-hidden rounded-full border border-surface-border bg-surface-bg">
                          <Image
                            src={logoSrc}
                            alt={company.name}
                            fill
                            className="object-cover"
                            onError={() => setImgErrors(prev => ({ ...prev, [company.id]: true }))}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-bold text-text-primary">{company.name}</p>
                          <p className="text-[11px] text-text-muted">{company.sector ?? '기타'}</p>
                        </div>
                        {company.changeRate != null && (
                          <p className={`shrink-0 text-[12px] font-bold ${isRise ? 'text-semantic-red' : isFall ? 'text-semantic-blue' : 'text-text-secondary'}`}>
                            {isRise ? '+' : ''}{company.changeRate.toFixed(2)}%
                          </p>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={() => {
                  saveRecentSearch(query.trim());
                  onSearch?.();
                  setOpen(false);
                  router.push(`/companies/result?q=${encodeURIComponent(query.trim())}`);
                }}
                className="w-full border-t border-surface-border py-10pxr text-center text-[12px] font-bold text-primary hover:bg-surface-bg">
                "{query}" 전체 결과 보기
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

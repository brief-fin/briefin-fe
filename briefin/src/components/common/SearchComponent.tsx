'use client';

import { useRouter } from 'next/navigation';
import { SearchComponentProps } from '@/types/common';

export function SearchComponent({
  searchPath = '/news/search',
  placeholder = '키워드, 기업명, 섹터를 입력하세요',
}: SearchComponentProps) {
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value;
      if (value.trim()) {
        router.push(`${searchPath}?q=${encodeURIComponent(value)}`);
      }
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex w-full items-center gap-12pxr rounded-full border border-surface-border bg-surface-white px-20pxr py-14pxr shadow-sm transition-shadow focus-within:border-primary-dark focus-within:shadow-md">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          className="w-full bg-transparent text-[15px] text-text-primary placeholder:text-text-muted focus:outline-none"
          type="text"
          placeholder={placeholder}
          onKeyDown={handleSearch}
        />
      </div>
    </div>
  );
}
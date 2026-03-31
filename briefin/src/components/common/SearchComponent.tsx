'use client';

import { useRouter } from 'next/navigation';
import { SearchComponentProps } from '@/types/common';

export function SearchComponent({
  searchPath = '/news/search',
  placeholder = '키워드, 기업명, 섹터를 입력하세요',
}: SearchComponentProps) {
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      const value = e.currentTarget.value;
      if (value.trim()) {
        router.push(`${searchPath}?q=${encodeURIComponent(value)}`);
      }
    }
  };

  return (
    <div className="flex w-full items-center gap-8pxr rounded-input border border-surface-border bg-surface-white px-16pxr py-12pxr">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        className="w-full bg-transparent p-5pxr text-text-primary placeholder:text-text-muted focus:outline-none"
        type="text"
        placeholder={placeholder}
        onKeyUp={handleSearch}
      />
    </div>
  );
}

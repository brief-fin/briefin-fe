"use client";

import { useRouter } from "next/navigation";

export function SearchComponent() {

  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value;
      if (value.trim()) {
        router.push(`/news/search?q=${encodeURIComponent(value)}`);
      }
    }
  };


    return (
      <div className="w-full flex items-center gap-8pxr border border-surface-border rounded-input px-16pxr py-12pxr bg-surface-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          className="w-full focus:outline-none text-text-primary placeholder:text-text-muted bg-transparent p-5pxr"
          type="text"
          placeholder="키워드, 기업명, 섹터를 입력하세요"
          onKeyDown={handleSearch}
        />
      </div>
    );
  }
  